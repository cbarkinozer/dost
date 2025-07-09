import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'dark-primary': '#0d1117',
				'dark-secondary': '#161b22',
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;