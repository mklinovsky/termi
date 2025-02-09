import { callLLM } from '../llm.ts';
import { getExplainerPrompt } from '../prompts.ts';
import type { AiMessage } from '../types.ts';
import * as readline from 'readline';
import chalk from 'chalk';

async function explain() {
  const systemPrompt = await getExplainerPrompt();
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const messages: AiMessage[] = [{ role: 'system', content: systemPrompt }];

  rl.on('line', async (input) => {
    if (!input) {
      rl.close();
      return;
    }

    const userMessage: AiMessage = { role: 'user', content: input };
    messages.push(userMessage);

    const aiResponse = await callLLM(messages);

    const assistantMessage: AiMessage = { role: 'assistant', content: aiResponse.content };
    messages.push(assistantMessage);

    console.log(chalk.green(`\n🤖 ${aiResponse.content}\n`));
  });

  rl.on('close', () => {
    process.exit(0);
  });
}
