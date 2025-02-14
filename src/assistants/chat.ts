import { callLLM } from './llm.ts';
import { getSystemPrompt } from './prompts.ts';
import { createConversation, saveMessages } from '../store.ts';
import type { AiMessage } from '../types.ts';
import chalk from 'chalk';
import { rl } from '../io/readline-interface.ts';
import { getUserInput } from '../io/get-user-input.ts';

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

  while (true) {
    const userInput = await getUserInput(rl);
    if (!userInput) {
      break;
    }

    const userMessage: AiMessage = { role: 'user', content: userInput };
    messages.push(userMessage);

    const aiResponse = await callLLM(messages);

    const assistantMessage: AiMessage = {
      role: 'assistant',
      content: aiResponse.content,
    };
    messages.push(assistantMessage);

    await saveMessages(conversationId, [userMessage, assistantMessage]);

    rl.write(chalk.green(`\n🤖 ${aiResponse.content}\n\n`));
  }

  rl.close();
}
