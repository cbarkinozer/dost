import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Helper to check for mobile viewport
function isMobile() {
    if (!browser) return false;
    return window.innerWidth < 768; // md breakpoint in Tailwind
}

export const pageTitle = writable('Welcome');
export const isSidebarOpen = writable(!isMobile());