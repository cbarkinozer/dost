<script lang="ts">
  import Markdown from './Markdown.svelte';
  import ClipboardIcon from '$lib/components/icons/ClipboardIcon.svelte';
  import ArrowPathIcon from '$lib/components/icons/ArrowPathIcon.svelte';
  import PencilIcon from '$lib/components/icons/PencilIcon.svelte';
  import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
  import { browser } from '$app/environment';

  export let role: 'user' | 'assistant';
  export let content: string;
  export let id: string;
  
  function handleCopy() {
    if (browser) {
        navigator.clipboard.writeText(content);
        alert(`Copied to clipboard!`);
    }
  }
  function handleRegenerate() {
    alert(`Regenerating response for message ID: ${id}`);
  }
  function handleEdit() {
    alert(`Editing message ID: ${id}`);
  }
  function handleDelete() {
    alert(`Deleting message ID: ${id}`);
  }
</script>

<div class="w-full group relative">
  <div class="flex items-start gap-4 p-4" 
       class:bg-gray-900={role === 'user'}
       class:bg-gray-800={role === 'assistant'}>
    
    <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white"
         class:bg-blue-500={role === 'user'}
         class:bg-green-500={role === 'assistant'}>
      {#if role === 'user'}
        U
      {:else}
        A
      {/if}
    </div>
    
    <Markdown {content} />
  </div>

  <div class="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
    {#if role === 'assistant'}
        <button on:click={handleRegenerate} title="Regenerate" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
            <ArrowPathIcon />
        </button>
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