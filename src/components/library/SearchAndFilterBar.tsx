import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import type { CategoryType, SortOption } from '../../types/prompt';
import { Search, X, LayoutGrid, List } from 'lucide-react';

export const SearchAndFilterBar: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCollectionId,
    setSelectedCollectionId,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    collections,
    filteredPrompts,
    prompts
  } = usePrompts();

  const categories: (CategoryType | 'All')[] = [
    'All',
    'System Prompt',
    'Creative Writing',
    'Code Generation',
    'Data Analysis',
    'Copywriting',
    'Brainstorming',
    'Productivity',
    'Custom'
  ];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedCollectionId !== 'All' ||
    selectedTag !== null;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCollectionId('All');
    setSelectedTag(null);
  };

  return (
    <div className="space-y-4">
      {/* Top Bar: Search Input & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Real-Time Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search prompts by title, content, notes, or tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Collection Dropdown & Sort & View Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Collection Filter */}
          <div className="relative">
            <select
              value={selectedCollectionId}
              onChange={e => setSelectedCollectionId(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="All">All Folders</option>
              {collections.map(col => (
                <option key={col.id} value={col.id}>
                  📁 {col.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="updatedAt">Sort: Recently Updated</option>
            <option value="createdAt">Sort: Date Created</option>
            <option value="title">Sort: Alphabetical (A-Z)</option>
            <option value="favorites">Sort: Favorites First</option>
            <option value="copyCount">Sort: Most Copied</option>
          </select>

          {/* Grid / List View Switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills & Selected Tag Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Selected Tag Indicator / Clear Filters */}
        <div className="flex items-center gap-2 shrink-0">
          {selectedTag && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 border border-violet-300 dark:border-violet-800">
              Tag: #{selectedTag}
              <button onClick={() => setSelectedTag(null)}>
                <X className="w-3 h-3 hover:text-violet-900" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear Filters
            </button>
          )}

          <span className="text-xs font-mono text-slate-400">
            Showing {filteredPrompts.length} of {prompts.length}
          </span>
        </div>
      </div>
    </div>
  );
};
