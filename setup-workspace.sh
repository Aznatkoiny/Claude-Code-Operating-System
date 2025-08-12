#!/bin/bash

# Claude Code Workspace Setup Script
# Creates an isolated workspace for safe Claude Code operations

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
WORKSPACE_NAME="${1:-claude-workspace}"
WORKSPACE_PATH="${HOME}/${WORKSPACE_NAME}"

echo -e "${GREEN}🚀 Claude Code Workspace Setup${NC}"
echo "================================="

# Check if workspace already exists
if [ -d "$WORKSPACE_PATH" ]; then
    echo -e "${YELLOW}⚠️  Workspace already exists at: $WORKSPACE_PATH${NC}"
    read -p "Do you want to recreate it? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Backing up existing workspace..."
        mv "$WORKSPACE_PATH" "${WORKSPACE_PATH}.backup.$(date +%Y%m%d_%H%M%S)"
    else
        echo "Using existing workspace..."
        cd "$WORKSPACE_PATH"
        exit 0
    fi
fi

# Create workspace directory
echo "Creating workspace at: $WORKSPACE_PATH"
mkdir -p "$WORKSPACE_PATH"
cd "$WORKSPACE_PATH"

# Set up directory structure
echo "Setting up directory structure..."
mkdir -p {src,tests,docs,scripts,config,data,.claude/commands,.claude/hooks,.claude/agents}

# Create initial CLAUDE.md
echo "Creating CLAUDE.md..."
cat > CLAUDE.md << 'EOF'
# Workspace CLAUDE.md

inherit: ~/Claude-Code-Operating-System/CLAUDE.md

## Workspace Information
- **Path**: This is an isolated workspace
- **Purpose**: Safe environment for Claude Code operations
- **Created**: $(date)

## Safety Rules
- All operations are confined to this workspace
- No access to parent directories without explicit permission
- Review all file operations before execution

## Project-Specific Rules
<!-- Add your project-specific rules here -->
EOF

# Create .gitignore
echo "Creating .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
venv/
__pycache__/
*.pyc

# Environment
.env
.env.local
CLAUDE.local.md

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build
dist/
build/
*.egg-info/

# Logs
*.log
logs/

# Testing
coverage/
.coverage
htmlcov/
.pytest_cache/

# OS
.DS_Store
Thumbs.db

# Claude Code
.claude/cache/
.claude/memory/
.claude/sessions/
EOF

# Create environment file template
echo "Creating .env.template..."
cat > .env.template << 'EOF'
# Copy this to .env and fill in your values
# NEVER commit .env file

# API Keys
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GITHUB_TOKEN=

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db
REDIS_URL=redis://localhost:6379

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1

# Other Services
STRIPE_SECRET_KEY=
SENDGRID_API_KEY=
SENTRY_DSN=
EOF

# Create package.json for Node projects
echo "Creating package.json..."
cat > package.json << 'EOF'
{
  "name": "claude-workspace",
  "version": "1.0.0",
  "description": "Claude Code isolated workspace",
  "scripts": {
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write .",
    "validate": "npm run lint && npm run test"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "prettier": "^3.0.0"
  }
}
EOF

# Create Python requirements file
echo "Creating requirements.txt..."
cat > requirements.txt << 'EOF'
# Testing
pytest>=7.0.0
pytest-asyncio>=0.21.0
pytest-cov>=4.0.0

# Linting
black>=23.0.0
ruff>=0.1.0
mypy>=1.0.0

# Security
bandit>=1.7.0
safety>=2.3.0
EOF

# Create initialization script
echo "Creating init.sh..."
cat > scripts/init.sh << 'EOF'
#!/bin/bash
# Workspace initialization script

echo "Initializing workspace..."

# Check for Node.js
if command -v node &> /dev/null; then
    echo "Installing Node dependencies..."
    npm install
fi

# Check for Python
if command -v python3 &> /dev/null; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
fi

# Initialize git
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial workspace setup"
fi

echo "Workspace initialized successfully!"
EOF
chmod +x scripts/init.sh

# Create ccusage tool
echo "Creating ccusage tool..."
cat > scripts/ccusage << 'EOF'
#!/usr/bin/env python3
"""
Claude Code Usage Tracker
Monitors token usage and costs
"""

import json
import os
from datetime import datetime
from pathlib import Path

USAGE_FILE = Path.home() / ".claude" / "usage.json"

def load_usage():
    if USAGE_FILE.exists():
        with open(USAGE_FILE) as f:
            return json.load(f)
    return {"sessions": []}

def display_usage():
    usage = load_usage()
    
    if not usage["sessions"]:
        print("No usage data available")
        return
    
    total_input = 0
    total_output = 0
    
    print("\n📊 Claude Code Usage Report")
    print("=" * 50)
    
    for session in usage["sessions"][-10:]:  # Last 10 sessions
        input_tokens = session.get("input_tokens", 0)
        output_tokens = session.get("output_tokens", 0)
        total_input += input_tokens
        total_output += output_tokens
        
        print(f"\nSession: {session.get('timestamp', 'Unknown')}")
        print(f"  Input tokens:  {input_tokens:,}")
        print(f"  Output tokens: {output_tokens:,}")
        print(f"  Model: {session.get('model', 'Unknown')}")
    
    print("\n" + "=" * 50)
    print(f"Total Input Tokens:  {total_input:,}")
    print(f"Total Output Tokens: {total_output:,}")
    print(f"Total Tokens:        {total_input + total_output:,}")
    
    # Rough cost estimate (adjust rates as needed)
    input_cost = total_input * 0.003 / 1000  # $3 per 1M tokens
    output_cost = total_output * 0.015 / 1000  # $15 per 1M tokens
    total_cost = input_cost + output_cost
    
    print(f"\n💰 Estimated Cost: ${total_cost:.2f}")
    print("=" * 50)

if __name__ == "__main__":
    display_usage()
EOF
chmod +x scripts/ccusage

# Create workspace environment variables
echo "Setting up environment variables..."
cat > scripts/setup-env.sh << EOF
#!/bin/bash
# Source this file to set up workspace environment

export CLAUDE_WORKSPACE="$WORKSPACE_PATH"
export PATH="\$CLAUDE_WORKSPACE/scripts:\$PATH"
export PYTHONPATH="\$CLAUDE_WORKSPACE/src:\$PYTHONPATH"

# Aliases for convenience
alias claude-test="npm test && pytest"
alias claude-lint="npm run lint && ruff check ."
alias claude-clean="rm -rf node_modules venv __pycache__ .pytest_cache coverage"

echo "Claude workspace environment loaded!"
echo "Workspace: \$CLAUDE_WORKSPACE"
EOF
chmod +x scripts/setup-env.sh

# Create README
echo "Creating README.md..."
cat > README.md << 'EOF'
# Claude Code Workspace

This is an isolated workspace for Claude Code operations.

## Setup

1. Initialize the workspace:
   ```bash
   ./scripts/init.sh
   ```

2. Set up environment:
   ```bash
   source scripts/setup-env.sh
   ```

3. Copy `.env.template` to `.env` and fill in your values:
   ```bash
   cp .env.template .env
   ```

4. Start Claude Code:
   ```bash
   claude
   ```

## Directory Structure

- `src/` - Source code
- `tests/` - Test files
- `docs/` - Documentation
- `scripts/` - Utility scripts
- `config/` - Configuration files
- `data/` - Data files
- `.claude/` - Claude Code specific files

## Safety

This workspace is isolated from your main system. Claude Code operations are confined to this directory.

## Commands

- `ccusage` - View token usage and costs
- `claude-test` - Run all tests
- `claude-lint` - Run all linters
- `claude-clean` - Clean build artifacts
EOF

# Final setup
echo -e "\n${GREEN}✅ Workspace setup complete!${NC}"
echo -e "\nNext steps:"
echo -e "  1. ${YELLOW}cd $WORKSPACE_PATH${NC}"
echo -e "  2. ${YELLOW}./scripts/init.sh${NC} - Initialize dependencies"
echo -e "  3. ${YELLOW}source scripts/setup-env.sh${NC} - Set up environment"
echo -e "  4. ${YELLOW}cp .env.template .env${NC} - Configure environment variables"
echo -e "  5. ${YELLOW}claude${NC} - Start Claude Code"
echo -e "\n${GREEN}Happy coding with Claude! 🎉${NC}"
