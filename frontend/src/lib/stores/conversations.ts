import { writable } from 'svelte/store';

export interface Conversation {
  id: string;
  title: string;
}

// Mock data for our conversation list
const initialConversations: Conversation[] = [
  { id: '1', title: 'Python Hello World' },
  { id: '2', title: 'History of the Roman Empire' },
  { id: '3', title: 'SvelteKit vs. Next.js' },
  { id: '4', title: 'Unsaved Conversation' }
];

export const conversations = writable<Conversation[]>(initialConversations);
export const selectedConversationId = writable<string | null>('1');