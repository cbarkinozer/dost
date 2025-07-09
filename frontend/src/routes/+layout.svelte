<script>
  import "../app.css";
</script>

<div class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
  <!-- Sidebar -->
  <aside class="w-64 flex-shrink-0 bg-gray-200 dark:bg-gray-800 p-4">
    <div class="flex items-center justify-center h-12 border-b dark:border-gray-700">
      <h1 class="text-xl font-bold">dost</h1>
    </div>
    <nav class="mt-6">
      <!-- Placeholder for conversation history -->
      <div class="p-2 rounded-lg bg-blue-500/20 text-blue-500">
        A Past Conversation
      </div>
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col">
    <slot />
  </main>
</div>