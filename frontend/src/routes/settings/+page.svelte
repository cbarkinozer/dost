<script lang="ts">
    import { page } from '$app/stores';
    import Tab from '$lib/components/settings/Tab.svelte';

    // These will be the components for each tab's content
    import ProfileSettings from '$lib/components/settings/ProfileSettings.svelte';
    import InterfaceSettings from '$lib/components/settings/InterfaceSettings.svelte';
    
    let activeTab: string;
    
    // This reactive block runs whenever the URL changes
    $: {
        // Get the 'tab' parameter from the URL, or default to 'profile'
        activeTab = $page.url.searchParams.get('tab') || 'profile';
    }
</script>

<div class="p-4 sm:p-6 md:p-8 h-full overflow-y-auto">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">Settings</h1>
        
        <!-- Tab Navigation -->
        <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav class="-mb-px flex space-x-4" aria-label="Tabs">
                <Tab href="/settings?tab=profile" active={activeTab === 'profile'}>Profile</Tab>
                <Tab href="/settings?tab=interface" active={activeTab === 'interface'}>Interface</Tab>
                <Tab href="/settings?tab=models" active={activeTab === 'models'}>Models</Tab>
            </nav>
        </div>
        

        <!-- Tab Content -->
        <div class="mt-8">
            {#if activeTab === 'profile'}
                <ProfileSettings />
            {:else if activeTab === 'interface'}
                <InterfaceSettings />
            {:else if activeTab === 'models'}
                <div class="mt-6">
                    <p>Model settings will go here.</p>
                </div>
            {/if}
        </div>
        <div>
            <h2 class="text-xl font-semibold capitalize">{activeTab}</h2>
            <p class="text-gray-500 mt-2">
                Settings for the {activeTab} section will be displayed here.
            </p>
        </div>
    </div>
</div>