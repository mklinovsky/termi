import { callLLM } from './llm.ts';
import { getSystemPrompt } from './prompts.ts';
import { createConversation, saveMessages } from '../store.ts';
import type { AiMessage } from '../types.ts';
import chalk from 'npm:chalk';
import { Spinner } from '@std/cli/unstable-spinner';
import { tools } from '../tools/index.ts';
import { runTool } from '../tools/tool-runner.ts';

export async function startChat(context?: string) {
  const conversationId = await createConversation('chat');
  const systemPrompt = getSystemPrompt('chat');

  const messages: AiMessage[] = [{ role: 'developer', content: systemPrompt }];
  if (context) {
    const contextMessage = {
      role: 'user' as const,
      content: context,
    };

    // TODO: remove messages array, use only the store
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
    await saveMessages(conversationId, [userMessage]);

    spinner.message = 'Thinking...';
    spinner.start();

    const aiResponseContent = await processAiResponse(
      messages,
      userInput,
      spinner,
      conversationId,
    );

    spinner.stop();

    console.log(chalk.green(`\n🤖 ${aiResponseContent}\n`));
  }
}

async function processAiResponse(
  messages: AiMessage[],
  userInput: string,
  spinner: Spinner,
  conversationId: string,
): Promise<string> {
  let aiResponseContent = '';

  while (true) {
    const aiResponse = await callLLM(messages, tools);
    messages.push(aiResponse);
    aiResponseContent = aiResponse.content ?? '';
    await saveMessages(conversationId, [aiResponse]);

    const toolCall = aiResponse?.tool_calls?.[0];

    if (toolCall) {
      spinner.message = `⚙️ Tool: ${toolCall.function.name}`;
      const toolResponse = await runTool(toolCall, userInput);
      const toolMessage: AiMessage = {
        role: 'tool',
        tool_call_id: toolCall.id,
        content: toolResponse,
      };

      messages.push(toolMessage);
      await saveMessages(conversationId, [toolMessage]);
    } else {
      break;
    }
  }

  return aiResponseContent;
}
