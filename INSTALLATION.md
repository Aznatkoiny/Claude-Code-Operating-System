# Installation Guide

## Prerequisites

- [Claude Code](https://claude.ai/code) installed and authenticated
- Git (for version control)
- Node.js 18+ (for npm packages and hooks)
- Bash shell (for hook scripts)

## 🚀 Quick Install

### Option 1: Direct Clone (Recommended)

```bash
# Clone the repository to your home directory
cd ~
git clone https://github.com/[username]/claude-code-os.git .claude-os

# Link configuration to Claude Code
ln -s ~/.claude-os/.claude ~/.claude

# Make hooks executable
chmod +x ~/.claude/hooks/*.sh

# Start Claude Code
claude

# Initialize the OS
/init-os
```

### Option 2: Manual Installation

1. **Download the repository**
   ```bash
   wget https://github.com/[username]/claude-code-os/archive/main.zip
   unzip main.zip
   ```

2. **Copy files to Claude configuration directory**
   ```bash
   cp -r claude-code-os/.claude/* ~/.claude/
   cp claude-code-os/CLAUDE.md ~/.claude/
   ```

3. **Set up permissions**
   ```bash
   chmod +x ~/.claude/hooks/*.sh
   ```

4. **Initialize**
   ```bash
   claude
   /init-os
   ```

## 📦 Project-Specific Installation

For using Claude Code OS in a specific project:

```bash
# Navigate to your project
cd /path/to/your/project

# Copy configuration
cp -r ~/claude-code-os/.claude .
cp ~/claude-code-os/CLAUDE.md .

# Initialize for your project
claude
/init-os webapp react typescript
```

## 🔧 Configuration

### 1. Update Settings

Edit `.claude/settings.json` to customize:

```json
{
  "contextEngineering": {
    "maxTokensPerContext": 50000,  // Adjust based on your needs
    "compressionThreshold": 40000,
    "memoryRetention": "persistent"
  }
}
```

### 2. Configure MCP Servers

If you have MCP servers installed:

```bash
# Add Context7 for documentation
claude mcp add context7 -- [context7-command]

# Add Sequential for complex thinking
claude mcp add sequential -- [sequential-command]

# Add GitHub integration
claude mcp add github -- [github-command]
```

### 3. Customize Subagents

Edit agents in `.claude/agents/` for your tech stack:
- Add framework-specific agents
- Customize tools and permissions
- Update patterns for your conventions

## 🧪 Verify Installation

### Test Basic Commands

```bash
# Start Claude Code
claude

# Test OS initialization
/init-os --dry-run

# Test project scanning
/scan-project . --depth shallow

# Test help system
/help
```

### Check Components

```bash
# Verify subagents
ls ~/.claude/agents/

# Verify commands
ls ~/.claude/commands/

# Verify hooks
ls ~/.claude/hooks/

# Test hook execution
~/.claude/hooks/pre-write-validation.sh
```

## 🐧 Linux/WSL Setup

### Additional Steps for WSL

```bash
# Install dependencies
sudo apt update
sudo apt install -y nodejs npm jq

# Fix line endings if needed
dos2unix ~/.claude/hooks/*.sh

# Ensure proper permissions
find ~/.claude -type f -name "*.sh" -exec chmod +x {} \;
```

## 🍎 macOS Setup

### Additional Steps for macOS

```bash
# Install dependencies via Homebrew
brew install node jq

# Fix permissions
xattr -r -d com.apple.quarantine ~/.claude/

# Make scripts executable
find ~/.claude -type f -name "*.sh" -exec chmod +x {} \;
```

## 🪟 Windows Setup

### Using WSL (Recommended)

1. Install WSL2
2. Follow Linux setup instructions

### Native Windows (Experimental)

1. Use Git Bash or PowerShell
2. Adapt bash scripts to PowerShell
3. Update paths in settings.json

## 🔌 IDE Integration

### VS Code

Add to `.vscode/settings.json`:

```json
{
  "files.associations": {
    "*.claude": "markdown",
    "CLAUDE.md": "markdown"
  },
  "files.exclude": {
    ".claude/cache": true,
    "context/memory/cache": true
  }
}
```

### JetBrains IDEs

1. Mark `.claude` as resource root
2. Exclude cache directories
3. Enable Markdown support

## 🚨 Troubleshooting

### Common Issues

**Issue**: Commands not found
```bash
# Solution: Ensure Claude Code sees the commands
ls ~/.claude/commands/
# Restart Claude Code
```

**Issue**: Hooks not executing
```bash
# Solution: Check permissions
chmod +x ~/.claude/hooks/*.sh
# Check settings.json for hook configuration
```

**Issue**: Memory not persisting
```bash
# Solution: Check directory permissions
chmod 755 ~/.claude/context/memory
# Verify settings.json has memoryRetention: "persistent"
```

**Issue**: Subagents not activating
```bash
# Solution: Check agent descriptions include trigger words
# Ensure "Use PROACTIVELY" is in description
```

## 📊 Performance Optimization

### For Large Projects

```bash
# Increase token allocation
# Edit .claude/settings.json
"maxTokensPerContext": 100000

# Enable aggressive caching
"caching": true,
"cacheTTL": 7200

# Use compression
"compressionEnabled": true
```

### For Limited Resources

```bash
# Reduce token usage
"maxTokensPerContext": 30000

# Limit parallel agents
"maxConcurrentAgents": 1

# Disable non-essential features
"patternRecognition": false
```

## 🔄 Updating

### Get Latest Version

```bash
cd ~/claude-code-os
git pull origin main

# Relink if needed
ln -sf ~/.claude-os/.claude ~/.claude

# Restart Claude Code
claude
```

### Preserve Custom Settings

```bash
# Backup your customizations
cp ~/.claude/settings.json ~/.claude/settings.backup.json

# Update
git pull

# Merge your customizations back
# Manual merge recommended
```

## ✅ Post-Installation

### Recommended First Steps

1. **Initialize your project**
   ```
   /init-os [project-type] [framework]
   ```

2. **Scan existing code**
   ```
   /scan-project .
   ```

3. **Configure for your workflow**
   - Edit `.claude/settings.json`
   - Customize subagents
   - Add project-specific patterns

4. **Test with a simple feature**
   ```
   /build-feature test-feature --type component
   ```

## 🆘 Getting Help

- Check [Documentation](docs/)
- Open an [Issue](https://github.com/[username]/claude-code-os/issues)
- Read [Contributing Guide](CONTRIBUTING.md)

## 🎉 Success!

You're now ready to use Claude Code OS for context-aware, spaghetti-free development!

```
claude
/init-os
# Start building with persistent context!
```
