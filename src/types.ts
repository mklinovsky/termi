import OpenAI from 'openai';

export type AiMessage = OpenAI.ChatCompletionMessageParam;

export type AssistantType = 'explain' | 'review';
export type ConversationType = 'chat' | AssistantType;

export type Conversation = {
  id: string;
  type: ConversationType;
  messages: AiMessage[];
};
