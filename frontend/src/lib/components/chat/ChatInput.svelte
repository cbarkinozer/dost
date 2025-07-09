<script lang="ts">
    import { messages } from '$lib/stores/chat';
    import type { Message } from '$lib/stores/chat';
    import { browser } from '$app/environment';

    let inputValue = '';

    // Function to safely generate UUIDs
    function generateId() {
        if (browser) {
            return crypto.randomUUID();
        }
        return Math.random().toString(36).substring(2, 15);
    }

    function handleSubmit() {
        const trimmedValue = inputValue.trim();
        if (!trimmedValue) return;

        const userMessage: Message = {
            id: generateId(),
            role: 'user',
            content: trimmedValue
        };

        messages.update((currentMessages) => [...currentMessages, userMessage]);
        inputValue = '';

        // --- Start of Streaming Simulation ---
        const responseWords = "This is a simulated streaming response. Each word appears one by one, just like a real LLM.".split(" ");
        
        const assistantMessage: Message = {
            id: generateId(),
            role: 'assistant',
            content: ''
        };

        messages.update(currentMessages => [...currentMessages, assistantMessage]);
        
        let wordIndex = 0;
        const streamInterval = setInterval(() => {
            if (wordIndex < responseWords.length) {
                messages.update(currentMessages => {
                    const messageToUpdate = currentMessages.find(m => m.id === assistantMessage.id);
                    if (messageToUpdate) {
                        messageToUpdate.content += responseWords[wordIndex] + " ";
                    }
                    return currentMessages;
                });
                wordIndex++;
            } else {
                clearInterval(streamInterval);
            }
        }, 100);
        // --- End of Streaming Simulation ---
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    }
</script>

<div class="p-4 bg-gray-900 border-t border-gray-700">
    <div class="max-w-3xl mx-auto">
        <form on:submit|preventDefault={handleSubmit} class="relative">
            <textarea 
                bind:value={inputValue}
                on:keydown={handleKeydown}
                class="w-full p-3 pr-12 bg-gray-800 border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
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