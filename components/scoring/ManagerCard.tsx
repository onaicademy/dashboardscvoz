import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MessageSquare, Clock, Target, Sparkles, ChevronRight, Phone, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Manager, formatCurrency, formatPercent } from '../../types/scoring';
import { RankBadge } from './RankBadge';
import { ScoreBar } from './ScoreBar';
import { TrendIndicator } from './TrendIndicator';
import { useTheme } from '../../contexts/ThemeContext';

interface ManagerCardProps {
  manager: Manager;
  onClick?: () => void;
  isCompact?: boolean;
}

// Детальные данные для менеджера (в реальности - из API)
const getManagerDetails = (manager: Manager) => {
  const conversionRate = manager.metrics.totalDeals / manager.metrics.totalLeads * 100;
  const avgCheck = manager.metrics.totalRevenue / manager.metrics.totalDeals;

  return {
    weeklyStats: [
      { label: 'Пн', calls: Math.floor(Math.random() * 10) + 5, deals: Math.floor(Math.random() * 3) },
      { label: 'Вт', calls: Math.floor(Math.random() * 10) + 5, deals: Math.floor(Math.random() * 3) },
      { label: 'Ср', calls: Math.floor(Math.random() * 10) + 5, deals: Math.floor(Math.random() * 3) },
      { label: 'Чт', calls: Math.floor(Math.random() * 10) + 5, deals: Math.floor(Math.random() * 3) },
      { label: 'Пт', calls: Math.floor(Math.random() * 10) + 5, deals: Math.floor(Math.random() * 3) },
    ],
    recentActivity: [
      { time: '10:32', action: 'Закрыл сделку', value: formatCurrency(Math.floor(Math.random() * 200000) + 50000) },
      { time: '09:45', action: 'Входящий звонок', value: '4:32' },
      { time: '09:12', action: 'Отправил КП', value: 'Свадьба' },
    ],
    metrics: {
      conversionRate: conversionRate.toFixed(1),
      avgCheck: formatCurrency(avgCheck),
      responseTime: `${manager.metrics.avgResponseTime} мин`,
      activeLeads: Math.floor(Math.random() * 10) + 3,
      pendingTasks: Math.floor(Math.random() * 5),
    },
  };
};

export const ManagerCard: React.FC<ManagerCardProps> = ({
  manager,
  onClick,
  isCompact = false
}) => {
  const { isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const details = getManagerDetails(manager);

  if (isCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`
          rounded-xl overflow-hidden
          transition-all duration-300
          ${isDark
            ? 'bg-white/5 border border-white/10'
            : 'bg-white border border-slate-200 shadow-sm'
          }
        `}
      >
        {/* Collapsed Header */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            flex items-center gap-3 p-3 cursor-pointer
            transition-all duration-200
            ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}
          `}
        >
          {/* Avatar */}
          <div className="relative">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${isDark ? 'bg-primary/20' : 'bg-yellow-100'}
            `}>
              {manager.avatar ? (
                <img src={manager.avatar} alt={manager.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1">
              <RankBadge rank={manager.rank} size="sm" showGlow={false} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`font-medium truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {manager.name}
              </span>
            </div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {manager.metrics.totalDeals} сделок • {formatCurrency(manager.metrics.totalRevenue)}
            </div>
          </div>

          {/* Score & Trend */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-lg font-bold text-primary">{manager.totalScore}</span>
            <TrendIndicator trend={manager.trend} value={manager.trendValue} size="sm" />
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
          </motion.div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={`px-3 pb-4 pt-1 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className={`p-2 rounded-lg text-center ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <Target className="w-4 h-4 mx-auto mb-1 text-green-400" />
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Конверсия</p>
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {details.metrics.conversionRate}%
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg text-center ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <DollarSign className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Ср. чек</p>
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {details.metrics.avgCheck}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg text-center ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <Clock className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Отклик</p>
                    <p className={`text-sm font-bold ${manager.metrics.avgResponseTime > 10 ? 'text-red-400' : isDark ? 'text-white' : 'text-slate-900'}`}>
                      {details.metrics.responseTime}
                    </p>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-1.5 mb-3">
                  <ScoreBar label="Конверсия" score={manager.scores.conversion} size="sm" />
                  <ScoreBar label="Средний чек" score={manager.scores.avgCheck} size="sm" />
                  <ScoreBar label="Скорость" score={manager.scores.responseSpeed} size="sm" />
                  <ScoreBar label="Качество" score={manager.scores.quality} size="sm" />
                </div>

                {/* Recent Activity */}
                <div className="mb-3">
                  <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Последняя активность
                  </p>
                  <div className="space-y-1">
                    {details.recentActivity.map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <span className={`w-10 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                          {activity.time}
                        </span>
                        <span className={`flex-1 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                          {activity.action}
                        </span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {activity.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insight */}
                {manager.aiInsight && (
                  <div className={`p-2.5 rounded-xl ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-purple-700'}`}>
                        {manager.aiInsight}
                      </p>
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-dashed ${isDark ? 'border-white/10' : 'border-slate-200'}">
                  <div className="flex items-center gap-1 text-xs">
                    <Phone className="w-3 h-3 text-green-400" />
                    <span className={isDark ? 'text-gray-300' : 'text-slate-600'}>
                      {details.metrics.activeLeads} активных лидов
                    </span>
                  </div>
                  {details.metrics.pendingTasks > 0 && (
                    <div className="flex items-center gap-1 text-xs text-orange-400">
                      <AlertCircle className="w-3 h-3" />
                      <span>{details.metrics.pendingTasks} задач</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Full card mode
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`
        p-5 rounded-2xl cursor-pointer
        transition-all duration-300
        ${isDark
          ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-primary/30'
          : 'bg-white border border-slate-200 shadow-lg hover:shadow-xl'
        }
      `}
      style={{
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`
              w-14 h-14 rounded-xl flex items-center justify-center
              ${isDark ? 'bg-primary/20' : 'bg-yellow-100'}
            `}>
              {manager.avatar ? (
                <img src={manager.avatar} alt={manager.name} className="w-full h-full rounded-xl object-cover" />
              ) : (
                <User className="w-7 h-7 text-primary" />
              )}
            </div>
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {manager.name}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {manager.department}
            </p>
          </div>
        </div>
        <RankBadge rank={manager.rank} size="lg" />
      </div>

      {/* Main Score */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Общий скор</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">{manager.totalScore}</span>
            <span className="text-gray-400">/100</span>
          </div>
        </div>
        <TrendIndicator trend={manager.trend} value={manager.trendValue} />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <Target className="w-4 h-4 text-green-400" />
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Конверсия</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatPercent(manager.metrics.totalDeals / manager.metrics.totalLeads * 100)}
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <Clock className="w-4 h-4 text-blue-400" />
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Отклик</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {manager.metrics.avgResponseTime} мин
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Сообщений</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {manager.metrics.totalMessages}
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Качество</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {manager.metrics.aiQualityScore}/10
            </p>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-2">
        <ScoreBar label="Конверсия" score={manager.scores.conversion} size="sm" />
        <ScoreBar label="Средний чек" score={manager.scores.avgCheck} size="sm" />
        <ScoreBar label="Скорость" score={manager.scores.responseSpeed} size="sm" />
        <ScoreBar label="Вовлечённость" score={manager.scores.engagement} size="sm" />
        <ScoreBar label="Качество" score={manager.scores.quality} size="sm" />
      </div>

      {/* AI Insight */}
      {manager.aiInsight && (
        <div className={`mt-4 p-3 rounded-xl ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
            <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-purple-700'}`}>
              {manager.aiInsight}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
