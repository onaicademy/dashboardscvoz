import React from 'react';
import { motion } from 'framer-motion';
import { Target, DollarSign, MousePointer, TrendingUp, Sparkles } from 'lucide-react';
import { Targetologist, formatCurrency, formatPercent } from '../../types/scoring';
import { RankBadge } from './RankBadge';
import { ScoreBar } from './ScoreBar';
import { TrendIndicator } from './TrendIndicator';
import { useTheme } from '../../contexts/ThemeContext';

interface TargetologistCardProps {
  targetologist: Targetologist;
  onClick?: () => void;
}

export const TargetologistCard: React.FC<TargetologistCardProps> = ({
  targetologist,
  onClick
}) => {
  const { isDark } = useTheme();

  const roi = ((targetologist.metrics.totalRevenue - targetologist.metrics.totalSpend) / targetologist.metrics.totalSpend * 100);

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
          ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 hover:border-blue-500/30'
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
          <div className={`
            w-14 h-14 rounded-xl flex items-center justify-center
            ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}
          `}>
            {targetologist.avatar ? (
              <img src={targetologist.avatar} alt={targetologist.name} className="w-full h-full rounded-xl object-cover" />
            ) : (
              <Target className="w-7 h-7 text-blue-500" />
            )}
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {targetologist.name}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {targetologist.metrics.totalCampaigns} кампаний
            </p>
          </div>
        </div>
        <RankBadge rank={targetologist.rank} size="lg" />
      </div>

      {/* Main Score */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Общий скор</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-400">{targetologist.totalScore}</span>
            <span className="text-gray-400">/100</span>
          </div>
        </div>
        <TrendIndicator trend={targetologist.trend} value={targetologist.trendValue} />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <TrendingUp className="w-4 h-4 text-green-400" />
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>ROI</p>
            <p className={`font-semibold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {roi >= 0 ? '+' : ''}{roi.toFixed(0)}%
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <DollarSign className="w-4 h-4 text-yellow-400" />
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>CPL</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatCurrency(targetologist.metrics.avgCPL)}
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <MousePointer className="w-4 h-4 text-blue-400" />
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>CTR</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatPercent(targetologist.metrics.avgCTR)}
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <Target className="w-4 h-4 text-purple-400" />
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Лиды</p>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {targetologist.metrics.totalLeads}
            </p>
          </div>
        </div>
      </div>

      {/* Spend & Revenue */}
      <div className={`flex justify-between p-3 rounded-xl mb-4 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
        <div>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Расход</p>
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {formatCurrency(targetologist.metrics.totalSpend)}
          </p>
        </div>
        <div className="text-right">
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</p>
          <p className="font-semibold text-green-400">
            {formatCurrency(targetologist.metrics.totalRevenue)}
          </p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-2">
        <ScoreBar label="Качество трафика" score={targetologist.scores.trafficQuality} size="sm" color="bg-blue-500" />
        <ScoreBar label="ROI" score={targetologist.scores.roi} size="sm" color="bg-green-500" />
        <ScoreBar label="CPL" score={targetologist.scores.cpl} size="sm" color="bg-yellow-500" />
        <ScoreBar label="CTR" score={targetologist.scores.ctr} size="sm" color="bg-purple-500" />
      </div>

      {/* AI Insight */}
      {targetologist.aiInsight && (
        <div className={`mt-4 p-3 rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className={`text-sm ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>
              {targetologist.aiInsight}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
