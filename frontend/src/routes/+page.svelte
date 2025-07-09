<script lang="ts">
  import MessageBubble from "$lib/components/chat/MessageBubble.svelte";
  import ChatInput from "$lib/components/chat/ChatInput.svelte";
  import { messages } from "$lib/stores/chat";
  import { selectedConversationId } from "$lib/stores/conversations";

  // When the user is on the homepage, deselect any conversation
  selectedConversationId.set(null); 
</script>

<!-- This is the main container for the chat view -->
<div class="flex-1 flex flex-col h-full overflow-hidden">
  
  <!-- Header -->
  <header class="p-4 border-b dark:border-gray-700 text-center flex-shrink-0">
    <h2 class="text-lg font-semibold">dost-gpt-4-turbo</h2>
  </header>

  <!-- Message History (This div will be the only scrollable part) -->
  <div class="flex-1 overflow-y-auto p-4 space-y-4">
    {#each $messages as message (message.content + Math.random())} <!-- Keyed each block -->
      <MessageBubble role={message.role} content={message.content} />
    {/each}
  </div>

  <!-- Chat Input (Now outside the scrollable area) -->
  <div class="flex-shrink-0">
    <ChatInput />
  </div>
  
</div>