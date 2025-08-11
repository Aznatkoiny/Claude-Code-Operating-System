# Generate PRP (Product Requirements Prompt)

## Feature file: $ARGUMENTS

Generate a comprehensive PRP for feature implementation with thorough research and context engineering best practices.

## 🧠 Ultra-Think Protocol

**IMPORTANT**: Before generating the PRP, engage in deep analysis:
1. Understand the feature request completely
2. Map all dependencies and integration points
3. Identify potential pitfalls and edge cases
4. Research best practices and patterns
5. Plan validation strategy

## 📚 Research Process

### 1. **Codebase Analysis**
```yaml
tasks:
  - Search for similar features/patterns
  - Identify files to reference in PRP
  - Note existing conventions to follow
  - Check test patterns for validation
  - Map dependency graph
  - Analyze impact on existing code
```

### 2. **External Research**
```yaml
sources:
  - Library documentation (include specific URLs)
  - Implementation examples (GitHub/StackOverflow)
  - Best practices and anti-patterns
  - Performance considerations
  - Security implications
```

### 3. **Context Engineering**
```yaml
context_loading:
  - JIT (Just-In-Time): Load only relevant context
  - Pattern matching: Find reusable patterns
  - Memory check: Query memory server for prior solutions
  - Example gathering: Collect relevant code examples
```

## 🎯 PRP Generation Framework

### Critical Context to Include
```yaml
documentation:
  - urls: [Specific documentation sections]
  - code_examples: [Real snippets from codebase]
  - gotchas: [Library quirks, version issues]
  - patterns: [Existing approaches to follow]
  - anti_patterns: [What to avoid and why]
```

### Implementation Blueprint Structure
```yaml
blueprint:
  1_requirements:
    - Clear goal statement
    - Success criteria (measurable)
    - User stories and acceptance criteria
    
  2_context:
    - Current codebase tree
    - Desired codebase tree
    - Integration points
    - Dependencies
    
  3_data_models:
    - ORM models
    - Pydantic schemas
    - Type definitions
    - Validation rules
    
  4_task_list:
    - Ordered implementation steps
    - Per-task pseudocode
    - File modifications
    - Pattern references
    
  5_validation_gates:
    - Syntax checking
    - Unit tests
    - Integration tests
    - Performance tests
```

### Validation Loop Design
```bash
# Level 1: Syntax & Style
ruff check --fix && mypy .

# Level 2: Unit Tests
pytest tests/ -v --cov=src --cov-report=term-missing

# Level 3: Integration Tests
./scripts/integration_test.sh

# Level 4: Quality Gates
- Coverage > 80%
- Complexity < 10
- No security vulnerabilities
- Performance benchmarks pass
```

## 🔄 JIT Context Loading Pattern

```yaml
context_strategy:
  minimal:
    - Load only task-specific files
    - Use memory server for patterns
    - Reference documentation URLs
    
  progressive:
    - Start with core context
    - Expand as needed
    - Compress when approaching limits
    
  delegation:
    - Identify subtasks for agents
    - Prepare agent-specific context
    - Define handoff tokens
```

## 📝 PRP Template Usage

Use `PRPs/templates/prp_base_v3.md` as foundation with enhancements:

### Enhanced Sections
1. **Goal & Why**: Business value and user impact
2. **Context Loading**: JIT strategy with specific files
3. **Gotchas Database**: Known issues and workarounds
4. **Implementation Tasks**: Detailed step-by-step with validation
5. **Testing Strategy**: Comprehensive test coverage
6. **Rollback Plan**: How to revert if issues arise
7. **Performance Targets**: Specific metrics to achieve
8. **Security Checklist**: OWASP considerations

## 🚀 Output Generation

### File Structure
```
PRPs/
├── {feature-name}.md          # Main PRP document
├── context/
│   ├── examples.md            # Relevant code examples
│   ├── patterns.md            # Patterns to follow
│   └── gotchas.md            # Known issues
└── validation/
    ├── test_plan.md          # Test strategy
    └── checklist.md          # Quality checklist
```

### Quality Scoring
Rate the PRP on multiple dimensions (1-10):
- **Completeness**: All necessary context included
- **Clarity**: Clear implementation path
- **Testability**: Validation gates executable
- **Reusability**: Patterns documented for future
- **Risk Mitigation**: Edge cases addressed

### Confidence Score
```yaml
confidence_calculation:
  factors:
    - context_completeness: 0.3
    - pattern_matching: 0.2
    - test_coverage: 0.2
    - documentation: 0.15
    - risk_assessment: 0.15
  
  score: weighted_average(factors)
  threshold: 7.5  # Minimum for one-pass success
```

## 🎪 Handoff Protocol

When delegating to subagents:
```yaml
handoff_token:
  task_id: unique_identifier
  context: minimal_required_context
  success_criteria: measurable_outcomes
  validation: test_commands
  timeout: max_execution_time
```

## ✅ Final Checklist

Before saving PRP:
- [ ] All context sources documented
- [ ] Implementation path crystal clear
- [ ] Validation gates executable
- [ ] Pattern references included
- [ ] Gotchas and edge cases covered
- [ ] Performance targets defined
- [ ] Security considerations addressed
- [ ] Rollback strategy documented
- [ ] Confidence score > 7.5

## 📊 Success Metrics

Track these for continuous improvement:
- **One-pass success rate**: Target > 80%
- **Time to implementation**: Baseline and improve
- **Bug discovery rate**: During validation gates
- **Pattern reuse**: Percentage of reused code
- **Context efficiency**: Tokens used vs needed

---

**Remember**: The goal is one-pass implementation success through comprehensive context engineering. Every piece of information should serve a purpose in enabling the AI to succeed autonomously.
