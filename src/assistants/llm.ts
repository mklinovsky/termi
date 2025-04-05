import OpenAI from '@openai/openai';
import type { AiMessage } from '../types.ts';

export async function callLLM(messages: AiMessage[]) {
  const client = new OpenAI();

  const response = await client.chat.completions.create({
    model: 'o3-mini',
    messages,
  });

  return response.choices[0].message;
}
