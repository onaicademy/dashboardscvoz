import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { ChatDetail } from './pages/ChatDetail';
import { Trends } from './pages/Trends';
import { Marketing } from './pages/Marketing';
import { Settings } from './pages/Settings';
import { AIInsights } from './pages/AIInsights';
import { CallsAnalytics } from './pages/CallsAnalytics';
import { Integrations } from './pages/Integrations';
import { Instagram } from './pages/Instagram';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const getPageTitle = (pathname: string) => {
    if (pathname === '/') return t('nav.dashboard');
    if (pathname.startsWith('/analytics')) return t('nav.analytics');
    if (pathname === '/trends') return t('nav.trends');
    if (pathname === '/marketing') return t('nav.marketing');
    if (pathname === '/ai-insights') return 'AI Рекомендации';
    if (pathname === '/calls') return t('nav.calls');
    if (pathname === '/integrations') return t('nav.integrations');
    if (pathname === '/instagram') return 'Instagram';
    if (pathname === '/settings') return t('nav.settings');
    return 'ShowToday';
  };

  const mainMarginLeft = isDesktop ? (isSidebarCollapsed ? 72 : 240) : 0;

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-dark-bg' : 'bg-[#F8FAFC]'}`}>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Sidebar
          onClose={() => setIsMobileMenuOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
        style={{ marginLeft: mainMarginLeft }}
      >
        <Header
          title={getPageTitle(location.pathname)}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/analytics/:id" element={<ChatDetail />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/calls" element={<CallsAnalytics />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
