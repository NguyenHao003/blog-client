import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/modules/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
export default config
