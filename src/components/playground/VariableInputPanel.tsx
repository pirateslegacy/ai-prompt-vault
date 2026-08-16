import React from 'react';
import { Sliders, Sparkles } from 'lucide-react';

interface VariableInputPanelProps {
  variables: string[];
  values: Record<string, string>;
  onChange: (varName: string, value: string) => void;
  onReset: () => void;
}

export const VariableInputPanel: React.FC<VariableInputPanelProps> = ({
  variables,
  values,
  onChange,
  onReset
}) => {
  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-500" />
          Dynamic Variables ({variables.length})
        </h3>
        {variables.length > 0 && (
          <button
            onClick={onReset}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Reset All
          </button>
        )}
      </div>

      {variables.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400">
          <Sparkles className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
          <p className="text-xs font-medium">No variables detected in current prompt.</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Add <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-500 font-mono">{"{{variable_name}}"}</code> syntax to your prompt text to test variables live!
          </p>
        </div>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          {variables.map(v => (
            <div key={v} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  {v}
                </label>
                <span className="text-[10px] text-slate-400 font-mono">{"{{"}{v}{"}}"}</span>
              </div>
              <input
                type="text"
                value={values[v] || ''}
                onChange={e => onChange(v, e.target.value)}
                placeholder={`Enter value for ${v}...`}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-xs"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
