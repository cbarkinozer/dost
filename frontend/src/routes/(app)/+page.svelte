<script lang="ts">
  import ChatInput from '$lib/components/chat/ChatInput.svelte';
  import { selectedConversationId } from '$lib/stores/conversations';
  import ChatPlaceholder from '$lib/components/chat/ChatPlaceholder.svelte';

  selectedConversationId.set(null);
</script>

<div class="flex-1 flex flex-col h-full">

  <div class="flex-1 overflow-y-auto p-4">
    <ChatPlaceholder conversationId={null} />
  </div>
  
  <div class="flex-shrink-0">
    <ChatInput conversationId={null} />
  </div>

</div>