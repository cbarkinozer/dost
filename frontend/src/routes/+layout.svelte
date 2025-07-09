<script lang="ts">
  import "../app.css";
  import ChatHistory from "$lib/components/layout/ChatHistory.svelte"; // Import the component
</script>

<div class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
  
  <!-- Sidebar -->
  <aside class="w-64 flex-shrink-0 bg-gray-200 dark:bg-gray-800 flex flex-col p-4">
    <div class="flex items-center justify-center h-12 border-b dark:border-gray-700 mb-4 flex-shrink-0">
      <h1 class="text-xl font-bold">dost</h1>
    </div>
    
    <!-- Render the Chat History component here -->
    <ChatHistory />

  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col">
    <slot />
  </main>
</div>