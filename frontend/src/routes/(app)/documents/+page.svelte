<script lang="ts">
    import FileUploader from '$lib/components/documents/FileUploader.svelte';

    // Mock document data
    const documents = [
        { id: 1, name: 'project-brief.pdf', size: '1.2 MB', status: 'Processed', date: '2024-07-12' },
        { id: 2, name: 'meeting_notes.txt', size: '5.6 KB', status: 'Processed', date: '2024-07-11' },
        { id: 3, name: 'research_paper_final.pdf', size: '5.8 MB', status: 'Processing', date: '2024-07-12' },
        { id: 4, name: 'api_keys.md', size: '1.2 KB', status: 'Error', date: '2024-07-10' },
    ];

    function deleteDocument(id: number) {
        if (confirm('Are you sure you want to delete this document?')) {
            alert(`Deleting document with ID: ${id}.`);
            // In a real app, you would filter the `documents` array here.
        }
    }
</script>

<div class="p-4 sm:p-6 md:p-8 h-full overflow-y-auto text-gray-900 dark:text-gray-200">
    <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold mb-6">My Documents</h1>

        <!-- File Uploader -->
        <div class="mb-8">
            <FileUploader />
        </div>

        <!-- Document List -->
        <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Uploaded Files</h2>
            <div class="bg-white dark:bg-[#161b22] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-[#0d1117]">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">File Name</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Uploaded</th>
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                        {#each documents as doc (doc.id)}
                            <tr class="hover:bg-gray-50 dark:hover:bg-[#0d1117]">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{doc.name}</div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">{doc.size}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                        class:bg-green-100={doc.status === 'Processed'} class:dark:bg-green-900={doc.status === 'Processed'}
                                        class:text-green-800={doc.status === 'Processed'} class:dark:text-green-300={doc.status === 'Processed'}
                                        class:bg-blue-100={doc.status === 'Processing'} class:dark:bg-blue-900={doc.status === 'Processing'}
                                        class:text-blue-800={doc.status === 'Processing'} class:dark:text-blue-300={doc.status === 'Processing'}
                                        class:bg-red-100={doc.status === 'Error'} class:dark:bg-red-900={doc.status === 'Error'}
                                        class:text-red-800={doc.status === 'Error'} class:dark:text-red-300={doc.status === 'Error'}
                                    >
                                        {doc.status}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{doc.date}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button on:click={() => deleteDocument(doc.id)} type="button" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>