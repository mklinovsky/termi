import OpenAI from 'openai';
import type { AiMessage } from '../types.ts';

export async function callLLM(messages: AiMessage[]) {
  const client = new OpenAI();

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.1,
    messages,
  });

  return response.choices[0].message;
}
