<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import MessageBubble from '$lib/components/chat/MessageBubble.svelte';
  import ChatInput from '$lib/components/chat/ChatInput.svelte';
  import { messageStore } from '$lib/stores/chat';
  import { selectedConversationId } from '$lib/stores/conversations';
  import ChatPlaceholder from '$lib/components/chat/ChatPlaceholder.svelte';

  // THE FIX: Use a reactive declaration to get the ID from the page store.
  // This variable will now automatically update whenever the URL changes.
  $: conversationId = $page.params.id;

  // This `derived` store automatically gives us the correct message list.
  // We've removed the problematic side-effect from here.
  const currentMessages = derived(
    [page, messageStore],
    ([$page, $messageStore]) => {
      const convId = $page.params.id;
      if (convId) {
        // This side-effect is acceptable, as it updates a global
        // store to keep the sidebar selection in sync.
        selectedConversationId.set(convId);
        return $messageStore[convId] || [];
      }
      return [];
    }
  );

</script>

<div class="flex-1 flex flex-col h-full">
  {#if conversationId}
    <!-- Main chat area -->
    <div class="flex-1 overflow-y-auto p-4">
        {#if $currentMessages.length > 0}
            <div class="space-y-4 max-w-3xl mx-auto">
                {#each $currentMessages as message, i (message.id)}
                    <MessageBubble 
                      {conversationId}
                      role={message.role} 
                      content={message.content}
                      isLast={i === $currentMessages.length - 1}
                    />
                {/each}
            </div>
        {:else}
            <ChatPlaceholder />
        {/if}
    </div>
    
    <!-- Chat input area -->
    <div class="flex-shrink-0">
      <ChatInput {conversationId} />
    </div>
  {:else}
    <!-- This part should now only appear if the route is invalid -->
    <div class="flex-1 flex items-center justify-center">
      <p class="text-gray-500">No conversation selected.</p>
    </div>
  {/if}
</div>