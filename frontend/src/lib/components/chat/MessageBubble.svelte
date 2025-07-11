<script lang="ts">
  import Markdown from './Markdown.svelte';
  import ClipboardIcon from '$lib/components/icons/ClipboardIcon.svelte';
  import ArrowPathIcon from '$lib/components/icons/ArrowPathIcon.svelte';
  import PencilIcon from '$lib/components/icons/PencilIcon.svelte';
  import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
  import ThumbUpIcon from '$lib/components/icons/ThumbUpIcon.svelte';
  import ThumbDownIcon from '$lib/components/icons/ThumbDownIcon.svelte';
  import { browser } from '$app/environment';
  import { regenerateResponse } from '$lib/stores/chat';

  export let role: 'user' | 'assistant';
  export let content: string;
  export let conversationId: string;
  export let isLast: boolean;
  
  function handleCopy() {
    if (browser) {
        navigator.clipboard.writeText(content);
    }
  }
  function handleRegenerate() {
    regenerateResponse(conversationId);
  }
  function handleEdit() {
    alert(`Editing is not yet implemented.`);
  }
  function handleDelete() {
    alert(`Deleting single messages is not yet implemented.`);
  }
</script>

<div class="w-full group relative">
  <div class="flex items-start gap-4 p-4 text-gray-200">
    <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white"
         class:bg-blue-500={role === 'user'}
         class:bg-green-500={role === 'assistant'}>
      {#if role === 'user'}
        U
      {:else}
        A
      {/if}
    </div>
    
    <div class="flex-1 min-w-0">
        <Markdown {content} />
    </div>
  </div>

  <div class="absolute bottom-1 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
    {#if role === 'assistant'}
        <button on:click={() => alert('Liked!')} title="Good response" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
            <ThumbUpIcon />
        </button>
        <button on:click={() => alert('Disliked!')} title="Bad response" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
            <ThumbDownIcon />
        </button>
        {#if isLast}
            <button on:click={handleRegenerate} title="Regenerate" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
                <ArrowPathIcon />
            </button>
        {/if}
    {/if}

    <button on:click={handleCopy} title="Copy" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
        <ClipboardIcon />
    </button>

    {#if role === 'user'}
        <button on:click={handleEdit} title="Edit" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
            <PencilIcon />
        </button>
        <button on:click={handleDelete} title="Delete" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
            <TrashIcon />
        </button>
    {/if}
  </div>
</div>