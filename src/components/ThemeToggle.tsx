import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'header' | 'mobile' | 'compact';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'header', className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        id="theme-toggle-mobile"
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase tracking-wider transition-all border ${
          isDark
            ? 'bg-[#0A1E38] text-slate-200 border-white/10 hover:border-white/30'
            : 'bg-white text-slate-800 border-slate-300 hover:border-slate-400'
        } ${className}`}
        aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      >
        <div className="flex items-center space-x-2.5">
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-600 shrink-0" />
          )}
          <span>Thème : {isDark ? 'Mode Sombre' : 'Mode Clair'}</span>
        </div>
        <span
          className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider border ${
            isDark
              ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
              : 'bg-indigo-600/10 text-indigo-700 border-indigo-600/30'
          }`}
        >
          {isDark ? 'Passer au Clair' : 'Passer au Sombre'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      id="theme-toggle-header"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-[#E85D2C] ${
        isDark
          ? 'bg-slate-800/80 hover:bg-slate-800 text-amber-300 border-white/10 hover:border-white/30 hover:scale-105'
          : 'bg-slate-100 hover:bg-slate-200 text-indigo-700 border-slate-300 hover:border-slate-400 hover:scale-105 shadow-sm'
      } ${className}`}
      title={isDark ? 'Basculer en Mode Clair' : 'Basculer en Mode Sombre'}
      aria-label={isDark ? 'Basculer en Mode Clair' : 'Basculer en Mode Sombre'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </div>
      <span className="sr-only">
        {isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      </span>
    </button>
  );
};
