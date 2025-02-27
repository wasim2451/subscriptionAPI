import { Client as WorkflowClient } from '@upstash/workflow';

import { QSTASH_TOKEN, QSTASH_URL } from './env.js';

export const workflowClient = new WorkflowClient({
  baseUrl: QSTASH_URL || "http://127.0.0.1:3000",
  token: QSTASH_TOKEN,
});