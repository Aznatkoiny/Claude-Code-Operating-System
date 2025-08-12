# /tdd

Implement Test-Driven Development workflow with strict Red-Green-Refactor discipline.

## Usage

```bash
/tdd <feature-name> [options]
```

## Options

- `--framework <name>`: Testing framework (jest, pytest, mocha, vitest)
- `--coverage`: Include coverage requirements
- `--watch`: Run tests in watch mode
- `--e2e`: Include end-to-end tests
- `--strict`: Enforce 100% coverage

## Workflow

### 1. RED Phase - Write Failing Tests

```bash
# Create test file first
create tests/<feature>.test.<ext>

# Define test structure
describe('<Feature>', () => {
  it('should <expected behavior>', () => {
    // Arrange
    // Act
    // Assert
  });
});

# Run tests - expect failures
npm test -- --no-coverage
```

### 2. GREEN Phase - Minimal Implementation

```bash
# Write minimal code to pass
# No optimization
# No abstractions
# Just make it work

# Run tests until green
npm test -- --watch
```

### 3. REFACTOR Phase - Improve Code Quality

```bash
# With tests passing:
- Extract functions
- Remove duplication
- Improve naming
- Add documentation
- Optimize performance

# Ensure tests stay green
npm test
```

## Test Categories

### Unit Tests
```javascript
// Isolated component testing
test('Calculator.add returns sum', () => {
  const calc = new Calculator();
  expect(calc.add(2, 3)).toBe(5);
});
```

### Integration Tests
```javascript
// Component interaction testing
test('API endpoint returns user data', async () => {
  const response = await request(app).get('/users/1');
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('name');
});
```

### E2E Tests
```javascript
// Full user journey testing
test('User can complete checkout', async () => {
  await page.goto('/shop');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  await expect(page).toHaveURL('/success');
});
```

## Coverage Requirements

```yaml
minimum_coverage:
  statements: 80
  branches: 75
  functions: 80
  lines: 80

strict_mode:
  statements: 100
  branches: 100
  functions: 100
  lines: 100
```

## Testing Patterns

### AAA Pattern
```javascript
test('should validate email', () => {
  // Arrange
  const email = 'test@example.com';
  
  // Act
  const isValid = validateEmail(email);
  
  // Assert
  expect(isValid).toBe(true);
});
```

### Given-When-Then
```javascript
test('Given valid credentials When login Then redirect to dashboard', async () => {
  // Given
  const credentials = { email: 'user@test.com', password: 'secure123' };
  
  // When
  const result = await login(credentials);
  
  // Then
  expect(result.redirect).toBe('/dashboard');
});
```

### Test Data Builders
```javascript
// Create reusable test data
const userBuilder = () => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  build: function() { return {...this}; }
});
```

## Mocking Strategies

### Mock External Services
```javascript
jest.mock('./api-client');
apiClient.fetchUser.mockResolvedValue({ id: 1, name: 'Test' });
```

### Spy on Functions
```javascript
const consoleSpy = jest.spyOn(console, 'log');
myFunction();
expect(consoleSpy).toHaveBeenCalledWith('Expected message');
```

### Stub Time-based Functions
```javascript
jest.useFakeTimers();
const callback = jest.fn();
setTimeout(callback, 1000);
jest.advanceTimersByTime(1000);
expect(callback).toHaveBeenCalled();
```

## Test Organization

```
tests/
├── unit/
│   ├── components/
│   ├── utils/
│   └── services/
├── integration/
│   ├── api/
│   └── database/
├── e2e/
│   ├── flows/
│   └── smoke/
└── fixtures/
    ├── users.json
    └── products.json
```

## Continuous Testing

### Pre-commit Hook
```bash
# .husky/pre-commit
npm test -- --bail --findRelatedTests
```

### CI Pipeline
```yaml
test:
  script:
    - npm test -- --coverage
    - npm run test:e2e
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

## Performance Testing

```javascript
test('should complete within performance budget', async () => {
  const start = performance.now();
  await processLargeDataset(data);
  const duration = performance.now() - start;
  expect(duration).toBeLessThan(1000); // 1 second budget
});
```

## Snapshot Testing

```javascript
test('Component renders correctly', () => {
  const component = render(<MyComponent {...props} />);
  expect(component).toMatchSnapshot();
});
```

## Property-Based Testing

```javascript
import fc from 'fast-check';

test('Array sort is idempotent', () => {
  fc.assert(
    fc.property(fc.array(fc.integer()), (arr) => {
      const sorted = [...arr].sort((a, b) => a - b);
      const doubleSorted = [...sorted].sort((a, b) => a - b);
      expect(sorted).toEqual(doubleSorted);
    })
  );
});
```

## Test Debugging

```bash
# Debug single test
npm test -- --inspect-brk test-file.test.js

# Verbose output
npm test -- --verbose

# Run specific test
npm test -- --testNamePattern="should validate"
```

## Best Practices

1. **Test Behavior, Not Implementation**
2. **One Assertion Per Test**
3. **Descriptive Test Names**
4. **Independent Tests**
5. **Fast Test Execution**
6. **Deterministic Results**
7. **Clear Failure Messages**
8. **Avoid Test Interdependencies**

## Common Pitfalls

- ❌ Testing implementation details
- ❌ Brittle selectors in E2E tests
- ❌ Shared state between tests
- ❌ Slow test suites
- ❌ Flaky async tests
- ❌ Over-mocking
- ❌ Under-testing edge cases

## Related Commands

- `/test`: Run test suite
- `/coverage`: Generate coverage report
- `/test-watch`: Run tests in watch mode
- `/test-debug`: Debug failing tests
