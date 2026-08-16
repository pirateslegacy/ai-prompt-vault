import React from 'react';
import { Modal } from '../ui/Modal';
import { usePrompts } from '../../context/PromptContext';
import { Keyboard } from 'lucide-react';

export const KeyboardShortcutsModal: React.FC = () => {
  const { isShortcutsModalOpen, setIsShortcutsModalOpen } = usePrompts();

  const shortcuts = [
    { key: 'Ctrl + N', mac: '⌘ + N', description: 'Create New Prompt' },
    { key: 'Ctrl + K', mac: '⌘ + K', description: 'Open Quick Search Command Palette' },
    { key: 'Ctrl + S', mac: '⌘ + S', description: 'Save Prompt (when editing)' },
    { key: 'Ctrl + D', mac: '⌘ + D', description: 'Duplicate Active / Selected Prompt' },
    { key: '?', mac: '?', description: 'Show Keyboard Shortcuts Cheat Sheet' },
    { key: 'Esc', mac: 'Esc', description: 'Close any open modal or search input' }
  ];

  return (
    <Modal
      isOpen={isShortcutsModalOpen}
      onClose={() => setIsShortcutsModalOpen(false)}
      title={
        <>
          <Keyboard className="w-5 h-5 text-indigo-500" />
          Keyboard Shortcuts
        </>
      }
      subtitle="Boost your productivity with these built-in hotkeys."
      maxWidth="md"
    >
      <div className="space-y-3">
        {shortcuts.map((sc, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800"
          >
            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              {sc.description}
            </span>
            <div className="flex items-center gap-1.5">
              <kbd className="px-2 py-1 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm">
                {sc.key}
              </kbd>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
