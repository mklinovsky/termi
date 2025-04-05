import { callLLM } from './llm.ts';
import { getSystemPrompt } from './prompts.ts';
import { createConversation, saveMessages } from '../store.ts';
import type { AiMessage } from '../types.ts';
import chalk from 'npm:chalk';
import { Spinner } from '@std/cli/unstable-spinner';

export async function startChat(context?: string) {
  const conversationId = await createConversation('chat');
  const systemPrompt = getSystemPrompt('chat');

  const messages: AiMessage[] = [{ role: 'developer', content: systemPrompt }];
  if (context) {
    const contextMessage = {
      role: 'user' as const,
      content: context,
    };

    messages.push(contextMessage);
    await saveMessages(conversationId, [contextMessage]);
  }

  const spinner = new Spinner({
    color: 'yellow',
    message: 'Thinking...',
  });

  while (true) {
    const userInput = prompt(chalk.yellow('>>'));
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

    console.log(chalk.green(`\n🤖 ${aiResponse.content}\n`));
  }
}
