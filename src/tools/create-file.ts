import { ensureDir } from '@std/fs';
import { dirname, resolve } from '@std/path';
import { z } from 'npm:zod';
import { ToolFn } from '../types.ts';

export const createFileToolDefinition = {
  name: 'create_file',
  description: 'Create a file with the specified content at the given path.',
  parameters: z.object({
    path: z.string().describe('The path where the file should be created'),
    content: z.string().describe('The content to write to the file'),
  }),
};

type Args = z.infer<typeof createFileToolDefinition.parameters>;

export const createFile: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { path, content } = toolArgs;

  try {
    const currentDir = Deno.cwd();
    const resolvedPath = resolve(currentDir, path);
    if (!resolvedPath.startsWith(currentDir)) {
      throw new Error('Path escapes the current directory');
    }

    const directory = dirname(resolvedPath);
    await ensureDir(directory);

    await Deno.writeTextFile(resolvedPath, content);

    const message = `File created: ${resolvedPath}`;
    console.log(message);
    return message;
  } catch (error) {
    return `Error creating file: ${error}`;
  }
};
