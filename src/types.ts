import { OpenAI } from '@openai/openai';

export type AiMessage = OpenAI.ChatCompletionMessageParam;

export type AssistantType = 'explain' | 'review' | 'ask' | 'bash' | 'writer';
export type ConversationType = 'chat' | AssistantType;

export type Conversation = {
  id: string;
  type: ConversationType;
  messages: AiMessage[];
};

export const assistantLoadingText: Record<AssistantType, string> = {
  explain: 'Explaining...',
  review: 'Reviewing...',
  ask: 'Asking...',
  bash: 'Creating bash command...',
  writer: 'Writing...',
};
