import { Command } from "commander";
import { startChat } from "./assistants/chat.ts";
import { assistant } from "./assistants/assistant.ts";
import { clearData } from "./store.ts";

try {
  const program = new Command();

  program
    .name("termi")
    .description("A CLI tool with AI assistants and chat.")
    .version("1.0.0");

  program
    .command("chat")
    .description("Start chat mode")
    .option("-c, --context <context>", "Specify context for the chat")
    .action((options) => {
      startChat(options.context);
    });

  program
    .command("assistant")
    .description("Run the assistant")
    .option("-t, --type <type>", "Specify the assistant type")
    .option("-c, --context <context>", "Specify context for the assistant")
    .argument("[message...]", "Message to send")
    .action((message, options) => {
      const input = message.join(" ");
      assistant(options.type, input, options.context);
    });

  program
    .command("clear-data")
    .description("Clear conversations data")
    .action(clearData);

  program.parse();
} catch (e) {
  console.error(e);
}
