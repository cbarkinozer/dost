import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function isMobile() {
    if (!browser) return false;
    return window.innerWidth < 768;
}

export const pageTitle = writable('Welcome');
export const isSidebarOpen = writable(!isMobile());
export const isDarkMode = writable(true);
export const streamResponse = writable(true);

export const selectedModelName = writable('llama3:70b');