# Execute PRP (Product Requirements Prompt)

## PRP File: $ARGUMENTS

Execute a comprehensive PRP with validation loops and iterative refinement.

## 🎯 Execution Strategy

**IMPORTANT**: The goal is autonomous implementation with self-validation and correction.

### Pre-Execution Checklist
```yaml
verify:
  - PRP file exists and is complete
  - All referenced documentation accessible
  - Required tools and dependencies available
  - Memory server connected
  - Subagents ready if needed
```

## 📖 Context Loading Phase

### 1. Load PRP Content
```yaml
steps:
  - Read entire PRP document
  - Parse success criteria
  - Extract validation gates
  - Identify referenced files
  - Load pattern examples
```

### 2. JIT Context Loading
```yaml
strategy:
  initial:
    - Load only files mentioned in PRP
    - Query memory for similar implementations
    - Prepare workspace
    
  progressive:
    - Load additional context as needed
    - Use token budget wisely
    - Compress/summarize when needed
```

## 🔨 Implementation Phase

### Task Execution Loop
```yaml
for_each_task:
  1_prepare:
    - Load task-specific context
    - Review referenced patterns
    - Check for existing similar code
    
  2_implement:
    - Follow pseudocode blueprint
    - Apply patterns from examples
    - Handle edge cases mentioned
    
  3_validate:
    - Run task-specific tests
    - Check against success criteria
    - Fix any issues found
    
  4_checkpoint:
    - Save progress to memory
    - Update task status
    - Log decisions made
```

### Proactive Improvements
While implementing, **proactively**:
- Suggest better approaches if found
- Identify missing edge cases
- Recommend performance optimizations
- Flag security concerns
- Update documentation

## 🧪 Validation Loop Protocol

### Level 1: Syntax & Style
```bash
# Auto-fix what's possible
ruff check --fix

# Type checking
mypy .

# If errors: READ, UNDERSTAND, FIX
# Never skip or mock to pass
```

### Level 2: Unit Tests
```bash
# Run tests for new features
pytest tests/ -v --cov

# If failing:
# 1. Read error message
# 2. Understand root cause
# 3. Fix the actual issue
# 4. Re-run until passing
```

### Level 3: Integration Tests
```bash
# Test the full flow
./scripts/integration_test.sh

# Verify endpoints/features work
# Check logs for errors
# Validate expected behavior
```

### Level 4: Quality Gates
```yaml
mandatory_checks:
  - coverage: ">= 80%"
  - complexity: "< 10"
  - security: "no vulnerabilities"
  - performance: "meets targets"
  - documentation: "complete"
```

## 🔄 Iterative Refinement

### Failure Recovery Protocol
```yaml
on_test_failure:
  attempt: 1
  steps:
    - Analyze error message
    - Identify root cause
    - Apply targeted fix
    - Re-run validation
    
  attempt: 2
  steps:
    - Review implementation approach
    - Check against patterns
    - Refactor if needed
    - Re-run validation
    
  attempt: 3
  steps:
    - Delegate to specialized subagent
    - Provide full context
    - Incorporate solution
    - Final validation
```

### Subagent Delegation
When to delegate:
```yaml
triggers:
  - Complex debugging after 2 attempts
  - Performance optimization needed
  - Security review required
  - Architecture decisions
  - Test generation
```

Handoff protocol:
```yaml
handoff:
  context:
    - Current implementation
    - Error messages
    - Attempted solutions
    - Success criteria
  
  expected_output:
    - Fixed implementation
    - Explanation of changes
    - Additional tests if needed
```

## 📊 Progress Tracking

### Status Updates
Provide regular updates:
```markdown
## Task 1/5: Database Schema
✅ Schema created
✅ Migrations written
✅ Tests passing
⏳ Documentation updating...

## Overall Progress: 60%
- Implementation: 80% complete
- Testing: 40% complete
- Documentation: 20% complete
```

### Decision Log
Document key decisions:
```yaml
decision_log:
  - choice: "Used async pattern"
    reason: "Better performance for I/O operations"
    alternatives: ["sync with threading", "multiprocessing"]
    
  - choice: "Separate validation module"
    reason: "Reusability across features"
    impact: "Cleaner architecture"
```

## 🎬 Completion Protocol

### Final Validation
```yaml
checklist:
  - [ ] All tasks completed
  - [ ] All tests passing
  - [ ] Coverage targets met
  - [ ] Documentation updated
  - [ ] Code reviewed for quality
  - [ ] Performance targets achieved
  - [ ] Security scan clean
  - [ ] Integration verified
```

### Deliverables
```yaml
outputs:
  code:
    - New features implemented
    - Tests written
    - Documentation updated
    
  artifacts:
    - Test results
    - Coverage report
    - Performance metrics
    
  knowledge:
    - Patterns discovered
    - Issues encountered
    - Solutions applied
    - Saved to memory server
```

### Success Report
```markdown
## PRP Execution Complete ✅

### Implemented Features
- [List of completed features]

### Test Results
- Unit Tests: X/X passing
- Integration Tests: Y/Y passing
- Coverage: Z%

### Performance
- Response time: Xms (target: Yms)
- Memory usage: XMB (target: YMB)

### Lessons Learned
- [Key insights for future]

### Recommended Next Steps
- [Suggested improvements]
```

## 🚨 Error Handling

### Common Issues & Solutions
```yaml
token_limit:
  problem: "Approaching context limit"
  solution: 
    - Compress previous responses
    - Delegate to subagent
    - Use memory server for storage
    
test_failures:
  problem: "Tests consistently failing"
  solution:
    - Review test requirements
    - Check for environment issues
    - Validate test data
    
dependency_conflicts:
  problem: "Package version conflicts"
  solution:
    - Review requirements.txt
    - Use compatible versions
    - Update PRP if needed
```

## 💾 Memory Management

### Session Persistence
```yaml
save_to_memory:
  - Implementation decisions
  - Patterns used
  - Problems encountered
  - Solutions applied
  - Test strategies
  - Performance optimizations
```

### Pattern Library Update
```yaml
patterns_discovered:
  - New patterns to document
  - Improvements to existing
  - Anti-patterns to avoid
  - Reusable components
```

## ✅ Post-Execution

### Cleanup
```yaml
tasks:
  - Remove temporary files
  - Update task tracking
  - Commit changes
  - Update documentation index
  - Clear unnecessary context
```

### Handoff Notes
For next session or team member:
```markdown
## Implementation Summary
- What was built
- Key decisions made
- Outstanding items
- Known issues
- Suggested improvements
```

---

**Remember**: Autonomous execution with self-correction is the goal. Use validation loops to ensure quality. Never skip tests or mock to pass. Document everything for future context.
