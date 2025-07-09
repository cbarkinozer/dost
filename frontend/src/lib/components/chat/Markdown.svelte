<script lang="ts">
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github-dark.css';

  export let content: string = '';

  const renderer = new marked.Renderer();

  // The 'marked' library passes a single object. The `lang` property can be undefined.
  // This is the corrected function signature.
  renderer.code = (code: string, lang: string | undefined) => {
    const language = lang || 'plaintext';
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    
    const highlightedCode = hljs.highlight(code, { language: validLanguage }).value;
    
    // The 'hljs' class is required by highlight.js themes
    return `<pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: true,
  });

  let parsedContent = '';
  $: {
    if (content) {
      try {
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