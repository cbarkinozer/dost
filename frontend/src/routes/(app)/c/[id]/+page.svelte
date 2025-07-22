<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import MessageBubble from '$lib/components/chat/MessageBubble.svelte';
  import ChatInput from '$lib/components/chat/ChatInput.svelte';
  import { messageStore } from '$lib/stores/chat';
  import { conversations, selectedConversationId } from '$lib/stores/conversations';
  import ChatPlaceholder from '$lib/components/chat/ChatPlaceholder.svelte';
  import type { Message } from '$lib/stores/chat';

  $: conversationId = $page.params.id;

  const currentMessages = derived<
    [typeof page, typeof messageStore],
    Message[]
  >(
    [page, messageStore],
    ([$page, $messageStore]) => {
      const convId = $page.params.id;
      if (convId) {
        selectedConversationId.set(convId);
        return $messageStore[convId] || [];
      }
      return [];
    }
  );

  const conversationTitle = derived(
    [page, conversations],
    ([$page, $conversations]) => {
      const conv = $conversations.find(c => c.id === $page.params.id);
      return conv ? conv.title : 'New Chat';
    }
  );

</script>

<svelte:head>
    <title>dost - {$conversationTitle}</title>
</svelte:head>

<div class="flex-1 flex flex-col h-full">
  {#if conversationId}
    <div class="flex-1 overflow-y-auto p-4">
        {#if $currentMessages.length > 0}
            <div class="space-y-1">
                {#each $currentMessages as message, i (message.id)}
                    <MessageBubble 
                      {conversationId}
                      role={message.role} 
                      content={message.content}
                      isLast={i === $currentMessages.length - 1}
                      timestamp={message.timestamp}
                      model={message.model}
                    />
                {/each}
            </div>
        {:else}
            <ChatPlaceholder {conversationId} />
        {/if}
    </div>
    
    <div class="flex-shrink-0">
      <ChatInput {conversationId} />
    </div>
  {:else}
    <div class="flex-1 flex items-center justify-center">
      <p class="text-gray-500">No conversation selected.</p>
    </div>
  {/if}
</div>