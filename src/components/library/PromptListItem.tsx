import React from 'react';
import type { Prompt } from '../../types/prompt';
import { usePrompts } from '../../context/PromptContext';
import { Badge } from '../ui/Badge';
import { Star, Copy, Edit3, Sparkles, History, Trash2 } from 'lucide-react';

export const PromptListItem: React.FC<{ prompt: Prompt }> = ({ prompt }) => {
  const {
    toggleFavorite,
    copyToClipboard,
    deletePrompt,
    setActiveEditPrompt,
    setAiEnhancerPrompt,
    setVersionHistoryPrompt
  } = usePrompts();

  return (
    <div className="glass-card p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-500/50 transition-all">
      <div className="flex items-center gap-3 overflow-hidden flex-1">
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

        <div className="truncate flex-1">
          <div className="flex items-center gap-2">
            <h4
              onClick={() => setActiveEditPrompt(prompt)}
              className="font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer truncate"
            >
              {prompt.title}
            </h4>
            <Badge variant="category" size="sm">
              {prompt.category}
            </Badge>
            {prompt.currentVersion > 1 && (
              <Badge variant="version" size="sm">
                v{prompt.currentVersion}
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">
            {prompt.content}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => copyToClipboard(prompt)}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-colors"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </button>
        <button
          onClick={() => setAiEnhancerPrompt(prompt)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="AI Enhancer"
        >
          <Sparkles className="w-4 h-4" />
        </button>
        <button
          onClick={() => setVersionHistoryPrompt(prompt)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Version History"
        >
          <History className="w-4 h-4" />
        </button>
        <button
          onClick={() => setActiveEditPrompt(prompt)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Edit"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => deletePrompt(prompt.id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
