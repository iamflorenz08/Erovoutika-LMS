import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#00008B',
        'primary-light': "#007AFF",
        'primary-light-100': "#DADAFF",
        'gray': '#7B7B7B',
        'semi-black': '#303030',
        'dirty-white': "#F9F9F9",
        'reward': '#E9A23B',
        'success': '#63C757',
      },
      boxShadow: {
        'tooltip': '0 0 20px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography'),
  ],
}
export default config
