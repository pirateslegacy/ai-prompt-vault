import { useEffect } from 'react';
import { usePrompts } from '../context/PromptContext';

export const useKeyboardShortcuts = () => {
  const {
    setIsCreateModalOpen,
    setIsCommandPaletteOpen,
    setIsShortcutsModalOpen,
    activeEditPrompt,
    duplicatePrompt,
    setIsApiKeyModalOpen,
    setVariableFillPrompt,
    setAiEnhancerPrompt,
    setVersionHistoryPrompt,
    setIsMobileSidebarOpen
  } = usePrompts();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // --- Ctrl+S / Cmd+S: Save Action ---
      if (modifier && e.key.toLowerCase() === 's') {
        e.preventDefault(); // Prevent browser default Save HTML page
        // Trigger submit on active form if inside modal
        const form = document.querySelector('form') as HTMLFormElement;
        if (form) {
          form.requestSubmit();
        }
        return;
      }

      // --- Ctrl+K / Cmd+K: Open Command Palette ---
      if (modifier && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      // --- Ctrl+N / Cmd+N: New Prompt ---
      if (modifier && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setIsCreateModalOpen(true);
        return;
      }

      // --- Ctrl+D / Cmd+D: Duplicate Active Prompt ---
      if (modifier && e.key.toLowerCase() === 'd' && !isInput) {
        e.preventDefault();
        if (activeEditPrompt) {
          duplicatePrompt(activeEditPrompt.id);
        }
        return;
      }

      // --- ? (Shift + /): Open Shortcuts Help Modal ---
      if (e.key === '?' && !isInput) {
        e.preventDefault();
        setIsShortcutsModalOpen(true);
        return;
      }

      // --- Escape: Close Modals ---
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsShortcutsModalOpen(false);
        setIsApiKeyModalOpen(false);
        setIsCreateModalOpen(false);
        setIsMobileSidebarOpen(false);
        setVariableFillPrompt(null);
        setAiEnhancerPrompt(null);
        setVersionHistoryPrompt(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    setIsCreateModalOpen,
    setIsCommandPaletteOpen,
    setIsShortcutsModalOpen,
    activeEditPrompt,
    duplicatePrompt,
    setIsApiKeyModalOpen,
    setVariableFillPrompt,
    setAiEnhancerPrompt,
    setVersionHistoryPrompt,
    setIsMobileSidebarOpen
  ]);
};
