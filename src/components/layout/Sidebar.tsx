import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import { IconResolver } from '../ui/IconResolver';
import {
  LayoutDashboard,
  FolderOpen,
  Terminal,
  BookOpen,
  BarChart3,
  Vault,
  Download,
  Upload,
  FolderPlus,
  X
} from 'lucide-react';
import type { ActiveTab } from '../../types/prompt';

export const Sidebar: React.FC<{
  onOpenCollectionModal: () => void;
}> = ({ onOpenCollectionModal }) => {
  const {
    activeTab,
    setActiveTab,
    collections,
    prompts,
    selectedCollectionId,
    setSelectedCollectionId,
    exportVault,
    importVault,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = usePrompts();

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  const handleCollectionSelect = (colId: string) => {
    setSelectedCollectionId(colId);
    setActiveTab('library');
    setIsMobileSidebarOpen(false);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        importVault(content);
      }
      // Reset value after reading so the user can re-import the same file if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.onerror = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.readAsText(file);
    e.target.value = '';
  };

  // Nav Items definition
  const navItems = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'library' as ActiveTab, label: 'Prompt Library', icon: FolderOpen, badge: prompts.length },
    { id: 'playground' as ActiveTab, label: 'Prompt Playground', icon: Terminal },
    { id: 'templates' as ActiveTab, label: 'Templates Marketplace', icon: BookOpen, badge: '50+' },
    { id: 'analytics' as ActiveTab, label: 'Smart Analytics', icon: BarChart3 }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs md:hidden animate-fade-in"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 z-40 md:z-20 w-64 bg-white/95 dark:bg-slate-950/95 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col h-screen shrink-0 select-none backdrop-blur-md transition-transform duration-200 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 px-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <Vault className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white text-base tracking-tight leading-tight">
                AI Prompt Vault
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                AI Engineering Suite
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Main Navigation
            </p>
            <nav className="space-y-1">
              {navItems.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Collections Section */}
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Collections / Folders
              </p>
              <button
                onClick={() => {
                  onOpenCollectionModal();
                  setIsMobileSidebarOpen(false);
                }}
                title="Add Custom Collection"
                className="p-1 rounded-md text-slate-400 hover:text-indigo-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <FolderPlus className="w-3.5 h-3.5" />
              </button>
            </div>

            <nav className="space-y-1">
              {/* All Collections option */}
              <button
                onClick={() => handleCollectionSelect('All')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                  activeTab === 'library' && selectedCollectionId === 'All'
                    ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderOpen className="w-4 h-4 text-slate-400" />
                  <span>All Collections</span>
                </div>
                <span className="text-xs font-mono text-slate-400">{prompts.length}</span>
              </button>

              {/* Individual Collection items */}
              {collections.map(col => {
                const count = prompts.filter(p => p.collectionId === col.id).length;
                const isSelected = activeTab === 'library' && selectedCollectionId === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => handleCollectionSelect(col.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span style={{ color: col.color }}>
                        <IconResolver name={col.iconName} className="w-4 h-4" />
                      </span>
                      <span className="truncate">{col.name}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{count}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Backup & Import */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={exportVault}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json,text/plain"
              className="hidden"
            />
          </div>
        </div>
      </aside>
    </>
  );
};
