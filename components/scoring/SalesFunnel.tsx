import React from 'react';
import { motion } from 'framer-motion';
import { FunnelStageData, formatCurrency, formatPercent } from '../../types/scoring';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface SalesFunnelProps {
  stages: FunnelStageData[];
  showValues?: boolean;
  showSpend?: boolean;
}

export const SalesFunnel: React.FC<SalesFunnelProps> = ({
  stages,
  showValues = true,
  showSpend = true
}) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const maxCount = Math.max(...stages.map(s => s.count));

  // Calculate total spend
  const totalSpend = stages.reduce((sum, s) => sum + (s.spend || 0), 0);

  return (
    <div className="w-full">
      {/* Total spend summary */}
      {showSpend && totalSpend > 0 && (
        <div className={`flex items-center justify-between mb-4 pb-3 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            {t('dashboard.totalFunnelSpend')}:
          </span>
          <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {formatCurrency(totalSpend)}
          </span>
        </div>
      )}

      {stages.map((stage, index) => {
        const widthPercent = (stage.count / maxCount) * 100;
        const isLast = index === stages.length - 1;
        const hasSpend = stage.spend && stage.spend > 0;
        const displayValue = stage.value > 0 ? stage.value : (hasSpend ? stage.spend : 0);

        return (
          <motion.div
            key={stage.stage}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-2"
          >
            {/* Stage Label */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {stage.name}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  ({stage.count})
                </span>
              </div>
              {!isLast && stage.conversionRate > 0 && (
                <span className={`text-xs font-medium ${
                  stage.conversionRate >= 50 ? 'text-green-400' :
                  stage.conversionRate >= 30 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {formatPercent(stage.conversionRate)} →
                </span>
              )}
            </div>

            {/* Funnel Bar */}
            <div className="relative">
              <div
                className={`h-10 rounded-lg overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}
                style={{ width: '100%' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                  className="h-full rounded-lg flex items-center justify-end px-3"
                  style={{ backgroundColor: stage.color }}
                >
                  {showValues && widthPercent > 30 && displayValue > 0 && (
                    <span className="text-sm font-semibold text-white">
                      {hasSpend && stage.value === 0 ? `-${formatCurrency(stage.spend)}` : formatCurrency(stage.value)}
                    </span>
                  )}
                </motion.div>
              </div>
              {showValues && (widthPercent <= 30 || displayValue === 0) && (
                <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {hasSpend && stage.value === 0
                    ? <span className="text-red-400">-{formatCurrency(stage.spend)}</span>
                    : stage.value > 0
                      ? formatCurrency(stage.value)
                      : '0 ₸'
                  }
                </span>
              )}
            </div>

            {/* Time in stage */}
            {stage.avgTimeInStage > 0 && (
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                {t('dashboard.avgTime')}: {stage.avgTimeInStage < 24 ? `${stage.avgTimeInStage}${t('dashboard.hours')}` : `${(stage.avgTimeInStage / 24).toFixed(1)}${t('dashboard.days')}`}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
