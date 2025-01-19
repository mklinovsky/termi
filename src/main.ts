import { callLLM } from './openai-api.ts';
import { getSystemPrompt } from './prompts.ts';
import 'dotenv/config';

const systemPrompt = await getSystemPrompt();

const response = await callLLM([
  {
    role: 'system',
    content: systemPrompt,
  },
  {
    role: 'user',
    content: 'hey ;)',
  },
]);

console.log(response);
