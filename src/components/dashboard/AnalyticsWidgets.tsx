import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import { BarChart2, Award } from 'lucide-react';

export const AnalyticsWidgets: React.FC = () => {
  const { prompts, analytics } = usePrompts();

  // Category counts
  const categoryCounts: Record<string, number> = {};
  prompts.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  const totalPrompts = prompts.length || 1;
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  // Top copied prompts
  const leaderboard = [...prompts]
    .sort((a, b) => (b.copyCount || 0) - (a.copyCount || 0))
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Category Breakdown Progress Bars */}
      <div className="glass-panel p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-indigo-500" />
            Most Used Categories
          </h3>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
            Top: {sortedCategories[0]?.[0] || 'N/A'}
          </span>
        </div>

        <div className="space-y-3.5">
          {sortedCategories.map(([cat, count]) => {
            const percentage = Math.round((count / totalPrompts) * 100);
            return (
              <div key={cat}>
                <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  <span>{cat}</span>
                  <span className="font-mono text-slate-500">
                    {count} prompts ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Copied Prompts Leaderboard */}
      <div className="glass-panel p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Top Copied Prompts
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {analytics.totalCopies} total copies
          </span>
        </div>

        <div className="space-y-3">
          {leaderboard.map((prompt, rank) => (
            <div
              key={prompt.id}
              className="p-3 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                    rank === 0
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : rank === 1
                      ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                  }`}
                >
                  #{rank + 1}
                </div>
                <div className="truncate">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {prompt.title}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    Category: {prompt.category}
                  </p>
                </div>
              </div>

              <div className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                {prompt.copyCount || 0} copies
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
