<script lang="ts">
  import "../app.css";
  import ChatHistory from "$lib/components/layout/ChatHistory.svelte";
  import ModelSelector from '$lib/components/chat/ModelSelector.svelte';
</script>

<div class="flex h-screen bg-gray-900 text-gray-200">
  
  <!-- Sidebar -->
  <aside class="w-64 flex-shrink-0 bg-gray-800 flex flex-col p-2 text-gray-300">
    <ChatHistory />
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col overflow-hidden">
    <!-- Main Header with Model Selector -->
    <header class="p-4 border-b border-gray-700 flex justify-center items-center flex-shrink-0">
      <ModelSelector />
    </header>

    <!-- Slot for page content -->
    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>
  </main>
</div>