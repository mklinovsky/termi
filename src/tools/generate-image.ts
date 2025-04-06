import { z } from 'npm:zod';
import { ToolFn } from '../types.ts';
import OpenAI from '@openai/openai';

export const imageToolDefinition = {
  name: 'generate_image',
  description: 'generate an image',
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        'Prompt for the image. Be sure to consider the users original message when making the prompt. If you are unsure then ask the user to provide more details.',
      ),
  }),
};

type Args = z.infer<typeof imageToolDefinition.parameters>;

export const generateImage: ToolFn<Args, string> = async ({ toolArgs }) => {
  const client = new OpenAI();
  const response = await client.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    n: 1,
    size: '1024x1024',
  });

  return response.data[0].url!;
};
