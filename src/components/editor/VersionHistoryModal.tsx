import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { usePrompts } from '../../context/PromptContext';
import type { PromptVersion } from '../../types/prompt';
import { History, RotateCcw, ArrowRightLeft } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const VersionHistoryModal: React.FC = () => {
  const { versionHistoryPrompt, setVersionHistoryPrompt, restorePromptVersion } = usePrompts();

  const [selectedVerId, setSelectedVerId] = useState<string | null>(null);

  if (!versionHistoryPrompt) return null;

  const versions = versionHistoryPrompt.versions || [];
  const activeVersionNumber = versionHistoryPrompt.currentVersion;

  // Selected past version to compare
  const selectedVersion: PromptVersion | undefined = selectedVerId
    ? versions.find(v => v.id === selectedVerId)
    : versions.find(v => v.versionNumber !== activeVersionNumber) || versions[0];

  const handleRestore = (ver: PromptVersion) => {
    restorePromptVersion(versionHistoryPrompt.id, ver.id);
    setVersionHistoryPrompt(null);
  };

  return (
    <Modal
      isOpen={!!versionHistoryPrompt}
      onClose={() => setVersionHistoryPrompt(null)}
      title={
        <>
          <History className="w-5 h-5 text-indigo-500" />
          Prompt Version History & Diff
        </>
      }
      subtitle={`Timeline of saved edits for "${versionHistoryPrompt.title}"`}
      maxWidth="4xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Version History Timeline (4 cols) */}
        <div className="lg:col-span-4 space-y-3 border-r border-slate-200/80 dark:border-slate-800/80 pr-4">
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Version Timeline ({versions.length})
          </p>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {versions
              .slice()
              .reverse()
              .map(ver => {
                const isCurrent = ver.versionNumber === activeVersionNumber;
                const isComparing = selectedVersion?.id === ver.id;
                return (
                  <div
                    key={ver.id}
                    onClick={() => setSelectedVerId(ver.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isComparing
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                        Version {ver.versionNumber}
                      </span>
                      {isCurrent ? (
                        <Badge variant="success" size="sm">
                          Active v{ver.versionNumber}
                        </Badge>
                      ) : (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleRestore(ver);
                          }}
                          className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-semibold transition-colors flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" /> Restore
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium truncate">
                      {ver.title}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-mono">
                      <span>{ver.changeSummary || 'Saved edit'}</span>
                      <span>{new Date(ver.savedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Right Column: Side-by-Side Comparison (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
              Comparing Active v{activeVersionNumber} with Version {selectedVersion?.versionNumber || 1}
            </h4>
            {selectedVersion && selectedVersion.versionNumber !== activeVersionNumber && (
              <button
                onClick={() => handleRestore(selectedVersion)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Restore Version {selectedVersion.versionNumber}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Active Current Version Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  Active (Version {activeVersionNumber})
                </span>
                <span className="text-[10px] text-slate-400">Current Vault Content</span>
              </div>
              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs max-h-80 overflow-y-auto border border-slate-800">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {versionHistoryPrompt.content}
                </pre>
              </div>
            </div>

            {/* Selected Version Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  Version {selectedVersion?.versionNumber || 1}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Saved: {selectedVersion ? new Date(selectedVersion.savedAt).toLocaleDateString() : ''}
                </span>
              </div>
              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs max-h-80 overflow-y-auto border border-slate-800">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {selectedVersion?.content || '// Select a version from the timeline on the left to inspect content.'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
