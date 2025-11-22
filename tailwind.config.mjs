/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class', // Enables toggling via a CSS class
	theme: {
		extend: {
			colors: {
				// We use CSS variables here so they swap automatically
				'bg-depth': 'var(--bg-depth)',
				'surface': 'var(--surface)',
				'surface-hover': 'var(--surface-hover)',
				'accent-primary': 'var(--accent-primary)',
				'accent-secondary': 'var(--accent-secondary)',
				'text-primary': 'var(--text-primary)',
				'text-muted': 'var(--text-muted)',
				'border-color': 'var(--border-color)',
			},
			fontFamily: {
				sans: ['Geist Sans', 'system-ui', 'sans-serif'],
				mono: ['Geist Mono', 'monospace'],
			},
		},
	},
	plugins: [],
}