# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GitLab CI/CD pipeline for automated testing and publishing
- Enhanced test coverage reporting with coverage thresholds
- Security audit and dependency checking automation

### Changed

- Improved build process with dual ESM/CJS output
- Enhanced development workflow with standardized scripts

### Fixed

- Better type inference for utility functions
- Improved error handling in edge cases

## [1.0.0] - 2024-XX-XX

### Added

- Initial release of @zairakai/helpers
- **Validators module** with comprehensive type checking functions:
  - Basic type validation (isString, isNumber, isArray, etc.)
  - Content validation (isEmpty, isBlank, isPresent, etc.)
  - Advanced validation (isEmail, isUrl, isNumeric, etc.)
- **Formatters module** with string manipulation utilities:
  - Text formatting (capitalize, slugify, strLimit)
  - String normalization and cleanup
  - Number formatting with locale support
- **DateTime module** powered by Day.js:
  - Date utility functions (now, today, tomorrow, yesterday)
  - Date comparison and validation helpers
  - Relative time formatting and calculations
- Framework-agnostic design compatible with Vue.js, React, Svelte, Node.js
- Full TypeScript support with strict typing
- Comprehensive test suite with 80%+ coverage
- Dual module support (ESM/CJS)
- Zero external dependencies except Day.js

### Features

- `createI18n()` - Main entry point for all utilities
- Modular exports allowing granular imports
- Laravel-inspired API design for familiar developer experience
- Tree-shakeable modules for optimal bundle size

## Migration Guide

### Installation

```bash
npm install @zairakai/helpers
# or
yarn add @zairakai/helpers
```

### Usage Examples

#### Import everything

```javascript
import { isEmail, capitalize, dayjs } from '@zairakai/helpers'
```

#### Import specific modules

```javascript
// Validators only
import { isEmail, isUrl, isEmpty } from '@zairakai/helpers/validators'

// Formatters only
import { capitalize, slugify, strLimit } from '@zairakai/helpers/formatters'

// DateTime utilities
import { dayjs, isToday, fromNow } from '@zairakai/helpers/datetime'
```

### Framework Integration

#### Vue.js 3

```javascript
import { isEmail, capitalize } from '@zairakai/helpers'

export default {
  setup() {
    const validateEmail = (email) => isEmail(email)
    const formatTitle = (title) => capitalize(title)

    return { validateEmail, formatTitle }
  },
}
```

#### React

```javascript
import { isEmail, capitalize } from '@zairakai/helpers'

function MyComponent() {
  const validateEmail = (email) => isEmail(email)
  const formatTitle = (title) => capitalize(title)

  return <div>...</div>
}
```

### Performance Notes

- All functions are tree-shakeable
- No side effects or global state modifications
- Minimal runtime overhead
- Day.js plugins loaded on-demand
