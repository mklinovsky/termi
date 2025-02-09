import { readFileSync } from 'node:fs';
import type { ConversationType } from '../types.ts';

export async function getSystemPrompt(type: ConversationType) {
  const file = readFileSync(`./prompts/${type}.txt`, 'utf8');
  return addContext(file);
}

function addContext(prompt: string) {
  const context = `<context>Current date and time: ${new Date().toString()}</context>`;
  return `${prompt}\n\n${context}`;
}
