<script lang="ts">
    import { messages } from '$lib/stores/chat';
    import type { Message } from '$lib/stores/chat';

    let inputValue = '';

    function handleSubmit() {
        const trimmedValue = inputValue.trim();
        if (!trimmedValue) return;

        // Create the new user message object with a unique ID
        const userMessage: Message = {
            id: crypto.randomUUID(), // Add unique ID
            role: 'user',
            content: trimmedValue
        };

        // Update the store with the new user message
        messages.update((currentMessages) => [...currentMessages, userMessage]);

        // Simulate an assistant response after a delay
        setTimeout(() => {
            const assistantMessage: Message = {
                id: crypto.randomUUID(), // Add unique ID
                role: 'assistant',
                content: 'This is a simulated response. The backend is not connected yet.'
            };
            messages.update(currentMessages => [...currentMessages, assistantMessage]);
        }, 1000);

        // Clear the input field after submission
        inputValue = '';
    }

    function handleKeydown(event: KeyboardEvent) {
        // Submit on Enter key, but allow Shift+Enter for new lines
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Prevent default Enter behavior (adding a new line)
            handleSubmit();
        }
    }
</script>

<div class="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
    <div class="max-w-2xl mx-auto">
        <form on:submit|preventDefault={handleSubmit} class="relative">
            <textarea 
                bind:value={inputValue}
                on:keydown={handleKeydown}
                class="w-full p-3 pr-12 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                rows="1" 
                placeholder="Ask dost anything..."
            ></textarea>
            <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600" aria-label="Send message">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                    <path d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .812 1.022L13.25 8.75a.75.75 0 0 0 0-1.5L2.87 2.298Z" />
                </svg>
            </button>
        </form>
    </div>
</div>