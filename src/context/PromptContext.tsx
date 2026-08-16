import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type {
  Prompt,
  Collection,
  AnalyticsData,
  AIKeyConfig,
  ActiveTab,
  ViewMode,
  SortOption,
  CategoryType,
  PromptVersion,
  PromptTemplate
} from '../types/prompt';
import { storageService } from '../services/storageService';
import { analyticsService } from '../services/analyticsService';
import { exportImportService } from '../services/exportImportService';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface PromptContextType {
  prompts: Prompt[];
  collections: Collection[];
  analytics: AnalyticsData;
  aiConfig: AIKeyConfig;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  
  // Search & Filter state
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryType | 'All';
  setSelectedCategory: (cat: CategoryType | 'All') => void;
  selectedCollectionId: string | 'All';
  setSelectedCollectionId: (collId: string | 'All') => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Filtered prompt getters
  filteredPrompts: Prompt[];

  // Prompt CRUD
  addPrompt: (promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'versions' | 'currentVersion' | 'copyCount'>) => Prompt;
  updatePrompt: (id: string, promptData: Partial<Prompt>, changeSummary?: string) => void;
  deletePrompt: (id: string) => void;
  duplicatePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  restorePromptVersion: (promptId: string, versionId: string) => void;
  importTemplateToVault: (template: PromptTemplate, targetCollectionId?: string) => void;

  // Collection CRUD
  addCollection: (col: Omit<Collection, 'id'>) => void;
  updateCollection: (id: string, col: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;

  // Copy & Variables
  copyToClipboard: (prompt: Prompt) => void;
  directCopyText: (text: string, label?: string) => void;
  
  // Modals & UI States
  activeEditPrompt: Prompt | null;
  setActiveEditPrompt: (p: Prompt | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  
  variableFillPrompt: Prompt | null;
  setVariableFillPrompt: (p: Prompt | null) => void;
  
  aiEnhancerPrompt: Prompt | null;
  setAiEnhancerPrompt: (p: Prompt | null) => void;
  
  versionHistoryPrompt: Prompt | null;
  setVersionHistoryPrompt: (p: Prompt | null) => void;

  isApiKeyModalOpen: boolean;
  setIsApiKeyModalOpen: (open: boolean) => void;

  isShortcutsModalOpen: boolean;
  setIsShortcutsModalOpen: (open: boolean) => void;

  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;

  // AI Key configuration
  saveAIConfig: (config: AIKeyConfig) => void;

  // Import / Export
  exportVault: () => void;
  importVault: (fileContent: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

// Helper to extract {{var}} names
export const extractVariables = (content: string): string[] => {
  const matches = content.match(/\{\{([^}]+)\}\}/g) || [];
  const vars = matches.map(m => m.replace(/[\{\}]/g, '').trim());
  return Array.from(new Set(vars)).filter(Boolean);
};

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prompts, setPrompts] = useState<Prompt[]>(() => storageService.getPrompts());
  const [collections, setCollections] = useState<Collection[]>(() => storageService.getCollections());
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => storageService.getAnalytics());
  const [aiConfig, setAiConfigState] = useState<AIKeyConfig>(() => storageService.getAIConfig());

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | 'All'>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('updatedAt');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Modals state
  const [activeEditPrompt, setActiveEditPrompt] = useState<Prompt | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [variableFillPrompt, setVariableFillPrompt] = useState<Prompt | null>(null);
  const [aiEnhancerPrompt, setAiEnhancerPrompt] = useState<Prompt | null>(null);
  const [versionHistoryPrompt, setVersionHistoryPrompt] = useState<Prompt | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Save prompts when state changes
  useEffect(() => {
    storageService.savePrompts(prompts);
  }, [prompts]);

  // Save collections when state changes
  useEffect(() => {
    storageService.saveCollections(collections);
  }, [collections]);

  // Filtered & Sorted prompts computation
  const filteredPrompts = React.useMemo(() => {
    let result = [...prompts];

    // Filter by Collection
    if (selectedCollectionId !== 'All') {
      result = result.filter(p => p.collectionId === selectedCollectionId);
    }

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Tag
    if (selectedTag) {
      result = result.filter(p => p.tags.includes(selectedTag));
    }

    // Search query filter (title, content, tags, notes)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.notes.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'updatedAt') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'favorites') {
        if (a.isFavorite === b.isFavorite) {
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        }
        return a.isFavorite ? -1 : 1;
      }
      if (sortBy === 'copyCount') {
        return (b.copyCount || 0) - (a.copyCount || 0);
      }
      return 0;
    });

    return result;
  }, [prompts, selectedCollectionId, selectedCategory, selectedTag, searchQuery, sortBy]);

  // Prompt CRUD
  const addPrompt = (
    promptData: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'versions' | 'currentVersion' | 'copyCount'>
  ): Prompt => {
    const id = `prompt-${Date.now()}`;
    const now = new Date().toISOString();
    const variables = extractVariables(promptData.content);

    const initialVersion: PromptVersion = {
      id: `v1-${id}`,
      versionNumber: 1,
      title: promptData.title,
      content: promptData.content,
      notes: promptData.notes,
      savedAt: now,
      changeSummary: 'Initial creation'
    };

    const newPrompt: Prompt = {
      ...promptData,
      id,
      createdAt: now,
      updatedAt: now,
      variables,
      currentVersion: 1,
      copyCount: 0,
      versions: [initialVersion]
    };

    setPrompts(prev => [newPrompt, ...prev]);
    showToast(`Created prompt "${newPrompt.title}"`, 'success');
    return newPrompt;
  };

  const updatePrompt = (id: string, promptData: Partial<Prompt>, changeSummary: string = 'Updated prompt content') => {
    const now = new Date().toISOString();
    setPrompts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;

        const updatedTitle = promptData.title ?? p.title;
        const updatedContent = promptData.content ?? p.content;
        const updatedNotes = promptData.notes ?? p.notes;
        const variables = extractVariables(updatedContent);

        // Check if content or title meaningfully changed to push a new version
        const isSubstantiveChange =
          promptData.content !== undefined && promptData.content !== p.content;

        let nextVersionNum = p.currentVersion;
        let newVersions = [...p.versions];

        if (isSubstantiveChange) {
          nextVersionNum = p.currentVersion + 1;
          const newVer: PromptVersion = {
            id: `v${nextVersionNum}-${id}-${Date.now()}`,
            versionNumber: nextVersionNum,
            title: updatedTitle,
            content: updatedContent,
            notes: updatedNotes,
            savedAt: now,
            changeSummary
          };
          newVersions.push(newVer);
        }

        return {
          ...p,
          ...promptData,
          title: updatedTitle,
          content: updatedContent,
          notes: updatedNotes,
          updatedAt: now,
          variables,
          currentVersion: nextVersionNum,
          versions: newVersions
        };
      })
    );
    showToast('Prompt updated successfully');
  };

  const deletePrompt = (id: string) => {
    const target = prompts.find(p => p.id === id);
    setPrompts(prev => prev.filter(p => p.id !== id));
    if (target) {
      showToast(`Deleted "${target.title}"`, 'info');
    }
  };

  const duplicatePrompt = (id: string) => {
    const target = prompts.find(p => p.id === id);
    if (!target) return;

    const idDup = `prompt-${Date.now()}`;
    const now = new Date().toISOString();
    const dupPrompt: Prompt = {
      ...target,
      id: idDup,
      title: `${target.title} (Copy)`,
      createdAt: now,
      updatedAt: now,
      copyCount: 0,
      currentVersion: 1,
      versions: [
        {
          id: `v1-${idDup}`,
          versionNumber: 1,
          title: `${target.title} (Copy)`,
          content: target.content,
          notes: target.notes,
          savedAt: now,
          changeSummary: `Duplicated from ${target.title}`
        }
      ]
    };

    setPrompts(prev => [dupPrompt, ...prev]);
    showToast(`Duplicated "${target.title}"`, 'success');
  };

  const toggleFavorite = (id: string) => {
    setPrompts(prev =>
      prev.map(p => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const restorePromptVersion = (promptId: string, versionId: string) => {
    const target = prompts.find(p => p.id === promptId);
    if (!target) return;

    const targetVer = target.versions.find(v => v.id === versionId);
    if (!targetVer) return;

    updatePrompt(
      promptId,
      {
        title: targetVer.title,
        content: targetVer.content,
        notes: targetVer.notes
      },
      `Restored from Version ${targetVer.versionNumber}`
    );

    showToast(`Restored Version ${targetVer.versionNumber} for "${target.title}"`, 'success');
  };

  const importTemplateToVault = (template: PromptTemplate, targetCollectionId: string = 'work') => {
    const id = `prompt-tmpl-${Date.now()}`;
    const now = new Date().toISOString();

    const newPrompt: Prompt = {
      id,
      title: template.title,
      collectionId: targetCollectionId,
      category: template.category,
      tags: [...template.tags],
      content: template.content,
      notes: `${template.notes}\n\n[Imported from ${template.pack} Template Pack]`,
      isFavorite: false,
      createdAt: now,
      updatedAt: now,
      variables: template.variables,
      currentVersion: 1,
      copyCount: 0,
      versions: [
        {
          id: `v1-${id}`,
          versionNumber: 1,
          title: template.title,
          content: template.content,
          notes: template.notes,
          savedAt: now,
          changeSummary: `Imported from ${template.pack} Pack`
        }
      ]
    };

    setPrompts(prev => [newPrompt, ...prev]);
    showToast(`Added "${template.title}" to your vault`, 'success');
  };

  // Collection CRUD
  const addCollection = (colData: Omit<Collection, 'id'>) => {
    const newCol: Collection = {
      ...colData,
      id: `col-${Date.now()}`
    };
    setCollections(prev => [...prev, newCol]);
    showToast(`Created collection "${newCol.name}"`, 'success');
  };

  const updateCollection = (id: string, colData: Partial<Collection>) => {
    setCollections(prev => prev.map(c => (c.id === id ? { ...c, ...colData } : c)));
    showToast('Collection updated', 'success');
  };

  const deleteCollection = (id: string) => {
    // Reassign prompts in this collection to 'work'
    setPrompts(prev => prev.map(p => (p.collectionId === id ? { ...p, collectionId: 'work' } : p)));
    setCollections(prev => prev.filter(c => c.id !== id));
    showToast('Collection deleted. Prompts moved to Work.', 'info');
  };

  // Clipboard & Copy handling
  const copyToClipboard = (prompt: Prompt) => {
    // If prompt contains {{variables}}, trigger Variable Fill Modal
    if (prompt.variables && prompt.variables.length > 0) {
      setVariableFillPrompt(prompt);
      return;
    }

    // Direct copy
    directCopyText(prompt.content, prompt.title);

    // Track analytics copy
    const { updatedAnalytics, updatedPrompts } = analyticsService.recordCopy(
      prompt.id,
      prompt.category,
      prompts
    );
    setAnalytics(updatedAnalytics);
    setPrompts(updatedPrompts);
  };

  const directCopyText = (text: string, label: string = 'Prompt') => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`, 'success');
  };

  // AI Config
  const saveAIConfig = (config: AIKeyConfig) => {
    setAiConfigState(config);
    storageService.saveAIConfig(config);
    showToast('AI Settings saved successfully', 'success');
  };

  // Export / Import
  const exportVault = () => {
    exportImportService.exportVault(prompts, collections);
    showToast('Vault backup downloaded', 'success');
  };

  const importVault = (fileContent: string) => {
    try {
      const backup = exportImportService.validateAndParseImport(fileContent);
      setPrompts(backup.prompts);
      storageService.savePrompts(backup.prompts);

      if (backup.collections && backup.collections.length > 0) {
        setCollections(backup.collections);
        storageService.saveCollections(backup.collections);
      }

      const collectionMsg = backup.collections.length > 0 ? ` and ${backup.collections.length} collections` : '';
      showToast(`Vault imported successfully. Restored ${backup.prompts.length} prompts${collectionMsg}.`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Invalid backup file. Please select a valid VaultForPrompt JSON backup.', 'error');
    }
  };

  return (
    <PromptContext.Provider
      value={{
        prompts,
        collections,
        analytics,
        aiConfig,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCollectionId,
        setSelectedCollectionId,
        selectedTag,
        setSelectedTag,
        sortBy,
        setSortBy,
        viewMode,
        setViewMode,
        filteredPrompts,
        addPrompt,
        updatePrompt,
        deletePrompt,
        duplicatePrompt,
        toggleFavorite,
        restorePromptVersion,
        importTemplateToVault,
        addCollection,
        updateCollection,
        deleteCollection,
        copyToClipboard,
        directCopyText,
        activeEditPrompt,
        setActiveEditPrompt,
        isCreateModalOpen,
        setIsCreateModalOpen,
        variableFillPrompt,
        setVariableFillPrompt,
        aiEnhancerPrompt,
        setAiEnhancerPrompt,
        versionHistoryPrompt,
        setVersionHistoryPrompt,
        isApiKeyModalOpen,
        setIsApiKeyModalOpen,
        isShortcutsModalOpen,
        setIsShortcutsModalOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        saveAIConfig,
        exportVault,
        importVault,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = (): PromptContextType => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompts must be used within a PromptProvider');
  }
  return context;
};
