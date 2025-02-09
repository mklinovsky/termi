#! /usr/bin/env node

import 'dotenv/config';
import { Command } from 'commander';
import { startChat } from '../src/assistants/chat.ts';
import { assistant } from '../src/assistants/assistant.ts';

const program = new Command();

program
  .name('termi')
  .description('A CLI tool with usefull ai assistants and chat')
  .version('1.0.0');

program.command('chat').description('Start chat mode').action(startChat);

program
  .command('assistant')
  .description('Run the assistant')
  .option('-t, --type <type>', 'Specify the assistant type')
  .action((options) => {
    assistant(options.type);
  });

program.parse(process.argv);
