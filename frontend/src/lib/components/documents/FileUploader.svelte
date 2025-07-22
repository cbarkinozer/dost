<script lang="ts">
    let isDragging = false;

    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            // In a real app, you would handle the files here.
            alert(`Selected ${input.files.length} file(s).`);
        }
    }
</script>

<div
    class="relative block w-full rounded-lg border-2 border-dashed p-12 text-center"
    class:border-blue-500={isDragging}
    class:bg-[#1f2937]={isDragging}
    class:border-gray-600={!isDragging}
    on:dragenter|preventDefault|stopPropagation={() => (isDragging = true)}
    on:dragover|preventDefault|stopPropagation={() => (isDragging = true)}
    on:dragleave|preventDefault|stopPropagation={() => (isDragging = false)}
    on:drop|preventDefault|stopPropagation={(e) => {
        isDragging = false;
        // In a real app, you would handle e.dataTransfer.files here.
        alert(`Dropped ${e.dataTransfer?.files.length} file(s).`);
    }}
    role="button"
    tabindex="0"
>
    <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>

    <span class="mt-2 block text-sm font-semibold text-gray-100">
        Drag & drop files here, or
        <label for="file-upload" class="cursor-pointer font-semibold text-blue-400 hover:text-blue-300 focus-within:outline-none">
            click to upload
        </label>
    </span>
    <p class="mt-1 block text-xs text-gray-500">PDF, TXT, MD up to 10MB</p>
    <input id="file-upload" name="file-upload" type="file" class="sr-only" multiple on:change={handleFileSelect} />
</div>