#! /usr/bin/env -S node --no-warnings

import { Command } from 'commander';
import { startChat } from '../src/assistants/chat.ts';
import { assistant } from '../src/assistants/assistant.ts';
import { clearData } from '../src/store.ts';
import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

try {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  config({ path: path.resolve(__dirname, '../.env') });

  const program = new Command();

  program
    .name('termi')
    .description('A CLI tool with usefull ai assistants and chat')
    .version('1.0.0');

  program
    .command('chat')
    .description('Start chat mode')
    .option('-c, --context <context>', 'Specify context for the chat')
    .action((options) => {
      startChat(options.context);
    });

  program
    .command('assistant')
    .description('Run the assistant')
    .option('-t, --type <type>', 'Specify the assistant type')
    .option('-c, --context <context>', 'Specify context for the assistant')
    .argument('[message...]', 'Message to send')
    .action((message, options) => {
      const input = message.join(' ');
      assistant(options.type, input, options.context);
    });

  program
    .command('clear-data')
    .description('Clear conversations data')
    .action(clearData);

  program.parse(process.argv);
} catch (e) {
  console.error(e);
}
