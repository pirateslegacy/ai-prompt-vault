import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import { Plus, Terminal, BookOpen, Command, Sparkles } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const {
    setIsCreateModalOpen,
    setActiveTab,
    setIsCommandPaletteOpen
  } = usePrompts();

  const actions = [
    {
      title: 'New Prompt',
      desc: 'Create and organize a prompt with variables',
      icon: Plus,
      color: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20',
      action: () => setIsCreateModalOpen(true)
    },
    {
      title: 'Testing Playground',
      desc: 'Test variables live & execute model runs',
      icon: Terminal,
      color: 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white',
      action: () => setActiveTab('playground')
    },
    {
      title: '50+ Templates',
      desc: 'Browse pre-built starter prompt packs',
      icon: BookOpen,
      color: 'bg-violet-600 hover:bg-violet-700 text-white shadow-violet-600/20',
      action: () => setActiveTab('templates')
    },
    {
      title: 'Quick Search (Ctrl+K)',
      desc: 'Spotlight command palette search',
      icon: Command,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20',
      action: () => setIsCommandPaletteOpen(true)
    }
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          Quick Actions
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act, idx) => (
          <button
            key={idx}
            onClick={act.action}
            className={`p-4 rounded-xl text-left transition-all shadow-md active:scale-95 flex flex-col justify-between ${act.color}`}
          >
            <div className="flex items-center justify-between mb-2">
              <act.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">{act.title}</p>
              <p className="text-xs opacity-80 mt-0.5">{act.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
