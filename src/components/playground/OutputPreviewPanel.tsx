import React from 'react';
import { Copy, Play, Sparkles, Loader2 } from 'lucide-react';
import { usePrompts } from '../../context/PromptContext';

interface OutputPreviewPanelProps {
  renderedOutput: string;
  aiOutput: string;
  isExecuting: boolean;
  onExecute: () => void;
}

export const OutputPreviewPanel: React.FC<OutputPreviewPanelProps> = ({
  renderedOutput,
  aiOutput,
  isExecuting,
  onExecute
}) => {
  const { directCopyText } = usePrompts();

  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col h-full space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            Live Preview Output Prompt
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Instant assembled prompt with variables replaced.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => directCopyText(renderedOutput, 'Rendered Prompt')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            Copy Rendered
          </button>

          <button
            onClick={onExecute}
            disabled={isExecuting || !renderedOutput.trim()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
          >
            {isExecuting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white" />
            )}
            <span>{isExecuting ? 'Running Model...' : 'Execute AI Test'}</span>
          </button>
        </div>
      </div>

      {/* Rendered Prompt Text Box */}
      <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-y-auto max-h-56 border border-slate-800 shadow-inner">
        <pre className="whitespace-pre-wrap font-mono leading-relaxed">
          {renderedOutput || '// Type prompt content to see live rendered preview here...'}
        </pre>
      </div>

      {/* AI Model Output Panel */}
      {aiOutput && (
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 animate-fade-in flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AI Execution Output
            </h4>
            <button
              onClick={() => directCopyText(aiOutput, 'AI Output')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Copy Response
            </button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 overflow-y-auto flex-1 font-sans text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
            <pre className="whitespace-pre-wrap font-sans">{aiOutput}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
