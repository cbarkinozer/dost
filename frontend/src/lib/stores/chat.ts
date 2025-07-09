import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Helper to generate IDs safely
function generateId() {
  if (browser) return crypto.randomUUID();
  return Math.random().toString(36).substring(2, 15);
}

// A dictionary to hold all our mock conversations' messages
const mockMessageHistory: Record<string, Message[]> = {
    '1': [
        { id: generateId(), role: 'user', content: 'Can you give me a simple "Hello, World!" example in Python?' },
        { id: generateId(), role: 'assistant', content: `Of course! Here is a classic "Hello, World!" in Python:\n\n\`\`\`python\ndef say_hello():\n    print("Hello, World!")\n\nsay_hello()\n\`\`\`` }
    ],
    '2': [
        { id: generateId(), role: 'user', content: 'What was the main cause of the fall of the Roman Empire?' },
        { id: generateId(), role: 'assistant', content: 'Historians debate this, but key factors include economic troubles, overexpansion, political instability, and barbarian invasions.' }
    ],
    '3': [
        { id: generateId(), role: 'user', content: 'What are the main differences between SvelteKit and Next.js?' },
        { id:generateId(), role: 'assistant', content: 'SvelteKit compiles to vanilla JS at build time for performance, while Next.js (React) uses a virtual DOM at runtime. Svelte\'s reactivity is compiler-based, making it often simpler and faster.' }
    ],
    '4': [], // Unsaved Conversation starts empty
};

// The store now holds a dictionary of message arrays
export const messageStore = writable<Record<string, Message[]>>(mockMessageHistory);

// Helper function to add a message to a specific conversation
export function addMessage(conversationId: string, message: Message) {
    messageStore.update(history => {
        if (!history[conversationId]) {
            history[conversationId] = [];
        }
        // Use a functional update to ensure reactivity
        history[conversationId] = [...history[conversationId], message];
        return history;
    });
}

// Helper function to update the content of the last message (for streaming)
export function updateLastMessage(conversationId: string, contentChunk: string) {
    messageStore.update(history => {
        const conversationMessages = history[conversationId];
        if (conversationMessages && conversationMessages.length > 0) {
            const lastMessage = conversationMessages[conversationMessages.length - 1];
            lastMessage.content += contentChunk;
            history[conversationId] = [...conversationMessages]; // Trigger update
        }
        return history;
    });
}