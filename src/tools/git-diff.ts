import { z } from 'npm:zod';
import { ToolFn } from '../types.ts';

export const gitDiffToolDefinition = {
  name: 'git_diff',
  description:
    'Compare the current working directory with the latest commit in the git repository.',
  parameters: z.object({}),
};

type Args = z.infer<typeof gitDiffToolDefinition.parameters>;

export const gitDiff: ToolFn<Args, string> = async ({ toolArgs }) => {
  const command = new Deno.Command('git', {
    args: ['diff'],
    stdout: 'piped',
    stderr: 'piped',
  });

  const { code, stdout, stderr } = await command.output();
  if (code !== 0) {
    console.log('Error running git diff:', new TextDecoder().decode(stderr));
  }

  return new TextDecoder().decode(stdout);
};
