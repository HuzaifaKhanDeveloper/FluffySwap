# Contributing to FluffySwap

Thank you for your interest in contributing to FluffySwap! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and Solidity
- MetaMask or compatible Web3 wallet

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/fluffyswap.git`
3. Install dependencies: `npm install`
4. Copy environment file: `cp .env.example .env`
5. Configure your `.env` file with required API keys
6. Start development server: `npm run dev`

## 📋 Development Guidelines

### Code Style
- **TypeScript**: All new code must be written in TypeScript
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Use Prettier for code formatting
- **Naming**: Use descriptive names for variables, functions, and components

### Component Structure
```typescript
// Component template
import React from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  // Define props with proper types
}

export const Component: React.FC<ComponentProps> = ({ 
  // Destructure props
}) => {
  // Component logic

  return (
    <motion.div
      // Framer Motion animations
      className="component-styles"
    >
      {/* Component JSX */}
    </motion.div>
  );
};
```

### Smart Contract Guidelines
- Use OpenZeppelin contracts for security
- Include comprehensive error handling
- Add detailed NatSpec documentation
- Follow Solidity style guide
- Include unit tests for all functions

### Git Workflow
1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes with clear, descriptive commits
3. Follow conventional commit format: `type(scope): description`
4. Push to your fork: `git push origin feature/amazing-feature`
5. Create a Pull Request

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npx hardhat test test/FluffySwap.test.ts

# Run frontend tests
npm run test:frontend
```

### Writing Tests
- Write unit tests for all new functions
- Include edge cases and error scenarios
- Use descriptive test names
- Maintain >90% test coverage

### Test Structure
```typescript
describe('Component/Function Name', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do something specific', () => {
    // Test implementation
  });

  it('should handle error cases', () => {
    // Error testing
  });
});
```

## 🎨 Design Guidelines

### UI/UX Principles
- **Kawaii Aesthetic**: Maintain cute, friendly design
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first design approach
- **Performance**: Smooth animations and interactions
- **Consistency**: Follow established design patterns

### Color Usage
- Use the established kawaii color palette
- Ensure sufficient contrast ratios
- Support both light and dark themes
- Use semantic colors for states (success, error, warning)

### Animation Guidelines
- Use Framer Motion for animations
- Keep animations smooth and purposeful
- Respect user's motion preferences
- Use consistent timing and easing

## 🔒 Security Considerations

### Smart Contract Security
- Never use `tx.origin` for authorization
- Implement proper access controls
- Use ReentrancyGuard for state-changing functions
- Validate all inputs thoroughly
- Follow checks-effects-interactions pattern

### Frontend Security
- Sanitize all user inputs
- Use environment variables for sensitive data
- Implement proper error boundaries
- Validate data from external sources

### Private Key Management
- Never commit private keys to version control
- Use environment variables for sensitive data
- Rotate API keys regularly
- Use hardware wallets for production deployments

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for all functions
- Include usage examples
- Document complex logic
- Keep README.md updated

### API Documentation
- Document all contract functions
- Include parameter descriptions
- Provide usage examples
- Document error conditions

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Reproduce the bug
3. Test on different browsers/devices
4. Gather relevant information

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome, Firefox]
- Version: [e.g., 22]
- Wallet: [e.g., MetaMask]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
A clear description of the feature.

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context or screenshots.
```

## 🎯 Areas for Contribution

### High Priority
- Bug fixes and security improvements
- Performance optimizations
- Accessibility improvements
- Test coverage expansion
- Documentation updates

### Medium Priority
- New features and enhancements
- UI/UX improvements
- Code refactoring
- Developer tooling

### Low Priority
- Code style improvements
- Minor optimizations
- Additional examples

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation
- Social media acknowledgments

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Discord**: Real-time chat and community support
- **Email**: Direct contact for sensitive issues

### Code Review Process
1. All PRs require review from maintainers
2. Automated tests must pass
3. Code coverage must be maintained
4. Documentation must be updated
5. Breaking changes require discussion

## 📜 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Enforcement
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

## 📄 License

By contributing to FluffySwap, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FluffySwap! Together, we're building the most kawaii DeFi experience on Ethereum! 🌸✨