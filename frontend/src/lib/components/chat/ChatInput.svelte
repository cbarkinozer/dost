<script lang="ts">
    import { addMessage, updateLastMessage } from '$lib/stores/chat';
    import type { Message } from '$lib/stores/chat';
    import { browser } from '$app/environment';

    export let conversationId: string | null; // Receive the ID as a prop
    let inputValue = '';

    function generateId() {
        if (browser) return crypto.randomUUID();
        return Math.random().toString(36).substring(2, 15);
    }

    function handleSubmit() {
        if (!conversationId) return; // Don't submit if there's no active chat
        const trimmedValue = inputValue.trim();
        if (!trimmedValue) return;

        const userMessage: Message = { id: generateId(), role: 'user', content: trimmedValue };
        addMessage(conversationId, userMessage);
        inputValue = '';

        // Simulate streaming response
        const responseWords = "This is a simulated streaming response. Each word appears one by one.".split(" ");
        const assistantMessage: Message = { id: generateId(), role: 'assistant', content: '' };
        addMessage(conversationId, assistantMessage);
        
        let wordIndex = 0;
        const streamInterval = setInterval(() => {
            if (wordIndex < responseWords.length) {
                if (conversationId) { // Check again in case user navigates away
                    updateLastMessage(conversationId, responseWords[wordIndex] + " ");
                }
                wordIndex++;
            } else {
                clearInterval(streamInterval);
            }
        }, 100);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    }
</script>

<div class="px-4 pb-4 pt-2 bg-[#0d1117]">
    <div class="max-w-3xl mx-auto">
        <form on:submit|preventDefault={handleSubmit} class="relative">
            <textarea 
                bind:value={inputValue}
                on:keydown={handleKeydown}
                class="w-full p-3 pr-12 bg-[#161b22] border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                rows="1" 
                placeholder="Ask dost anything..."
            ></textarea>
            <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-gray-200" aria-label="Send message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                    <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .812 1.022L13.25 8.75a.75.75 0 0 0 0-1.5L2.87 2.298Z" />
                </svg>
            </button>
        </form>
    </div>
</div>