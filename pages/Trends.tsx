import React, { useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  DollarSign,
  ArrowRight,
  Check,
  X,
  AlertCircle,
  Target,
  Plus,
  Send,
  Calendar,
  FileText,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { TimePeriod, TrendCategory, getPeriodLabel, getCategoryLabel } from '../types/scoring';
import { getTrendAnalysis } from '../services/trafficTeamData';

// Иконки для категорий
const categoryIcons: Record<TrendCategory, React.ComponentType<{ className?: string }>> = {
  calls: Phone,
  whatsapp: MessageCircle,
  decisions: CheckCircle
};

const categoryColors: Record<TrendCategory, string> = {
  calls: '#3B82F6',
  whatsapp: '#25D366',
  decisions: '#F59E0B'
};

// Мок-данные для истории действий с результатами (50/50 positive/negative)
const ACTION_HISTORY = [
  {
    id: 'ah-1',
    date: '22 января',
    action: 'Увеличили бюджет Instagram на 50%',
    metricBefore: 45,
    metricAfter: 67,
    metricLabel: 'лидов/день',
    revenueBefore: 450000,
    revenueAfter: 720000,
    impact: 'positive' as const,
    aiConclusion: 'Рост лидов на 49%. Качество сохранилось. Рекомендуется продолжить.'
  },
  {
    id: 'ah-2',
    date: '18 января',
    action: 'Сменили оффер на "Бесплатная консультация"',
    metricBefore: 3.2,
    metricAfter: 1.8,
    metricLabel: '% конверсии',
    revenueBefore: 520000,
    revenueAfter: 280000,
    impact: 'negative' as const,
    aiConclusion: 'Конверсия упала на 44%. Привлекли нецелевую аудиторию. Откатили.'
  },
  {
    id: 'ah-3',
    date: '15 января',
    action: 'Обучили менеджеров работе с возражениями',
    metricBefore: 18,
    metricAfter: 28,
    metricLabel: '% закрытия',
    revenueBefore: 380000,
    revenueAfter: 590000,
    impact: 'positive' as const,
    aiConclusion: 'Закрытие выросло на 56%. Инвестиция в обучение окупилась за 3 дня.'
  },
  {
    id: 'ah-4',
    date: '10 января',
    action: 'Запустили TikTok рекламу',
    metricBefore: 120,
    metricAfter: 185,
    metricLabel: 'заявок/нед',
    revenueBefore: 0,
    revenueAfter: 45000,
    impact: 'negative' as const,
    aiConclusion: 'Много заявок, но конверсия 0.5%. Трафик нецелевой. Остановлено.'
  },
  {
    id: 'ah-5',
    date: '5 января',
    action: 'Добавили автоответчик WhatsApp в нерабочее время',
    metricBefore: 12,
    metricAfter: 34,
    metricLabel: 'мин. время ответа',
    revenueBefore: 420000,
    revenueAfter: 580000,
    impact: 'positive' as const,
    aiConclusion: 'Скорость ответа улучшилась втрое. Конверсия выросла на 15%.'
  },
  {
    id: 'ah-6',
    date: '2 января',
    action: 'Снизили цену на услуги на 20%',
    metricBefore: 25,
    metricAfter: 42,
    metricLabel: 'заказов/нед',
    revenueBefore: 625000,
    revenueAfter: 588000,
    impact: 'negative' as const,
    aiConclusion: 'Заказов больше, но выручка упала. Маржа снизилась критично.'
  }
];

// Прогноз выручки
const REVENUE_FORECAST = {
  current: 2450000,
  projected: 3120000,
  potentialActions: [
    { action: 'Масштабировать Instagram Ads', impact: '+340 000 ₸', probability: 85 },
    { action: 'Нанять 2-го таргетолога', impact: '+450 000 ₸', probability: 70 },
    { action: 'Запустить ретаргетинг', impact: '+180 000 ₸', probability: 92 }
  ]
};

// Интерфейс для нового действия
interface NewAction {
  action: string;
  category: 'marketing' | 'sales' | 'process' | 'other';
  metricBefore?: string;
  metricAfter?: string;
  metricLabel?: string;
  notes?: string;
}

// Категории действий для формы
const ACTION_CATEGORIES = [
  { value: 'marketing', label: 'Маркетинг', icon: Target },
  { value: 'sales', label: 'Продажи', icon: DollarSign },
  { value: 'process', label: 'Процессы', icon: CheckCircle },
  { value: 'other', label: 'Другое', icon: FileText }
];

export const Trends: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [period, setPeriod] = useState<TimePeriod>('month');
  const [category, setCategory] = useState<TrendCategory>('calls');

  // Состояние для формы ввода действий
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAction, setNewAction] = useState<NewAction>({
    action: '',
    category: 'marketing',
    metricBefore: '',
    metricAfter: '',
    metricLabel: '',
    notes: ''
  });
  const [submittedActions, setSubmittedActions] = useState<Array<{
    id: string;
    date: string;
    action: string;
    category: string;
    metricBefore?: string;
    metricAfter?: string;
    metricLabel?: string;
    notes?: string;
    status: 'pending' | 'analyzed';
  }>>([]);

  // Обработчик отправки формы
  const handleSubmitAction = () => {
    if (!newAction.action.trim()) return;

    const today = new Date();
    const dateStr = `${today.getDate()} ${['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'][today.getMonth()]}`;

    setSubmittedActions(prev => [{
      id: `new-${Date.now()}`,
      date: dateStr,
      action: newAction.action,
      category: newAction.category,
      metricBefore: newAction.metricBefore,
      metricAfter: newAction.metricAfter,
      metricLabel: newAction.metricLabel,
      notes: newAction.notes,
      status: 'pending'
    }, ...prev]);

    // Сброс формы
    setNewAction({
      action: '',
      category: 'marketing',
      metricBefore: '',
      metricAfter: '',
      metricLabel: '',
      notes: ''
    });
    setIsFormOpen(false);
  };

  // Получаем данные трендов
  const trendAnalysis = useMemo(() => getTrendAnalysis(period, category), [period, category]);

  // Подготавливаем данные для графика
  const chartData = useMemo(() => {
    return trendAnalysis.data.map(point => ({
      ...point,
      hasAction: point.actions && point.actions.length > 0,
      actionInfo: point.actions?.[0]
    }));
  }, [trendAnalysis]);

  // Статистика
  const stats = useMemo(() => {
    const values = trendAnalysis.data.map(d => d.value);
    const first = values[0];
    const last = values[values.length - 1];
    const change = first > 0 ? ((last - first) / first) * 100 : 0;
    return { change, total: values.reduce((a, b) => a + b, 0) };
  }, [trendAnalysis]);

  const gridColor = isDark ? '#2A2A2A' : '#f1f5f9';
  const tickColor = isDark ? '#6B7280' : '#94a3b8';
  const CategoryIcon = categoryIcons[category];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;
    return (
      <div className={`p-3 rounded-xl shadow-lg border ${isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-slate-200'}`}>
        <p className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{label}</p>
        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {data.value} {category === 'calls' ? 'звонков' : category === 'whatsapp' ? 'диалогов' : 'решений'}
        </p>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('trends.title')}
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            {t('trends.historyAndImpact')}
          </p>
        </div>

        {/* Period Selector */}
        <div className={`inline-flex rounded-xl p-1 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
          {(['week', 'month', '3months'] as TimePeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                period === p
                  ? 'bg-primary text-black shadow-sm'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t(`trends.period.${p}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Forecast Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border ${
          isDark
            ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20'
            : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-green-500" />
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('trends.forecast')} {t('trends.nextMonth')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current vs Projected */}
          <div className="flex items-center gap-4">
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t('trends.current')}</p>
              <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {REVENUE_FORECAST.current.toLocaleString()} ₸
              </p>
            </div>
            <ArrowRight className={`w-6 h-6 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
            <div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Прогноз</p>
              <p className="text-xl font-bold text-green-500">
                {REVENUE_FORECAST.projected.toLocaleString()} ₸
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-medium">
              +{Math.round((REVENUE_FORECAST.projected / REVENUE_FORECAST.current - 1) * 100)}%
            </div>
          </div>

          {/* Potential Actions */}
          <div className="md:col-span-2">
            <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Потенциальные действия для роста:
            </p>
            <div className="flex flex-wrap gap-2">
              {REVENUE_FORECAST.potentialActions.map((action, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                    isDark ? 'bg-white/5' : 'bg-white'
                  }`}
                >
                  <Target className="w-4 h-4 text-green-500" />
                  <span className={`text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {action.action}
                  </span>
                  <span className="text-sm font-bold text-green-500">{action.impact}</span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    ({action.probability}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Tabs + Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-lg'}`}
      >
        {/* Category Tabs */}
        <div className="flex gap-2 mb-6">
          {(['calls', 'whatsapp', 'decisions'] as TrendCategory[]).map((cat) => {
            const Icon = categoryIcons[cat];
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? isDark
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'bg-slate-100 text-slate-900 border border-slate-200'
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" style={{ color: isActive ? categoryColors[cat] : undefined }} />
                {getCategoryLabel(cat)}
              </button>
            );
          })}

          {/* Change indicator */}
          <div className="ml-auto flex items-center gap-2">
            {stats.change >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <span className={`font-bold ${stats.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.change >= 0 ? '+' : ''}{stats.change.toFixed(1)}%
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              за {getPeriodLabel(period).toLowerCase()}
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${category}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={categoryColors[category]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={categoryColors[category]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: tickColor, fontSize: 12 }}
                dy={10}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}.${date.getMonth() + 1}`;
                }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: tickColor, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={categoryColors[category]}
                strokeWidth={3}
                fill={`url(#gradient-${category})`}
              />
              {chartData.filter(d => d.hasAction).map((point, idx) => (
                <ReferenceDot
                  key={idx}
                  x={point.date}
                  y={point.value}
                  r={6}
                  fill="#8B5CF6"
                  stroke={isDark ? '#1A1A1A' : '#fff'}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ROP Action Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className={`p-6 rounded-2xl border ${
          isDark
            ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20'
            : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('trends.dailyReport')}
            </h3>
          </div>
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              isFormOpen
                ? 'bg-blue-500 text-white'
                : isDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-white text-slate-900 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Plus className="w-4 h-4" />
            {t('trends.recordAction')}
            <motion.div animate={{ rotate: isFormOpen ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>

        <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          {t('trends.recordDescription')}
        </p>

        {/* Expandable Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
                {/* Action Description */}
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    {t('trends.whatDidYouDo')} *
                  </label>
                  <textarea
                    value={newAction.action}
                    onChange={(e) => setNewAction(prev => ({ ...prev, action: e.target.value }))}
                    placeholder="Например: Увеличили бюджет Instagram на 30%, запустили новый креатив с видео-отзывами..."
                    className={`w-full p-3 rounded-lg border resize-none ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                    rows={3}
                  />
                </div>

                {/* Category Selection */}
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    {t('trends.category')}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {ACTION_CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = newAction.category === cat.value;
                      return (
                        <button
                          key={cat.value}
                          onClick={() => setNewAction(prev => ({ ...prev, category: cat.value as any }))}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-blue-500 text-white'
                              : isDark
                                ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      {t('trends.metricBefore')}
                    </label>
                    <input
                      type="text"
                      value={newAction.metricBefore}
                      onChange={(e) => setNewAction(prev => ({ ...prev, metricBefore: e.target.value }))}
                      placeholder="45"
                      className={`w-full p-3 rounded-lg border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      {t('trends.metricAfter')}
                    </label>
                    <input
                      type="text"
                      value={newAction.metricAfter}
                      onChange={(e) => setNewAction(prev => ({ ...prev, metricAfter: e.target.value }))}
                      placeholder="67 (можно заполнить позже)"
                      className={`w-full p-3 rounded-lg border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      {t('trends.unit')}
                    </label>
                    <input
                      type="text"
                      value={newAction.metricLabel}
                      onChange={(e) => setNewAction(prev => ({ ...prev, metricLabel: e.target.value }))}
                      placeholder="лидов/день, % конверсии..."
                      className={`w-full p-3 rounded-lg border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    {t('trends.notes')}
                  </label>
                  <input
                    type="text"
                    value={newAction.notes}
                    onChange={(e) => setNewAction(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Причина изменений, ожидаемый результат, контекст..."
                    className={`w-full p-3 rounded-lg border ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitAction}
                  disabled={!newAction.action.trim()}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    newAction.action.trim()
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : isDark
                        ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {t('trends.recordAction')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submitted Actions (pending analysis) */}
        {submittedActions.length > 0 && (
          <div className="mt-4">
            <p className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              {t('trends.submittedActions')}:
            </p>
            <div className="space-y-2">
              {submittedActions.map((action) => (
                <div
                  key={action.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isDark ? 'bg-white/5' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      action.status === 'pending' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
                    }`} />
                    <div>
                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {action.action}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {action.date} • {ACTION_CATEGORIES.find(c => c.value === action.category)?.label}
                        {action.metricBefore && action.metricLabel && (
                          <> • До: {action.metricBefore} {action.metricLabel}</>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    action.status === 'pending'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : 'bg-green-500/20 text-green-500'
                  }`}>
                    {action.status === 'pending' ? t('trends.pendingAnalysis') : t('trends.analyzed')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Action History - Clear Before/After */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-lg'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('trends.actionHistory')}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>{t('trends.success')}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>{t('trends.failure')}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {ACTION_HISTORY.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-xl border ${
                item.impact === 'positive'
                  ? isDark
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-green-50 border-green-200'
                  : isDark
                    ? 'bg-red-500/5 border-red-500/20'
                    : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`p-2 rounded-full ${
                  item.impact === 'positive' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {item.impact === 'positive' ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.action}
                    </p>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {item.date}
                    </span>
                  </div>

                  {/* Before/After Metrics */}
                  <div className="flex items-center gap-6 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {t('trends.before')}:
                      </span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.metricBefore} {item.metricLabel}
                      </span>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {t('trends.after')}:
                      </span>
                      <span className={`font-semibold ${
                        item.impact === 'positive' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {item.metricAfter} {item.metricLabel}
                      </span>
                    </div>

                    {/* Revenue Change */}
                    <div className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${
                      item.revenueAfter > item.revenueBefore
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {item.revenueAfter > item.revenueBefore ? '+' : ''}
                      {((item.revenueAfter - item.revenueBefore) / 1000).toFixed(0)}K ₸
                    </div>
                  </div>

                  {/* AI Conclusion */}
                  <div className={`flex items-start gap-2 p-2 rounded-lg ${
                    isDark ? 'bg-white/5' : 'bg-white/80'
                  }`}>
                    <AlertCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      item.impact === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      {item.aiConclusion}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-2xl border ${
          isDark
            ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20'
            : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('trends.aiConclusions')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
            <p className={`text-sm font-medium mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {t('trends.whatWorks')}:
            </p>
            <ul className="space-y-2">
              <li className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Instagram Ads показывает лучший ROI (387%)
              </li>
              <li className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                Обучение менеджеров даёт быструю отдачу
              </li>
              <li className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                WhatsApp автоответчик увеличил конверсию
              </li>
            </ul>
          </div>

          <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-white'}`}>
            <p className={`text-sm font-medium mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              {t('trends.whatToAvoid')}:
            </p>
            <ul className="space-y-2">
              <li className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                "Бесплатные" офферы привлекают нецелевых
              </li>
              <li className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                TikTok трафик не конвертируется для B2B
              </li>
              <li className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                Снижение цен не компенсирует объёмом
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
