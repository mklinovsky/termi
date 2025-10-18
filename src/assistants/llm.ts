import OpenAI from "@openai/openai";
import { zodFunction } from "@openai/openai/helpers/zod";
import type { AiMessage, ToolDefinition } from "../types.ts";
import { AnyZodObject } from "zod";

export async function callLLM(
  messages: AiMessage[],
  tools: ToolDefinition<AnyZodObject>[],
) {
  const client = new OpenAI();

  const formattedTools = tools.map(zodFunction);

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    messages,
    tools: formattedTools,
    tool_choice: "auto",
  });

  return response.choices[0].message;
}
