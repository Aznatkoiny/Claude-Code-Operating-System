#!/bin/bash

# Setup script for GitHub repository
# Run this after creating your GitHub repository

echo "🚀 Claude Code OS - GitHub Setup"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "📁 Initializing git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Use the GitHub-optimized README
if [ -f README-GITHUB.md ]; then
    echo "📝 Setting up GitHub README..."
    mv README.md README-ORIGINAL.md 2>/dev/null
    cp README-GITHUB.md README.md
    echo "✅ GitHub README configured"
fi

# Add all files
echo "📦 Adding files to git..."
git add .
echo "✅ Files added"

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "🎉 Initial commit: Claude Code OS - Context Engineering Operating System

- Complete context engineering system for Claude Code
- Prevents spaghetti code through persistent memory
- Includes subagents, commands, patterns, and hooks
- Comprehensive documentation and examples"
echo "✅ Initial commit created"

# Instructions for GitHub
echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Add the remote origin:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/claude-code-os.git"
echo ""
echo "3. Push to GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Optional: Add topics to your repository:"
echo "   - claude-code"
echo "   - context-engineering"
echo "   - ai-development"
echo "   - llm-tools"
echo "   - developer-tools"
echo ""
echo "5. Optional: Enable GitHub Pages for documentation:"
echo "   Settings → Pages → Source: Deploy from branch (main, /docs)"
echo ""
echo "6. Share with the community! 🎉"
echo "   - Star the repository"
echo "   - Share on social media"
echo "   - Contribute improvements"
echo ""
echo "✨ Your Claude Code OS is ready for GitHub!"
