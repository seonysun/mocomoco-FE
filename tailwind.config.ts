import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gmarket: ['GmarketSans', 'sans-serif'],
      },
      colors: {
        main: {
          default: '#A0C49C',
          base: '#C3D7B0',
          medium: '#E1EBC7',
          light: '#F7FFE6',
        },
      },
    },
  },
  plugins: [],
};
export default config;
