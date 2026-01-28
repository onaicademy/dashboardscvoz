import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Brain,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Sparkles,
  ChevronRight,
  Clock,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface AIStrategyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  context?: 'marketing' | 'calls' | 'dashboard';
}

// Mock данные для AI анализа
const AI_ANALYSIS_DATA = {
  summary: {
    period: 'Январь 2026',
    totalLeads: 163,
    totalDeals: 51,
    conversionRate: 31.3,
    revenue: 7070000,
    roiChange: -8,
  },
  criticalIssues: [
    {
      type: 'campaign',
      title: 'Кампания "Детские праздники" сливает бюджет',
      impact: '180,000 ₸ потрачено с ROI 8%',
      action: 'Остановлена. Требуется пересмотр таргетинга.',
    },
    {
      type: 'manager',
      title: 'Бахытжан Серикулы — критическое падение',
      impact: 'Конверсия упала с 45% до 21%, потеряно ~24 лида',
      action: 'Назначить наставника или пересмотреть позицию.',
    },
  ],
  managersNeedingAttention: [
    { name: 'Бахытжан Серикулы', score: 35, issue: 'Конверсия 21%, время ответа 22 мин', rank: 'D' },
    { name: 'Динара Касымова', score: 52, issue: 'Время ответа выросло до 12 мин, 8 зависших лидов', rank: 'C' },
  ],
  trafficTeamPerformance: {
    weekly: {
      spend: 645000,
      leads: 146,
      deals: 30,
      roi: 565,
      cpl: 4418,
    },
    monthly: {
      spend: 2580000,
      leads: 584,
      deals: 120,
      roi: 485,
      cpl: 4418,
    },
    comparison: {
      leadsVsLastWeek: -5,
      dealsVsLastWeek: -2,
      roiVsLastWeek: -8,
    },
  },
  aiConclusions: [
    {
      priority: 'critical',
      text: 'Убыточная кампания "Детские праздники" остановлена. Перед перезапуском обязательно изменить аудиторию на женщин 25-40 с детьми.',
    },
    {
      priority: 'high',
      text: 'Менеджер Бахытжан требует срочного внимания — его конверсия падает 3 недели подряд. Рассмотрите личную беседу.',
    },
    {
      priority: 'medium',
      text: 'Кампания "Свадьбы 2026" показывает стабильный рост. Можно увеличить бюджет на 15-20% для масштабирования.',
    },
    {
      priority: 'medium',
      text: 'Креативы для "Дни рождения взрослых" устали (частота 3.8). Подготовьте новые материалы в течение недели.',
    },
    {
      priority: 'low',
      text: 'Органический трафик (WhatsApp + рекомендации) даёт 28% выручки без затрат. Развивайте реферальную программу.',
    },
  ],
  forecast: {
    optimistic: { revenue: 8500000, deals: 62 },
    realistic: { revenue: 7200000, deals: 53 },
    pessimistic: { revenue: 6100000, deals: 45 },
  },
};

export const AIStrategyPopup: React.FC<AIStrategyPopupProps> = ({ isOpen, onClose, context = 'dashboard' }) => {
  const { isDark } = useTheme();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500 bg-red-500/10';
      case 'high': return 'text-orange-500 bg-orange-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '📊';
      default: return '💡';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed inset-4 md:inset-10 lg:inset-16 z-[101] overflow-hidden rounded-2xl ${
              isDark ? 'bg-[#1A1A1A]' : 'bg-white'
            } shadow-2xl flex flex-col`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    AI Стратегический анализ
                  </h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {AI_ANALYSIS_DATA.summary.period} • Комплексный отчёт
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-slate-100 text-slate-500'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <Users className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {AI_ANALYSIS_DATA.summary.totalLeads}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Лидов</p>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <Target className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {AI_ANALYSIS_DATA.summary.totalDeals}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Сделок</p>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <BarChart3 className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {AI_ANALYSIS_DATA.summary.conversionRate}%
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Конверсия</p>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <DollarSign className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {(AI_ANALYSIS_DATA.summary.revenue / 1000000).toFixed(1)}M ₸
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</p>
                </div>
                <div className={`p-4 rounded-xl ${
                  AI_ANALYSIS_DATA.summary.roiChange >= 0
                    ? (isDark ? 'bg-green-500/10' : 'bg-green-50')
                    : (isDark ? 'bg-red-500/10' : 'bg-red-50')
                }`}>
                  {AI_ANALYSIS_DATA.summary.roiChange >= 0 ? (
                    <TrendingUp className="w-5 h-5 mb-2 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 mb-2 text-red-500" />
                  )}
                  <p className={`text-2xl font-bold ${
                    AI_ANALYSIS_DATA.summary.roiChange >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {AI_ANALYSIS_DATA.summary.roiChange > 0 ? '+' : ''}{AI_ANALYSIS_DATA.summary.roiChange}%
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>ROI vs прошлая неделя</p>
                </div>
              </div>

              {/* Critical Issues */}
              {AI_ANALYSIS_DATA.criticalIssues.length > 0 && (
                <div className={`p-5 rounded-2xl border-2 ${
                  isDark ? 'bg-red-500/5 border-red-500/30' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Критические проблемы ({AI_ANALYSIS_DATA.criticalIssues.length})
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {AI_ANALYSIS_DATA.criticalIssues.map((issue, idx) => (
                      <div key={idx} className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
                        <p className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {issue.title}
                        </p>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          Влияние: {issue.impact}
                        </p>
                        <p className="text-sm text-red-500 font-medium">
                          → {issue.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Managers Needing Attention */}
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Менеджеры, требующие внимания
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {AI_ANALYSIS_DATA.managersNeedingAttention.map((manager, idx) => (
                      <div key={idx} className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {manager.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm ${manager.score < 50 ? 'text-red-500' : 'text-yellow-500'}`}>
                              {manager.score} баллов
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              manager.rank === 'D' ? 'bg-red-500/20 text-red-500' :
                              manager.rank === 'C' ? 'bg-yellow-500/20 text-yellow-500' :
                              'bg-blue-500/20 text-blue-500'
                            }`}>
                              {manager.rank}
                            </span>
                          </div>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          {manager.issue}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Traffic Team Performance */}
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Трафик-команда
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>За неделю</p>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {AI_ANALYSIS_DATA.trafficTeamPerformance.weekly.leads} лидов
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {AI_ANALYSIS_DATA.trafficTeamPerformance.weekly.deals} сделок
                      </p>
                      <p className="text-sm text-green-500">
                        ROI {AI_ANALYSIS_DATA.trafficTeamPerformance.weekly.roi}%
                      </p>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>За месяц</p>
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {AI_ANALYSIS_DATA.trafficTeamPerformance.monthly.leads} лидов
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {AI_ANALYSIS_DATA.trafficTeamPerformance.monthly.deals} сделок
                      </p>
                      <p className="text-sm text-green-500">
                        ROI {AI_ANALYSIS_DATA.trafficTeamPerformance.monthly.roi}%
                      </p>
                    </div>
                  </div>
                  <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      Сравнение с прошлой неделей:
                    </p>
                    <div className="flex gap-4 mt-2">
                      <span className={AI_ANALYSIS_DATA.trafficTeamPerformance.comparison.leadsVsLastWeek >= 0 ? 'text-green-500' : 'text-red-500'}>
                        Лиды: {AI_ANALYSIS_DATA.trafficTeamPerformance.comparison.leadsVsLastWeek > 0 ? '+' : ''}
                        {AI_ANALYSIS_DATA.trafficTeamPerformance.comparison.leadsVsLastWeek}%
                      </span>
                      <span className={AI_ANALYSIS_DATA.trafficTeamPerformance.comparison.roiVsLastWeek >= 0 ? 'text-green-500' : 'text-red-500'}>
                        ROI: {AI_ANALYSIS_DATA.trafficTeamPerformance.comparison.roiVsLastWeek > 0 ? '+' : ''}
                        {AI_ANALYSIS_DATA.trafficTeamPerformance.comparison.roiVsLastWeek}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Conclusions */}
              <div className={`p-5 rounded-2xl border ${
                isDark
                  ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-white/10'
                  : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    AI Выводы и рекомендации
                  </h3>
                </div>
                <div className="space-y-3">
                  {AI_ANALYSIS_DATA.aiConclusions.map((conclusion, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl ${
                      isDark ? 'bg-white/5' : 'bg-white/80'
                    }`}>
                      <span className="text-lg flex-shrink-0">
                        {getPriorityIcon(conclusion.priority)}
                      </span>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                        {conclusion.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Forecast */}
              <div className={`p-5 rounded-2xl border ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Прогноз на следующий месяц
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
                    <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Пессимистичный</p>
                    <p className="text-lg font-bold text-red-500">
                      {(AI_ANALYSIS_DATA.forecast.pessimistic.revenue / 1000000).toFixed(1)}M ₸
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {AI_ANALYSIS_DATA.forecast.pessimistic.deals} сделок
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
                    <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Реалистичный</p>
                    <p className="text-lg font-bold text-yellow-500">
                      {(AI_ANALYSIS_DATA.forecast.realistic.revenue / 1000000).toFixed(1)}M ₸
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {AI_ANALYSIS_DATA.forecast.realistic.deals} сделок
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                    <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Оптимистичный</p>
                    <p className="text-lg font-bold text-green-500">
                      {(AI_ANALYSIS_DATA.forecast.optimistic.revenue / 1000000).toFixed(1)}M ₸
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {AI_ANALYSIS_DATA.forecast.optimistic.deals} сделок
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Обновлено: сегодня в 09:15
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                  }`}>
                    Powered by Claude AI
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
