/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
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
                // Headlines: Abril Fatface (Big, Bold, Editorial)
				serif: ['Abril Fatface', 'cursive'],
                
                // Body/UI: Poppins (Clean, Geometric)
				sans: ['Poppins', 'system-ui', 'sans-serif'],
				body: ['Poppins', 'system-ui', 'sans-serif'],
				
				mono: ['Geist Mono', 'monospace'],
			},
            // Adjusted tracking because Abril Fatface letters are wide
            letterSpacing: {
                tighter: '-0.02em',
                tight: '-0.01em',
                normal: '0',
                wide: '0.02em',
                widest: '0.1em',
            }
		},
	},
	plugins: [],
}