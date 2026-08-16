import React, { useState, useMemo } from 'react';
import { STARTER_TEMPLATES } from '../../data/starterTemplates';
import type { TemplatePackType } from '../../types/prompt';
import { TemplateCard } from './TemplateCard';
import { BookOpen, Search, PlusCircle } from 'lucide-react';
import { usePrompts } from '../../context/PromptContext';

export const TemplateMarketplace: React.FC = () => {
  const { importTemplateToVault, showToast } = usePrompts();
  const [selectedPack, setSelectedPack] = useState<TemplatePackType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');

  const packs: (TemplatePackType | 'All')[] = [
    'All',
    'Coding',
    'Marketing',
    'Writing',
    'Research',
    'YouTube'
  ];

  const filteredTemplates = useMemo(() => {
    return STARTER_TEMPLATES.filter(tmpl => {
      if (selectedPack !== 'All' && tmpl.pack !== selectedPack) return false;
      if (difficultyFilter !== 'All' && tmpl.difficulty !== difficultyFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          tmpl.title.toLowerCase().includes(q) ||
          tmpl.description.toLowerCase().includes(q) ||
          tmpl.tags.some(t => t.toLowerCase().includes(q)) ||
          tmpl.content.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedPack, searchQuery, difficultyFilter]);

  const handleImportAllInPack = () => {
    filteredTemplates.forEach(t => importTemplateToVault(t));
    showToast(`Imported ${filteredTemplates.length} templates into your vault!`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Prompt Templates Marketplace
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              52+ curated starter prompt templates shipped locally across 5 specialized packs.
            </p>
          </div>
        </div>

        <button
          onClick={handleImportAllInPack}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Import All Visible ({filteredTemplates.length})
        </button>
      </div>

      {/* Filter Tabs & Search Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Pack Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {packs.map(pack => (
            <button
              key={pack}
              onClick={() => setSelectedPack(pack)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedPack === pack
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50'
              }`}
            >
              {pack === 'All' ? '🔥 All Packs (52)' : `${pack} Pack`}
            </button>
          ))}
        </div>

        {/* Search & Difficulty Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <select
            value={difficultyFilter}
            onChange={e => setDifficultyFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="All">All Skill Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map(tmpl => (
          <TemplateCard key={tmpl.id} template={tmpl} />
        ))}
      </div>
    </div>
  );
};
