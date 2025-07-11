<script lang="ts">
    import { goto } from '$app/navigation';
    import { conversations, updateConversationTitle } from '$lib/stores/conversations';
    import { messageStore, submitMessage } from '$lib/stores/chat';
    import { browser } from '$app/environment';

    export let conversationId: string | null;

    function generateId() {
		if (browser) return crypto.randomUUID();
		return Math.random().toString(36).substring(2, 15);
	}

    function handleSuggestionClick(prompt: string) {
        const newTitle = prompt.length > 40 ? prompt.substring(0, 37) + '...' : prompt;

        if (conversationId) {
            updateConversationTitle(conversationId, newTitle);
            submitMessage(conversationId, prompt);
        } else {
            const newId = generateId();
            conversations.update(convs => [{ id: newId, title: newTitle, pinned: false, createdAt: new Date() }, ...convs]);
            messageStore.update(history => {
                history[newId] = [];
                return history;
            });
            goto(`/c/${newId}`).then(() => {
                submitMessage(newId, prompt);
            });
        }
    }

    const suggestions = [
        { title: 'Help me study', subtitle: 'vocabulary for a college entrance exam' },
        { title: 'Give me ideas', subtitle: 'for what to do with my kids\' art' },
        { title: 'Overcome procrastination', subtitle: 'Give me tips' },
        { title: 'Tell me a fun fact', subtitle: 'about the Roman Empire' }
    ];
</script>

<div class="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 px-4">
    <div class="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">dost</div>
    <div class="text-xl mb-8 text-gray-600 dark:text-gray-400">How can I help you today?</div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {#each suggestions as suggestion}
            <button on:click={() => handleSuggestionClick(`${suggestion.title} ${suggestion.subtitle}`)} class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <div class="font-semibold text-gray-800 dark:text-white">{suggestion.title}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{suggestion.subtitle}</div>
            </button>
        {/each}
    </div>
</div>