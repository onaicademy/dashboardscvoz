import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Users, TrendingUp, ArrowUp, Pause, Settings } from 'lucide-react';
import { Placement, PlacementRecommendation, formatCurrency, formatPercent } from '../../types/scoring';
import { TrendIndicator } from './TrendIndicator';
import { useTheme } from '../../contexts/ThemeContext';

interface PlacementCardProps {
  placement: Placement;
  onClick?: () => void;
}

const getPlacementIcon = (type: string) => {
  if (type.startsWith('instagram')) return Instagram;
  if (type.startsWith('facebook')) return Facebook;
  if (type === 'whatsapp') return MessageCircle;
  return Users;
};

const getRecommendationConfig = (rec: PlacementRecommendation) => {
  switch (rec) {
    case 'scale':
      return {
        label: 'Масштабировать',
        icon: ArrowUp,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10'
      };
    case 'maintain':
      return {
        label: 'Поддерживать',
        icon: TrendingUp,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10'
      };
    case 'optimize':
      return {
        label: 'Оптимизировать',
        icon: Settings,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10'
      };
    case 'pause':
      return {
        label: 'Приостановить',
        icon: Pause,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10'
      };
  }
};

export const PlacementCard: React.FC<PlacementCardProps> = ({
  placement,
  onClick
}) => {
  const { isDark } = useTheme();
  const Icon = getPlacementIcon(placement.type);
  const recConfig = getRecommendationConfig(placement.recommendation);
  const RecIcon = recConfig.icon;

  const ctr = (placement.metrics.clicks / placement.metrics.impressions * 100);
  const convRate = (placement.metrics.conversions / placement.metrics.leads * 100);
  const roi = ((placement.metrics.revenue - placement.metrics.spend) / placement.metrics.spend * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`
        p-4 rounded-xl cursor-pointer
        transition-all duration-300
        ${isDark
          ? 'bg-white/5 border border-white/10 hover:border-white/20'
          : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center
            ${placement.type.startsWith('instagram') ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
              placement.type.startsWith('facebook') ? 'bg-blue-600' :
              'bg-green-500'}
          `}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {placement.name}
            </h4>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {placement.totalScore}
              </span>
              <TrendIndicator trend={placement.trend} value={placement.trendValue} size="sm" />
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${recConfig.bgColor}`}>
          <RecIcon className={`w-3 h-3 ${recConfig.color}`} />
          <span className={`text-xs font-medium ${recConfig.color}`}>{recConfig.label}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-2">
        <div className={`text-center p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>CTR</p>
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {formatPercent(ctr)}
          </p>
        </div>
        <div className={`text-center p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Conv</p>
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {formatPercent(convRate)}
          </p>
        </div>
        <div className={`text-center p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>ROI</p>
          <p className={`font-semibold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {roi >= 0 ? '+' : ''}{roi.toFixed(0)}%
          </p>
        </div>
        <div className={`text-center p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Расход</p>
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {formatCurrency(placement.metrics.spend)}
          </p>
        </div>
      </div>

      {/* AI Insight */}
      {placement.aiInsight && (
        <p className={`mt-3 text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          💡 {placement.aiInsight}
        </p>
      )}
    </motion.div>
  );
};
