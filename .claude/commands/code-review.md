# /code-review

Perform comprehensive AI-powered code review with security, performance, and best practices analysis.

## Usage

```bash
/code-review [options]
```

## Options

- `--pr <n>`: Review specific pull request
- `--files <pattern>`: Review specific files
- `--focus <area>`: Focus area (security, performance, architecture)
- `--severity <level>`: Minimum severity to report (info, warning, error, critical)
- `--autofix`: Automatically fix simple issues

## Review Categories

### 1. Security Review
```yaml
checks:
  - SQL injection vulnerabilities
  - XSS attack vectors
  - Authentication bypass
  - Authorization flaws
  - Sensitive data exposure
  - Insecure dependencies
  - Cryptographic weaknesses
  - CORS misconfigurations
```

### 2. Performance Review
```yaml
checks:
  - N+1 query problems
  - Memory leaks
  - Inefficient algorithms
  - Missing indexes
  - Bundle size issues
  - Render performance
  - Network waterfall
  - Caching opportunities
```

### 3. Code Quality Review
```yaml
checks:
  - Code duplication
  - Cyclomatic complexity
  - Method length
  - Class cohesion
  - Coupling metrics
  - Test coverage
  - Documentation gaps
  - Naming conventions
```

### 4. Architecture Review
```yaml
checks:
  - SOLID violations
  - Pattern misuse
  - Layer violations
  - Circular dependencies
  - God objects
  - Anemic models
  - Missing abstractions
  - Over-engineering
```

## Review Process

### 1. Automated Analysis
```bash
# Run static analysis tools
eslint . --format json
sonarjs . --format json
semgrep --config=auto --json
```

### 2. AI-Powered Review
```javascript
// Analyze code semantics
const issues = [];

// Check for logic errors
if (hasLogicError(code)) {
  issues.push({
    severity: 'error',
    message: 'Potential logic error detected',
    suggestion: 'Consider edge case when...'
  });
}

// Check for performance issues
if (hasPerformanceIssue(code)) {
  issues.push({
    severity: 'warning',
    message: 'Inefficient algorithm detected',
    suggestion: 'Use Map instead of nested loops'
  });
}
```

### 3. Context-Aware Review
```yaml
# Consider project-specific rules
project_rules:
  - No direct database queries in controllers
  - All API responses must be typed
  - Components must have unit tests
  - No magic numbers
  - Error boundaries required
```

## Output Format

### Summary Report
```
==========================================
Code Review Summary
==========================================
Files Reviewed: 42
Total Issues: 23
Critical: 2
High: 5
Medium: 8
Low: 8

Security Score: B+ (85/100)
Performance Score: A- (92/100)
Maintainability: B (82/100)
Test Coverage: 78%
==========================================
```

### Detailed Issues
```markdown
## 🔴 Critical Issues (2)

### 1. SQL Injection Vulnerability
**File**: `src/api/users.js:45`
**Code**:
```javascript
const query = `SELECT * FROM users WHERE id = ${userId}`;
```
**Issue**: Direct string interpolation in SQL query
**Fix**:
```javascript
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

### 2. Hardcoded API Key
**File**: `src/config.js:12`
**Code**:
```javascript
const API_KEY = 'sk-1234567890abcdef';
```
**Issue**: Sensitive credential in source code
**Fix**: Move to environment variable
```

## Review Checklist

### Security
- [ ] No hardcoded credentials
- [ ] Input validation present
- [ ] Output encoding implemented
- [ ] Authentication checks
- [ ] Authorization verified
- [ ] Rate limiting configured
- [ ] HTTPS enforced
- [ ] CORS properly configured

### Performance
- [ ] Database queries optimized
- [ ] Caching implemented
- [ ] Bundle size acceptable
- [ ] Images optimized
- [ ] Lazy loading used
- [ ] Memoization where appropriate
- [ ] No memory leaks
- [ ] Efficient algorithms

### Code Quality
- [ ] DRY principle followed
- [ ] SOLID principles applied
- [ ] Clear naming conventions
- [ ] Functions < 20 lines
- [ ] Classes focused
- [ ] Comments where needed
- [ ] Error handling complete
- [ ] Tests comprehensive

### Documentation
- [ ] README updated
- [ ] API documented
- [ ] Complex logic explained
- [ ] Examples provided
- [ ] Change log updated

## Integration with PR Workflow

### GitHub Integration
```yaml
# .github/workflows/code-review.yml
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: claude /code-review --pr ${{ github.event.number }}
      - uses: actions/upload-artifact@v2
        with:
          name: review-report
          path: review-report.html
```

### Auto-Fix Capability
```bash
# Automatically fix simple issues
/code-review --autofix

# Fixed:
# ✓ Removed console.log statements
# ✓ Added missing semicolons
# ✓ Fixed import order
# ✓ Removed unused variables
# ✓ Applied prettier formatting
```

## Advanced Analysis

### Complexity Metrics
```javascript
{
  "cyclomatic_complexity": {
    "average": 4.2,
    "max": 15,
    "threshold": 10,
    "violations": ["src/utils/parser.js:processData"]
  },
  "cognitive_complexity": {
    "average": 6.8,
    "max": 25,
    "threshold": 20,
    "violations": ["src/core/engine.js:calculate"]
  }
}
```

### Dependency Analysis
```yaml
vulnerabilities:
  critical: 0
  high: 2
  medium: 5
  low: 12

outdated:
  major: 3
  minor: 8
  patch: 15

unused:
  - lodash (imported but not used)
  - moment (consider date-fns)
```

### Test Coverage Analysis
```
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|
All files          |   78.43 |    72.15 |   81.25 |   77.89 |
 src/              |   85.71 |    80.00 |   87.50 |   85.19 |
  index.js         |  100.00 |   100.00 |  100.00 |  100.00 |
  utils.js         |   75.00 |    66.67 |   80.00 |   73.33 |
 src/components/   |   70.59 |    64.29 |   75.00 |   70.37 |
  Button.jsx       |  100.00 |   100.00 |  100.00 |  100.00 |
  Form.jsx         |   41.18 |    28.57 |   50.00 |   40.74 |
```

## Best Practices Enforcement

### Naming Conventions
```javascript
// ❌ Bad
const u = getUserData();
const flag = true;
const temp = calculate();

// ✅ Good
const userData = getUserData();
const isAuthenticated = true;
const calculationResult = calculate();
```

### Function Complexity
```javascript
// ❌ Bad: Too complex
function processData(data) {
  // 50+ lines of nested logic
}

// ✅ Good: Decomposed
function processData(data) {
  const validated = validateData(data);
  const transformed = transformData(validated);
  return formatOutput(transformed);
}
```

### Error Handling
```javascript
// ❌ Bad: Silent failure
try {
  riskyOperation();
} catch (e) {
  // Silent
}

// ✅ Good: Proper handling
try {
  riskyOperation();
} catch (error) {
  logger.error('Operation failed', { error, context });
  throw new OperationError('Failed to complete operation', { cause: error });
}
```

## Review Templates

### Security-Focused Review
```bash
/code-review --focus security --severity high
```

### Performance Audit
```bash
/code-review --focus performance --autofix
```

### Pre-Merge Check
```bash
/code-review --pr current --severity critical
```

## Related Commands

- `/security-scan`: Deep security analysis
- `/performance-profile`: Performance profiling
- `/test-coverage`: Coverage analysis
- `/refactor`: Automated refactoring
