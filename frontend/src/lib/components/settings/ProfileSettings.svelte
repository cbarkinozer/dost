<div class="space-y-6 mt-6">
    <div>
        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
        <input type="text" id="username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 sm:text-sm" value="Test User">
    </div>
    <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
        <input type="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 sm:text-sm" value="user@example.com" disabled>
    </div>
    <div class="pt-4 flex justify-end">
        <button type="button" on:click={() => alert('Profile settings would be saved here!')} class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors">
            Save Changes
        </button>
    </div>
</div>