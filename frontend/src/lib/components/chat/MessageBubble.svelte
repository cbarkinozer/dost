<script lang="ts">
  export let role: 'user' | 'assistant';
  export let content: string;
</script>

<div class="max-w-2xl mx-auto w-full px-4">
  <div class="flex items-start gap-4 p-4 rounded-lg my-2" 
       class:bg-white={role === 'user'} 
       class:dark:bg-gray-700={role === 'user'}
       class:bg-gray-50={role === 'assistant'}
       class:dark:bg-gray-800={role === 'assistant'}>
    
    <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white"
         class:bg-blue-500={role === 'user'}
         class:bg-green-500={role === 'assistant'}>
      {#if role === 'user'}
        U
      {:else}
        A
      {/if}
    </div>
    
    <div class="prose dark:prose-invert max-w-none">
      <p>{content}</p>
    </div>
  </div>
</div>