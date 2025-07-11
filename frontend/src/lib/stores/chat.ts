import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';
import { conversations, updateConversationTitle } from './conversations';
import { goto } from '$app/navigation';
import { streamResponse } from './ui';

export interface Message {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

function generateId() {
	if (browser) return crypto.randomUUID();
	return Math.random().toString(36).substring(2, 15);
}

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
	'4': []
};

export const messageStore = writable<Record<string, Message[]>>(mockMessageHistory);
export const isStreaming = writable(false);

let streamInterval: NodeJS.Timeout | null = null;
const fullMockResponse = "This is a simulated full response, delivered all at once because streaming is disabled. It demonstrates how the application can handle both streaming and non-streaming modes based on user preference.";
const responseWords = fullMockResponse.split(" ");

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
						history[conversationId] = [...conversationMessages];
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

function deliverFullResponse(conversationId: string, assistantMessageId: string) {
    isStreaming.set(true); 
    setTimeout(() => {
        if (get(isStreaming)) {
            messageStore.update((history) => {
                const lastMsg = history[conversationId]?.find(m => m.id === assistantMessageId);
                if (lastMsg) {
                    lastMsg.content = fullMockResponse;
                }
                return history;
            });
            isStreaming.set(false);
        }
    }, 1000); 
}

export function cancelStream() {
	if (streamInterval) {
		clearInterval(streamInterval);
		streamInterval = null;
	}
	isStreaming.set(false);
}

export function submitMessage(conversationId: string, content: string) {
	cancelStream(); 
	const userMessage: Message = { id: generateId(), role: 'user', content };
	const assistantMessage: Message = { id: generateId(), role: 'assistant', content: get(streamResponse) ? '' : 'Thinking...' };

	messageStore.update((history) => {
		if (!history[conversationId]) {
			history[conversationId] = [];
		}
		history[conversationId] = [...history[conversationId], userMessage, assistantMessage];
		return history;
	});

    if (get(streamResponse)) {
	    runStreamingSimulation(conversationId, assistantMessage.id);
    } else {
        deliverFullResponse(conversationId, assistantMessage.id);
    }
}

export function regenerateResponse(conversationId: string) {
	cancelStream();
	messageStore.update((history) => {
		const conversationMessages = history[conversationId];
		if (conversationMessages) {
			let lastUserIndex = -1;
			for(let i = conversationMessages.length - 1; i >= 0; i--) {
				if(conversationMessages[i].role === 'user') {
					lastUserIndex = i;
					break;
				}
			}
			if (lastUserIndex !== -1) {
				history[conversationId] = conversationMessages.slice(0, lastUserIndex + 1);
			}
            
			const assistantMessage: Message = { id: generateId(), role: 'assistant', content: get(streamResponse) ? '' : 'Thinking...' };
			history[conversationId].push(assistantMessage);
            
            if (get(streamResponse)) {
			    runStreamingSimulation(conversationId, assistantMessage.id);
            } else {
                deliverFullResponse(conversationId, assistantMessage.id);
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