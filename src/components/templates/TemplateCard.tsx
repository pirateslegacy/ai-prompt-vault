import React from 'react';
import type { PromptTemplate } from '../../types/prompt';
import { usePrompts } from '../../context/PromptContext';
import { Badge } from '../ui/Badge';
import { IconResolver } from '../ui/IconResolver';
import { Plus, Star, Copy, Check } from 'lucide-react';

export const TemplateCard: React.FC<{ template: PromptTemplate }> = ({ template }) => {
  const { importTemplateToVault, directCopyText } = usePrompts();
  const [isImported, setIsImported] = React.useState(false);

  const handleImport = () => {
    importTemplateToVault(template);
    setIsImported(true);
    setTimeout(() => setIsImported(false), 2000);
  };

  return (
    <div className="glass-card p-5 rounded-2xl flex flex-col justify-between h-full border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-200 group">
      <div>
        {/* Header: Pack Icon & Rating */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <IconResolver name={template.pack} className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {template.pack} Pack
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{template.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
          {template.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2 leading-relaxed">
          {template.description}
        </p>

        {/* Badges: Category & Variables */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <Badge variant="category" size="sm">
            {template.category}
          </Badge>
          <Badge variant="outline" size="sm">
            {template.difficulty}
          </Badge>
          {template.variables.length > 0 && (
            <Badge variant="brand" size="sm">
              {template.variables.length} variables
            </Badge>
          )}
        </div>

        {/* Prompt Content Preview Box */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800/60 mb-4 font-mono text-[11px] text-slate-700 dark:text-slate-300 line-clamp-3">
          {template.content}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={handleImport}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            isImported
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
          }`}
        >
          {isImported ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isImported ? 'Imported to Vault!' : 'Add to My Vault'}</span>
        </button>

        <button
          onClick={() => directCopyText(template.content, template.title)}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors"
          title="Copy Template Content"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
