/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  arrowParens: 'always',
  bracketSpacing: true,
  semi: false,
  printWidth: 80,
  plugins: [require.resolve('prettier-plugin-tailwindcss')]
}

module.exports = config
