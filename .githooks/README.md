# Git Hooks for @zairakai/npm-vue-components

This directory contains Git hooks that automatically enforce code quality standards.

## Overview

The Git hooks system ensures that all code meets quality standards before being committed or pushed. This helps maintain consistency across the codebase and prevents issues from reaching the repository.

## Hooks

### 🔍 pre-commit

**Triggers:** Before each commit

**Checks:**

- Prettier formatting for staged files
- ESLint code quality
- TypeScript type checking
- Unit tests
- Build verification

**What it does:**

1. Checks if staged files are properly formatted
2. If not formatted, runs Prettier and asks to stage changes
3. Runs ESLint to catch code quality issues
4. Verifies TypeScript types are correct
5. Runs the test suite to ensure nothing is broken
6. Performs a build check to verify compilation

### 📝 commit-msg

**Triggers:** After commit message is written

**Checks:**

- Commit message follows [Conventional Commits](https://conventionalcommits.org/) format
- Message length is reasonable (warning if >72 chars)

**Valid formats:**

```
feat(scope): add new feature
fix: resolve bug in component
docs: update README
style: fix formatting
refactor(components): improve performance
test: add missing tests
chore: update dependencies
build: configure bundler
ci: update pipeline
perf: optimize rendering
revert: undo previous change
```

### 🚀 pre-push

**Triggers:** Before pushing to remote

**Checks:**

- Full test suite with coverage
- Production build verification
- Final linting check
- Final type checking
- Final formatting verification

**Purpose:** Last line of defense before code reaches the repository

## Installation

### Automatic (Recommended)

Hooks are automatically installed when you run:

```bash
yarn install
```

### Manual Installation

If you need to install hooks manually:

```bash
yarn hooks:install
# or directly
./.githooks/install.sh
```

### Uninstall Hooks

To remove all hooks:

```bash
yarn hooks:uninstall
```

## Bypassing Hooks

**⚠️ Warning:** Only bypass hooks in emergency situations

```bash
# Skip pre-commit hook
git commit --no-verify -m "emergency fix"

# Skip pre-push hook
git push --no-verify
```

## Customization

### Modifying Hooks

1. Edit the hook files in `.githooks/`
2. Run `yarn hooks:install` to update active hooks
3. Test with `git commit` or `git push`

### Adding New Hooks

1. Create new hook file in `.githooks/`
2. Make it executable: `chmod +x .githooks/your-hook`
3. Update `install.sh` to include your hook
4. Run installation script

## Troubleshooting

### Hook Failed to Run

```bash
# Check if hooks are installed
ls -la .git/hooks/

# Reinstall hooks
yarn hooks:install

# Check hook permissions
ls -la .githooks/
```

### Tests Failing in Hooks

```bash
# Run tests manually to debug
yarn test

# Check if dependencies are installed
yarn install

# Verify Node.js version
node --version
```

### Formatting Issues

```bash
# Fix formatting manually
yarn format

# Check what files need formatting
yarn check

# Stage formatted files
git add .
```

### Performance Issues

If hooks are too slow:

1. Consider running fewer checks in pre-commit
2. Move expensive operations to pre-push
3. Skip tests on pre-commit for faster commits

## Best Practices

1. **Keep commits small** - Hooks run faster on fewer files
2. **Run checks manually** - Use `yarn all` before committing
3. **Fix issues incrementally** - Don't accumulate formatting problems
4. **Test hooks locally** - Verify hooks work before pushing
5. **Update hooks regularly** - Keep pace with project changes

## Dependencies

Hooks require these tools to be available:

- Node.js 22+
- Yarn package manager
- Git
- All project dependencies (`yarn install`)

## Integration with CI/CD

These hooks complement but don't replace CI/CD pipelines:

- **Hooks:** Fast feedback during development
- **CI/CD:** Comprehensive checks on all environments
- **Together:** Maximum quality assurance

The CI/CD pipeline will run similar checks to ensure consistency across all contributions.
