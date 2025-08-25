# Developing @zairakai/npm-helpers

This document provides information for developers working on the @zairakai/npm-helpers library.

## Setup

1. Clone the repository and navigate to the helpers package:

   ```bash
   cd Npm/helpers
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development Workflow

### Available Scripts

- `npm run build` - Build the TypeScript source code and generate types
- `npm run test` - Run the test suite
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Lint the source code
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Prettier
- `npm run check` - Check code formatting
- `npm run all` - Run all checks (lint + format + test)
- `npm run all:fix` - Fix all issues (lint + format)

### Project Structure

```
src/
├── validators.ts          # Type checking and validation utilities
├── formatters.ts          # String manipulation and formatting
├── datetime.ts           # Date and time utilities (Day.js powered)
└── index.ts             # Main export file

tests/
├── validators.test.js
├── formatters.test.js
├── datetime.test.js
└── index.test.js

dist/
├── index.js             # ES module build
├── index.cjs           # CommonJS build
├── index.d.ts          # Type definitions
├── validators.js       # Validators ES module
├── validators.cjs      # Validators CommonJS
├── validators.d.ts     # Validators type definitions
├── formatters.js       # Formatters ES module
├── formatters.cjs      # Formatters CommonJS
├── formatters.d.ts     # Formatters type definitions
├── datetime.js         # DateTime ES module
├── datetime.cjs        # DateTime CommonJS
└── datetime.d.ts       # DateTime type definitions
```

## Architecture

### Core Modules

1. **Validators** (`src/validators.ts`)
   - Type checking functions (isString, isNumber, isArray, etc.)
   - Content validation (isEmpty, isBlank, isPresent, etc.)
   - Advanced validation (isEmail, isUrl, isNumeric, etc.)

2. **Formatters** (`src/formatters.ts`)
   - String manipulation (capitalize, slugify, strLimit)
   - Text normalization and cleanup
   - Number formatting with locale support

3. **DateTime** (`src/datetime.ts`)
   - Day.js integration with common plugins
   - Date utility functions (now, today, tomorrow, yesterday)
   - Date comparison and validation helpers

4. **Main Entry** (`src/index.ts`)
   - Exports all public APIs
   - Provides consolidated access to all utilities

### Design Principles

- **Framework Agnostic** - Works with Vue.js, React, Svelte, Node.js, etc.
- **Tree Shakeable** - Modular exports for optimal bundle size
- **Zero Dependencies** - Except for Day.js which is carefully managed
- **Laravel Inspired** - Familiar API for Laravel developers
- **TypeScript First** - Full type safety and IDE support

## Testing

### Test Structure

- **Unit Tests** - Each module has comprehensive unit tests
- **Integration Tests** - Test the complete API surface
- **Edge Cases** - Extensive edge case coverage
- **Type Tests** - Ensure TypeScript types work correctly

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode during development
npm run test -- --watch
```

### Coverage Requirements

Minimum coverage thresholds:

- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

### Writing Tests

```javascript
import { describe, it, expect } from 'vitest'
import { isEmail, capitalize } from '../src/index.js'

describe('Email Validation', () => {
  it('should validate correct email addresses', () => {
    expect(isEmail('test@example.com')).toBe(true)
    expect(isEmail('user.name+tag@domain.co.uk')).toBe(true)
  })

  it('should reject invalid email addresses', () => {
    expect(isEmail('invalid.email')).toBe(false)
    expect(isEmail('@domain.com')).toBe(false)
  })
})

describe('Text Capitalization', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello world')).toBe('Hello world')
    expect(capitalize('HELLO WORLD')).toBe('HELLO WORLD')
  })
})
```

## Building

The build process creates multiple outputs:

1. **TypeScript Compilation** - Generates JavaScript and type definitions
2. **Rollup Bundling** - Creates optimized ES and CommonJS modules
3. **Modular Exports** - Separate builds for each module

```bash
npm run build
```

Output files:

- `dist/index.js` - Main ES module
- `dist/index.cjs` - Main CommonJS module
- `dist/index.d.ts` - Main TypeScript declarations
- `dist/validators.js` - Validators ES module
- `dist/validators.cjs` - Validators CommonJS module
- `dist/validators.d.ts` - Validators TypeScript declarations

## Code Style

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "declaration": true,
    "outDir": "./dist"
  }
}
```

### ESLint Rules

- Extends `eslint-config-prettier`
- TypeScript specific rules enabled
- Import ordering and organization
- No console logs in production code

## Performance Considerations

### Bundle Size Optimization

- Tree-shakeable exports
- No unnecessary dependencies
- Minimal runtime overhead
- Day.js plugins loaded on-demand

### Memory Usage

- No global state modifications
- Immutable function design
- Proper garbage collection
- No memory leaks in utilities

## Publishing

### Preparation Checklist

1. [ ] All tests pass: `npm test`
2. [ ] Coverage thresholds met: `npm run test:coverage`
3. [ ] Code style consistent: `npm run all`
4. [ ] Build successful: `npm run build`
5. [ ] Version updated in package.json
6. [ ] CHANGELOG.md updated
7. [ ] README.md reflects changes

### Publishing Process

```bash
# Run complete check
npm run all

# Build for production
npm run build

# Publish to npm
npm publish --access public
```

## Contributing

### Before Submitting

1. [ ] Feature/bug documented in issue
2. [ ] Tests added for new functionality
3. [ ] Documentation updated
4. [ ] Code follows style guidelines
5. [ ] No breaking changes without major version

### Development Tips

- Use TypeScript for all new code
- Write tests before implementation (TDD)
- Keep functions pure and side-effect free
- Follow existing naming conventions
- Add JSDoc comments for complex functions

### Code Review Checklist

- [ ] Type safety maintained
- [ ] Performance implications considered
- [ ] Edge cases handled
- [ ] Tests comprehensive
- [ ] Documentation complete
- [ ] Backward compatibility preserved
