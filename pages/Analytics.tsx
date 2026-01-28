import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, MessageCircle, X, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_CHATS } from '../services/mockData';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { DateRangePicker, DateRange } from '../components/dashboard/DateRangePicker';

interface FilterState {
  agents: string[];
  sources: string[];
  statuses: string[];
  scoreRange: { min: number; max: number };
}

export const Analytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDark } = useTheme();
  const { t } = useLanguage();

  // Filter states
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { startDate: start, endDate: end };
  });
  const [filters, setFilters] = useState<FilterState>({
    agents: [],
    sources: [],
    statuses: [],
    scoreRange: { min: 1, max: 10 }
  });

  const filterRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Get unique values for filters
  const uniqueAgents = useMemo(() =>
    [...new Set(MOCK_CHATS.map(chat => chat.agentName))], []);
  const uniqueSources = useMemo(() =>
    [...new Set(MOCK_CHATS.map(chat => chat.source))], []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Parse chat date for filtering
  const parseDate = (dateStr: string): Date => {
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(dateStr);
  };

  // Filter chats
  const filteredChats = useMemo(() => {
    return MOCK_CHATS.filter(chat => {
      // Search filter
      const matchesSearch =
        chat.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.clientPhone.includes(searchTerm);

      // Agent filter
      const matchesAgent = filters.agents.length === 0 ||
        filters.agents.includes(chat.agentName);

      // Source filter
      const matchesSource = filters.sources.length === 0 ||
        filters.sources.includes(chat.source);

      // Status filter
      const matchesStatus = filters.statuses.length === 0 ||
        filters.statuses.includes(chat.status);

      // Score filter
      const matchesScore = chat.overallScore >= filters.scoreRange.min &&
        chat.overallScore <= filters.scoreRange.max;

      // Date filter
      const chatDate = parseDate(chat.date);
      const matchesDate = chatDate >= dateRange.startDate &&
        chatDate <= dateRange.endDate;

      return matchesSearch && matchesAgent && matchesSource &&
        matchesStatus && matchesScore && matchesDate;
    });
  }, [searchTerm, filters, dateRange]);

  // Count active filters
  const activeFilterCount =
    filters.agents.length +
    filters.sources.length +
    filters.statuses.length +
    (filters.scoreRange.min > 1 || filters.scoreRange.max < 10 ? 1 : 0);

  // Toggle filter option
  const toggleFilter = (category: 'agents' | 'sources' | 'statuses', value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      agents: [],
      sources: [],
      statuses: [],
      scoreRange: { min: 1, max: 10 }
    });
  };

  // Format date for display
  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const start = dateRange.startDate.toLocaleDateString('ru-RU', options);
    const end = dateRange.endDate.toLocaleDateString('ru-RU', options);
    return `${start} — ${end}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#25D366]/20">
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('whatsapp.title')}
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {t('whatsapp.subtitle')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-gray-500' : 'text-slate-400'
            }`} />
            <input
              type="text"
              placeholder={t('analytics.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full md:w-64 ${
                isDark
                  ? 'bg-dark-card border-dark-border text-white placeholder:text-gray-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          {/* Filter Button with Dropdown */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                showFilterDropdown || activeFilterCount > 0
                  ? isDark
                    ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                    : 'bg-yellow-50 border-yellow-300 text-yellow-700'
                  : isDark
                    ? 'bg-dark-card border-dark-border text-gray-300 hover:bg-white/10'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              {t('analytics.filter')}
              {activeFilterCount > 0 && (
                <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                  isDark ? 'bg-yellow-400 text-black' : 'bg-yellow-500 text-white'
                }`}>
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showFilterDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 top-full mt-2 w-80 rounded-xl shadow-xl border z-50 ${
                    isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Фильтры
                      </h3>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-yellow-500 hover:text-yellow-400"
                        >
                          Сбросить всё
                        </button>
                      )}
                    </div>

                    {/* Agents */}
                    <div>
                      <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        Менеджер
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {uniqueAgents.map(agent => (
                          <button
                            key={agent}
                            onClick={() => toggleFilter('agents', agent)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                              filters.agents.includes(agent)
                                ? isDark
                                  ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/50'
                                  : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                : isDark
                                  ? 'bg-white/5 text-gray-300 border border-dark-border hover:bg-white/10'
                                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {filters.agents.includes(agent) && <Check className="w-3 h-3" />}
                            {agent}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sources */}
                    <div>
                      <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        Источник
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {uniqueSources.map(source => (
                          <button
                            key={source}
                            onClick={() => toggleFilter('sources', source)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                              filters.sources.includes(source)
                                ? source === 'WhatsApp'
                                  ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/50'
                                  : isDark
                                    ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/50'
                                    : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                                : isDark
                                  ? 'bg-white/5 text-gray-300 border border-dark-border hover:bg-white/10'
                                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {filters.sources.includes(source) && <Check className="w-3 h-3" />}
                            {source === 'WhatsApp' && <MessageCircle className="w-3 h-3" />}
                            {source}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        Статус
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['completed', 'rejected'].map(status => (
                          <button
                            key={status}
                            onClick={() => toggleFilter('statuses', status)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1 ${
                              filters.statuses.includes(status)
                                ? status === 'completed'
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
                                : isDark
                                  ? 'bg-white/5 text-gray-300 border border-dark-border hover:bg-white/10'
                                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {filters.statuses.includes(status) && <Check className="w-3 h-3" />}
                            {status === 'completed' ? 'Завершён' : 'Отклонён'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Score Range */}
                    <div>
                      <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        Оценка: {filters.scoreRange.min} — {filters.scoreRange.max}
                      </p>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={filters.scoreRange.min}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            scoreRange: { ...prev.scoreRange, min: parseInt(e.target.value) }
                          }))}
                          className="flex-1 accent-yellow-400"
                        />
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={filters.scoreRange.max}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            scoreRange: { ...prev.scoreRange, max: parseInt(e.target.value) }
                          }))}
                          className="flex-1 accent-yellow-400"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date Picker Button */}
          <div className="relative" ref={dateRef}>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                showDatePicker
                  ? isDark
                    ? 'bg-yellow-400/20 border-yellow-400/50 text-yellow-400'
                    : 'bg-yellow-50 border-yellow-300 text-yellow-700'
                  : isDark
                    ? 'bg-dark-card border-dark-border text-gray-300 hover:bg-white/10'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Calendar className="w-4 h-4" />
              {formatDateRange()}
            </button>

            {showDatePicker && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <DateRangePicker
                  value={dateRange}
                  onChange={(range) => {
                    setDateRange(range);
                    setShowDatePicker(false);
                  }}
                  onClose={() => setShowDatePicker(false)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            Активные фильтры:
          </span>
          {filters.agents.map(agent => (
            <span
              key={agent}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {agent}
              <button onClick={() => toggleFilter('agents', agent)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.sources.map(source => (
            <span
              key={source}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                source === 'WhatsApp'
                  ? 'bg-[#25D366]/20 text-[#25D366]'
                  : isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {source}
              <button onClick={() => toggleFilter('sources', source)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {filters.statuses.map(status => (
            <span
              key={status}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}
            >
              {status === 'completed' ? 'Завершён' : 'Отклонён'}
              <button onClick={() => toggleFilter('statuses', status)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
        Найдено диалогов: <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{filteredChats.length}</span>
        {filteredChats.length !== MOCK_CHATS.length && (
          <span> из {MOCK_CHATS.length}</span>
        )}
      </div>

      <div className={`rounded-2xl shadow-sm border overflow-hidden ${
        isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-slate-100'
      }`}>
        <table className={`w-full text-left text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
          <thead className={`text-xs uppercase font-semibold border-b ${
            isDark ? 'bg-dark-border/50 text-gray-400 border-dark-border' : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}>
            <tr>
              <th className="px-6 py-4">{t('analytics.score')}</th>
              <th className="px-6 py-4">{t('analytics.client')}</th>
              <th className="px-6 py-4">{t('analytics.agent')}</th>
              <th className="px-6 py-4">{t('analytics.amount')} / {t('analytics.date')}</th>
              <th className="px-6 py-4">{t('analytics.source')}</th>
              <th className="px-6 py-4">{t('analytics.status')}</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-dark-border' : 'divide-slate-100'}`}>
            {filteredChats.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className={`text-lg font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Ничего не найдено
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    Попробуйте изменить параметры фильтрации
                  </p>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-lg text-sm font-medium hover:bg-yellow-300"
                    >
                      Сбросить фильтры
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              filteredChats.map((chat) => (
                <tr key={chat.id} className={`transition-colors cursor-pointer ${
                  isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                }`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        chat.overallScore >= 7 ? 'bg-green-500' :
                        chat.overallScore >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {chat.overallScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{chat.clientName}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{chat.clientPhone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDark ? 'bg-dark-border text-gray-300' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {chat.agentName[0]}
                      </div>
                      <span>{chat.agentName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">{chat.amount.toLocaleString()} ₸</p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{chat.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                      chat.source === 'WhatsApp'
                        ? 'bg-[#25D366]/10 text-[#25D366]'
                        : isDark
                          ? 'bg-dark-border/50 border border-dark-border text-gray-300'
                          : 'bg-slate-100 border border-slate-200 text-slate-600'
                    }`}>
                      {chat.source === 'WhatsApp' && (
                        <MessageCircle className="w-3 h-3" />
                      )}
                      {chat.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      chat.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {chat.status === 'completed' ? t('status.completed') : t('status.rejected')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/analytics/${chat.id}`} className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                      isDark
                        ? 'hover:bg-yellow-400/20 hover:text-yellow-400 text-gray-500'
                        : 'hover:bg-yellow-100 hover:text-yellow-700 text-slate-400'
                    }`}>
                      →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
