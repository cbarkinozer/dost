<script lang="ts">
	import { conversations, selectedConversationId, deleteConversation, togglePin, type Conversation } from '$lib/stores/conversations';
	import { messageStore } from '$lib/stores/chat';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import PencilIcon from '$lib/components/icons/PencilIcon.svelte';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
	import PinIcon from '$lib/components/icons/PinIcon.svelte';
	import DocumentTextIcon from '$lib/components/icons/DocumentTextIcon.svelte';
	import { browser } from '$app/environment';
	import { derived, writable } from 'svelte/store';

	const searchQuery = writable('');

	const filteredConversations = derived([conversations, searchQuery], ([$conversations, $searchQuery]) => {
		const filtered = $searchQuery
			? $conversations.filter((c: Conversation) => c.title.toLowerCase().includes($searchQuery.toLowerCase()))
			: $conversations;
		
		return filtered.sort((a: Conversation, b: Conversation) => {
			if (a.pinned && !b.pinned) return -1;
			if (!a.pinned && b.pinned) return 1;
			return b.createdAt.getTime() - a.createdAt.getTime();
		});
	});

	function generateId() {
		if (browser) return crypto.randomUUID();
		return Math.random().toString(36).substring(2, 15);
	}

	function handleNewChat() {
		const newId = generateId();
		const newTitle = `New Chat`;
		messageStore.update((history) => {
			history[newId] = [];
			return history;
		});
		conversations.update((convs) => [{ id: newId, title: newTitle, pinned: false, createdAt: new Date() }, ...convs]);
		goto(`/c/${newId}`);
	}

	function handleDelete(e: MouseEvent, id: string) {
		e.stopPropagation();
		if (confirm('Are you sure you want to delete this chat?')) {
			const isCurrentChat = id === $page.params.id;
			deleteConversation(id);
			if (isCurrentChat) {
				goto('/');
			}
		}
	}

    function handlePin(e: MouseEvent, id: string) {
        e.stopPropagation();
        togglePin(id);
    }
</script>

<div class="p-2 space-y-2">
	<button on:click={handleNewChat} class="w-full flex items-center justify-between p-3 rounded-lg text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
		<span>New Chat</span>
		<PencilIcon />
	</button>
	<div class="relative">
		<input
			type="text"
			bind:value={$searchQuery}
			placeholder="Search chats..."
			class="w-full pl-8 pr-3 py-2 bg-gray-200 dark:bg-[#0d1117] border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
		/>
		<div class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
			<svg class="h-4 w-4 text-gray-400 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" /></svg>
		</div>
	</div>
</div>

<nav class="flex-1 overflow-y-auto px-2">
	<ul class="space-y-1">
		{#each $filteredConversations as conv (conv.id)}
			<li class="group relative">
				<a
					href={`/c/${conv.id}`}
					class="flex items-center gap-2 p-3 rounded-lg text-sm truncate"
					class:bg-blue-600={conv.id === $selectedConversationId}
					class:text-white={conv.id === $selectedConversationId}
					class:text-gray-600={conv.id !== $selectedConversationId}
					class:dark:text-gray-300={conv.id !== $selectedConversationId}
					class:hover:bg-gray-200={conv.id !== $selectedConversationId}
					class:dark:hover:bg-gray-700={conv.id !== $selectedConversationId}
				>
                    {#if conv.pinned}
                        <div class="text-amber-500 dark:text-amber-400"><PinIcon /></div>
                    {/if}
					<span class="flex-1 truncate">{conv.title}</span>
				</a>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 bg-gray-100 dark:bg-[#161b22] rounded-full">
                    <button on:click={(e) => handlePin(e, conv.id)} title="Pin conversation" class="p-1.5 text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400">
                        <PinIcon />
                    </button>
                    <button on:click={(e) => handleDelete(e, conv.id)} title="Delete conversation" class="p-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                        <TrashIcon />
                    </button>
                </div>
			</li>
		{/each}
	</ul>
</nav>

<div class="mt-auto p-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
	<a href="/documents" class="flex items-center gap-3 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
		<DocumentTextIcon />
		<span class="text-sm font-medium">My Documents</span>
	</a>
	<a href="/settings" class="flex items-center gap-3 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
		<div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-white font-bold">U</div>
		<span class="text-sm font-medium">Test User</span>
	</a>
	<a href="/admin/users" class="flex items-center gap-3 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>
		<span class="text-sm font-medium">Admin Panel</span>
	</a>
	<a href="/login" class="flex items-center gap-3 p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
        </svg>
        <span class="text-sm font-medium">Sign Out</span>
	</a>
</div>