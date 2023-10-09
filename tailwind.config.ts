import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shop/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './src/admin/presentation/**/*.{js,ts,jsx,tsx,mdx}',
    './src/core/presentation/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
    },
    extend: {
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
export default config
