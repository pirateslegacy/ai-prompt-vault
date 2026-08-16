import React from 'react';
import type { Prompt } from '../../types/prompt';
import { usePrompts } from '../../context/PromptContext';
import { Badge } from '../ui/Badge';
import {
  Star,
  Copy,
  Edit3,
  CopyPlus,
  Sparkles,
  History,
  Trash2,
  Folder
} from 'lucide-react';

export const PromptCard: React.FC<{ prompt: Prompt }> = ({ prompt }) => {
  const {
    toggleFavorite,
    copyToClipboard,
    duplicatePrompt,
    deletePrompt,
    setActiveEditPrompt,
    setAiEnhancerPrompt,
    setVersionHistoryPrompt,
    setSelectedTag,
    collections
  } = usePrompts();

  const collection = collections.find(c => c.id === prompt.collectionId);

  return (
    <div className="glass-card rounded-2xl p-5 flex flex-col justify-between h-full group hover:shadow-lg transition-all duration-200 border border-slate-200 dark:border-slate-800 relative">
      {/* Card Header: Title & Badges */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 truncate">
            <h3
              onClick={() => setActiveEditPrompt(prompt)}
              className="font-bold text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer truncate"
              title={prompt.title}
            >
              {prompt.title}
            </h3>
          </div>

          <button
            onClick={() => toggleFavorite(prompt.id)}
            className="text-slate-300 dark:text-slate-700 hover:text-amber-400 transition-colors shrink-0 p-1"
            title={prompt.isFavorite ? 'Remove Favorite' : 'Mark as Favorite'}
          >
            <Star
              className={`w-4 h-4 ${
                prompt.isFavorite ? 'text-amber-400 fill-amber-400' : ''
              }`}
            />
          </button>
        </div>

        {/* Badges row: Collection, Category, Version count */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {collection && (
            <Badge variant="outline" size="sm">
              <Folder className="w-3 h-3" style={{ color: collection.color }} />
              <span>{collection.name}</span>
            </Badge>
          )}
          <Badge variant="category" size="sm">
            {prompt.category}
          </Badge>
          {prompt.currentVersion > 1 && (
            <Badge variant="version" size="sm">
              v{prompt.currentVersion}
            </Badge>
          )}
          {prompt.variables.length > 0 && (
            <Badge variant="brand" size="sm">
              {prompt.variables.length} vars
            </Badge>
          )}
        </div>

        {/* Prompt Content Preview */}
        <div
          onClick={() => setActiveEditPrompt(prompt)}
          className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 mb-3 cursor-pointer group-hover:border-indigo-500/30 transition-colors"
        >
          <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap line-clamp-4 font-sans leading-relaxed">
            {prompt.content}
          </pre>
        </div>

        {/* Notes (if present) */}
        {prompt.notes && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic line-clamp-1 mb-3">
            💡 {prompt.notes}
          </p>
        )}

        {/* Tags List */}
        {prompt.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mb-4">
            {prompt.tags.map((t, idx) => (
              <Badge
                key={idx}
                variant="tag"
                size="sm"
                onClick={() => setSelectedTag(t)}
              >
                #{t}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        {/* Left: Copy Main Action */}
        <button
          onClick={() => copyToClipboard(prompt)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
          title="Copy Prompt Content"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </button>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setAiEnhancerPrompt(prompt)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/60 transition-colors"
            title="AI Enhancer (Improve, Shorten, Expand, Variations)"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => setVersionHistoryPrompt(prompt)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-colors"
            title="Version History & Compare"
          >
            <History className="w-4 h-4" />
          </button>
          <button
            onClick={() => duplicatePrompt(prompt.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Duplicate Prompt"
          >
            <CopyPlus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveEditPrompt(prompt)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Edit Prompt"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => deletePrompt(prompt.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 transition-colors"
            title="Delete Prompt"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
