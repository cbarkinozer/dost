import { writable } from 'svelte/store';

// Define the structure of a single message
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  // We'll add more fields like id, timestamp later
}

// This is our initial dummy data
const initialMessages: Message[] = [
  {
    role: "user",
    content: "Hello! Can you explain what Svelte is in simple terms?"
  },
  {
    role: "assistant",
    content: "Of course! Svelte is a modern web framework..." // (keep the long text)
  }
];

// Create the writable store
export const messages = writable<Message[]>(initialMessages);