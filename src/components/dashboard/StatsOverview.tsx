import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import { Vault, Star, Copy, Sparkles } from 'lucide-react';

export const StatsOverview: React.FC = () => {
  const { prompts, analytics } = usePrompts();

  const totalPrompts = prompts.length;
  const favoriteCount = prompts.filter(p => p.isFavorite).length;
  
  // Find top copied prompt
  const topCopiedPrompt = prompts.reduce((prev, current) => {
    return (current.copyCount || 0) > (prev?.copyCount || 0) ? current : prev;
  }, prompts[0]);

  const cards = [
    {
      label: 'Total Prompts',
      value: totalPrompts,
      subtext: 'Saved in local vault',
      icon: Vault,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      label: 'Favorite Prompts',
      value: favoriteCount,
      subtext: `${totalPrompts > 0 ? Math.round((favoriteCount / totalPrompts) * 100) : 0}% of your library`,
      icon: Star,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      label: 'Most Copied Prompt',
      value: topCopiedPrompt ? `${topCopiedPrompt.copyCount} copies` : '0 copies',
      title: topCopiedPrompt ? topCopiedPrompt.title : 'None yet',
      subtext: topCopiedPrompt ? `Category: ${topCopiedPrompt.category}` : 'Copy a prompt to track',
      icon: Copy,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      label: 'AI Enhancements Used',
      value: analytics.aiEnhancementsUsed || 0,
      subtext: 'Prompt improvements & variations',
      icon: Sparkles,
      color: 'text-violet-500 bg-violet-500/10 border-violet-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="glass-card p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {card.label}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 font-mono tracking-tight">
                {card.value}
              </h3>
              {card.title && (
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate max-w-[160px]">
                  {card.title}
                </p>
              )}
            </div>
            <div className={`p-3 rounded-xl border ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 border-t border-slate-100 dark:border-slate-800/80 pt-2">
            {card.subtext}
          </p>
        </div>
      ))}
    </div>
  );
};
