<div align="center">
  <img src="resources/icon.png" alt="Palet AI Icon" width="120" height="120" />
  
  # Palet AI
  
  **The easiest way to use multiple AI services simultaneously in one screen**
  
  Run and compare ChatGPT, Google Gemini, Claude, and Perplexity side by side. 
  
  **NO API KEY NEEDED**
  
  <img src="Screenshot.jpg" alt="Palet AI Screenshot" width="800" />
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
  ![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey)
  ![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
  
</div>

---

## ✨ Key Features

### 🔑 No API Key Needed

Just log in to each AI service and start using immediately. No complex API setup required!

### 🎯 Ask Multiple AIs at Once

Send questions to multiple AI services from a single input field. Compare responses from ChatGPT, Gemini, Claude, and Perplexity at a glance.

### 🎨 Flexible Layouts

- **Column Layout**: Stack AIs vertically
- **Row Layout**: Arrange AIs horizontally
- **2×2 Grid**: Display 4 screens in a grid

### 🔍 Integrated Browser

Web search is also available. Compare AI responses with actual search results simultaneously.

### 💾 Automatic Login Persistence

Once you log in, your session is automatically saved. You can start using it immediately on the next launch.

### 🎭 Dark Mode

Comes with an eye-friendly dark theme.

---

## 📥 Download & Installation

### Download Pre-built Releases

Visit the [Releases page](https://github.com/cha2hyun/PaletAI/releases) to download the latest version:

- **macOS (Apple Silicon)**: Download `PaletAI-macOS-arm64.zip`

  1. Unzip the downloaded file
  2. **IMPORTANT - Run this command first** (before opening the app):
     ```bash
     xattr -cr ~/Downloads/Palet\ AI.app
     ```
  3. Drag `Palet AI.app` to your Applications folder
  4. Double-click to open

  > 💡 **Why?** macOS marks downloaded apps as "quarantined". This command removes that flag.

- **Windows**: Download `PaletAI-Win32.exe` (32-bit) or `PaletAI-Win64.exe` (64-bit)
  - ⚠️ **Note**: Windows builds are not fully tested yet. Please report any issues you encounter.

### Build from Source

#### macOS (Apple Silicon)

```bash
# Clone the repository
git clone https://github.com/cha2hyun/PaletAI.git
cd PaletAI

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

⚠️ **Windows Support**: Windows builds are not fully tested. If you encounter issues, please open an issue on GitHub.

#### Linux

```bash
yarn dist:linux
```

---

## 🚀 How to Use

### 1️⃣ Getting Started

When you launch the app, you'll see the login screens for each AI service. Log in to the services you want to use.

### 2️⃣ Asking Questions

- Enter your question in the input field at the bottom
- **Enter**: Send question
- **Shift + Enter**: New line

### 3️⃣ Service Selection

If you want to use only specific AIs, you can select/deselect them using the checkboxes at the bottom.

### 4️⃣ Changing Layout

Freely adjust the screen arrangement with the Column/Row/Grid buttons.

---

## 💡 Use Cases

### 📚 Learning & Research

Get more accurate information by comparing responses from multiple AIs.

### ✍️ Writing

Receive ideas from various perspectives at once.

### 🔍 Information Search

Fact-check by viewing AI responses and actual web search results simultaneously.

### 💻 Coding

Compare code suggestions from multiple AIs and choose the optimal solution.

---

## ⚙️ Development Environment

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

## 🎨 Tech Stack

- **Electron 30** - Cross-platform desktop app framework
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Utility-first styling
- **Vite** - Fast build tool
- **Pretendard** - Optimized font for Korean/English

---

## 📝 License

MIT License - Free to use, modify, and distribute.

---

## 👤 Author

**[@cha2hyun](https://github.com/cha2hyun)**

---

## 🔗 Links

- [GitHub Repository](https://github.com/cha2hyun/PaletAI)
- [Issue Reports](https://github.com/cha2hyun/PaletAI/issues)
- [Latest Releases](https://github.com/cha2hyun/PaletAI/releases)

---

<div align="center">
  
  **Use AI smarter with Palet AI! 🎨✨**
  
  Made with ❤️ by @cha2hyun
  
</div>
