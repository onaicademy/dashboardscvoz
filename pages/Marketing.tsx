import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lightbulb,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Phone,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Settings,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  Instagram,
  Globe,
  Facebook,
  MessageCircle,
  Share2,
  Brain,
  Search,
  ExternalLink,
  Library,
  Eye,
  Calendar,
  Filter
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatCurrency, formatPercent } from '../types/scoring';
import { AIStrategyPopup } from '../components/AIStrategyPopup';
import { TrafficTeamCard } from '../components/scoring';
import { MOCK_TRAFFIC_TEAMS } from '../services/trafficTeamData';

// Детальные данные по кампаниям (реалистичные данные)
const CAMPAIGNS_DATA = [
  {
    id: 'camp-1',
    name: 'Свадьбы 2026',
    platform: 'instagram',
    platformIcon: Instagram,
    platformColor: '#E1306C',
    status: 'active',
    budget: 285000,
    spend: 245000,
    impressions: 456000,
    reach: 189000,
    clicks: 6840,
    ctr: 1.5,
    leads: 58,
    cpl: 4224,
    calls: 32,
    qualifiedLeads: 24,
    deals: 14,
    revenue: 2380000,
    roi: 871,
    conversionRate: 24.1,
    avgDealSize: 170000,
    trend: 'up' as const,
    trendValue: 8,
    aiDecision: 'scale' as const,
    aiConfidence: 75,
    aiInsight: 'Хорошие показатели ROI (871%). Есть запас для роста — частота 2.1. Рекомендуется постепенное масштабирование.',
    aiRecommendations: [
      'Увеличить бюджет на 15-20% постепенно',
      'Протестировать Lookalike на покупателях',
      'Добавить Reels-формат для снижения CPL',
    ],
    funnelData: [
      { stage: 'Расход', value: 245000, color: '#6366F1', isSpend: true },
      { stage: 'Лиды', value: 58, color: '#8B5CF6' },
      { stage: 'Тёплые', value: 24, color: '#A855F7' },
      { stage: 'Сделки', value: 14, color: '#10B981' },
      { stage: 'Выручка', value: 2380000, color: '#22C55E', isRevenue: true },
    ],
    weeklyData: [
      { day: 'Пн', spend: 32000, leads: 7, deals: 1 },
      { day: 'Вт', spend: 35000, leads: 9, deals: 2 },
      { day: 'Ср', spend: 38000, leads: 10, deals: 3 },
      { day: 'Чт', spend: 36000, leads: 8, deals: 2 },
      { day: 'Пт', spend: 40000, leads: 11, deals: 3 },
      { day: 'Сб', spend: 34000, leads: 7, deals: 2 },
      { day: 'Вс', spend: 30000, leads: 6, deals: 1 },
    ],
  },
  {
    id: 'camp-2',
    name: 'Корпоративы B2B',
    platform: 'google',
    platformIcon: Globe,
    platformColor: '#4285F4',
    status: 'active',
    budget: 165000,
    spend: 142000,
    impressions: 125000,
    reach: 85000,
    clicks: 2875,
    ctr: 2.3,
    leads: 34,
    cpl: 4176,
    calls: 21,
    qualifiedLeads: 15,
    deals: 8,
    revenue: 1280000,
    roi: 801,
    conversionRate: 23.5,
    avgDealSize: 160000,
    trend: 'stable' as const,
    trendValue: 2,
    aiDecision: 'maintain' as const,
    aiConfidence: 72,
    aiInsight: 'Стабильные показатели. CTR хороший для поиска (2.3%). Лиды качественные — много B2B запросов.',
    aiRecommendations: [
      'Поддерживать текущий бюджет',
      'Проверить минус-слова — возможно есть нецелевые клики',
      'Добавить расширения с акциями',
    ],
    funnelData: [
      { stage: 'Расход', value: 142000, color: '#6366F1', isSpend: true },
      { stage: 'Лиды', value: 34, color: '#8B5CF6' },
      { stage: 'Тёплые', value: 15, color: '#A855F7' },
      { stage: 'Сделки', value: 8, color: '#10B981' },
      { stage: 'Выручка', value: 1280000, color: '#22C55E', isRevenue: true },
    ],
    weeklyData: [
      { day: 'Пн', spend: 18000, leads: 4, deals: 1 },
      { day: 'Вт', spend: 20000, leads: 5, deals: 1 },
      { day: 'Ср', spend: 22000, leads: 6, deals: 2 },
      { day: 'Чт', spend: 21000, leads: 5, deals: 1 },
      { day: 'Пт', spend: 24000, leads: 6, deals: 2 },
      { day: 'Сб', spend: 19000, leads: 4, deals: 1 },
      { day: 'Вс', spend: 18000, leads: 4, deals: 0 },
    ],
  },
  {
    id: 'camp-3',
    name: 'Детские праздники',
    platform: 'facebook',
    platformIcon: Facebook,
    platformColor: '#1877F2',
    status: 'paused',
    budget: 180000,
    spend: 180000,
    impressions: 320000,
    reach: 156000,
    clicks: 2560,
    ctr: 0.8,
    leads: 32,
    cpl: 5625,
    calls: 12,
    qualifiedLeads: 6,
    deals: 3,
    revenue: 195000,
    roi: 8,
    conversionRate: 9.4,
    avgDealSize: 65000,
    trend: 'down' as const,
    trendValue: -52,
    aiDecision: 'pause' as const,
    aiConfidence: 95,
    aiInsight: 'КРИТИЧНО: ROI почти нулевой (8%). Кампания убыточна. Таргетинг на мужчин 35-55 вместо мам 25-40. Срочно остановить.',
    aiRecommendations: [
      'ОСТАНОВЛЕНО — не запускать без корректировки',
      'Полностью пересмотреть аудиторию',
      'Создать новые креативы с фокусом на мам',
      'Тестировать на Stories с минимальным бюджетом',
    ],
    funnelData: [
      { stage: 'Расход', value: 180000, color: '#6366F1', isSpend: true },
      { stage: 'Лиды', value: 32, color: '#8B5CF6' },
      { stage: 'Тёплые', value: 6, color: '#A855F7' },
      { stage: 'Сделки', value: 3, color: '#EF4444' },
      { stage: 'Выручка', value: 195000, color: '#EF4444', isRevenue: true },
    ],
    weeklyData: [
      { day: 'Пн', spend: 28000, leads: 5, deals: 1 },
      { day: 'Вт', spend: 26000, leads: 4, deals: 0 },
      { day: 'Ср', spend: 25000, leads: 5, deals: 0 },
      { day: 'Чт', spend: 24000, leads: 4, deals: 1 },
      { day: 'Пт', spend: 27000, leads: 6, deals: 0 },
      { day: 'Сб', spend: 26000, leads: 4, deals: 1 },
      { day: 'Вс', spend: 24000, leads: 4, deals: 0 },
    ],
  },
  {
    id: 'camp-4',
    name: 'Дни рождения взрослых',
    platform: 'instagram',
    platformIcon: Instagram,
    platformColor: '#E1306C',
    status: 'active',
    budget: 95000,
    spend: 78000,
    impressions: 189000,
    reach: 98000,
    clicks: 2457,
    ctr: 1.3,
    leads: 22,
    cpl: 3545,
    calls: 14,
    qualifiedLeads: 9,
    deals: 5,
    revenue: 425000,
    roi: 445,
    conversionRate: 22.7,
    avgDealSize: 85000,
    trend: 'down' as const,
    trendValue: -12,
    aiDecision: 'optimize' as const,
    aiConfidence: 68,
    aiInsight: 'CTR падает (было 1.8%, стало 1.3%). Креатив устаёт — частота 3.8. ROI пока положительный, но тренд негативный.',
    aiRecommendations: [
      'Срочно обновить креативы',
      'Сузить аудиторию — много нецелевых показов',
      'Добавить отзывы клиентов в рекламу',
    ],
    funnelData: [
      { stage: 'Расход', value: 78000, color: '#6366F1', isSpend: true },
      { stage: 'Лиды', value: 22, color: '#8B5CF6' },
      { stage: 'Тёплые', value: 9, color: '#A855F7' },
      { stage: 'Сделки', value: 5, color: '#F59E0B' },
      { stage: 'Выручка', value: 425000, color: '#22C55E', isRevenue: true },
    ],
    weeklyData: [
      { day: 'Пн', spend: 10000, leads: 3, deals: 0 },
      { day: 'Вт', spend: 11000, leads: 3, deals: 1 },
      { day: 'Ср', spend: 12000, leads: 4, deals: 1 },
      { day: 'Чт', spend: 11000, leads: 3, deals: 1 },
      { day: 'Пт', spend: 13000, leads: 4, deals: 1 },
      { day: 'Сб', spend: 11000, leads: 3, deals: 1 },
      { day: 'Вс', spend: 10000, leads: 2, deals: 0 },
    ],
  },
];

// Органические источники
const ORGANIC_SOURCES = [
  {
    id: 'org-1',
    name: 'WhatsApp (органика)',
    icon: MessageCircle,
    color: '#25D366',
    leads: 28,
    calls: 22,
    deals: 8,
    revenue: 980000,
    conversionRate: 28.6,
  },
  {
    id: 'org-2',
    name: 'Рекомендации',
    icon: Share2,
    color: '#FFD700',
    leads: 12,
    calls: 10,
    deals: 4,
    revenue: 640000,
    conversionRate: 33.3,
  },
];

const getDecisionConfig = (decision: string) => {
  switch (decision) {
    case 'scale':
      return { label: 'Масштабировать', icon: ArrowUpRight, color: 'text-green-500', bgColor: 'bg-green-500/10' };
    case 'maintain':
      return { label: 'Поддерживать', icon: CheckCircle, color: 'text-blue-500', bgColor: 'bg-blue-500/10' };
    case 'optimize':
      return { label: 'Оптимизировать', icon: Settings, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' };
    case 'pause':
      return { label: 'Остановить', icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-500/10' };
    default:
      return { label: 'Анализ', icon: Sparkles, color: 'text-gray-500', bgColor: 'bg-gray-500/10' };
  }
};

// Курс USD/KZT (можно обновлять через API)
const USD_KZT_RATE = 520;

// FB Ad Library mock data - конкуренты
const AD_LIBRARY_DATA = [
  {
    id: 'ad-1',
    advertiser: 'Event Pro KZ',
    category: 'Праздники и мероприятия',
    adCount: 45,
    platforms: ['Facebook', 'Instagram'],
    status: 'active',
    startDate: '2025-12-15',
    impressions: '100K-500K',
    thumbnail: 'https://picsum.photos/seed/ad1/400/300',
    previewText: '✨ Организация свадеб мечты! Более 500 успешных мероприятий...',
    targetingInfo: 'Женщины 25-44, Алматы',
  },
  {
    id: 'ad-2',
    advertiser: 'Праздник.kz',
    category: 'Праздники и мероприятия',
    adCount: 28,
    platforms: ['Instagram'],
    status: 'active',
    startDate: '2026-01-05',
    impressions: '50K-100K',
    thumbnail: 'https://picsum.photos/seed/ad2/400/300',
    previewText: '🎉 Детские праздники от 50 000₸! Аниматоры, декор...',
    targetingInfo: 'Женщины 28-40, Все города',
  },
  {
    id: 'ad-3',
    advertiser: 'Wedding Dreams',
    category: 'Свадьбы',
    adCount: 67,
    platforms: ['Facebook', 'Instagram', 'Messenger'],
    status: 'active',
    startDate: '2025-11-20',
    impressions: '500K-1M',
    thumbnail: 'https://picsum.photos/seed/ad3/400/300',
    previewText: '💍 Свадьба под ключ в Алматы. Скидка 20% на январь!',
    targetingInfo: 'Женщины 22-35, Алматы, Астана',
  },
  {
    id: 'ad-4',
    advertiser: 'Corporate Events Pro',
    category: 'B2B мероприятия',
    adCount: 12,
    platforms: ['Facebook'],
    status: 'active',
    startDate: '2026-01-10',
    impressions: '10K-50K',
    thumbnail: 'https://picsum.photos/seed/ad4/400/300',
    previewText: '🏢 Корпоративы для компаний от 50 человек. Под ключ!',
    targetingInfo: 'Мужчины/Женщины 30-55, Бизнес интересы',
  },
  {
    id: 'ad-5',
    advertiser: 'PartyTime.kz',
    category: 'Развлечения',
    adCount: 89,
    platforms: ['Instagram', 'Facebook'],
    status: 'inactive',
    startDate: '2025-10-01',
    impressions: '1M+',
    thumbnail: 'https://picsum.photos/seed/ad5/400/300',
    previewText: '🔥 Аренда площадок для вечеринок! VIP зоны...',
    targetingInfo: 'Мужчины/Женщины 21-35',
  },
];

export const Marketing: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);
  const [isAIPopupOpen, setIsAIPopupOpen] = useState(false);
  const [currency, setCurrency] = useState<'KZT' | 'USD'>('KZT');
  const [activeTab, setActiveTab] = useState<'campaigns' | 'adlibrary'>('campaigns');
  const [adSearchQuery, setAdSearchQuery] = useState('');

  // Конвертация валюты
  const formatMoney = (amountKZT: number) => {
    if (currency === 'USD') {
      const usd = amountKZT / USD_KZT_RATE;
      return usd >= 1000 ? `$${(usd / 1000).toFixed(1)}K` : `$${usd.toFixed(0)}`;
    }
    return amountKZT >= 1000000
      ? `${(amountKZT / 1000000).toFixed(1)}M ₸`
      : `${(amountKZT / 1000).toFixed(0)}K ₸`;
  };

  // Общая статистика
  const totalSpend = CAMPAIGNS_DATA.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = CAMPAIGNS_DATA.reduce((sum, c) => sum + c.revenue, 0);
  const totalLeads = CAMPAIGNS_DATA.reduce((sum, c) => sum + c.leads, 0);
  const totalQualified = CAMPAIGNS_DATA.reduce((sum, c) => sum + c.qualifiedLeads, 0);
  const totalDeals = CAMPAIGNS_DATA.reduce((sum, c) => sum + c.deals, 0);
  const avgROI = Math.round(((totalRevenue - totalSpend) / totalSpend) * 100);
  const avgConversion = totalLeads > 0 ? ((totalDeals / totalLeads) * 100) : 0;

  // Данные для круговой диаграммы
  const pieData = CAMPAIGNS_DATA.map(c => ({
    name: c.name,
    value: c.leads,
    color: c.platformColor,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('marketing.title')}
            <span className="text-xs bg-primary text-black px-2 py-1 rounded font-bold uppercase tracking-wider">PRO</span>
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            Расходы → Лиды → Тёплые → Сделки
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Toggle */}
          <div className={`flex items-center gap-1 p-1 rounded-lg ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
            <button
              onClick={() => setCurrency('KZT')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currency === 'KZT'
                  ? 'bg-primary text-black'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ₸ KZT
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currency === 'USD'
                  ? 'bg-primary text-black'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              $ USD
            </button>
          </div>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
            1$ = {USD_KZT_RATE}₸
          </span>

          <button
            onClick={() => setIsAIPopupOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
          >
            <Brain className="w-5 h-5" />
            <span>AI Стратегия</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex gap-2 p-1 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'campaigns'
              ? 'bg-primary text-black'
              : isDark
                ? 'text-gray-400 hover:text-white hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Target className="w-4 h-4" />
          Мои кампании
        </button>
        <button
          onClick={() => setActiveTab('adlibrary')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'adlibrary'
              ? 'bg-[#1877F2] text-white'
              : isDark
                ? 'text-gray-400 hover:text-white hover:bg-white/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Facebook className="w-4 h-4" />
          FB Ad Library
        </button>
      </div>

      {/* AD LIBRARY TAB */}
      {activeTab === 'adlibrary' && (
        <div className="space-y-6">
          {/* Ad Library Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border ${isDark ? 'bg-[#1877F2]/10 border-[#1877F2]/20' : 'bg-blue-50 border-blue-200'}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-[#1877F2]">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Facebook Ad Library
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  Анализ рекламы конкурентов в вашей нише
                </p>
              </div>
              <a
                href="https://www.facebook.com/ads/library/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg text-sm font-medium hover:bg-[#166FE5]"
              >
                <ExternalLink className="w-4 h-4" />
                Открыть Ad Library
              </a>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Поиск по рекламодателям, ключевым словам..."
                value={adSearchQuery}
                onChange={(e) => setAdSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500'
                    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400'
                } focus:outline-none focus:ring-2 focus:ring-[#1877F2]/50`}
              />
            </div>
          </motion.div>

          {/* Ad Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AD_LIBRARY_DATA.filter(ad =>
              adSearchQuery === '' ||
              ad.advertiser.toLowerCase().includes(adSearchQuery.toLowerCase()) ||
              ad.category.toLowerCase().includes(adSearchQuery.toLowerCase())
            ).map((ad, index) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border overflow-hidden ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
                }`}
              >
                {/* Ad Preview Image */}
                <div className="relative aspect-video">
                  <img
                    src={ad.thumbnail}
                    alt={ad.advertiser}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {ad.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="px-2 py-1 bg-black/60 text-white text-xs rounded-full"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                    ad.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {ad.status === 'active' ? 'Активна' : 'Неактивна'}
                  </div>
                </div>

                {/* Ad Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {ad.advertiser}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-white/10 text-gray-400' : 'bg-slate-100 text-slate-600'}`}>
                      {ad.adCount} объявлений
                    </span>
                  </div>

                  <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {ad.previewText}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Eye className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        Охват: {ad.impressions}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {ad.targetingInfo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        Запущена: {ad.startDate}
                      </span>
                    </div>
                  </div>

                  <div className={`mt-3 pt-3 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                      Категория: {ad.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Insights for Ad Library */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#1A1A1A] to-[#333] p-6 rounded-2xl text-white shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#1877F2] p-3 rounded-full">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#1877F2] mb-3">AI Анализ конкурентов</h3>
                <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                  <li className="flex gap-2">
                    <span className="text-green-500">↑</span>
                    <span><strong className="text-green-400">Тренд:</strong> Конкуренты активно используют Reels-формат — ROI выше на 40%.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-500">!</span>
                    <span><strong className="text-yellow-400">Возможность:</strong> Wedding Dreams тратит 500K-1M охвата — можно перехватить их аудиторию.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500">→</span>
                    <span><strong className="text-blue-400">Рекомендация:</strong> Добавьте объявления с акциями — у 3 из 5 конкурентов есть скидки.</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* CAMPAIGNS TAB */}
      {activeTab === 'campaigns' && (
        <>
      {/* Summary Stats - Funnel focused */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <DollarSign className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {formatMoney(totalSpend)}
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Расход</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <Users className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{totalLeads}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Лиды</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-xl border ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}
        >
          <Phone className="w-5 h-5 mb-2 text-blue-500" />
          <p className="text-2xl font-bold text-blue-500">{totalQualified}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Тёплые</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <Target className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{totalDeals}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Сделки ({avgConversion.toFixed(0)}%)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-xl border ${isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'}`}
        >
          <TrendingUp className="w-5 h-5 mb-2 text-green-500" />
          <p className="text-2xl font-bold text-green-500">{formatMoney(totalRevenue)}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`p-4 rounded-xl border ${
            avgROI >= 500 ? (isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200') :
            avgROI >= 200 ? (isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200') :
            (isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200')
          }`}
        >
          <Sparkles className={`w-5 h-5 mb-2 ${avgROI >= 500 ? 'text-green-500' : avgROI >= 200 ? 'text-yellow-500' : 'text-red-500'}`} />
          <p className={`text-2xl font-bold ${avgROI >= 500 ? 'text-green-500' : avgROI >= 200 ? 'text-yellow-500' : 'text-red-500'}`}>
            {avgROI}%
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>ROI</p>
        </motion.div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Рекламные кампании
        </h2>

        {CAMPAIGNS_DATA.map((campaign, index) => {
          const isExpanded = expandedCampaign === campaign.id;
          const decisionConfig = getDecisionConfig(campaign.aiDecision);
          const DecisionIcon = decisionConfig.icon;
          const PlatformIcon = campaign.platformIcon;

          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border overflow-hidden ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
              } ${campaign.aiDecision === 'pause' ? (isDark ? 'border-red-500/30' : 'border-red-300') : ''}`}
            >
              {/* Campaign Header */}
              <div
                onClick={() => setExpandedCampaign(isExpanded ? null : campaign.id)}
                className={`p-4 cursor-pointer flex items-center justify-between transition-colors ${
                  isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: campaign.platformColor + '20' }}
                  >
                    <PlatformIcon className="w-6 h-6" style={{ color: campaign.platformColor }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {campaign.name}
                      </h3>
                      {campaign.status === 'paused' && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/10 text-red-500">
                          Остановлена
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {formatMoney(campaign.spend)} → {campaign.leads} лидов → {campaign.qualifiedLeads} тёплых → {campaign.deals} сделок
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Quick Stats */}
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-right">
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>ROI</p>
                      <p className={`font-bold ${campaign.roi >= 500 ? 'text-green-500' : campaign.roi >= 200 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {campaign.roi}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</p>
                      <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {formatCurrency(campaign.revenue)}
                      </p>
                    </div>
                  </div>

                  {/* AI Decision Badge */}
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${decisionConfig.bgColor}`}>
                    <DecisionIcon className={`w-4 h-4 ${decisionConfig.color}`} />
                    <span className={`text-sm font-medium ${decisionConfig.color}`}>
                      {decisionConfig.label}
                    </span>
                  </div>

                  {/* Expand Icon */}
                  {isExpanded ? (
                    <ChevronUp className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                      {/* Metrics Grid - Focus on Spend/Leads/Conversions */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Расход</p>
                          <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {formatMoney(campaign.spend)}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>CPL</p>
                          <p className={`font-semibold ${campaign.cpl <= 4000 ? 'text-green-500' : campaign.cpl <= 5000 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {formatMoney(campaign.cpl)}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Лид → Тёплый</p>
                          <p className={`font-semibold ${(campaign.qualifiedLeads/campaign.leads*100) >= 50 ? 'text-green-500' : 'text-yellow-500'}`}>
                            {campaign.leads} → {campaign.qualifiedLeads} ({((campaign.qualifiedLeads/campaign.leads)*100).toFixed(0)}%)
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Конверсия в сделку</p>
                          <p className={`font-semibold ${campaign.conversionRate >= 25 ? 'text-green-500' : campaign.conversionRate >= 15 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {formatPercent(campaign.conversionRate)}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. чек</p>
                          <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {formatMoney(campaign.avgDealSize)}
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</p>
                          <p className="font-semibold text-green-500">
                            {formatMoney(campaign.revenue)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Funnel Visualization - Spend → Leads → Warm → Deals → Revenue */}
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                          <h4 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Воронка: Расход → Выручка
                          </h4>
                          <div className="space-y-3">
                            {campaign.funnelData.map((stage: any, idx: number) => {
                              // For spend/revenue, use different calculation
                              const isMonetary = stage.isSpend || stage.isRevenue;
                              const leadsData = campaign.funnelData.find((s: any) => s.stage === 'Лиды');
                              const maxLeads = leadsData?.value || 1;
                              const width = isMonetary ? 100 : (stage.value / maxLeads) * 100;

                              const nextStage = campaign.funnelData[idx + 1];
                              const convRate = (!isMonetary && nextStage && !nextStage.isRevenue)
                                ? ((nextStage.value / stage.value) * 100).toFixed(0)
                                : null;

                              return (
                                <div key={stage.stage}>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                                      {stage.stage}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <span className={`text-sm font-bold ${
                                        stage.isRevenue && campaign.revenue > campaign.spend ? 'text-green-500' :
                                        stage.isRevenue ? 'text-red-500' :
                                        isDark ? 'text-white' : 'text-slate-900'
                                      }`}>
                                        {isMonetary ? formatMoney(stage.value) : stage.value}
                                      </span>
                                      {convRate && (
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                          parseFloat(convRate) >= 40 ? 'bg-green-500/20 text-green-500' :
                                          parseFloat(convRate) >= 20 ? 'bg-yellow-500/20 text-yellow-500' :
                                          'bg-red-500/20 text-red-500'
                                        }`}>
                                          {convRate}%
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className={`h-5 rounded-lg overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${Math.min(width, 100)}%` }}
                                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                                      className="h-full rounded-lg"
                                      style={{ backgroundColor: stage.color }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* AI Analysis */}
                        <div className={`p-4 rounded-xl ${
                          campaign.aiDecision === 'pause'
                            ? (isDark ? 'bg-red-500/10' : 'bg-red-50')
                            : campaign.aiDecision === 'scale'
                              ? (isDark ? 'bg-green-500/10' : 'bg-green-50')
                              : (isDark ? 'bg-purple-500/10' : 'bg-purple-50')
                        }`}>
                          <div className="flex items-start gap-3 mb-4">
                            <Sparkles className={`w-5 h-5 mt-0.5 ${
                              campaign.aiDecision === 'pause' ? 'text-red-500' :
                              campaign.aiDecision === 'scale' ? 'text-green-500' : 'text-purple-500'
                            }`} />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                  AI Анализ
                                </h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  campaign.aiConfidence >= 90 ? 'bg-green-500/20 text-green-500' :
                                  campaign.aiConfidence >= 70 ? 'bg-yellow-500/20 text-yellow-500' :
                                  'bg-gray-500/20 text-gray-500'
                                }`}>
                                  {campaign.aiConfidence}% уверенность
                                </span>
                              </div>
                              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                                {campaign.aiInsight}
                              </p>
                            </div>
                          </div>

                          <div className={`border-t pt-4 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                            <h5 className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              Рекомендации:
                            </h5>
                            <ul className="space-y-2">
                              {campaign.aiRecommendations.map((rec, idx) => (
                                <li key={idx} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                                  <span className={`${
                                    campaign.aiDecision === 'pause' ? 'text-red-500' :
                                    campaign.aiDecision === 'scale' ? 'text-green-500' : 'text-purple-500'
                                  }`}>•</span>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Weekly Chart */}
                      <div className={`mt-4 p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                        <h4 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          Динамика за неделю
                        </h4>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={campaign.weeklyData}>
                              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
                              <XAxis dataKey="day" stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                              <YAxis stroke={isDark ? '#9CA3AF' : '#6B7280'} />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                }}
                              />
                              <Legend />
                              <Bar dataKey="leads" name="Лиды" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="deals" name="Сделки" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Traffic Teams Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('traffic.title')}
          </h2>
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            {MOCK_TRAFFIC_TEAMS.length} {MOCK_TRAFFIC_TEAMS.length === 1 ? 'команда' : 'команды'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {MOCK_TRAFFIC_TEAMS.map((team) => (
            <TrafficTeamCard
              key={team.id}
              team={team}
              onMemberClick={(member) => console.log('View member:', member.name)}
            />
          ))}
        </div>
      </div>

      {/* Organic Sources */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
        <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Органические источники (бесплатные)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ORGANIC_SOURCES.map((source) => {
            const Icon = source.icon;
            return (
              <div
                key={source.id}
                className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: source.color + '20' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: source.color }} />
                  </div>
                  <div>
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {source.name}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      Конверсия: {formatPercent(source.conversionRate)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Лиды</p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{source.leads}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Звонки</p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{source.calls}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Сделки</p>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{source.deals}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</p>
                    <p className="font-semibold text-green-500">{formatCurrency(source.revenue)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#1A1A1A] to-[#333] p-6 rounded-2xl text-white shadow-lg"
      >
        <div className="flex items-start gap-4">
          <div className="bg-primary p-3 rounded-full text-black">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-primary">Краткие выводы</h3>
              <button
                onClick={() => setIsAIPopupOpen(true)}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <Brain className="w-4 h-4" />
                Подробный анализ →
              </button>
            </div>
            <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">!</span>
                <span><strong className="text-red-400">Критично:</strong> Кампания "Детские праздники" остановлена — ROI был 8%. Требуется пересмотр таргетинга.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-500">↑</span>
                <span><strong className="text-green-400">Рост:</strong> "Свадьбы 2026" показывает стабильный ROI 871% — можно масштабировать на 15-20%.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500">⚙</span>
                <span><strong className="text-yellow-400">Внимание:</strong> Креативы "Дни рождения" устали (частота 3.8). Подготовьте обновление.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* AI Strategy Popup */}
      <AIStrategyPopup
        isOpen={isAIPopupOpen}
        onClose={() => setIsAIPopupOpen(false)}
        context="marketing"
      />
        </>
      )}
    </div>
  );
};
