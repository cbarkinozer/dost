import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'dark-primary': '#0d1117',
				'dark-secondary': '#161b22'
			},
			typography: ({ theme }: { theme: (path: string) => string }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.gray[700]'),
						'--tw-prose-headings': theme('colors.gray[900]'),
						'--tw-prose-links': theme('colors.blue[600]'),
						'--tw-prose-bold': theme('colors.gray[900]'),
						'--tw-prose-counters': theme('colors.gray[500]'),
						'--tw-prose-bullets': theme('colors.gray[400]'),
						'--tw-prose-hr': theme('colors.gray[200]'),
						'--tw-prose-quotes': theme('colors.gray[900]'),
						'--tw-prose-quote-borders': theme('colors.gray[300]'),
						'--tw-prose-pre-code': theme('colors.gray[700]'),
						'--tw-prose-pre-bg': theme('colors.gray[100]'),
						'--tw-prose-invert-body': theme('colors.gray[300]'),
						'--tw-prose-invert-headings': theme('colors.white'),
						'--tw-prose-invert-links': theme('colors.blue[400]'),
						'--tw-prose-invert-bold': theme('colors.white'),
						'--tw-prose-invert-counters': theme('colors.gray[400]'),
						'--tw-prose-invert-bullets': theme('colors.gray[600]'),
						'--tw-prose-invert-hr': theme('colors.gray[700]'),
						'--tw-prose-invert-quotes': theme('colors.gray[100]'),
						'--tw-prose-invert-quote-borders': theme('colors.gray[700]'),
						'--tw-prose-invert-code': theme('colors.white'),
						'--tw-prose-invert-pre-code': theme('colors.gray[200]'),
						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)'
					}
				}
			})
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;