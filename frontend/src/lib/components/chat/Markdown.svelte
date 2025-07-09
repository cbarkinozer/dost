<script lang="ts">
  import { marked, type Tokens } from 'marked'; // Import the 'Tokens' type
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github-dark.css';

  export let content: string = '';

  // This is the most modern and recommended way to extend marked.
  marked.use({
    renderer: {
      // The function signature now perfectly matches what TypeScript expects.
      // We accept one argument of type Tokens.Code and destructure it.
      code({ text, lang }: Tokens.Code) {
        const language = lang || 'plaintext';
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        
        const highlightedCode = hljs.highlight(text, { language: validLanguage }).value;
        
        // The 'hljs' class is required by highlight.js themes
        return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
      }
    },
    gfm: true,
    breaks: true
  });

  let parsedContent = '';
  $: {
    if (content) {
      try {
        // Use the promise-based API for safety, though sync is fine here.
        parsedContent = marked.parse(content) as string;
      } catch (e) {
        console.error("Error parsing markdown:", e);
        parsedContent = content; // Fallback to unparsed content on error
      }
    } else {
      parsedContent = '';
    }
  }
</script>

<div class="prose dark:prose-invert max-w-none">
  {@html parsedContent}
</div>