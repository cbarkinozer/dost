<script lang="ts">
    export let href: string;
    export let active: boolean = false;
</script>

<a {href} 
   class="px-3 py-2 font-medium text-sm rounded-md"
   class:bg-gray-200={active}
   class:dark:bg-gray-700={active}
   class:text-gray-700={!active}
   class:dark:text-gray-200={!active}
   class:hover:bg-gray-200={!active}
   class:dark:hover:bg-gray-700={!active}
>
    <slot />
</a>