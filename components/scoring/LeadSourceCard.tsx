import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, MessageCircle, Globe, Users } from 'lucide-react';
import { LeadSource, formatCurrency, formatPercent } from '../../types/scoring';
import { useTheme } from '../../contexts/ThemeContext';

interface LeadSourceCardProps {
  source: LeadSource;
  onClick?: () => void;
}

const getSourceIcon = (iconName: string) => {
  switch (iconName) {
    case 'instagram': return Instagram;
    case 'facebook': return Facebook;
    case 'whatsapp': return MessageCircle;
    case 'website': return Globe;
    default: return Users;
  }
};

export const LeadSourceCard: React.FC<LeadSourceCardProps> = ({
  source,
  onClick
}) => {
  const { isDark } = useTheme();
  const Icon = getSourceIcon(source.icon);

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
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: source.color + '20' }}
        >
          <Icon className="w-5 h-5" style={{ color: source.color }} />
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {source.name}
          </h4>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            {source.leads} лидов
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2">
        <div className={`text-center p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Conv</p>
          <p className={`font-semibold ${
            source.conversionRate >= 40 ? 'text-green-400' :
            source.conversionRate >= 20 ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {formatPercent(source.conversionRate)}
          </p>
        </div>
        <div className={`text-center p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>ROI</p>
          <p className={`font-semibold ${
            source.roi >= 150 ? 'text-green-400' :
            source.roi >= 100 ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {source.roi >= 0 ? '+' : ''}{source.roi.toFixed(0)}%
          </p>
        </div>
        <div className={`text-center p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>CPL</p>
          <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {formatCurrency(source.cpl)}
          </p>
        </div>
      </div>

      {/* Revenue Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>Расход</span>
          <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>Выручка</span>
        </div>
        <div className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <span className="text-sm font-medium">{formatCurrency(source.spend)}</span>
          <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />
          <span className="text-sm font-medium text-green-400">{formatCurrency(source.revenue)}</span>
        </div>
      </div>
    </motion.div>
  );
};
