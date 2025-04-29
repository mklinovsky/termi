import { join } from "@std/path";
import type { ConversationType } from "../types.ts";

export function getSystemPrompt(type: ConversationType) {
  const filename = join(import.meta.dirname ?? "", `../../prompts/${type}.txt`);
  const file = Deno.readTextFileSync(filename);

  return addContext(file);
}

function addContext(prompt: string) {
  const context = `<context>Current date and time: ${
    new Date().toString()
  }</context>`;
  return `${prompt}\n\n${context}`;
}
