import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import { PromptCard } from './PromptCard';
import { PromptListItem } from './PromptListItem';
import { FolderSearch, Plus } from 'lucide-react';

export const PromptGrid: React.FC = () => {
  const { filteredPrompts, viewMode, setIsCreateModalOpen } = usePrompts();

  if (filteredPrompts.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-2xl text-center flex flex-col items-center justify-center my-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center mb-3">
          <FolderSearch className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No Prompts Found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
          No prompts match your current search query or category filters. Try clearing your filters or create a new prompt.
        </p>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 shadow-md shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          Create Prompt
        </button>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-2.5">
        {filteredPrompts.map(prompt => (
          <PromptListItem key={prompt.id} prompt={prompt} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {filteredPrompts.map(prompt => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
};
