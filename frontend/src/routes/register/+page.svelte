<script lang="ts">
    import { goto } from '$app/navigation';

    function handleRegister() {
        // Mock a successful registration and login.
        goto('/');
    }
</script>

<div class="flex min-h-screen items-center justify-center bg-[#0d1117] px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
                Create your account
            </h2>
            <p class="mt-2 text-center text-sm text-gray-400">
                Already have an account?{' '}
                <a href="/login" class="font-medium text-blue-400 hover:text-blue-300">
                    Sign in
                </a>
            </p>
        </div>
        <form class="mt-8 space-y-6" on:submit|preventDefault={handleRegister}>
            <div class="space-y-4 rounded-md shadow-sm">
                <div>
                    <label for="username" class="sr-only">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autocomplete="username"
                        required
                        class="relative block w-full appearance-none rounded-md border-0 bg-[#161b22] py-3 px-4 text-gray-200 placeholder-gray-500 ring-1 ring-inset ring-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                        placeholder="Username"
                    />
                </div>
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="relative block w-full appearance-none rounded-md border-0 bg-[#161b22] py-3 px-4 text-gray-200 placeholder-gray-500 ring-1 ring-inset ring-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        required
                        class="relative block w-full appearance-none rounded-md border-0 bg-[#161b22] py-3 px-4 text-gray-200 placeholder-gray-500 ring-1 ring-inset ring-gray-700 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="group relative flex w-full justify-center rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Create Account
                </button>
            </div>
        </form>
    </div>
</div>