<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  
  // Import a CSS theme for highlight.js
  // You can choose from many themes in `node_modules/highlight.js/styles`
  import 'highlight.js/styles/github-dark.css';

  export let content: string = '';

  // Configure marked to use highlight.js for code blocks
  marked.setOptions({
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    gfm: true, // Use GitHub Flavored Markdown
    breaks: true, // Convert single line breaks to <br>
  });
  
  // The parsed HTML will be stored here
  let parsedContent = '';

  // We use a reactive statement `$: ` to automatically re-run this code
  // whenever the 'content' prop changes.
  $: {
    parsedContent = marked.parse(content) as string;
  }
</script>

<div class="prose dark:prose-invert max-w-none">
  {@html parsedContent}
</div>