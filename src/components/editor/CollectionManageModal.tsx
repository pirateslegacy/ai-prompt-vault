import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { usePrompts } from '../../context/PromptContext';
import { FolderPlus, Check } from 'lucide-react';

export const CollectionManageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { addCollection } = usePrompts();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#6366f1');
  const iconName = 'Folder';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addCollection({
      name: name.trim(),
      description: description.trim() || 'Custom project collection',
      color,
      iconName
    });
    setName('');
    setDescription('');
    onClose();
  };

  const colors = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <>
          <FolderPlus className="w-5 h-5 text-indigo-500" />
          Add Custom Collection Folder
        </>
      }
      subtitle="Organize your prompts by project, client, or team domain."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Collection Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. YouTube Growth, Client Alpha, SaaS Launch..."
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <input
            type="text"
            placeholder="Short overview of what prompts go in this folder..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Folder Color Tag
          </label>
          <div className="flex items-center gap-2">
            {colors.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${
                  color === c ? 'scale-110 border-slate-900 dark:border-white shadow-md' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <Check className="w-4 h-4" /> Create Folder
          </button>
        </div>
      </form>
    </Modal>
  );
};
