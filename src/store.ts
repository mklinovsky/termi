import { JSONFilePreset } from 'lowdb/node';

type Data = {
  messages: string[];
};

const defaultData: Data = { messages: [] };

async function getDb() {
  const db = await JSONFilePreset<Data>('db.json', defaultData);
  return db;
}

export async function getData() {
  const db = await getDb();
  return db.data;
}
