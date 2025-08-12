#!/usr/bin/env node

/**
 * Claude Code OS CLI
 * Command-line interface for Claude Code Operating System
 */

const { program } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { ccOS } = require('./index');
const package = require('../package.json');

// ASCII Art Banner
const banner = `
╔═══════════════════════════════════════════════════════════╗
║   ██████╗ ██████╗       ██████╗ ███████╗    ██╗  ██╗ ██╗  ║
║  ██╔════╝██╔════╝      ██╔═══██╗██╔════╝    ██║  ██║███║  ║
║  ██║     ██║     █████╗██║   ██║███████╗    ███████║╚██║  ║
║  ██║     ██║     ╚════╝██║   ██║╚════██║    ╚════██║ ██║  ║
║  ╚██████╗╚██████╗      ╚██████╔╝███████║         ██║ ██║  ║
║   ╚═════╝ ╚═════╝       ╚═════╝ ╚══════╝         ╚═╝ ╚═╝  ║
║                                                            ║
║        Claude Code Operating System v${package.version}              ║
║        Enhanced with Context Engineering                   ║
╚═══════════════════════════════════════════════════════════╝
`;

// Configure program
program
  .version(package.version)
  .description('Claude Code Operating System - AI-Powered Development Framework');

// Init command
program
  .command('init')
  .description('Initialize Claude Code OS in current directory')
  .action(async () => {
    console.log(chalk.cyan(banner));
    await ccOS.handleCommand('/init-os');
  });

// Prime command
program
  .command('prime')
  .description('Prime context with comprehensive project understanding')
  .option('--deep', 'Perform deep analysis')
  .option('--patterns', 'Include pattern recognition')
  .action(async (options) => {
    console.log(chalk.cyan('🧠 Priming project context...'));
    await ccOS.handleCommand('/context-prime', options);
  });

// Protocol command
program
  .command('protocol <name>')
  .description('Execute a protocol')
  .option('-i, --input <json>', 'Input data as JSON')
  .action(async (name, options) => {
    console.log(chalk.cyan(`🔧 Executing protocol: ${name}`));
    
    let input = {};
    if (options.input) {
      try {
        input = JSON.parse(options.input);
      } catch (error) {
        console.error(chalk.red('Invalid JSON input'));
        process.exit(1);
      }
    }
    
    try {
      const result = await ccOS.execute(name, input);
      console.log(chalk.green('✅ Protocol executed successfully'));
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(chalk.red(`❌ Protocol failed: ${error.message}`));
      process.exit(1);
    }
  });

// Think command
program
  .command('think <problem>')
  .description('Apply thinking protocols to a problem')
  .option('-l, --level <level>', 'Thinking level (basic|deep|deeper|ultra)', 'basic')
  .action(async (problem, options) => {
    const levels = {
      basic: '🤔',
      deep: '🧠',
      deeper: '🧠🧠',
      ultra: '🧠🧠🧠'
    };
    
    console.log(chalk.cyan(`${levels[options.level]} Thinking about: ${problem}`));
    
    const result = await ccOS.execute('thinking.extended', {
      problem,
      level: options.level
    });
    
    console.log(chalk.green('\n📊 Analysis Complete:'));
    console.log(result);
  });

// Analyze command
program
  .command('analyze <file>')
  .description('Analyze code file or directory')
  .option('-f, --focus <aspect>', 'Focus on specific aspect')
  .action(async (file, options) => {
    console.log(chalk.cyan(`🔍 Analyzing: ${file}`));
    
    const fs = require('fs').promises;
    try {
      const code = await fs.readFile(file, 'utf8');
      const result = await ccOS.execute('code.analyze', {
        code,
        focus: options.focus
      });
      
      console.log(chalk.green('\n📊 Analysis Results:'));
      console.log(result);
    } catch (error) {
      console.error(chalk.red(`Failed to analyze: ${error.message}`));
    }
  });

// Interactive mode
program
  .command('interactive')
  .alias('i')
  .description('Start interactive session')
  .action(async () => {
    console.log(chalk.cyan(banner));
    console.log(chalk.yellow('Starting interactive mode... (type "exit" to quit)\n'));
    
    while (true) {
      const { command } = await inquirer.prompt([
        {
          type: 'input',
          name: 'command',
          message: 'ccOS>',
          prefix: ''
        }
      ]);
      
      if (command === 'exit' || command === 'quit') {
        console.log(chalk.yellow('Goodbye! 👋'));
        break;
      }
      
      if (command.startsWith('/')) {
        await ccOS.handleCommand(command);
      } else if (command === 'status') {
        const status = ccOS.getStatus();
        console.table(status);
      } else if (command === 'help') {
        ccOS.showHelp();
      } else if (command === 'protocols') {
        ccOS.showAvailableProtocols();
      } else {
        console.log(chalk.gray('Unknown command. Type "help" for available commands.'));
      }
    }
  });

// Status command
program
  .command('status')
  .description('Show system status')
  .action(() => {
    console.log(chalk.cyan('📊 System Status:'));
    const status = ccOS.getStatus();
    console.table(status);
  });

// List protocols
program
  .command('list-protocols')
  .alias('lp')
  .description('List all available protocols')
  .action(() => {
    ccOS.showAvailableProtocols();
  });

// Self-reflect command
program
  .command('reflect <content>')
  .description('Apply self-reflection protocol')
  .action(async (content) => {
    console.log(chalk.cyan('🪞 Applying self-reflection...'));
    
    const result = await ccOS.execute('self.reflect', {
      previous_output: content,
      criteria: {
        completeness: true,
        correctness: true,
        clarity: true
      }
    });
    
    console.log(chalk.green('\n📊 Reflection Results:'));
    console.log(result);
  });

// Identify gaps command
program
  .command('gaps')
  .description('Identify knowledge gaps in current context')
  .action(async () => {
    console.log(chalk.cyan('🔍 Identifying knowledge gaps...'));
    
    const result = await ccOS.execute('self.identify_gaps', {
      context: ccOS.context,
      requirements: 'Full project understanding'
    });
    
    console.log(chalk.green('\n📊 Gap Analysis:'));
    console.log(result);
  });

// Help command
program
  .command('help-extended')
  .description('Show extended help and examples')
  .action(() => {
    console.log(chalk.cyan(banner));
    ccOS.showHelp();
    
    console.log(chalk.yellow('\n📚 EXAMPLES:\n'));
    console.log('  Initialize in current directory:');
    console.log(chalk.gray('  $ cclos init\n'));
    
    console.log('  Prime context with deep analysis:');
    console.log(chalk.gray('  $ cclos prime --deep\n'));
    
    console.log('  Execute a protocol:');
    console.log(chalk.gray('  $ cclos protocol reasoning.systematic -i \'{"problem":"How to optimize?"}\'\n'));
    
    console.log('  Think about a problem:');
    console.log(chalk.gray('  $ cclos think "How to improve performance?" --level ultra\n'));
    
    console.log('  Analyze code:');
    console.log(chalk.gray('  $ cclos analyze src/index.js --focus security\n'));
    
    console.log('  Start interactive mode:');
    console.log(chalk.gray('  $ cclos interactive\n'));
  });

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(chalk.cyan(banner));
  program.outputHelp();
}

// Handle uncaught errors gracefully
process.on('uncaughtException', (error) => {
  console.error(chalk.red('\n❌ Unexpected error:'), error.message);
  console.error(chalk.gray('Please report this issue on GitHub'));
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('\n❌ Unhandled promise rejection:'), reason);
  process.exit(1);
});
