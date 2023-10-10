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
        'briggs-fontsize-bodylg': '16px',
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
        // Buttons
        actionprimarydefault: '#55CB64',
        actionprimaryhovered: '#008A2B',
        actionprimarypressed: '#004310',
        actionprimarydepressed: '#002606',
        actionsecondarydefault: '#FFFFFF',
        actionsecondaryhovered: '#F6F6F7',
        actionsecondarypressed: '#F1F2F3',
        actionsecondarydepressed: '#EDEEEF',
        actioncriticaldefault: '#D82C0D',
        actioncriticalhovered: '#BC2200',
        actioncriticalpressed: '#A21B00',
        actioncriticaldepressed: '#6C0F00',

        // Background
        backgrounddefault: '#FAFAFA',

        // Text
        textprimarydefault: '007B5C',
        textprimary: '#FFFFFF',
        textdefault: '#202223',
        textsubdued: '#6D7175',

        // Icons
        icondefault: '#5C5F62',
        iconhovered: '#1A1C1D',
        iconcritical: '#D72C0D',
        iconwarning: '#B98900',
        iconsuccess: '#007F5F',
        iconhighlight: '#00A0AC',

        // Border
        borderdefault: '#8C9196',

        //Interactive
        interactivedefault: '2C6ECB',
        interactivedisabled: 'BDC1CC',
        surfacesuccessdefault: 'AEE9D1',
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
