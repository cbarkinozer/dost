<script lang="ts">
  import ChatHistory from "$lib/components/layout/ChatHistory.svelte";
  import ModelSelector from '$lib/components/chat/ModelSelector.svelte';
  import SidebarIcon from '$lib/components/icons/SidebarIcon.svelte';
  import { isSidebarOpen } from '$lib/stores/ui';
</script>

<div class="relative flex h-screen bg-[#0d1117] text-gray-200 overflow-hidden">
  
  <!-- Sidebar Overlay for Mobile -->
  {#if $isSidebarOpen}
    <div 
      class="fixed inset-0 z-20 bg-black/50 md:hidden"
      on:click={() => isSidebarOpen.set(false)}
      role="presentation"
    ></div>
  {/if}

  <!-- Sidebar -->
  <aside 
    class="absolute md:relative z-30 h-full flex-shrink-0 bg-[#161b22] flex flex-col p-2 text-gray-300 transition-all duration-300 ease-in-out"
    class:w-64={$isSidebarOpen}
    class:w-0={$isSidebarOpen === false}
    class:p-2={$isSidebarOpen}
    class:p-0={$isSidebarOpen === false}
    class:border-r={$isSidebarOpen}
    class:border-transparent={$isSidebarOpen === false}
    class:border-gray-800={$isSidebarOpen}
  >
    <div class="overflow-hidden h-full flex flex-col">
        <ChatHistory />
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col overflow-hidden">
    <!-- Main Header -->
    <header class="p-4 border-b border-gray-800 flex items-center flex-shrink-0">
        <!-- This button is now always visible -->
        <button class="p-1 rounded-md hover:bg-gray-700" on:click={() => isSidebarOpen.update(v => !v)} title="Toggle Sidebar">
            <SidebarIcon />
        </button>
      <div class="flex-1 flex justify-center">
        <ModelSelector />
      </div>
      <div class="w-8"></div> <!-- Spacer to keep model selector centered -->
    </header>

    <!-- Slot for page content -->
    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </main>
</div>