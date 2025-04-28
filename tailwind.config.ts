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
          header: '#A0B092',
        },
        red: {
          default: '#DE5D5D',
          hover: '#c94a4a',
        },
        green: {
          default: '#6AA78B',
          hover: '#5c9579',
        },
      },
    },
  },
  plugins: [],
};
export default config;
