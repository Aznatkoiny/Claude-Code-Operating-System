# Security Rules and Best Practices

This file defines security-focused rules for Claude Code to follow when writing code.

## 🔒 Core Security Principles

**MANDATORY**: Act as a security-conscious developer. Every line of code should be written with security in mind.

## 🛡️ Input Validation

### Always Validate
- **Never trust user input** - Always validate and sanitize
- **Use parameterized queries** - Prevent SQL injection
- **Escape output** - Prevent XSS attacks
- **Validate file uploads** - Check type, size, and content
- **Rate limiting** - Implement on all public endpoints

### Validation Patterns
```python
# PATTERN: Input validation at boundaries
def validate_input(data: str) -> str:
    """Always validate at the edge"""
    if not data:
        raise ValidationError("Input required")
    if len(data) > MAX_LENGTH:
        raise ValidationError("Input too long")
    # Sanitize dangerous characters
    sanitized = escape_html(data)
    return sanitized
```

## 🔐 Authentication & Authorization

### Requirements
- Use established libraries (don't roll your own crypto)
- Implement proper session management
- Use secure password hashing (bcrypt, argon2)
- Implement MFA where appropriate
- Follow OWASP authentication guidelines

### Anti-Patterns to Avoid
```python
# ANTI-PATTERN: Don't store passwords in plain text
password = user_input  # NEVER DO THIS

# ANTI-PATTERN: Don't use weak hashing
password_hash = md5(password)  # VULNERABLE

# CORRECT PATTERN:
from argon2 import PasswordHasher
ph = PasswordHasher()
password_hash = ph.hash(password)
```

## 🚨 OWASP Top 10 Checklist

Before implementing any feature, review:

1. **Injection** - Use parameterized queries
2. **Broken Authentication** - Secure session management
3. **Sensitive Data Exposure** - Encrypt in transit and at rest
4. **XML External Entities** - Disable XXE processing
5. **Broken Access Control** - Verify permissions on every request
6. **Security Misconfiguration** - Follow secure defaults
7. **Cross-Site Scripting** - Escape all output
8. **Insecure Deserialization** - Validate serialized objects
9. **Using Components with Known Vulnerabilities** - Keep dependencies updated
10. **Insufficient Logging** - Log security events

## 🔍 Code Review Checklist

### Before Committing
- [ ] No hardcoded secrets or credentials
- [ ] All inputs validated and sanitized
- [ ] SQL queries use parameterization
- [ ] Output properly escaped
- [ ] Authentication checks in place
- [ ] Authorization verified
- [ ] Sensitive data encrypted
- [ ] Error messages don't leak information
- [ ] Dependencies up to date
- [ ] Security headers configured

## 🛠️ Security Tools Integration

### Automated Scanning
```bash
# Run security scan before commit
bandit -r src/  # Python security linting
npm audit      # JavaScript dependency audit
safety check   # Python dependency audit
```

### Git Hooks
```bash
# .git/hooks/pre-commit
#!/bin/bash
# Check for secrets
git secrets --scan
# Run security linter
bandit -r src/
```

## 📝 Secure Coding Patterns

### Environment Variables
```python
# PATTERN: Never hardcode secrets
import os
from dotenv import load_dotenv

load_dotenv()

# CORRECT
API_KEY = os.getenv('API_KEY')
if not API_KEY:
    raise ConfigError("API_KEY not configured")

# ANTI-PATTERN
API_KEY = "hardcoded-secret-key"  # NEVER DO THIS
```

### Error Handling
```python
# PATTERN: Don't leak sensitive information in errors
try:
    authenticate_user(username, password)
except AuthenticationError:
    # Generic error message
    logger.error(f"Authentication failed for user: {username}")
    return {"error": "Invalid credentials"}  # Don't reveal which field is wrong
```

### Database Queries
```python
# PATTERN: Always use parameterized queries
# CORRECT
cursor.execute(
    "SELECT * FROM users WHERE id = %s",
    (user_id,)
)

# ANTI-PATTERN: String concatenation
query = f"SELECT * FROM users WHERE id = {user_id}"  # SQL INJECTION RISK
```

## 🔄 Security in CI/CD

### Pipeline Checks
1. Static Application Security Testing (SAST)
2. Software Composition Analysis (SCA)
3. Secret scanning
4. Container scanning
5. Infrastructure as Code scanning

### Example GitHub Action
```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Run Bandit
        run: |
          pip install bandit
          bandit -r src/
      
      - name: Check for secrets
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
      
      - name: Dependency check
        run: |
          pip install safety
          safety check
```

## 🎯 Security-First Prompting

When implementing features, always:
1. Consider security implications first
2. Identify potential attack vectors
3. Implement defense in depth
4. Follow the principle of least privilege
5. Assume breach and minimize impact

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [SANS Secure Coding](https://www.sans.org/secure-coding/)

## 🚫 Never Do This

- Store passwords in plain text
- Use MD5 or SHA1 for password hashing
- Build SQL queries with string concatenation
- Trust user input without validation
- Expose stack traces to users
- Log sensitive data (passwords, tokens)
- Use eval() or exec() with user input
- Disable security features for convenience
- Ignore security warnings from tools
- Deploy without security review

## ✅ Always Do This

- Validate all inputs
- Use parameterized queries
- Escape all outputs
- Hash passwords properly (Argon2, bcrypt)
- Implement rate limiting
- Use HTTPS everywhere
- Keep dependencies updated
- Log security events
- Review code for security
- Test for common vulnerabilities

---

**Remember**: Security is not optional. Every feature must be secure by design. When in doubt, choose the more secure option.
