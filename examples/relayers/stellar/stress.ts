import { Address, Contract, Keypair, Networks, Operation, TransactionBuilder, rpc, xdr } from '@stellar/stellar-sdk';

import axios from 'axios';
import { execSync } from 'child_process';

// Configuration
const API_URL = 'http://localhost:8080/api/v1/plugins/launchtube-plugin/call';
const API_KEY = '75701925-d098-4794-9f3e-968082e19710';
const ADMIN_SECRET = '71d17387-6510-4652-8df4-68356840e957';
const RPC_URL = 'https://soroban-testnet.stellar.org';
const CONTRACT_ID = 'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC';
const ACCOUNT_NAME = 'test-account';
const DEFAULT_RELAYER_IDS = ['launchtube-seq-001', 'launchtube-seq-002'];

function getTimestamp(): string {
  return new Date().toISOString();
}

const RPC = new rpc.Server(RPC_URL);
const CONTRACT = new Contract(CONTRACT_ID);

async function callPlugin(params: any) {
  const res = await axios.post(API_URL, { params }, { headers: { Authorization: `Bearer ${API_KEY}` } });
  return res.data;
}

function unwrapReturnValue(response: any): any {
  const rv = response?.data?.return_value;
  if (typeof rv === 'string') {
    try {
      return JSON.parse(rv);
    } catch {}
    return rv;
  }
  return rv ?? response;
}

async function managementSet(ids: string[]): Promise<{ ok: boolean; applied?: string[]; error?: string }> {
  try {
    const res = await callPlugin({
      management: { action: 'setSequenceAccounts', adminSecret: ADMIN_SECRET, relayerIds: ids },
    });
    const rv = unwrapReturnValue(res);
    const result = rv?.data?.result || rv?.result || rv;
    if (result?.ok === true) return { ok: true, applied: result.appliedRelayerIds };
    return { ok: false, error: result?.error || result?.code || 'unknown_error' };
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) };
  }
}

function getKeypair() {
  const address = execSync(`stellar keys address ${ACCOUNT_NAME}`, { encoding: 'utf8' }).trim();
  const secret = execSync(`stellar keys show ${ACCOUNT_NAME}`, { encoding: 'utf8' }).trim();
  return { keypair: Keypair.fromSecret(secret), address };
}

// Build a balance check transaction - this doesn't modify state so doesn't need source account auth
async function buildBalanceCheckTx(address: string) {
  const account = await RPC.getAccount(address);
  return new TransactionBuilder(account, { fee: '100', networkPassphrase: Networks.TESTNET })
    .addOperation(CONTRACT.call('balance', Address.fromString(address).toScVal()))
    .setTimeout(30)
    .build();
}

// Prepare func+auth WITHOUT signing - let the plugin handle it with invoker auth
async function prepareFuncAuth(address: string) {
  const tx = await buildBalanceCheckTx(address);
  const simResult = await RPC.simulateTransaction(tx);

  if (rpc.Api.isSimulationError(simResult)) {
    throw new Error('Simulation failed: ' + simResult.error);
  }

  // Get the assembled transaction which has auth
  const assembledTx = rpc.assembleTransaction(tx, simResult).build();
  const op = assembledTx.operations[0] as Operation.InvokeHostFunction;

  // Extract func and auth
  const func = op.func.toXDR('base64');
  const auth = op.auth?.map((a) => a.toXDR('base64')) || [];

  console.log(`[${getTimestamp()}] Prepared func+auth: ${auth.length} auth entries`);

  return { func, auth };
}

type SendResult = { ok: true; hash: string; transactionId: string | null; ms: number } | { ok: false; error: string };

async function sendOne(address: string): Promise<SendResult> {
  const start = Date.now();
  try {
    const { func, auth } = await prepareFuncAuth(address);
    const res = await callPlugin({ func, auth, sim: true });

    // Print logs and traces (pretty printed)
    if (res?.data?.logs && res.data.logs.length > 0) {
      console.log(`\n[${getTimestamp()}] Logs:`);
      res.data.logs.forEach((log: any) => {
        if (typeof log === 'object') {
          console.log(`  Level: ${log.level}`);
          console.log(`  Message: ${log.message}`);
        } else {
          console.log(`  ${log}`);
        }
      });
    }
    if (res?.data?.traces && res.data.traces.length > 0) {
      console.log(`\n[${getTimestamp()}] Traces:`);
      res.data.traces.forEach((trace: any) => {
        console.log(`  → ${trace.method} (${trace.relayerId})`);
        if (trace.payload && Object.keys(trace.payload).length > 0) {
          console.log(`    Payload: ${JSON.stringify(trace.payload, null, 2).replace(/\n/g, '\n    ')}`);
        }
      });
    }

    const rv = unwrapReturnValue(res);

    if (rv?.error) {
      // Print logs/traces for errors too
      if (res?.data?.logs && res.data.logs.length > 0) {
        console.log(`\n[${getTimestamp()}] Error Logs:`);
        res.data.logs.forEach((log: any) => {
          if (typeof log === 'object') {
            console.log(`  Level: ${log.level}`);
            console.log(`  Message: ${log.message}`);
          } else {
            console.log(`  ${log}`);
          }
        });
      }
      if (res?.data?.traces && res.data.traces.length > 0) {
        console.log(`\n[${getTimestamp()}] Error Traces:`);
        res.data.traces.forEach((trace: any) => {
          console.log(`  → ${trace.method} (${trace.relayerId})`);
          if (trace.payload && Object.keys(trace.payload).length > 0) {
            console.log(`    Payload: ${JSON.stringify(trace.payload, null, 2).replace(/\n/g, '\n    ')}`);
          }
        });
      }
      return { ok: false, error: String(rv.error) };
    }

    const result = rv?.data?.result || rv?.result || rv;
    const hash: string | undefined = result?.hash ?? result?.txHash ?? result?.transactionHash;
    const transactionId: string | null = result?.transactionId ?? null;
    if (!hash) {
      return { ok: false, error: 'No hash returned' };
    }

    return { ok: true, hash, transactionId, ms: Date.now() - start };
  } catch (e: any) {
    // Check if axios error has response data with logs/traces
    if (e.response?.data) {
      const errRes = e.response.data;
      if (errRes?.data?.logs && errRes.data.logs.length > 0) {
        console.log(`\n[${getTimestamp()}] Error Logs (from exception):`);
        errRes.data.logs.forEach((log: any) => {
          if (typeof log === 'object') {
            console.log(`  Level: ${log.level}`);
            console.log(`  Message: ${log.message}`);
          } else {
            console.log(`  ${log}`);
          }
        });
      }
      if (errRes?.data?.traces && errRes.data.traces.length > 0) {
        console.log(`\n[${getTimestamp()}] Error Traces (from exception):`);
        errRes.data.traces.forEach((trace: any) => {
          console.log(`  → ${trace.method} (${trace.relayerId})`);
          if (trace.payload && Object.keys(trace.payload).length > 0) {
            console.log(`    Payload: ${JSON.stringify(trace.payload, null, 2).replace(/\n/g, '\n    ')}`);
          }
        });
      }
    }
    return { ok: false, error: e?.message || String(e) };
  }
}

function isTransientError(msg: string): boolean {
  const m = msg.toLowerCase();
  return (
    m.includes('lock') ||
    m.includes('busy') ||
    m.includes('queued') ||
    m.includes('queue') ||
    m.includes('capacity') ||
    m.includes('try again') ||
    m.includes('rate')
  );
}

async function retrySendOne(address: string, maxRetries = 6): Promise<SendResult> {
  let attempt = 0;
  while (true) {
    const res = await sendOne(address);
    if (res.ok) return res;
    if (attempt >= maxRetries || !isTransientError(res.error)) return res;
    const backoff = Math.min(200 * Math.pow(2, attempt), 2000) + Math.floor(Math.random() * 200);
    await new Promise((r) => setTimeout(r, backoff));
    attempt += 1;
  }
}

async function ensureSequenceAccountsConfigured(): Promise<number | null> {
  try {
    const res1 = await callPlugin({ management: { action: 'listSequenceAccounts', adminSecret: ADMIN_SECRET } });
    const rv1 = unwrapReturnValue(res1);

    if (rv1?.error === 'management_disabled') {
      console.log(`⚠️  Management API disabled. Set LAUNCHTUBE_ADMIN_SECRET="${ADMIN_SECRET}" to enable.`);
      return null;
    }

    if (rv1?.error === 'unauthorized') {
      console.log(`⚠️  Management API authentication failed.`);
      return null;
    }

    const result1 = rv1?.data?.result || rv1?.result || rv1;
    const current: string[] = Array.isArray(result1?.relayerIds) ? result1.relayerIds : [];
    if (current.length > 0) {
      console.log(`Found ${current.length} sequence accounts configured`);
      return current.length;
    }

    console.log(`Setting up ${DEFAULT_RELAYER_IDS.length} sequence accounts...`);
    const setRes = await managementSet(DEFAULT_RELAYER_IDS);
    if (!setRes.ok) {
      console.log(`Failed to set sequence accounts: ${setRes.error}`);
      return 0;
    }

    const res2 = await callPlugin({ management: { action: 'listSequenceAccounts', adminSecret: ADMIN_SECRET } });
    const rv2 = unwrapReturnValue(res2);
    const result2 = rv2?.data?.result || rv2?.result || rv2;
    const after: string[] = Array.isArray(result2?.relayerIds) ? result2.relayerIds : [];
    console.log(`✓ Configured ${after.length} sequence accounts`);
    return after.length;
  } catch (e: any) {
    console.error(`Management API error:`, e.message || e);
    return null;
  }
}

async function main() {
  const { address } = getKeypair();
  // const capacity = await ensureSequenceAccountsConfigured();
  // if (!capacity || capacity <= 0) {
  //   console.log(`[${getTimestamp()}] No sequence capacity configured; exiting.`);
  //   process.exit(1);
  // }
  const capacity = 2;
  const COUNT = 2;
  const CONCURRENCY = capacity;
  console.log(
    `\n[${getTimestamp()}] 🚀 Stress test with sim=true + invoker auth: sending ${COUNT} balance checks concurrently=${CONCURRENCY} (capacity=${capacity})\n`,
  );
  console.log(`Note: Using func+auth WITHOUT source account auth - true concurrent execution\n`);

  let success = 0;
  let failure = 0;

  let nextIndex = 0;
  async function worker(_workerId: number) {
    while (true) {
      const i = nextIndex++;
      if (i >= COUNT) break;

      const res = await retrySendOne(address);
      if (res.ok) {
        success += 1;
        console.log(`[${getTimestamp()}] [#${i + 1} ✅] hash=${res.hash} (${res.ms}ms) txId=${res.transactionId}`);
      } else {
        failure += 1;
        console.log(`[${getTimestamp()}] [#${i + 1} ❌] ${res.error}`);
      }
    }
  }

  await Promise.allSettled(Array.from({ length: CONCURRENCY }, (_, w) => worker(w)));

  console.log(`\n[${getTimestamp()}] Summary`);
  console.log(`[${getTimestamp()}] - Total:   ${COUNT}`);
  console.log(`[${getTimestamp()}] - Success: ${success}`);
  console.log(`[${getTimestamp()}] - Failed:  ${failure}`);
}

main().catch((e) => {
  console.error(`[${getTimestamp()}] ${e}`);
  process.exit(1);
});
