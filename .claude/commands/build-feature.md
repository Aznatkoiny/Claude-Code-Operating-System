# Command: build-feature

Build new features with perfect context awareness and zero spaghetti code.

## Usage
```
/build-feature [feature-name] [--type component|service|api|full] [--test-first]
```

## Examples
```
/build-feature user-authentication --type full --test-first
/build-feature payment-gateway --type service
/build-feature dashboard-charts --type component
```

## Intelligent Feature Development Process

### Phase 1: Context Loading & Analysis
```typescript
// Automatically executed before any code generation
const context = {
  existingPatterns: await loadPatterns(),
  relatedModules: await findRelatedCode(featureName),
  dependencies: await analyzeDependencies(),
  conventions: await loadConventions(),
  similar: await findSimilarImplementations()
};
```

### Phase 2: Duplicate Prevention Check
**CRITICAL**: Before creating anything new
1. Search for existing similar functionality
2. Check if feature can be extended from existing code
3. Identify reusable components
4. Prevent reinventing the wheel

### Phase 3: Design Planning
- Follow established architectural patterns
- Plan module structure
- Define interfaces and contracts
- Create test specifications
- Design data models

### Phase 4: Test-First Implementation (if --test-first)
```typescript
// 1. Write tests first
describe('AuthenticationService', () => {
  it('should authenticate valid credentials', async () => {
    // Test implementation
  });
  
  it('should reject invalid credentials', async () => {
    // Test implementation
  });
});

// 2. Implement to pass tests
export class AuthenticationService {
  async authenticate(credentials: Credentials): Promise<User> {
    // Implementation that passes tests
  }
}
```

### Phase 5: Incremental Building
Build feature incrementally with validation at each step:

1. **Data Layer**
   - Create models/entities
   - Setup database schema
   - Implement repositories

2. **Business Logic**
   - Implement services
   - Add validation rules
   - Handle edge cases

3. **API Layer**
   - Create endpoints
   - Add middleware
   - Define contracts

4. **UI Layer** (if applicable)
   - Build components
   - Connect to services
   - Add interactions

### Phase 6: Integration
- Wire up with existing modules
- Update dependency injection
- Register routes/endpoints
- Update configurations

### Phase 7: Validation & Testing
```bash
✓ Unit tests passing
✓ Integration tests passing
✓ No breaking changes
✓ Coverage > 80%
✓ Performance acceptable
✓ Security validated
```

## Feature Templates

### Service Feature
```typescript
// Generated structure for service feature
src/
├── features/
│   └── [feature-name]/
│       ├── index.ts                 # Public API
│       ├── [feature].service.ts     # Business logic
│       ├── [feature].repository.ts  # Data access
│       ├── [feature].types.ts       # Type definitions
│       ├── [feature].validator.ts   # Validation rules
│       ├── dto/                     # Data transfer objects
│       │   ├── create-[feature].dto.ts
│       │   └── update-[feature].dto.ts
│       └── tests/
│           ├── [feature].service.test.ts
│           └── [feature].integration.test.ts
```

### API Feature
```typescript
// Generated structure for API feature
src/
├── api/
│   └── [feature-name]/
│       ├── [feature].controller.ts  # HTTP endpoints
│       ├── [feature].routes.ts      # Route definitions
│       ├── [feature].middleware.ts  # Request processing
│       ├── [feature].validator.ts   # Request validation
│       └── tests/
│           └── [feature].api.test.ts
```

### Component Feature
```typescript
// Generated structure for component feature
src/
├── components/
│   └── [FeatureName]/
│       ├── index.tsx               # Component export
│       ├── [FeatureName].tsx       # Main component
│       ├── [FeatureName].styles.ts # Styled components
│       ├── [FeatureName].types.ts  # Type definitions
│       ├── hooks/                  # Custom hooks
│       │   └── use[Feature].ts
│       └── tests/
│           └── [FeatureName].test.tsx
```

## Anti-Spaghetti Safeguards

### Automatic Checks
✅ No circular dependencies introduced
✅ No duplicate functionality created
✅ Consistent with existing patterns
✅ All imports exist and are used
✅ Proper error handling implemented
✅ Tests cover new code

### Code Quality Gates
```typescript
// Enforced automatically
const qualityGates = {
  complexity: { max: 10 },
  fileLength: { max: 300 },
  functionLength: { max: 50 },
  testCoverage: { min: 80 },
  duplicatio, { max: 3 }
};
```

## Smart Integration

### Dependency Management
```typescript
// Automatically managed
- Detect required dependencies
- Install missing packages
- Update package.json
- Ensure version compatibility
- Update lock files
```

### Route Registration
```typescript
// Automatically integrated
- Register new routes
- Update API documentation
- Add to route index
- Configure middleware
```

### Database Updates
```typescript
// Handled intelligently
- Generate migrations
- Update schemas
- Seed test data
- Update indexes
```

## Post-Build Actions

### Automatic Tasks
1. Run all tests
2. Update documentation
3. Generate API specs
4. Check performance
5. Validate security
6. Update dependency graph

### Generated Artifacts
- Feature documentation
- API documentation
- Test coverage report
- Performance metrics
- Integration guide

## Options

- `--type`: Feature type
  - `component`: UI component
  - `service`: Business service
  - `api`: API endpoint
  - `full`: Complete feature stack

- `--test-first`: Write tests before implementation
- `--pattern [name]`: Use specific pattern template
- `--skip-tests`: Skip test generation (not recommended)
- `--force`: Override duplicate detection
- `--dry-run`: Preview without creating files

## Success Metrics

Feature is complete when:
✅ All tests passing
✅ Coverage > 80%
✅ No linting errors
✅ Documentation complete
✅ Integrated successfully
✅ Performance validated
✅ Security checked
✅ Code reviewed

## Example Output

```
🚀 Building Feature: user-authentication

📊 Context Analysis
  ✓ Loaded 15 existing patterns
  ✓ Found 3 related modules
  ✓ No duplicates detected

📝 Planning
  ✓ Design validated against patterns
  ✓ Test specifications created
  ✓ Dependencies identified

🏗️ Building
  ✓ Created models/User.ts
  ✓ Created services/AuthService.ts
  ✓ Created api/auth/controller.ts
  ✓ Created 8 test files

🧪 Testing
  ✓ 24/24 tests passing
  ✓ Coverage: 87%

📋 Integration
  ✓ Routes registered
  ✓ Database migrated
  ✓ Documentation updated

✅ Feature 'user-authentication' built successfully!
   Files created: 12
   Tests passing: 24/24
   Coverage: 87%
   Time: 45s
```

Remember: This command ensures every feature is built with context awareness, preventing technical debt and maintaining code quality.
