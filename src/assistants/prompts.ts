import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { ConversationType } from '../types.ts';
import { fileURLToPath } from 'node:url';

export async function getSystemPrompt(type: ConversationType) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const file = readFileSync(
    path.join(__dirname, `../../prompts/${type}.txt`),
    'utf8',
  );

  return addContext(file);
}

function addContext(prompt: string) {
  const context = `<context>Current date and time: ${new Date().toString()}</context>`;
  return `${prompt}\n\n${context}`;
}
