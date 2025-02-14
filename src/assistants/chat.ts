import { callLLM } from './llm.ts';
import { getSystemPrompt } from './prompts.ts';
import { createConversation, saveMessages } from '../store.ts';
import type { AiMessage } from '../types.ts';
import chalk from 'chalk';
import { getUserInput } from '../io/get-user-input.ts';
import ora from 'ora';
import { createReadlineInterface } from '../io/readline-interface.ts';

export async function startChat(context: string) {
  const conversationId = await createConversation('chat');
  const systemPrompt = await getSystemPrompt('chat');

  const messages: AiMessage[] = [{ role: 'system', content: systemPrompt }];
  if (context) {
    messages.push({
      role: 'user',
      content: context,
    });
  }

  const spinner = ora({
    color: 'yellow',
    text: 'Thinking...',
  });

  while (true) {
    const rl = createReadlineInterface();
    const userInput = await getUserInput(rl);
    if (!userInput) {
      break;
    }

    const userMessage: AiMessage = { role: 'user', content: userInput };
    messages.push(userMessage);

    spinner.start();
    const aiResponse = await callLLM(messages);
    spinner.stop();

    const assistantMessage: AiMessage = {
      role: 'assistant',
      content: aiResponse.content,
    };
    messages.push(assistantMessage);

    await saveMessages(conversationId, [userMessage, assistantMessage]);

    rl.write(chalk.green(`\n🤖 ${aiResponse.content}\n\n`));
    rl.close();
  }
}
