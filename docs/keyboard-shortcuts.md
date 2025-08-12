# Claude Code Keyboard Shortcuts & UI Tips

Comprehensive guide to keyboard shortcuts, UI modes, and productivity tips for Claude Code.

## ⌨️ Essential Keyboard Shortcuts

### Navigation
- **Tab**: Autocomplete file names
- **Shift+Tab**: Cycle through input modes (Edit → Auto-accept → Plan)
- **Ctrl/Cmd+L**: Clear conversation
- **Esc**: Cancel current operation
- **Esc+Esc**: Edit previous prompt (WARNING: clears later history)
- **Ctrl/Cmd+C**: Interrupt running command
- **↑/↓**: Navigate command history

### Input Modes
1. **Edit Mode** (default): Review changes before applying
2. **Auto-accept Mode**: Automatically apply changes
3. **Plan Mode**: Generate plan from vague prompts

## 🖱️ UI Interactions

### File Operations
- **Drag & Drop**: Drop files directly into chat
- **Copy/Paste**: Paste images or file paths
- **Click paths**: File paths are clickable in output

### Multi-line Input
```bash
# Setup for multi-line prompts
/terminal setup

# Then use Shift+Enter for new lines
```

## 💡 Productivity Tips

### 1. Think Harder Mode
Allocate more thinking tokens for complex problems:
```
"think harder about this architecture"
"ultrathink: design the system"
"use deep reasoning for this"
```

### 2. Voice Input
Use tools like Wispr Flow for hands-free prompting:
- Start dictation
- Speak naturally
- Claude processes voice-to-text

### 3. Visual Workflow
```bash
# Work with screenshots
# 1. Take screenshot
# 2. Drag into Claude
# 3. "Make the button blue"
# 4. Iterate on changes
```

### 4. IDE Integration
VS Code Extension features:
- See diffs inline
- Multi-instance sessions
- Selected line context
- Visual file tree

## 📊 Context Management

### Monitor Usage
```bash
# Check token usage
ccusage

# Output:
# Input tokens: 45,231
# Output tokens: 12,456
# Total cost: $X.XX
```

### Clear Strategies
```bash
/clear          # Full clear
/compact        # Compress context
/clear-after    # Clear after task
```

### Resume Sessions
```bash
# Recover from crash
/resume

# Load previous session
/load-session session-name
```

## 🎯 Mode-Specific Tips

### Plan Mode
Best for:
- Vague requirements
- Breaking down complex tasks
- Initial exploration

Usage:
```bash
# Press Shift+Tab twice
# Enter high-level goal
# Claude generates detailed plan
```

### Auto-accept Mode
Best for:
- Trusted operations
- Repetitive tasks
- Safe environments

Usage:
```bash
# Press Shift+Tab once
# Changes apply immediately
# Use with --dangerously-skip-permissions
```

### Edit Mode
Best for:
- Critical changes
- Learning Claude's approach
- Code review

Usage:
```bash
# Default mode
# Review each change
# Accept/reject individually
```

## 🔄 Workflow Optimizations

### Batch Operations
```bash
# Process multiple files
"Update all test files in /tests"

# Recursive operations
"Add docstrings to all Python files"
```

### Loop Until Success
```bash
# Iterative fixing
"Run build and fix errors until it passes"

# Continuous improvement
"Optimize until response time < 100ms"
```

### Parallel Tasks
```bash
# Spawn subagents
"Create 3 agents: one for tests, one for docs, one for refactoring"

# Coordinate results
"Merge all agent outputs"
```

## 📝 Buffer Management

### Long Prompts
```bash
# Compose in external editor
# Paste as single line
# Avoids tokenization issues
```

### Template Prompts
Create reusable templates:
```markdown
# .claude/templates/review.md
Review this code for:
1. Security issues
2. Performance problems
3. Code style
4. Test coverage
```

## 🎨 Visual Features

### Working with Images
1. **Screenshots**: Drag & drop for UI work
2. **Diagrams**: Paste for architecture discussions
3. **Mockups**: Share for implementation
4. **Diffs**: Visual comparison in IDE

### Color Coding
Terminal output uses colors:
- 🟢 Green: Success
- 🔴 Red: Errors
- 🟡 Yellow: Warnings
- 🔵 Blue: Information

## 🚀 Advanced Shortcuts

### Custom Aliases
```bash
# .claude/aliases
alias build="/build-feature"
alias test="/test-all"
alias deploy="/deploy-safe"
```

### Function Keys
- **F1**: Help
- **F2**: Rename
- **F3**: Search
- **F5**: Refresh
- **F9**: Run

### Vim Mode
For vim users:
```bash
# Enable vim keybindings
/settings vim-mode true
```

## 📱 Mobile/Tablet Tips

### Touch Gestures
- **Pinch**: Zoom code
- **Swipe**: Navigate files
- **Long press**: Context menu
- **Double tap**: Select word

### External Keyboard
- All desktop shortcuts work
- Use Cmd/Ctrl based on OS
- Function keys supported

## 🔧 Customization

### Key Remapping
```json
// .claude/keybindings.json
{
  "clear": "Cmd+K",
  "compact": "Cmd+Shift+K",
  "plan": "Cmd+P"
}
```

### UI Preferences
```json
// .claude/ui.json
{
  "theme": "dark",
  "fontSize": 14,
  "autoSave": true,
  "showLineNumbers": true
}
```

## 💾 Quick Actions

### Frequent Commands
```bash
Ctrl+1: /clear
Ctrl+2: /compact
Ctrl+3: /save-context
Ctrl+4: /test-all
Ctrl+5: /commit
```

### Bookmarks
```bash
# Bookmark current state
Cmd+D

# Jump to bookmark
Cmd+Shift+D
```

## 🎯 Focus Modes

### Deep Work
```bash
# Minimize distractions
/focus-mode on

# Disables:
# - Notifications
# - Auto-save
# - Background tasks
```

### Review Mode
```bash
# Enhanced diff view
/review-mode on

# Shows:
# - Side-by-side diffs
# - Change annotations
# - Impact analysis
```

## 📈 Performance Tips

### Faster Response
1. Clear context regularly
2. Use specific file paths
3. Avoid wildcards when possible
4. Batch similar operations

### Resource Management
```bash
# Check memory usage
/memory-status

# Optimize if high
/optimize-memory
```

## 🆘 Troubleshooting Shortcuts

### Recovery
- **Ctrl+Z**: Undo last change
- **Ctrl+Shift+Z**: Redo
- **Ctrl+S**: Force save
- **Ctrl+Q**: Safe quit

### Debug Mode
```bash
# Enable debug output
/debug on

# Show all operations
/verbose on
```

---

**Pro Tip**: Master these shortcuts to 10x your productivity with Claude Code. Start with the basics and gradually add advanced shortcuts to your workflow.
