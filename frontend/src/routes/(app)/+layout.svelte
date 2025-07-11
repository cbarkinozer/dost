<script lang="ts">
  import ChatHistory from "$lib/components/layout/ChatHistory.svelte";
  import ModelSelector from '$lib/components/chat/ModelSelector.svelte';
  import SidebarIcon from '$lib/components/icons/SidebarIcon.svelte';
  import { isSidebarOpen } from '$lib/stores/ui';
</script>

<!-- FIX: Added light/dark mode text and background colors -->
<div class="flex h-screen overflow-hidden bg-white text-gray-800 dark:bg-[#0d1117] dark:text-gray-200">
  
  {#if $isSidebarOpen}
    <div 
      class="fixed inset-0 z-20 bg-black/50 md:hidden"
      on:click={() => isSidebarOpen.set(false)}
      role="presentation"
    ></div>
  {/if}

  <aside 
    class="absolute md:relative z-30 h-full flex-shrink-0 flex flex-col p-2 transition-all duration-300 ease-in-out bg-gray-50 text-gray-800 dark:bg-[#161b22] dark:text-gray-300"
    class:w-64={$isSidebarOpen}
    class:w-0={$isSidebarOpen === false}
    class:p-2={$isSidebarOpen}
    class:p-0={$isSidebarOpen === false}
    class:border-r={$isSidebarOpen}
    class:border-gray-200={$isSidebarOpen}
    class:dark:border-gray-800={$isSidebarOpen}
  >
    <div class="overflow-hidden h-full flex flex-col">
        <ChatHistory />
    </div>
  </aside>

  <main class="flex-1 flex flex-col overflow-hidden">
    <header class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center flex-shrink-0">
        <button class="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700" on:click={() => isSidebarOpen.update(v => !v)} title="Toggle Sidebar">
            <SidebarIcon />
        </button>
      <div class="flex-1 flex justify-center">
        <ModelSelector />
      </div>
      <div class="w-8"></div>
    </header>

    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </main>
</div>