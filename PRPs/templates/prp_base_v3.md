# Base PRP Template v3 - Context Engineering OS

**Title**: [Feature Name]
**Version**: 3.0
**Confidence Score**: [X/10]
**Estimated Implementation Time**: [X hours]

## 🎯 Goal
[What needs to be built - be specific about the end state and deliverables]

## 💡 Why
- **Business Value**: [Impact on users/business]
- **User Benefits**: [How this helps users]
- **Technical Benefits**: [Architecture improvements]
- **Problem Solved**: [Current pain points addressed]

## 📋 What
[User-visible behavior and technical requirements]

### Success Criteria
- [ ] [Specific measurable outcome 1]
- [ ] [Specific measurable outcome 2]
- [ ] [Specific measurable outcome 3]
- [ ] All tests passing (>80% coverage)
- [ ] Performance targets met
- [ ] Security scan clean
- [ ] Documentation complete

## 🧠 Context Engineering

### Ultra-Think Analysis
```yaml
complexity: [low|medium|high]
risk_level: [low|medium|high]
dependencies: [list of dependencies]
integration_points: [list of systems to integrate]
potential_blockers: [identify risks]
```

### JIT Context Loading Strategy
```yaml
initial_context:
  - files: [minimal set of files needed]
  - patterns: [specific patterns to load]
  - memory: [queries to memory server]

progressive_context:
  - trigger: [when to load more]
  - files: [additional files]
  - compression: [when to compress]

delegation_context:
  - subagents: [which agents needed]
  - handoff: [context for each agent]
```

## 📚 All Needed Context

### Documentation & References
```yaml
must_read:
  - url: "[Official API docs URL]"
    sections: ["specific section 1", "specific section 2"]
    critical: "Key insight that prevents common errors"
    
  - file: "path/to/example.py"
    pattern: "Pattern to follow"
    gotchas: "Things to avoid"
    
  - doc: "[Library documentation URL]"
    version: "Specific version we're using"
    compatibility: "Known compatibility issues"
    
  - memory: "query:similar_feature_implementation"
    reason: "Previous successful pattern"
```

### Current Codebase Structure
```bash
# Run: tree -I 'node_modules|__pycache__|.git' -L 3
project/
├── src/
│   ├── api/          # API endpoints
│   ├── models/       # Data models
│   ├── services/     # Business logic
│   └── utils/        # Helpers
├── tests/
│   ├── unit/
│   └── integration/
└── docs/
```

### Desired Codebase Structure
```bash
project/
├── src/
│   ├── api/
│   │   └── new_feature.py    # NEW: Feature endpoints
│   ├── models/
│   │   └── new_model.py      # NEW: Data model
│   ├── services/
│   │   └── new_service.py    # NEW: Business logic
│   └── utils/
└── tests/
    ├── unit/
    │   └── test_new_feature.py # NEW: Unit tests
    └── integration/
        └── test_new_integration.py # NEW: Integration tests
```

### Known Gotchas & Library Quirks
```python
# CRITICAL: Framework-specific issues
# Example: FastAPI requires async for endpoints
# Example: SQLAlchemy needs explicit session management
# Example: Pydantic v2 breaking changes from v1

gotchas = {
    "library_name": {
        "issue": "Description of the gotcha",
        "solution": "How to work around it",
        "example": "Code snippet showing the fix"
    }
}
```

### Pattern Library
```yaml
patterns_to_use:
  - name: "Repository Pattern"
    file: "src/repositories/base.py"
    usage: "For data access layer"
    
  - name: "Service Pattern"
    file: "src/services/base.py"
    usage: "For business logic"
    
  - name: "Error Handling"
    file: "src/utils/errors.py"
    usage: "Consistent error responses"
```

## 🏗️ Implementation Blueprint

### Data Models and Structure
```python
# Pydantic Models
class NewFeatureRequest(BaseModel):
    """Request model for new feature"""
    field1: str = Field(..., description="Description")
    field2: Optional[int] = Field(None, ge=0)
    
    class Config:
        json_schema_extra = {
            "example": {
                "field1": "value",
                "field2": 42
            }
        }

# ORM Models
class NewFeatureModel(Base):
    """Database model for new feature"""
    __tablename__ = "new_features"
    
    id = Column(Integer, primary_key=True)
    field1 = Column(String(255), nullable=False)
    field2 = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
```

### Task List (Ordered Implementation)
```yaml
task_1:
  name: "Setup Data Models"
  files:
    create:
      - "src/models/new_feature.py"
    modify:
      - "src/models/__init__.py"
  pattern: "Follow src/models/existing_model.py"
  validation: "mypy src/models/new_feature.py"
  
task_2:
  name: "Implement Business Logic"
  files:
    create:
      - "src/services/new_feature_service.py"
  dependencies: ["task_1"]
  pattern: "Mirror src/services/existing_service.py"
  validation: "pytest tests/unit/test_new_service.py"
  
task_3:
  name: "Create API Endpoints"
  files:
    create:
      - "src/api/new_feature.py"
    modify:
      - "src/api/__init__.py"
  dependencies: ["task_2"]
  pattern: "Follow RESTful conventions"
  validation: "pytest tests/integration/"
```

### Per-Task Pseudocode
```python
# Task 1: Data Models
def create_data_models():
    """
    1. Create Pydantic request/response models
    2. Create SQLAlchemy ORM model
    3. Create validators
    4. Add to __init__ exports
    """
    # PATTERN: Always validate at the edge
    # GOTCHA: Pydantic v2 uses model_validate()
    
# Task 2: Business Logic
async def implement_service():
    """
    1. Create service class
    2. Implement CRUD operations
    3. Add business rules
    4. Handle errors gracefully
    """
    # PATTERN: Repository pattern for data access
    # CRITICAL: Use async/await consistently
    
# Task 3: API Endpoints
async def create_endpoints():
    """
    1. Create router
    2. Implement endpoints
    3. Add authentication
    4. Document with OpenAPI
    """
    # PATTERN: Dependency injection for services
    # GOTCHA: FastAPI auto-documents if typed correctly
```

## 🧪 Validation Strategy

### Level 1: Syntax & Type Checking
```bash
# Run these FIRST - fix any errors before proceeding
ruff check src/ --fix          # Auto-fix style issues
mypy src/                       # Type checking
black src/ --check             # Format checking

# Expected: No errors
# If errors: READ the error, understand it, fix it properly
```

### Level 2: Unit Tests
```python
# tests/unit/test_new_feature.py
import pytest
from src.models.new_feature import NewFeatureModel
from src.services.new_feature_service import NewFeatureService

class TestNewFeature:
    """Test suite for new feature"""
    
    def test_happy_path(self):
        """Basic functionality works"""
        service = NewFeatureService()
        result = service.process("valid_input")
        assert result.status == "success"
    
    def test_validation_error(self):
        """Invalid input raises ValidationError"""
        service = NewFeatureService()
        with pytest.raises(ValidationError):
            service.process("")
    
    def test_edge_case(self):
        """Handles edge cases gracefully"""
        service = NewFeatureService()
        result = service.process(edge_case_input)
        assert result.handled_gracefully
    
    @pytest.mark.asyncio
    async def test_async_operation(self):
        """Async operations work correctly"""
        service = NewFeatureService()
        result = await service.async_process("input")
        assert result.status == "success"
```

```bash
# Run and iterate until passing
pytest tests/unit/ -v --cov=src --cov-report=term-missing

# Coverage target: >80%
# If failing: Read error → Understand cause → Fix code → Re-run
```

### Level 3: Integration Tests
```python
# tests/integration/test_new_feature_integration.py
import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

class TestNewFeatureIntegration:
    """Integration tests for new feature"""
    
    def test_create_endpoint(self):
        """POST /feature creates resource"""
        response = client.post(
            "/api/v1/feature",
            json={"field1": "value", "field2": 42}
        )
        assert response.status_code == 201
        assert response.json()["id"] is not None
    
    def test_get_endpoint(self):
        """GET /feature/{id} returns resource"""
        # Create first
        create_response = client.post("/api/v1/feature", json={...})
        feature_id = create_response.json()["id"]
        
        # Then get
        response = client.get(f"/api/v1/feature/{feature_id}")
        assert response.status_code == 200
        assert response.json()["id"] == feature_id
```

```bash
# Start service and test
docker-compose up -d
pytest tests/integration/ -v

# Expected: All tests pass
# If errors: Check logs, fix issues, re-test
```

### Level 4: Performance Testing
```python
# tests/performance/test_new_feature_perf.py
import time
import concurrent.futures

def test_response_time():
    """Endpoint responds within SLA"""
    start = time.time()
    response = client.get("/api/v1/feature/1")
    duration = time.time() - start
    
    assert duration < 0.1  # 100ms SLA
    
def test_concurrent_requests():
    """Handles concurrent load"""
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [
            executor.submit(client.get, "/api/v1/feature/1")
            for _ in range(100)
        ]
        results = [f.result() for f in futures]
    
    assert all(r.status_code == 200 for r in results)
```

## 🔒 Security Checklist
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (use ORM)
- [ ] XSS prevention (escape output)
- [ ] Authentication required where needed
- [ ] Authorization checks implemented
- [ ] Rate limiting configured
- [ ] Sensitive data encrypted
- [ ] Audit logging enabled
- [ ] OWASP Top 10 reviewed

## 🚀 Deployment Strategy

### Pre-Deployment
```yaml
checks:
  - All tests passing
  - Security scan clean
  - Performance benchmarks met
  - Documentation updated
  - Code reviewed
```

### Deployment Steps
```bash
# 1. Build and test
make build
make test

# 2. Deploy to staging
make deploy-staging
make smoke-test-staging

# 3. Deploy to production
make deploy-production
make smoke-test-production

# 4. Monitor
make monitor
```

### Rollback Plan
```yaml
triggers:
  - Error rate > 5%
  - Response time > 2x baseline
  - Critical bug detected

steps:
  1. Revert deployment
  2. Restore database if needed
  3. Clear caches
  4. Notify team
  5. Post-mortem
```

## 📊 Success Metrics

### Technical Metrics
- **Response Time**: < 100ms (p95)
- **Error Rate**: < 0.1%
- **Availability**: > 99.9%
- **Test Coverage**: > 80%

### Business Metrics
- **User Adoption**: [Target]
- **Feature Usage**: [Target]
- **User Satisfaction**: [Target]

## 🤝 Handoff Protocol

### For Subagents
```yaml
delegation:
  test_agent:
    task: "Generate comprehensive test suite"
    context: "tests/unit/test_new_feature.py"
    success_criteria: "90% coverage"
    
  perf_agent:
    task: "Optimize database queries"
    context: "src/services/new_feature_service.py"
    target: "<50ms response time"
    
  security_agent:
    task: "Security audit"
    context: "Full feature implementation"
    standard: "OWASP Top 10"
```

### For Next Session
```markdown
## Implementation Status
- ✅ Data models created
- ✅ Business logic implemented
- ⏳ API endpoints in progress
- ⏹️ Tests pending
- ⏹️ Documentation pending

## Key Decisions
- Used async/await for better performance
- Chose PostgreSQL over MongoDB for consistency
- Implemented caching for frequently accessed data

## Outstanding Items
- Performance optimization needed
- Load testing pending
- Documentation updates required

## Recommendations
- Consider adding Redis cache
- Implement circuit breaker pattern
- Add monitoring dashboards
```

## ✅ Final Checklist
- [ ] All success criteria met
- [ ] Tests passing with >80% coverage
- [ ] Documentation complete
- [ ] Security scan clean
- [ ] Performance targets achieved
- [ ] Code reviewed and approved
- [ ] Deployment plan ready
- [ ] Rollback plan documented
- [ ] Monitoring configured
- [ ] Team notified

---

**Confidence Score Breakdown**:
- Context Completeness: [X/10]
- Pattern Clarity: [X/10]
- Test Coverage: [X/10]
- Risk Mitigation: [X/10]
- **Overall: [X/10]**

**Remember**: This PRP should enable one-pass implementation success. Every detail matters. Context is everything.
