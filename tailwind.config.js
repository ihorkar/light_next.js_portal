/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        actionprimarydefault: '#55CB64',
        actionprimaryhovered: '#008A2B',
        textprimarydefault: '007B5C',
        interactivedefault: '2C6ECB',
        interactivedisabled: 'BDC1CC',
        surfacesuccessdefault: 'AEE9D1',
        descriptivesecondary: '17104F',
      },
      fontfamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
