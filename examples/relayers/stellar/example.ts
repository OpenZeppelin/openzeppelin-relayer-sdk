import { Address, Contract, Keypair, Networks, Operation, TransactionBuilder, rpc, xdr } from '@stellar/stellar-sdk';

import axios from 'axios';
import { execSync } from 'child_process';

const API_KEY = '75701925-d098-4794-9f3e-968082e19710';
const RPC = new rpc.Server('https://soroban-testnet.stellar.org');
const CONTRACT = new Contract('CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC');

const address = execSync('stellar keys address test-account', { encoding: 'utf8' }).trim();
const secret = execSync('stellar keys show test-account', { encoding: 'utf8' }).trim();
const keypair = Keypair.fromSecret(secret);

const callPlugin = async (params: any) => {
  try {
    return await axios.post(
      'http://localhost:8080/api/v1/plugins/launchtube-plugin/call',
      { params },
      { headers: { Authorization: `Bearer ${API_KEY}` } },
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('\n❌ API Request Failed');
      console.error('━'.repeat(50));

      // Basic error info
      console.error(`Status: ${error.response?.status} ${error.response?.statusText}`);
      console.error(`URL: ${error.config?.url}`);
      console.error(`Method: ${error.config?.method?.toUpperCase()}`);

      // Response data if available
      if (error.response?.data) {
        console.error('\nResponse Data:');
        console.error(JSON.stringify(error.response.data, null, 2));
      }

      // Request headers
      if (error.config?.headers) {
        console.error('\nRequest Headers:');
        const headers = { ...error.config.headers };
        // Hide sensitive auth token
        if (headers.Authorization) {
          headers.Authorization = 'Bearer ***';
        }
        console.error(JSON.stringify(headers, null, 2));
      }

      // Request body
      if (error.config?.data) {
        console.error('\nRequest Body:');
        const body = JSON.parse(error.config.data);
        console.error(JSON.stringify(body, null, 2));
      }

      console.error('━'.repeat(50));
    }
    throw error;
  }
};

const buildTransferTx = async (amount = '1000000') => {
  const account = await RPC.getAccount(address);

  console.log('Account:', account);
  return new TransactionBuilder(account, { fee: '100', networkPassphrase: Networks.TESTNET })
    .addOperation(
      CONTRACT.call(
        'transfer',
        Address.fromString(address).toScVal(),
        Address.fromString(address).toScVal(),
        xdr.ScVal.scvI128(new xdr.Int128Parts({ hi: xdr.Int64.fromString('0'), lo: xdr.Uint64.fromString(amount) })),
      ),
    )
    .setTimeout(30)
    .build();
};

async function testPreSimulated() {
  console.log('\n📋 Test 1: Pre-simulated transfer with XDR (sim=false)\n');

  const tx = await buildTransferTx();
  const simResult = await RPC.simulateTransaction(tx);

  if (rpc.Api.isSimulationError(simResult)) {
    throw new Error('Simulation failed: ' + simResult.error);
  }

  const finalTx = rpc.assembleTransaction(tx, simResult).build();
  finalTx.sign(keypair);

  const res = await callPlugin({ xdr: finalTx.toXDR(), sim: false });
  console.log('Full response:', JSON.stringify(res.data, null, 2));

  // Check if data exists and is not empty before parsing
  if (res.data) {
    try {
      console.log('Result:', res.data.data);
    } catch (e) {
      console.log('Return value (raw) err:', res.data.data);
      console.log('Failed to parse data as JSON:', (e as any).message);
    }
  } else {
    console.log('No data in response');
  }
}

async function testFuncAuth() {
  console.log('\n📋 Test 3: Transfer with func+auth (pre-simulated auth)\n');

  // First, build and simulate to get auth
  const tx = await buildTransferTx('1');
  const simResult = await RPC.simulateTransaction(tx);

  console.log('Sim result:', simResult);

  if (rpc.Api.isSimulationError(simResult)) {
    throw new Error('Simulation failed: ' + simResult.error);
  }

  // Get the assembled transaction which has auth
  const assembledTx = rpc.assembleTransaction(tx, simResult).build();
  const op = assembledTx.operations[0] as Operation.InvokeHostFunction;

  // Extract func and auth
  const func = op.func.toXDR('base64');
  const auth = op.auth?.map((a) => a.toXDR('base64')) || [];

  console.log('Auth entries from simulation:', auth.length);

  const res = await callPlugin({
    func: func,
    auth: auth,
    sim: true,
  });
  console.log('Full response:', JSON.stringify(res.data, null, 2));
  console.log('Return value:', res.data.data);
  if (res.data.data) {
    console.log('Result:', JSON.parse(res.data.data));
  }
}

async function test() {
  await testPreSimulated();
  // await testFuncAuth();
}

test().catch((error) => {
  if (!axios.isAxiosError(error)) {
    console.error('\n🚨 Test failed with error:', error.message);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
  }
  process.exit(1);
});
