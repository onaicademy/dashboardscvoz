/**
 * ShowToday AI Analytics - Mock Data for Traffic Teams, Trends, and Integrations
 */

import {
  TrafficTeam,
  Targetologist,
  TrendDataPoint,
  TrendAnalysis,
  TrendCorrelation,
  Integration,
  EnhancedCallAnalysis,
  CallScriptEvaluation,
  TimePeriod,
  TrendCategory
} from '../types/scoring';

// ===== ТАРГЕТОЛОГИ =====

export const MOCK_TARGETOLOGISTS: Targetologist[] = [
  {
    id: 'targ-1',
    name: 'Алексей Петров',
    avatar: undefined,
    campaigns: [
      { id: 'c1', name: 'Instagram Stories - Events', spend: 450000, leads: 89, conversions: 12, revenue: 1800000 },
      { id: 'c2', name: 'Facebook Feed - Corporate', spend: 320000, leads: 67, conversions: 8, revenue: 1200000 },
    ],
    metrics: {
      totalCampaigns: 5,
      totalSpend: 870000,
      totalRevenue: 3200000,
      totalLeads: 178,
      totalConversions: 24,
      avgCTR: 2.8,
      avgCPL: 4888
    },
    scores: {
      trafficQuality: 85,
      roi: 88,
      cpl: 82,
      ctr: 78
    },
    totalScore: 83,
    rank: 'A',
    trend: 'up',
    trendValue: 12,
    aiInsight: 'Отличные показатели ROI. Рекомендуется увеличить бюджет на Stories-кампании.',
    recommendations: ['Масштабировать Instagram Stories', 'Тестировать Reels']
  },
  {
    id: 'targ-2',
    name: 'Мария Сидорова',
    avatar: undefined,
    campaigns: [
      { id: 'c3', name: 'Instagram Reels - Youth', spend: 280000, leads: 124, conversions: 6, revenue: 720000 },
      { id: 'c4', name: 'TikTok Ads', spend: 180000, leads: 89, conversions: 4, revenue: 480000 },
    ],
    metrics: {
      totalCampaigns: 4,
      totalSpend: 520000,
      totalRevenue: 1320000,
      totalLeads: 245,
      totalConversions: 12,
      avgCTR: 3.4,
      avgCPL: 2122
    },
    scores: {
      trafficQuality: 52,
      roi: 45,
      cpl: 88,
      ctr: 92
    },
    totalScore: 58,
    rank: 'C',
    trend: 'down',
    trendValue: -8,
    aiInsight: 'Много лидов, но низкая конверсия. Проблема с качеством трафика.',
    recommendations: ['Пересмотреть таргетинг', 'Уточнить аудиторию', 'Улучшить квалификацию лидов']
  },
  {
    id: 'targ-3',
    name: 'Дмитрий Козлов',
    avatar: undefined,
    campaigns: [
      { id: 'c5', name: 'Google Ads - Search', spend: 650000, leads: 156, conversions: 28, revenue: 4200000 },
    ],
    metrics: {
      totalCampaigns: 3,
      totalSpend: 750000,
      totalRevenue: 4800000,
      totalLeads: 189,
      totalConversions: 34,
      avgCTR: 4.1,
      avgCPL: 3968
    },
    scores: {
      trafficQuality: 92,
      roi: 95,
      cpl: 78,
      ctr: 88
    },
    totalScore: 91,
    rank: 'S',
    trend: 'up',
    trendValue: 18,
    aiInsight: 'Лучший показатель конверсии в команде. Эталонный таргетолог.',
    recommendations: ['Обучить коллег методам работы', 'Увеличить бюджет']
  },
  {
    id: 'targ-4',
    name: 'Анна Волкова',
    avatar: undefined,
    campaigns: [
      { id: 'c6', name: 'VK Ads', spend: 180000, leads: 34, conversions: 2, revenue: 240000 },
    ],
    metrics: {
      totalCampaigns: 2,
      totalSpend: 220000,
      totalRevenue: 280000,
      totalLeads: 42,
      totalConversions: 3,
      avgCTR: 1.2,
      avgCPL: 5238
    },
    scores: {
      trafficQuality: 28,
      roi: 22,
      cpl: 35,
      ctr: 32
    },
    totalScore: 29,
    rank: 'D',
    trend: 'down',
    trendValue: -15,
    aiInsight: 'Критически низкие показатели. Требуется срочное обучение или замена.',
    recommendations: ['Пройти обучение', 'Сменить площадку', 'Работать под наставничеством']
  }
];

// ===== ТРАФИК-КОМАНДЫ =====

export const MOCK_TRAFFIC_TEAMS: TrafficTeam[] = [
  {
    id: 'team-1',
    name: 'Агентство Digital Astana',
    members: [MOCK_TARGETOLOGISTS[0], MOCK_TARGETOLOGISTS[2]],
    metrics: {
      totalSpend: 1620000,
      totalRevenue: 8000000,
      totalLeads: 367,
      totalConversions: 58,
      avgCPL: 4414,
      avgROI: 393,
      avgCTR: 3.45
    },
    totalScore: 87,
    rank: 'A',
    trend: 'up',
    trendValue: 15,
    recommendation: 'expand',
    aiInsight: 'Высокоэффективная команда. Рекомендуется увеличить бюджет и добавить специалиста.'
  },
  {
    id: 'team-2',
    name: 'Агентство Target.KZ',
    members: [MOCK_TARGETOLOGISTS[1], MOCK_TARGETOLOGISTS[3]],
    metrics: {
      totalSpend: 740000,
      totalRevenue: 1600000,
      totalLeads: 287,
      totalConversions: 15,
      avgCPL: 2579,
      avgROI: 116,
      avgCTR: 2.3
    },
    totalScore: 44,
    rank: 'D',
    trend: 'down',
    trendValue: -12,
    recommendation: 'train',
    aiInsight: 'Команда нуждается в обучении. Много лидов, но очень низкая конверсия. Рассмотреть замену слабого звена.'
  }
];

// ===== ДАННЫЕ ТРЕНДОВ =====

const generateTrendData = (period: TimePeriod, category: TrendCategory): TrendDataPoint[] => {
  const days = period === 'week' ? 7 : period === 'month' ? 30 : 90;
  const data: TrendDataPoint[] = [];

  const baseValues: Record<TrendCategory, number> = {
    calls: 45,
    whatsapp: 120,
    decisions: 8
  };

  const volatility: Record<TrendCategory, number> = {
    calls: 15,
    whatsapp: 40,
    decisions: 4
  };

  const base = baseValues[category];
  const vol = volatility[category];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));

    const trend = Math.sin(i / 5) * vol * 0.3;
    const noise = (Math.random() - 0.5) * vol;
    const growth = i * 0.1;

    const value = Math.max(0, Math.round(base + trend + noise + growth));

    const actions: TrendDataPoint['actions'] = [];

    // Add some actions at specific points
    if (i === Math.floor(days * 0.3)) {
      actions.push({
        id: `action-${category}-1`,
        type: 'campaign_change',
        description: 'Запущена новая рекламная кампания',
        impact: 15,
        timestamp: date
      });
    }
    if (i === Math.floor(days * 0.6)) {
      actions.push({
        id: `action-${category}-2`,
        type: 'manager_action',
        description: 'Обучение менеджеров по скриптам',
        impact: 8,
        timestamp: date
      });
    }
    if (i === Math.floor(days * 0.8)) {
      actions.push({
        id: `action-${category}-3`,
        type: 'creative_update',
        description: 'Обновлены креативы',
        impact: 12,
        timestamp: date
      });
    }

    data.push({
      date: date.toISOString().split('T')[0],
      value,
      actions: actions.length > 0 ? actions : undefined
    });
  }

  return data;
};

const generateCorrelations = (category: TrendCategory): TrendCorrelation[] => {
  const correlations: Record<TrendCategory, TrendCorrelation[]> = {
    calls: [
      { action: 'Увеличение бюджета на рекламу', metric: 'Количество звонков', impactPercentage: 23, confidence: 87 },
      { action: 'Обновление скриптов продаж', metric: 'Качество звонков', impactPercentage: 15, confidence: 72 },
      { action: 'Изменение времени работы', metric: 'Ответы на звонки', impactPercentage: 31, confidence: 91 }
    ],
    whatsapp: [
      { action: 'Запуск WhatsApp кампании', metric: 'Входящие сообщения', impactPercentage: 45, confidence: 94 },
      { action: 'Автоответчик в нерабочее время', metric: 'Скорость ответа', impactPercentage: 67, confidence: 89 },
      { action: 'Шаблоны сообщений', metric: 'Конверсия в диалог', impactPercentage: 18, confidence: 76 }
    ],
    decisions: [
      { action: 'Обучение менеджеров', metric: 'Закрытие сделок', impactPercentage: 28, confidence: 85 },
      { action: 'Улучшение таргетинга', metric: 'Качество лидов', impactPercentage: 35, confidence: 82 },
      { action: 'Скидочная акция', metric: 'Конверсия в сделку', impactPercentage: 42, confidence: 93 }
    ]
  };

  return correlations[category];
};

const generatePatterns = (category: TrendCategory): string[] => {
  const patterns: Record<TrendCategory, string[]> = {
    calls: [
      'Пик активности в 10:00-12:00 и 15:00-17:00',
      'Понедельник — день максимума входящих',
      'После запуска рекламы рост на 23% в течение 3 дней',
      'Корреляция между временем ответа и конверсией: -0.72'
    ],
    whatsapp: [
      'Вечерние часы (19:00-22:00) дают +40% сообщений',
      'Выходные показывают стабильный трафик',
      'Средняя длина диалога: 12 сообщений до решения',
      'Быстрый ответ (<5 мин) увеличивает конверсию на 35%'
    ],
    decisions: [
      'Средний цикл сделки: 4.2 дня',
      'Четверг и пятница — дни максимума решений',
      'После 3-го касания конверсия растёт на 45%',
      'Лиды из Instagram конвертируются лучше на 18%'
    ]
  };

  return patterns[category];
};

export const getTrendAnalysis = (period: TimePeriod, category: TrendCategory): TrendAnalysis => {
  return {
    category,
    period,
    data: generateTrendData(period, category),
    aiIdentifiedPatterns: generatePatterns(category),
    correlations: generateCorrelations(category)
  };
};

// ===== ИНТЕГРАЦИИ =====

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: 'int-1',
    type: 'bitrix24',
    name: 'Bitrix24',
    status: 'connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    healthScore: 98,
    config: {
      webhook: 'https://showtoday.bitrix24.kz/rest/...',
      syncInterval: 5,
      entities: ['leads', 'deals', 'contacts']
    },
    errors: []
  },
  {
    id: 'int-2',
    type: 'whatsapp',
    name: 'WhatsApp Business',
    status: 'connected',
    lastSync: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    healthScore: 92,
    config: {
      phoneNumber: '+7 (777) 123-45-67',
      businessId: 'wa_business_123',
      autoReply: true
    },
    errors: []
  }
];

// ===== ГЛУБОКИЙ АНАЛИЗ ЗВОНКОВ =====

export const MOCK_CALL_SCRIPT_STEPS = [
  { id: 'step-1', name: 'Приветствие', description: 'Поздороваться и представиться' },
  { id: 'step-2', name: 'Выявление потребности', description: 'Узнать, какое мероприятие планируется' },
  { id: 'step-3', name: 'Уточнение деталей', description: 'Дата, количество гостей, бюджет' },
  { id: 'step-4', name: 'Презентация', description: 'Рассказать о подходящих вариантах' },
  { id: 'step-5', name: 'Работа с возражениями', description: 'Ответить на вопросы и сомнения' },
  { id: 'step-6', name: 'Закрытие', description: 'Предложить следующий шаг (встреча/КП)' }
];

export const generateEnhancedCallAnalysis = (callId: string, qualityScore: number): EnhancedCallAnalysis => {
  const isGood = qualityScore >= 7;
  const isMedium = qualityScore >= 5 && qualityScore < 7;

  const scriptEvaluation: CallScriptEvaluation[] = MOCK_CALL_SCRIPT_STEPS.map((step, index) => {
    const followed = isGood ? Math.random() > 0.2 : isMedium ? Math.random() > 0.4 : Math.random() > 0.6;
    return {
      scriptStep: step.name,
      followed,
      qualityScore: followed ? Math.floor(Math.random() * 3) + 7 : Math.floor(Math.random() * 4) + 3,
      aiComment: followed
        ? `${step.name} выполнено корректно`
        : `${step.name} пропущено или выполнено некачественно`
    };
  });

  const strengths = isGood
    ? ['Хорошее выявление потребности', 'Грамотная презентация', 'Активное слушание']
    : isMedium
    ? ['Приятный тон общения', 'Базовое знание продукта']
    : ['Вежливость'];

  const weaknesses = isGood
    ? ['Можно улучшить работу с возражениями']
    : isMedium
    ? ['Пропущен этап выявления потребности', 'Слабое закрытие']
    : ['Не следовал скрипту', 'Не выявил потребность', 'Не предложил следующий шаг', 'Монотонная речь'];

  const recommendations = isGood
    ? ['Продолжать в том же духе', 'Делиться опытом с коллегами']
    : isMedium
    ? ['Пройти тренинг по закрытию сделок', 'Отработать скрипт с руководителем']
    : ['Срочно пройти обучение', 'Работать с наставником', 'Прослушать записи лучших менеджеров'];

  return {
    callId,
    qualityScore,
    qualityExplanation: isGood
      ? 'Звонок проведён профессионально. Менеджер следовал скрипту, выявил потребности клиента и предложил релевантное решение.'
      : isMedium
      ? 'Звонок средний. Менеджер пропустил несколько этапов скрипта, что снизило вероятность конверсии.'
      : 'Звонок требует внимания. Менеджер не следовал скрипту, не выявил потребности и не предложил чёткого следующего шага.',
    scriptEvaluation,
    dealOutcome: isGood ? 'success' : isMedium ? 'pending' : 'failed',
    strengths,
    weaknesses,
    aiRecommendations: recommendations
  };
};

// ===== СТАТИСТИКА МЕНЕДЖЕРОВ ПО ЗВОНКАМ =====

export interface ManagerCallStats {
  managerId: string;
  managerName: string;
  totalCalls: number;
  successfulDeals: number;
  failedDeals: number;
  pendingDeals: number;
  avgQualityScore: number;
  scriptAdherence: number; // 0-100%
  conversionRate: number;
}

export const MOCK_MANAGER_CALL_STATS: ManagerCallStats[] = [
  {
    managerId: 'mgr-1',
    managerName: 'Айгуль Нурланова',
    totalCalls: 156,
    successfulDeals: 28,
    failedDeals: 89,
    pendingDeals: 39,
    avgQualityScore: 8.2,
    scriptAdherence: 92,
    conversionRate: 17.9
  },
  {
    managerId: 'mgr-2',
    managerName: 'Бауыржан Касымов',
    totalCalls: 134,
    successfulDeals: 15,
    failedDeals: 98,
    pendingDeals: 21,
    avgQualityScore: 6.1,
    scriptAdherence: 68,
    conversionRate: 11.2
  },
  {
    managerId: 'mgr-3',
    managerName: 'Дана Ермекова',
    totalCalls: 98,
    successfulDeals: 22,
    failedDeals: 52,
    pendingDeals: 24,
    avgQualityScore: 7.8,
    scriptAdherence: 85,
    conversionRate: 22.4
  },
  {
    managerId: 'mgr-4',
    managerName: 'Ерлан Сатыбалдиев',
    totalCalls: 112,
    successfulDeals: 8,
    failedDeals: 87,
    pendingDeals: 17,
    avgQualityScore: 4.5,
    scriptAdherence: 42,
    conversionRate: 7.1
  }
];
