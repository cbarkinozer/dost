<script lang="ts">
  import ChatHistory from "$lib/components/layout/ChatHistory.svelte";
  import ModelSelector from '$lib/components/chat/ModelSelector.svelte';
  import SidebarIcon from '$lib/components/icons/SidebarIcon.svelte';
  import { isSidebarOpen } from '$lib/stores/ui';
</script>

<div class="flex h-screen bg-[#0d1117] text-gray-200 overflow-hidden">
  
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
    class="absolute md:relative z-30 h-full w-64 flex-shrink-0 bg-[#161b22] flex flex-col p-2 text-gray-300 transition-transform duration-300 ease-in-out"
    class:-translate-x-full={!$isSidebarOpen}
  >
    <ChatHistory />
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col overflow-hidden">
    <!-- Main Header -->
    <header class="p-4 border-b border-gray-800 flex items-center flex-shrink-0">
      <button class="md:hidden mr-4" on:click={() => isSidebarOpen.update(v => !v)}>
        <SidebarIcon />
      </button>
      <div class="flex-1 flex justify-center">
        <ModelSelector />
      </div>
    </header>

    <!-- Slot for page content -->
    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </main>
</div>