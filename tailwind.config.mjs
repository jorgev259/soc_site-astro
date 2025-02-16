/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      md: '880px'
    },
    extend: {
      colors: {
        dark: '#212529',
        'dark-hover': '#2b3035',
        gray: '#3f3f3f',
        'gray-hover': '#4f4f4f',
        'soc-green': '#4b7667',
        'hover-link': '#00d4ff'
      }
    }
  },
  plugins: []
}
