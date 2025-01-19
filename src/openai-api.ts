import OpenAI from 'openai';

export async function callLLM(messages: OpenAI.ChatCompletionMessageParam[]) {
  const client = new OpenAI();

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages,
  });

  return response.choices[0].message;
}
