# Testing CLAUDE.md - Quality Assurance Rules

inherit: ../CLAUDE.md

## 🧪 Testing-Specific Principles

### Testing Philosophy
- **Test Pyramid**: Unit (70%) → Integration (20%) → E2E (10%)
- **TDD Default**: Write tests first when possible
- **Coverage Target**: Minimum 85%, aim for 95%
- **Fast Feedback**: Unit tests < 1s, Integration < 10s, E2E < 1min

### Test Structure
```typescript
// AAA Pattern: Arrange, Act, Assert
describe('Feature', () => {
  describe('Component/Function', () => {
    it('should do specific thing when condition', () => {
      // Arrange
      const input = setupTestData();
      const expected = expectedOutput();
      
      // Act
      const result = functionUnderTest(input);
      
      // Assert
      expect(result).toEqual(expected);
    });
    
    it('should handle edge case', () => {
      // Edge cases are mandatory
    });
    
    it('should handle error case', () => {
      // Error handling tests required
    });
  });
});
```

### Unit Testing Rules
```javascript
// GOOD: Isolated, fast, deterministic
it('should calculate tax correctly', () => {
  const calculator = new TaxCalculator();
  expect(calculator.calculate(100, 0.10)).toBe(110);
});

// BAD: Dependencies, slow, flaky
it('should save to database', async () => {
  const db = new Database(); // Real DB connection
  await db.save(data);  // Network call
  expect(db.find(id)).toBeTruthy(); // Timing dependent
});
```

### Mocking Strategy
```typescript
// Mock external dependencies
jest.mock('../services/email');

// Spy on internal methods
const spy = jest.spyOn(object, 'method');

// Stub third-party libraries
const stub = sinon.stub(AWS.S3, 'upload').resolves({ Location: 'url' });

// NEVER mock what you're testing
// ALWAYS mock I/O operations in unit tests
```

### Integration Testing
```python
# Test with real dependencies but isolated environment
@pytest.mark.integration
class TestUserFlow:
    @pytest.fixture(autouse=True)
    async def setup(self, test_db, test_redis):
        """Setup test environment"""
        await test_db.clear()
        await test_redis.flushdb()
        yield
        # Cleanup happens automatically
    
    async def test_complete_user_journey(self):
        # Test across multiple components
        user = await create_user(test_data)
        token = await login(user.email, password)
        profile = await get_profile(token)
        
        assert profile.email == test_data.email
```

### E2E Testing
```javascript
// Playwright for modern web apps
test('user can complete purchase', async ({ page }) => {
  // Real browser, real server
  await page.goto('http://localhost:3000');
  await page.click('text=Login');
  await page.fill('[name=email]', 'test@example.com');
  await page.fill('[name=password]', 'password');
  await page.click('button[type=submit]');
  
  // Visual regression
  await expect(page).toHaveScreenshot('logged-in.png');
  
  // Complete flow
  await page.click('text=Shop');
  await page.click('.product-card');
  await page.click('text=Add to Cart');
  await page.click('text=Checkout');
  
  // Assertions
  await expect(page.locator('.success-message')).toBeVisible();
});
```

### Performance Testing
```javascript
// Load testing with k6
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.1'],    // Error rate under 10%
  },
};

export default function () {
  const response = http.get('https://api.example.com/endpoint');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

### Security Testing
```bash
# OWASP ZAP for security scanning
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t https://example.com \
  -r security-report.html

# Dependency scanning
npm audit
safety check
snyk test

# SAST
semgrep --config=auto
bandit -r src/
```

### Test Data Management
```typescript
// Factories for consistent test data
class UserFactory {
  static build(overrides = {}) {
    return {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
      createdAt: new Date(),
      ...overrides
    };
  }
  
  static async create(overrides = {}) {
    const user = this.build(overrides);
    return await db.users.insert(user);
  }
}

// Fixtures for reusable scenarios
export const fixtures = {
  adminUser: UserFactory.build({ role: 'admin' }),
  regularUser: UserFactory.build({ role: 'user' }),
  premiumUser: UserFactory.build({ subscription: 'premium' }),
};
```

### Coverage Requirements
```yaml
unit_tests:
  statement: 90%
  branch: 85%
  function: 95%
  line: 90%

integration_tests:
  critical_paths: 100%
  api_endpoints: 100%
  database_operations: 95%

e2e_tests:
  user_journeys: 100%
  payment_flows: 100%
  admin_operations: 100%
```

### Test Execution
```bash
# Run all tests
npm test

# Run specific suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage

# Parallel execution
npm run test -- --parallel

# Debug mode
npm run test:debug
```

### CI/CD Test Pipeline
```yaml
test_pipeline:
  - stage: unit
    parallel: true
    timeout: 5m
    
  - stage: integration
    depends_on: unit
    parallel: true
    timeout: 10m
    
  - stage: e2e
    depends_on: integration
    parallel: false
    timeout: 20m
    
  - stage: performance
    depends_on: e2e
    condition: main_branch
    
  - stage: security
    parallel: true
    allow_failure: false
```

### Test Documentation
```javascript
/**
 * @test User Registration Flow
 * @description Tests the complete user registration process
 * @covers UserController.register, EmailService.sendWelcome
 * @requirement REQ-AUTH-001
 */
describe('User Registration', () => {
  // Test cases linked to requirements
});
```

### Debugging Failed Tests
```bash
# Verbose output
npm test -- --verbose

# Run single test
npm test -- --testNamePattern="should create user"

# Debug in VS Code
Add breakpoint and run "Debug Test" from UI

# Snapshot testing
npm test -- -u  # Update snapshots

# Video recording for E2E
playwright test --video=on
```

---

**Remember**: Tests are your safety net. They must be fast, reliable, and comprehensive. A feature without tests is not complete.
