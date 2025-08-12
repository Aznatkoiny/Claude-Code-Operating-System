# /context-prime

Prime Claude with comprehensive project understanding by loading repository structure, dependencies, patterns, and establishing collaboration parameters.

## Usage

```bash
/context-prime [options]
```

## Options

- `--deep`: Perform deep analysis including all files
- `--focus <area>`: Focus on specific area (frontend, backend, api, etc.)
- `--session <name>`: Load previous session context
- `--patterns`: Extract and document patterns
- `--dependencies`: Analyze dependency tree

## Workflow

### 1. Repository Structure Analysis

```bash
# Map project structure
tree -I 'node_modules|dist|build|coverage' -L 3

# Identify key directories
- Source code locations
- Test directories
- Configuration files
- Documentation paths
- Build outputs
```

### 2. Technology Stack Detection

```javascript
// Analyze package.json / requirements.txt / go.mod
{
  "languages": ["TypeScript", "Python", "Go"],
  "frameworks": ["React", "FastAPI", "Gin"],
  "testing": ["Jest", "Pytest", "Testify"],
  "tools": ["ESLint", "Black", "Golangci-lint"],
  "databases": ["PostgreSQL", "Redis"],
  "infrastructure": ["Docker", "Kubernetes", "Terraform"]
}
```

### 3. Pattern Recognition

```yaml
identified_patterns:
  architecture:
    - Clean Architecture
    - Microservices
    - Event-Driven
  
  code_patterns:
    - Repository Pattern
    - Factory Pattern
    - Observer Pattern
  
  testing_patterns:
    - AAA (Arrange-Act-Assert)
    - Test Data Builders
    - Mocking Strategies
```

### 4. Dependency Analysis

```bash
# Frontend dependencies
npm list --depth=0
npm audit

# Backend dependencies
pip list
safety check

# Check for vulnerabilities
npm audit
snyk test
```

### 5. Configuration Loading

```bash
# Load environment variables
cat .env.example

# Load CI/CD configuration
cat .github/workflows/*.yml
cat .gitlab-ci.yml

# Load Docker configuration
cat docker-compose.yml
cat Dockerfile
```

### 6. Code Style & Standards

```javascript
// Extract from linting configs
{
  "eslint": ".eslintrc.json",
  "prettier": ".prettierrc",
  "typescript": "tsconfig.json",
  "python": "pyproject.toml",
  "editorconfig": ".editorconfig"
}
```

### 7. API Surface Mapping

```typescript
// Identify API endpoints
interface APIMap {
  REST: {
    users: ["GET /users", "POST /users", "PUT /users/:id"],
    auth: ["POST /login", "POST /logout", "POST /refresh"]
  },
  GraphQL: {
    queries: ["users", "user", "profile"],
    mutations: ["createUser", "updateUser", "deleteUser"]
  },
  WebSocket: {
    events: ["connect", "message", "disconnect"]
  }
}
```

### 8. Database Schema Understanding

```sql
-- Extract schema information
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public';

-- Identify relationships
SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY';
```

### 9. Testing Infrastructure

```bash
# Identify test structure
find . -name "*.test.*" -o -name "*_test.*" -o -name "test_*" | head -20

# Check coverage configuration
cat jest.config.js
cat .coveragerc
cat coverage.yml
```

### 10. Documentation Scan

```bash
# Find documentation
find . -name "*.md" -not -path "./node_modules/*" | head -20

# Check for API documentation
ls docs/
cat README.md
cat CONTRIBUTING.md
```

## Context Storage Format

```yaml
project_context:
  name: "Project Name"
  version: "1.0.0"
  description: "Project description"
  
  structure:
    src_path: "./src"
    test_path: "./tests"
    docs_path: "./docs"
  
  stack:
    primary_language: "TypeScript"
    frameworks: ["React", "Express"]
    databases: ["PostgreSQL"]
  
  patterns:
    architecture: "Clean Architecture"
    testing: "TDD"
    deployment: "CI/CD with GitHub Actions"
  
  conventions:
    commit_format: "conventional"
    branch_naming: "feature/*, bugfix/*, hotfix/*"
    code_style: "Prettier + ESLint"
  
  team:
    size: 5
    timezone: "UTC"
    communication: "Slack"
  
  priorities:
    - Performance
    - Security
    - Maintainability
```

## Memory Integration

```bash
# Save context for future sessions
echo "$PROJECT_CONTEXT" > .claude/context/$(date +%Y%m%d).json

# Load previous context
/context-prime --session 20240101

# Merge contexts
/context-prime --merge previous-session
```

## Pattern Extraction

```javascript
// Automatically identify and document patterns
const patterns = {
  errorHandling: "centralized error middleware",
  authentication: "JWT with refresh tokens",
  validation: "Joi schemas",
  logging: "Winston with correlation IDs",
  caching: "Redis with TTL",
  rateLimit: "Token bucket algorithm"
};
```

## Collaboration Parameters

```yaml
collaboration:
  working_hours: "9 AM - 5 PM EST"
  code_review: "required for all PRs"
  testing: "minimum 80% coverage"
  documentation: "JSDoc for public APIs"
  deployment: "automated on main branch"
  communication:
    urgent: "@mention in Slack"
    normal: "GitHub issues"
    questions: "discussions"
```

## Performance Baseline

```javascript
// Capture current performance metrics
{
  "build_time": "45s",
  "test_suite": "3m 20s",
  "bundle_size": "1.2 MB",
  "lighthouse_score": 95,
  "api_response_time": "< 200ms p95"
}
```

## Security Posture

```yaml
security:
  authentication: "OAuth2 + JWT"
  authorization: "RBAC"
  encryption: "AES-256"
  secrets_management: "HashiCorp Vault"
  scanning: "Snyk + SAST"
  compliance: ["SOC2", "GDPR"]
```

## Integration Points

```javascript
// External services and APIs
{
  "payment": "Stripe API",
  "email": "SendGrid",
  "storage": "AWS S3",
  "cdn": "CloudFlare",
  "monitoring": "DataDog",
  "analytics": "Mixpanel"
}
```

## Output Format

After running `/context-prime`, Claude will have:

1. **Complete project understanding**
2. **Technology stack awareness**
3. **Code style knowledge**
4. **Testing requirements**
5. **Security considerations**
6. **Performance baselines**
7. **Team workflows**
8. **Documentation standards**

## Best Practices

1. **Run at session start**: Prime context before beginning work
2. **Update regularly**: Re-prime when project structure changes
3. **Focus when needed**: Use --focus for specific area work
4. **Save sessions**: Store context for handoffs
5. **Document patterns**: Update CLAUDE.md with discoveries

## Related Commands

- `/scan-project`: Deep project analysis
- `/load-context`: Load saved context
- `/save-context`: Save current context
- `/patterns`: Extract code patterns
- `/dependencies`: Analyze dependencies
