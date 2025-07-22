<script>
  import "../app.css";
  import { isDarkMode } from '$lib/stores/ui';
  import { browser } from '$app/environment';

  // This reactive block toggles the 'dark' class on the <html> element
  $: if (browser) {
    if ($isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
</script>

<svelte:head>
    <title>dost</title>
    {#if browser}
        <link 
            rel="stylesheet"
            href={`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${$isDarkMode ? 'github-dark' : 'github'}.min.css`}
        >
    {/if}
</svelte:head>

<slot />