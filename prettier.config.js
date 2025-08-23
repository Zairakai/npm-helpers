/**
 * Prettier configuration for @zairakai/helpers
 * TypeScript utility library formatting
 * @type {import("prettier").Config}
 */

const config = {
  // Core formatting
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',

  // TypeScript/JavaScript specific
  jsxSingleQuote: true,

  // Prose formatting
  proseWrap: 'preserve',
  embeddedLanguageFormatting: 'auto',
}

export default config
