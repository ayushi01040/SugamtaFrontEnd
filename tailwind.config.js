/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#2563EB',
        'dark-navy': '#1E293B',
        'light-gray': '#F1F5F9',
        'text-dark-gray': '#334155',
        'text-light-gray': '#94A3B8',
        'accent-green': '#10B981',
        'accent-red': '#EF4444',
      },
      boxShadow: {
        'xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
