import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { conversations } from './conversations';

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
		{
			id: generateId(),
			role: 'user',
			content: 'Can you give me a simple "Hello, World!" example in Python?'
		},
		{
			id: generateId(),
			role: 'assistant',
			content: `Of course! Here is a classic "Hello, World!" in Python:\n\n\`\`\`python\ndef say_hello():\n    print("Hello, World!")\n\nsay_hello()\n\`\`\``
		}
	],
	'2': [
		{
			id: generateId(),
			role: 'user',
			content: 'What was the main cause of the fall of the Roman Empire?'
		},
		{
			id: generateId(),
			role: 'assistant',
			content:
				'Historians debate this, but key factors include economic troubles, overexpansion, political instability, and barbarian invasions.'
		}
	],
	'3': [
		{
			id: generateId(),
			role: 'user',
			content: 'What are the main differences between SvelteKit and Next.js?'
		},
		{
			id: generateId(),
			role: 'assistant',
			content:
				"SvelteKit compiles to vanilla JS at build time for performance, while Next.js (React) uses a virtual DOM at runtime. Svelte's reactivity is compiler-based, making it often simpler and faster."
		}
	],
	'4': [] // Unsaved Conversation starts empty
};

// --- Store Definitions ---
export const messageStore = writable<Record<string, Message[]>>(mockMessageHistory);
export const isStreaming = writable(false);

// --- Private variables ---
let streamInterval: NodeJS.Timeout | null = null;
const responseWords = "This is a simulated streaming response. Each word appears one by one, demonstrating the effect of a real-time answer from a large language model.".split(" ");

// --- Core Streaming Logic (Internal) ---
function runStreamingSimulation(conversationId: string, assistantMessageId: string) {
	let wordIndex = 0;
	isStreaming.set(true);

	streamInterval = setInterval(() => {
		if (wordIndex < responseWords.length) {
			const contentChunk = responseWords[wordIndex] + ' ';
			messageStore.update((history) => {
				const conversationMessages = history[conversationId];
				if (conversationMessages) {
					const lastMessage = conversationMessages.find(m => m.id === assistantMessageId);
					if (lastMessage) {
						lastMessage.content += contentChunk;
						history[conversationId] = [...conversationMessages]; // Trigger update
					}
				}
				return history;
			});
			wordIndex++;
		} else {
			cancelStream();
		}
	}, 100);
}

// --- Public Actions ---

export function cancelStream() {
	if (streamInterval) {
		clearInterval(streamInterval);
		streamInterval = null;
	}
	isStreaming.set(false);
}

export function submitMessage(conversationId: string, content: string) {
	cancelStream(); // Cancel any existing stream before starting a new one

	const userMessage: Message = { id: generateId(), role: 'user', content };
	const assistantMessage: Message = { id: generateId(), role: 'assistant', content: '' };

	messageStore.update((history) => {
		if (!history[conversationId]) {
			history[conversationId] = [];
		}
		history[conversationId] = [...history[conversationId], userMessage, assistantMessage];
		return history;
	});

	runStreamingSimulation(conversationId, assistantMessage.id);
}

export function regenerateResponse(conversationId: string) {
	cancelStream();

	messageStore.update((history) => {
		const conversationMessages = history[conversationId];
		if (conversationMessages && conversationMessages.length > 0) {
			const lastMessage = conversationMessages[conversationMessages.length - 1];
			// Ensure we are regenerating an assistant's response
			if (lastMessage.role === 'assistant') {
				lastMessage.content = ''; // Clear the content
				runStreamingSimulation(conversationId, lastMessage.id);
			}
		}
		return history;
	});
}

export function deleteMessageHistory(conversationId: string) {
	messageStore.update((history) => {
		delete history[conversationId];
		return history;
	});
}