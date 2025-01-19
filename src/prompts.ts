import { readFileSync } from 'node:fs';

export async function getSystemPrompt() {
  const file = readFileSync('./prompts/system.txt', 'utf8');
  return addContext(file);
}

function addContext(prompt: string) {
  const context = `<context>Current date and time: ${new Date().toString()}</context>`;
  return `${prompt}\n\n${context}`;
}
