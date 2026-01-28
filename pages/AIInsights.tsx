import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Brain,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Filter,
  RefreshCw,
  ChevronDown,
  Target,
  Users,
  Image,
  MapPin
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_RECOMMENDATIONS } from '../services/scoringData';
import { AIRecommendationCard } from '../components/scoring';
import { Priority, RecommendationType } from '../types/scoring';

const priorityFilters: { value: Priority | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'Все', color: 'bg-gray-500' },
  { value: 'critical', label: 'Критичные', color: 'bg-red-500' },
  { value: 'high', label: 'Высокие', color: 'bg-orange-500' },
  { value: 'medium', label: 'Средние', color: 'bg-yellow-500' },
  { value: 'low', label: 'Низкие', color: 'bg-green-500' },
];

const typeFilters: { value: RecommendationType | 'all'; label: string; icon: any }[] = [
  { value: 'all', label: 'Все типы', icon: Sparkles },
  { value: 'BUDGET_DRAIN', label: 'Слив бюджета', icon: AlertTriangle },
  { value: 'SCALE_OPPORTUNITY', label: 'Масштабирование', icon: TrendingUp },
  { value: 'CREATIVE_FATIGUE', label: 'Усталость креатива', icon: Image },
  { value: 'MANAGER_UNDERPERFORM', label: 'Проблемы менеджера', icon: Users },
  { value: 'PLACEMENT_SHIFT', label: 'Смена плейсмента', icon: MapPin },
];

export const AIInsights: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedType, setSelectedType] = useState<RecommendationType | 'all'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredRecommendations = MOCK_RECOMMENDATIONS.filter((rec) => {
    if (selectedPriority !== 'all' && rec.priority !== selectedPriority) return false;
    if (selectedType !== 'all' && rec.type !== selectedType) return false;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const handleAction = (actionId: string) => {
    console.log('Action triggered:', actionId);
    // TODO: Implement actions
  };

  // Stats
  const criticalCount = MOCK_RECOMMENDATIONS.filter(r => r.priority === 'critical').length;
  const highCount = MOCK_RECOMMENDATIONS.filter(r => r.priority === 'high').length;
  const potentialSavings = 180000; // Mock
  const potentialRevenue = 650000; // Mock

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
            <Brain className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              AI Рекомендации
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Автоматический анализ и инсайты
            </p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          } ${isRefreshing ? 'opacity-50' : ''}`}
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Обновить анализ
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${
            isDark
              ? 'bg-red-500/10 border-red-500/20'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Критичные</p>
              <p className="text-2xl font-bold text-red-500">{criticalCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-xl border ${
            isDark
              ? 'bg-orange-500/10 border-orange-500/20'
              : 'bg-orange-50 border-orange-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-orange-500" />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Высокий приоритет</p>
              <p className="text-2xl font-bold text-orange-500">{highCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-xl border ${
            isDark
              ? 'bg-green-500/10 border-green-500/20'
              : 'bg-green-50 border-green-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Потенциал выручки</p>
              <p className="text-2xl font-bold text-green-500">+{(potentialRevenue / 1000).toFixed(0)}K ₸</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-4 rounded-xl border ${
            isDark
              ? 'bg-blue-500/10 border-blue-500/20'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-500" />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Возможная экономия</p>
              <p className="text-2xl font-bold text-blue-500">{(potentialSavings / 1000).toFixed(0)}K ₸</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className={`p-4 rounded-xl border ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              Приоритет:
            </span>
            <div className="flex gap-1">
              {priorityFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedPriority(filter.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedPriority === filter.value
                      ? `${filter.color} text-white`
                      : isDark
                        ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              Тип:
            </span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as RecommendationType | 'all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {typeFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Рекомендации ({filteredRecommendations.length})
          </h2>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AIRecommendationCard
                    recommendation={rec}
                    onAction={handleAction}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-12 rounded-xl text-center ${
                isDark ? 'bg-white/5' : 'bg-slate-50'
              }`}
            >
              <Sparkles className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-slate-400'}`} />
              <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Нет рекомендаций по выбранным фильтрам
              </p>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                Попробуйте изменить фильтры или обновить анализ
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Capabilities Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`p-6 rounded-2xl border ${
          isDark
            ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-white/10'
            : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
            <Brain className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Как работает AI анализ
            </h3>
            <div className={`text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              <p>
                <strong>1. Мониторинг метрик</strong> — система отслеживает KPI в реальном времени
              </p>
              <p>
                <strong>2. Выявление паттернов</strong> — алгоритмы находят аномалии и тренды
              </p>
              <p>
                <strong>3. Генерация рекомендаций</strong> — AI формирует конкретные action items
              </p>
              <p>
                <strong>4. Прогнозирование</strong> — оценка потенциального эффекта от действий
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
              }`}>
                Powered by Claude AI
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
              }`}>
                Обновление каждые 15 мин
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
