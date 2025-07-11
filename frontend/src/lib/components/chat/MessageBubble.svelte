<script lang="ts">
  import Markdown from './Markdown.svelte';
  import ArrowPathIcon from '$lib/components/icons/ArrowPathIcon.svelte';
  import PencilIcon from '$lib/components/icons/PencilIcon.svelte';
  import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
  import ThumbUpIcon from '$lib/components/icons/ThumbUpIcon.svelte';
  import ThumbDownIcon from '$lib/components/icons/ThumbDownIcon.svelte';
  import ClipboardIcon from '$lib/components/icons/ClipboardIcon.svelte'; // Re-added this import
  import { regenerateResponse } from '$lib/stores/chat';
  import { browser } from '$app/environment'; // Re-added this import

  export let role: 'user' | 'assistant';
  export let content: string;
  export let conversationId: string;
  export let isLast: boolean;
  
  let feedback: 'liked' | 'disliked' | 'none' = 'none';

  // FIX: Re-added the handleCopy function
  function handleCopy() {
    if (browser) {
        navigator.clipboard.writeText(content);
        alert('Copied to clipboard!'); // A simple confirmation
    }
  }

  function handleLike() {
    feedback = feedback === 'liked' ? 'none' : 'liked';
  }

  function handleDislike() {
    feedback = feedback === 'disliked' ? 'none' : 'disliked';
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
        <button 
            on:click={handleLike} 
            title="Good response" 
            class="p-1 rounded hover:bg-gray-700"
            class:text-blue-400={feedback === 'liked'}
            class:text-gray-400={feedback !== 'liked'}
            class:opacity-50={feedback === 'disliked'}
        >
            <ThumbUpIcon />
        </button>
        <button 
            on:click={handleDislike} 
            title="Bad response" 
            class="p-1 rounded hover:bg-gray-700"
            class:text-blue-400={feedback === 'disliked'}
            class:text-gray-400={feedback !== 'disliked'}
            class:opacity-50={feedback === 'liked'}
        >
            <ThumbDownIcon />
        </button>
        {#if isLast}
            <button on:click={() => regenerateResponse(conversationId)} title="Regenerate" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
                <ArrowPathIcon />
            </button>
        {/if}
    {/if}

    {#if role === 'user'}
        <button on:click={handleEdit} title="Edit" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
            <PencilIcon />
        </button>
        <button on:click={handleDelete} title="Delete" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
            <TrashIcon />
        </button>
    {/if}
    
    <button on:click={handleCopy} title="Copy" class="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-gray-200">
        <ClipboardIcon />
    </button>
  </div>
</div>