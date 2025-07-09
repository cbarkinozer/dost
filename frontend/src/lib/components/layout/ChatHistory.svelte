<script lang="ts">
    import { conversations, selectedConversationId } from '$lib/stores/conversations';
    import { messageStore } from '$lib/stores/chat';
    import { goto } from '$app/navigation';
    import PencilIcon from '$lib/components/icons/PencilIcon.svelte';
    import { browser } from '$app/environment';

    function generateId() {
        if (browser) return crypto.randomUUID();
        return Math.random().toString(36).substring(2, 15);
    }

    function handleNewChat() {
        const newId = generateId();
        const newTitle = `New Chat ${newId.substring(0, 4)}`;

        // Add the new chat to the conversations store (at the top)
        conversations.update(convs => [{ id: newId, title: newTitle }, ...convs]);

        // Add an empty message history for this new chat
        messageStore.update(history => {
            history[newId] = [];
            return history;
        });

        // Navigate the user to the new chat page
        goto(`/c/${newId}`, { invalidateAll: true });
    }
</script>

<!-- New Chat Button -->
<div class="p-2">
    <button on:click={handleNewChat} class="w-full flex items-center justify-between p-3 rounded-lg text-left text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2">
        <span>New Chat</span>
        <PencilIcon />
    </button>
</div>

<!-- Conversation List -->
<nav class="flex-1 overflow-y-auto px-2">
    <div class="text-sm text-gray-500 px-3 py-2">All Chats</div>
    <ul class="space-y-1">
        {#each $conversations as conv (conv.id)}
            <li>
                <a href={`/c/${conv.id}`} 
                   class="block p-3 rounded-lg text-sm truncate"
                   class:bg-blue-600={conv.id === $selectedConversationId}
                   class:text-white={conv.id === $selectedConversationId}
                   class:text-gray-300={conv.id !== $selectedConversationId}
                   class:hover:bg-gray-700={conv.id !== $selectedConversationId}
                >
                    {conv.title}
                </a>
            </li>
        {/each}
    </ul>
</nav>

<!-- User/Settings Menu -->
<div class="mt-auto p-2 border-t border-gray-700">
    <a href="/settings" class="flex items-center gap-3 p-2 rounded-lg text-gray-200 hover:bg-gray-700">
        <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
            U
        </div>
        <span class="text-sm font-medium">User Settings</span>
    </a>
</div>