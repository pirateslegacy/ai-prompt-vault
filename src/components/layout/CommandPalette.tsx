import React, { useState, useEffect } from 'react';
import { usePrompts } from '../../context/PromptContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Search,
  Plus,
  LayoutDashboard,
  FolderOpen,
  Terminal,
  BookOpen,
  BarChart3,
  Download,
  Sparkles,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';
import type { ActiveTab, Prompt } from '../../types/prompt';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    prompts,
    setActiveTab,
    setIsCreateModalOpen,
    setIsApiKeyModalOpen,
    exportVault,
    setActiveEditPrompt,
    copyToClipboard
  } = usePrompts();
  const { theme, toggleTheme } = useTheme();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsCommandPaletteOpen(false);
  };

  const handleSelectPrompt = (prompt: Prompt) => {
    setActiveEditPrompt(prompt);
    setIsCommandPaletteOpen(false);
  };

  // Filter navigation commands
  const navCommands = [
    { label: 'Go to Dashboard', icon: LayoutDashboard, action: () => navigateTo('dashboard') },
    { label: 'Go to Prompt Library', icon: FolderOpen, action: () => navigateTo('library') },
    { label: 'Go to Prompt Playground', icon: Terminal, action: () => navigateTo('playground') },
    { label: 'Go to Template Marketplace', icon: BookOpen, action: () => navigateTo('templates') },
    { label: 'Go to Smart Analytics', icon: BarChart3, action: () => navigateTo('analytics') }
  ];

  // Action commands
  const quickActions = [
    { label: 'Create New Prompt', icon: Plus, action: () => { setIsCommandPaletteOpen(false); setIsCreateModalOpen(true); } },
    { label: 'Open AI & OpenAI Settings', icon: Sparkles, action: () => { setIsCommandPaletteOpen(false); setIsApiKeyModalOpen(true); } },
    { label: 'Export Vault Backup (JSON)', icon: Download, action: () => { setIsCommandPaletteOpen(false); exportVault(); } },
    { label: `Toggle Theme (${theme === 'dark' ? 'Light' : 'Dark'})`, icon: theme === 'dark' ? Sun : Moon, action: () => { toggleTheme(); } }
  ];

  // Prompt search results
  const promptResults = query.trim()
    ? prompts.filter(
        p =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
          p.content.toLowerCase().includes(query.toLowerCase())
      )
    : prompts.slice(0, 5); // Default top 5 prompts

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsCommandPaletteOpen(false)}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 animate-fade-in">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, search prompts, or jump to view..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full py-4 bg-transparent text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono font-medium text-slate-400 border border-slate-300 dark:border-slate-700 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Prompts Section */}
          <div>
            <p className="px-3 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Prompts ({promptResults.length})
            </p>
            {promptResults.length === 0 ? (
              <p className="px-3 py-2 text-sm text-slate-500 italic">No matching prompts found.</p>
            ) : (
              <div className="mt-1 space-y-1">
                {promptResults.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPrompt(p)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                      <div className="truncate">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                          {p.title}
                        </p>
                        <p className="text-xs text-slate-400 truncate font-mono">
                          {p.content.slice(0, 70)}...
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          copyToClipboard(p);
                        }}
                        className="px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-md"
                      >
                        Copy
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {!query && (
            <div>
              <p className="px-3 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Quick Actions
              </p>
              <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
                {quickActions.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={cmd.action}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                  >
                    <cmd.icon className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {cmd.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          {!query && (
            <div>
              <p className="px-3 py-1 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Navigation
              </p>
              <div className="mt-1 space-y-1">
                {navCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={cmd.action}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <cmd.icon className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {cmd.label}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
