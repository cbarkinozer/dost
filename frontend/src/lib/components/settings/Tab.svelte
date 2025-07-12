<script lang="ts">
    export let href: string;
    export let active: boolean = false;
</script>

<a {href} 
   class="px-3 py-2 font-medium text-sm rounded-md"
   class:bg-gray-200={active}
   class:dark:bg-gray-700={active}
   class:text-blue-600={active}
   class:dark:text-white={active}
   class:text-gray-500={!active}
   class:dark:text-gray-400={!active}
   class:hover:bg-gray-100={!active}
   class:dark:hover:bg-gray-800={!active}
   class:hover:text-gray-700={!active}
   class:dark:hover:text-gray-200={!active}
   >
    <slot />
</a>