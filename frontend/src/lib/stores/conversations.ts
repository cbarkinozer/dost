import { writable, get } from 'svelte/store';
import { deleteMessageHistory } from './chat';

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
export const selectedConversationId = writable<string | null>(null);

export function deleteConversation(id: string) {
    conversations.update(convs => convs.filter(c => c.id !== id));
    deleteMessageHistory(id);

    // If we deleted the selected chat, deselect it
    if (get(selectedConversationId) === id) {
        selectedConversationId.set(null);
    }
}