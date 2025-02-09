import 'dotenv/config';
import { startChat } from './assistants/chat.ts';
import { assistant } from './assistants/assistant.ts';

startChat();
assistant('explain');
