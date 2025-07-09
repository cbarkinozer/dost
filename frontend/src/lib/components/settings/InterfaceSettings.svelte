<script lang="ts">
    let darkMode = true;
</script>
<div class="space-y-6 mt-6">
    <div class="flex items-center justify-between">
        <span class="flex-grow flex flex-col">
            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Dark Mode</span>
            <span class="text-sm text-gray-500">Enable or disable the dark theme.</span>
        </span>
        <button
            on:click={() => (darkMode = !darkMode)}
            class:bg-blue-600={darkMode}
            class:bg-gray-200={!darkMode}
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            role="switch"
            aria-checked={darkMode}
        >
            <span
                class:translate-x-5={darkMode}
                class:translate-x-0={!darkMode}
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            ></span>
        </button>
    </div>
</div>