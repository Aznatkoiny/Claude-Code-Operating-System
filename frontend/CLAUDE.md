# Frontend CLAUDE.md - UI/UX Specific Rules

inherit: ../CLAUDE.md

## 🎨 Frontend-Specific Principles

### Component Architecture
- **Atomic Design**: atoms → molecules → organisms → templates → pages
- **Single Responsibility**: One component, one purpose
- **Composition over Inheritance**: Use hooks and HOCs
- **Props Interface First**: Define types before implementation

### React Best Practices
```typescript
// ALWAYS: Functional components with hooks
const Component: FC<Props> = ({ prop1, prop2 }) => {
  // Hook rules
  const [state, setState] = useState<Type>(initialValue);
  useEffect(() => {
    // Cleanup required
    return () => cleanup();
  }, [dependencies]);
  
  // Early returns for edge cases
  if (!data) return <Loading />;
  if (error) return <Error />;
  
  // Main render
  return <div>{content}</div>;
};

// NEVER: Class components (unless absolutely necessary)
```

### State Management
```yaml
local_state: useState for component-specific
global_state: Context API or Redux/Zustand
server_state: React Query or SWR
form_state: React Hook Form
url_state: React Router params
```

### Performance Rules
- **Memoization**: Use React.memo, useMemo, useCallback appropriately
- **Code Splitting**: Lazy load routes and heavy components
- **Image Optimization**: Use next/image or lazy loading
- **Bundle Size**: Keep chunks under 244KB
- **Virtual Scrolling**: For lists > 100 items

### Accessibility (a11y)
```html
<!-- MANDATORY for every component -->
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus management
- Screen reader testing
- Color contrast (WCAG AA minimum)
```

### Testing Strategy
```typescript
// Unit tests for logic
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<Component />);
    await user.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalled();
  });
});

// Integration tests for flows
// E2E tests for critical paths
```

### Styling Guidelines
```scss
// CSS Modules or styled-components
.component {
  // Mobile-first
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
}

// Design tokens
--color-primary: #007bff;
--spacing-unit: 8px;
--font-size-base: 16px;
```

### Security Frontend
- **XSS Prevention**: Never use dangerouslySetInnerHTML without sanitization
- **CSP Headers**: Implement Content Security Policy
- **HTTPS Only**: Ensure all resources use HTTPS
- **Input Validation**: Client-side validation + server-side verification
- **Secure Storage**: Never store sensitive data in localStorage

### Build & Deploy
```bash
# Development
npm run dev
npm run storybook

# Production
npm run build
npm run analyze  # Bundle analysis
npm run lighthouse  # Performance audit

# Testing
npm run test
npm run test:e2e
npm run test:a11y
```

### UI/UX Patterns
- **Loading States**: Skeleton screens > Spinners
- **Error Boundaries**: Graceful error handling
- **Empty States**: Meaningful placeholders
- **Optimistic Updates**: Update UI before server confirmation
- **Progressive Enhancement**: Works without JS

### Screenshot Iteration Workflow
```bash
1. Capture current UI state
2. Annotate desired changes
3. Implement iteratively
4. A/B test if needed
5. Measure Core Web Vitals
```

---

**Remember**: User experience is paramount. Performance, accessibility, and security are not optional.
