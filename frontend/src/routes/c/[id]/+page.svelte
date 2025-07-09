<script lang="ts">
  import { page } from '$app/stores';
  import MessageBubble from '$lib/components/chat/MessageBubble.svelte';
  import ChatInput from '$lib/components/chat/ChatInput.svelte';
  import { messages } from '$lib/stores/chat';
  import { selectedConversationId } from '$lib/stores/conversations';
  import ChatPlaceholder from '$lib/components/chat/ChatPlaceholder.svelte';

  $: if ($page.params.id) {
    selectedConversationId.set($page.params.id);
  }
</script>

<div class="flex-1 flex flex-col h-full">

  <!-- Message History (or Placeholder) -->
  <div class="flex-1 overflow-y-auto p-4">
      {#if $messages.length > 0}
          <div class="space-y-4 max-w-3xl mx-auto">
              {#each $messages as message (message.id)}
                  <MessageBubble id={message.id} role={message.role} content={message.content} />
              {/each}
          </div>
      {:else}
          <ChatPlaceholder />
      {/if}
  </div>

  <!-- Chat Input -->
  <div class="flex-shrink-0">
    <ChatInput />
  </div>
    
</div>