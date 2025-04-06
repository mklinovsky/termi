import type OpenAI from '@openai/openai';
import { generateImage, imageToolDefinition } from './generate-image.ts';
import { listFiles, listFilesToolDefinition } from './list-files.ts';
import { createFile, createFileToolDefinition } from './create-file.ts';
import { readFile, readFileToolDefinition } from './read-file.ts';
import { gitDiff, gitDiffToolDefinition } from './git-diff.ts';

export function runTool(
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  };

  switch (toolCall.function.name) {
    case imageToolDefinition.name:
      return generateImage(input);
    case listFilesToolDefinition.name:
      return listFiles(input);
    case createFileToolDefinition.name:
      return createFile(input);
    case readFileToolDefinition.name:
      return readFile(input);
    case gitDiffToolDefinition.name:
      return gitDiff(input);
    default:
      return `Never run this tool: ${toolCall.function.name} again!`;
  }
}
