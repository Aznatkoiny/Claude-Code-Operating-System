# Frontend-Specific Claude Rules

This file contains rules specific to frontend development.

## 🎨 UI/UX Principles

### Component Development
- Use functional components with hooks
- Keep components under 200 lines
- Extract reusable logic into custom hooks
- Follow atomic design principles

### State Management
```typescript
// PATTERN: Use proper state management
// Local state for component-specific data
const [localState, setLocalState] = useState();

// Global state for app-wide data
const globalState = useContext(AppContext);

// Server state with react-query or SWR
const { data, error } = useQuery('key', fetcher);
```

## 🎯 Frontend-Specific Rules

### Performance
- Lazy load components with React.lazy()
- Memoize expensive computations
- Use virtual scrolling for long lists
- Implement code splitting
- Optimize images and assets

### Accessibility
- All interactive elements keyboard accessible
- ARIA labels on custom components
- Color contrast ratios meet WCAG standards
- Screen reader friendly
- Focus management in SPAs

### Testing
```javascript
// PATTERN: Component testing
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('handles user interaction', async () => {
    render(<Component />);
    await userEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalled();
  });
});
```

## 📦 Build & Bundle

### Optimization Checklist
- [ ] Tree shaking enabled
- [ ] Minification configured
- [ ] Source maps for debugging
- [ ] Bundle size analysis
- [ ] Critical CSS inlined

## 🎨 Style Guidelines

### CSS-in-JS Pattern
```typescript
// Use emotion or styled-components
const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  padding: 8px 16px;
  border-radius: 4px;
`;
```

### Responsive Design
- Mobile-first approach
- Use CSS Grid and Flexbox
- Breakpoints: 320px, 768px, 1024px, 1440px
- Test on real devices

## See Also
- @../../CLAUDE.md - Global rules
- @../../context/patterns/frontend/ - Frontend patterns
