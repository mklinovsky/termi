import OpenAI from 'openai';

export type AiMessage = OpenAI.ChatCompletionMessageParam;

export type Conversation = {
    id: string;
    messages: AiMessage[];
}
