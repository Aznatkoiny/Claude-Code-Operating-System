# Command: init-os

Initialize the Claude Code Operating System for your project.

## Usage
```
/init-os [project-type] [framework] [options]
```

## Examples
```
/init-os webapp react typescript
/init-os api express postgresql
/init-os fullstack nextjs prisma
```

## Workflow

### Step 1: Project Analysis
- Scan existing codebase structure
- Detect frameworks and libraries
- Identify patterns and conventions
- Map dependencies

### Step 2: Context Setup
- Load project into memory
- Build dependency graph
- Create pattern library
- Initialize quality gates

### Step 3: Subagent Configuration
- Activate relevant subagents based on project type
- Configure subagent parameters
- Set delegation thresholds
- Enable parallel execution

### Step 4: MCP Server Setup
- Connect Context7 for documentation
- Enable Sequential for complex thinking
- Setup GitHub integration if .git exists
- Initialize memory server

### Step 5: Workflow Automation
- Configure git hooks
- Setup testing pipeline
- Enable continuous validation
- Create deployment scripts

### Step 6: Initial Validation
- Run context analyzer
- Check for existing issues
- Generate initial reports
- Create improvement backlog

## Parameters

- `project-type`: webapp, api, mobile, desktop, fullstack, library
- `framework`: react, vue, angular, express, nestjs, nextjs, django, rails
- `--strict`: Enable strict quality gates
- `--memory`: Set memory allocation (default: 50000 tokens)
- `--parallel`: Number of parallel subagents (default: 3)
- `--no-mcp`: Disable MCP servers
- `--offline`: Work without external connections

## Output

Creates:
- `.claude-os/config.json` - OS configuration
- `.claude-os/context/` - Context storage
- `.claude-os/memory/` - Persistent memory
- `.claude-os/reports/` - Analysis reports
- Updated `.claude/settings.json`

## Post-Initialization

After initialization, you can:
1. Run `/scan-project` for deep analysis
2. Use `/build-feature` to add features
3. Run `/improve-code` for optimization
4. Execute `/test-all` for validation

## Success Criteria

✅ Context loaded successfully
✅ Subagents activated
✅ MCP servers connected
✅ Memory initialized
✅ Quality gates configured
✅ Workflows automated
