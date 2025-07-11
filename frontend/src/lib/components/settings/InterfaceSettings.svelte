<script lang="ts">
    import { isDarkMode } from '$lib/stores/ui';
</script>
<div class="space-y-6 mt-6">
    <div class="flex items-center justify-between">
        <span class="flex-grow flex flex-col">
            <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Dark Mode</span>
            <span class="text-sm text-gray-500">Enable or disable the dark theme.</span>
        </span>
        <button
            on:click={() => ($isDarkMode = !$isDarkMode)}
            class:bg-blue-600={$isDarkMode}
            class:bg-gray-200={!$isDarkMode}
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            role="switch"
            aria-checked={$isDarkMode}
            aria-label="Toggle Dark Mode"
        ></button>
    </div>
</div>