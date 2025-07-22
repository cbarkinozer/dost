<script lang="ts">
    import { page } from '$app/stores';
    import Tab from '$lib/components/settings/Tab.svelte';
    import ProfileSettings from '$lib/components/settings/ProfileSettings.svelte';
    import InterfaceSettings from '$lib/components/settings/InterfaceSettings.svelte';
    
    let activeTab: string;
    
    $: {
        activeTab = $page.url.searchParams.get('tab') || 'profile';
    }
</script>

<div class="p-4 sm:p-6 md:p-8 h-full overflow-y-auto text-gray-900 dark:text-gray-100">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Settings</h1>
        
        <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav class="-mb-px flex space-x-4" aria-label="Tabs">
                <Tab href="/settings?tab=profile" active={activeTab === 'profile'}>Profile</Tab>
                <Tab href="/settings?tab=interface" active={activeTab === 'interface'}>Interface</Tab>
                <Tab href="/settings?tab=models" active={activeTab === 'models'}>Models</Tab>
            </nav>
        </div>
        
        <div class="mt-8">
            <h2 class="text-xl font-semibold capitalize mb-4">{activeTab}</h2>
            {#if activeTab === 'profile'}
                <ProfileSettings />
            {:else if activeTab === 'interface'}
                <InterfaceSettings />
            {:else if activeTab === 'models'}
                <div class="mt-6 bg-white dark:bg-[#161b22] p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p class="text-gray-600 dark:text-gray-400">User-specific model preferences and API key management will be available here.</p>
                </div>
            {/if}
        </div>
    </div>
</div>