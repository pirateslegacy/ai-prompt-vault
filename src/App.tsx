import React, { useState } from 'react';
import { PromptProvider, usePrompts } from './context/PromptContext';
import { ThemeProvider } from './context/ThemeContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Layout
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { ApiKeyModal } from './components/layout/ApiKeyModal';
import { KeyboardShortcutsModal } from './components/layout/KeyboardShortcutsModal';

// Dashboard
import { StatsOverview } from './components/dashboard/StatsOverview';
import { QuickActions } from './components/dashboard/QuickActions';
import { RecentPrompts } from './components/dashboard/RecentPrompts';
import { AnalyticsWidgets } from './components/dashboard/AnalyticsWidgets';
import { CollectionDistribution } from './components/dashboard/CollectionDistribution';

// Library
import { SearchAndFilterBar } from './components/library/SearchAndFilterBar';
import { PromptGrid } from './components/library/PromptGrid';

// Playground
import { PromptPlayground } from './components/playground/PromptPlayground';

// Templates
import { TemplateMarketplace } from './components/templates/TemplateMarketplace';

// Editor Modals
import { PromptModal } from './components/editor/PromptModal';
import { CollectionManageModal } from './components/editor/CollectionManageModal';
import { VersionHistoryModal } from './components/editor/VersionHistoryModal';
import { VariableFillModal } from './components/editor/VariableFillModal';
import { AIEnhancerModal } from './components/editor/AIEnhancerModal';

// UI
import { ToastContainer } from './components/ui/Toast';

const AppContent: React.FC = () => {
  const {
    activeTab,
    isCreateModalOpen,
    setIsCreateModalOpen,
    activeEditPrompt,
    setActiveEditPrompt
  } = usePrompts();

  // Attach global keyboard shortcuts (Ctrl+N, Ctrl+S, Ctrl+K, Ctrl+D, ?, Esc)
  useKeyboardShortcuts();

  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Left Sidebar */}
      <Sidebar onOpenCollectionModal={() => setIsCollectionModalOpen(true)} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* View Router Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <StatsOverview />
              <QuickActions />
              <AnalyticsWidgets />
              <CollectionDistribution />
              <RecentPrompts />
            </div>
          )}

          {/* TAB 2: PROMPT LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-6 animate-fade-in">
              <SearchAndFilterBar />
              <PromptGrid />
            </div>
          )}

          {/* TAB 3: PROMPT TESTING PLAYGROUND */}
          {activeTab === 'playground' && <PromptPlayground />}

          {/* TAB 4: TEMPLATES MARKETPLACE */}
          {activeTab === 'templates' && <TemplateMarketplace />}

          {/* TAB 5: SMART ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <StatsOverview />
              <AnalyticsWidgets />
              <CollectionDistribution />
            </div>
          )}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <PromptModal
        isOpen={isCreateModalOpen || !!activeEditPrompt}
        onClose={() => {
          setIsCreateModalOpen(false);
          setActiveEditPrompt(null);
        }}
        promptToEdit={activeEditPrompt}
        onOpenCollectionModal={() => setIsCollectionModalOpen(true)}
      />

      <CollectionManageModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
      />

      <VersionHistoryModal />
      <VariableFillModal />
      <AIEnhancerModal />
      <ApiKeyModal />
      <KeyboardShortcutsModal />
      <CommandPalette />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <PromptProvider>
        <AppContent />
      </PromptProvider>
    </ThemeProvider>
  );
}

export default App;
