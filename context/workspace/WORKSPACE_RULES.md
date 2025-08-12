# Workspace Management

Follow strict workspace isolation to prevent unintended changes to production code.

## 🏗️ Workspace Structure

```
project/
├── claude-workspace/     # Isolated Claude workspace
│   ├── .claude/         # Claude configuration
│   ├── src/            # Working code copy
│   ├── tests/          # Test files
│   └── scratch/        # Temporary files
├── main/               # Production code (read-only for Claude)
└── backups/           # Automatic backups
```

## 🔒 Isolation Rules

### MANDATORY Setup
1. **Create isolated workspace**
   ```bash
   mkdir claude-workspace
   cd claude-workspace
   cp -r ../main/src ./src  # Copy code to work on
   ```

2. **Set environment variables**
   ```bash
   export CLAUDE_WORKSPACE=$(pwd)
   export PATH="$CLAUDE_WORKSPACE/bin:$PATH"
   ```

3. **Configure permissions**
   - Read-only access to main codebase
   - Write access only in workspace
   - No direct production modifications

## 📁 Directory Conventions

### Working Directories
```yaml
claude-workspace/:
  purpose: "Active development"
  permissions: "read-write"
  
scratch/:
  purpose: "Temporary files, planning"
  permissions: "read-write"
  cleanup: "After each session"
  
examples/:
  purpose: "Reference patterns"
  permissions: "read-only"
```

### Protected Directories
```yaml
main/:
  purpose: "Production code"
  permissions: "read-only"
  access: "Copy to workspace first"
  
.git/:
  purpose: "Version control"
  permissions: "restricted"
  access: "Through git commands only"
```

## 🔄 Workflow Pattern

### Safe Development Cycle
1. **Initialize workspace**
   ```bash
   /init-workspace
   ```

2. **Copy files to work on**
   ```bash
   cp ../main/src/feature.py ./src/
   ```

3. **Make changes in workspace**
   - All edits in claude-workspace/
   - Test thoroughly
   - Validate changes

4. **Review and merge**
   ```bash
   # Review changes
   diff ./src/feature.py ../main/src/feature.py
   
   # If approved, copy back
   cp ./src/feature.py ../main/src/
   ```

5. **Clean up**
   ```bash
   /cleanup-workspace
   ```

## 🛡️ Safety Mechanisms

### Auto-backup
```bash
# Before any modification
backup_file() {
    cp "$1" "../backups/$(basename $1).$(date +%s).bak"
}
```

### Change tracking
```bash
# Track all modifications
git init
git add -A
git commit -m "Workspace initialized"
```

### Rollback capability
```bash
# Restore from backup
restore_file() {
    latest_backup=$(ls -t ../backups/$1.*.bak | head -1)
    cp "$latest_backup" "$1"
}
```

## 📝 Scratch Pad Usage

### Planning Files
```
scratch/
├── plan.md           # Current task plan
├── checklist.md      # Task checklist
├── notes.md          # Session notes
└── context.md        # Context tracking
```

### Template: plan.md
```markdown
# Task Plan

## Objective
[What we're building]

## Steps
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Context Files
- src/file1.py
- src/file2.py

## Success Criteria
- Tests pass
- No regressions
- Performance maintained
```

## 🚫 Never Do This

- Work directly in production directories
- Modify .git directory contents
- Delete files without backup
- Skip workspace initialization
- Mix production and development

## ✅ Always Do This

- Use isolated workspace
- Backup before changes
- Test in workspace first
- Review changes before merging
- Clean up after sessions
- Document workspace state

## 🔧 Workspace Commands

### /init-workspace
Initialize clean workspace with proper structure

### /sync-workspace
Sync workspace with main codebase (read-only)

### /backup-workspace
Create full workspace backup

### /cleanup-workspace
Clean temporary files and reset

### /workspace-status
Show current workspace state and changes

## 📊 Workspace Monitoring

### Token Usage
```bash
# Monitor context size
/show-context-size

# Alert when approaching limit
if [ $CONTEXT_SIZE -gt 80000 ]; then
    echo "WARNING: Approaching context limit"
    /compact
fi
```

### Change Tracking
```bash
# Show all changes
git status
git diff

# List modified files
find . -newer ../workspace.lock -type f
```

## 🔄 Session Management

### Start of Session
1. Initialize workspace
2. Load previous context
3. Review objectives
4. Check dependencies

### During Session
1. Regular backups
2. Commit checkpoints
3. Monitor token usage
4. Update scratch pad

### End of Session
1. Save context
2. Document changes
3. Create handoff notes
4. Clean workspace

## 📝 Best Practices

1. **One workspace per feature** - Don't mix different features
2. **Frequent commits** - Checkpoint progress regularly
3. **Clear documentation** - Maintain scratch/notes.md
4. **Regular cleanup** - Remove unnecessary files
5. **Explicit paths** - Always use full paths in commands

---

**Remember**: The workspace is your sandbox. Keep it organized, isolated, and safe.
