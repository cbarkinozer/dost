<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { createPopper } from '@popperjs/core';
  import { browser } from '$app/environment';
  import { streamResponse as streamResponseStore } from '$lib/stores/ui';

  let dropdownOpen = false;
  let triggerElement: HTMLElement;
  let dropdownElement: HTMLElement;
  let popperInstance: any;

  const models = [
    { id: 'llama3-70b', name: 'llama3:70b', size: '70.6B' },
    { id: 'mistral-latest', name: 'mistral:latest', size: '7.2B' },
    { id: 'llama3-8b', name: 'llama3:8b', size: '8.0B' }
  ];
  let selectedModel = models[0];

  let temperature = 1.0;
  let maxTokens = 1024;
  let topP = 1.0;
  let seed: number | undefined = undefined;
  let stopSequence = '';


  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function selectModel(model: typeof models[0]) {
    selectedModel = model;
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
    if (browser) {
      popperInstance = createPopper(triggerElement, dropdownElement, {
        placement: 'bottom-start',
        modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
      });
      window.addEventListener('click', closeDropdown);
    }
  });
  
  onDestroy(() => {
    if (browser) {
      if (popperInstance) {
          popperInstance.destroy();
      }
      window.removeEventListener('click', closeDropdown);
    }
  })
</script>

<div class="relative">
  <button bind:this={triggerElement} on:click|stopPropagation={toggleDropdown} class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
    <span class="text-lg font-semibold">{selectedModel.name}</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400">
      <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>
  </button>

  {#if dropdownOpen}
    <div bind:this={dropdownElement} class="absolute z-10 w-80 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 shadow-lg text-gray-900 dark:text-gray-200">
      <div class="p-2">
        <h3 class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-2">Models</h3>
        <input type="text" placeholder="Search a model..." class="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2 mb-2 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm">
        <div class="space-y-1 max-h-40 overflow-y-auto">
          {#each models as model (model.id)}
            <button on:click={() => selectModel(model)} class="w-full text-left flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <span class="text-sm">{model.name}</span>
              {#if model.id === selectedModel.id}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-blue-500 dark:text-blue-400"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clip-rule="evenodd" /></svg>
              {/if}
            </button>
          {/each}
        </div>
      </div>
      <hr class="border-gray-200 dark:border-gray-700 my-2">
      <div class="p-2 space-y-4">
        <h3 class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Parameters</h3>
        
        <div class="flex items-center justify-between">
            <label for="stream" class="text-sm font-medium">Stream</label>
            <button id="stream" on:click={() => ($streamResponseStore = !$streamResponseStore)} class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800" class:bg-blue-600={$streamResponseStore} class:bg-gray-200={!$streamResponseStore} role="switch" aria-checked={$streamResponseStore} aria-label="Toggle response streaming">
                <span class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" class:translate-x-5={$streamResponseStore} class:translate-x-0={!$streamResponseStore}></span>
            </button>
        </div>

        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <label for="temperature" class="text-sm">Temperature</label>
                <span class="text-sm font-mono text-gray-500 dark:text-gray-400">{temperature.toFixed(2)}</span>
            </div>
            <input type="range" id="temperature" min="0" max="2" step="0.01" bind:value={temperature} class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
        </div>

        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <label for="top-p" class="text-sm">Top P</label>
                <span class="text-sm font-mono text-gray-500 dark:text-gray-400">{topP.toFixed(2)}</span>
            </div>
            <input type="range" id="top-p" min="0" max="1" step="0.01" bind:value={topP} class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer">
        </div>

        <div class="space-y-1">
            <label for="max-tokens" class="text-sm">Max Tokens</label>
            <input type="number" id="max-tokens" bind:value={maxTokens} class="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm">
        </div>

        <div class="space-y-1">
            <label for="seed" class="text-sm">Seed</label>
            <input type="number" id="seed" placeholder="Random" bind:value={seed} class="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm">
        </div>

        <div class="space-y-1">
            <label for="stop-sequence" class="text-sm">Stop Sequence</label>
            <input type="text" id="stop-sequence" placeholder="e.g. 'Human:', '\n'" bind:value={stopSequence} class="w-full bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-sm">
        </div>
      </div>
    </div>
  {/if}
</div>