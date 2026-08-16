import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import { Badge } from '../ui/Badge';
import { Clock, Star, Copy, Edit3, ArrowRight } from 'lucide-react';

export const RecentPrompts: React.FC = () => {
  const { prompts, setActiveEditPrompt, toggleFavorite, copyToClipboard, setActiveTab } = usePrompts();

  // Get top 4 recent prompts by updatedAt
  const recentList = [...prompts]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  return (
    <div className="glass-panel p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-500" />
          Recently Added & Updated
        </h3>
        <button
          onClick={() => setActiveTab('library')}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          View Library <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {recentList.map(prompt => (
          <div
            key={prompt.id}
            className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 hover:border-indigo-500/50 transition-all flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <button
                onClick={() => toggleFavorite(prompt.id)}
                className="text-slate-300 dark:text-slate-700 hover:text-amber-400 transition-colors shrink-0"
              >
                <Star
                  className={`w-4 h-4 ${
                    prompt.isFavorite ? 'text-amber-400 fill-amber-400' : ''
                  }`}
                />
              </button>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h4
                    onClick={() => setActiveEditPrompt(prompt)}
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer truncate"
                  >
                    {prompt.title}
                  </h4>
                  <Badge variant="category" size="sm">
                    {prompt.category}
                  </Badge>
                  {prompt.variables.length > 0 && (
                    <Badge variant="brand" size="sm">
                      {prompt.variables.length} vars
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">
                  {prompt.content.slice(0, 80)}...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => copyToClipboard(prompt)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Copy Prompt"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveEditPrompt(prompt)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Edit Prompt"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
