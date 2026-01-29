import React, { useState, useMemo } from 'react';
import { Smile, MessageCircle, CheckCircle, TrendingUp, Play, Users, Target, Sparkles, DollarSign, Filter, X, ChevronDown, Calendar, Radio, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_CHATS } from '../services/mockData';
import {
  MOCK_MANAGERS,
  MOCK_FUNNEL,
  MOCK_LEAD_SOURCES,
  MOCK_RECOMMENDATIONS,
  MOCK_CREATIVES,
  FUNNEL_BY_CHANNEL,
  FunnelChannel
} from '../services/scoringData';
import { MOCK_TRAFFIC_TEAMS } from '../services/trafficTeamData';
import {
  BRANCHES,
  CityCode,
  getBranchFunnel,
  getBranchManagers,
  getBranchRecommendations,
  getBranchLeadSources,
  getBranchStats
} from '../services/branchData';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatCurrency, FunnelFilter } from '../types/scoring';
import {
  ManagerCard,
  SalesFunnel,
  LeadSourceCard,
  AIRecommendationCard,
  CreativeCard
} from '../components/scoring';
import { DateRangePicker, DateRange } from '../components/dashboard';

const StatCard = ({ label, value, subtext, icon: Icon, colorClass, isDark, trend }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2, scale: 1.02 }}
    className={`p-5 rounded-2xl shadow-sm border flex items-start justify-between transition-all duration-300 ${
      isDark
        ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-white/20'
        : 'bg-white border-slate-100 hover:shadow-md'
    }`}
    style={{ backdropFilter: 'blur(20px)' }}
  >
    <div>
      <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{label}</p>
      <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
      <div className="flex items-center gap-2 mt-2">
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            trend > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{subtext}</p>
      </div>
    </div>
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </motion.div>
);

const SectionHeader = ({ title, link, linkText, isDark }: any) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {link && (
      <Link to={link} className="text-sm text-primary font-semibold hover:underline">
        {linkText}
      </Link>
    )}
  </div>
);

// Channel options for the filter
const CHANNEL_OPTIONS: { value: FunnelChannel; label: string; icon: string; color: string }[] = [
  { value: 'all', label: 'Все каналы', icon: '📊', color: '#6366F1' },
  { value: 'instagram', label: 'Instagram', icon: '📸', color: '#E1306C' },
  { value: 'facebook', label: 'Facebook', icon: '👤', color: '#1877F2' },
  { value: 'google', label: 'Google Ads', icon: '🔍', color: '#4285F4' },
  { value: 'organic', label: 'Органика', icon: '🌱', color: '#22C55E' },
  { value: 'promo', label: 'Промо-акции', icon: '🎉', color: '#F59E0B' },
];

export const Dashboard: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [funnelFilter, setFunnelFilter] = useState<FunnelFilter>({});
  const [showFilterDropdown, setShowFilterDropdown] = useState<'manager' | 'team' | 'channel' | 'city' | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<FunnelChannel>('all');
  const [selectedCity, setSelectedCity] = useState<CityCode>('all');

  // Date Range state (default: last 7 days)
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 6);
    return { startDate: start, endDate: end };
  });

  // Get data based on selected city
  const cityFunnel = useMemo(() => getBranchFunnel(selectedCity), [selectedCity]);
  const cityManagers = useMemo(() => getBranchManagers(selectedCity), [selectedCity]);
  const cityRecommendations = useMemo(() => getBranchRecommendations(selectedCity), [selectedCity]);
  const cityLeadSources = useMemo(() => getBranchLeadSources(selectedCity), [selectedCity]);
  const cityStats = useMemo(() => getBranchStats(selectedCity), [selectedCity]);
  const selectedBranch = BRANCHES.find(b => b.code === selectedCity);

  // Calculate totals based on filter (uses city data)
  const filteredManagers = useMemo(() => {
    const baseManagers = cityManagers.length > 0 ? cityManagers : MOCK_MANAGERS;
    if (funnelFilter.managerId) {
      return baseManagers.filter(m => m.id === funnelFilter.managerId);
    }
    if (funnelFilter.trafficTeamId) {
      const team = MOCK_TRAFFIC_TEAMS.find(t => t.id === funnelFilter.trafficTeamId);
      if (team) {
        return baseManagers.slice(0, team.members.length);
      }
    }
    return baseManagers;
  }, [funnelFilter, cityManagers]);

  // Filtered funnel data (uses city data)
  const filteredFunnel = useMemo(() => {
    // Use city funnel as base
    let baseFunnel = cityFunnel;

    // If channel filter is set, use channel data instead
    if (selectedChannel !== 'all') {
      const channelData = FUNNEL_BY_CHANNEL.find(c => c.channel === selectedChannel);
      if (channelData) {
        baseFunnel = channelData.funnel;
      }
    }

    // Then apply manager/team filter
    if (!funnelFilter.managerId && !funnelFilter.trafficTeamId) {
      return baseFunnel;
    }
    const baseManagerCount = cityManagers.length > 0 ? cityManagers.length : MOCK_MANAGERS.length;
    const ratio = filteredManagers.length / baseManagerCount;
    return baseFunnel.map(stage => ({
      ...stage,
      count: Math.round(stage.count * ratio),
      value: Math.round(stage.value * ratio),
      spend: Math.round((stage.spend || 0) * ratio)
    }));
  }, [funnelFilter, filteredManagers, selectedChannel, cityFunnel, cityManagers]);

  // Calculate channel/city spend/revenue
  const channelStats = useMemo(() => {
    // If city is selected, use city stats
    if (selectedCity !== 'all' && selectedChannel === 'all') {
      const funnelSpend = cityFunnel.reduce((sum, s) => sum + (s.spend || 0), 0);
      const funnelRevenue = cityFunnel.find(s => s.stage === 'closed')?.value || 0;
      const roi = funnelSpend > 0 ? ((funnelRevenue - funnelSpend) / funnelSpend * 100).toFixed(0) : '0';
      return { spend: funnelSpend, revenue: funnelRevenue, roi };
    }

    if (selectedChannel === 'all') {
      const totalSpend = FUNNEL_BY_CHANNEL.reduce((sum, c) => sum + c.totalSpend, 0);
      const totalRevenue = FUNNEL_BY_CHANNEL.reduce((sum, c) => sum + c.totalRevenue, 0);
      return { spend: totalSpend, revenue: totalRevenue, roi: totalSpend > 0 ? ((totalRevenue - totalSpend) / totalSpend * 100).toFixed(0) : '0' };
    }
    const channelData = FUNNEL_BY_CHANNEL.find(c => c.channel === selectedChannel);
    if (channelData) {
      const roi = channelData.totalSpend > 0 ? ((channelData.totalRevenue - channelData.totalSpend) / channelData.totalSpend * 100).toFixed(0) : '0';
      return { spend: channelData.totalSpend, revenue: channelData.totalRevenue, roi };
    }
    return { spend: 0, revenue: 0, roi: '0' };
  }, [selectedChannel, selectedCity, cityFunnel]);

  // Use city stats when city is selected, otherwise calculate from managers
  const totalRevenue = selectedCity !== 'all' ? cityStats.revenue : filteredManagers.reduce((sum, m) => sum + m.metrics.totalRevenue, 0);
  const totalLeads = selectedCity !== 'all' ? cityStats.leads : filteredManagers.reduce((sum, m) => sum + m.metrics.totalLeads, 0);
  const totalDeals = selectedCity !== 'all' ? cityStats.deals : filteredManagers.reduce((sum, m) => sum + m.metrics.totalDeals, 0);
  const avgConversion = totalLeads > 0 ? (totalDeals / totalLeads * 100).toFixed(1) : '0';

  const clearFilters = () => {
    setFunnelFilter({});
    setSelectedChannel('all');
    setSelectedCity('all');
    setShowFilterDropdown(null);
  };

  const hasActiveFilter = funnelFilter.managerId || funnelFilter.trafficTeamId || selectedChannel !== 'all' || selectedCity !== 'all';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* Header with city selector, date picker and action button */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {/* City Selector */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(showFilterDropdown === 'city' ? null : 'city')}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all
                ${selectedCity !== 'all'
                  ? 'bg-primary text-black'
                  : isDark
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm'
                }
              `}
            >
              <MapPin className="w-4 h-4" />
              <span>{selectedCity === 'all' ? 'Выбрать город' : selectedBranch?.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {showFilterDropdown === 'city' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`
                    absolute left-0 top-full mt-2 w-64 rounded-2xl shadow-xl border z-50 overflow-hidden
                    ${isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-slate-200'}
                  `}
                >
                  {/* All Cities Option */}
                  <button
                    onClick={() => {
                      setSelectedCity('all');
                      setShowFilterDropdown(null);
                    }}
                    className={`
                      w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-3
                      ${selectedCity === 'all'
                        ? 'bg-primary/10 text-primary font-medium'
                        : isDark
                          ? 'hover:bg-white/5 text-gray-300'
                          : 'hover:bg-slate-50 text-slate-600'
                      }
                    `}
                  >
                    <span className="text-lg">🌍</span>
                    <div>
                      <p className="font-medium">Все филиалы</p>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                        {BRANCHES.length} городов • {BRANCHES.reduce((s, b) => s + b.managersCount, 0)} менеджеров
                      </p>
                    </div>
                  </button>

                  <div className={`border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`} />

                  {/* Cities List */}
                  <div className="max-h-80 overflow-y-auto">
                    {BRANCHES.map((branch) => (
                      <button
                        key={branch.code}
                        onClick={() => {
                          setSelectedCity(branch.code);
                          setShowFilterDropdown(null);
                        }}
                        className={`
                          w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-3
                          ${branch.code === selectedCity
                            ? 'bg-primary/10 text-primary font-medium'
                            : isDark
                              ? 'hover:bg-white/5 text-gray-300'
                              : 'hover:bg-slate-50 text-slate-600'
                          }
                        `}
                      >
                        <MapPin className={`w-4 h-4 flex-shrink-0 ${branch.code === selectedCity ? 'text-primary' : isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{branch.name}</p>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                            {branch.managersCount} менедж. • {formatCurrency(branch.monthlyRevenue)}
                          </p>
                        </div>
                        {branch.avgConversion >= 18 && (
                          <span className="px-1.5 py-0.5 text-xs rounded bg-green-500/10 text-green-500">
                            {branch.avgConversion}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {selectedCity !== 'all' ? selectedBranch?.region : t('dashboard.subtitle')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-black font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
            <Play className="w-4 h-4" />
            {t('dashboard.restartAnalysis')}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={t('dashboard.revenueLabel')}
          value={formatCurrency(totalRevenue)}
          subtext={t('time.thisMonth')}
          icon={DollarSign}
          colorClass="bg-gradient-to-br from-green-500 to-emerald-600"
          isDark={isDark}
          trend={12.5}
        />
        <StatCard
          label={t('dashboard.leadsLabel')}
          value={totalLeads}
          subtext={t('common.last7days')}
          icon={Users}
          colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
          isDark={isDark}
          trend={8.3}
        />
        <StatCard
          label={t('dashboard.dealsLabel')}
          value={totalDeals}
          subtext={`${formatCurrency(totalRevenue / totalDeals)} ${t('manager.avgCheck')}`}
          icon={CheckCircle}
          colorClass="bg-gradient-to-br from-purple-500 to-pink-600"
          isDark={isDark}
          trend={5.2}
        />
        <StatCard
          label={t('dashboard.conversion')}
          value={`${avgConversion}%`}
          subtext={`${t('common.goal')}: 50%`}
          icon={Target}
          colorClass="bg-gradient-to-br from-yellow-500 to-orange-600"
          isDark={isDark}
          trend={3.1}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Sales Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`lg:col-span-2 p-6 rounded-2xl border ${
            isDark
              ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/10'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t('dashboard.salesFunnel')}
              </h2>
              {/* Channel spend/revenue stats */}
              <div className="flex items-center gap-3 mt-1">
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {t('dashboard.spendLabel')}: <span className="text-red-400 font-medium">{formatCurrency(channelStats.spend)}</span>
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {t('dashboard.revenueLabel')}: <span className="text-green-400 font-medium">{formatCurrency(channelStats.revenue)}</span>
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {t('dashboard.roiLabel')}: <span className={`font-medium ${Number(channelStats.roi) > 0 ? 'text-green-400' : 'text-red-400'}`}>{channelStats.roi}%</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Channel Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(showFilterDropdown === 'channel' ? null : 'channel')}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
                    ${selectedChannel !== 'all'
                      ? 'bg-primary/20 text-primary'
                      : isDark
                        ? 'bg-white/5 text-gray-400 hover:text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }
                  `}
                >
                  <Radio className="w-4 h-4" />
                  <span>{selectedChannel !== 'all' ? CHANNEL_OPTIONS.find(c => c.value === selectedChannel)?.label : t('dashboard.byChannel')}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {showFilterDropdown === 'channel' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`
                        absolute right-0 top-full mt-1 w-48 rounded-xl shadow-lg border z-10
                        ${isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-slate-200'}
                      `}
                    >
                      {CHANNEL_OPTIONS.map(channel => (
                        <button
                          key={channel.value}
                          onClick={() => {
                            setSelectedChannel(channel.value);
                            setShowFilterDropdown(null);
                          }}
                          className={`
                            w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2
                            ${channel.value === selectedChannel
                              ? 'bg-primary/10 text-primary'
                              : isDark
                                ? 'hover:bg-white/5 text-gray-300'
                                : 'hover:bg-slate-50 text-slate-600'
                            }
                          `}
                        >
                          <span>{channel.icon}</span>
                          <span>{channel.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Manager Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(showFilterDropdown === 'manager' ? null : 'manager')}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
                    ${funnelFilter.managerId
                      ? 'bg-primary/20 text-primary'
                      : isDark
                        ? 'bg-white/5 text-gray-400 hover:text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }
                  `}
                >
                  <Users className="w-4 h-4" />
                  <span>{funnelFilter.managerId ? MOCK_MANAGERS.find(m => m.id === funnelFilter.managerId)?.name.split(' ')[0] : t('funnel.filterByManager')}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {showFilterDropdown === 'manager' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`
                        absolute right-0 top-full mt-1 w-48 rounded-xl shadow-lg border z-10
                        ${isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-slate-200'}
                      `}
                    >
                      <button
                        onClick={() => {
                          setFunnelFilter(f => ({ ...f, managerId: undefined }));
                          setShowFilterDropdown(null);
                        }}
                        className={`
                          w-full px-4 py-2 text-left text-sm transition-colors
                          ${isDark ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-slate-50 text-slate-600'}
                        `}
                      >
                        {t('funnel.allManagers')}
                      </button>
                      {MOCK_MANAGERS.map(manager => (
                        <button
                          key={manager.id}
                          onClick={() => {
                            setFunnelFilter(f => ({ ...f, managerId: manager.id, trafficTeamId: undefined }));
                            setShowFilterDropdown(null);
                          }}
                          className={`
                            w-full px-4 py-2 text-left text-sm transition-colors
                            ${manager.id === funnelFilter.managerId
                              ? 'bg-primary/10 text-primary'
                              : isDark
                                ? 'hover:bg-white/5 text-gray-300'
                                : 'hover:bg-slate-50 text-slate-600'
                            }
                          `}
                        >
                          {manager.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Team Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(showFilterDropdown === 'team' ? null : 'team')}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors
                    ${funnelFilter.trafficTeamId
                      ? 'bg-primary/20 text-primary'
                      : isDark
                        ? 'bg-white/5 text-gray-400 hover:text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }
                  `}
                >
                  <Target className="w-4 h-4" />
                  <span>{funnelFilter.trafficTeamId ? MOCK_TRAFFIC_TEAMS.find(t => t.id === funnelFilter.trafficTeamId)?.name.split(' ')[0] : t('funnel.filterByTeam')}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {showFilterDropdown === 'team' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`
                        absolute right-0 top-full mt-1 w-48 rounded-xl shadow-lg border z-10
                        ${isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-slate-200'}
                      `}
                    >
                      <button
                        onClick={() => {
                          setFunnelFilter(f => ({ ...f, trafficTeamId: undefined }));
                          setShowFilterDropdown(null);
                        }}
                        className={`
                          w-full px-4 py-2 text-left text-sm transition-colors
                          ${isDark ? 'hover:bg-white/5 text-gray-300' : 'hover:bg-slate-50 text-slate-600'}
                        `}
                      >
                        {t('funnel.allTeams')}
                      </button>
                      {MOCK_TRAFFIC_TEAMS.map(team => (
                        <button
                          key={team.id}
                          onClick={() => {
                            setFunnelFilter(f => ({ ...f, trafficTeamId: team.id, managerId: undefined }));
                            setShowFilterDropdown(null);
                          }}
                          className={`
                            w-full px-4 py-2 text-left text-sm transition-colors
                            ${team.id === funnelFilter.trafficTeamId
                              ? 'bg-primary/10 text-primary'
                              : isDark
                                ? 'hover:bg-white/5 text-gray-300'
                                : 'hover:bg-slate-50 text-slate-600'
                            }
                          `}
                        >
                          {team.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clear Filters */}
              {hasActiveFilter && (
                <button
                  onClick={clearFilters}
                  className={`
                    flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm transition-colors
                    ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}
                  `}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Indicator */}
          {hasActiveFilter && (
            <div className={`
              flex items-center gap-2 px-3 py-2 mb-4 rounded-lg text-sm
              ${isDark ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary'}
            `}>
              <Filter className="w-4 h-4" />
              <span>
                Фильтр: {funnelFilter.managerId
                  ? MOCK_MANAGERS.find(m => m.id === funnelFilter.managerId)?.name
                  : MOCK_TRAFFIC_TEAMS.find(t => t.id === funnelFilter.trafficTeamId)?.name
                }
              </span>
            </div>
          )}

          <SalesFunnel stages={filteredFunnel} />
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl border ${
            isDark
              ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-white/10'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <SectionHeader
            title={t('dashboard.aiRecommendations')}
            isDark={isDark}
          />
          <div className="space-y-3">
            {cityRecommendations.slice(0, 4).map((rec) => (
              <AIRecommendationCard
                key={rec.id}
                recommendation={rec}
                isCompact
                onAction={(actionId) => console.log('Action:', actionId)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Top Managers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-2xl border ${
            isDark
              ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/10'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <SectionHeader
            title={t('dashboard.topManagers')}
            link="/managers"
            linkText={t('common.all')}
            isDark={isDark}
          />
          <div className="space-y-3">
            {filteredManagers.slice(0, 4).map((manager) => (
              <ManagerCard key={manager.id} manager={manager} isCompact />
            ))}
          </div>
        </motion.div>

        {/* Lead Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`lg:col-span-2 p-6 rounded-2xl border ${
            isDark
              ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/10'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <SectionHeader
            title={t('dashboard.trafficSources')}
            link="/marketing"
            linkText={t('common.viewDetails')}
            isDark={isDark}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cityLeadSources.map((source) => (
              <LeadSourceCard key={source.id} source={source} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Creatives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-6 rounded-2xl border ${
          isDark
            ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/10'
            : 'bg-white border-slate-200 shadow-lg'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <SectionHeader
          title={t('dashboard.topCreatives')}
          link="/creatives"
          linkText={t('common.all')}
          isDark={isDark}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOCK_CREATIVES.map((creative) => (
            <CreativeCard key={creative.id} creative={creative} />
          ))}
        </div>
      </motion.div>

      {/* Recent Analysis List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`rounded-2xl border overflow-hidden ${
          isDark
            ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/10'
            : 'bg-white border-slate-200 shadow-lg'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className={`px-6 py-4 border-b flex justify-between items-center ${
          isDark ? 'border-white/10' : 'border-slate-100'
        }`}>
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('dashboard.recentAnalysis')}
          </h2>
          <Link to="/analytics" className="text-sm text-primary font-semibold hover:underline">
            {t('dashboard.viewAll')}
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className={`w-full text-left text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
            <thead className={`text-xs uppercase font-semibold ${
              isDark ? 'bg-white/5 text-gray-400' : 'bg-slate-50 text-slate-500'
            }`}>
              <tr>
                <th className="px-6 py-3">{t('analytics.score')}</th>
                <th className="px-6 py-3">{t('analytics.client')} / {t('analytics.agent')}</th>
                <th className="px-6 py-3">{t('analytics.amount')}</th>
                <th className="px-6 py-3">{t('analytics.status')}</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-slate-100'}`}>
              {MOCK_CHATS.map((chat) => (
                <tr key={chat.id} className={`transition-colors ${
                  isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                }`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-lg ${
                        chat.overallScore >= 7 ? 'text-green-500' :
                        chat.overallScore >= 5 ? 'text-yellow-500' : 'text-red-500'
                      }`}>
                        {chat.overallScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{chat.clientName}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                      {t('analytics.agent')}: {chat.agentName} • {chat.date}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {chat.amount.toLocaleString()} ₸
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      chat.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {chat.status === 'completed' ? t('status.completed') : t('status.rejected')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/analytics/${chat.id}`} className={`hover:text-primary ${
                      isDark ? 'text-gray-500' : 'text-slate-400'
                    }`}>
                      →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
