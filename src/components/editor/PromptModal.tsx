import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { usePrompts, extractVariables } from '../../context/PromptContext';
import { TagInputWithSuggestions } from './TagInputWithSuggestions';
import type { CategoryType, Prompt } from '../../types/prompt';
import { Edit3, Plus, Sparkles, FolderPlus, History, Save } from 'lucide-react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptToEdit?: Prompt | null;
  onOpenCollectionModal?: () => void;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  onClose,
  promptToEdit,
  onOpenCollectionModal
}) => {
  const { addPrompt, updatePrompt, collections, setVersionHistoryPrompt } = usePrompts();

  const [title, setTitle] = useState('');
  const [collectionId, setCollectionId] = useState('work');
  const [category, setCategory] = useState<CategoryType>('Code Generation');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (promptToEdit) {
      setTitle(promptToEdit.title);
      setCollectionId(promptToEdit.collectionId || 'work');
      setCategory(promptToEdit.category);
      setTags(promptToEdit.tags || []);
      setContent(promptToEdit.content);
      setNotes(promptToEdit.notes || '');
    } else {
      setTitle('');
      setCollectionId('work');
      setCategory('Code Generation');
      setTags(['ChatGPT', 'Coding']);
      setContent('You are an expert {{role}}.\n\nTask:\n{{task_description}}');
      setNotes('');
    }
  }, [promptToEdit, isOpen]);

  const detectedVars = extractVariables(content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (promptToEdit) {
      updatePrompt(
        promptToEdit.id,
        {
          title: title.trim(),
          collectionId,
          category,
          tags,
          content,
          notes: notes.trim()
        },
        'Updated prompt details'
      );
    } else {
      addPrompt({
        title: title.trim(),
        collectionId,
        category,
        tags,
        content,
        notes: notes.trim(),
        isFavorite: false,
        variables: detectedVars
      });
    }

    onClose();
  };

  const categories: CategoryType[] = [
    'System Prompt',
    'Creative Writing',
    'Code Generation',
    'Data Analysis',
    'Copywriting',
    'Brainstorming',
    'Productivity',
    'Custom'
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          {promptToEdit ? <Edit3 className="w-5 h-5 text-indigo-500" /> : <Plus className="w-5 h-5 text-indigo-500" />}
          {promptToEdit ? 'Edit Prompt' : 'Create New Prompt'}
        </>
      }
      subtitle={promptToEdit ? `Updating "${promptToEdit.title}" (v${promptToEdit.currentVersion})` : 'Add a new prompt template to your personal vault.'}
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Prompt Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Senior TypeScript Code Refactoring Architect..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Collection / Folder & Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Collection Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Collection Folder
              </label>
              {onOpenCollectionModal && (
                <button
                  type="button"
                  onClick={onOpenCollectionModal}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <FolderPlus className="w-3.5 h-3.5" /> + New Folder
                </button>
              )}
            </div>
            <select
              value={collectionId}
              onChange={e => setCollectionId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {collections.map(col => (
                <option key={col.id} value={col.id}>
                  📁 {col.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as CategoryType)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags with Auto-complete */}
        <TagInputWithSuggestions tags={tags} onChange={setTags} />

        {/* Prompt Content */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Prompt Content *
            </label>
            <span className="text-[11px] font-mono text-indigo-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {detectedVars.length} variables detected: {detectedVars.map(v => `{{${v}}}`).join(', ')}
            </span>
          </div>
          <textarea
            required
            rows={7}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Type your prompt content... Use {{variable_name}} for dynamic inputs."
            className="w-full p-3.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 leading-relaxed"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Notes & Usage Instructions
          </label>
          <input
            type="text"
            placeholder="e.g. Best used with GPT-4o for complex refactoring..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            {promptToEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setVersionHistoryPrompt(promptToEdit);
                }}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <History className="w-3.5 h-3.5" /> View Version History ({promptToEdit.versions.length})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
            >
              <Save className="w-4 h-4" />
              {promptToEdit ? 'Save Changes' : 'Create Prompt'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
