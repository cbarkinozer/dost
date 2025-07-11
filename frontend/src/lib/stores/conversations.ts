import { writable, get } from 'svelte/store';
import { deleteMessageHistory } from './chat';

export interface Conversation {
  id: string;
  title: string;
  pinned: boolean;
  createdAt: Date; // Add the creation timestamp
}

// Mock data with timestamps
const initialConversations: Conversation[] = [
  { id: '1', title: 'Python Hello World', pinned: true, createdAt: new Date('2024-07-10T10:00:00Z') },
  { id: '2', title: 'History of the Roman Empire', pinned: false, createdAt: new Date('2024-07-12T11:00:00Z') },
  { id: '3', title: 'SvelteKit vs. Next.js', pinned: false, createdAt: new Date('2024-07-11T15:00:00Z') },
  { id: '4', title: 'Unsaved Conversation', pinned: false, createdAt: new Date('2024-07-12T12:00:00Z') }
];

export const conversations = writable<Conversation[]>(initialConversations);
export const selectedConversationId = writable<string | null>(null);

export function deleteConversation(id: string) {
    conversations.update(convs => convs.filter(c => c.id !== id));
    deleteMessageHistory(id);

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
        return [...convs];
    });
}

// New function to update a conversation's title
export function updateConversationTitle(id: string, newTitle: string) {
    conversations.update(convs => {
        const conv = convs.find(c => c.id === id);
        if (conv) {
            conv.title = newTitle;
        }
        return [...convs];
    });
}