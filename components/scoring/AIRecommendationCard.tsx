import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  TrendingUp,
  ImageOff,
  UserMinus,
  Clock,
  Flame,
  Target,
  ArrowRightLeft,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Zap
} from 'lucide-react';
import { AIRecommendation, RecommendationType, Priority, getPriorityColor } from '../../types/scoring';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onAction?: (actionId: string) => void;
  isCompact?: boolean;
}

const getTypeConfig = (type: RecommendationType, t: (key: string) => string) => {
  switch (type) {
    case 'BUDGET_DRAIN':
      return {
        icon: AlertTriangle,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        label: t('recommendation.budgetDrain'),
        actionLabel: t('recommendation.stop')
      };
    case 'SCALE_OPPORTUNITY':
      return {
        icon: TrendingUp,
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        label: t('recommendation.scaleOpportunity'),
        actionLabel: t('recommendation.scaleBudget')
      };
    case 'CREATIVE_FATIGUE':
      return {
        icon: ImageOff,
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10',
        label: t('recommendation.creativeFatigue'),
        actionLabel: t('recommendation.update')
      };
    case 'MANAGER_UNDERPERFORM':
      return {
        icon: UserMinus,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        label: t('recommendation.managerUnderperform'),
        actionLabel: t('recommendation.investigate')
      };
    case 'SLOW_RESPONSE':
      return {
        icon: Clock,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        label: t('recommendation.slowResponse'),
        actionLabel: t('recommendation.speedUp')
      };
    case 'HIGH_POTENTIAL_LEAD':
      return {
        icon: Flame,
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        label: t('recommendation.highPotentialLead'),
        actionLabel: t('recommendation.contact')
      };
    case 'TARGETING_ISSUE':
      return {
        icon: Target,
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/10',
        label: t('recommendation.targetingIssue'),
        actionLabel: t('recommendation.fix')
      };
    case 'PLACEMENT_SHIFT':
      return {
        icon: ArrowRightLeft,
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10',
        label: t('recommendation.placementShift'),
        actionLabel: t('recommendation.switch')
      };
    default:
      return {
        icon: Sparkles,
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/10',
        label: t('marketing.aiRecommendations'),
        actionLabel: t('recommendation.apply')
      };
  }
};

const getPriorityLabel = (priority: Priority, t: (key: string) => string) => {
  switch (priority) {
    case 'critical': return t('priority.critical');
    case 'high': return t('priority.high');
    case 'medium': return t('priority.medium');
    case 'low': return t('priority.low');
  }
};

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  recommendation,
  onAction,
  isCompact = false
}) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const typeConfig = getTypeConfig(recommendation.type, t);
  const TypeIcon = typeConfig.icon;

  // Compact card (for sidebar/list views)
  if (isCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`
          rounded-xl overflow-hidden cursor-pointer
          transition-all duration-300
          ${isDark
            ? 'bg-white/5 border border-white/10 hover:border-white/20'
            : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
          }
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header - Always visible */}
        <div className="flex items-center gap-3 p-3">
          <div className={`p-2 rounded-lg flex-shrink-0 ${typeConfig.bgColor}`}>
            <TypeIcon className={`w-4 h-4 ${typeConfig.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {recommendation.title}
              </p>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
              {recommendation.target.name}
            </p>
          </div>
          <div className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${getPriorityColor(recommendation.priority)}`}>
            {getPriorityLabel(recommendation.priority, t)}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
          </motion.div>
        </div>

        {/* Expanded Content - Simplified */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className={`px-3 pb-3 pt-1 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                {/* Problem & Solution */}
                <div className="mb-3">
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                    {recommendation.insight}
                  </p>
                </div>

                {/* Expected Impact */}
                <div className={`flex items-center gap-2 p-2.5 rounded-lg mb-3 ${
                  isDark ? 'bg-green-500/10' : 'bg-green-50'
                }`}>
                  <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                    {recommendation.expectedImpact}
                  </p>
                </div>

                {/* Single Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction?.(recommendation.type);
                  }}
                  className={`
                    w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                    font-medium text-sm transition-all
                    bg-primary text-black hover:bg-primary-dark
                  `}
                >
                  <Zap className="w-4 h-4" />
                  {typeConfig.actionLabel}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Full card view (for main dashboard)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        p-5 rounded-2xl
        transition-all duration-300
        ${isDark
          ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
          : 'bg-white border border-slate-200 shadow-lg'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${typeConfig.bgColor}`}>
            <TypeIcon className={`w-6 h-6 ${typeConfig.color}`} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeConfig.bgColor} ${typeConfig.color}`}>
                {typeConfig.label}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(recommendation.priority)}`}>
                {getPriorityLabel(recommendation.priority, t)}
              </span>
            </div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {recommendation.title}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t('recommendation.confidence')}</p>
          <p className={`font-bold ${
            recommendation.confidence >= 80 ? 'text-green-400' :
            recommendation.confidence >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {recommendation.confidence}%
          </p>
        </div>
      </div>

      {/* Target */}
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4 ${
        isDark ? 'bg-white/5' : 'bg-slate-50'
      }`}>
        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          {recommendation.target.type}:
        </span>
        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {recommendation.target.name}
        </span>
      </div>

      {/* Problem */}
      <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
        {recommendation.insight}
      </p>

      {/* Solution */}
      <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
        <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('recommendation.solution')}: </span>
        {recommendation.recommendation}
      </p>

      {/* Metrics (if available) - Simplified */}
      {recommendation.metrics && (
        <div className={`flex items-center gap-4 p-3 rounded-xl mb-4 ${
          isDark ? 'bg-white/5' : 'bg-slate-50'
        }`}>
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t('recommendation.now')}</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {recommendation.metrics.current}{recommendation.metrics.unit}
            </p>
          </div>
          <ArrowRight className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
          <div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t('recommendation.target')}</p>
            <p className="font-bold text-green-400">
              {recommendation.metrics.benchmark}{recommendation.metrics.unit}
            </p>
          </div>
        </div>
      )}

      {/* Expected Impact */}
      <div className={`flex items-center gap-2 p-3 rounded-xl mb-4 ${
        isDark ? 'bg-green-500/10' : 'bg-green-50'
      }`}>
        <TrendingUp className="w-4 h-4 text-green-400" />
        <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>
          <span className="font-medium">{t('recommendation.effect')}:</span> {recommendation.expectedImpact}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onAction?.(recommendation.type)}
        className={`
          w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
          font-medium transition-all
          bg-primary text-black hover:bg-primary-dark
        `}
      >
        <Zap className="w-5 h-5" />
        {typeConfig.actionLabel}
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};
