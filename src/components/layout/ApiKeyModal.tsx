import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { usePrompts } from '../../context/PromptContext';
import { Key, Sparkles, ShieldAlert, Check, Trash2 } from 'lucide-react';

export const ApiKeyModal: React.FC = () => {
  const { isApiKeyModalOpen, setIsApiKeyModalOpen, aiConfig, saveAIConfig } = usePrompts();
  const [keyInput, setKeyInput] = useState(aiConfig.apiKey);
  const [modelSelect, setModelSelect] = useState(aiConfig.model || 'gpt-4o-mini');
  const [enabledToggle, setEnabledToggle] = useState(aiConfig.enabled);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAIConfig({
      apiKey: keyInput.trim(),
      model: modelSelect,
      enabled: enabledToggle && keyInput.trim().length > 0
    });
    setIsApiKeyModalOpen(false);
  };

  const handleClearKey = () => {
    setKeyInput('');
    setEnabledToggle(false);
    saveAIConfig({
      apiKey: '',
      model: modelSelect,
      enabled: false
    });
  };

  return (
    <Modal
      isOpen={isApiKeyModalOpen}
      onClose={() => setIsApiKeyModalOpen(false)}
      title={
        <>
          <Sparkles className="w-5 h-5 text-indigo-500" />
          AI & OpenAI Settings
        </>
      }
      subtitle="Configure your OpenAI API Key or use the built-in offline smart AI simulator."
    >
      <form onSubmit={handleSave} className="space-y-4">
        {/* Toggle Mode */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Live OpenAI API Connection
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                When disabled, AI actions use the built-in offline smart simulator.
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={enabledToggle}
            onChange={e => setEnabledToggle(e.target.checked)}
            className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
          />
        </div>

        {/* Client-Side API Key Security & Privacy Notice */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs space-y-1.5 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-400">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Client-Side API Key Notice</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed opacity-90">
            <li>VaultForPrompt operates entirely in your browser and does not have a backend server.</li>
            <li>If entered, your OpenAI API key is stored locally in your browser's <code className="font-mono text-[10px] bg-amber-500/20 px-1 py-0.5 rounded">localStorage</code>.</li>
            <li>Requests are sent directly from your browser to OpenAI's API endpoints (<code className="font-mono text-[10px] bg-amber-500/20 px-1 py-0.5 rounded">api.openai.com</code>).</li>
            <li>Your key is never sent to a VaultForPrompt server because no backend server exists.</li>
            <li>Only enter an API key you are comfortable storing in a client-side browser environment. You can clear your key at any time.</li>
          </ul>
        </div>

        {/* API Key Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              OpenAI API Key
            </label>
            {keyInput && (
              <button
                type="button"
                onClick={handleClearKey}
                className="text-[11px] text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3 h-3" /> Clear Key
              </button>
            )}
          </div>
          <input
            type="password"
            placeholder="sk-proj-..."
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Model Selection
          </label>
          <select
            value={modelSelect}
            onChange={e => setModelSelect(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="gpt-4o-mini">gpt-4o-mini (Fast & Recommended)</option>
            <option value="gpt-4o">gpt-4o (Omni High Intelligence)</option>
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          </select>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setIsApiKeyModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <Check className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </form>
    </Modal>
  );
};
