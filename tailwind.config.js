/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      mono: ['var(--font-jetbrain)'],
    },
    extend: {
      boxShadow: {
        blocks: '8px 8px',
        'blocks-sm': '4px 4px',
        'blocks-md': '6px 6px',
        email: '6px 6px',
        'footer-btn': '0px 6px',
        'email-btn': '2px 3px',
      },
      minHeight: {
        128: '32rem',
      },
    },
  },
  plugins: [],
}
