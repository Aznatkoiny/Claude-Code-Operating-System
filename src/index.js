/**
 * Claude Code Operating System v4.1
 * Enhanced with Context Engineering Principles
 * 
 * Main Entry Point
 */

const { ProtocolShell, ProtocolRegistry } = require('./core/protocol-shell');
const { registerCognitiveTools } = require('./core/cognitive-tools');
const { HooksManager, hooksManager } = require('./core/hooks');
const path = require('path');
const fs = require('fs');

class ClaudeCodeOS {
  constructor() {
    this.version = '4.1.0';
    this.initialized = false;
    this.protocolRegistry = new ProtocolRegistry();
    this.hooksManager = hooksManager;
    this.context = {};
    
    this.initialize();
  }

  /**
   * Initialize the OS
   */
  async initialize() {
    console.log(`
╔════════════════════════════════════════════════════════╗
║     Claude Code Operating System v${this.version}              ║
║     Enhanced with Context Engineering                  ║
╚════════════════════════════════════════════════════════╝
    `);

    // Register cognitive tools
    registerCognitiveTools(this.protocolRegistry);
    console.log('🧠 Cognitive tools registered');

    // Load context if available
    await this.loadContext();

    // Load custom protocols
    await this.loadCustomProtocols();

    // Set up global access
    global.ccOS = this;
    global.protocolRegistry = this.protocolRegistry;
    
    this.initialized = true;
    console.log('✅ System initialized\n');
    
    // Show available protocols
    this.showAvailableProtocols();
  }

  /**
   * Load saved context
   */
  async loadContext() {
    try {
      const contextPath = path.join(
        process.cwd(),
        'context/memory/current-context.json'
      );
      const contextData = await fs.promises.readFile(contextPath, 'utf8');
      this.context = JSON.parse(contextData);
      console.log('📋 Context loaded from previous session');
    } catch {
      console.log('📋 No previous context found');
    }
  }

  /**
   * Load custom protocols from project
   */
  async loadCustomProtocols() {
    try {
      const protocolsPath = path.join(process.cwd(), '.claude/protocols');
      const entries = await fs.promises.readdir(protocolsPath);
      
      for (const entry of entries) {
        if (entry.endsWith('.js')) {
          const protocolPath = path.join(protocolsPath, entry);
          try {
            const protocol = require(protocolPath);
            if (protocol.protocol) {
              this.protocolRegistry.register(protocol.protocol, protocol);
              console.log(`  📦 Loaded custom protocol: ${protocol.protocol}`);
            }
          } catch (error) {
            console.warn(`  ⚠️ Failed to load protocol ${entry}:`, error.message);
          }
        }
      }
    } catch {
      // Custom protocols directory might not exist
    }
  }

  /**
   * Show available protocols
   */
  showAvailableProtocols() {
    const protocols = this.protocolRegistry.list();
    console.log('📚 Available Protocols:');
    console.log('======================');
    
    // Group by category
    const categories = {};
    protocols.forEach(protocol => {
      const category = protocol.split('.')[0];
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(protocol);
    });

    for (const [category, items] of Object.entries(categories)) {
      console.log(`\n${category.toUpperCase()}:`);
      items.forEach(item => {
        console.log(`  • ${item}`);
      });
    }
    console.log('');
  }

  /**
   * Execute a protocol
   */
  async execute(protocolName, input = {}) {
    // Execute pre-hook
    const preHookResult = await this.hooksManager.execute('pre-protocol', {
      protocol: protocolName,
      input
    });

    if (!preHookResult.proceed) {
      console.log('Protocol execution prevented by pre-hook');
      return preHookResult;
    }

    try {
      // Execute the protocol
      const result = await this.protocolRegistry.execute(protocolName, input);
      
      // Execute post-hook
      await this.hooksManager.execute('post-protocol', {
        protocol: protocolName,
        input,
        result
      });

      return result;
    } catch (error) {
      // Execute error hook
      await this.hooksManager.execute('on-error', {
        error,
        operation: `protocol:${protocolName}`
      });
      
      throw error;
    }
  }

  /**
   * Interactive command handler
   */
  async handleCommand(command, args = {}) {
    const commands = {
      '/init-os': async () => {
        const initOS = require('./commands/init-os');
        await initOS();
      },
      '/context-prime': async () => {
        const ContextPrimer = require('./commands/context-prime');
        const primer = new ContextPrimer();
        await primer.prime(args);
      },
      '/self-reflect': async () => {
        return this.execute('self.reflect', args);
      },
      '/code-analyze': async () => {
        return this.execute('code.analyze', args);
      },
      '/think': async () => {
        return this.execute('thinking.extended', { ...args, level: 'basic' });
      },
      '/think-harder': async () => {
        return this.execute('thinking.extended', { ...args, level: 'deep' });
      },
      '/ultrathink': async () => {
        return this.execute('thinking.extended', { ...args, level: 'ultra' });
      },
      '/help': () => {
        this.showHelp();
      }
    };

    const handler = commands[command];
    if (handler) {
      return await handler();
    } else {
      console.log(`Unknown command: ${command}`);
      console.log('Type /help for available commands');
    }
  }

  /**
   * Show help information
   */
  showHelp() {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                  ║
╚════════════════════════════════════════════════════════╝

SYSTEM COMMANDS:
  /init-os              Initialize Claude Code OS
  /context-prime        Load comprehensive project context
  /help                 Show this help message

COGNITIVE TOOLS:
  /self-reflect         Reflect on and improve outputs
  /code-analyze         Analyze code structure and quality
  /think                Standard thinking (1x)
  /think-harder         Deep thinking (2x)
  /ultrathink           Maximum depth analysis (5x)

PROTOCOLS:
  Execute any registered protocol with:
  ccOS.execute('protocol.name', { input })

EXAMPLES:
  ccOS.execute('reasoning.systematic', { problem: 'How to optimize this?' })
  ccOS.execute('self.identify_gaps', { context: 'Current task' })
  ccOS.execute('code.analyze', { code: 'function example() {}' })

For more information, see CLAUDE.md
    `);
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      version: this.version,
      initialized: this.initialized,
      protocols: this.protocolRegistry.list().length,
      hooks: Array.from(this.hooksManager.hooks.keys()),
      context: Object.keys(this.context),
      uptime: process.uptime()
    };
  }
}

// Create and export singleton instance
const ccOS = new ClaudeCodeOS();

// Export for use
module.exports = {
  ClaudeCodeOS,
  ccOS,
  protocolRegistry: ccOS.protocolRegistry,
  hooksManager: ccOS.hooksManager,
  ProtocolShell,
  
  // Convenience methods
  execute: (protocol, input) => ccOS.execute(protocol, input),
  handleCommand: (command, args) => ccOS.handleCommand(command, args),
  getStatus: () => ccOS.getStatus()
};

// Make available globally
if (typeof global !== 'undefined') {
  global.ccOS = ccOS;
}
