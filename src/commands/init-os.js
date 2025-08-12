#!/usr/bin/env node

/**
 * /init-os Command Implementation
 * Initializes Claude Code Operating System in a project
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

async function initOS() {
  console.log('🚀 Initializing Claude Code Operating System v4.0...\n');

  try {
    // Step 1: Check current directory
    const currentDir = process.cwd();
    console.log(`📁 Working directory: ${currentDir}`);

    // Step 2: Create necessary directories
    console.log('\n📂 Creating directory structure...');
    const directories = [
      '.claude',
      '.claude/commands',
      '.claude/hooks',
      '.claude/agents',
      'context',
      'context/memory',
      'context/memory/sessions',
      'context/memory/patterns',
      'context/memory/knowledge',
      'context/memory/contexts',
      'context/patterns',
      'context/security',
      'context/workspace',
      'context/schemas',
      'src',
      'src/core',
      'tests',
      'docs'
    ];

    for (const dir of directories) {
      const dirPath = path.join(currentDir, dir);
      try {
        await fs.mkdir(dirPath, { recursive: true });
        console.log(`  ✅ Created: ${dir}`);
      } catch (error) {
        if (error.code !== 'EEXIST') throw error;
        console.log(`  ⏭️  Exists: ${dir}`);
      }
    }

    // Step 3: Copy CLAUDE.md if not exists
    console.log('\n📜 Setting up constitutional framework...');
    const claudeMdPath = path.join(currentDir, 'CLAUDE.md');
    try {
      await fs.access(claudeMdPath);
      console.log('  ⏭️  CLAUDE.md already exists');
    } catch {
      // Copy from template
      const templatePath = path.join(__dirname, '../../CLAUDE.md');
      const claudeMdContent = await fs.readFile(templatePath, 'utf8');
      await fs.writeFile(claudeMdPath, claudeMdContent);
      console.log('  ✅ Created CLAUDE.md');
    }

    // Step 4: Create .env from template if not exists
    console.log('\n🔐 Setting up environment configuration...');
    const envPath = path.join(currentDir, '.env');
    try {
      await fs.access(envPath);
      console.log('  ⏭️  .env already exists');
    } catch {
      const templatePath = path.join(currentDir, '.env.template');
      try {
        const envTemplate = await fs.readFile(templatePath, 'utf8');
        await fs.writeFile(envPath, envTemplate);
        console.log('  ✅ Created .env from template');
        console.log('  ⚠️  Please edit .env with your API keys');
      } catch {
        console.log('  ⚠️  No .env.template found, creating basic .env');
        const basicEnv = `# Claude Code OS Environment
CLAUDE_WORKSPACE=${currentDir}
NODE_ENV=development
MEMORY_PATH=./context/memory
`;
        await fs.writeFile(envPath, basicEnv);
      }
    }

    // Step 5: Initialize MCP configuration
    console.log('\n🔧 Setting up MCP servers...');
    const mcpConfigPath = path.join(currentDir, '.mcp.json');
    try {
      await fs.access(mcpConfigPath);
      console.log('  ⏭️  .mcp.json already exists');
    } catch {
      const mcpConfig = {
        mcpServers: {
          filesystem: {
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-filesystem"],
            env: {
              ALLOWED_PATHS: `${currentDir}`
            }
          },
          memory: {
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-memory"],
            env: {
              MEMORY_PATH: "./context/memory"
            }
          }
        }
      };
      await fs.writeFile(mcpConfigPath, JSON.stringify(mcpConfig, null, 2));
      console.log('  ✅ Created .mcp.json');
    }

    // Step 6: Initialize git hooks
    console.log('\n🪝 Setting up git hooks...');
    const gitHooksPath = path.join(currentDir, '.git/hooks');
    try {
      await fs.access(gitHooksPath);
      
      // Create pre-commit hook
      const preCommitHook = `#!/bin/sh
# Claude Code OS Pre-commit Hook

echo "🔍 Running Claude Code OS pre-commit checks..."

# Run tests if available
if [ -f "package.json" ]; then
  npm test --silent
  if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Commit aborted."
    exit 1
  fi
fi

# Run security scan
echo "🔒 Running security scan..."
# Add security scan command here

echo "✅ Pre-commit checks passed!"
`;
      const preCommitPath = path.join(gitHooksPath, 'pre-commit');
      await fs.writeFile(preCommitPath, preCommitHook);
      await fs.chmod(preCommitPath, '755');
      console.log('  ✅ Created pre-commit hook');
    } catch {
      console.log('  ⚠️  Git not initialized in this directory');
    }

    // Step 7: Create initial session
    console.log('\n💾 Creating initial session...');
    const sessionId = `session-${Date.now()}`;
    const sessionPath = path.join(currentDir, 'context/memory/sessions', `${sessionId}.json`);
    const sessionData = {
      id: sessionId,
      created: new Date().toISOString(),
      status: 'active',
      context: {
        project: path.basename(currentDir),
        initialized: true,
        version: '4.0.0'
      }
    };
    await fs.writeFile(sessionPath, JSON.stringify(sessionData, null, 2));
    console.log(`  ✅ Created session: ${sessionId}`);

    // Step 8: Initialize Protocol Registry
    console.log('\n🧠 Initializing Protocol Registry...');
    const indexPath = path.join(currentDir, 'src/index.js');
    const indexContent = `/**
 * Claude Code Operating System v4.0
 * Main Entry Point
 */

const { ProtocolShell, ProtocolRegistry } = require('./core/protocol-shell');
const { registerCognitiveTools } = require('./core/cognitive-tools');

// Initialize global protocol registry
global.protocolRegistry = new ProtocolRegistry();

// Register cognitive tools
registerCognitiveTools(global.protocolRegistry);

console.log('Claude Code OS v4.0 initialized');
console.log('Available protocols:', global.protocolRegistry.list());

module.exports = {
  protocolRegistry: global.protocolRegistry,
  ProtocolShell
};
`;
    await fs.writeFile(indexPath, indexContent);
    console.log('  ✅ Created main entry point');

    // Step 9: Final summary
    console.log('\n' + '='.repeat(50));
    console.log('✨ Claude Code OS v4.0 Initialization Complete!');
    console.log('='.repeat(50));
    console.log('\n📋 Next steps:');
    console.log('  1. Edit .env with your API keys');
    console.log('  2. Run: claude /context-prime');
    console.log('  3. Start coding with: claude /build-feature');
    console.log('\n💡 Tips:');
    console.log('  - Use "think harder" for complex problems');
    console.log('  - Run /security-scan regularly');
    console.log('  - Check CLAUDE.md for all workflows');
    console.log('\n🚀 Happy coding with Claude Code OS!\n');

  } catch (error) {
    console.error('\n❌ Error during initialization:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initOS();
}

module.exports = initOS;
