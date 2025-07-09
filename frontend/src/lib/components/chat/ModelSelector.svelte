<script lang="ts">
  import { createPopper } from '@popperjs/core';
  import { onMount, onDestroy } from 'svelte';

  let dropdownOpen = false;
  let triggerElement: HTMLElement;
  let dropdownElement: HTMLElement;
  let popperInstance: any;

  // Mock data
  const models = [
    { id: 'arena', name: 'Arena Model', size: '' },
    { id: 'llama3-70b', name: 'llama3:70b', size: '70.6B' },
    { id: 'mistral-latest', name: 'mistral:latest', size: '7.2B' },
    { id: 'llama3-8b', name: 'llama3:8b', size: '8.0B' }
  ];
  let selectedModel = models[0];

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function selectModel(model: typeof models[0]) {
    selectedModel = model;
    dropdownOpen = false;
  }

  function closeDropdown(event: MouseEvent) {
    if (
      triggerElement && !triggerElement.contains(event.target as Node) &&
      dropdownElement && !dropdownElement.contains(event.target as Node)
    ) {
      dropdownOpen = false;
    }
  }

  onMount(() => {
    popperInstance = createPopper(triggerElement, dropdownElement, {
      placement: 'bottom-start',
    });
    window.addEventListener('click', closeDropdown);
  });
  
  onDestroy(() => {
      if (popperInstance) {
          popperInstance.destroy();
      }
      window.removeEventListener('click', closeDropdown);
  })
</script>

<div class="relative">
  <button bind:this={triggerElement} on:click|stopPropagation={toggleDropdown} class="flex items-center gap-2">
    <span class="text-lg font-semibold text-gray-200">{selectedModel.name}</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-400">
      <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .55.24l3.25 3.5a.75.75 0 1 1-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 0 1-1.1-1.02l3.25-3.5A.75.75 0 0 1 10 3ZM10 17a.75.75 0 0 1-.55-.24l-3.25-3.5a.75.75 0 1 1 1.1-1.02L10 15.148l2.7-2.913a.75.75 0 0 1 1.1 1.02l-3.25 3.5A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
    </svg>
  </button>

  {#if dropdownOpen}
    <div bind:this={dropdownElement} class="absolute z-10 mt-2 w-72 rounded-xl bg-gray-800 border border-gray-700 p-2 shadow-lg ring-1 ring-black ring-opacity-5">
      <input type="text" placeholder="Search a model" class="w-full bg-gray-700 border-gray-600 rounded-md p-2 mb-2 text-white focus:ring-blue-500 focus:border-blue-500">
      <div class="space-y-1">
        {#each models as model (model.id)}
          <button on:click={() => selectModel(model)} class="w-full text-left flex items-center justify-between p-2 rounded-md hover:bg-gray-700">
            <div class="flex items-center gap-2 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="22" x2="18" y1="12" y2="12"></line><line x1="6" x2="2" y1="12" y2="12"></line><line x1="12" x2="12" y1="2" y2="6"></line><line x1="12" x2="12" y1="18" y2="22"></line></svg>
              <span>{model.name}</span>
            </div>
            {#if model.id === selectedModel.id}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-blue-400">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clip-rule="evenodd" />
              </svg>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>