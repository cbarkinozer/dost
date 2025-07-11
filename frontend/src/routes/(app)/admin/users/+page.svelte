<script lang="ts">
    // Mock user data
    const users = [
        { id: 1, name: 'Admin User', email: 'admin@dost.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Test User', email: 'user@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Jane Doe', email: 'jane.doe@example.com', role: 'User', status: 'Active' },
        { id: 4, name: 'John Smith', email: 'john.smith@example.com', role: 'User', status: 'Inactive' },
        { id: 5, name: 'Pending Invite', email: 'new.user@example.com', role: 'User', status: 'Pending' },
    ];
</script>

<div>
    <h2 class="text-xl font-semibold text-gray-100 mb-4">User Management</h2>
    
    <!-- Header with Search and Add User button -->
    <div class="flex items-center justify-between mb-4">
        <div class="relative w-full max-w-xs">
            <input 
                type="text" 
                placeholder="Search users..." 
                class="w-full pl-10 pr-4 py-2 bg-[#161b22] border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors">
            Add User
        </button>
    </div>

    <!-- Users Table -->
    <div class="bg-[#161b22] rounded-lg overflow-hidden border border-gray-700">
        <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-[#0d1117]">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                {#each users as user (user.id)}
                    <tr class="hover:bg-[#0d1117]">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-100">{user.name}</div>
                            <div class="text-sm text-gray-400">{user.email}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.role}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                  class:bg-green-900={user.status === 'Active'}
                                  class:text-green-300={user.status === 'Active'}
                                  class:bg-red-900={user.status === 'Inactive'}
                                  class:text-red-300={user.status === 'Inactive'}
                                  class:bg-yellow-900={user.status === 'Pending'}
                                  class:text-yellow-300={user.status === 'Pending'}
                            >
                                {user.status}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <a href="#" class="text-blue-400 hover:text-blue-300">Edit</a>
                            <a href="#" class="text-red-400 hover:text-red-300">Delete</a>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>