<script lang="ts">
    import { page } from '$app/stores';
    import Tab from '$lib/components/settings/Tab.svelte';
    
    // Determine the active tab based on the current URL path
    let activeTab: string;
    $: {
        if ($page.url.pathname.startsWith('/admin/users')) {
            activeTab = 'users';
        } else if ($page.url.pathname.startsWith('/admin/settings')) {
            activeTab = 'settings';
        } else if ($page.url.pathname.startsWith('/admin/models')) {
            activeTab = 'models';
        } else {
            activeTab = 'users'; // Default to users
        }
    }
</script>

<div class="p-4 sm:p-6 md:p-8 h-full overflow-y-auto text-gray-900 dark:text-gray-200">
    <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Admin Panel</h1>
        
        <!-- Tab Navigation -->
        <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav class="-mb-px flex space-x-4" aria-label="Tabs">
                <Tab href="/admin/users" active={activeTab === 'users'}>Users</Tab>
                <Tab href="/admin/settings" active={activeTab === 'settings'}>System Settings</Tab>
                <Tab href="/admin/models" active={activeTab === 'models'}>Model Management</Tab>
            </nav>
        </div>
        
        <!-- Slot for the specific admin page content (e.g., users table) -->
        <div class="mt-8">
            <slot />
        </div>
    </div>
</div>