# Contributing to @zairakai/helpers

We welcome contributions to the @zairakai/helpers utility library! This document provides guidelines for contributing to this project.

## Before Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the maintainers before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Development Setup

1. Fork and clone the repository
2. Navigate to the helpers package: `cd Npm/helpers`
3. Install dependencies: `npm install`
4. Run tests to ensure everything works: `npm test`

## Types of Contributions

### 🐛 Bug Reports

- Use the issue template
- Include minimal reproduction steps
- Provide expected vs actual behavior
- Include environment details (Node.js version, etc.)

### ✨ Feature Requests

- Describe the use case and problem being solved
- Consider if it fits the library's scope (utility functions)
- Provide example usage of the proposed feature
- Check existing issues to avoid duplicates

### 🔧 Code Contributions

#### For Validators (`src/validators.ts`)

- Add comprehensive type checking functions
- Follow existing naming patterns (`isXxx`, `isEmpty`, etc.)
- Include edge case handling
- Maintain Laravel-inspired API consistency

#### For Formatters (`src/formatters.ts`)

- Add string manipulation and formatting utilities
- Support internationalization where applicable
- Consider performance for large strings
- Provide sensible defaults

#### For DateTime (`src/datetime.ts`)

- Leverage Day.js efficiently
- Add commonly needed date utilities
- Handle timezone considerations
- Maintain backward compatibility

## Pull Request Process

### 1. Preparation

- [ ] Create feature branch from `main`: `git checkout -b feature/your-feature-name`
- [ ] Make your changes following our code style
- [ ] Add/update tests for your changes
- [ ] Update documentation if needed
- [ ] Run the complete test suite: `npm run all`

### 2. Code Quality Requirements

- [ ] All tests pass: `npm test`
- [ ] Coverage meets minimum thresholds (80%)
- [ ] ESLint passes: `npm run lint`
- [ ] Code is formatted: `npm run format`
- [ ] TypeScript compiles without errors
- [ ] Build succeeds: `npm run build`

### 3. Documentation

- [ ] Update README.md with new functionality
- [ ] Add JSDoc comments for new functions
- [ ] Update CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/)
- [ ] Include usage examples in tests or documentation

### 4. Testing Requirements

```javascript
// Example test structure
describe('newUtilityFunction', () => {
  it('should handle typical use case', () => {
    expect(newFunction('input')).toBe('expected')
  })

  it('should handle edge cases', () => {
    expect(newFunction('')).toBe('')
    expect(newFunction(null)).toBe(null)
  })

  it('should validate input types', () => {
    expect(() => newFunction(123)).toThrow()
  })
})
```

### 5. Commit Guidelines

- Use conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep commits focused and atomic
- Write descriptive commit messages

Examples:

```
feat(validators): add isPhoneNumber function
fix(formatters): handle null input in capitalize
docs(readme): update installation instructions
test(datetime): add edge cases for isToday function
```

### 6. Submission

1. Push your branch to your fork
2. Create a Pull Request with:
   - Clear title and description
   - Reference any related issues
   - Include breaking change notes if applicable
   - Add screenshots/examples if relevant

### 7. Review Process

- Maintain backward compatibility unless it's a major version
- Code will be reviewed by maintainers
- Address feedback promptly
- Be open to suggestions and improvements

## Version Management

We use [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backward-compatible functionality additions
- **PATCH** version for backward-compatible bug fixes

### Breaking Changes

- Clearly document in CHANGELOG.md
- Provide migration guide
- Consider deprecation warnings before removal

## Code Style Guidelines

### TypeScript

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use proper JSDoc for public APIs
- Avoid `any` type unless absolutely necessary

### Function Design

- Keep functions pure (no side effects)
- Use descriptive parameter and return types
- Handle edge cases gracefully
- Provide sensible defaults

### Testing

- Write tests before implementation (TDD encouraged)
- Cover happy path, edge cases, and error conditions
- Use descriptive test names
- Group related tests with `describe` blocks

### Performance

- Consider time and space complexity
- Avoid unnecessary loops or operations
- Profile for large inputs when relevant
- Use efficient algorithms and data structures

## Community Guidelines

### Be Respectful

- Use welcoming and inclusive language
- Respect different viewpoints and experiences
- Focus on what's best for the community
- Show empathy towards others

### Be Collaborative

- Ask questions if something is unclear
- Provide constructive feedback
- Help others learn and grow
- Share knowledge and best practices

## Getting Help

- Check existing issues and documentation first
- Ask questions in GitHub Discussions
- Join our community chat (if available)
- Contact maintainers for sensitive issues

## Recognition

Contributors will be recognized in:

- CHANGELOG.md for significant contributions
- README.md contributors section
- Release notes for major features

Thank you for contributing to @zairakai/helpers! 🚀
