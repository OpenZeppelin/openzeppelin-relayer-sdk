import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    constant_15m_100rpm: {
      executor: 'constant-arrival-rate',
      rate: 500,
      timeUnit: '1m',
      duration: '15m',
      preAllocatedVUs: 1,
      maxVUs: 100,
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.05'],
  },
};

const API_URL = 'http://localhost:8080';
const ACCESS_TOKEN = '';

const RELAYER_IDS = ['sepolia-example'];

export default function () {
  const payload = JSON.stringify({
    to: '0x8b3ABb6545DB5A49B19F7bF6c7CD4a6E55d640c1',
    value: 0,
    data: '0x',
    gas_limit: 21000,
    gas_price: 1,
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  for (const relayer_id of RELAYER_IDS) {
    const res = http.post(`${API_URL}/api/v1/relayers/${relayer_id}/transactions`, payload, { headers });

    check(res, {
      'Status code 200': (r) => r.status === 200,
      'Response time < 500ms': (r) => r.timings.duration < 500,
    });
  }
}
