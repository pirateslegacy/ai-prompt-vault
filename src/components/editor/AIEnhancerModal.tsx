import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { usePrompts } from '../../context/PromptContext';
import { openaiService } from '../../services/openaiService';
import { analyticsService } from '../../services/analyticsService';
import { Sparkles, Wand2, Minimize2, Maximize2, Layers, Check, Loader2 } from 'lucide-react';

export const AIEnhancerModal: React.FC = () => {
  const { aiEnhancerPrompt, setAiEnhancerPrompt, updatePrompt, addPrompt, showToast } = usePrompts();

  const [activeAction, setActiveAction] = useState<'improve' | 'shorten' | 'expand' | 'variations'>('improve');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  if (!aiEnhancerPrompt) return null;

  const handleRunAI = async (action: 'improve' | 'shorten' | 'expand' | 'variations') => {
    setActiveAction(action);
    setLoading(true);
    setAiResult(null);
    try {
      const res = await openaiService.enhancePrompt(action, aiEnhancerPrompt.content, aiEnhancerPrompt.title);
      setAiResult(res);
      analyticsService.recordAIEnhancement();
      showToast(`AI ${action} completed!`, 'success');
    } catch (e: any) {
      showToast('AI action failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyChanges = (newContent: string) => {
    updatePrompt(
      aiEnhancerPrompt.id,
      { content: newContent },
      `AI Prompt Enhancement (${activeAction})`
    );
    setAiEnhancerPrompt(null);
  };

  const handleSaveAsCopy = (title: string, newContent: string) => {
    addPrompt({
      title: `${title} (AI ${activeAction.toUpperCase()})`,
      collectionId: aiEnhancerPrompt.collectionId,
      category: aiEnhancerPrompt.category,
      tags: [...aiEnhancerPrompt.tags, 'AI Enhanced'],
      content: newContent,
      notes: `AI Enhanced using action "${activeAction}".`,
      isFavorite: false,
      variables: aiEnhancerPrompt.variables
    });
    setAiEnhancerPrompt(null);
  };

  return (
    <Modal
      isOpen={!!aiEnhancerPrompt}
      onClose={() => setAiEnhancerPrompt(null)}
      title={
        <>
          <Sparkles className="w-5 h-5 text-violet-500" />
          AI Prompt Enhancer & Variation Generator
        </>
      }
      subtitle={`Optimize "${aiEnhancerPrompt.title}" using OpenAI or intelligent offline tools.`}
      maxWidth="4xl"
    >
      <div className="space-y-5">
        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => handleRunAI('improve')}
            disabled={loading}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
              activeAction === 'improve'
                ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-violet-500'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>Improve Prompt</span>
          </button>

          <button
            onClick={() => handleRunAI('shorten')}
            disabled={loading}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
              activeAction === 'shorten'
                ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-violet-500'
            }`}
          >
            <Minimize2 className="w-4 h-4" />
            <span>Shorten Prompt</span>
          </button>

          <button
            onClick={() => handleRunAI('expand')}
            disabled={loading}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
              activeAction === 'expand'
                ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-violet-500'
            }`}
          >
            <Maximize2 className="w-4 h-4" />
            <span>Expand Prompt</span>
          </button>

          <button
            onClick={() => handleRunAI('variations')}
            disabled={loading}
            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
              activeAction === 'variations'
                ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-violet-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Generate 3 Variations</span>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Running AI {activeAction.toUpperCase()} Transformation...
            </p>
          </div>
        )}

        {/* AI Output Comparison View */}
        {!loading && (
          <div className="space-y-4">
            {!aiResult ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500">
                  Select an AI action above (*Improve*, *Shorten*, *Expand*, or *Generate 3 Variations*) to run live transformations on this prompt.
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {/* Explanation Banner */}
                {aiResult.explanation && (
                  <div className="p-3 bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 rounded-xl text-xs text-violet-800 dark:text-violet-200 font-medium">
                    ✨ <strong>AI Enhancement Rationale:</strong> {aiResult.explanation}
                  </div>
                )}

                {/* Variations Array Result OR Single Content Result */}
                {activeAction === 'variations' && aiResult.variations ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {aiResult.variations.map((v: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
                      >
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-2">
                            {v.title}
                          </h4>
                          <pre className="text-[11px] font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap line-clamp-6 leading-relaxed mb-3">
                            {v.content}
                          </pre>
                        </div>
                        <button
                          onClick={() => handleSaveAsCopy(v.title, v.content)}
                          className="w-full px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Save Variation
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Original */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Original Content
                      </p>
                      <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs max-h-72 overflow-y-auto border border-slate-800">
                        <pre className="whitespace-pre-wrap">{aiEnhancerPrompt.content}</pre>
                      </div>
                    </div>

                    {/* AI Output */}
                    <div>
                      <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> AI Transformed Output
                      </p>
                      <div className="p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs max-h-72 overflow-y-auto border border-violet-800/80">
                        <pre className="whitespace-pre-wrap">{aiResult.content}</pre>
                      </div>
                    </div>
                  </div>
                )}

                {/* Single action footer buttons */}
                {activeAction !== 'variations' && aiResult?.content && (
                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      onClick={() => handleSaveAsCopy(aiEnhancerPrompt.title, aiResult.content)}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Save as New Copy
                    </button>
                    <button
                      onClick={() => handleApplyChanges(aiResult.content)}
                      className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-violet-600/20"
                    >
                      <Check className="w-4 h-4" /> Apply Changes to Active Prompt
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
