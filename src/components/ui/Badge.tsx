import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'category' | 'tag' | 'version' | 'outline' | 'success';
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'tag',
  size = 'sm',
  onClick,
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs font-medium' : 'px-2.5 py-1 text-xs font-semibold';
  
  let variantClasses = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  if (variant === 'brand') {
    variantClasses = 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60';
  } else if (variant === 'category') {
    variantClasses = 'bg-violet-100 text-violet-700 dark:bg-violet-950/80 dark:text-violet-300 border border-violet-200 dark:border-violet-800/60';
  } else if (variant === 'version') {
    variantClasses = 'bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60';
  } else if (variant === 'success') {
    variantClasses = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60';
  } else if (variant === 'outline') {
    variantClasses = 'border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400';
  }

  const clickable = onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : '';

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-md ${sizeClasses} ${variantClasses} ${clickable} ${className}`}
    >
      {children}
    </span>
  );
};
