/**
 * Protocol Shell Framework
 * Based on Context Engineering principles from davidkimai/Context-Engineering
 * 
 * This framework provides structured protocol execution for Claude Code OS
 */

class ProtocolShell {
  constructor(config) {
    this.protocol = config.protocol || 'unnamed';
    this.version = config.version || '1.0';
    this.intent = config.intent;
    this.input = config.input || {};
    this.process = config.process || [];
    this.output = config.output || {};
    this.validation = config.validation || {};
    this.rollback = config.rollback || null;
    this.metadata = {
      created: new Date().toISOString(),
      executed: null,
      status: 'initialized'
    };
  }

  /**
   * Validate input against schema
   */
  async validateInput() {
    for (const [key, validator] of Object.entries(this.validation.input || {})) {
      if (!validator(this.input[key])) {
        throw new Error(`Input validation failed for ${key}`);
      }
    }
    return true;
  }

  /**
   * Execute the protocol process
   */
  async execute() {
    try {
      this.metadata.status = 'executing';
      this.metadata.executed = new Date().toISOString();
      
      // Validate inputs
      await this.validateInput();
      
      // Execute process steps
      const results = {};
      for (const step of this.process) {
        const stepResult = await this.executeStep(step);
        results[step.name] = stepResult;
        
        // Check if step requires stopping
        if (stepResult.stop) {
          this.metadata.status = 'stopped';
          return { success: false, reason: stepResult.reason, results };
        }
      }
      
      // Validate output
      if (this.validation.output) {
        await this.validateOutput(results);
      }
      
      this.metadata.status = 'completed';
      return { success: true, results, metadata: this.metadata };
      
    } catch (error) {
      this.metadata.status = 'failed';
      
      // Execute rollback if available
      if (this.rollback) {
        await this.executeRollback(error);
      }
      
      throw error;
    }
  }

  /**
   * Execute a single process step
   */
  async executeStep(step) {
    if (typeof step === 'function') {
      return await step(this.input, this);
    } else if (typeof step === 'object') {
      return await this.executeNamedStep(step);
    }
    throw new Error(`Invalid step type: ${typeof step}`);
  }

  /**
   * Execute a named step with action
   */
  async executeNamedStep(step) {
    const { name, action, instruction, validation } = step;
    
    console.log(`[${this.protocol}] Executing: ${name}`);
    if (instruction) {
      console.log(`  Instruction: ${instruction}`);
    }
    
    // Execute the action
    let result;
    if (typeof action === 'function') {
      result = await action(this.input, this);
    } else {
      result = { action, completed: true };
    }
    
    // Validate step result if validation provided
    if (validation && !validation(result)) {
      throw new Error(`Step validation failed for ${name}`);
    }
    
    return result;
  }

  /**
   * Validate output against schema
   */
  async validateOutput(results) {
    for (const [key, validator] of Object.entries(this.validation.output)) {
      if (!validator(results[key])) {
        throw new Error(`Output validation failed for ${key}`);
      }
    }
    return true;
  }

  /**
   * Execute rollback procedures
   */
  async executeRollback(error) {
    console.error(`[${this.protocol}] Executing rollback due to error:`, error.message);
    if (typeof this.rollback === 'function') {
      await this.rollback(error, this);
    }
  }

  /**
   * Chain protocols together
   */
  static chain(...protocols) {
    return async (initialInput) => {
      let input = initialInput;
      const results = [];
      
      for (const protocol of protocols) {
        const instance = new ProtocolShell(protocol);
        instance.input = input;
        const result = await instance.execute();
        results.push(result);
        
        if (!result.success) {
          return { success: false, results, failedAt: protocol.protocol };
        }
        
        // Pass output to next protocol
        input = result.results;
      }
      
      return { success: true, results };
    };
  }

  /**
   * Create a protocol from Context Engineering format
   */
  static fromContextEngineering(definition) {
    // Parse Context Engineering protocol format
    const parsed = this.parseProtocolDefinition(definition);
    return new ProtocolShell(parsed);
  }

  /**
   * Parse protocol definition string
   */
  static parseProtocolDefinition(definition) {
    // This would parse the Context Engineering format:
    // /protocol.name{intent="...", input={...}, process=[...], output={...}}
    // For now, return a basic structure
    return {
      protocol: 'parsed',
      intent: 'Parsed from Context Engineering format',
      input: {},
      process: [],
      output: {}
    };
  }
}

/**
 * Protocol Registry for managing available protocols
 */
class ProtocolRegistry {
  constructor() {
    this.protocols = new Map();
    this.categories = new Map();
  }

  /**
   * Register a protocol
   */
  register(name, protocol) {
    this.protocols.set(name, protocol);
    
    // Categorize by type
    const category = name.split('.')[0];
    if (!this.categories.has(category)) {
      this.categories.set(category, new Set());
    }
    this.categories.get(category).add(name);
    
    return this;
  }

  /**
   * Get a protocol by name
   */
  get(name) {
    return this.protocols.get(name);
  }

  /**
   * Execute a protocol by name
   */
  async execute(name, input) {
    const protocol = this.get(name);
    if (!protocol) {
      throw new Error(`Protocol not found: ${name}`);
    }
    
    const instance = new ProtocolShell(protocol);
    instance.input = input;
    return await instance.execute();
  }

  /**
   * List all protocols
   */
  list() {
    return Array.from(this.protocols.keys());
  }

  /**
   * List protocols by category
   */
  listByCategory(category) {
    return Array.from(this.categories.get(category) || []);
  }
}

// Export for use in Claude Code OS
module.exports = {
  ProtocolShell,
  ProtocolRegistry
};

// Initialize global registry
global.protocolRegistry = new ProtocolRegistry();
