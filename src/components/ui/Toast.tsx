import React from 'react';
import { usePrompts } from '../../context/PromptContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePrompts();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        let borderClass = 'border-emerald-500/30 dark:border-emerald-500/20';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
          borderClass = 'border-red-500/30 dark:border-red-500/20';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
          borderClass = 'border-blue-500/30 dark:border-blue-500/20';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-white dark:bg-slate-900 border ${borderClass} rounded-xl shadow-xl backdrop-blur-md text-sm text-slate-800 dark:text-slate-100 animate-fade-in`}
          >
            <div className="flex items-center gap-2.5">
              {icon}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
