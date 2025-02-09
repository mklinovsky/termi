import chalk from 'chalk';
import { readFromStream } from '../io/read-from-stream.ts';
import { callLLM } from './llm.ts';
import { saveConversation } from '../store.ts';
import type { AiMessage, AssistantType } from '../types.ts';
import ora from 'ora';
import { getSystemPrompt } from './prompts.ts';

export async function assistant(type: AssistantType) {
  const input = await readFromStream();
  if (!input) {
    return;
  }

  const systemPrompt = await getSystemPrompt(type);
  const systemMessage: AiMessage = { role: 'system', content: systemPrompt };
  const userMessage: AiMessage = { role: 'user', content: input };

  const spinner = ora({ color: 'yellow' }).start();
  const aiResponse = await callLLM([systemMessage, userMessage]);
  spinner.stop();

  await saveConversation(type, [userMessage, aiResponse]);

  console.log(chalk.green(aiResponse.content));
}
