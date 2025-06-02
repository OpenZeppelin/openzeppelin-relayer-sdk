import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  scenarios: {
    ramp_up_load: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '30s', target: 5 },
        { duration: '1m', target: 10 },
        { duration: '30s', target: 20 },
        { duration: '2m', target: 20 },
        { duration: '30s', target: 0 },
      ],
    },

    spike_test: {
      executor: 'ramping-vus',
      startTime: '5m',
      stages: [
        { duration: '10s', target: 100 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.05'],
    errors: ['rate<0.1'],
  },
};

const BASE_URL = 'http://localhost:8080';
const API_KEY = '';
const RELAYER_ID = 'solana-example';

const TEST_ADDRESSES = [
  {
    source: 'C6VBV1EK2Jx7kFgCkCD5wuDeQtEH8ct2hHGUPzEhUSc8',
    destination: 'Gt6wiPeC3XqNZKnMcM2dbRZCkKr1PtytBxf9hhV7Hxew',
    token: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr',
  }
];

const EXAMPLE_TRANSACTIONS = [
  "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEEpNhTBS0w2fqEkg0sAghld4KIZNFW3kt5Co2TA75icpFXUozJzlyGqhR/tiHcFoAVHrLbEWDYvjIYRTiK8cmslQyyefIptlnnJS0Own/yvQo7suLcETBmhaz6c4nOhfC+Bt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKmUfaCdojgspoywgTVm0HurasSwec7WqVD5Ad7bLTKPyQEDAwIBAAkDQEIPAAAAAAA=",
];

function getRandomTransaction() {
  return EXAMPLE_TRANSACTIONS[Math.floor(Math.random() * EXAMPLE_TRANSACTIONS.length)];
}

export default function () {  
  const payload = JSON.stringify({
    method: 'signAndSendTransaction',
    id: Math.floor(Math.random() * 1000000),
    jsonrpc: '2.0',
    params: {
      transaction: getRandomTransaction(),
    },
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    timeout: '30s',
  };

  const response = http.post(
    `${BASE_URL}/api/v1/relayers/${RELAYER_ID}/rpc`,
    payload,
    params
  );

  const success = check(response, {
    'Statuscode 200': (r) => r.status === 200,
    'Response time < 500ms': (r) => r.timings.duration < 500,
    'response has data': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body && (body.result !== undefined || body.error !== undefined);
      } catch (e) {
        return false;
      }
    },
    'no encoding errors': (r) => {
      try {
        const body = JSON.parse(r.body);
        return !body.error || !body.error.message.includes('Encoding error');
      } catch (e) {
        return true;
      }
    },
  });

  errorRate.add(!success);

  if (!success || response.status !== 200) {
    console.error(`Errored: Status ${response.status}, Body: ${response.body}`);
  }
}

export function setup() {
  console.log('Starting Relayer API Load Test');
  console.log(`Target URL: ${BASE_URL}`);
  console.log(`Relayer ID: ${RELAYER_ID}`);
  
  const healthCheck = http.get(`${BASE_URL}/api/v1/health`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
  });
  
  if (healthCheck.status !== 200) {
    console.warn(`Health check failed: ${healthCheck.status}`);
  }
  
  return { timestamp: new Date().toISOString() };
}

export function teardown(data) {
  console.log(`Completed at: ${new Date().toISOString()}`);
  console.log(`Started at: ${data.timestamp}`);
}

export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data, null, 2),
    stdout: `
    ========== Summary ==========
    Total Requests: ${data.metrics.http_reqs.values.count}
    Failed Requests: ${data.metrics.http_req_failed.values.passes}
    Average Response Time: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms
    95th Percentile: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms
    Max Response Time: ${data.metrics.http_req_duration.values.max.toFixed(2)}ms
    ======================================
    `,
  };
}
