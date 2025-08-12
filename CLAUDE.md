# CLAUDE.md - Global Context Rules for Claude Code OS v2.0

This file provides comprehensive guidance to Claude Code for maintaining context, preventing spaghetti code, and orchestrating complex software development using advanced context engineering principles.

## 📜 Operating Constitution
- `.claude/commands`: reusable slash commands
- `.claude/agents`: specialized subagents (see docs/subagents.md)
- `.claude/hooks`: automation hooks
- `.mcp.json`: configure external MCP servers (see docs/mcp-servers.md)
- `docs/`: engineering guides and rule templates
  - `context-engineering.md`
  - `subagents.md`
  - `claude-templates.md`

## 🗃️ Nested Rules Files
- Directories may define their own `CLAUDE.md` to scope rules.
- Use `See: @../CLAUDE.md` to inherit parent guidance.
- Templates are available in `docs/claude-templates.md`.

## 🧠 Core Principles

### Context Over Everything
**MANDATORY**: Before any code modification, you MUST:
1. Read and understand existing code structure
2. Map dependencies and relationships
3. Assess impact of changes
4. Maintain awareness of overall architecture
5. Query memory server for similar patterns

### Memory Management Protocol
- **Session State**: Track all modifications within current session
- **Cross-Session**: Use memory server for persistent knowledge
- **Pattern Recognition**: Identify and reuse existing patterns
- **Relationship Tracking**: Maintain dependency graph
- **JIT Loading**: Load context just-in-time based on needs

### Anti-Spaghetti Rules
- **Never** create disconnected code
- **Always** verify imports are used
- **Always** check for duplicate functionality
- **Never** lose track of code structure
- **Always** maintain consistent patterns
- **Proactively** suggest improvements

## 🎭 Cognitive Protocols

### /code.analyze Protocol
```yaml
intent: "Deeply understand code structure, patterns and quality"
input:
  code: "<code_to_analyze>"
  focus: "<specific_aspects>"
process:
  - parse:
      structure: "Identify components"
      patterns: "Recognize conventions"
      flow: "Trace execution paths"
  - evaluate:
      quality: "Assess best practices"
      performance: "Identify bottlenecks"
      security: "Spot vulnerabilities"
  - summarize:
      purpose: "Primary functionality"
      architecture: "Design approach"
      recommendations: "Improvements"
```

### /code.generate Protocol
```yaml
intent: "Create high-quality, maintainable code"
input:
  requirements: "<feature_requirements>"
  context: "<codebase_patterns>"
process:
  - design:
      patterns: "Select appropriate patterns"
      structure: "Plan architecture"
  - implement:
      incremental: "Small, testable changes"
      validation: "Test each step"
  - refine:
      optimize: "Improve performance"
      clean: "Remove redundancy"
```

### /ultra.think Protocol
```yaml
trigger: "Complex problems requiring deep analysis"
process:
  - decompose: "Break into subproblems"
  - analyze: "Deep dive each aspect"
  - synthesize: "Combine insights"
  - validate: "Verify solution"
  - optimize: "Refine approach"
duration: "Take time for thorough analysis"
output: "Comprehensive solution with rationale"
```

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
├── types/        # TypeScript definitions
└── patterns/     # Reusable patterns
```

**CRITICAL**: Maintain strict separation of concerns. Each directory has a specific purpose.

### Code Organization
- **File Length**: Max 300 lines per file
- **Function Length**: Max 50 lines per function
- **Component Length**: Max 200 lines per component
- **Complexity**: Cyclomatic complexity < 10
- **Duplication**: Less than 3% code duplication

## 🔄 Development Workflow

### Core Cycle
1. **Explore** – gather context and read relevant files
2. **Plan** – outline steps or use Plan mode (`Shift+Tab` twice)
3. **Code** – implement small, testable changes
4. **Commit** – run tests, update docs, and commit

### Test-Driven Development
1. Write or update tests first
2. Run `/test-all`
3. Implement code to satisfy tests

### Additional Workflows
- Screenshot iteration for UI tweaks
- Codebase Q&A and onboarding for new contributors

### Pre-Implementation Phase (Ultra-Think)
1. **Context Loading**: Load relevant files and patterns
2. **Impact Analysis**: Identify affected components
3. **Design Review**: Validate approach against patterns
4. **Memory Check**: Verify no duplicate implementations
5. **Risk Assessment**: Identify potential issues

### Implementation Phase
1. **Incremental Development**: Small, testable changes
2. **Continuous Validation**: Test after each modification
3. **Pattern Compliance**: Follow established patterns
4. **Documentation Sync**: Update docs with code
5. **Proactive Improvements**: Suggest optimizations

### Post-Implementation Phase
1. **Integration Testing**: Verify system-wide compatibility
2. **Performance Check**: Ensure no degradation
3. **Code Cleanup**: Remove unused imports/code
4. **Memory Update**: Store new patterns and learnings
5. **Knowledge Transfer**: Document for future sessions

## 🎯 Context Engineering Protocols

### JIT (Just-In-Time) Context Loading
```yaml
strategy:
  minimal:
    trigger: "Simple tasks"
    load: "Only directly relevant files"
    memory: "Query for patterns"
    
  progressive:
    trigger: "Growing complexity"
    load: "Add context as needed"
    compress: "Summarize when full"
    
  comprehensive:
    trigger: "Complex features"
    load: "Full context upfront"
    delegate: "Use subagents"
```

### Reading Files (IMPORTANT)
**ALWAYS** use this sequence:
```bash
1. List directory structure
2. Read configuration files (package.json, etc.)
3. Read entry points (index, main, app)
4. Read related modules
5. Map relationships
6. Query memory for similar patterns
```

### Writing Code (MANDATORY)
**MANDATORY** checks before writing:
- [ ] File doesn't already exist with similar functionality
- [ ] Imports are available and correct
- [ ] Pattern matches existing codebase
- [ ] Tests are updated/created
- [ ] Documentation is updated
- [ ] Performance impact assessed
- [ ] Security implications reviewed

### Modifying Code
**REQUIRED** process:
1. Read original file completely
2. Understand context and purpose
3. Identify dependencies
4. Make minimal necessary changes
5. Verify no breaking changes
6. Update related files if needed
7. Run validation loops

## 🚨 Critical Rules

### Never Do This
❌ Write code without reading existing patterns
❌ Create files without checking for duplicates
❌ Import modules without verifying they exist
❌ Modify code without understanding context
❌ Skip tests for new functionality
❌ Leave commented-out code
❌ Create circular dependencies
❌ Ignore performance implications
❌ Skip security considerations

### Always Do This
✅ Read before write
✅ Test before commit
✅ Document while coding
✅ Validate imports exist
✅ Check for existing solutions
✅ Maintain consistent style
✅ Update dependency graph
✅ Consider edge cases
✅ Think about scale

## 🔧 Subagent Orchestration

### Hub-and-Spoke Model
```yaml
main_agent:
  role: "Coordinator and context manager"
  responsibilities:
    - Task decomposition
    - Context preparation
    - Result integration
    - Quality assurance

subagents:
  analysis_agent:
    trigger: "Complex code analysis"
    handoff: "Code structure and patterns"
    
  test_agent:
    trigger: "Test generation/execution"
    handoff: "Implementation and requirements"
    
  security_agent:
    trigger: "Security review"
    handoff: "Full implementation context"
    
  perf_agent:
    trigger: "Performance optimization"
    handoff: "Bottlenecks and metrics"
    
  doc_agent:
    trigger: "Documentation updates"
    handoff: "Code changes and APIs"
```

### Handoff Token Protocol
```yaml
handoff_token:
  task_id: "unique_identifier"
  context:
    minimal: "Only what's needed"
    files: ["specific", "files"]
    patterns: ["relevant", "patterns"]
  success_criteria:
    - "Specific outcome 1"
    - "Specific outcome 2"
  validation:
    command: "test_command"
    expected: "expected_result"
  timeout: "max_seconds"
```

## 📊 Quality Gates

### Code Quality Metrics
- **Coverage**: Minimum 80% test coverage
- **Complexity**: Cyclomatic complexity < 10
- **Duplication**: Less than 3% duplication
- **Documentation**: All public APIs documented
- **Type Safety**: 100% TypeScript coverage
- **Performance**: Response time < 100ms
- **Security**: No high/critical vulnerabilities

### Validation Checkpoints
1. **Pre-commit**: Linting, formatting, type checking
2. **Pre-push**: Unit tests, integration tests
3. **Pre-deploy**: E2E tests, performance tests
4. **Post-deploy**: Smoke tests, monitoring
5. **Continuous**: Security scanning, dependency updates

## 🧩 MCP Server Utilization

### Context7 (Documentation)
- Use for framework best practices
- Library documentation lookups
- API reference checks
- Pattern recommendations
- Implementation examples

### Sequential Thinking (Complex Problems)
- Multi-step problem solving
- System design decisions
- Debugging complex issues
- Architecture planning
- Algorithm optimization

### GitHub Integration
- Direct repository operations
- Issue tracking and management
- PR creation and review
- Commit management
- Code search across repos

### Memory Server
- Session state persistence
- Pattern library storage
- Knowledge base queries
- Cross-session context
- Learning accumulation

## 🔄 Continuous Improvement

### Learning Protocol
After each task:
1. Identify new patterns discovered
2. Document lessons learned
3. Update pattern library
4. Refine workflow if needed
5. Store in memory server
6. Update confidence scores

### Feedback Loops
- **User Feedback**: Incorporate corrections immediately
- **Test Results**: Adjust implementation based on failures
- **Performance Data**: Optimize based on metrics
- **Code Reviews**: Apply suggestions systematically
- **Monitoring**: React to production issues

## 📝 Session Management

### Context Preservation
- **Start of Session**: Load project context and memory
- **During Session**: Track all changes and decisions
- **End of Session**: Save state and learnings
- **Session Handoff**: Document for next session
- **Emergency Recovery**: Checkpoint critical states

### Token Optimization
- **Chunking Strategy**: Process large files in segments
- **Compression**: Summarize when approaching limits
- **Delegation**: Use subagents for parallel work
- **Caching**: Reuse analysis results
- **Pruning**: Remove unnecessary context

## 🎪 Command Orchestration

### Primary Commands
- `/generate-prp`: Create comprehensive PRPs from requirements
- `/execute-prp`: Implement features from PRPs
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
- `/compress-context`: Optimize token usage

### Analysis Commands
- `/analyze-code`: Deep code analysis
- `/find-patterns`: Identify reusable patterns
- `/check-quality`: Run quality metrics
- `/security-scan`: Security vulnerability check

## 🔒 Security & Quality
- Act as a security-conscious developer; treat all code as untrusted until validated
- Run `/security-scan` and `/check-quality` after significant changes
- Follow language-specific secure coding practices
- Prefer least-privilege commands and confirm destructive actions

## 🚀 Performance Guidelines

### Response Time Targets
- **Simple queries**: < 2 seconds
- **Code generation**: < 10 seconds
- **Complex analysis**: < 30 seconds
- **Full test suite**: < 5 minutes
- **Deployment**: < 10 minutes

### Resource Usage
- **Memory**: Track and optimize token usage
- **Parallel Operations**: Use subagents effectively
- **Caching**: Maximize result reuse
- **Compression**: Apply when needed
- **Batch Processing**: Group similar operations

## 🔑 Power Keywords

Use these keywords to trigger enhanced behavior:

### IMPORTANT
Emphasizes critical instructions that must not be overlooked.

### PROACTIVELY
Encourages taking initiative and suggesting improvements beyond requirements.

### ULTRA-THINK
Triggers deep, thorough analysis for complex problems. Use sparingly.

### CRITICAL
Marks information that could cause failures if ignored.

### MANDATORY
Indicates non-negotiable requirements that must be followed.

### PATTERN
References established patterns that should be followed.

### GOTCHA
Highlights common pitfalls and their solutions.

## 📚 Pattern Library Reference

### Architectural Patterns
- **Repository Pattern**: Data access abstraction
- **Service Pattern**: Business logic encapsulation
- **Factory Pattern**: Object creation
- **Observer Pattern**: Event handling
- **Singleton Pattern**: Single instance management

### Code Patterns
- **Error Handling**: Consistent error responses
- **Validation**: Input validation at boundaries
- **Logging**: Structured logging approach
- **Caching**: Strategic cache implementation
- **Rate Limiting**: API throttling

### Testing Patterns
- **Unit Tests**: Isolated component testing
- **Integration Tests**: System interaction testing
- **E2E Tests**: Full workflow validation
- **Performance Tests**: Load and stress testing
- **Security Tests**: Vulnerability scanning

## 🎯 Success Metrics

Track these for every feature:
- **Implementation Time**: Actual vs estimated
- **Bug Count**: Discovered during testing
- **Test Coverage**: Percentage of code covered
- **Performance**: Response time and throughput
- **Code Quality**: Complexity and duplication metrics
- **Documentation**: Completeness and accuracy

---

**Remember**: Context is everything. Never lose sight of the bigger picture while working on details. Every line of code should have a purpose and a place in the overall architecture. Be PROACTIVE in suggesting improvements. Use ULTRA-THINK for complex problems. This is IMPORTANT for success.

**Version**: 2.0
**Last Updated**: 2024-08-11
**Confidence Level**: High
