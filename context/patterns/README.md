# Pattern Library

A comprehensive collection of proven code patterns that prevent spaghetti code and ensure consistent, maintainable implementations.

## Pattern Categories

### 1. Architectural Patterns

#### Service Layer Pattern
```typescript
// Pattern: Service with dependency injection
export class UserService extends BaseService<User> {
  constructor(
    private readonly repository: UserRepository,
    private readonly validator: ValidationService,
    private readonly logger: LoggerService
  ) {
    super('UserService');
  }

  async create(dto: CreateUserDto): Promise<User> {
    // Validation
    await this.validator.validate(dto, CreateUserDto);
    
    // Business logic
    const user = await this.repository.create({
      ...dto,
      password: await this.hashPassword(dto.password)
    });
    
    // Logging
    this.logger.info('User created', { userId: user.id });
    
    return user;
  }
}
```

#### Repository Pattern
```typescript
// Pattern: Data access abstraction
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly db: Database) {
    super(db, 'users');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email });
  }

  async findActive(): Promise<User[]> {
    return this.find({ 
      status: 'active',
      deletedAt: null 
    });
  }
}
```

#### Controller Pattern
```typescript
// Pattern: Thin controller with service delegation
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @UseValidation(CreateUserDto)
  async create(@Body() dto: CreateUserDto): Promise<ApiResponse<User>> {
    const user = await this.userService.create(dto);
    return {
      success: true,
      data: user,
      message: 'User created successfully'
    };
  }
}
```

### 2. Component Patterns

#### Smart/Dumb Component Pattern
```typescript
// Smart Component (Container)
export const UserListContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setLoading(false));
  }, []);
  
  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter(u => u.id !== id));
  };
  
  return <UserList users={users} loading={loading} onDelete={handleDelete} />;
};

// Dumb Component (Presentational)
interface UserListProps {
  users: User[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, loading, onDelete }) => {
  if (loading) return <Spinner />;
  if (!users.length) return <EmptyState />;
  
  return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} onDelete={onDelete} />
      ))}
    </ul>
  );
};
```

#### Custom Hook Pattern
```typescript
// Pattern: Reusable logic extraction
export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error, refetch: fetchData };
}
```

### 3. Error Handling Patterns

#### Try-Catch-Finally Pattern
```typescript
// Pattern: Comprehensive error handling
export async function processPayment(payment: Payment): Promise<PaymentResult> {
  let transaction: Transaction | null = null;
  
  try {
    // Start transaction
    transaction = await db.beginTransaction();
    
    // Validate payment
    await validatePayment(payment);
    
    // Process payment
    const result = await paymentGateway.process(payment);
    
    // Update database
    await updatePaymentStatus(payment.id, result.status);
    
    // Commit transaction
    await transaction.commit();
    
    return result;
    
  } catch (error) {
    // Rollback on error
    if (transaction) {
      await transaction.rollback();
    }
    
    // Log error with context
    logger.error('Payment processing failed', {
      error,
      paymentId: payment.id,
      amount: payment.amount
    });
    
    // Throw appropriate error
    if (error instanceof ValidationError) {
      throw new BadRequestException(error.message);
    }
    if (error instanceof PaymentGatewayError) {
      throw new ServiceUnavailableException('Payment service unavailable');
    }
    throw new InternalServerException('Payment processing failed');
    
  } finally {
    // Cleanup resources
    if (transaction && !transaction.isComplete()) {
      await transaction.rollback();
    }
  }
}
```

#### Error Boundary Pattern
```typescript
// Pattern: React error boundary
export class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error reporting service
    errorReporter.log(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    
    return this.props.children;
  }
}
```

### 4. Testing Patterns

#### AAA Pattern (Arrange-Act-Assert)
```typescript
// Pattern: Clear test structure
describe('UserService', () => {
  it('should create user with hashed password', async () => {
    // Arrange
    const dto = { email: 'test@example.com', password: 'password123' };
    const hashedPassword = 'hashed_password';
    mockHasher.hash.mockResolvedValue(hashedPassword);
    mockRepo.create.mockResolvedValue({ id: '1', ...dto, password: hashedPassword });
    
    // Act
    const result = await userService.create(dto);
    
    // Assert
    expect(mockHasher.hash).toHaveBeenCalledWith('password123');
    expect(mockRepo.create).toHaveBeenCalledWith({
      ...dto,
      password: hashedPassword
    });
    expect(result.password).toBe(hashedPassword);
  });
});
```

#### Test Data Builder Pattern
```typescript
// Pattern: Flexible test data creation
class UserBuilder {
  private user: Partial<User> = {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    name: faker.name.fullName()
  };
  
  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }
  
  withRole(role: Role): this {
    this.user.role = role;
    return this;
  }
  
  withVerified(verified = true): this {
    this.user.verified = verified;
    this.user.verifiedAt = verified ? new Date() : null;
    return this;
  }
  
  build(): User {
    return this.user as User;
  }
}

// Usage
const adminUser = new UserBuilder()
  .withRole('admin')
  .withVerified()
  .build();
```

### 5. Performance Patterns

#### Caching Pattern
```typescript
// Pattern: Multi-level caching
export class CachedUserService {
  private memoryCache = new Map<string, User>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  
  constructor(
    private userService: UserService,
    private redis: RedisClient
  ) {}
  
  async getUser(id: string): Promise<User> {
    // L1 Cache: Memory
    if (this.memoryCache.has(id)) {
      return this.memoryCache.get(id)!;
    }
    
    // L2 Cache: Redis
    const cached = await this.redis.get(`user:${id}`);
    if (cached) {
      const user = JSON.parse(cached);
      this.memoryCache.set(id, user);
      return user;
    }
    
    // L3: Database
    const user = await this.userService.findById(id);
    
    // Update caches
    await this.redis.setex(`user:${id}`, this.CACHE_TTL, JSON.stringify(user));
    this.memoryCache.set(id, user);
    
    return user;
  }
  
  async invalidate(id: string): Promise<void> {
    this.memoryCache.delete(id);
    await this.redis.del(`user:${id}`);
  }
}
```

#### Lazy Loading Pattern
```typescript
// Pattern: Load data only when needed
export class LazyDataLoader<T> {
  private data: T | null = null;
  private loading = false;
  private error: Error | null = null;
  
  constructor(private loader: () => Promise<T>) {}
  
  async get(): Promise<T> {
    if (this.data) return this.data;
    if (this.loading) {
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (!this.loading) {
            clearInterval(check);
            resolve(this.get());
          }
        }, 10);
      });
    }
    
    this.loading = true;
    try {
      this.data = await this.loader();
      return this.data;
    } catch (error) {
      this.error = error as Error;
      throw error;
    } finally {
      this.loading = false;
    }
  }
}
```

### 6. Security Patterns

#### Input Validation Pattern
```typescript
// Pattern: Comprehensive input validation
export class ValidationService {
  async validate<T>(data: unknown, schema: Class<T>): Promise<T> {
    // Type validation
    const instance = plainToClass(schema, data);
    
    // Constraint validation
    const errors = await validate(instance);
    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
    
    // Sanitization
    const sanitized = this.sanitize(instance);
    
    // Business rule validation
    await this.validateBusinessRules(sanitized);
    
    return sanitized;
  }
  
  private sanitize<T>(data: T): T {
    // Remove HTML tags
    // Trim whitespace
    // Normalize data
    return sanitized;
  }
}
```

#### Authentication Guard Pattern
```typescript
// Pattern: Reusable authentication guard
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    
    try {
      const payload = await this.jwtService.verify(token);
      const user = await this.userService.findById(payload.userId);
      
      if (!user || !user.active) {
        throw new UnauthorizedException('Invalid user');
      }
      
      request.user = user;
      return true;
      
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  
  private extractToken(request: Request): string | null {
    const auth = request.headers.authorization;
    if (!auth) return null;
    
    const [type, token] = auth.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
```

## Pattern Selection Guide

### When to Use Each Pattern

| Pattern | Use When | Don't Use When |
|---------|----------|----------------|
| Service Layer | Complex business logic | Simple CRUD operations |
| Repository | Database abstraction needed | Using ORM directly |
| Controller | Building REST APIs | GraphQL APIs |
| Smart/Dumb Components | React applications | Simple static pages |
| Custom Hooks | Reusable React logic | One-time logic |
| Error Boundary | React error handling | Non-React code |
| Caching | Frequent reads | Frequently changing data |
| Lazy Loading | Large datasets | Small, critical data |

## Pattern Anti-Patterns

### What NOT to Do

❌ **Mixing Patterns Incorrectly**
```typescript
// BAD: Controller with database logic
class UserController {
  async create(dto: CreateUserDto) {
    const user = await db.query('INSERT INTO users...'); // Wrong!
    return user;
  }
}
```

✅ **Correct Separation**
```typescript
// GOOD: Controller delegates to service
class UserController {
  constructor(private userService: UserService) {}
  
  async create(dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
```

## Pattern Evolution

### Tracking Pattern Usage
```json
{
  "pattern": "service-layer",
  "usage": {
    "count": 45,
    "lastUsed": "2024-01-15",
    "files": [
      "src/services/user.service.ts",
      "src/services/auth.service.ts"
    ],
    "performance": {
      "avgExecutionTime": "12ms",
      "successRate": "99.8%"
    }
  }
}
```

### Pattern Improvement
- Monitor pattern effectiveness
- Collect usage metrics
- Identify pain points
- Evolve patterns based on feedback
- Document lessons learned

This pattern library ensures consistent, high-quality code across your entire codebase.
