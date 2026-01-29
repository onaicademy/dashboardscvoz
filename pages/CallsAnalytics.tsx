import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  User,
  Target,
  TrendingUp,
  Play,
  Pause,
  Volume2,
  Download,
  Filter,
  Calendar,
  Search,
  Instagram,
  Globe,
  MessageCircle,
  Users,
  Brain
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { formatCurrency, AdPerformanceStats, CallScriptEvaluation } from '../types/scoring';
import { AIStrategyPopup } from '../components/AIStrategyPopup';
import { CheckCircle, XCircle, AlertCircle, FileText, Mic, Zap } from 'lucide-react';

// Скрипт продаж ShowToday (чеклист для AI-оценки)
const SALES_SCRIPT_STEPS = [
  { id: 'greeting', name: 'Приветствие', description: 'Поздороваться, представиться, назвать компанию' },
  { id: 'need_discovery', name: 'Выявление потребности', description: 'Узнать повод, дату, количество гостей' },
  { id: 'budget', name: 'Бюджет', description: 'Уточнить бюджет или ценовые ожидания' },
  { id: 'presentation', name: 'Презентация', description: 'Предложить подходящие варианты' },
  { id: 'objections', name: 'Работа с возражениями', description: 'Отработать сомнения клиента' },
  { id: 'closing', name: 'Закрытие', description: 'Предложить следующий шаг (встреча, КП, бронь)' },
];

// Mock глубокого анализа звонка (в реальности - от Sipuni API + OpenAI)
const generateDeepCallAnalysis = (call: typeof MOCK_CALLS[0]) => {
  if (!call.qualityScore) return null;

  const isGood = call.qualityScore >= 7;
  const isMedium = call.qualityScore >= 5 && call.qualityScore < 7;

  // Генерация оценки по скрипту
  const scriptEvaluation: CallScriptEvaluation[] = SALES_SCRIPT_STEPS.map((step, idx) => {
    const baseChance = isGood ? 0.85 : isMedium ? 0.6 : 0.3;
    const followed = Math.random() < baseChance;
    const qualityScore = followed
      ? Math.floor(Math.random() * 2) + 8
      : Math.floor(Math.random() * 3) + 3;

    const comments: Record<string, { good: string; bad: string }> = {
      greeting: { good: 'Приветствие выполнено корректно, представился чётко', bad: 'Не назвал компанию, сухое приветствие' },
      need_discovery: { good: 'Задал уточняющие вопросы, выявил потребность', bad: 'Не спросил о дате и количестве гостей' },
      budget: { good: 'Корректно уточнил бюджет', bad: 'Не уточнил бюджет, сразу назвал цену' },
      presentation: { good: 'Предложил релевантные варианты под запрос', bad: 'Шаблонная презентация без учёта потребностей' },
      objections: { good: 'Грамотно отработал возражения', bad: 'Не отработал возражение "дорого"' },
      closing: { good: 'Предложил конкретный следующий шаг', bad: 'Не закрыл на следующий шаг, клиент "подумает"' },
    };

    return {
      scriptStep: step.name,
      followed,
      qualityScore,
      aiComment: followed ? comments[step.id].good : comments[step.id].bad
    };
  });

  const followedCount = scriptEvaluation.filter(s => s.followed).length;
  const scriptAdherence = Math.round((followedCount / SALES_SCRIPT_STEPS.length) * 100);

  return {
    scriptEvaluation,
    scriptAdherence,
    qualityExplanation: isGood
      ? `Звонок проведён на высоком уровне. Менеджер следовал скрипту (${scriptAdherence}%), выявил потребности и предложил релевантное решение. Клиент заинтересован.`
      : isMedium
        ? `Звонок среднего качества. Часть этапов скрипта пропущена (${scriptAdherence}% соблюдение). Есть потенциал для улучшения в работе с возражениями.`
        : `Звонок требует внимания. Низкое соблюдение скрипта (${scriptAdherence}%). Менеджеру рекомендуется дополнительное обучение.`,
    strengths: isGood
      ? ['Активное слушание', 'Хорошее знание продукта', 'Уверенная презентация']
      : isMedium
        ? ['Вежливый тон', 'Базовое знание продукта']
        : ['Быстрый ответ на звонок'],
    improvements: isGood
      ? ['Можно добавить upsell предложение']
      : isMedium
        ? ['Отрабатывать возражения', 'Задавать больше вопросов', 'Закрывать на конкретный шаг']
        : ['Изучить скрипт продаж', 'Работать с наставником', 'Слушать записи успешных звонков'],
    sipuniData: {
      transcriptionReady: true,
      recordingUrl: `https://sipuni.com/recordings/${call.id}.mp3`,
      duration: call.duration,
      waitTime: Math.floor(Math.random() * 15) + 3,
      callbackId: `sipuni_${call.id}_${Date.now()}`
    }
  };
};

// Список менеджеров для фильтра
const MANAGERS = [
  { id: 'all', name: 'Все менеджеры' },
  { id: 'mgr-1', name: 'Марат Ахметов' },
  { id: 'mgr-2', name: 'Динара Касымова' },
  { id: 'mgr-3', name: 'Бахытжан Серикулы' },
  { id: 'mgr-4', name: 'Айжан Нурланова' },
];

// Периоды для фильтра
const DATE_RANGES = [
  { id: 'day', name: 'Сегодня', days: 1 },
  { id: 'week', name: 'Неделя', days: 7 },
  { id: '2weeks', name: '2 недели', days: 14 },
  { id: 'month', name: 'Месяц', days: 30 },
];

// Mock call data (расширенный набор для фильтрации с UTM-атрибуцией)
const MOCK_CALLS = [
  {
    id: 'call-1',
    type: 'incoming' as const,
    phone: '+7 705 123 4567',
    clientName: 'Асель Муратова',
    duration: 245,
    waitTime: 3, // секунды до ответа
    status: 'completed' as const,
    source: 'Instagram Ads',
    sourceIcon: Instagram,
    sourceColor: '#E1306C',
    campaign: 'Свадьбы 2026',
    manager: 'Марат Ахметов',
    managerId: 'mgr-1',
    quality: 'good' as const,
    qualityScore: 8.5,
    dealAmount: 280000,
    timestamp: new Date('2026-01-29T14:32:00'),
    recording: true,
    tags: ['горячий', 'свадьба'],
    aiSummary: 'Клиент интересуется пакетом "Всё включено". Договорились о встрече на 31 января.',
    attribution: {
      trafficTeamId: 'team-1',
      trafficTeamName: 'Команда А (Events)',
      targetologistId: 'targ-1',
      targetologistName: 'Алексей Петров',
      adId: 'ad-001',
      adName: 'Свадьба мечты - Stories',
      campaignId: 'camp-1',
      campaignName: 'Свадьбы 2026',
      creativeId: 'cr-001',
      creativeName: 'Видео: Счастливые пары',
      placement: 'instagram_stories' as const,
      utmData: {
        utm_source: 'instagram',
        utm_medium: 'cpc',
        utm_campaign: 'wedding_2026',
        utm_content: 'stories_video_happy'
      }
    }
  },
  {
    id: 'call-2',
    type: 'outgoing' as const,
    phone: '+7 707 234 5678',
    clientName: 'Тимур Касымов',
    duration: 180,
    waitTime: 0, // исходящий звонок
    status: 'completed' as const,
    source: 'Google Ads',
    sourceIcon: Globe,
    sourceColor: '#4285F4',
    campaign: 'Корпоративы B2B',
    manager: 'Динара Касымова',
    managerId: 'mgr-2',
    quality: 'average' as const,
    qualityScore: 6.2,
    dealAmount: null,
    timestamp: new Date('2026-01-29T13:15:00'),
    recording: true,
    tags: ['корпоратив'],
    aiSummary: 'Перезвон по заявке. Клиент сравнивает предложения, обещал вернуться.',
    attribution: {
      trafficTeamId: 'team-1',
      trafficTeamName: 'Команда А (Events)',
      targetologistId: 'targ-3',
      targetologistName: 'Дмитрий Козлов',
      adId: 'ad-005',
      adName: 'Корпоратив под ключ',
      campaignId: 'camp-3',
      campaignName: 'Корпоративы B2B',
      creativeId: 'cr-005',
      creativeName: 'Баннер: Офис на праздник',
      utmData: {
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'corporate_b2b',
        utm_content: 'banner_office',
        utm_term: 'корпоратив алматы'
      }
    }
  },
  {
    id: 'call-3',
    type: 'missed' as const,
    phone: '+7 701 345 6789',
    clientName: 'Неизвестно',
    duration: 0,
    waitTime: 45, // не ответили за 45 сек - пропущен
    status: 'missed' as const,
    source: 'WhatsApp',
    sourceIcon: MessageCircle,
    sourceColor: '#25D366',
    campaign: null,
    manager: 'Айжан Нурланова',
    managerId: 'mgr-4',
    quality: null,
    qualityScore: null,
    dealAmount: null,
    timestamp: new Date('2026-01-29T12:45:00'),
    recording: false,
    tags: [],
    aiSummary: null,
    attribution: null
  },
  {
    id: 'call-4',
    type: 'incoming' as const,
    phone: '+7 717 456 7890',
    clientName: 'ТОО "Астана Групп"',
    duration: 420,
    waitTime: 2, // быстрый ответ
    status: 'completed' as const,
    source: 'Рекомендации',
    sourceIcon: User,
    sourceColor: '#FFD700',
    campaign: null,
    manager: 'Марат Ахметов',
    managerId: 'mgr-1',
    quality: 'excellent' as const,
    qualityScore: 9.2,
    dealAmount: 850000,
    timestamp: new Date('2026-01-29T11:00:00'),
    recording: true,
    tags: ['B2B', 'крупный клиент', 'горячий'],
    aiSummary: 'Корпоратив на 200 человек. Клиент готов подписать договор. Отправлен КП.',
    attribution: {
      trafficTeamId: null,
      trafficTeamName: 'Органика',
      utmData: {
        utm_source: 'referral',
        utm_medium: 'word_of_mouth'
      }
    }
  },
  {
    id: 'call-5',
    type: 'outgoing' as const,
    phone: '+7 708 567 8901',
    clientName: 'Жанна Смагулова',
    duration: 95,
    waitTime: 0, // исходящий
    status: 'completed' as const,
    source: 'Instagram Ads',
    sourceIcon: Instagram,
    sourceColor: '#E1306C',
    campaign: 'День рождения',
    manager: 'Бахытжан Серикулы',
    managerId: 'mgr-3',
    quality: 'poor' as const,
    qualityScore: 4.1,
    dealAmount: null,
    timestamp: new Date('2026-01-29T10:30:00'),
    recording: true,
    tags: ['день рождения'],
    aiSummary: 'Короткий разговор. Менеджер не выявил потребности, клиент потерял интерес.',
    attribution: {
      trafficTeamId: 'team-2',
      trafficTeamName: 'Команда Б (Social)',
      targetologistId: 'targ-2',
      targetologistName: 'Мария Сидорова',
      adId: 'ad-003',
      adName: 'День рождения - Reels',
      campaignId: 'camp-2',
      campaignName: 'День рождения',
      creativeId: 'cr-003',
      creativeName: 'Reels: Детский праздник',
      placement: 'instagram_reels' as const,
      utmData: {
        utm_source: 'instagram',
        utm_medium: 'cpc',
        utm_campaign: 'birthday_kids',
        utm_content: 'reels_party'
      }
    }
  },
  {
    id: 'call-6',
    type: 'incoming' as const,
    phone: '+7 702 111 2222',
    clientName: 'Алия Серикова',
    duration: 312,
    waitTime: 5, // 5 секунд
    status: 'completed' as const,
    source: 'Instagram Ads',
    sourceIcon: Instagram,
    sourceColor: '#E1306C',
    campaign: 'Свадьбы 2026',
    manager: 'Динара Касымова',
    managerId: 'mgr-2',
    quality: 'good' as const,
    qualityScore: 7.8,
    dealAmount: 185000,
    timestamp: new Date('2026-01-28T16:20:00'),
    recording: true,
    tags: ['свадьба', 'средний бюджет'],
    aiSummary: 'Свадьба на 80 гостей. Клиент выбирает между нами и конкурентом. Отправили расширенное КП.',
    attribution: {
      trafficTeamId: 'team-1',
      trafficTeamName: 'Команда А (Events)',
      targetologistId: 'targ-1',
      targetologistName: 'Алексей Петров',
      adId: 'ad-002',
      adName: 'Свадьба - Feed карусель',
      campaignId: 'camp-1',
      campaignName: 'Свадьбы 2026',
      creativeId: 'cr-002',
      creativeName: 'Карусель: Свадебные локации',
      placement: 'instagram_feed' as const,
      utmData: {
        utm_source: 'instagram',
        utm_medium: 'cpc',
        utm_campaign: 'wedding_2026',
        utm_content: 'carousel_locations'
      }
    }
  },
  {
    id: 'call-7',
    type: 'missed' as const,
    phone: '+7 700 333 4444',
    clientName: 'Неизвестно',
    duration: 0,
    waitTime: 60, // звонил минуту - не ответили
    status: 'missed' as const,
    source: 'Google Ads',
    sourceIcon: Globe,
    sourceColor: '#4285F4',
    campaign: 'Корпоративы B2B',
    manager: 'Бахытжан Серикулы',
    managerId: 'mgr-3',
    quality: null,
    qualityScore: null,
    dealAmount: null,
    timestamp: new Date('2026-01-28T14:05:00'),
    recording: false,
    tags: [],
    aiSummary: null,
    attribution: {
      trafficTeamId: 'team-1',
      trafficTeamName: 'Команда А (Events)',
      targetologistId: 'targ-3',
      targetologistName: 'Дмитрий Козлов',
      adId: 'ad-005',
      adName: 'Корпоратив под ключ',
      campaignId: 'camp-3',
      campaignName: 'Корпоративы B2B',
      utmData: {
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'corporate_b2b'
      }
    }
  },
  {
    id: 'call-8',
    type: 'outgoing' as const,
    phone: '+7 771 555 6666',
    clientName: 'Ержан Муканов',
    duration: 156,
    waitTime: 0, // исходящий
    status: 'completed' as const,
    source: 'WhatsApp',
    sourceIcon: MessageCircle,
    sourceColor: '#25D366',
    campaign: null,
    manager: 'Марат Ахметов',
    managerId: 'mgr-1',
    quality: 'good' as const,
    qualityScore: 7.5,
    dealAmount: null,
    timestamp: new Date('2026-01-28T11:30:00'),
    recording: true,
    tags: ['корпоратив'],
    aiSummary: 'Повторный звонок. Клиент просит доп. скидку 10%. Обсуждаем с руководством.',
    attribution: {
      trafficTeamId: null,
      trafficTeamName: 'WhatsApp Direct',
      utmData: {
        utm_source: 'whatsapp',
        utm_medium: 'direct'
      }
    }
  },
  {
    id: 'call-9',
    type: 'incoming' as const,
    phone: '+7 747 777 8888',
    clientName: 'Гульнара Ахметова',
    duration: 78,
    waitTime: 8, // 8 секунд
    status: 'completed' as const,
    source: 'Instagram Ads',
    sourceIcon: Instagram,
    sourceColor: '#E1306C',
    campaign: 'День рождения',
    manager: 'Айжан Нурланова',
    managerId: 'mgr-4',
    quality: 'average' as const,
    qualityScore: 5.8,
    dealAmount: null,
    timestamp: new Date('2026-01-27T15:45:00'),
    recording: true,
    tags: ['день рождения'],
    aiSummary: 'Клиент интересуется ценами. Сомневается. Нужен повторный звонок.',
    attribution: {
      trafficTeamId: 'team-2',
      trafficTeamName: 'Команда Б (Social)',
      targetologistId: 'targ-4',
      targetologistName: 'Анна Волкова',
      adId: 'ad-004',
      adName: 'ДР взрослые - Stories',
      campaignId: 'camp-2',
      campaignName: 'День рождения',
      creativeId: 'cr-004',
      creativeName: 'Stories: Юбилей',
      placement: 'instagram_stories' as const,
      utmData: {
        utm_source: 'instagram',
        utm_medium: 'cpc',
        utm_campaign: 'birthday_adult',
        utm_content: 'stories_anniversary'
      }
    }
  },
  {
    id: 'call-10',
    type: 'incoming' as const,
    phone: '+7 778 999 0000',
    clientName: 'ИП "Нурлан"',
    duration: 520,
    waitTime: 4, // 4 секунды - быстро
    status: 'completed' as const,
    source: 'Рекомендации',
    sourceIcon: User,
    sourceColor: '#FFD700',
    campaign: null,
    manager: 'Динара Касымова',
    managerId: 'mgr-2',
    quality: 'excellent' as const,
    qualityScore: 9.0,
    dealAmount: 420000,
    timestamp: new Date('2026-01-25T10:00:00'),
    recording: true,
    tags: ['B2B', 'новогодний корпоратив'],
    aiSummary: 'Корпоратив для IT-компании на 50 человек. Высокий бюджет. Договор подписан.',
    attribution: {
      trafficTeamId: null,
      trafficTeamName: 'Органика',
      utmData: {
        utm_source: 'referral',
        utm_medium: 'partner'
      }
    }
  },
];

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};

export const CallsAnalytics: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typeFilter, setTypeFilter] = useState<'all' | 'incoming' | 'outgoing' | 'missed'>('all');
  const [managerFilter, setManagerFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIPopupOpen, setIsAIPopupOpen] = useState(false);
  const [showAdAnalytics, setShowAdAnalytics] = useState(false);

  // Аналитика по объявлениям
  const adPerformanceStats = useMemo((): AdPerformanceStats[] => {
    const adMap = new Map<string, {
      adId: string;
      adName: string;
      campaignName: string;
      trafficTeamName: string;
      calls: typeof MOCK_CALLS;
    }>();

    MOCK_CALLS.forEach(call => {
      if (call.attribution?.adId) {
        const key = call.attribution.adId;
        if (!adMap.has(key)) {
          adMap.set(key, {
            adId: call.attribution.adId,
            adName: call.attribution.adName || 'Без названия',
            campaignName: call.attribution.campaignName || 'Без кампании',
            trafficTeamName: call.attribution.trafficTeamName || 'Неизвестно',
            calls: []
          });
        }
        adMap.get(key)!.calls.push(call);
      }
    });

    return Array.from(adMap.values()).map(ad => {
      const successfulCalls = ad.calls.filter(c => c.dealAmount && c.dealAmount > 0).length;
      const totalRevenue = ad.calls.reduce((sum, c) => sum + (c.dealAmount || 0), 0);
      const avgQuality = ad.calls.filter(c => c.qualityScore).reduce((sum, c) => sum + (c.qualityScore || 0), 0) /
                         (ad.calls.filter(c => c.qualityScore).length || 1);

      return {
        adId: ad.adId,
        adName: ad.adName,
        campaignName: ad.campaignName,
        trafficTeamName: ad.trafficTeamName,
        totalCalls: ad.calls.length,
        successfulCalls,
        failedCalls: ad.calls.length - successfulCalls,
        totalRevenue,
        avgQualityScore: Math.round(avgQuality * 10) / 10,
        conversionRate: Math.round((successfulCalls / ad.calls.length) * 100),
        costPerCall: Math.round(50000 / ad.calls.length), // примерная стоимость
        roi: totalRevenue > 0 ? Math.round((totalRevenue / 50000 - 1) * 100) : 0
      };
    }).sort((a, b) => b.conversionRate - a.conversionRate);
  }, []);

  // Статистика по трафик-командам
  const teamStats = useMemo(() => {
    const stats = new Map<string, { name: string; calls: number; deals: number; revenue: number }>();

    MOCK_CALLS.forEach(call => {
      const teamName = call.attribution?.trafficTeamName || 'Без команды';
      if (!stats.has(teamName)) {
        stats.set(teamName, { name: teamName, calls: 0, deals: 0, revenue: 0 });
      }
      const team = stats.get(teamName)!;
      team.calls++;
      if (call.dealAmount) {
        team.deals++;
        team.revenue += call.dealAmount;
      }
    });

    return Array.from(stats.values()).sort((a, b) => b.revenue - a.revenue);
  }, []);

  const filteredCalls = useMemo(() => {
    const now = new Date();
    const selectedRange = DATE_RANGES.find(r => r.id === dateRange);
    const cutoffDate = new Date(now.getTime() - (selectedRange?.days || 7) * 24 * 60 * 60 * 1000);

    return MOCK_CALLS.filter(call => {
      // Type filter
      if (typeFilter !== 'all' && call.type !== typeFilter) return false;

      // Manager filter
      if (managerFilter !== 'all' && call.managerId !== managerFilter) return false;

      // Date range filter
      if (call.timestamp < cutoffDate) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = call.clientName.toLowerCase().includes(query);
        const matchesPhone = call.phone.includes(query);
        const matchesManager = call.manager.toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesManager) return false;
      }

      return true;
    });
  }, [typeFilter, managerFilter, dateRange, searchQuery]);

  // Recalculate stats based on filtered calls
  const callStats = useMemo(() => {
    const incomingCalls = filteredCalls.filter(c => c.type === 'incoming');
    const answeredIncoming = incomingCalls.filter(c => c.status === 'completed' && c.waitTime !== undefined);
    const avgWaitTime = answeredIncoming.length > 0
      ? Math.round(answeredIncoming.reduce((sum, c) => sum + (c.waitTime || 0), 0) / answeredIncoming.length)
      : 0;

    return {
      total: filteredCalls.length,
      incoming: incomingCalls.length,
      outgoing: filteredCalls.filter(c => c.type === 'outgoing').length,
      missed: filteredCalls.filter(c => c.type === 'missed').length,
      avgDuration: filteredCalls.filter(c => c.duration > 0).length > 0
        ? Math.round(filteredCalls.filter(c => c.duration > 0).reduce((sum, c) => sum + c.duration, 0) / filteredCalls.filter(c => c.duration > 0).length)
        : 0,
      avgWaitTime, // среднее время ответа на входящие
      avgQuality: filteredCalls.filter(c => c.qualityScore).length > 0
        ? (filteredCalls.filter(c => c.qualityScore).reduce((sum, c) => sum + (c.qualityScore || 0), 0) / filteredCalls.filter(c => c.qualityScore).length).toFixed(1)
        : '—',
      totalRevenue: filteredCalls.filter(c => c.dealAmount).reduce((sum, c) => sum + (c.dealAmount || 0), 0),
      conversionRate: filteredCalls.filter(c => c.status === 'completed').length > 0
        ? ((filteredCalls.filter(c => c.dealAmount).length / filteredCalls.filter(c => c.status === 'completed').length) * 100).toFixed(0)
        : '0',
    };
  }, [filteredCalls]);

  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming': return PhoneIncoming;
      case 'outgoing': return PhoneOutgoing;
      case 'missed': return PhoneMissed;
      default: return Phone;
    }
  };

  const getCallColor = (type: string) => {
    switch (type) {
      case 'incoming': return 'text-green-500';
      case 'outgoing': return 'text-blue-500';
      case 'missed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getQualityColor = (quality: string | null) => {
    switch (quality) {
      case 'excellent': return 'text-green-500 bg-green-500/10';
      case 'good': return 'text-blue-500 bg-blue-500/10';
      case 'average': return 'text-yellow-500 bg-yellow-500/10';
      case 'poor': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <Phone className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Сквозная аналитика звонков
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Отслеживание и анализ всех звонков с привязкой к источникам
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdAnalytics(!showAdAnalytics)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              showAdAnalytics
                ? 'bg-primary text-black'
                : isDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Target className="w-4 h-4" />
            По объявлениям
          </button>
          <button
            onClick={() => setIsAIPopupOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
          >
            <Brain className="w-4 h-4" />
            AI Анализ
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-primary text-black`}>
            <Download className="w-4 h-4" />
            Экспорт
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          <Phone className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{callStats.total}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Всего</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
          }`}
        >
          <PhoneIncoming className="w-5 h-5 mb-2 text-green-500" />
          <p className="text-2xl font-bold text-green-500">{callStats.incoming}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Входящие</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
          }`}
        >
          <PhoneOutgoing className="w-5 h-5 mb-2 text-blue-500" />
          <p className="text-2xl font-bold text-blue-500">{callStats.outgoing}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Исходящие</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'
          }`}
        >
          <PhoneMissed className="w-5 h-5 mb-2 text-red-500" />
          <p className="text-2xl font-bold text-red-500">{callStats.missed}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Пропущенные</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          <Clock className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{formatDuration(callStats.avgDuration)}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. время</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className={`p-4 rounded-xl border ${
            callStats.avgWaitTime <= 5
              ? isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
              : callStats.avgWaitTime <= 15
                ? isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'
                : isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'
          }`}
        >
          <PhoneIncoming className={`w-5 h-5 mb-2 ${
            callStats.avgWaitTime <= 5 ? 'text-green-500' :
            callStats.avgWaitTime <= 15 ? 'text-yellow-500' : 'text-red-500'
          }`} />
          <p className={`text-2xl font-bold ${
            callStats.avgWaitTime <= 5 ? 'text-green-500' :
            callStats.avgWaitTime <= 15 ? 'text-yellow-500' : 'text-red-500'
          }`}>{callStats.avgWaitTime}с</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. ответ</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-200'
          }`}
        >
          <Target className="w-5 h-5 mb-2 text-purple-500" />
          <p className="text-2xl font-bold text-purple-500">{callStats.avgQuality}</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. качество</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'
          }`}
        >
          <TrendingUp className="w-5 h-5 mb-2 text-yellow-500" />
          <p className="text-2xl font-bold text-yellow-500">{callStats.conversionRate}%</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Конверсия</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className={`p-4 rounded-xl border ${
            isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
          }`}
        >
          <div className="w-5 h-5 mb-2 text-green-500 font-bold">₸</div>
          <p className="text-xl font-bold text-green-500">{(callStats.totalRevenue / 1000000).toFixed(1)}M</p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</p>
        </motion.div>
      </div>

      {/* Ad Analytics Section */}
      {showAdAnalytics && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          {/* Team Stats */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Users className="w-5 h-5 text-primary" />
              Статистика по трафик-командам
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {teamStats.map((team) => (
                <div
                  key={team.name}
                  className={`p-3 rounded-lg border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}
                >
                  <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{team.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Звонков</p>
                      <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{team.calls}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Сделок</p>
                      <p className="font-bold text-green-500">{team.deals}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</p>
                      <p className="font-bold text-primary">{(team.revenue / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Performance Table */}
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className={`px-4 py-3 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <h3 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <TrendingUp className="w-5 h-5 text-green-500" />
                Эффективность объявлений
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Объявление</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Кампания</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Команда</th>
                    <th className={`px-4 py-3 text-center text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Звонки</th>
                    <th className={`px-4 py-3 text-center text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Конверсия</th>
                    <th className={`px-4 py-3 text-center text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Качество</th>
                    <th className={`px-4 py-3 text-right text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Выручка</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-slate-100'}`}>
                  {adPerformanceStats.map((ad) => (
                    <tr key={ad.adId} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                      <td className="px-4 py-3">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{ad.adName}</p>
                      </td>
                      <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                        {ad.campaignName}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ad.trafficTeamName.includes('А')
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {ad.trafficTeamName}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-center font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {ad.totalCalls}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          ad.conversionRate >= 50 ? 'bg-green-500/10 text-green-500' :
                          ad.conversionRate >= 25 ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {ad.conversionRate}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-medium ${
                          ad.avgQualityScore >= 7 ? 'text-green-500' :
                          ad.avgQualityScore >= 5 ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {ad.avgQualityScore}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-green-500">
                        {formatCurrency(ad.totalRevenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className={`p-4 rounded-xl border space-y-3 ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
      }`}>
        {/* Top row: Type filter + Search */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
            {(['all', 'incoming', 'outgoing', 'missed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  typeFilter === f
                    ? 'bg-primary text-black'
                    : isDark
                      ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f === 'all' ? 'Все' : f === 'incoming' ? 'Входящие' : f === 'outgoing' ? 'Исходящие' : 'Пропущенные'}
              </button>
            ))}
          </div>
          <div className={`flex items-center px-3 py-2 rounded-lg border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <Search className={`w-4 h-4 mr-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по номеру или имени..."
              className={`bg-transparent border-none outline-none text-sm w-48 ${
                isDark ? 'text-white placeholder:text-gray-500' : 'text-slate-700 placeholder:text-slate-400'
              }`}
            />
          </div>
        </div>

        {/* Second row: Manager + Date Range */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Users className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
            <select
              value={managerFilter}
              onChange={(e) => setManagerFilter(e.target.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {MANAGERS.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {DATE_RANGES.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <div className={`ml-auto text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            Найдено: <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{filteredCalls.length}</span> звонков
          </div>
        </div>
      </div>

      {/* Calls List */}
      <div className={`rounded-2xl border overflow-hidden ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Тип</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Контакт</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Источник</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Менеджер</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ответ</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Длит.</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Качество</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Сделка</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Время</th>
                <th className={`px-4 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}></th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/10' : 'divide-slate-100'}`}>
              {filteredCalls.map((call) => {
                const CallIcon = getCallIcon(call.type);
                const SourceIcon = call.sourceIcon;
                const isExpanded = selectedCall === call.id;

                return (
                  <React.Fragment key={call.id}>
                    <tr
                      onClick={() => setSelectedCall(isExpanded ? null : call.id)}
                      className={`cursor-pointer transition-colors ${
                        isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                      } ${isExpanded ? (isDark ? 'bg-white/5' : 'bg-slate-50') : ''}`}
                    >
                      <td className="px-4 py-3">
                        <CallIcon className={`w-5 h-5 ${getCallColor(call.type)}`} />
                      </td>
                      <td className="px-4 py-3">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {call.clientName}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                          {call.phone}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <SourceIcon className="w-4 h-4" style={{ color: call.sourceColor }} />
                          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                            {call.source}
                          </span>
                        </div>
                        {call.campaign && (
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                            {call.campaign}
                          </p>
                        )}
                      </td>
                      <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                        {call.manager}
                      </td>
                      <td className="px-4 py-3">
                        {call.type === 'incoming' || call.type === 'missed' ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            call.type === 'missed'
                              ? 'bg-red-500/10 text-red-500'
                              : (call.waitTime || 0) <= 5
                                ? 'bg-green-500/10 text-green-500'
                                : (call.waitTime || 0) <= 15
                                  ? 'bg-yellow-500/10 text-yellow-500'
                                  : 'bg-orange-500/10 text-orange-500'
                          }`}>
                            {call.type === 'missed' ? `${call.waitTime || 0}с ❌` : `${call.waitTime || 0}с`}
                          </span>
                        ) : (
                          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>—</span>
                        )}
                      </td>
                      <td className={`px-4 py-3 text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {call.duration > 0 ? formatDuration(call.duration) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        {call.qualityScore ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(call.quality)}`}>
                            {call.qualityScore}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        {call.dealAmount ? (
                          <span className="font-medium text-green-500">
                            {formatCurrency(call.dealAmount)}
                          </span>
                        ) : '—'}
                      </td>
                      <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {formatTime(call.timestamp)}
                      </td>
                      <td className="px-4 py-3">
                        {call.recording && (
                          <button className={`p-1.5 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                          }`}>
                            <Volume2 className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                          </button>
                        )}
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={9} className={`px-4 py-4 ${isDark ? 'bg-purple-500/5' : 'bg-purple-50'}`}>
                          <div className="space-y-4">
                            {/* AI Summary */}
                            {call.aiSummary && (
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                                  <Brain className="w-4 h-4 text-purple-500" />
                                </div>
                                <div className="flex-1">
                                  <p className={`text-sm font-medium mb-1 ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                                    AI Анализ звонка
                                  </p>
                                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                                    {call.aiSummary}
                                  </p>
                                  {call.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {call.tags.map(tag => (
                                        <span
                                          key={tag}
                                          className={`px-2 py-0.5 rounded-full text-xs ${
                                            isDark ? 'bg-white/10 text-gray-300' : 'bg-slate-200 text-slate-600'
                                          }`}
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                {call.recording && (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsPlaying(!isPlaying);
                                      }}
                                      className="p-2 rounded-full bg-primary text-black"
                                    >
                                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    </button>
                                    <button className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                                      <Download className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-slate-600'}`} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Attribution & UTM Info */}
                            {call.attribution && (
                              <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
                                <p className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                  <Target className="w-4 h-4 text-primary" />
                                  Атрибуция источника
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  {/* Traffic Team */}
                                  <div>
                                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Трафик-команда</p>
                                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                      {call.attribution.trafficTeamName || '—'}
                                    </p>
                                  </div>
                                  {/* Targetologist */}
                                  {call.attribution.targetologistName && (
                                    <div>
                                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Таргетолог</p>
                                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {call.attribution.targetologistName}
                                      </p>
                                    </div>
                                  )}
                                  {/* Ad Name */}
                                  {call.attribution.adName && (
                                    <div>
                                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Объявление</p>
                                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {call.attribution.adName}
                                      </p>
                                    </div>
                                  )}
                                  {/* Creative */}
                                  {call.attribution.creativeName && (
                                    <div>
                                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Креатив</p>
                                      <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {call.attribution.creativeName}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                {/* UTM Tags */}
                                {call.attribution.utmData && (
                                  <div className="mt-3 pt-3 border-t border-dashed ${isDark ? 'border-white/10' : 'border-slate-200'}">
                                    <p className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                      UTM-метки
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {call.attribution.utmData.utm_source && (
                                        <span className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                          source: {call.attribution.utmData.utm_source}
                                        </span>
                                      )}
                                      {call.attribution.utmData.utm_medium && (
                                        <span className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
                                          medium: {call.attribution.utmData.utm_medium}
                                        </span>
                                      )}
                                      {call.attribution.utmData.utm_campaign && (
                                        <span className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                                          campaign: {call.attribution.utmData.utm_campaign}
                                        </span>
                                      )}
                                      {call.attribution.utmData.utm_content && (
                                        <span className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-50 text-yellow-600'}`}>
                                          content: {call.attribution.utmData.utm_content}
                                        </span>
                                      )}
                                      {call.attribution.utmData.utm_term && (
                                        <span className={`px-2 py-1 rounded text-xs font-mono ${isDark ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>
                                          term: {call.attribution.utmData.utm_term}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Deep AI Analysis with Script Evaluation (Sipuni Integration) */}
                            {call.qualityScore && (() => {
                              const deepAnalysis = generateDeepCallAnalysis(call);
                              if (!deepAnalysis) return null;

                              return (
                                <div className={`p-4 rounded-xl border ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'}`}>
                                  {/* Header */}
                                  <div className="flex items-center justify-between mb-4">
                                    <p className={`text-sm font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                      <Zap className="w-4 h-4 text-purple-500" />
                                      Глубокий AI-анализ (Sipuni + GPT-4)
                                    </p>
                                    <div className="flex items-center gap-2">
                                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        deepAnalysis.scriptAdherence >= 80 ? 'bg-green-500/10 text-green-500' :
                                        deepAnalysis.scriptAdherence >= 50 ? 'bg-yellow-500/10 text-yellow-500' :
                                        'bg-red-500/10 text-red-500'
                                      }`}>
                                        Скрипт: {deepAnalysis.scriptAdherence}%
                                      </span>
                                      {deepAnalysis.sipuniData.transcriptionReady && (
                                        <span className="px-2 py-1 rounded text-xs bg-blue-500/10 text-blue-400 flex items-center gap-1">
                                          <Mic className="w-3 h-3" />
                                          Транскрипция
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Quality Explanation */}
                                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                                    {deepAnalysis.qualityExplanation}
                                  </p>

                                  {/* Script Evaluation Checklist */}
                                  <div className="mb-4">
                                    <p className={`text-xs font-medium mb-2 flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                      <FileText className="w-3 h-3" />
                                      Оценка по скрипту продаж
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                      {deepAnalysis.scriptEvaluation.map((step, idx) => (
                                        <div
                                          key={idx}
                                          className={`p-2 rounded-lg border ${
                                            step.followed
                                              ? isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
                                              : isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2 mb-1">
                                            {step.followed ? (
                                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                            ) : (
                                              <XCircle className="w-3.5 h-3.5 text-red-500" />
                                            )}
                                            <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                              {step.scriptStep}
                                            </span>
                                            <span className={`text-xs ml-auto ${step.followed ? 'text-green-500' : 'text-red-500'}`}>
                                              {step.qualityScore}/10
                                            </span>
                                          </div>
                                          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                                            {step.aiComment}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Strengths & Improvements */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className={`p-3 rounded-lg ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                                      <p className="text-xs font-medium text-green-500 mb-2 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Сильные стороны
                                      </p>
                                      <ul className="space-y-1">
                                        {deepAnalysis.strengths.map((s, i) => (
                                          <li key={i} className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>• {s}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className={`p-3 rounded-lg ${isDark ? 'bg-orange-500/10' : 'bg-orange-50'}`}>
                                      <p className="text-xs font-medium text-orange-500 mb-2 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        Рекомендации
                                      </p>
                                      <ul className="space-y-1">
                                        {deepAnalysis.improvements.map((s, i) => (
                                          <li key={i} className={`text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>• {s}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                  {/* Sipuni Integration Info */}
                                  <div className={`mt-3 pt-3 border-t border-dashed ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                                      📞 Sipuni API: запись {deepAnalysis.sipuniData.duration}сек • ожидание {deepAnalysis.sipuniData.waitTime}сек • ID: {deepAnalysis.sipuniData.callbackId}
                                    </p>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attribution Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`p-6 rounded-2xl border ${
          isDark
            ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-white/10'
            : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
        }`}
      >
        <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Как работает сквозная аналитика
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <span className="text-blue-500 font-bold">1</span>
            </div>
            <div>
              <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Трекинг источника</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Каждый звонок привязывается к рекламной кампании через UTM-метки
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-100'}`}>
              <span className="text-cyan-500 font-bold">2</span>
            </div>
            <div>
              <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>AI анализ</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Автоматическая транскрипция и оценка качества разговора
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
              <span className="text-green-500 font-bold">3</span>
            </div>
            <div>
              <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>ROI расчёт</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Автоматический расчёт возврата инвестиций по каждому каналу
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Strategy Popup */}
      <AIStrategyPopup
        isOpen={isAIPopupOpen}
        onClose={() => setIsAIPopupOpen(false)}
        context="calls"
      />
    </div>
  );
};
