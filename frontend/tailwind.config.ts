import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'dark-primary': '#0d1117',
				'dark-secondary': '#161b22'
			},
			// This is where we configure the prose colors for dark mode
			typography: ({ theme }: { theme: (path: string) => string }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.gray[300]'),
						'--tw-prose-headings': theme('colors.gray[100]'),
						'--tw-prose-lead': theme('colors.gray[400]'),
						'--tw-prose-links': theme('colors.blue[400]'),
						'--tw-prose-bold': theme('colors.gray[100]'),
						'--tw-prose-counters': theme('colors.gray[400]'),
						'--tw-prose-bullets': theme('colors.gray[600]'),
						'--tw-prose-hr': theme('colors.gray[700]'),
						'--tw-prose-quotes': theme('colors.gray[200]'),
						'--tw-prose-quote-borders': theme('colors.gray[700]'),
						'--tw-prose-captions': theme('colors.gray[400]'),
						'--tw-prose-code': theme('colors.gray[100]'),
						'--tw-prose-pre-code': theme('colors.gray[200]'),
						'--tw-prose-pre-bg': theme('colors.gray[800]'),
						'--tw-prose-th-borders': theme('colors.gray[600]'),
						'--tw-prose-td-borders': theme('colors.gray[700]'),
						'--tw-prose-invert-body': theme('colors.gray[300]'),
						'--tw-prose-invert-headings': theme('colors.white'),
						'--tw-prose-invert-lead': theme('colors.gray[400]'),
						'--tw-prose-invert-links': theme('colors.blue[400]'),
						'--tw-prose-invert-bold': theme('colors.white'),
						'--tw-prose-invert-counters': theme('colors.gray[400]'),
						'--tw-prose-invert-bullets': theme('colors.gray[600]'),
						'--tw-prose-invert-hr': theme('colors.gray[700]'),
						'--tw-prose-invert-quotes': theme('colors.gray[100]'),
						'--tw-prose-invert-quote-borders': theme('colors.gray[700]'),
						'--tw-prose-invert-captions': theme('colors.gray[400]'),
						'--tw-prose-invert-code': theme('colors.white'),
						'--tw-prose-invert-pre-code': theme('colors.gray[200]'),
						'--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
						'--tw-prose-invert-th-borders': theme('colors.gray[600]'),
						'--tw-prose-invert-td-borders': theme('colors.gray[700]')
					}
				}
			})
		}
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;