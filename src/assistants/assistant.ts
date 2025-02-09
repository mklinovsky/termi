import { callLLM } from '../llm.ts';
import { getSystemPrompt } from '../prompts.ts';
import { createConversation, saveMessages } from '../store.ts';
import type { AiMessage } from '../types.ts';
import * as readline from 'readline';
import chalk from 'chalk';

export async function startChat() {
  const conversationId = await createConversation();
  const systemPrompt = await getSystemPrompt();
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const messages: AiMessage[] = [{ role: 'system', content: systemPrompt }];

  while (true) {
    const userInput = await getUserInput(rl);
    if (!userInput) {
      break;
    }

    const userMessage: AiMessage = { role: 'user', content: userInput };
    messages.push(userMessage);

    const aiResponse = await callLLM(messages);

    const assistantMessage: AiMessage = { role: 'assistant', content: aiResponse.content };
    messages.push(assistantMessage);

    await saveMessages(conversationId, [userMessage, assistantMessage]);

    console.log(chalk.green(`\n🤖 ${aiResponse.content}\n`));
  }

  rl.close();
}

function getUserInput(rl: readline.Interface): Promise<string | undefined> {
  return new Promise((resolve) => {
    rl.question(chalk.yellow('>> '), (input) => {
      resolve(input);
    });
  });
}