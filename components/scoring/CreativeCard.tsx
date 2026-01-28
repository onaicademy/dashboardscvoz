import React from 'react';
import { motion } from 'framer-motion';
import { Image, Video, Layers, Square, Eye, Heart, Share2, Bookmark, Sparkles, AlertTriangle } from 'lucide-react';
import { Creative, CreativeStatus, formatCurrency, formatPercent, formatNumber } from '../../types/scoring';
import { TrendIndicator } from './TrendIndicator';
import { useTheme } from '../../contexts/ThemeContext';

interface CreativeCardProps {
  creative: Creative;
  onClick?: () => void;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'image': return Image;
    case 'video': return Video;
    case 'carousel': return Layers;
    case 'story': return Square;
    default: return Image;
  }
};

const getStatusConfig = (status: CreativeStatus) => {
  switch (status) {
    case 'top':
      return {
        label: 'Топ',
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30'
      };
    case 'performing':
      return {
        label: 'Работает',
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30'
      };
    case 'declining':
      return {
        label: 'Падает',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30'
      };
    case 'fatigue':
      return {
        label: 'Устал',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30'
      };
  }
};

export const CreativeCard: React.FC<CreativeCardProps> = ({
  creative,
  onClick
}) => {
  const { isDark } = useTheme();
  const TypeIcon = getTypeIcon(creative.type);
  const statusConfig = getStatusConfig(creative.status);

  const roi = ((creative.metrics.revenue - creative.metrics.spend) / creative.metrics.spend * 100);
  const engagementRate = ((creative.metrics.likes + creative.metrics.comments + creative.metrics.shares + creative.metrics.saves) / creative.metrics.reach * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`
        rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300
        ${isDark
          ? `bg-white/5 border ${statusConfig.borderColor} hover:border-white/30`
          : 'bg-white border border-slate-200 shadow-lg hover:shadow-xl'
        }
      `}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square">
        <div className={`
          w-full h-full flex items-center justify-center
          ${isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-slate-100'}
        `}>
          {creative.thumbnail ? (
            <img src={creative.thumbnail} alt={creative.name} className="w-full h-full object-cover" />
          ) : (
            <TypeIcon className={`w-12 h-12 ${isDark ? 'text-gray-600' : 'text-slate-400'}`} />
          )}
        </div>

        {/* Status Badge */}
        <div className={`
          absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium
          ${statusConfig.bgColor} ${statusConfig.color}
        `}>
          {statusConfig.label}
        </div>

        {/* Score Badge */}
        <div className={`
          absolute top-2 right-2 px-2 py-1 rounded-full text-sm font-bold
          ${isDark ? 'bg-black/60' : 'bg-white/90'} ${isDark ? 'text-white' : 'text-slate-900'}
        `}>
          {creative.totalScore}
        </div>

        {/* Type Badge */}
        <div className={`
          absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs
          ${isDark ? 'bg-black/60 text-white' : 'bg-white/90 text-slate-700'}
        `}>
          <TypeIcon className="w-3 h-3" />
          {creative.type}
        </div>

        {/* Fatigue Warning */}
        {creative.status === 'fatigue' && (
          <div className="absolute bottom-2 right-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Name & Trend */}
        <div className="flex items-start justify-between mb-2">
          <h4 className={`font-medium text-sm truncate flex-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {creative.name}
          </h4>
          <TrendIndicator trend={creative.trend} value={creative.trendValue} size="sm" />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>ROI</p>
            <p className={`font-semibold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {roi >= 0 ? '+' : ''}{roi.toFixed(0)}%
            </p>
          </div>
          <div className="group relative">
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Показов/чел.
            </p>
            <p className={`font-semibold ${creative.frequency > 3 ? 'text-yellow-400' : isDark ? 'text-white' : 'text-slate-900'}`}>
              {creative.frequency.toFixed(1)}×
            </p>
            {/* Tooltip */}
            <div className={`
              absolute bottom-full left-0 mb-2 px-2 py-1 rounded-lg text-xs whitespace-nowrap
              opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10
              ${isDark ? 'bg-white/20 text-white' : 'bg-slate-800 text-white'}
            `}>
              Сколько раз один человек видел рекламу. &gt;3 = усталость
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className={`flex items-center justify-between py-2 px-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-red-400" />
            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              {formatNumber(creative.metrics.likes)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 text-blue-400" />
            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              {formatNumber(creative.metrics.reach)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-3 h-3 text-green-400" />
            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              {formatNumber(creative.metrics.shares)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bookmark className="w-3 h-3 text-yellow-400" />
            <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              {formatNumber(creative.metrics.saves)}
            </span>
          </div>
        </div>

        {/* AI Insight */}
        {creative.aiInsight && (
          <div className={`mt-2 flex items-start gap-1`}>
            <Sparkles className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'} line-clamp-2`}>
              {creative.aiInsight}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
