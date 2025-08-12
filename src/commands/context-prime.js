#!/usr/bin/env node

/**
 * /context-prime Command Implementation
 * Comprehensive project understanding and context loading
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class ContextPrimer {
  constructor() {
    this.context = {
      timestamp: new Date().toISOString(),
      project: {},
      technology: {},
      architecture: {},
      patterns: [],
      dependencies: {},
      security: {},
      performance: {},
      quality: {}
    };
  }

  async prime(options = {}) {
    console.log('🧠 Claude Code OS - Context Priming v4.0');
    console.log('========================================\n');

    const startTime = Date.now();
    
    try {
      // 1. Analyze project structure
      await this.analyzeProjectStructure();
      
      // 2. Detect technology stack
      await this.detectTechnologyStack();
      
      // 3. Map architecture
      await this.mapArchitecture();
      
      // 4. Identify patterns
      await this.identifyPatterns();
      
      // 5. Analyze dependencies
      await this.analyzeDependencies();
      
      // 6. Security assessment
      await this.assessSecurity();
      
      // 7. Performance analysis
      if (options.deep) {
        await this.analyzePerformance();
      }
      
      // 8. Code quality metrics
      await this.assessQuality();
      
      // 9. Save context
      await this.saveContext();
      
      // 10. Generate summary
      this.generateSummary();
      
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
      console.log(`\n✅ Context priming completed in ${elapsed}s`);
      
    } catch (error) {
      console.error('❌ Error during context priming:', error.message);
      process.exit(1);
    }
  }

  async analyzeProjectStructure() {
    console.log('📁 Analyzing project structure...');
    
    const structure = {
      directories: [],
      keyFiles: [],
      entryPoints: [],
      totalFiles: 0,
      totalLines: 0
    };

    // Scan directories
    const scanDir = async (dir, depth = 0) => {
      if (depth > 3) return; // Limit depth
      
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        // Skip node_modules, .git, etc.
        if (this.shouldSkip(entry.name)) continue;
        
        if (entry.isDirectory()) {
          structure.directories.push({
            path: fullPath,
            name: entry.name,
            depth
          });
          await scanDir(fullPath, depth + 1);
        } else {
          structure.totalFiles++;
          
          // Identify key files
          if (this.isKeyFile(entry.name)) {
            structure.keyFiles.push({
              path: fullPath,
              name: entry.name,
              type: this.getFileType(entry.name)
            });
          }
          
          // Identify entry points
          if (this.isEntryPoint(entry.name)) {
            structure.entryPoints.push(fullPath);
          }
        }
      }
    };

    await scanDir(process.cwd());
    
    this.context.project = structure;
    console.log(`  ✓ Found ${structure.totalFiles} files in ${structure.directories.length} directories`);
    console.log(`  ✓ Identified ${structure.entryPoints.length} entry points`);
  }

  async detectTechnologyStack() {
    console.log('🔧 Detecting technology stack...');
    
    const tech = {
      languages: new Set(),
      frameworks: new Set(),
      tools: new Set(),
      databases: new Set()
    };

    // Check package.json
    try {
      const packageJson = JSON.parse(
        await fs.readFile('package.json', 'utf8')
      );
      
      // Analyze dependencies
      const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      for (const [name, version] of Object.entries(deps)) {
        if (name.includes('react')) tech.frameworks.add('React');
        if (name.includes('vue')) tech.frameworks.add('Vue');
        if (name.includes('angular')) tech.frameworks.add('Angular');
        if (name.includes('express')) tech.frameworks.add('Express');
        if (name.includes('nest')) tech.frameworks.add('NestJS');
        if (name.includes('next')) tech.frameworks.add('Next.js');
        if (name.includes('jest')) tech.tools.add('Jest');
        if (name.includes('typescript')) tech.languages.add('TypeScript');
        if (name.includes('postgres')) tech.databases.add('PostgreSQL');
        if (name.includes('mongo')) tech.databases.add('MongoDB');
      }
      
      tech.languages.add('JavaScript');
    } catch {}

    // Check for other language files
    const files = await fs.readdir(process.cwd());
    for (const file of files) {
      if (file.endsWith('.py')) tech.languages.add('Python');
      if (file.endsWith('.go')) tech.languages.add('Go');
      if (file.endsWith('.rs')) tech.languages.add('Rust');
      if (file.endsWith('.java')) tech.languages.add('Java');
      if (file.endsWith('.cs')) tech.languages.add('C#');
    }

    this.context.technology = {
      languages: Array.from(tech.languages),
      frameworks: Array.from(tech.frameworks),
      tools: Array.from(tech.tools),
      databases: Array.from(tech.databases)
    };

    console.log(`  ✓ Languages: ${this.context.technology.languages.join(', ')}`);
    console.log(`  ✓ Frameworks: ${this.context.technology.frameworks.join(', ')}`);
  }

  async mapArchitecture() {
    console.log('🏗️ Mapping architecture...');
    
    const arch = {
      pattern: 'unknown',
      layers: [],
      components: [],
      services: []
    };

    // Detect architectural pattern
    const dirs = await fs.readdir(process.cwd());
    
    if (dirs.includes('src') && dirs.includes('tests')) {
      if (dirs.includes('controllers') || dirs.includes('routes')) {
        arch.pattern = 'MVC';
      } else if (dirs.includes('components')) {
        arch.pattern = 'Component-Based';
      } else if (dirs.includes('domain')) {
        arch.pattern = 'Domain-Driven';
      }
    }
    
    if (dirs.includes('packages')) {
      arch.pattern = 'Monorepo';
    }
    
    if (dirs.includes('functions') || dirs.includes('lambdas')) {
      arch.pattern = 'Serverless';
    }

    this.context.architecture = arch;
    console.log(`  ✓ Detected pattern: ${arch.pattern}`);
  }

  async identifyPatterns() {
    console.log('🎨 Identifying patterns...');
    
    const patterns = [];
    
    // Check for common patterns in code
    const checkPattern = async (filePath) => {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        
        if (content.includes('async') && content.includes('await')) {
          patterns.push('Async/Await');
        }
        if (content.includes('Observable') || content.includes('Subject')) {
          patterns.push('Reactive');
        }
        if (content.includes('Provider') || content.includes('Consumer')) {
          patterns.push('Provider Pattern');
        }
        if (content.includes('singleton')) {
          patterns.push('Singleton');
        }
        if (content.includes('factory')) {
          patterns.push('Factory');
        }
      } catch {}
    };

    // Sample some files
    for (const file of this.context.project.keyFiles.slice(0, 10)) {
      await checkPattern(file.path);
    }

    this.context.patterns = [...new Set(patterns)];
    console.log(`  ✓ Found patterns: ${this.context.patterns.join(', ')}`);
  }

  async analyzeDependencies() {
    console.log('📦 Analyzing dependencies...');
    
    const deps = {
      total: 0,
      outdated: [],
      security: [],
      unused: []
    };

    try {
      const packageJson = JSON.parse(
        await fs.readFile('package.json', 'utf8')
      );
      
      deps.total = Object.keys({
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      }).length;

      // Check for outdated (would need npm outdated in real implementation)
      // Check for security issues (would need npm audit)
      
    } catch {}

    this.context.dependencies = deps;
    console.log(`  ✓ Total dependencies: ${deps.total}`);
  }

  async assessSecurity() {
    console.log('🔒 Assessing security...');
    
    const security = {
      hasEnvFile: false,
      hasGitignore: false,
      hasSecurityHeaders: false,
      vulnerabilities: []
    };

    // Check for .env and .gitignore
    try {
      await fs.access('.env');
      security.hasEnvFile = true;
    } catch {}

    try {
      await fs.access('.gitignore');
      security.hasGitignore = true;
      
      // Check if .env is in gitignore
      const gitignore = await fs.readFile('.gitignore', 'utf8');
      if (!gitignore.includes('.env')) {
        security.vulnerabilities.push('.env not in .gitignore');
      }
    } catch {}

    this.context.security = security;
    console.log(`  ✓ Security checks completed`);
  }

  async analyzePerformance() {
    console.log('⚡ Analyzing performance considerations...');
    
    const perf = {
      bundleSize: 'unknown',
      hasLazyLoading: false,
      hasCaching: false,
      hasOptimizations: false
    };

    // Check for performance patterns
    for (const file of this.context.project.keyFiles.slice(0, 5)) {
      try {
        const content = await fs.readFile(file.path, 'utf8');
        
        if (content.includes('lazy') || content.includes('Suspense')) {
          perf.hasLazyLoading = true;
        }
        if (content.includes('cache') || content.includes('memo')) {
          perf.hasCaching = true;
        }
        if (content.includes('optimize') || content.includes('minify')) {
          perf.hasOptimizations = true;
        }
      } catch {}
    }

    this.context.performance = perf;
    console.log(`  ✓ Performance analysis completed`);
  }

  async assessQuality() {
    console.log('📊 Assessing code quality...');
    
    const quality = {
      hasTests: false,
      hasLinting: false,
      hasFormatting: false,
      hasDocs: false
    };

    // Check for quality tools
    const dirs = await fs.readdir(process.cwd());
    
    quality.hasTests = dirs.includes('tests') || dirs.includes('test') || dirs.includes('__tests__');
    quality.hasDocs = dirs.includes('docs') || dirs.includes('documentation');
    
    try {
      const packageJson = JSON.parse(
        await fs.readFile('package.json', 'utf8')
      );
      
      const scripts = packageJson.scripts || {};
      quality.hasLinting = 'lint' in scripts;
      quality.hasFormatting = 'format' in scripts || 'prettier' in scripts;
    } catch {}

    this.context.quality = quality;
    console.log(`  ✓ Quality assessment completed`);
  }

  async saveContext() {
    console.log('💾 Saving context...');
    
    const contextPath = path.join(
      process.cwd(),
      'context/memory/contexts',
      `context-${Date.now()}.json`
    );
    
    await fs.mkdir(path.dirname(contextPath), { recursive: true });
    await fs.writeFile(
      contextPath,
      JSON.stringify(this.context, null, 2)
    );
    
    // Also save as current context
    const currentPath = path.join(
      process.cwd(),
      'context/memory/current-context.json'
    );
    await fs.writeFile(
      currentPath,
      JSON.stringify(this.context, null, 2)
    );
    
    console.log(`  ✓ Context saved to ${contextPath}`);
  }

  generateSummary() {
    console.log('\n' + '='.repeat(50));
    console.log('📋 PROJECT CONTEXT SUMMARY');
    console.log('='.repeat(50));
    
    console.log('\n🏗️ Architecture:');
    console.log(`  Pattern: ${this.context.architecture.pattern}`);
    
    console.log('\n🔧 Technology Stack:');
    console.log(`  Languages: ${this.context.technology.languages.join(', ')}`);
    console.log(`  Frameworks: ${this.context.technology.frameworks.join(', ')}`);
    
    console.log('\n📊 Quality Metrics:');
    console.log(`  Has Tests: ${this.context.quality.hasTests ? '✅' : '❌'}`);
    console.log(`  Has Linting: ${this.context.quality.hasLinting ? '✅' : '❌'}`);
    console.log(`  Has Docs: ${this.context.quality.hasDocs ? '✅' : '❌'}`);
    
    console.log('\n🔒 Security:');
    console.log(`  .env configured: ${this.context.security.hasEnvFile ? '✅' : '❌'}`);
    console.log(`  .gitignore present: ${this.context.security.hasGitignore ? '✅' : '❌'}`);
    
    if (this.context.security.vulnerabilities.length > 0) {
      console.log(`  ⚠️ Issues: ${this.context.security.vulnerabilities.join(', ')}`);
    }
    
    console.log('\n' + '='.repeat(50));
  }

  shouldSkip(name) {
    const skipList = [
      'node_modules',
      '.git',
      '.next',
      'dist',
      'build',
      'coverage',
      '.cache',
      'tmp',
      '.vscode',
      '.idea'
    ];
    return skipList.includes(name);
  }

  isKeyFile(name) {
    const keyFiles = [
      'package.json',
      'tsconfig.json',
      '.env',
      '.env.example',
      'Dockerfile',
      'docker-compose.yml',
      'README.md',
      'CLAUDE.md'
    ];
    return keyFiles.includes(name) || 
           name.endsWith('config.js') || 
           name.endsWith('config.ts');
  }

  isEntryPoint(name) {
    return name === 'index.js' || 
           name === 'index.ts' || 
           name === 'main.js' || 
           name === 'main.ts' ||
           name === 'app.js' ||
           name === 'app.ts';
  }

  getFileType(name) {
    const ext = path.extname(name);
    const types = {
      '.js': 'JavaScript',
      '.ts': 'TypeScript',
      '.jsx': 'React',
      '.tsx': 'React TypeScript',
      '.json': 'JSON',
      '.md': 'Markdown',
      '.yml': 'YAML',
      '.yaml': 'YAML'
    };
    return types[ext] || 'Other';
  }
}

// Run if called directly
if (require.main === module) {
  const primer = new ContextPrimer();
  const args = process.argv.slice(2);
  const options = {
    deep: args.includes('--deep'),
    patterns: args.includes('--patterns')
  };
  primer.prime(options);
}

module.exports = ContextPrimer;
