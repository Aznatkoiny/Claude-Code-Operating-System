# Security Scan Command

Run comprehensive security audit on the codebase.

## Execution

The security scan performs multiple checks:

1. **Dependency Scanning**
   - npm audit (Node.js)
   - pip audit (Python)
   - safety check (Python)
   - snyk test (if available)

2. **Static Analysis (SAST)**
   - semgrep with auto configuration
   - bandit for Python code
   - ESLint security plugin for JavaScript

3. **Secret Detection**
   - Check for hardcoded credentials
   - API key detection
   - Environment variable validation

4. **OWASP Compliance**
   - XSS vulnerability check
   - SQL injection detection
   - CSRF protection verification
   - Authentication/authorization audit

5. **Security Headers**
   - CSP validation
   - CORS configuration
   - HTTPS enforcement

## Process

```bash
# 1. Dependency vulnerabilities
echo "🔍 Scanning dependencies..."

if [ -f package.json ]; then
    npm audit --json > security-report-npm.json
    echo "Node.js dependencies scanned"
fi

if [ -f requirements.txt ] || [ -f Pipfile ]; then
    pip-audit --format json > security-report-pip.json
    safety check --json > security-report-safety.json
    echo "Python dependencies scanned"
fi

# 2. Static analysis
echo "🔍 Running static analysis..."

semgrep --config=auto --json -o security-report-semgrep.json .

if [ -d "*.py" ]; then
    bandit -r . -f json -o security-report-bandit.json
fi

# 3. Secret detection
echo "🔍 Checking for secrets..."

# Check for common patterns
grep -r "api[_-]key\|secret\|password\|token" --include="*.js" --include="*.py" --include="*.env*" . > potential-secrets.txt

# 4. Generate report
echo "📊 Generating security report..."
```

## Output

Creates comprehensive security report with:
- Critical vulnerabilities (must fix immediately)
- High priority issues (fix before deployment)
- Medium priority issues (fix in next sprint)
- Low priority issues (track for future)
- Recommendations for improvement

## Remediation

For each issue found:
1. Understand the vulnerability
2. Apply recommended fix
3. Test the fix doesn't break functionality
4. Re-run scan to verify resolution

## Integration

Add to pre-commit hooks:
```yaml
repos:
  - repo: local
    hooks:
      - id: security-scan
        name: Security Scan
        entry: claude /security-scan
        language: system
        pass_filenames: false
```

Add to CI/CD pipeline:
```yaml
security:
  stage: test
  script:
    - claude -p /security-scan
  artifacts:
    reports:
      security: security-report-*.json
```

## CRITICAL Security Rules

**NEVER**:
- Commit secrets or credentials
- Use eval() or exec() with user input
- Store passwords in plain text
- Skip authentication checks
- Ignore security warnings

**ALWAYS**:
- Validate and sanitize all inputs
- Use parameterized queries
- Implement rate limiting
- Encrypt sensitive data
- Keep dependencies updated

---

**Remember**: Security is not optional. Every vulnerability is a potential breach.
