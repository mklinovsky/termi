import chalk from 'chalk';
import { readFromStream } from '../io/read-from-stream.ts';
import { callLLM } from './llm.ts';
import { saveConversation } from '../store.ts';
import {
  assistantLoadingText,
  type AiMessage,
  type AssistantType,
} from '../types.ts';
import ora from 'ora';
import { getSystemPrompt } from './prompts.ts';

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

  const systemPrompt = await getSystemPrompt(type);
  const systemMessage: AiMessage = { role: 'system', content: systemPrompt };
  const userMessage: AiMessage[] = [{ role: 'user', content: userInput }];

  if (context) {
    userMessage.unshift({ role: 'user' as const, content: context });
  }

  const spinner = ora({
    color: 'yellow',
    text: assistantLoadingText[type],
  }).start();

  const aiResponse = await callLLM([systemMessage, ...userMessage]);

  spinner.stop();

  await saveConversation(type, [...userMessage, aiResponse]);

  console.log(`\n${chalk.green(aiResponse.content)}`);
}
