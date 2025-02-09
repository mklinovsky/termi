import { JSONFilePreset } from 'lowdb/node';
import { type AiMessage, type Conversation } from './types.ts';
import { randomUUID } from 'node:crypto';

type Data = {
  conversations: Conversation[];
};

const defaultData: Data = { conversations: [] };

async function getDb() {
  const db = await JSONFilePreset<Data>('db.json', defaultData);
  return db;
}

export async function getData() {
  const db = await getDb();
  return db.data;
}

export async function createConversation() {
  const db = await getDb();
  const conversation = { id: randomUUID(), messages: [] };

  db.data.conversations.push(conversation);
  await db.write();

  return conversation.id;
}

export async function saveMessages(
  conversationId: string,
  messages: AiMessage[],
) {
  const db = await getDb();
  const conversation = db.data.conversations.find(
    (c) => c.id === conversationId,
  );

  if (!conversation) {
    throw new Error(`Conversation with id ${conversationId} not found`);
  }

  conversation.messages.push(...messages);
  await db.write();
}

export async function clearData() {
  const db = await getDb();
  db.data = defaultData;
  await db.write();
}

