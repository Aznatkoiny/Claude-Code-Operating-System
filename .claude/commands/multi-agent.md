# /multi-agent

Orchestrate multiple Claude Code agents for parallel development tasks using git worktrees and coordinated workflows.

## Usage

```bash
/multi-agent <orchestration-plan> [options]
```

## Options

- `--agents <n>`: Number of parallel agents (default: 3)
- `--mode <mode>`: Orchestration mode (parallel, sequential, hub-spoke)
- `--timeout <s>`: Maximum execution time per agent
- `--merge-strategy`: How to merge results (auto, manual, review)
- `--coordination`: Communication method between agents

## Orchestration Modes

### Parallel Mode
```yaml
agents:
  - name: frontend-agent
    task: "Implement UI components"
    worktree: "../feature-ui"
    branch: "feature/ui-components"
    
  - name: backend-agent
    task: "Create API endpoints"
    worktree: "../feature-api"
    branch: "feature/api-endpoints"
    
  - name: test-agent
    task: "Write integration tests"
    worktree: "../feature-tests"
    branch: "feature/integration-tests"
```

### Sequential Mode
```yaml
pipeline:
  1: schema-agent    # Design database schema
  2: api-agent       # Build API based on schema
  3: frontend-agent  # Create UI for API
  4: test-agent      # Write tests for all
```

### Hub-and-Spoke Mode
```yaml
coordinator: lead-agent
workers:
  - auth-specialist
  - database-specialist
  - ui-specialist
  - security-specialist
```

## Worktree Setup

```bash
# Create worktrees for parallel development
git worktree add ../agent-1 -b feature/agent-1
git worktree add ../agent-2 -b feature/agent-2
git worktree add ../agent-3 -b feature/agent-3

# List active worktrees
git worktree list

# Clean up after completion
git worktree remove ../agent-1
```

## Agent Communication Protocol

### Shared State
```json
{
  "shared_context": {
    "api_contracts": [],
    "database_schema": {},
    "ui_components": [],
    "test_coverage": {}
  },
  "agent_status": {
    "frontend": "in_progress",
    "backend": "completed",
    "testing": "waiting"
  },
  "dependencies": {
    "frontend": ["backend.api_ready"],
    "testing": ["frontend.complete", "backend.complete"]
  }
}
```

### Message Passing
```javascript
// Agent publishes completion
agent.publish({
  type: 'TASK_COMPLETE',
  agent: 'backend-agent',
  output: {
    endpoints: ['/api/users', '/api/auth'],
    schemas: {...}
  }
});

// Other agents subscribe
agent.subscribe('TASK_COMPLETE', (message) => {
  if (message.agent === 'backend-agent') {
    updateAPIClient(message.output.endpoints);
  }
});
```

## Task Distribution Strategies

### Feature-Based Distribution
```yaml
feature: "User Authentication"
agents:
  - database: "Create user tables and sessions"
  - backend: "Implement auth endpoints"
  - frontend: "Build login/register UI"
  - security: "Add encryption and validation"
```

### Layer-Based Distribution
```yaml
layers:
  - infrastructure: "Setup Docker, K8s configs"
  - database: "Schema, migrations, seeds"
  - backend: "Services, controllers, models"
  - frontend: "Components, pages, state"
  - testing: "Unit, integration, E2E"
```

### Domain-Based Distribution
```yaml
domains:
  - user-management: "All user-related features"
  - payment-processing: "Payment integration"
  - reporting: "Analytics and dashboards"
  - notifications: "Email, SMS, push"
```

## Coordination Patterns

### Lock-Step Coordination
```bash
# All agents wait at checkpoints
checkpoint-1:
  - All agents complete setup
  - Synchronize and proceed

checkpoint-2:
  - All agents complete implementation
  - Run integration tests

checkpoint-3:
  - All agents complete testing
  - Merge branches
```

### Pipeline Coordination
```bash
# Output of one feeds into next
agent-1 output -> agent-2 input
agent-2 output -> agent-3 input
agent-3 output -> final merge
```

### Consensus Coordination
```bash
# Agents vote on decisions
proposal: "Use PostgreSQL for database"
votes:
  backend-agent: approve
  data-agent: approve
  devops-agent: approve
decision: approved (3/3)
```

## Conflict Resolution

### Merge Conflicts
```bash
# Automatic resolution for non-overlapping changes
git merge --strategy=recursive --strategy-option=ours

# Manual review for conflicting changes
git diff --name-only --diff-filter=U
```

### Semantic Conflicts
```yaml
# API contract mismatches
conflict:
  frontend_expects: { user: { id, name, email }}
  backend_provides: { user: { userId, fullName, emailAddress }}
  
resolution:
  - Create adapter layer
  - Update contracts
  - Add transformation
```

### Resource Conflicts
```yaml
# Multiple agents need same resource
conflict:
  database_lock: [agent-1, agent-2]
  
resolution:
  - Queue requests
  - Time-share access
  - Create replicas
```

## Monitoring & Observability

### Agent Status Dashboard
```
┌─────────────────────────────────────────┐
│ Multi-Agent Orchestration Status        │
├─────────────────────────────────────────┤
│ Frontend Agent  : ████████░░ 80% [2:34] │
│ Backend Agent   : ██████████ 100% [DONE]│
│ Database Agent  : ██████████ 100% [DONE]│
│ Testing Agent   : ██░░░░░░░░ 20% [0:45] │
│ Security Agent  : ████████░░ 75% [1:20] │
└─────────────────────────────────────────┘
```

### Performance Metrics
```javascript
{
  "execution_time": {
    "total": "15m 23s",
    "per_agent": {
      "frontend": "5m 12s",
      "backend": "4m 45s",
      "testing": "3m 30s"
    }
  },
  "tokens_used": {
    "total": 45000,
    "per_agent": {
      "frontend": 15000,
      "backend": 12000,
      "testing": 10000
    }
  },
  "success_rate": "100%"
}
```

## Results Aggregation

### Automatic Merge
```bash
# Merge all agent branches
for branch in $(git branch -r | grep agent); do
  git merge $branch --no-edit
done

# Run validation
npm test
npm run lint
```

### Manual Review
```bash
# Create PR for each agent
gh pr create --base main --head feature/agent-1
gh pr create --base main --head feature/agent-2

# Review and merge
gh pr review --approve
gh pr merge
```

## Best Practices

1. **Clear Task Boundaries**: No overlapping responsibilities
2. **Defined Interfaces**: Clear contracts between agents
3. **Atomic Commits**: Each agent commits independently
4. **Continuous Integration**: Test after each merge
5. **Rollback Strategy**: Can revert individual agent work
6. **Documentation**: Each agent documents its work
7. **Error Handling**: Graceful failure and retry logic

## Advanced Orchestration

### Dynamic Scaling
```javascript
// Add more agents based on workload
if (taskQueue.length > threshold) {
  spawnAgent({
    type: 'worker',
    task: taskQueue.shift()
  });
}
```

### Intelligent Task Routing
```javascript
// Route tasks based on agent expertise
const routeTask = (task) => {
  const expertise = analyzeTaskRequirements(task);
  const bestAgent = findBestMatch(expertise, availableAgents);
  return assignTask(bestAgent, task);
};
```

### Feedback Loops
```javascript
// Agents learn from each other
agent.on('solution_found', (solution) => {
  broadcast({
    type: 'LEARNING',
    pattern: solution.pattern,
    context: solution.context
  });
});
```

## Example Workflows

### Microservice Development
```bash
/multi-agent microservice-plan.yml --agents 5 --mode parallel
# Creates 5 services in parallel with coordinated contracts
```

### Full-Stack Feature
```bash
/multi-agent fullstack-feature.yml --mode sequential
# Database → API → Frontend → Tests in sequence
```

### Bug Hunt
```bash
/multi-agent bug-investigation.yml --mode hub-spoke
# Coordinator delegates specific investigations to specialists
```

## Related Commands

- `/spawn-agent`: Create single agent
- `/agent-status`: Check agent progress
- `/merge-agents`: Combine agent work
- `/agent-communicate`: Send message between agents
