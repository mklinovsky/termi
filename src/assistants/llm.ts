import OpenAI from "jsr:@openai/openai";
import { zodFunction } from "@openai/openai/helpers/zod";
import type { AiMessage, ToolDefinition } from "../types.ts";
import { ZodObject } from "npm:zod@3";

export async function callLLM(
  messages: AiMessage[],
  tools: ToolDefinition<ZodObject>[],
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
