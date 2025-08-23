# @zairakai/helpers

Collection of JavaScript utility functions for string manipulation, validation, and formatting. Framework-agnostic and inspired by Laravel's helper functions.

## Installation

```bash
npm install @zairakai/helpers
# or
yarn add @zairakai/helpers
```

## Usage

### Import everything

```javascript
import { isEmail, capitalize, dayjs } from '@zairakai/helpers'
```

### Import specific modules

```javascript
// Validators only
import { isEmail, isUrl, isEmpty } from '@zairakai/helpers/validators'

// Formatters only
import { capitalize, slugify, strLimit } from '@zairakai/helpers/formatters'

// DateTime utilities
import { dayjs, isToday, fromNow } from '@zairakai/helpers/datetime'
```

## API Reference

### Validators

Type checking and validation utilities:

```javascript
// Basic type checking
isTrue(true) // true
isFalse(false) // true
isNull(null) // true
isArray([]) // true
isObject({}) // true
isString('hello') // true
isNumber(42) // true
isInteger(42) // true
isFloat(42.5) // true
isBoolean(true) // true
isFunction(() => {}) // true

// Content validation
isEmpty('') // true
isEmpty([]) // true
isEmpty({}) // true
isNotEmpty('hello') // true
isBlank('  ') // true
isPresent('hello') // true
filled('hello') // true (alias for isPresent)

// Advanced validation
isEmail('test@example.com') // true
isUrl('https://example.com') // true
isNumeric('42') // true
isNumeric('42.5') // true
```

### Formatters

String manipulation and formatting:

```javascript
capitalize('hello world') // "Hello world"
slugify('Hello World!') // "hello-world"
strLimit('Long text here', 10) // "Long text…"
normalizeString('Café') // "cafe"
numberFormat(1234.56, 2, 'fr-FR') // "1 234,56"
```

### DateTime

Date and time utilities powered by Day.js:

```javascript
import { dayjs, isToday, fromNow, isBetweenDates } from '@zairakai/helpers/datetime'

// Day.js instance with common plugins loaded
dayjs().format('YYYY-MM-DD')

// Utility functions
isToday('2024-01-15') // true/false
fromNow('2024-01-14') // "1 day ago"
isBetweenDates('2024-01-15', '2024-01-10', '2024-01-20') // true

// Quick date references
now() // dayjs() - current moment
today() // start of today
tomorrow() // start of tomorrow
yesterday() // start of yesterday
```

## Framework Compatibility

This package is framework-agnostic and works with:

- ✅ Vanilla JavaScript
- ✅ Vue.js
- ✅ React
- ✅ Svelte
- ✅ Node.js
- ✅ Any JavaScript environment

## License

MIT © Stanislas Poisson
