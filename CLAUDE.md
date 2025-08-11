# CLAUDE.md - Global Context Rules for Claude Code OS

This file provides comprehensive guidance to Claude Code for maintaining context, preventing spaghetti code, and orchestrating complex software development.

## 🧠 Core Principles

### Context Over Everything
**MANDATORY**: Before any code modification, you MUST:
1. Read and understand existing code structure
2. Map dependencies and relationships
3. Assess impact of changes
4. Maintain awareness of overall architecture

### Memory Management Protocol
- **Session State**: Track all modifications within current session
- **Cross-Session**: Use memory server for persistent knowledge
- **Pattern Recognition**: Identify and reuse existing patterns
- **Relationship Tracking**: Maintain dependency graph

### Anti-Spaghetti Rules
- **Never** create disconnected code
- **Always** verify imports are used
- **Always** check for duplicate functionality
- **Never** lose track of code structure
- **Always** maintain consistent patterns

## 🏗️ Architecture Awareness

### Project Structure Rules
```
src/
├── api/          # Backend endpoints
├── components/   # Reusable UI components  
├── features/     # Feature-based modules
├── hooks/        # Custom React hooks
├── lib/          # Utilities and helpers
├── services/     # External service integrations
└── types/        # TypeScript definitions
```

**CRITICAL**: Maintain strict separation of concerns. Each directory has a specific purpose.

### Code Organization
- **File Length**: Max 300 lines per file
- **Function Length**: Max 50 lines per function
- **Component Length**: Max 200 lines per component
- **Complexity**: Cyclomatic complexity < 10

## 🔄 Development Workflow

### Pre-Implementation Phase
1. **Context Loading**: Load relevant files and patterns
2. **Impact Analysis**: Identify affected components
3. **Design Review**: Validate approach against patterns
4. **Memory Check**: Verify no duplicate implementations

### Implementation Phase
1. **Incremental Development**: Small, testable changes
2. **Continuous Validation**: Test after each modification
3. **Pattern Compliance**: Follow established patterns
4. **Documentation Sync**: Update docs with code

### Post-Implementation Phase
1. **Integration Testing**: Verify system-wide compatibility
2. **Performance Check**: Ensure no degradation
3. **Code Cleanup**: Remove unused imports/code
4. **Memory Update**: Store new patterns and learnings

## 🎯 Context Engineering Protocols

### Reading Files
**ALWAYS** use this sequence:
```bash
1. List directory structure
2. Read configuration files (package.json, etc.)
3. Read entry points (index, main, app)
4. Read related modules
5. Map relationships
```

### Writing Code
**MANDATORY** checks before writing:
- [ ] File doesn't already exist with similar functionality
- [ ] Imports are available and correct
- [ ] Pattern matches existing codebase
- [ ] Tests are updated/created
- [ ] Documentation is updated

### Modifying Code
**REQUIRED** process:
1. Read original file completely
2. Understand context and purpose
3. Identify dependencies
4. Make minimal necessary changes
5. Verify no breaking changes
6. Update related files if needed

## 🚨 Critical Rules

### Never Do This
❌ Write code without reading existing patterns
❌ Create files without checking for duplicates
❌ Import modules without verifying they exist
❌ Modify code without understanding context
❌ Skip tests for new functionality
❌ Leave commented-out code
❌ Create circular dependencies

### Always Do This
✅ Read before write
✅ Test before commit
✅ Document while coding
✅ Validate imports exist
✅ Check for existing solutions
✅ Maintain consistent style
✅ Update dependency graph

## 🔧 Subagent Orchestration

### When to Delegate
- **Complex Analysis**: Use analysis-agent for deep code review
- **Testing**: Use test-agent for comprehensive testing
- **Documentation**: Use doc-agent for documentation updates
- **Performance**: Use perf-agent for optimization
- **Security**: Use security-agent for vulnerability checks

### Subagent Communication
```yaml
Main Agent → Subagent:
  - Clear task definition
  - Relevant context only
  - Expected output format
  - Success criteria

Subagent → Main Agent:
  - Task completion status
  - Generated artifacts
  - Discovered issues
  - Recommendations
```

## 📊 Quality Gates

### Code Quality Metrics
- **Coverage**: Minimum 80% test coverage
- **Complexity**: Cyclomatic complexity < 10
- **Duplication**: Less than 3% duplication
- **Documentation**: All public APIs documented
- **Type Safety**: 100% TypeScript coverage

### Validation Checkpoints
1. **Pre-commit**: Linting, formatting, type checking
2. **Pre-push**: Unit tests, integration tests
3. **Pre-deploy**: E2E tests, performance tests
4. **Post-deploy**: Smoke tests, monitoring

## 🧩 MCP Server Utilization

### Context7 (Documentation)
- Use for framework best practices
- Library documentation lookups
- API reference checks
- Pattern recommendations

### Sequential (Complex Thinking)
- Multi-step problem solving
- System design decisions
- Debugging complex issues
- Architecture planning

### GitHub Integration
- Direct repository operations
- Issue tracking and management
- PR creation and review
- Commit management

### Memory Server
- Session state persistence
- Pattern library storage
- Knowledge base queries
- Cross-session context

## 🔄 Continuous Improvement

### Learning Protocol
After each task:
1. Identify new patterns discovered
2. Document lessons learned
3. Update pattern library
4. Refine workflow if needed
5. Store in memory server

### Feedback Loops
- **User Feedback**: Incorporate corrections immediately
- **Test Results**: Adjust implementation based on failures
- **Performance Data**: Optimize based on metrics
- **Code Reviews**: Apply suggestions systematically

## 📝 Session Management

### Context Preservation
- **Start of Session**: Load project context and memory
- **During Session**: Track all changes and decisions
- **End of Session**: Save state and learnings
- **Session Handoff**: Document for next session

### Token Optimization
- **Chunking Strategy**: Process large files in segments
- **Compression**: Summarize when approaching limits
- **Delegation**: Use subagents for parallel work
- **Caching**: Reuse analysis results

## 🎪 Command Orchestration

### Primary Commands
- `/init-os`: Initialize the operating system
- `/scan-project`: Analyze codebase structure
- `/build-feature`: Implement new features
- `/improve-code`: Optimize existing code
- `/test-all`: Run comprehensive tests
- `/deploy`: Execute deployment workflow

### Context Commands
- `/save-context`: Persist current session state
- `/load-context`: Restore previous session
- `/show-memory`: Display memory contents
- `/clear-context`: Reset context (use carefully!)

## 🚀 Performance Guidelines

### Response Time
- **Simple queries**: < 2 seconds
- **Code generation**: < 10 seconds
- **Complex analysis**: < 30 seconds
- **Full test suite**: < 5 minutes

### Resource Usage
- **Memory**: Track and optimize token usage
- **Parallel Operations**: Use subagents effectively
- **Caching**: Maximize result reuse
- **Compression**: Apply when needed

---

**Remember**: Context is everything. Never lose sight of the bigger picture while working on details. Every line of code should have a purpose and a place in the overall architecture.
