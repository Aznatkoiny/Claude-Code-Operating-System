# /commit-smart

Create intelligent git commits using conventional commit format with appropriate emojis and co-authorship attribution.

## Usage

```bash
/commit-smart [options]
```

## Options

- `--fast`: Skip confirmation and use first suggested message
- `--scope <scope>`: Specify commit scope
- `--breaking`: Mark as breaking change
- `--no-emoji`: Skip emoji prefix
- `--co-author`: Include Claude as co-author

## Workflow

1. **Analyze Changes**
   ```bash
   git diff --staged
   git status --short
   ```

2. **Determine Commit Type**
   - feat: ✨ New feature
   - fix: 🐛 Bug fix
   - docs: 📚 Documentation
   - style: 💎 Code style
   - refactor: 🔨 Refactoring
   - perf: ⚡ Performance
   - test: 🚨 Tests
   - chore: 📦 Maintenance
   - ci: 👷 CI/CD
   - security: 🔒 Security fix

3. **Generate Message**
   ```
   <emoji> <type>(<scope>): <subject>
   
   <body>
   
   <footer>
   ```

4. **Include Context**
   - Link to issues: Closes #123
   - Breaking changes: BREAKING CHANGE: description
   - Co-authorship when appropriate

5. **Validation**
   - Subject line < 50 chars
   - Body wrapped at 72 chars
   - Proper capitalization
   - No period at end of subject

## Examples

```bash
# Standard commit
/commit-smart
# Output: ✨ feat(auth): implement OAuth2 integration

# Fast mode
/commit-smart --fast

# With scope
/commit-smart --scope api

# Breaking change
/commit-smart --breaking
```

## Integration with CI/CD

```yaml
# .github/workflows/commit-check.yml
- name: Validate commit message
  run: |
    if ! git log -1 --pretty=%B | grep -qE '^(✨|🐛|📚|💎|🔨|⚡|🚨|📦|👷|🔒)'; then
      echo "Invalid commit format"
      exit 1
    fi
```

## Best Practices

1. **Atomic Commits**: One logical change per commit
2. **Clear History**: Squash related commits before merge
3. **Meaningful Messages**: Explain why, not just what
4. **Consistent Format**: Always use conventional commits
5. **Reference Issues**: Link to related tickets

## Advanced Features

### Batch Commits
```bash
# Stage and commit related changes separately
git add -p
/commit-smart
```

### Smart Grouping
```bash
# Automatically group related files
/commit-smart --auto-group
```

### Template Integration
```bash
# Use project-specific template
/commit-smart --template .gitmessage
```

## Error Handling

- If changes are too complex: Suggest splitting
- If no staged changes: Stage files first
- If commit would be too large: Recommend chunking

## Related Commands

- `/commit-fast`: Quick commits without review
- `/fix-commit`: Amend last commit
- `/squash-commits`: Combine multiple commits
