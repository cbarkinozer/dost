<script lang="ts">
	import hljs from 'highlight.js';
	import ClipboardIcon from '$lib/components/icons/ClipboardIcon.svelte';
	import { browser } from '$app/environment';
	import { tick } from 'svelte';

	export let lang: string;
	export let code: string;

	let highlightedCode: string;
	let copyText = 'Copy';

	$: {
		const language = lang || 'plaintext';
		const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
		highlightedCode = hljs.highlight(code, { language: validLanguage }).value;
	}

	async function handleCopy() {
		if (browser) {
			await navigator.clipboard.writeText(code);
			copyText = 'Copied!';
			await tick();
			setTimeout(() => {
				copyText = 'Copy';
			}, 2000);
		}
	}
</script>

<div class="relative group">
	<pre><code class="hljs {lang}">{@html highlightedCode}</code></pre>
	<button
		on:click={handleCopy}
		class="absolute top-2 right-2 flex items-center gap-1.5 rounded-md bg-gray-700 px-2 py-1 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
	>
		<ClipboardIcon />
		<span>{copyText}</span>
	</button>
</div>