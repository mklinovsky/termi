import chalk from "npm:chalk";
import { Spinner } from "@std/cli/unstable-spinner";
import { readFromStream } from "../io/read-from-stream.ts";
import { callLLM } from "./llm.ts";
import { saveConversation } from "../store.ts";
import {
  type AiMessage,
  assistantLoadingText,
  type AssistantType,
} from "../types.ts";
import { getSystemPrompt } from "./prompts.ts";

export async function assistant(
  type: AssistantType,
  input?: string,
  context?: string,
) {
  let userInput = input;
  if (!userInput) {
    userInput = await readFromStream();
    if (!userInput) {
      return;
    }
  }

  const systemPrompt = getSystemPrompt(type);
  const systemMessage: AiMessage = { role: "developer", content: systemPrompt };
  const userMessage: AiMessage[] = [{ role: "user", content: userInput }];

  if (context) {
    userMessage.unshift({ role: "user" as const, content: context });
  }

  const spinner = new Spinner({
    color: "yellow",
    message: assistantLoadingText[type],
  });

  spinner.start();
  const aiResponse = await callLLM([systemMessage, ...userMessage], []);
  spinner.stop();

  await saveConversation(type, [...userMessage, aiResponse]);

  console.log(`\n${chalk.green(aiResponse.content)}`);
}
