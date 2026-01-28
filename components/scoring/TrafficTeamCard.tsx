import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  Target,
  DollarSign,
  Percent,
  Sparkles
} from 'lucide-react';
import {
  TrafficTeam,
  Targetologist,
  formatCurrency,
  formatPercent,
  getRankColor,
  getRankBgColor,
  getTeamRecommendationColor,
  getTeamRecommendationLabel
} from '../../types/scoring';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface TrafficTeamCardProps {
  team: TrafficTeam;
  onMemberClick?: (member: Targetologist) => void;
}

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
  return <Minus className="w-4 h-4 text-gray-400" />;
};

export const TrafficTeamCard: React.FC<TrafficTeamCardProps> = ({ team, onMemberClick }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const roi = ((team.metrics.totalRevenue - team.metrics.totalSpend) / team.metrics.totalSpend * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-2xl border overflow-hidden
        ${isDark
          ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/10'
          : 'bg-white border-slate-200 shadow-lg'
        }
      `}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${getRankBgColor(team.rank)}`}>
              <Users className={`w-6 h-6 ${getRankColor(team.rank)}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {team.name}
                </h3>
                <span className={`text-2xl font-black ${getRankColor(team.rank)}`}>
                  {team.rank}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {team.members.length} {t('traffic.members').toLowerCase()}
                </span>
                <div className="flex items-center gap-1">
                  <TrendIcon trend={team.trend} />
                  <span className={`text-sm font-medium ${
                    team.trend === 'up' ? 'text-green-400' :
                    team.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {team.trendValue > 0 ? '+' : ''}{team.trendValue}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Badge */}
          <div className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getTeamRecommendationColor(team.recommendation)}`}>
            {getTeamRecommendationLabel(team.recommendation)}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Расход</span>
            </div>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatCurrency(team.metrics.totalSpend)}
            </p>
          </div>

          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</span>
            </div>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatCurrency(team.metrics.totalRevenue)}
            </p>
          </div>

          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Target className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Лиды</span>
            </div>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {team.metrics.totalLeads}
            </p>
          </div>

          <div className={`p-3 rounded-xl ${roi >= 200 ? 'bg-green-500/10' : roi >= 100 ? 'bg-yellow-500/10' : 'bg-red-500/10'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Percent className={`w-4 h-4 ${roi >= 200 ? 'text-green-400' : roi >= 100 ? 'text-yellow-400' : 'text-red-400'}`} />
              <span className={`text-xs ${roi >= 200 ? 'text-green-400' : roi >= 100 ? 'text-yellow-400' : 'text-red-400'}`}>ROI</span>
            </div>
            <p className={`font-bold ${roi >= 200 ? 'text-green-400' : roi >= 100 ? 'text-yellow-400' : 'text-red-400'}`}>
              {formatPercent(roi)}
            </p>
          </div>
        </div>

        {/* AI Insight */}
        {team.aiInsight && (
          <div className={`
            flex items-start gap-2 p-3 rounded-xl mb-4
            ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}
          `}>
            <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
            <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
              {team.aiInsight}
            </p>
          </div>
        )}

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-full flex items-center justify-center gap-2 py-2 rounded-xl
            transition-colors
            ${isDark
              ? 'bg-white/5 hover:bg-white/10 text-gray-400'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
            }
          `}
        >
          <span className="text-sm font-medium">
            {isExpanded ? t('common.collapse') : t('common.expand')} ({team.members.length})
          </span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Members List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}
          >
            <div className="p-4 space-y-3">
              {team.members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onMemberClick?.(member)}
                  className={`
                    flex items-center justify-between p-3 rounded-xl
                    transition-colors cursor-pointer
                    ${isDark
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-slate-50 hover:bg-slate-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${getRankBgColor(member.rank)}
                    `}>
                      <span className={`font-bold ${getRankColor(member.rank)}`}>
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {member.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          {member.metrics.totalCampaigns} кампаний
                        </span>
                        <span className={`text-xs font-medium ${getRankColor(member.rank)}`}>
                          Ранг {member.rank}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>ROI</p>
                      <p className={`font-bold ${member.scores.roi >= 70 ? 'text-green-400' : member.scores.roi >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {member.scores.roi}%
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>CPL</p>
                      <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {formatCurrency(member.metrics.avgCPL)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendIcon trend={member.trend} />
                      <span className={`text-sm font-medium ${
                        member.trend === 'up' ? 'text-green-400' :
                        member.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {member.trendValue > 0 ? '+' : ''}{member.trendValue}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
