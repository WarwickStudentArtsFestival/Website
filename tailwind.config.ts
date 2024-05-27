import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#087F8C',
        secondary: '#4F1D75',
        tertiary: '#FF0054',
        accent: '#FFBD00',
        white: '#FFFFFF',
        dark: '#000000',
        orange: '#FF5400',
      },
      fontSize: {
        '2xs': '0.6rem',
      },
    },
    fontFamily: {
      lexend: ['var(--font-lexend)', 'sans-serif'],
    },
    screens: {
      '2xs': '440px',
      xs: '520px',
      ...defaultTheme.screens,
      '3xl': '1800px',
      '4xl': '2050px',
      '5xl': '2300px',
      '6xl': '2550px',
    },
  },
  plugins: [],
  safelist: ['bg-orange'],
};
export default config;
