#!/bin/bash
# Install script for Git hooks in @zairakai/helpers
# Run this script to set up Git hooks for the project

set -e

echo "🔧 Installing Git hooks for @zairakai/helpers..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Not in a Git repository${NC}"
    exit 1
fi

# Create .git/hooks directory if it doesn't exist
mkdir -p .git/hooks

# List of hooks to install
HOOKS=("pre-commit" "commit-msg" "pre-push")

# Install each hook
for hook in "${HOOKS[@]}"; do
    if [ -f ".githooks/$hook" ]; then
        echo -e "${BLUE}📝 Installing $hook hook...${NC}"
        cp ".githooks/$hook" ".git/hooks/$hook"
        chmod +x ".git/hooks/$hook"
        echo -e "${GREEN}✅ $hook hook installed${NC}"
    else
        echo -e "${YELLOW}⚠️  Warning: .githooks/$hook not found${NC}"
    fi
done

# Set git config to use the hooks directory
git config core.hooksPath .git/hooks

echo -e "${GREEN}🎉 Git hooks installation complete!${NC}"
echo -e "${BLUE}ℹ️  The following hooks are now active:${NC}"
for hook in "${HOOKS[@]}"; do
    if [ -f ".git/hooks/$hook" ]; then
        echo -e "  ${GREEN}✓${NC} $hook"
    fi
done

echo ""
echo -e "${YELLOW}📋 What these hooks do:${NC}"
echo -e "${BLUE}  • pre-commit:${NC} Runs linting, type checking, tests, and formatting before each commit"
echo -e "${BLUE}  • commit-msg:${NC} Validates commit message follows conventional commits format"
echo -e "${BLUE}  • pre-push:${NC} Runs full test suite and build verification before pushing"

echo ""
echo -e "${GREEN}🚀 You're all set! Quality checks will now run automatically.${NC}"
