# Backend CLAUDE.md - API & Server Specific Rules

inherit: ../CLAUDE.md

## 🚀 Backend-Specific Principles

### API Architecture
- **RESTful Design**: Follow REST principles strictly
- **GraphQL Alternative**: Use for complex queries
- **Microservices**: Domain-driven boundaries
- **API Versioning**: /api/v1, /api/v2
- **Rate Limiting**: Implement on all endpoints

### Database Patterns
```python
# Repository Pattern
class UserRepository:
    async def find_by_id(self, id: str) -> Optional[User]:
        # Use ORM, never raw SQL in business logic
        return await User.get_or_none(id=id)
    
    async def create(self, data: UserCreate) -> User:
        # Always validate before persistence
        validated = UserValidator.validate(data)
        return await User.create(**validated.dict())

# Unit of Work Pattern
async with database.transaction():
    user = await user_repo.create(user_data)
    await audit_repo.log_creation(user)
    # Commits or rollbacks automatically
```

### Security Protocols
```yaml
authentication:
  - JWT with refresh tokens
  - OAuth2 for third-party
  - API keys for service-to-service
  
authorization:
  - RBAC (Role-Based Access Control)
  - Implement at middleware level
  - Principle of least privilege
  
encryption:
  - HTTPS only (TLS 1.3+)
  - Encrypt PII at rest
  - Hash passwords with bcrypt/argon2
```

### Input Validation
```python
# ALWAYS validate at the edge
from pydantic import BaseModel, validator

class UserCreate(BaseModel):
    email: EmailStr
    password: SecretStr
    age: int
    
    @validator('password')
    def password_strength(cls, v):
        if len(v.get_secret_value()) < 8:
            raise ValueError('Password too short')
        return v
    
    @validator('age')
    def age_valid(cls, v):
        if v < 13:
            raise ValueError('Must be 13 or older')
        return v
```

### Error Handling
```python
# Consistent error responses
class APIError(Exception):
    status_code: int = 500
    message: str = "Internal server error"
    
@app.exception_handler(APIError)
async def api_error_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.message,
            "request_id": request.state.request_id,
            "timestamp": datetime.utcnow().isoformat()
        }
    )

# Never expose internal errors
try:
    result = await dangerous_operation()
except SpecificError as e:
    logger.error(f"Operation failed: {e}")
    raise APIError(status_code=400, message="Operation failed")
except Exception as e:
    logger.error(f"Unexpected error: {e}", exc_info=True)
    raise APIError()  # Generic message to user
```

### Performance Optimization
```python
# Caching Strategy
from functools import lru_cache
from redis import Redis

redis_client = Redis()

async def get_user(user_id: str):
    # L1: Local cache
    if cached := local_cache.get(user_id):
        return cached
    
    # L2: Redis cache
    if cached := await redis_client.get(f"user:{user_id}"):
        return json.loads(cached)
    
    # L3: Database
    user = await db.fetch_user(user_id)
    
    # Populate caches
    await redis_client.setex(f"user:{user_id}", 300, json.dumps(user))
    local_cache[user_id] = user
    
    return user
```

### Async Patterns
```python
# ALWAYS use async for I/O operations
async def process_request(request):
    # Concurrent operations
    user_task = fetch_user(request.user_id)
    permissions_task = fetch_permissions(request.user_id)
    
    user, permissions = await asyncio.gather(
        user_task,
        permissions_task
    )
    
    # Background tasks
    background_tasks.add_task(
        send_notification,
        user.email,
        "Request processed"
    )
    
    return {"status": "success"}
```

### Testing Strategy
```python
# Unit tests with mocks
@pytest.mark.asyncio
async def test_create_user(mock_db):
    mock_db.create.return_value = User(id="123")
    service = UserService(mock_db)
    
    result = await service.create_user({"email": "test@example.com"})
    
    assert result.id == "123"
    mock_db.create.assert_called_once()

# Integration tests with test DB
@pytest.mark.integration
async def test_user_flow(test_db):
    async with test_db.transaction():
        user = await create_user(test_data)
        retrieved = await get_user(user.id)
        assert retrieved.email == test_data["email"]
        # Rollback after test
```

### Monitoring & Logging
```python
# Structured logging
import structlog

logger = structlog.get_logger()

@app.middleware("http")
async def log_requests(request, call_next):
    request_id = str(uuid.uuid4())
    
    with logger.contextvars(
        request_id=request_id,
        method=request.method,
        path=request.url.path
    ):
        start_time = time.time()
        response = await call_next(request)
        duration = time.time() - start_time
        
        logger.info(
            "request_completed",
            status_code=response.status_code,
            duration=duration
        )
        
    return response
```

### Deployment Checklist
```yaml
pre_deploy:
  - [ ] All tests passing
  - [ ] Security scan clean
  - [ ] Database migrations ready
  - [ ] Environment variables set
  - [ ] Rate limits configured
  - [ ] Monitoring alerts configured
  
health_checks:
  - /health/live - Service is running
  - /health/ready - Ready to serve traffic
  - /health/metrics - Prometheus metrics
  
rollback_plan:
  - Blue-green deployment
  - Database migration rollback scripts
  - Feature flags for gradual rollout
```

### Database Guidelines
```sql
-- ALWAYS use migrations
-- NEVER modify production DB manually

-- Indexing strategy
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- Partitioning for large tables
CREATE TABLE events_2024_01 PARTITION OF events
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

---

**Remember**: The backend is the fortress. Security, reliability, and performance are non-negotiable.
