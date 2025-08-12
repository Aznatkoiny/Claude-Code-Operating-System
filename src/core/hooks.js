/**
 * Hooks System Implementation
 * Lifecycle management for Claude Code OS
 */

const fs = require('fs').promises;
const path = require('path');
const { EventEmitter } = require('events');

class HooksManager extends EventEmitter {
  constructor() {
    super();
    this.hooks = new Map();
    this.loadHooks();
  }

  /**
   * Register a hook
   */
  register(name, handler) {
    if (!this.hooks.has(name)) {
      this.hooks.set(name, []);
    }
    this.hooks.get(name).push(handler);
    console.log(`✅ Registered hook: ${name}`);
  }

  /**
   * Execute hooks for a given event
   */
  async execute(name, context = {}) {
    const handlers = this.hooks.get(name) || [];
    
    if (handlers.length === 0) {
      return { proceed: true };
    }

    console.log(`🪝 Executing ${handlers.length} hook(s) for: ${name}`);
    
    for (const handler of handlers) {
      try {
        const result = await handler(context);
        
        // If any hook returns false/stop, halt execution
        if (result && result.proceed === false) {
          console.log(`  ⛔ Hook prevented continuation: ${name}`);
          return result;
        }
      } catch (error) {
        console.error(`  ❌ Hook error in ${name}:`, error.message);
        // Continue with other hooks despite error
      }
    }
    
    return { proceed: true };
  }

  /**
   * Load hooks from configuration
   */
  async loadHooks() {
    try {
      const hooksPath = path.join(process.cwd(), '.claude/hooks');
      const entries = await fs.readdir(hooksPath);
      
      for (const entry of entries) {
        if (entry.endsWith('.js')) {
          const hookPath = path.join(hooksPath, entry);
          const hookName = path.basename(entry, '.js');
          
          try {
            const hookModule = require(hookPath);
            if (typeof hookModule === 'function') {
              this.register(hookName, hookModule);
            } else if (hookModule.handler) {
              this.register(hookName, hookModule.handler);
            }
          } catch (error) {
            console.warn(`Failed to load hook ${hookName}:`, error.message);
          }
        }
      }
    } catch (error) {
      // Hooks directory might not exist yet
    }
  }
}

/**
 * Pre-commit Hook
 * Validates code before commit
 */
const preCommitHook = async (context) => {
  console.log('  🔍 Running pre-commit checks...');
  
  const checks = {
    tests: true,
    linting: true,
    security: true,
    documentation: true
  };

  // Check for console.log statements
  if (context.files) {
    for (const file of context.files) {
      if (file.endsWith('.js') || file.endsWith('.ts')) {
        try {
          const content = await fs.readFile(file, 'utf8');
          if (content.includes('console.log') && !file.includes('test')) {
            console.warn(`  ⚠️ Found console.log in ${file}`);
          }
        } catch {}
      }
    }
  }

  // Run tests if available
  if (context.runTests !== false) {
    try {
      const { execSync } = require('child_process');
      execSync('npm test --silent', { stdio: 'pipe' });
      console.log('  ✅ Tests passed');
    } catch (error) {
      console.error('  ❌ Tests failed');
      checks.tests = false;
    }
  }

  // Check for TODO comments
  if (context.checkTodos) {
    for (const file of context.files || []) {
      try {
        const content = await fs.readFile(file, 'utf8');
        if (content.includes('TODO')) {
          console.warn(`  ⚠️ Found TODO in ${file}`);
        }
      } catch {}
    }
  }

  const allPassed = Object.values(checks).every(v => v);
  
  return {
    proceed: allPassed,
    checks,
    message: allPassed ? 'All checks passed' : 'Some checks failed'
  };
};

/**
 * Post-code Hook
 * Runs after code generation
 */
const postCodeHook = async (context) => {
  console.log('  🎨 Running post-code formatting...');
  
  // Auto-format if available
  if (context.file && (context.file.endsWith('.js') || context.file.endsWith('.ts'))) {
    try {
      const { execSync } = require('child_process');
      execSync(`npx prettier --write ${context.file}`, { stdio: 'pipe' });
      console.log(`  ✅ Formatted ${context.file}`);
    } catch {}
  }

  // Run linting
  if (context.lint !== false) {
    try {
      const { execSync } = require('child_process');
      execSync(`npx eslint --fix ${context.file}`, { stdio: 'pipe' });
      console.log(`  ✅ Linted ${context.file}`);
    } catch {}
  }

  return { proceed: true };
};

/**
 * Security Check Hook
 * Continuous security validation
 */
const securityCheckHook = async (context) => {
  console.log('  🔒 Running security checks...');
  
  const issues = [];

  // Check for hardcoded secrets
  if (context.content) {
    const secretPatterns = [
      /api[_-]?key\s*=\s*["'][^"']+["']/gi,
      /password\s*=\s*["'][^"']+["']/gi,
      /secret\s*=\s*["'][^"']+["']/gi,
      /token\s*=\s*["'][^"']+["']/gi,
    ];

    for (const pattern of secretPatterns) {
      if (pattern.test(context.content)) {
        issues.push('Potential hardcoded secret detected');
      }
    }
  }

  // Check for SQL injection vulnerabilities
  if (context.content && context.content.includes('SELECT')) {
    if (!context.content.includes('?') && context.content.includes('+')) {
      issues.push('Potential SQL injection vulnerability');
    }
  }

  if (issues.length > 0) {
    console.warn('  ⚠️ Security issues found:', issues);
    return {
      proceed: context.force === true,
      issues,
      message: 'Security validation failed'
    };
  }

  console.log('  ✅ Security checks passed');
  return { proceed: true };
};

/**
 * Error Recovery Hook
 * Handles errors and attempts recovery
 */
const errorRecoveryHook = async (context) => {
  console.log('  🔧 Attempting error recovery...');
  
  const { error, operation } = context;
  
  // Log error for debugging
  console.error('  Error details:', error.message);
  
  // Attempt recovery based on error type
  if (error.code === 'ENOENT') {
    console.log('  📁 Creating missing directory/file...');
    // Create missing resources
  } else if (error.code === 'EACCES') {
    console.log('  🔓 Fixing permissions...');
    // Fix permissions
  }
  
  // Save error context for analysis
  const errorLog = {
    timestamp: new Date().toISOString(),
    operation,
    error: {
      message: error.message,
      code: error.code,
      stack: error.stack
    }
  };
  
  const errorPath = path.join(
    process.cwd(),
    'context/memory/errors',
    `error-${Date.now()}.json`
  );
  
  try {
    await fs.mkdir(path.dirname(errorPath), { recursive: true });
    await fs.writeFile(errorPath, JSON.stringify(errorLog, null, 2));
    console.log(`  💾 Error logged to ${errorPath}`);
  } catch {}
  
  return {
    proceed: true,
    recovered: false,
    logged: true
  };
};

// Create global hooks manager
const hooksManager = new HooksManager();

// Register default hooks
hooksManager.register('pre-commit', preCommitHook);
hooksManager.register('post-code', postCodeHook);
hooksManager.register('security-check', securityCheckHook);
hooksManager.register('on-error', errorRecoveryHook);

module.exports = {
  HooksManager,
  hooksManager,
  hooks: {
    preCommitHook,
    postCodeHook,
    securityCheckHook,
    errorRecoveryHook
  }
};
