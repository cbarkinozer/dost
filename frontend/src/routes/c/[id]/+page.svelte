<script lang="ts">
  import { page } from '$app/stores';
  import MessageBubble from '$lib/components/chat/MessageBubble.svelte';
  import ChatInput from '$lib/components/chat/ChatInput.svelte';
  import { messages } from '$lib/stores/chat';
  import { selectedConversationId } from '$lib/stores/conversations'; // Import the store

  // This is a reactive statement. It runs whenever $page.params.id changes.
  $: if ($page.params.id) {
    selectedConversationId.set($page.params.id);
  }
</script>

<div class="flex-1 flex flex-col h-full overflow-hidden">
    
  <!-- Header -->
  <header class="p-4 border-b dark:border-gray-700 text-center flex-shrink-0">
    <!-- We use the 'id' from the URL to show which page we're on -->
    <h2 class="text-lg font-semibold">
        Conversation ID: {$page.params.id}
    </h2>
  </header>

  <!-- Message History -->
  <div class="flex-1 overflow-y-auto p-4 space-y-4">
    {#each $messages as message (message.id)} <!-- Use the new unique id as the key -->
    <MessageBubble 
        id={message.id}
        role={message.role} 
        content={message.content} />
    {/each}
  </div>

  <!-- Chat Input -->
  <div class="flex-shrink-0">
    <ChatInput />
  </div>
    
</div>