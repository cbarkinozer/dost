<script lang="ts">
	import Markdown from './Markdown.svelte';
	import ArrowPathIcon from '$lib/components/icons/ArrowPathIcon.svelte';
	import PencilIcon from '$lib/components/icons/PencilIcon.svelte';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
	import ThumbUpIcon from '$lib/components/icons/ThumbUpIcon.svelte';
	import ThumbDownIcon from '$lib/components/icons/ThumbDownIcon.svelte';
	import ClipboardIcon from '$lib/components/icons/ClipBoardIcon.svelte';
	import { regenerateResponse } from '$lib/stores/chat';
	import { browser } from '$app/environment';

	export let role: 'user' | 'assistant';
	export let content: string;
	export let conversationId: string;
	export let isLast: boolean;
	export let timestamp: Date;
	export let model: string | undefined;

	let feedback: 'liked' | 'disliked' | 'none' = 'none';

	$: formattedTime = timestamp.toLocaleTimeString([], {
		hour: 'numeric',
		minute: '2-digit'
	});

	function handleCopy() {
		if (browser) {
			navigator.clipboard.writeText(content);
			alert('Copied to clipboard!');
		}
	}

	function handleLike() {
		feedback = feedback === 'liked' ? 'none' : 'liked';
	}

	function handleDislike() {
		feedback = feedback === 'disliked' ? 'none' : 'disliked';
	}

	function handleEdit() {
		alert(`Editing is not yet implemented.`);
	}

	function handleDelete() {
		alert(`Deleting single messages is not yet implemented.`);
	}
</script>

<div class="group flex flex-col items-start gap-1 p-4 text-gray-800 dark:text-gray-200">
	<div class="flex w-full items-start gap-4">
		<div
			class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white"
			class:bg-blue-500={role === 'user'}
			class:bg-green-500={role === 'assistant'}
		>
			{#if role === 'user'}U{:else}A{/if}
		</div>

		<div class="flex-1 min-w-0">
			<Markdown {content} />
		</div>

		<div
			class="flex flex-col md:flex-row items-center self-start space-y-1 md:space-y-0 md:space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
		>
			{#if role === 'assistant'}
				<button
					on:click={handleLike}
					title="Good response"
					class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
					class:text-blue-500={feedback === 'liked'}
					class:dark:text-blue-400={feedback === 'liked'}
					class:text-gray-400={feedback !== 'liked'}
					class:opacity-50={feedback === 'disliked'}
				>
					<ThumbUpIcon />
				</button>
				<button
					on:click={handleDislike}
					title="Bad response"
					class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
					class:text-blue-500={feedback === 'disliked'}
					class:dark:text-blue-400={feedback === 'disliked'}
					class:text-gray-400={feedback !== 'disliked'}
					class:opacity-50={feedback === 'liked'}
				>
					<ThumbDownIcon />
				</button>
				{#if isLast}
					<button
						on:click={() => regenerateResponse(conversationId)}
						title="Regenerate"
						class="p-1 rounded text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200"
					>
						<ArrowPathIcon />
					</button>
				{/if}
			{/if}

			{#if role === 'user'}
				<button
					on:click={handleEdit}
					title="Edit"
					class="p-1 rounded text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200"
				>
					<PencilIcon />
				</button>
				<button
					on:click={handleDelete}
					title="Delete"
					class="p-1 rounded text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200"
				>
					<TrashIcon />
				</button>
			{/if}

			<button
				on:click={handleCopy}
				title="Copy"
				class="p-1 rounded text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200"
			>
				<ClipboardIcon />
			</button>
		</div>
	</div>

	<div class="pl-12 w-full">
		<div
			class="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
		>
			{#if model}
				<span>{model}</span>
				<span>·</span>
			{/if}
			<span>{formattedTime}</span>
		</div>
	</div>
</div>