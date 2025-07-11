import { writable, get } from 'svelte/store';
import { deleteMessageHistory } from './chat';

// FIX: Export the interface
export interface Conversation {
  id: string;
  title: string;
  pinned: boolean;
}

// Mock data for our conversation list
const initialConversations: Conversation[] = [
  { id: '1', title: 'Python Hello World', pinned: true },
  { id: '2', title: 'History of the Roman Empire', pinned: false },
  { id: '3', title: 'SvelteKit vs. Next.js', pinned: false },
  { id: '4', title: 'Unsaved Conversation', pinned: false }
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

export function togglePin(id: string) {
    conversations.update(convs => {
        const conv = convs.find(c => c.id === id);
        if (conv) {
            conv.pinned = !conv.pinned;
        }
        return [...convs]; // Return new array to trigger update
    });
}