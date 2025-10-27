# Contributing to ValiBNB

Thank you for your interest in contributing to ValiBNB! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please be respectful and constructive in all interactions.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Basic knowledge of JavaScript/Node.js
- Familiarity with Binance Smart Chain

### Setting Up Development Environment

1. **Fork the repository**
   ```bash
   # Fork on GitHub first, then clone
   git clone https://github.com/YOUR_USERNAME/validnb.git
   cd validnb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Verify it works**
   ```bash
   curl http://localhost:3001/health
   ```

## 📝 Making Changes

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring

### Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: Add support for BEP-20 token verification
fix: Resolve BigInt serialization error
docs: Update API documentation
refactor: Improve error handling
```

### Testing Your Changes

Before submitting a PR:

1. **Test locally**
   ```bash
   npm start
   ```

2. **Test API endpoints**
   ```bash
   curl http://localhost:3001/health
   curl http://localhost:3001/supported
   ```

3. **Check for linting errors**
   ```bash
   npm test
   ```

## 🔄 Submitting Pull Requests

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add comments for complex logic
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Go to the ValiBNB repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Submit for review

## 📋 Pull Request Template

When opening a PR, please include:

- **Description**: What changes were made and why
- **Type of Change**:
  - [ ] Bug fix
  - [ ] New feature
  - [ ] Documentation
  - [ ] Performance improvement
  - [ ] Code refactoring

- **Testing**: How was this tested?
- **Checklist**:
  - [ ] Code follows project style guidelines
  - [ ] Tests pass locally
  - [ ] Documentation updated
  - [ ] No linting errors

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: How to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - Node.js version
   - Operating system
   - Network (mainnet/testnet)
6. **Screenshots/Logs**: If applicable

## 💡 Suggesting Features

We welcome feature suggestions! When proposing a feature:

1. Check if it's already been suggested
2. Clearly describe the use case
3. Explain how it fits with ValiBNB's goals
4. Consider implementation complexity

## 🎨 Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Use `camelCase` for variables and functions
- Use `UPPER_CASE` for constants
- Add comments for complex logic
- Keep functions small and focused

## 📚 Documentation

When adding features:

- Update README.md if needed
- Add JSDoc comments to functions
- Update API documentation
- Add examples if relevant

## ⚡ Quick Contribution Ideas

Good first contributions:

- [ ] Add more BSC RPC endpoints
- [ ] Improve error messages
- [ ] Add unit tests
- [ ] Improve UI/UX
- [ ] Add rate limiting dashboard
- [ ] Add monitoring hooks
- [ ] Improve documentation
- [ ] Add TypeScript definitions
- [ ] Translate documentation

## 🏆 Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Credited on the website (coming soon)

## ❓ Questions?

- Open an issue for questions
- Join discussions
- Check existing issues/PRs

Thank you for contributing to ValiBNB! 🎉

