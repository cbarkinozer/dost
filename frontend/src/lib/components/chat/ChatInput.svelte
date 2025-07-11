<script lang="ts">
	import { submitMessage, cancelStream, isStreaming } from '$lib/stores/chat';
	import PaperclipIcon from '$lib/components/icons/PaperclipIcon.svelte';

	export let conversationId: string | null;
	let inputValue = '';
	let fileInput: HTMLInputElement;

	function handleSubmit() {
		if (!conversationId || $isStreaming) return;
		const trimmedValue = inputValue.trim();
		if (!trimmedValue) return;

		submitMessage(conversationId, trimmedValue);
		inputValue = '';
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSubmit();
		}
	}

	function handleFileSelection(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const fileNames = Array.from(input.files)
				.map((f) => f.name)
				.join(', ');
			alert(`Selected file(s): ${fileNames}`);
		}
	}

	function handleStop() {
		cancelStream();
	}
</script>

<div class="px-4 pb-4 pt-2 bg-white dark:bg-[#0d1117] border-t border-gray-200 dark:border-transparent">
	<div class="max-w-3xl mx-auto">
		{#if $isStreaming}
			<div class="flex justify-center">
				<button
					on:click={handleStop}
					class="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4"
					>
						<path
							d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5Z"
						></path>
					</svg>
					Stop generating
				</button>
			</div>
		{:else}
			<form on:submit|preventDefault={handleSubmit} class="relative">
				<textarea
					bind:value={inputValue}
					on:keydown={handleKeydown}
					class="w-full p-3 pl-12 pr-12 bg-gray-100 dark:bg-[#161b22] border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
					rows="1"
					placeholder="Ask dost anything..."
				></textarea>

				<button
					type="button"
					on:click={() => fileInput.click()}
					class="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
					aria-label="Attach file"
				>
					<PaperclipIcon />
				</button>
				<input
					type="file"
					bind:this={fileInput}
					on:change={handleFileSelection}
					class="hidden"
					multiple
				/>

				<button
					type="submit"
					class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
					aria-label="Send message"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4"
					>
						<path
							d="M2.87 2.298a.75.75 0 0 0-.812 1.021L3.39 6.624a1 1 0 0 0 .928.626H8.25a.75.75 0 0 1 0 1.5H4.318a1 1 0 0 0-.927.626l-1.333 3.305a.75.75 0 0 0 .812 1.022L13.25 8.75a.75.75 0 0 0 0-1.5L2.87 2.298Z"
						/>
					</svg>
				</button>
			</form>
		{/if}
	</div>
</div>