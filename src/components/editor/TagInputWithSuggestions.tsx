import React, { useState, useRef, useEffect } from 'react';
import { POPULAR_TAGS } from '../../data/suggestedTags';
import { X, Plus } from 'lucide-react';

interface TagInputWithSuggestionsProps {
  tags: string[];
  onChange: (newTags: string[]) => void;
}

export const TagInputWithSuggestions: React.FC<TagInputWithSuggestionsProps> = ({ tags, onChange }) => {
  const [inputVal, setInputVal] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggested tags based on input text and exclude already selected tags
  const suggestions = POPULAR_TAGS.filter(
    t => !tags.includes(t) && t.toLowerCase().includes(inputVal.toLowerCase().trim())
  ).slice(0, 8);

  const addTag = (tagToAdd: string) => {
    const formatted = tagToAdd.trim().replace(/^#/, '');
    if (formatted && !tags.includes(formatted)) {
      onChange([...tags, formatted]);
    }
    setInputVal('');
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputVal.trim()) {
        addTag(inputVal);
      }
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative space-y-2">
      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
        Tags & Keywords
      </label>

      {/* Selected Tags Pills */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500/50">
        {tags.map(t => (
          <span
            key={t}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-md"
          >
            #{t}
            <button
              type="button"
              onClick={() => removeTag(t)}
              className="hover:text-indigo-900 dark:hover:text-indigo-100"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputVal}
          onChange={e => {
            setInputVal(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Type tag name (e.g. ChatGPT, SEO, Coding)..." : "Add tag..."}
          className="flex-1 min-w-[140px] bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none py-1"
        />
      </div>

      {/* Suggested Tags Auto-complete Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-40 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 max-h-48 overflow-y-auto animate-fade-in">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
            Suggested Tags
          </p>
          <div className="flex flex-wrap gap-1 mt-1">
            {suggestions.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => addTag(s)}
                className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-300 rounded-md transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-indigo-500" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
