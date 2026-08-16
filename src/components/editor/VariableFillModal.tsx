import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { usePrompts, extractVariables } from '../../context/PromptContext';
import { analyticsService } from '../../services/analyticsService';
import { Sliders, Copy, Sparkles } from 'lucide-react';

export const VariableFillModal: React.FC = () => {
  const { variableFillPrompt, setVariableFillPrompt, directCopyText, prompts } = usePrompts();

  const [values, setValues] = useState<Record<string, string>>({});

  const variables = React.useMemo(() => {
    return variableFillPrompt ? extractVariables(variableFillPrompt.content) : [];
  }, [variableFillPrompt]);

  useEffect(() => {
    if (variableFillPrompt) {
      const vars = extractVariables(variableFillPrompt.content);
      const initial: Record<string, string> = {};
      vars.forEach(v => {
        initial[v] = '';
      });
      setValues(initial);
    }
  }, [variableFillPrompt]);

  if (!variableFillPrompt) return null;

  // Render live text with substituted values
  let compiledText = variableFillPrompt.content;
  variables.forEach(v => {
    const replacement = values[v] !== undefined && values[v].trim() !== '' ? values[v] : `{{${v}}}`;
    compiledText = compiledText.replaceAll(`{{${v}}}`, replacement);
  });

  const handleCopy = () => {
    directCopyText(compiledText, `"${variableFillPrompt.title}"`);
    analyticsService.recordCopy(
      variableFillPrompt.id,
      variableFillPrompt.category,
      prompts
    );
    setVariableFillPrompt(null);
  };

  return (
    <Modal
      isOpen={!!variableFillPrompt}
      onClose={() => setVariableFillPrompt(null)}
      title={
        <>
          <Sliders className="w-5 h-5 text-indigo-500" />
          Fill Prompt Variables & Copy
        </>
      }
      subtitle={`Enter values for variable placeholders in "${variableFillPrompt.title}"`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Variable Input Fields */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {variables.map(v => (
            <div key={v} className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono flex items-center justify-between">
                <span>{v}</span>
                <span className="text-[10px] text-slate-400">{"{{"}{v}{"}}"}</span>
              </label>
              <input
                type="text"
                value={values[v] || ''}
                onChange={e => setValues({ ...values, [v]: e.target.value })}
                placeholder={`Enter value for ${v}...`}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
          ))}
        </div>

        {/* Live Preview Box */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            Assembled Prompt Preview
          </label>
          <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs max-h-48 overflow-y-auto border border-slate-800">
            <pre className="whitespace-pre-wrap leading-relaxed">{compiledText}</pre>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setVariableFillPrompt(null)}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <Copy className="w-4 h-4" /> Copy Assembled Prompt
          </button>
        </div>
      </div>
    </Modal>
  );
};
