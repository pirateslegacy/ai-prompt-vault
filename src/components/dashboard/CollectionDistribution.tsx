import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import { IconResolver } from '../ui/IconResolver';
import { Folder, ArrowRight } from 'lucide-react';

export const CollectionDistribution: React.FC = () => {
  const { collections, prompts, setSelectedCollectionId, setActiveTab } = usePrompts();

  const handleCollectionClick = (id: string) => {
    setSelectedCollectionId(id);
    setActiveTab('library');
  };

  return (
    <div className="glass-panel p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Folder className="w-4 h-4 text-indigo-500" />
          Collections & Project Folders
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {collections.map(col => {
          const count = prompts.filter(p => p.collectionId === col.id).length;
          return (
            <div
              key={col.id}
              onClick={() => handleCollectionClick(col.id)}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 hover:border-indigo-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: col.color }}
                  >
                    <IconResolver name={col.iconName} className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {count} prompts
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {col.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {col.description}
                </p>
              </div>

              <div className="flex items-center justify-end text-xs font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity mt-3">
                View folder <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
