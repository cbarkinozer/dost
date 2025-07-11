<script>
  import "../app.css";
  import { isDarkMode } from '$lib/stores/ui';
  import { browser } from '$app/environment';

  // FIX: This reactive block toggles the 'dark' class on the <html> element
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
</svelte:head>

<slot />