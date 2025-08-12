# Subagent Architecture Guide

Claude Code OS uses specialized subagents to handle complex or parallelizable tasks. These agents live in `.claude/agents` and can be activated on demand to extend the main agent's capabilities.

## Existing Subagents

| Agent | Purpose |
|-------|---------|
| `context-analyzer.md` | Maps project structure, dependencies and patterns |
| `implementation-engineer.md` | Generates code following established conventions |
| `test-automation.md` | Writes and runs tests, reports coverage |

## Design Principles

1. **Single Responsibility** – Each subagent owns a well-defined domain.
2. **Minimal Context** – Provide only the files and instructions needed for the task.
3. **Explicit Interfaces** – Tasks and responses follow a clear contract:
   ```yaml
   input:
     task: "<what to do>"
     context: "<relevant files>"
   output:
     status: success|failure|partial
     result: "<primary result>"
     notes: ["<follow-up actions>"]
   ```
4. **Memory Integration** – Persist useful discoveries via `/save-context`.
5. **Security First** – Subagents should follow the same security checks as the main agent.

## Creating a New Subagent

1. Add a markdown file in `.claude/agents` describing the agent's role and protocols.
2. Reference the agent from `CLAUDE.md` or a custom command.
3. Keep files under 300 lines and document expectations, inputs and outputs.

## Activation Workflow

1. Main agent performs high-level planning.
2. Delegate scoped tasks to subagents in parallel.
3. Aggregate results and reconcile conflicts.
4. Persist new knowledge to memory and update documentation.

For more on context orchestration, see `docs/context-engineering.md`.
