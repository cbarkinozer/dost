<script lang="ts">
	import { marked, type Token } from 'marked';
	import CodeBlock from './CodeBlock.svelte';

	export let content: string = '';

	let tokens: Token[] = [];

	// Use the lexer to get tokens instead of parsing directly to HTML
	$: tokens = marked.lexer(content || '');

	// Custom renderer for non-code tokens
	const renderer = new marked.Renderer();
	marked.use({ renderer, gfm: true, breaks: true });
</script>

<div class="prose dark:prose-invert max-w-none">
	{#each tokens as token}
		{#if token.type === 'code'}
			<CodeBlock lang={token.lang} code={token.text} />
		{:else if token.type === 'space'}
            <!-- Render nothing for space tokens -->
        {:else}
			<!-- For all other tokens, render their raw HTML representation -->
			{@html marked.parse(token.raw, { renderer })}
		{/if}
	{/each}
</div>