import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import { ThemeToggle } from './ThemeToggle';
import { Search, Plus, Sparkles, Keyboard, Command, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    setIsCreateModalOpen,
    setIsApiKeyModalOpen,
    setIsShortcutsModalOpen,
    setIsCommandPaletteOpen,
    setIsMobileSidebarOpen,
    aiConfig
  } = usePrompts();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-3">
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileSidebarOpen(true)}
        className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Open Navigation Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Quick Command Palette Search Bar */}
      <div className="flex-1 max-w-xl">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:border-indigo-500/50 transition-all text-sm group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            <span className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              Search prompts, tags, or type commands...
            </span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md shadow-xs">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </div>
        </button>
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* AI Key Status Button */}
        <button
          onClick={() => setIsApiKeyModalOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
            aiConfig.enabled && aiConfig.apiKey
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
          }`}
          title="Configure AI & OpenAI API Key"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden md:inline">
            {aiConfig.enabled && aiConfig.apiKey ? 'OpenAI Connected' : 'AI Simulator Active'}
          </span>
        </button>

        {/* Shortcuts Cheat Sheet Trigger */}
        <button
          onClick={() => setIsShortcutsModalOpen(true)}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          title="Keyboard Shortcuts (?)"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* New Prompt Action */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Prompt</span>
        </button>
      </div>
    </header>
  );
};
