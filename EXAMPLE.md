# Quick Example: Building a User Authentication Feature

This example demonstrates how Claude Code OS prevents spaghetti code while building a real feature.

## Without Claude Code OS (The Problem)

```typescript
// Typical AI-generated spaghetti code:
// - Recreates existing patterns
// - Ignores project conventions  
// - No test coverage
// - Breaks existing code

// File 1: Random location
function authenticateUser(username, password) {
  // New pattern, inconsistent with existing auth
  const user = database.query(`SELECT * FROM users WHERE username = '${username}'`);
  if (user.password === password) { // Plain text comparison!
    return { success: true };
  }
}

// File 2: Duplicate functionality
class AuthManager {
  login(user, pass) {
    // Different implementation of same feature
    // Creates confusion and maintenance nightmare
  }
}

// Result: Tangled, insecure, unmaintainable code
```

## With Claude Code OS (The Solution)

### Step 1: Initialize and Scan
```bash
claude
/init-os webapp express postgresql
/scan-project ./src
```

**Output**: Complete context awareness
```
✅ Loaded 15 existing patterns
✅ Found existing AuthService with bcrypt
✅ Identified JWT token pattern in use
✅ Located test structure and conventions
```

### Step 2: Build Feature with Context
```bash
/build-feature user-authentication --type full --test-first
```

**The system automatically**:

#### 1. Detects Existing Patterns
```typescript
// System notices you already have a BaseService pattern
// and authentication utilities
Context Loaded:
- Pattern: Service Layer (used 12 times)
- Existing: PasswordHasher, JWTService
- Convention: Services extend BaseService
- Tests: Jest with 85% coverage requirement
```

#### 2. Prevents Duplication
```typescript
⚠️ Duplicate Detection:
Found existing functionality:
- auth.utils.ts: hashPassword()
- jwt.service.ts: generateToken()
- user.repository.ts: findByEmail()

Will reuse instead of recreating.
```

#### 3. Generates Consistent Code
```typescript
// src/services/auth.service.ts
import { Injectable } from '@/core/decorators';
import { BaseService } from '@/core/base'; // Follows existing pattern
import { PasswordHasher } from '@/utils/auth'; // Reuses existing
import { JWTService } from '@/services/jwt'; // Reuses existing
import { UserRepository } from '@/repositories/user';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private userRepo: UserRepository,
    private hasher: PasswordHasher,
    private jwt: JWTService
  ) {
    super('AuthService');
  }

  async authenticate(email: string, password: string) {
    // Validation
    this.validateInput({ email, password });
    
    // Find user (reusing existing repository)
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Verify password (reusing existing hasher)
    const valid = await this.hasher.verify(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate token (reusing existing JWT service)
    const token = await this.jwt.generate({ 
      userId: user.id,
      email: user.email 
    });
    
    // Log event (following existing pattern)
    this.logger.info('User authenticated', { userId: user.id });
    
    return { user, token };
  }
}
```

#### 4. Creates Comprehensive Tests
```typescript
// src/services/auth.service.test.ts
describe('AuthService', () => {
  let service: AuthService;
  let mockRepo: jest.Mocked<UserRepository>;
  let mockHasher: jest.Mocked<PasswordHasher>;
  let mockJWT: jest.Mocked<JWTService>;
  
  beforeEach(() => {
    // Setup following existing test patterns
    mockRepo = createMockRepository();
    mockHasher = createMockHasher();
    mockJWT = createMockJWT();
    service = new AuthService(mockRepo, mockHasher, mockJWT);
  });
  
  describe('authenticate', () => {
    it('should authenticate valid credentials', async () => {
      // Arrange (following AAA pattern)
      const credentials = { email: 'test@example.com', password: 'Test123!' };
      const user = createTestUser();
      const token = 'jwt.token.here';
      
      mockRepo.findByEmail.mockResolvedValue(user);
      mockHasher.verify.mockResolvedValue(true);
      mockJWT.generate.mockResolvedValue(token);
      
      // Act
      const result = await service.authenticate(credentials.email, credentials.password);
      
      // Assert
      expect(result).toEqual({ user, token });
      expect(mockRepo.findByEmail).toHaveBeenCalledWith(credentials.email);
      expect(mockHasher.verify).toHaveBeenCalledWith(credentials.password, user.password);
    });
    
    // 10 more test cases automatically generated...
  });
});
```

#### 5. Updates Documentation
```markdown
## API Documentation

### POST /api/auth/login
Authenticates a user and returns a JWT token.

**Request Body:**
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

**Response:**
{
  "user": { ... },
  "token": "eyJhbGc..."
}

**Errors:**
- 401: Invalid credentials
- 400: Validation failed
- 500: Server error
```

### Step 3: Validation & Integration

The system automatically:
- ✅ Runs all tests (including existing ones)
- ✅ Checks for breaking changes
- ✅ Validates security (no SQL injection, passwords hashed)
- ✅ Updates dependency graph
- ✅ Ensures 87% test coverage
- ✅ Integrates with existing middleware

### Final Result

```bash
✅ Feature 'user-authentication' built successfully!
   Files created: 8
   Files modified: 3
   Tests passing: 127/127
   Coverage: 87%
   Patterns followed: ✓
   No duplicates: ✓
   No breaking changes: ✓
   Time: 45 seconds
```

## The Difference

### Without Claude Code OS
- 🍝 300+ lines of tangled code
- 🔄 Duplicate implementations
- 🚫 No test coverage
- 💔 Breaks existing features
- ⚠️ Security vulnerabilities
- 📈 Technical debt increases

### With Claude Code OS
- ✨ 150 lines of clean, consistent code
- ♻️ Reuses existing utilities
- ✅ 87% test coverage
- 🔧 Integrates perfectly
- 🔒 Secure by default
- 📉 Technical debt decreases

## Key Insights

1. **Context Awareness**: The system knew about existing patterns and utilities
2. **Pattern Compliance**: Generated code matches your existing style
3. **Automatic Testing**: Tests were created and run automatically
4. **Security Built-in**: Followed security best practices without being asked
5. **Documentation**: Kept documentation in sync with code

This is the power of Context Engineering - turning chaotic AI assistance into systematic, reliable software development.
