import { join } from "@std/path";
import type { ConversationType } from "../types.ts";

export function getSystemPrompt(type: ConversationType) {
  const filename = join(import.meta.dirname ?? "", `../../prompts/${type}.txt`);
  const file = Deno.readTextFileSync(filename);

  return addContext(file);
}

function addContext(prompt: string) {
  const context = `
<context>
Current date and time: ${new Date().toString()}
User's OS: ${Deno.build.os}
Working directory: ${Deno.cwd()}
Shell: ${Deno.env.get("SHELL") || "unknown"}
Architecture: ${Deno.build.arch}

</context>`;

  return `${prompt}\n\n${context}`;
}
