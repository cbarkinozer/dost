import { writable } from 'svelte/store';

export interface Message {
  id: string; // <-- ADD THIS
  role: 'user' | 'assistant';
  content: string;
}

const initialMessages: Message[] = [
  {
    id: crypto.randomUUID(), // Generate a random unique ID
    role: 'user',
    content: 'Can you give me a simple "Hello, World!" example in Python?'
  },
  {
    id: crypto.randomUUID(),
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