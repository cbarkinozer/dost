import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Function to safely generate UUIDs
function generateId() {
  if (browser) {
    return crypto.randomUUID();
  }
  // Fallback for SSR: generate a simple random string.
  // This doesn't need to be cryptographically secure for our mock data.
  return Math.random().toString(36).substring(2, 15);
}

const initialMessages: Message[] = [
  {
    id: generateId(),
    role: 'user',
    content: 'Can you give me a simple "Hello, World!" example in Python?'
  },
  {
    id: generateId(),
    role: 'assistant',
    content: `Of course! Here is a classic "Hello, World!" in Python:

\`\`\`python
def say_hello():
    print("Hello, World!")

say_hello()
\`\`\`

It's very straightforward. You define a function and then call it.`
  }
];

export const messages = writable<Message[]>(initialMessages);