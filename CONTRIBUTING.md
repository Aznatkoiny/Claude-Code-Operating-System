# Contributing to Claude Code OS

Thank you for your interest in contributing to Claude Code OS! This project aims to solve the fundamental problem of context loss in AI-assisted development.

## 🎯 Our Mission

Eliminate spaghetti code in LLM-assisted development through persistent context engineering, memory management, and intelligent orchestration.

## 🤝 How to Contribute

### 1. Types of Contributions We Welcome

- **Subagents**: New specialized agents for specific domains
- **Commands**: Custom slash commands for common workflows
- **Patterns**: Proven code patterns for the pattern library
- **MCP Servers**: Integration with new MCP servers
- **Hooks**: Automation scripts for development workflows
- **Documentation**: Improvements to guides and examples
- **Bug Fixes**: Issues in existing components
- **Performance**: Optimizations for token usage and speed

### 2. Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/[your-username]/claude-code-os.git
   cd claude-code-os
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing patterns and conventions
   - Maintain the quality standards
   - Add documentation for new features

4. **Test your changes**
   ```bash
   # Test with Claude Code
   claude
   /init-os
   # Test your specific feature
   ```

5. **Submit a Pull Request**
   - Clear description of changes
   - Link to any related issues
   - Include examples if applicable

## 📝 Contribution Guidelines

### For Subagents

Place new subagents in `.claude/agents/`:
```markdown
---
name: your-agent-name
description: Clear description of when this agent should be used. Use PROACTIVELY for automatic activation.
tools: Read, Write, Edit  # Only required tools
---

[Agent prompt and instructions]
```

### For Commands

Place new commands in `.claude/commands/`:
```markdown
# Command: your-command

Description of what the command does.

## Usage
/your-command [arguments] [--flags]

## Workflow
[Step-by-step workflow]
```

### For Patterns

Add patterns to `context/patterns/README.md`:
- Include clear use cases
- Provide working examples
- Document anti-patterns
- Explain when to use/not use

### For Hooks

Place hooks in `.claude/hooks/`:
- Make scripts executable
- Use clear error messages
- Return proper JSON responses
- Document requirements

## 🎨 Code Style

### General Principles
- **Clarity over cleverness**
- **Explicit over implicit**
- **Consistency over personal preference**

### Specific Guidelines
- Max file length: 300 lines
- Max function length: 50 lines
- Clear, descriptive naming
- Comprehensive comments
- Proper error handling

## 🧪 Testing

### Required Tests
- Unit tests for new functionality
- Integration tests for commands
- Validation for patterns
- Performance benchmarks for optimizations

### Test Structure
```typescript
describe('Feature', () => {
  it('should perform expected behavior', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## 📚 Documentation

### Every PR Must Include
- Updated README if adding features
- JSDoc/docstrings for code
- Examples for new patterns
- Usage instructions for commands

### Documentation Style
- Clear and concise
- Include examples
- Explain the "why" not just "what"
- Update table of contents

## 🐛 Reporting Issues

### Before Creating an Issue
1. Check existing issues
2. Verify you're using latest version
3. Try with clean installation

### Issue Template
```markdown
**Description**: Clear description of the issue
**Steps to Reproduce**: 
1. Step one
2. Step two
**Expected Behavior**: What should happen
**Actual Behavior**: What actually happens
**Environment**: Claude Code version, OS, etc.
```

## 💡 Feature Requests

### Proposal Template
```markdown
**Problem**: What problem does this solve?
**Solution**: How would it work?
**Alternatives**: Other approaches considered
**Impact**: Who benefits and how?
```

## 🔄 Pull Request Process

1. **Update documentation** for any changed functionality
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update the README** with new features
5. **Request review** from maintainers
6. **Address feedback** promptly
7. **Celebrate** when merged! 🎉

## 🏗️ Project Structure

```
claude-code-os/
├── .claude/          # Claude Code configuration
├── context/          # Context engineering core
├── docs/            # Documentation
├── examples/        # Example implementations
└── tests/           # Test suites
```

## 🤔 Questions?

- Open a discussion in GitHub Discussions
- Ask in issues with the "question" label
- Contribute to documentation to help others

## 🙏 Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## 📜 Code of Conduct

### Be Respectful
- Welcome newcomers
- Be patient with questions
- Respect different viewpoints

### Be Collaborative
- Share knowledge
- Help others learn
- Build on each other's ideas

### Be Professional
- Keep discussions technical
- Avoid personal attacks
- Focus on the code, not the coder

## 🚀 Getting Help

- **Documentation**: Read the docs first
- **Examples**: Check example implementations
- **Issues**: Search existing issues
- **Discussions**: Ask in GitHub Discussions

Thank you for helping make Claude Code OS better! Every contribution, no matter how small, helps build a better development experience for everyone.
