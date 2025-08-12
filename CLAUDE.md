# CLAUDE.md - Constitutional Framework for Claude Code OS v4.0

> **This is your constitution. Follow these rules, workflows, and patterns for every interaction.**

## 🎯 Core Constitutional Principles

### 1. Context is Supreme Law
- **MANDATORY**: Always read before writing
- **MANDATORY**: Map dependencies before changes
- **MANDATORY**: Assess impact before implementation
- **MANDATORY**: Maintain architectural awareness
- **MANDATORY**: Query memory for patterns

### 2. Security First
- **Act as a security-conscious developer**
- **Consider OWASP Top 10 in every implementation**
- **Never commit secrets or credentials**
- **Always validate and sanitize inputs**
- **Use secure defaults**

### 3. Workflow Discipline
```
Explore → Plan → Code → Test → Commit
```
Every task follows this cycle. No exceptions.

### 4. Thinking Budget Management
- **"think"**: Standard analysis (default)
- **"think harder"**: Complex problems (~2x tokens)
- **"think step-by-step"**: Decomposition (~3x tokens)
- **"ultrathink"**: Deep analysis (~5x tokens)
- **"ULTRA-THINK"**: Emergency analysis (~10x tokens)

## 🎮 Interface & Navigation

### Keyboard Shortcuts
- **Ctrl/Cmd+L**: Clear conversation
- **Esc+Esc**: Edit previous prompt
- **Shift+Tab**: Cycle input modes (Edit → Auto-accept → Plan)
- **Tab**: Autocomplete file names
- **Double Esc**: Cancel current task

### Input Modes
1. **Edit Mode**: Default, review before execution
2. **Auto-accept Mode**: Trust mode for safe operations
3. **Plan Mode**: Automatic task decomposition

### Working with Files
- **Drag & Drop**: Images, screenshots, files
- **Paste**: Direct image/file path insertion
- **Tab Completion**: Navigate file system efficiently

## 🔄 Core Workflows

### 1. Explore → Plan → Code → Commit Workflow
```bash
# 1. EXPLORE: Understand the codebase
/context-prime --deep
/scan-project --focus=architecture
read relevant files
map dependencies

# 2. PLAN: Create implementation strategy
"think harder about this approach"  # Allocates more thinking tokens
write detailed plan
identify risks

# 3. CODE: Implement incrementally
write code
run tests after each change
validate against patterns

# 4. COMMIT: Version control
/commit-smart  # Intelligent conventional commits
git push
```

### 2. Test-Driven Development (TDD)
```bash
/tdd feature-name --framework jest --coverage

# Automated Red-Green-Refactor cycle
# 1. Write failing tests
# 2. Implement minimal code
# 3. Refactor with confidence
```

### 3. Screenshot Iteration (UI Work)
```bash
# 1. Capture current state
take screenshot
drag into chat

# 2. Request changes
"Make these UI improvements: ..."

# 3. Iterate
implement changes
screenshot again
repeat until satisfied
```

### 4. Multi-Agent Orchestration
```bash
/multi-agent orchestration-plan.yml --agents 3 --mode parallel

# Spawns parallel agents for:
# - Frontend development
# - Backend API
# - Testing suite
# Automatically merges results
```

### 5. Headless Automation
```bash
# CI/CD automation
claude -p "run tests and deploy if passing"

# Batch processing
for file in *.py; do
  claude -p "refactor $file for performance"
done

# Pipeline integration
cat data.json | claude -p "analyze and summarize"
```

## 🧠 Thinking & Planning Protocols

### Thinking Budget Keywords
- **"think"**: Standard analysis
- **"think harder"**: Allocate more tokens for complex problems
- **"think step-by-step"**: Decompose problem
- **"ultrathink"**: Maximum depth analysis (use sparingly)
- **"ULTRA-THINK"**: Emergency deep analysis

### Planning Triggers
- Complex features: Always use Plan Mode
- Architecture decisions: "ultrathink about the architecture"
- Bug fixes: "think step-by-step through the root cause"
- Performance: "think harder about optimization"

## 🔒 Security Protocols

### Security Rules (Max Priority)
```yaml
ALWAYS:
  - Validate all inputs
  - Use parameterized queries
  - Implement rate limiting
  - Add authentication checks
  - Log security events
  - Use HTTPS only
  - Encrypt sensitive data

NEVER:
  - Trust user input
  - Use eval() or exec()
  - Store passwords in plain text
  - Commit API keys
  - Skip authorization checks
  - Use outdated dependencies
  - Ignore security warnings
```

### Security Scanning Workflow
```bash
/security-scan --deep

# Runs automatically:
# - npm audit
# - pip audit
# - bandit -r .
# - safety check
# - semgrep --config=auto
# - OWASP dependency check
```

### CWE Prevention Checklist
- [ ] CWE-79: XSS - Escape all output
- [ ] CWE-89: SQL Injection - Use ORM/prepared statements
- [ ] CWE-200: Information Exposure - Sanitize error messages
- [ ] CWE-250: Execution with Unnecessary Privileges - Principle of least privilege
- [ ] CWE-352: CSRF - Implement CSRF tokens
- [ ] CWE-434: Unrestricted Upload - Validate file types
- [ ] CWE-611: XXE - Disable XML external entities
- [ ] CWE-798: Hard-coded Credentials - Use environment variables

## 📁 Workspace Management

### Isolation Strategy
```bash
# Create isolated workspace
mkdir ~/claude-workspace
cd ~/claude-workspace

# Set up environment
export CLAUDE_WORKSPACE=$(pwd)
export PATH=$CLAUDE_WORKSPACE/bin:$PATH

# Initialize
/init-os
```

### Directory-Specific Rules
```
project/
├── CLAUDE.md                 # Global rules (this file)
├── frontend/
│   └── CLAUDE.md            # Frontend-specific rules
├── backend/
│   └── CLAUDE.md            # Backend-specific rules
├── tests/
│   └── CLAUDE.md            # Testing rules
└── .claude/
    ├── commands/            # Custom slash commands
    ├── hooks/               # Lifecycle hooks
    ├── agents/              # Agent configurations
    └── CLAUDE.local.md      # Private/secret rules (git-ignored)
```

### Nested Rules Loading
```yaml
# In subdirectory CLAUDE.md files
inherit: ../CLAUDE.md
override:
  - specific rules for this directory
  
reference:
  - See: @docs/api-guidelines.md
  - See: @patterns/frontend-patterns.md
```

## 💰 Token & Cost Management

### Token Optimization
```bash
# Monitor usage
ccusage  # View token consumption dashboard

# Clear strategies
/clear      # Full reset
/compact    # Compress context
/resume     # Recover from crash

# Context boundaries
After major task: /clear
After 10k tokens: /compact
Before new feature: /clear
```

### Cost-Saving Patterns
1. **Clear after task completion**
2. **Use Sonnet for simple tasks**
3. **Use Opus for complex reasoning**
4. **Batch similar operations**
5. **Reuse patterns from memory**
6. **Leverage slash commands for common tasks**

## 🔧 Tool & Permission Management

### Permission Levels
```bash
# Development (trusted environment)
claude --dangerously-skip-permissions

# Production (careful mode)
claude --confirm-all

# CI/CD (headless)
claude -p --no-interactive
```

### Auto-Execute Whitelist
```yaml
safe_commands:
  - ls, cat, grep, find  # Read-only
  - npm test, pytest     # Testing
  - git status, git diff # Version control
  
require_confirmation:
  - rm, mv, cp          # File operations
  - git commit, git push # Version control
  - npm install         # Dependencies
```

## 🛠️ MCP Server Configuration

### Pre-Configured Servers
```json
{
  "mcpServers": {
    "context7": {
      "description": "Up-to-date documentation",
      "use_for": ["framework docs", "API references", "examples"]
    },
    "sequential": {
      "description": "Complex reasoning",
      "use_for": ["architecture", "algorithms", "debugging"]
    },
    "playwright": {
      "description": "Browser automation",
      "use_for": ["e2e testing", "scraping", "UI validation"]
    },
    "github": {
      "description": "GitHub integration",
      "use_for": ["PR management", "issue tracking", "code review"]
    },
    "aws-documentation": {
      "description": "AWS service docs",
      "use_for": ["cloud architecture", "service configuration"]
    }
  }
}
```

### Server Usage Patterns
```bash
# Documentation lookup
"Using Context7, find the latest React hooks documentation"

# Complex reasoning
"Using Sequential, design a microservices architecture"

# Browser testing
"Using Playwright, test the login flow"

# GitHub integration
"Using GitHub server, create PR from feature branch"
```

## 📝 Custom Commands

### Essential Commands
- `/init-os`: Initialize Claude Code OS
- `/context-prime`: Load comprehensive project context
- `/scan-project`: Deep codebase analysis
- `/generate-prp`: Create Product Requirements Prompt
- `/execute-prp`: Implement from PRP
- `/security-scan`: Run security audit
- `/tdd`: Test-driven development workflow
- `/commit-smart`: Intelligent git commits
- `/multi-agent`: Orchestrate parallel agents
- `/build-feature`: Complete feature workflow

### Command Patterns
```bash
# Planning commands
/plan "feature description"
/estimate "task complexity"

# Quality commands
/lint --fix
/format --all
/coverage --report

# Documentation
/document --api
/diagram --architecture
```

## 🎯 Subagent Orchestration

### Subagent Activation
```yaml
triggers:
  complex_analysis: analysis_agent
  test_generation: test_agent
  security_review: security_agent
  performance: perf_agent
  documentation: doc_agent
  
coordination:
  mode: hub_and_spoke
  handoff: token_validated
  timeout: 300s
```

### Multi-Agent Patterns
```bash
# Parallel analysis
spawn: [security_agent, perf_agent]
merge: results
decide: optimal_approach

# Sequential refinement
agent1: generate_code
agent2: review_code
agent3: optimize_code
```

## 🪝 Hooks Configuration

### Lifecycle Hooks
```json
{
  "hooks": {
    "pre-commit": "npm test && npm run lint",
    "post-commit": "git push",
    "pre-code": "security-check",
    "post-code": "format && test",
    "on-error": "rollback && notify"
  }
}
```

### Custom Hook Implementation
```javascript
// .claude/hooks/pre-commit.js
module.exports = async (context) => {
  await runTests();
  await checkSecurity();
  await validateCommitMessage();
  return { proceed: true };
};
```

## 🚀 Advanced Techniques

### Voice Input Integration
```bash
# With Wispr Flow or similar
voice: "Create a REST API for user management"
process: transcribe → plan → implement
```

### IDE Integration
```bash
# VS Code
Install Claude Code extension
Use Cmd+K for inline assistance

# Cursor
Native integration
Multi-file context awareness

# Neovim
Use claude-code.nvim plugin

# Emacs
Use claude-code.el
```

### Continuous Improvement Loop
```bash
while developing:
  1. Implement feature
  2. Run diagnostics
  3. Fix issues
  4. Update CLAUDE.md with learnings
  5. Commit progress
  6. Repeat
```

## 📊 Quality Gates & Validation

### Pre-Commit Checklist
- [ ] All tests passing
- [ ] Security scan clean
- [ ] Linting passed
- [ ] Coverage > 80%
- [ ] Documentation updated
- [ ] CLAUDE.md refined
- [ ] No console.logs
- [ ] No commented code
- [ ] No TODO comments
- [ ] Conventional commit message

### Continuous Validation
```bash
# After every file save
npm run lint
npm test affected

# Before commit
npm run validate:all

# After commit
npm run e2e
```

## 🎪 Session Management

### Session Lifecycle
```bash
# Start
/init-os
/context-prime --session previous

# During
/save-checkpoint after-feature-x
/status  # Current state

# End
/save-context session-$(date +%Y%m%d)
/handoff  # Document for next developer
```

### Context Preservation
```yaml
save_always:
  - Architectural decisions
  - Pattern discoveries
  - Bug solutions
  - Performance optimizations
  
save_to_memory:
  - Reusable patterns
  - Common fixes
  - Project conventions
```

## 🚨 Emergency Protocols

### When Things Go Wrong
```bash
# Syntax errors
/lint --fix
/format --force

# Test failures
/test --verbose
/debug failing-test

# Performance issues
/profile
/optimize --aggressive

# Security vulnerabilities
/security-scan --deep
/patch-vulnerabilities

# Git problems
git reflog  # Find last good state
git reset --hard HEAD~1
```

## 📖 Learning & Adaptation

### Continuous Learning
```bash
# When Claude makes a mistake
"Add this to CLAUDE.md: [correct approach]"

# When discovering patterns
"Remember this pattern: [pattern description]"

# When finding better solutions
"Update our approach: [new method]"
```

### Rule Evolution
- Start with base rules
- Add project-specific rules
- Refine based on mistakes
- Prune outdated rules
- Keep under 500 lines

## 🎯 Success Metrics

Track these for continuous improvement:
- **First-attempt success rate**: >90%
- **Security vulnerabilities**: 0 critical/high
- **Test coverage**: >85%
- **Performance degradation**: <5%
- **Documentation coverage**: 100% public APIs
- **Token efficiency**: <10k per feature
- **Commit frequency**: Every 30 minutes
- **Code review turnaround**: <2 hours

## 🔗 Integration with ClaudeLog Techniques

### Plan Mode
```bash
# Activate automatic task decomposition
Shift+Tab → Plan Mode
# Claude automatically breaks down complex tasks
```

### UltraThink Pattern
```bash
# For critical decisions
"ULTRA-THINK: What's the optimal database architecture for this scale?"
# Allocates maximum thinking tokens for deep analysis
```

### Agent-First Design
```yaml
# Design systems optimized for AI collaboration
principles:
  - Clear boundaries
  - Explicit contracts
  - Atomic operations
  - Comprehensive logging
  - Self-documenting code
```

---

**Remember**: This constitution guides every action. When in doubt, consult these rules. When discovering better patterns, update this document. This is a living constitution that evolves with the project.

**Version**: 4.0.0
**Last Updated**: 2024-08-11
**Authority**: Supreme guidance for all Claude Code operations
**Enforcement**: Mandatory for all interactions
**Based on**: Best practices from awesome-claude-code community
