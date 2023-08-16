/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'briggs-fontsize-heading4xl-xs-sm': '32px',
        'briggs-fontsize-heading3xl-xs-sm': '28px',
        'briggs-fontsize-heading2xl-xs-sm': '24px',
        'briggs-fontsize-headingxl-xs-sm': '20px',
        'briggs-fontsize-headinglg-xs-sm': '16px',
        'briggs-fontsize-heading4xl-md-xl': '40px',
        'briggs-fontsize-heading3xl-md-xl': '32px',
        'briggs-fontsize-heading2xl-md-xl': '28px',
        'briggs-fontsize-headingxl-md-xl': '24px',
        'briggs-fontsize-headinglg-md-xl': '20px',
      },
      lineHeight: {
        'briggs-lineheight-heading4xl-xs-sm': '40px',
        'briggs-lineheight-heading3xl-xs-sm': '32px',
        'briggs-lineheight-heading2xl-xs-sm': '28px',
        'briggs-lineheight-headingxl-xs-sm': '24px',
        'briggs-lineheight-headinglg-xs-sm': '20px',
        'briggs-lineheight-heading4xl-md-xl': '48px',
        'briggs-lineheight-heading3xl-md-xl': '40px',
        'briggs-lineheight-heading2xl-md-xl': '32px',
        'briggs-lineheight-headingxl-md-xl': '28px',
        'briggs-lineheight-headinglg-md-xl': '24px',
      },
      fontWeight: {
        'briggs-weight-heading': 600
      },
      colors: {
        actionprimarydefault: '#55CB64',
        actionprimaryhovered: '#008A2B',
        textprimarydefault: '007B5C',
        interactivedefault: '2C6ECB',
        interactivedisabled: 'BDC1CC',
        surfacesuccessdefault: 'AEE9D1',
        descriptivesecondary: '17104F',
      },
      fontFamily: {
        'briggs-typeface': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
