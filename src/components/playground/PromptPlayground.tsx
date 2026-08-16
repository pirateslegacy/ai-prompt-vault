import React, { useState } from 'react';
import { usePrompts, extractVariables } from '../../context/PromptContext';
import { VariableInputPanel } from './VariableInputPanel';
import { OutputPreviewPanel } from './OutputPreviewPanel';
import { openaiService } from '../../services/openaiService';
import { analyticsService } from '../../services/analyticsService';
import { Terminal, Save } from 'lucide-react';

export const PromptPlayground: React.FC = () => {
  const { prompts, addPrompt, showToast } = usePrompts();

  const [selectedPromptId, setSelectedPromptId] = useState<string>('');
  const [title, setTitle] = useState<string>('Custom Playground Draft');
  const [content, setContent] = useState<string>('Write a blog post about {{Topic}} for {{Audience}} with a {{Tone}} tone.');
  const [variableValues, setVariableValues] = useState<Record<string, string>>({
    Topic: 'Gaming',
    Audience: 'Beginners',
    Tone: 'Casual & Engaging'
  });
  
  const [aiOutput, setAiOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // Parsed variables array
  const detectedVariables = React.useMemo(() => extractVariables(content), [content]);

  // Handle selecting a prompt from the dropdown
  const handleSelectPrompt = (id: string) => {
    setSelectedPromptId(id);
    if (!id) return;
    const target = prompts.find(p => p.id === id);
    if (target) {
      setTitle(target.title);
      setContent(target.content);
      // Pre-fill initial variable placeholders
      const vars = extractVariables(target.content);
      const initialValues: Record<string, string> = {};
      vars.forEach(v => {
        initialValues[v] = variableValues[v] || '';
      });
      setVariableValues(initialValues);
      setAiOutput('');
    }
  };

  // Compute live rendered prompt text by replacing {{vars}}
  const renderedOutput = React.useMemo(() => {
    let result = content;
    detectedVariables.forEach(v => {
      const val = variableValues[v] !== undefined ? variableValues[v] : `{{${v}}}`;
      result = result.replaceAll(`{{${v}}}`, val || `{{${v}}}`);
    });
    return result;
  }, [content, detectedVariables, variableValues]);

  const handleVariableChange = (varName: string, val: string) => {
    setVariableValues(prev => ({ ...prev, [varName]: val }));
  };

  const handleResetVariables = () => {
    const empty: Record<string, string> = {};
    detectedVariables.forEach(v => {
      empty[v] = '';
    });
    setVariableValues(empty);
  };

  const handleExecuteAI = async () => {
    if (!renderedOutput.trim()) return;
    setIsExecuting(true);
    try {
      const result = await openaiService.runPlaygroundExecution(renderedOutput);
      setAiOutput(result);
      analyticsService.recordAIEnhancement();
      showToast('AI execution complete!', 'success');
    } catch (err: any) {
      showToast('Execution error', 'error');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSaveToVault = () => {
    addPrompt({
      title: title || 'Playground Saved Prompt',
      collectionId: 'work',
      category: 'Creative Writing',
      tags: ['Playground', ...detectedVariables],
      content: content,
      notes: 'Saved from Prompt Playground testing panel.',
      isFavorite: false,
      variables: detectedVariables
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Prompt Testing Playground
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Parse variables in real time, build dynamic presets, and execute AI test runs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveToVault}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save to Vault
          </button>
        </div>
      </div>

      {/* Main Grid: Prompt Editor & Playground Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Selector & Content Input (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            {/* Load Prompt Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Load Prompt from Vault
              </label>
              <select
                value={selectedPromptId}
                onChange={e => handleSelectPrompt(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="">-- Load a prompt from your library --</option>
                {prompts.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.variables.length} vars)
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Prompt Title
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            {/* Raw Prompt Content Box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Raw Prompt Template
                </label>
                <span className="text-[10px] font-mono text-indigo-500">
                  {detectedVariables.length} variables detected
                </span>
              </div>
              <textarea
                rows={8}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Type your prompt here... Use {{variable_name}} syntax for dynamic inputs."
                className="w-full p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 leading-relaxed"
              />
            </div>
          </div>

          {/* Variable Inputs */}
          <VariableInputPanel
            variables={detectedVariables}
            values={variableValues}
            onChange={handleVariableChange}
            onReset={handleResetVariables}
          />
        </div>

        {/* Right Column: Live Output & AI Runner (7 cols) */}
        <div className="lg:col-span-7">
          <OutputPreviewPanel
            renderedOutput={renderedOutput}
            aiOutput={aiOutput}
            isExecuting={isExecuting}
            onExecute={handleExecuteAI}
          />
        </div>
      </div>
    </div>
  );
};
