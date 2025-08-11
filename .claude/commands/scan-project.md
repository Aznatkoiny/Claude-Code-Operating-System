# Command: scan-project

Perform comprehensive project analysis to build complete context awareness.

## Usage
```
/scan-project [path] [--depth full|shallow] [--focus area]
```

## Examples
```
/scan-project ./src --depth full
/scan-project ./api --focus architecture
/scan-project . --depth shallow --focus dependencies
```

## Analysis Process

### Phase 1: Structure Discovery
```typescript
const analysis = {
  directories: await scanDirectories(path),
  files: await indexAllFiles(path),
  patterns: await detectPatterns(files),
  architecture: await identifyArchitecture(structure)
};
```

### Phase 2: Dependency Analysis
- Parse all import/require statements
- Build complete dependency graph
- Identify circular dependencies
- Find unused dependencies
- Detect missing dependencies

### Phase 3: Code Quality Assessment
- Calculate complexity metrics
- Measure test coverage
- Find code duplication
- Identify code smells
- Assess technical debt

### Phase 4: Pattern Recognition
- Identify coding patterns
- Detect anti-patterns
- Find inconsistencies
- Document conventions
- Create pattern library

### Phase 5: Context Building
- Create comprehensive context map
- Store in memory server
- Generate documentation
- Create improvement plan

## Output Report

```markdown
# Project Analysis Report

## Overview
- **Project Type**: Full-stack Web Application
- **Architecture**: Microservices with API Gateway
- **Primary Language**: TypeScript (87%), Python (13%)
- **Frameworks**: React, Express, FastAPI
- **Test Coverage**: 73%

## Structure Analysis
### Directories (15 total)
- `/src` - Main application code
- `/api` - Backend services
- `/components` - Reusable UI components
- `/services` - Business logic layer
- `/utils` - Utility functions

### Key Files (247 total)
- Entry Points: 3
- Configurations: 8
- Core Modules: 45
- Tests: 89
- Documentation: 12

## Dependency Graph
### Internal Dependencies
- 156 internal imports
- 3 circular dependencies detected ⚠️
- 12 unused exports found ⚠️

### External Dependencies
- Production: 45 packages
- Development: 23 packages
- Outdated: 7 packages ⚠️
- Security vulnerabilities: 2 high, 5 medium ⚠️

## Code Quality Metrics
### Complexity
- Average Cyclomatic: 4.2 ✅
- Max Cyclomatic: 18 ⚠️ (UserService.processPayment)
- Files over threshold: 8

### Duplication
- Overall: 8.3% ⚠️
- Hotspots: 
  - ValidationUtils (23% duplication)
  - ErrorHandlers (19% duplication)

### Test Coverage
- Statements: 73% ⚠️
- Branches: 68% ⚠️
- Functions: 81% ✅
- Lines: 72% ⚠️

## Pattern Analysis
### Identified Patterns
✅ Repository Pattern (12 implementations)
✅ Service Layer (8 services)
✅ Dependency Injection (throughout)
✅ Error Boundaries (React components)

### Anti-Patterns Detected
❌ God Object: UserService (312 lines)
❌ Callback Hell: PaymentProcessor
❌ Magic Numbers: PricingCalculator
❌ Copy-Paste: ValidationUtils

## Recommendations
### Critical (Fix Immediately)
1. Resolve circular dependencies in auth module
2. Update packages with security vulnerabilities
3. Refactor UserService (too complex)

### High Priority
1. Increase test coverage to 80%
2. Reduce code duplication below 5%
3. Extract magic numbers to constants

### Medium Priority
1. Standardize error handling
2. Implement missing TypeScript types
3. Add integration tests for API

### Low Priority
1. Update documentation
2. Optimize bundle size
3. Add performance monitoring

## Context Saved
✅ Structure map saved to memory
✅ Dependency graph cached
✅ Pattern library created
✅ Metrics baseline established
```

## Options

- `--depth`: 
  - `full`: Complete analysis of all files
  - `shallow`: Quick structural analysis only
  
- `--focus`:
  - `architecture`: Focus on system design
  - `dependencies`: Focus on dependency analysis
  - `performance`: Focus on performance metrics
  - `security`: Focus on security issues
  - `quality`: Focus on code quality

- `--output`: Save report to file
- `--update`: Update existing analysis
- `--compare`: Compare with previous scan

## Integration

After scanning, the context is available for:
- All subagents
- MCP servers
- Future commands
- Memory retrieval

This enables context-aware operations across the entire development workflow.
