# Changelog

All notable changes to Palet AI will be documented in this file.

## [1.0.8] - 2025-12-30

### ⚙️ Developer Experience

- **Comprehensive Project Guidelines**: Added `.cursorrules` file with complete project documentation
  - Git workflow rules: Never push to deploy branch, always ask user before pushing
  - Detailed commit message conventions following Conventional Commits format
  - Complete 8-step release checklist with README and release notes verification
  - Step-by-step guide for adding new AI services (9 files to update)
  - Version management and CHANGELOG formatting standards
  - UI/UX guidelines, common patterns, and troubleshooting tips
  - Pre-commit and pre-push checklists

### 🐛 Bug Fixes

- **Version Auto-Sync**: Fixed app version synchronization issue
  - App version now automatically reads from `package.json` via import
  - Eliminated need for manual version updates in `useReleaseChecker.ts`
  - Prevents version mismatch between package.json and app display
  - Ensures release checker correctly identifies current version

---

## [1.0.7] - 2025-12-30

### ✨ Features

- **Mistral AI Support**: Added Mistral AI as a new AI service option
  - Full integration with chat interface
  - Persistent session support
  - DOM analysis and developer tools

### 🎨 UI/UX Improvements

- **External Browser Links**: GitHub and release notification links now open in your default browser instead of in-app
- **Zoom Control Enhancement**: Added "Zoom" label to zoom controls for better visibility
- **New Chat Button**: Added lightning emoji (⚡️) for better visual emphasis
- **Layout Labels**: Removed colons from "Target" and "Layout" labels for cleaner UI
- **Responsive Layout**: Control area now wraps to multiple lines on smaller screens

### 🔧 Developer Experience

- **Reset Button Location**: Moved Reset button from main controls to Developer Tools section
- **Mistral DevTools**: Added DevTools and DOM analysis support for Mistral AI

### 🎯 Grid Layout Improvements

- **Smart Constraints**: Grid layout (2x2) now enforces maximum 4 service selections
  - Visual tooltips when limit is reached
  - Automatic fallback to Row layout when constraints are violated
  - Bi-directional validation (both service selector and layout selector)

### ⚙️ Default Settings Changes

- **Default Zoom Level**: Changed from -1 to 0 (normal size) for better initial experience
- **Default Layout**: Changed from Column to Row for better multi-service view
- **Default Services**: All AI services (ChatGPT, Gemini, Perplexity, Claude, Mistral) enabled by default

### 🐛 Bug Fixes

- Fixed useEffect return type warning
- Fixed React import for useAIServices hook
- Improved localStorage validation for new services
- Added try-finally block to ensure isSending state is properly reset even on errors

---

## [1.0.6] - Previous Release

### Features

- Zoom level persistence
- Window zoom shortcuts (Cmd +/-)
- Multiple AI services support

---

## Installation

**macOS (Apple Silicon):**

```bash
brew install --cask cha2hyun/tap/palet-ai
```

**Windows:**
Download and run `Palet-AI-Setup.exe`
