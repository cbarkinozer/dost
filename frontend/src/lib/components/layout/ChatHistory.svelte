<script lang="ts">
    import { conversations, selectedConversationId } from '$lib/stores/conversations';

    function handleNewChat() {
        // Later, this will create a new chat and navigate
        alert('Creating a new chat!'); 
    }
</script>

<!-- New Chat Button -->
<button on:click={handleNewChat} class="w-full flex items-center justify-between p-3 rounded-lg text-left text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
    <span>New Chat</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
</button>


<!-- Conversation List -->
<nav class="flex-1 overflow-y-auto">
    <ul class="space-y-2">
        {#each $conversations as conv (conv.id)}
            <li>
                <a href={`/c/${conv.id}`} 
                   class="block p-3 rounded-lg text-sm truncate"
                   class:bg-blue-500={conv.id === $selectedConversationId}
                   class:text-white={conv.id === $selectedConversationId}
                   class:hover:bg-gray-300={conv.id !== $selectedConversationId}
                   class:dark:hover:bg-gray-700={conv.id !== $selectedConversationId}
                >
                    {conv.title}
                </a>
            </li>
        {/each}
    </ul>
</nav>