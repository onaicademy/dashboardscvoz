import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquareText, TrendingUp, Megaphone, Settings, User, X, ChevronLeft, ChevronRight, Brain, Phone, Plug, Instagram } from 'lucide-react';
import { Logo8D } from './Logo8D';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const NavItem = ({
  to,
  icon: Icon,
  label,
  onClose,
  isCollapsed
}: {
  to: string;
  icon: any;
  label: string;
  onClose?: () => void;
  isCollapsed?: boolean;
}) => (
  <NavLink
    to={to}
    onClick={onClose}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 group relative ${
        isActive
          ? 'bg-[#FFD700] text-black font-medium shadow-lg shadow-yellow-500/25'
          : 'text-gray-400 hover:text-white hover:bg-white/10'
      } ${isCollapsed ? 'justify-center' : ''}`
    }
  >
    <Icon className={`w-[18px] h-[18px] flex-shrink-0 transition-transform duration-200 group-hover:scale-110`} />
    <AnimatePresence>
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          className="text-sm whitespace-nowrap overflow-hidden"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>

    {/* Tooltip for collapsed state */}
    {isCollapsed && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-[#2A2A2A] text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
        {label}
      </div>
    )}
  </NavLink>
);

export const Sidebar: React.FC<SidebarProps> = ({ onClose, isCollapsed = false, onToggleCollapse }) => {
  const { t } = useLanguage();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col h-screen bg-[#1A1A1A] text-white fixed left-0 top-0 z-50 border-r border-white/5 overflow-hidden"
    >
      {/* Close button - mobile only */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Brand */}
      <div className={`p-4 flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
        <motion.div
          className="bg-[#FFD700] p-2 rounded-xl shadow-lg shadow-yellow-500/30 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Logo8D width={28} height={28} textColor="#1A1A1A" />
        </motion.div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-lg font-bold tracking-tight">ShowToday</h1>
              <p className="text-[10px] text-gray-500 tracking-widest font-medium">AI ANALYTICS</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse Toggle - Desktop */}
      <div className={`px-3 hidden lg:block ${isCollapsed ? 'text-center' : ''}`}>
        <button
          onClick={onToggleCollapse}
          className="w-full p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Свернуть</span>
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavItem to="/" icon={LayoutDashboard} label={t('nav.dashboard')} onClose={onClose} isCollapsed={isCollapsed} />
        <NavItem to="/analytics" icon={MessageSquareText} label={t('nav.analytics')} onClose={onClose} isCollapsed={isCollapsed} />
        <NavItem to="/trends" icon={TrendingUp} label={t('nav.trends')} onClose={onClose} isCollapsed={isCollapsed} />
        <NavItem to="/marketing" icon={Megaphone} label={t('nav.marketing')} onClose={onClose} isCollapsed={isCollapsed} />

        <div className={`my-4 border-t border-white/10 ${isCollapsed ? 'mx-2' : 'mx-1'}`}></div>

        <NavItem to="/ai-insights" icon={Brain} label="AI Рекомендации" onClose={onClose} isCollapsed={isCollapsed} />
        <NavItem to="/calls" icon={Phone} label={t('nav.calls')} onClose={onClose} isCollapsed={isCollapsed} />
        <NavItem to="/instagram" icon={Instagram} label="Instagram" onClose={onClose} isCollapsed={isCollapsed} />

        <div className={`my-4 border-t border-white/10 ${isCollapsed ? 'mx-2' : 'mx-1'}`}></div>

        <NavItem to="/integrations" icon={Plug} label={t('nav.integrations')} onClose={onClose} isCollapsed={isCollapsed} />
        <NavItem to="/settings" icon={Settings} label={t('nav.settings')} onClose={onClose} isCollapsed={isCollapsed} />
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-white/10">
        <motion.div
          className={`flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold flex-shrink-0">
            <User className="w-4 h-4" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                className="overflow-hidden min-w-0"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
              >
                <p className="text-xs font-semibold truncate">Admin</p>
                <p className="text-[10px] text-gray-400 truncate">admin@showtoday.kz</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.aside>
  );
};
