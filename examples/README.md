# Examples Directory

This directory contains code patterns and examples that Claude Code should follow when implementing features. These examples serve as the foundation for pattern recognition and reuse.

## Directory Structure

```
examples/
├── patterns/           # Architectural patterns
│   ├── repository/    # Repository pattern examples
│   ├── service/       # Service layer patterns
│   ├── factory/       # Factory pattern examples
│   └── observer/      # Event handling patterns
├── api/               # API endpoint patterns
│   ├── rest/          # RESTful API examples
│   ├── graphql/       # GraphQL examples
│   └── websocket/     # WebSocket patterns
├── testing/           # Test patterns
│   ├── unit/          # Unit test examples
│   ├── integration/   # Integration test examples
│   └── e2e/          # End-to-end test examples
├── security/          # Security patterns
│   ├── auth/          # Authentication examples
│   ├── validation/    # Input validation patterns
│   └── encryption/    # Data encryption examples
└── performance/       # Performance patterns
    ├── caching/       # Cache implementation
    ├── optimization/  # Code optimization
    └── async/         # Async patterns
```

## How to Use These Examples

### For Claude Code

When implementing new features, Claude Code should:

1. **Pattern Recognition**: First check if a similar pattern exists here
2. **Pattern Application**: Apply the pattern with necessary modifications
3. **Consistency**: Maintain the same style and structure
4. **Documentation**: Reference which pattern was used

### Pattern Selection

Choose patterns based on:
- **Similarity**: How closely the example matches your needs
- **Complexity**: Start with simpler patterns when possible
- **Performance**: Consider performance implications
- **Maintainability**: Choose patterns that are easy to maintain

## Key Patterns

### Repository Pattern
Located in `patterns/repository/`
- Abstracts data access logic
- Provides consistent interface
- Enables easy testing via mocks

### Service Pattern
Located in `patterns/service/`
- Encapsulates business logic
- Separates concerns
- Promotes reusability

### Error Handling
Located throughout examples
- Consistent error responses
- Proper error propagation
- User-friendly messages

### Testing Patterns
Located in `testing/`
- Comprehensive test coverage
- Mock strategies
- Test data factories

## Best Practices Demonstrated

1. **Type Safety**: All examples use TypeScript/type hints
2. **Error Handling**: Proper try-catch and error propagation
3. **Documentation**: Clear comments and docstrings
4. **Performance**: Optimized queries and caching
5. **Security**: Input validation and sanitization

## Adding New Examples

When adding new examples:
1. Place in appropriate category
2. Include comprehensive comments
3. Add tests demonstrating usage
4. Update this README
5. Consider edge cases

## Example Template

Each example should include:
```python
"""
Pattern: [Pattern Name]
Purpose: [What this pattern solves]
When to use: [Scenarios where this applies]
Gotchas: [Common pitfalls to avoid]
"""

# Implementation with clear comments
# Test cases demonstrating usage
# Documentation of design decisions
```

## Anti-Patterns

Also included are examples of what NOT to do:
- Common mistakes to avoid
- Performance anti-patterns
- Security vulnerabilities
- Code smells

These are clearly marked with `# ANTI-PATTERN: Don't do this`

---

Remember: These examples are the source of truth for how code should be written in this project. When in doubt, follow the patterns demonstrated here.
