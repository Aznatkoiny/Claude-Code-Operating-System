# CLAUDE.md Templates

Use these templates as starting points for global and directory-specific rules files. Remember that deeper `CLAUDE.md` files override parent rules within their scope.

## Root `CLAUDE.md`

```markdown
# CLAUDE.md

## Core Principles
- Context over everything
- Test after every change
- Document while coding

## Commands
- `/scan-project` – map structure and dependencies
- `/test-all` – run full test suite
- `/security-scan` – check for vulnerabilities

## Workflow
1. Explore → Plan → Code → Commit
2. Run tests and linters
3. Update docs and memory
```

## Directory `CLAUDE.md`

```markdown
# CLAUDE.md – frontend/
See: @../CLAUDE.md

## Additional Rules
- Follow React and TypeScript style guides
- Keep components under 200 lines
- Add snapshots for new UI
```

## Private Instructions

Create a `CLAUDE.local.md` (git-ignored) for secrets or machine-specific paths. The agent will merge it with the visible rules at runtime.
