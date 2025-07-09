<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import MessageBubble from '$lib/components/chat/MessageBubble.svelte';
  import ChatInput from '$lib/components/chat/ChatInput.svelte';
  import { messageStore } from '$lib/stores/chat';
  import { selectedConversationId } from '$lib/stores/conversations';
  import ChatPlaceholder from '$lib/components/chat/ChatPlaceholder.svelte';
  import type { Message } from '$lib/stores/chat';

  // This reactive variable will hold the messages for the CURRENT conversation
  let currentConversationId: string | null = null;

  // This `derived` store automatically gives us the correct message list
  // whenever the page ID or the main messageStore changes.
  const currentMessages = derived(
    [page, messageStore],
    ([$page, $messageStore]) => {
      const convId = $page.params.id;
      currentConversationId = convId;
      if (convId) {
        selectedConversationId.set(convId);
        return $messageStore[convId] || [];
      }
      return [];
    }
  );

</script>

<div class="flex-1 flex flex-col h-full">
  <div class="flex-1 overflow-y-auto p-4">
      {#if $currentMessages.length > 0}
          <div class="space-y-4 max-w-3xl mx-auto">
              {#each $currentMessages as message (message.id)}
                  <MessageBubble id={message.id} role={message.role} content={message.content} />
              {/each}
          </div>
      {:else}
          <ChatPlaceholder />
      {/if}
  </div>
  
  <div class="flex-shrink-0">
    <!-- Pass the current conversation ID to the input component -->
    <ChatInput conversationId={currentConversationId} />
  </div>
</div>