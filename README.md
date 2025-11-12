<div align="center">
  <img src="resources/icon.png" alt="Palet AI Icon" width="120" height="120" />
  
  # Palet AI
  
  **The easiest way to use multiple AI services simultaneously in one screen**
  
  Run and compare ChatGPT, Google Gemini, Claude, and Perplexity side by side. 
  
  **NO API KEY NEEDED**
  
  <img src="Screenshot.jpg" alt="Palet AI Screenshot" width="800" />
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
  ![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)
  ![Version](https://img.shields.io/badge/version-1.0.2-green.svg)
  [![Homebrew](https://img.shields.io/badge/homebrew-available-orange.svg)](https://github.com/cha2hyun/homebrew-tap)
  
</div>

---

## Key Features

### No API Key Needed

Just log in to each AI service and start using immediately. No complex API setup required!

### Ask Multiple AIs at Once

Send questions to multiple AI services from a single input field. Compare responses from ChatGPT, Gemini, Claude, and Perplexity at a glance.

### Flexible Layouts

- **Column Layout**: Stack AIs vertically
- **Row Layout**: Arrange AIs horizontally
- **2x2 Grid**: Display 4 screens in a grid

### Integrated Browser

Web search is also available. Compare AI responses with actual search results simultaneously.

### Automatic Login Persistence

Once you log in, your session is automatically saved. You can start using it immediately on the next launch.

### Dark Mode

Comes with an eye-friendly dark theme.

---

## Download & Installation

### Homebrew (RECOMMENDED)

**The easiest and best way to install on macOS:**

⚠️ **Note**: macOS ARM64 (Apple Silicon M1/M2/M3) only. Intel Macs are not supported.

```bash
# One-line install (recommended)
brew install --cask cha2hyun/tap/palet-ai
```

Or if you prefer shorter commands:

```bash
# Add tap first, then use short name
brew tap cha2hyun/tap
brew install --cask palet-ai
```

That's it! The app is ready to use.

**Why Homebrew is recommended:**

- **One-command installation** - Simple and fast
- **No code signing issues** - Automatic quarantine removal
- **Easy updates** - Just run `brew upgrade palet-ai`
- **Trusted platform** - Used by millions of developers worldwide
- **No manual steps** - Works immediately after installation

<details>
<summary>More Homebrew commands</summary>

```bash
# Update to latest version
brew upgrade palet-ai

# Uninstall
brew uninstall --cask palet-ai

# Check app info
brew info palet-ai

# List all installed casks
brew list --cask
```

</details>

---

### Direct Download from GitHub Releases

⚠️ **NOT RECOMMENDED** - Manual steps required due to lack of code signing

<details>
<summary>⚠️ Why direct download is not recommended (Click to expand)</summary>

This app is **not signed with an Apple Developer ID** (costs $99/year). When you download directly from GitHub:

- ❌ macOS will block the app with **"app is damaged"** error
- ⚠️ You must **manually remove quarantine** attribute
- ⚠️ Extra terminal commands required
- ⚠️ More steps and potential security warnings

**We strongly recommend using Homebrew instead**, which handles all of this automatically.

</details>

If you still want to download directly, visit the [Releases page](https://github.com/cha2hyun/palet-ai/releases):

#### macOS (Apple Silicon Only)

Download `palet-ai-macOS-arm64.zip`

⚠️ **Note**: Only ARM64 (Apple Silicon M1/M2/M3) is supported. Intel Macs are not supported.

1. Unzip the downloaded file
2. ⚠️ **REQUIRED - Run this command in Terminal:**
   ```bash
   xattr -cr ~/Downloads/Palet\ AI.app
   ```
3. Drag `Palet AI.app` to your Applications folder
4. Double-click to open

> **Why is this needed?** Without Apple Developer code signing, macOS marks downloaded apps as "quarantined". The `xattr` command removes this flag. **Homebrew does this automatically.**

#### Windows

Download `palet-ai-Win32.exe` (32-bit) or `palet-ai-Win64.exe` (64-bit)

⚠️ **Note**: Windows builds are not fully tested yet. Please report any issues you encounter.

#### Linux

⚠️ **Note**: Linux builds are not fully tested yet. Please report any issues you encounter.

### Build from Source

#### macOS (Apple Silicon Only)

⚠️ **Note**: Only ARM64 (Apple Silicon M1/M2/M3) is supported. Intel Macs are not supported.

```bash
# Clone the repository
git clone https://github.com/cha2hyun/palet-ai.git
cd palet-ai

# Install dependencies
yarn install

# Build the app
yarn dist:mac:arm64
```

The built app can be found in the `dist/mac-arm64/` folder.

#### Windows

```bash
# For 32-bit
yarn dist:win

# For 64-bit
yarn dist:win:x64
```

⚠️ **Note**: Windows builds are not fully tested yet. Please report any issues you encounter.

#### Linux

```bash
yarn dist:linux
```

⚠️ **Note**: Linux builds are not fully tested yet. Please report any issues you encounter.

---

## How to Use

### Getting Started

When you launch the app, you'll see the login screens for each AI service. Log in to the services you want to use.

### Asking Questions

- Enter your question in the input field at the bottom
- **Enter**: Send question
- **Shift + Enter**: New line

### Service Selection

If you want to use only specific AIs, you can select/deselect them using the checkboxes at the bottom.

### Changing Layout

Freely adjust the screen arrangement with the Column/Row/Grid buttons.

---

## Use Cases

### Learning & Research

Get more accurate information by comparing responses from multiple AIs.

### Writing

Receive ideas from various perspectives at once.

### Information Search

Fact-check by viewing AI responses and actual web search results simultaneously.

### Coding

Compare code suggestions from multiple AIs and choose the optimal solution.

---

## Development Environment

### Requirements

- Node.js 16 or higher
- yarn (recommended) or npm

### Running in Development Mode

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run Electron in a separate terminal
yarn dev:electron
```

---

## Tech Stack

- **Electron 30** - Cross-platform desktop app framework
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Utility-first styling
- **Vite** - Fast build tool
- **Pretendard** - Optimized font for Korean/English

---

## License

MIT License - Free to use, modify, and distribute.

---

## Author

**[@cha2hyun](https://github.com/cha2hyun)**

---

## Links

- [GitHub Repository](https://github.com/cha2hyun/palet-ai)
- [Homebrew Tap](https://github.com/cha2hyun/homebrew-tap)
- [Issue Reports](https://github.com/cha2hyun/palet-ai/issues)
- [Latest Releases](https://github.com/cha2hyun/palet-ai/releases)

---

<div align="center">
  
  **Use AI smarter with Palet AI!**
  
  Made by @cha2hyun
  
</div>
