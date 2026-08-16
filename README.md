# VaultForPrompt

**VaultForPrompt** is your personal AI prompt vault. Designed for AI engineers, prompt architects, and content creators, it enables users to organize, search, test, enhance, and version-control AI prompts locally inside their browser.

---

## 🌟 Key Features

- **Dashboard & Smart Analytics**: Track total prompts, favorite prompts, top-copied prompts, and category usage metrics.
- **Prompt Library**: Grid and List views with multi-field search, collection folder filtering, tag filtering, and sorting options.
- **Prompt Editor & Version History**: Create, edit, duplicate, and delete prompts. Automatic version history snapshots (`v1`, `v2`, `v3`...) with side-by-side version comparison and 1-click restore.
- **Interactive Variable Replacer**: Automatically parses `{{variable}}` syntax, opens a dynamic input form on copy, and compiles live prompt text.
- **Testing Playground**: Interactive sandbox with live variable value substitution, compiled output preview, and AI test execution.
- **52 Local Starter Templates**: Pre-loaded starter packs across Coding, Marketing, Writing, Research, and YouTube with 1-click import to vault.
- **AI Enhancement Suite**: *Improve*, *Shorten*, *Expand*, and *Generate 3 Variations* supported via OpenAI API or built-in offline simulator.
- **Privacy & Local Storage**: All prompt library data, custom collections, version histories, and settings are saved locally in your browser (`localStorage`). No backend server required.
- **Keyboard Shortcuts & Command Palette**: Spotlight search (`Ctrl+K` / `Cmd+K`), Quick Create (`Ctrl+N`), Save Form (`Ctrl+S`), Duplicate (`Ctrl+D`), and Hotkey Help (`?`).
- **Data Backup & Restore**: Download full JSON vault backups and import existing JSON backup files.

---

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Linter**: Oxlint

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed on your system.

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 3. Create Production Build

```bash
npm run build
```

This compiles TypeScript and outputs optimized production assets into the `dist/` directory.

### 4. Preview Production Build Locally

```bash
npm run preview
```

---

## 🔒 Data Privacy & OpenAI API Integration

- **Local Browser Storage**: All prompts, collections, custom tags, version histories, and analytics are stored locally in your web browser (`localStorage`).
- **No Backend Required**: The application operates as a standalone frontend Single Page Application (SPA). No remote server or database is required for core functionality.
- **Optional OpenAI Integration**: 
  - Using real OpenAI model features is completely optional.
  - If you choose to connect OpenAI, you provide your own personal OpenAI API key inside the settings modal.
  - API keys entered in the application are stored locally in your browser's `localStorage` and sent directly from your browser to OpenAI's endpoint (`https://api.openai.com`). Keys are never sent to any intermediate server.
- **Offline Simulation Mode**: If no OpenAI API key is provided, the application automatically uses a built-in offline simulation engine for all prompt enhancement and testing features.
