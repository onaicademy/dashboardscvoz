import React from 'react';
import { Bell, Search, Menu, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onMenuClick }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between ${
      isDark
        ? 'bg-dark-card/80 border-dark-border'
        : 'bg-white/80 border-slate-200'
    }`}>
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className={`lg:hidden p-2 rounded-lg ${
            isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h1>
          {subtitle && <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search - Desktop only */}
        <div className={`hidden md:flex items-center px-3 py-2 rounded-lg border focus-within:ring-2 focus-within:ring-yellow-400 transition-all ${
          isDark
            ? 'bg-dark-card border-dark-border'
            : 'bg-slate-100 border-slate-200'
        }`}>
          <Search className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
          <input
            type="text"
            placeholder={t('analytics.search')}
            className={`bg-transparent border-none outline-none text-sm w-48 placeholder:text-slate-400 ${
              isDark ? 'text-white placeholder:text-gray-500' : 'text-slate-700'
            }`}
          />
        </div>

        {/* Language Switcher */}
        <div className={`flex items-center rounded-lg border overflow-hidden ${
          isDark ? 'border-dark-border' : 'border-slate-200'
        }`}>
          <button
            onClick={() => setLanguage('ru')}
            className={`px-3 py-2 text-xs font-semibold transition-colors ${
              language === 'ru'
                ? 'bg-primary text-black'
                : isDark
                  ? 'bg-dark-card text-gray-400 hover:text-white'
                  : 'bg-white text-slate-500 hover:text-slate-900'
            }`}
          >
            RU
          </button>
          <button
            onClick={() => setLanguage('kz')}
            className={`px-3 py-2 text-xs font-semibold transition-colors ${
              language === 'kz'
                ? 'bg-primary text-black'
                : isDark
                  ? 'bg-dark-card text-gray-400 hover:text-white'
                  : 'bg-white text-slate-500 hover:text-slate-900'
            }`}
          >
            KZ
          </button>
        </div>

        {/* Theme Toggle with View Transitions Animation */}
        <button
          onClick={(e) => toggleTheme(e)}
          className={`relative p-2 rounded-lg border transition-colors overflow-hidden ${
            isDark
              ? 'border-dark-border bg-dark-card text-yellow-400 hover:bg-yellow-400/10'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
          title={isDark ? 'Светлая тема' : 'Темная тема'}
        >
          <Sun className={`w-5 h-5 theme-toggle-icon theme-sun absolute inset-0 m-auto ${isDark ? 'rotate-[-90deg] opacity-0' : 'rotate-0 opacity-100'}`} />
          <Moon className={`w-5 h-5 theme-toggle-icon theme-moon ${isDark ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`} />
        </button>

        {/* Notifications */}
        <button className={`relative p-2 transition-colors ${
          isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
        }`}>
          <Bell className="w-6 h-6" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-card"></span>
        </button>
      </div>
    </header>
  );
};
