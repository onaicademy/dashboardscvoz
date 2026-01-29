// ShowToday Branch/City Data
// Данные по филиалам ShowToday в Казахстане

import { FunnelStageData, Manager, LeadSource, AIRecommendation, Creative, Rank, Trend } from '../types/scoring';

export type CityCode = 'all' | 'almaty' | 'astana' | 'shymkent' | 'aktobe' | 'karaganda' | 'aktau' | 'atyrau' | 'kostanay' | 'petropavlovsk' | 'taraz' | 'turkestan';

export interface Branch {
  code: CityCode;
  name: string;
  nameKz: string;
  region: string;
  isActive: boolean;
  managersCount: number;
  monthlyRevenue: number;
  monthlyLeads: number;
  monthlyDeals: number;
  avgConversion: number;
  topManager?: string;
}

export const BRANCHES: Branch[] = [
  {
    code: 'almaty',
    name: 'Алматы',
    nameKz: 'Алматы',
    region: 'Алматинская область',
    isActive: true,
    managersCount: 8,
    monthlyRevenue: 12500000,
    monthlyLeads: 245,
    monthlyDeals: 42,
    avgConversion: 17.1,
    topManager: 'Айгерим К.'
  },
  {
    code: 'astana',
    name: 'Астана',
    nameKz: 'Астана',
    region: 'Акмолинская область',
    isActive: true,
    managersCount: 6,
    monthlyRevenue: 9800000,
    monthlyLeads: 198,
    monthlyDeals: 35,
    avgConversion: 17.7,
    topManager: 'Данияр М.'
  },
  {
    code: 'shymkent',
    name: 'Шымкент',
    nameKz: 'Шымкент',
    region: 'Туркестанская область',
    isActive: true,
    managersCount: 5,
    monthlyRevenue: 6200000,
    monthlyLeads: 156,
    monthlyDeals: 28,
    avgConversion: 17.9,
    topManager: 'Жанна Б.'
  },
  {
    code: 'aktobe',
    name: 'Актобе',
    nameKz: 'Ақтөбе',
    region: 'Актюбинская область',
    isActive: true,
    managersCount: 4,
    monthlyRevenue: 4500000,
    monthlyLeads: 112,
    monthlyDeals: 19,
    avgConversion: 17.0,
    topManager: 'Асель Т.'
  },
  {
    code: 'karaganda',
    name: 'Караганда',
    nameKz: 'Қарағанды',
    region: 'Карагандинская область',
    isActive: true,
    managersCount: 4,
    monthlyRevenue: 5100000,
    monthlyLeads: 134,
    monthlyDeals: 24,
    avgConversion: 17.9,
    topManager: 'Марат К.'
  },
  {
    code: 'aktau',
    name: 'Актау',
    nameKz: 'Ақтау',
    region: 'Мангистауская область',
    isActive: true,
    managersCount: 3,
    monthlyRevenue: 3800000,
    monthlyLeads: 89,
    monthlyDeals: 16,
    avgConversion: 18.0,
    topManager: 'Нурлан С.'
  },
  {
    code: 'atyrau',
    name: 'Атырау',
    nameKz: 'Атырау',
    region: 'Атырауская область',
    isActive: true,
    managersCount: 3,
    monthlyRevenue: 4200000,
    monthlyLeads: 98,
    monthlyDeals: 18,
    avgConversion: 18.4,
    topManager: 'Ерлан А.'
  },
  {
    code: 'kostanay',
    name: 'Костанай',
    nameKz: 'Қостанай',
    region: 'Костанайская область',
    isActive: true,
    managersCount: 3,
    monthlyRevenue: 2900000,
    monthlyLeads: 78,
    monthlyDeals: 14,
    avgConversion: 17.9,
    topManager: 'Гульнара М.'
  },
  {
    code: 'petropavlovsk',
    name: 'Петропавловск',
    nameKz: 'Петропавл',
    region: 'Северо-Казахстанская область',
    isActive: true,
    managersCount: 2,
    monthlyRevenue: 2100000,
    monthlyLeads: 56,
    monthlyDeals: 10,
    avgConversion: 17.9,
    topManager: 'Виктор Н.'
  },
  {
    code: 'taraz',
    name: 'Тараз',
    nameKz: 'Тараз',
    region: 'Жамбылская область',
    isActive: true,
    managersCount: 3,
    monthlyRevenue: 2800000,
    monthlyLeads: 72,
    monthlyDeals: 13,
    avgConversion: 18.1,
    topManager: 'Алия К.'
  },
  {
    code: 'turkestan',
    name: 'Туркестан',
    nameKz: 'Түркістан',
    region: 'Туркестанская область',
    isActive: true,
    managersCount: 2,
    monthlyRevenue: 1800000,
    monthlyLeads: 48,
    monthlyDeals: 9,
    avgConversion: 18.8,
    topManager: 'Бахыт О.'
  }
];

// Funnel data by city
export const FUNNEL_BY_CITY: Record<CityCode, FunnelStageData[]> = {
  all: [
    { stage: 'new', name: 'Новые заявки', count: 1286, value: 0, spend: 645000, conversionRate: 100, avgTimeInStage: 2, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 1028, value: 0, spend: 0, conversionRate: 80, avgTimeInStage: 4, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 642, value: 0, spend: 0, conversionRate: 62, avgTimeInStage: 12, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 385, value: 0, spend: 0, conversionRate: 60, avgTimeInStage: 24, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 270, value: 0, spend: 0, conversionRate: 70, avgTimeInStage: 48, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 228, value: 55700000, spend: 0, conversionRate: 84, avgTimeInStage: 0, color: '#22C55E' },
  ],
  almaty: [
    { stage: 'new', name: 'Новые заявки', count: 245, value: 0, spend: 185000, conversionRate: 100, avgTimeInStage: 2, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 198, value: 0, spend: 0, conversionRate: 81, avgTimeInStage: 3, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 124, value: 0, spend: 0, conversionRate: 63, avgTimeInStage: 10, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 78, value: 0, spend: 0, conversionRate: 63, avgTimeInStage: 20, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 56, value: 0, spend: 0, conversionRate: 72, avgTimeInStage: 36, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 42, value: 12500000, spend: 0, conversionRate: 75, avgTimeInStage: 0, color: '#22C55E' },
  ],
  astana: [
    { stage: 'new', name: 'Новые заявки', count: 198, value: 0, spend: 145000, conversionRate: 100, avgTimeInStage: 2, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 162, value: 0, spend: 0, conversionRate: 82, avgTimeInStage: 3, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 98, value: 0, spend: 0, conversionRate: 60, avgTimeInStage: 11, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 62, value: 0, spend: 0, conversionRate: 63, avgTimeInStage: 22, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 48, value: 0, spend: 0, conversionRate: 77, avgTimeInStage: 42, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 35, value: 9800000, spend: 0, conversionRate: 73, avgTimeInStage: 0, color: '#22C55E' },
  ],
  shymkent: [
    { stage: 'new', name: 'Новые заявки', count: 156, value: 0, spend: 78000, conversionRate: 100, avgTimeInStage: 2, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 128, value: 0, spend: 0, conversionRate: 82, avgTimeInStage: 4, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 78, value: 0, spend: 0, conversionRate: 61, avgTimeInStage: 14, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 48, value: 0, spend: 0, conversionRate: 62, avgTimeInStage: 26, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 36, value: 0, spend: 0, conversionRate: 75, avgTimeInStage: 52, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 28, value: 6200000, spend: 0, conversionRate: 78, avgTimeInStage: 0, color: '#22C55E' },
  ],
  aktobe: [
    { stage: 'new', name: 'Новые заявки', count: 112, value: 0, spend: 52000, conversionRate: 100, avgTimeInStage: 3, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 89, value: 0, spend: 0, conversionRate: 79, avgTimeInStage: 5, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 52, value: 0, spend: 0, conversionRate: 58, avgTimeInStage: 15, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 32, value: 0, spend: 0, conversionRate: 62, avgTimeInStage: 28, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 24, value: 0, spend: 0, conversionRate: 75, avgTimeInStage: 56, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 19, value: 4500000, spend: 0, conversionRate: 79, avgTimeInStage: 0, color: '#22C55E' },
  ],
  karaganda: [
    { stage: 'new', name: 'Новые заявки', count: 134, value: 0, spend: 58000, conversionRate: 100, avgTimeInStage: 2, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 108, value: 0, spend: 0, conversionRate: 81, avgTimeInStage: 4, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 67, value: 0, spend: 0, conversionRate: 62, avgTimeInStage: 13, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 42, value: 0, spend: 0, conversionRate: 63, avgTimeInStage: 25, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 32, value: 0, spend: 0, conversionRate: 76, avgTimeInStage: 50, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 24, value: 5100000, spend: 0, conversionRate: 75, avgTimeInStage: 0, color: '#22C55E' },
  ],
  aktau: [
    { stage: 'new', name: 'Новые заявки', count: 89, value: 0, spend: 38000, conversionRate: 100, avgTimeInStage: 3, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 72, value: 0, spend: 0, conversionRate: 81, avgTimeInStage: 5, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 45, value: 0, spend: 0, conversionRate: 63, avgTimeInStage: 14, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 28, value: 0, spend: 0, conversionRate: 62, avgTimeInStage: 26, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 21, value: 0, spend: 0, conversionRate: 75, avgTimeInStage: 54, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 16, value: 3800000, spend: 0, conversionRate: 76, avgTimeInStage: 0, color: '#22C55E' },
  ],
  atyrau: [
    { stage: 'new', name: 'Новые заявки', count: 98, value: 0, spend: 42000, conversionRate: 100, avgTimeInStage: 2, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 81, value: 0, spend: 0, conversionRate: 83, avgTimeInStage: 4, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 52, value: 0, spend: 0, conversionRate: 64, avgTimeInStage: 12, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 34, value: 0, spend: 0, conversionRate: 65, avgTimeInStage: 24, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 26, value: 0, spend: 0, conversionRate: 76, avgTimeInStage: 48, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 18, value: 4200000, spend: 0, conversionRate: 69, avgTimeInStage: 0, color: '#22C55E' },
  ],
  kostanay: [
    { stage: 'new', name: 'Новые заявки', count: 78, value: 0, spend: 28000, conversionRate: 100, avgTimeInStage: 3, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 62, value: 0, spend: 0, conversionRate: 79, avgTimeInStage: 5, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 38, value: 0, spend: 0, conversionRate: 61, avgTimeInStage: 16, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 24, value: 0, spend: 0, conversionRate: 63, avgTimeInStage: 28, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 18, value: 0, spend: 0, conversionRate: 75, avgTimeInStage: 58, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 14, value: 2900000, spend: 0, conversionRate: 78, avgTimeInStage: 0, color: '#22C55E' },
  ],
  petropavlovsk: [
    { stage: 'new', name: 'Новые заявки', count: 56, value: 0, spend: 18000, conversionRate: 100, avgTimeInStage: 3, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 45, value: 0, spend: 0, conversionRate: 80, avgTimeInStage: 6, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 28, value: 0, spend: 0, conversionRate: 62, avgTimeInStage: 18, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 17, value: 0, spend: 0, conversionRate: 61, avgTimeInStage: 32, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 13, value: 0, spend: 0, conversionRate: 76, avgTimeInStage: 62, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 10, value: 2100000, spend: 0, conversionRate: 77, avgTimeInStage: 0, color: '#22C55E' },
  ],
  taraz: [
    { stage: 'new', name: 'Новые заявки', count: 72, value: 0, spend: 24000, conversionRate: 100, avgTimeInStage: 3, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 58, value: 0, spend: 0, conversionRate: 81, avgTimeInStage: 5, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 36, value: 0, spend: 0, conversionRate: 62, avgTimeInStage: 15, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 22, value: 0, spend: 0, conversionRate: 61, avgTimeInStage: 30, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 17, value: 0, spend: 0, conversionRate: 77, avgTimeInStage: 56, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 13, value: 2800000, spend: 0, conversionRate: 76, avgTimeInStage: 0, color: '#22C55E' },
  ],
  turkestan: [
    { stage: 'new', name: 'Новые заявки', count: 48, value: 0, spend: 12000, conversionRate: 100, avgTimeInStage: 4, color: '#6366F1' },
    { stage: 'contacted', name: 'Связались', count: 38, value: 0, spend: 0, conversionRate: 79, avgTimeInStage: 6, color: '#8B5CF6' },
    { stage: 'qualified', name: 'Квалифицированы', count: 24, value: 0, spend: 0, conversionRate: 63, avgTimeInStage: 18, color: '#A855F7' },
    { stage: 'proposal', name: 'КП отправлено', count: 15, value: 0, spend: 0, conversionRate: 63, avgTimeInStage: 32, color: '#EC4899' },
    { stage: 'negotiation', name: 'Переговоры', count: 12, value: 0, spend: 0, conversionRate: 80, avgTimeInStage: 60, color: '#F43F5E' },
    { stage: 'closed', name: 'Закрыты', count: 9, value: 1800000, spend: 0, conversionRate: 75, avgTimeInStage: 0, color: '#22C55E' },
  ],
};

// Managers by city
export const MANAGERS_BY_CITY: Record<CityCode, Manager[]> = {
  all: [], // Will be populated by combining all cities
  almaty: [
    {
      id: 'alm-1',
      name: 'Айгерим Касымова',
      avatar: '',
      role: 'Старший менеджер',
      metrics: {
        totalScore: 92,
        responseTime: 8,
        qualityScore: 94,
        conversionRate: 21.5,
        avgDealSize: 298000,
        totalLeads: 45,
        totalDeals: 10,
        totalRevenue: 2980000,
        messagesCount: 234,
        avgResponseRate: 96
      },
      rank: 'gold' as Rank,
      trend: 'up' as Trend,
      recentActivity: '5 мин назад',
      activeLeads: 12,
      pendingTasks: 3
    },
    {
      id: 'alm-2',
      name: 'Бахыт Нурланов',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 87,
        responseTime: 12,
        qualityScore: 88,
        conversionRate: 18.2,
        avgDealSize: 275000,
        totalLeads: 38,
        totalDeals: 7,
        totalRevenue: 1925000,
        messagesCount: 189,
        avgResponseRate: 92
      },
      rank: 'silver' as Rank,
      trend: 'up' as Trend,
      recentActivity: '15 мин назад',
      activeLeads: 9,
      pendingTasks: 5
    },
    {
      id: 'alm-3',
      name: 'Гульнара Ахметова',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 84,
        responseTime: 15,
        qualityScore: 85,
        conversionRate: 16.8,
        avgDealSize: 265000,
        totalLeads: 42,
        totalDeals: 7,
        totalRevenue: 1855000,
        messagesCount: 198,
        avgResponseRate: 89
      },
      rank: 'silver' as Rank,
      trend: 'stable' as Trend,
      recentActivity: '30 мин назад',
      activeLeads: 11,
      pendingTasks: 4
    },
    {
      id: 'alm-4',
      name: 'Дамир Сериков',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 81,
        responseTime: 18,
        qualityScore: 82,
        conversionRate: 15.4,
        avgDealSize: 248000,
        totalLeads: 35,
        totalDeals: 5,
        totalRevenue: 1240000,
        messagesCount: 156,
        avgResponseRate: 85
      },
      rank: 'bronze' as Rank,
      trend: 'down' as Trend,
      recentActivity: '1 час назад',
      activeLeads: 8,
      pendingTasks: 7
    },
  ],
  astana: [
    {
      id: 'ast-1',
      name: 'Данияр Муратов',
      avatar: '',
      role: 'Старший менеджер',
      metrics: {
        totalScore: 90,
        responseTime: 10,
        qualityScore: 91,
        conversionRate: 20.1,
        avgDealSize: 285000,
        totalLeads: 42,
        totalDeals: 8,
        totalRevenue: 2280000,
        messagesCount: 212,
        avgResponseRate: 94
      },
      rank: 'gold' as Rank,
      trend: 'up' as Trend,
      recentActivity: '10 мин назад',
      activeLeads: 10,
      pendingTasks: 2
    },
    {
      id: 'ast-2',
      name: 'Елена Павлова',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 85,
        responseTime: 14,
        qualityScore: 87,
        conversionRate: 17.5,
        avgDealSize: 268000,
        totalLeads: 36,
        totalDeals: 6,
        totalRevenue: 1608000,
        messagesCount: 178,
        avgResponseRate: 90
      },
      rank: 'silver' as Rank,
      trend: 'stable' as Trend,
      recentActivity: '25 мин назад',
      activeLeads: 8,
      pendingTasks: 4
    },
    {
      id: 'ast-3',
      name: 'Жандос Омаров',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 82,
        responseTime: 16,
        qualityScore: 84,
        conversionRate: 16.2,
        avgDealSize: 255000,
        totalLeads: 38,
        totalDeals: 6,
        totalRevenue: 1530000,
        messagesCount: 165,
        avgResponseRate: 87
      },
      rank: 'bronze' as Rank,
      trend: 'up' as Trend,
      recentActivity: '45 мин назад',
      activeLeads: 9,
      pendingTasks: 5
    },
  ],
  shymkent: [
    {
      id: 'shm-1',
      name: 'Жанна Бекетова',
      avatar: '',
      role: 'Старший менеджер',
      metrics: {
        totalScore: 88,
        responseTime: 11,
        qualityScore: 89,
        conversionRate: 19.2,
        avgDealSize: 228000,
        totalLeads: 38,
        totalDeals: 7,
        totalRevenue: 1596000,
        messagesCount: 198,
        avgResponseRate: 93
      },
      rank: 'silver' as Rank,
      trend: 'up' as Trend,
      recentActivity: '8 мин назад',
      activeLeads: 9,
      pendingTasks: 3
    },
    {
      id: 'shm-2',
      name: 'Кайрат Есенов',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 83,
        responseTime: 15,
        qualityScore: 85,
        conversionRate: 17.1,
        avgDealSize: 218000,
        totalLeads: 35,
        totalDeals: 6,
        totalRevenue: 1308000,
        messagesCount: 167,
        avgResponseRate: 88
      },
      rank: 'bronze' as Rank,
      trend: 'stable' as Trend,
      recentActivity: '35 мин назад',
      activeLeads: 7,
      pendingTasks: 4
    },
  ],
  aktobe: [
    {
      id: 'akt-1',
      name: 'Асель Толеубаева',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 86,
        responseTime: 12,
        qualityScore: 88,
        conversionRate: 18.5,
        avgDealSize: 238000,
        totalLeads: 32,
        totalDeals: 6,
        totalRevenue: 1428000,
        messagesCount: 156,
        avgResponseRate: 91
      },
      rank: 'silver' as Rank,
      trend: 'up' as Trend,
      recentActivity: '12 мин назад',
      activeLeads: 8,
      pendingTasks: 2
    },
    {
      id: 'akt-2',
      name: 'Мирас Жумабаев',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 79,
        responseTime: 18,
        qualityScore: 81,
        conversionRate: 15.2,
        avgDealSize: 225000,
        totalLeads: 28,
        totalDeals: 4,
        totalRevenue: 900000,
        messagesCount: 134,
        avgResponseRate: 84
      },
      rank: 'bronze' as Rank,
      trend: 'stable' as Trend,
      recentActivity: '1 час назад',
      activeLeads: 6,
      pendingTasks: 5
    },
  ],
  karaganda: [
    {
      id: 'kar-1',
      name: 'Марат Кенжебаев',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 87,
        responseTime: 11,
        qualityScore: 89,
        conversionRate: 18.8,
        avgDealSize: 215000,
        totalLeads: 36,
        totalDeals: 7,
        totalRevenue: 1505000,
        messagesCount: 178,
        avgResponseRate: 92
      },
      rank: 'silver' as Rank,
      trend: 'up' as Trend,
      recentActivity: '15 мин назад',
      activeLeads: 9,
      pendingTasks: 3
    },
    {
      id: 'kar-2',
      name: 'Наргиза Сулейменова',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 82,
        responseTime: 16,
        qualityScore: 84,
        conversionRate: 16.4,
        avgDealSize: 208000,
        totalLeads: 32,
        totalDeals: 5,
        totalRevenue: 1040000,
        messagesCount: 145,
        avgResponseRate: 86
      },
      rank: 'bronze' as Rank,
      trend: 'stable' as Trend,
      recentActivity: '40 мин назад',
      activeLeads: 7,
      pendingTasks: 4
    },
  ],
  aktau: [
    {
      id: 'aktu-1',
      name: 'Нурлан Сагинов',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 85,
        responseTime: 13,
        qualityScore: 87,
        conversionRate: 18.0,
        avgDealSize: 242000,
        totalLeads: 28,
        totalDeals: 5,
        totalRevenue: 1210000,
        messagesCount: 134,
        avgResponseRate: 90
      },
      rank: 'silver' as Rank,
      trend: 'up' as Trend,
      recentActivity: '20 мин назад',
      activeLeads: 6,
      pendingTasks: 2
    },
  ],
  atyrau: [
    {
      id: 'atr-1',
      name: 'Ерлан Алиев',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 86,
        responseTime: 12,
        qualityScore: 88,
        conversionRate: 18.4,
        avgDealSize: 235000,
        totalLeads: 30,
        totalDeals: 6,
        totalRevenue: 1410000,
        messagesCount: 145,
        avgResponseRate: 91
      },
      rank: 'silver' as Rank,
      trend: 'stable' as Trend,
      recentActivity: '18 мин назад',
      activeLeads: 7,
      pendingTasks: 3
    },
  ],
  kostanay: [
    {
      id: 'kos-1',
      name: 'Гульнара Мусина',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 84,
        responseTime: 14,
        qualityScore: 86,
        conversionRate: 17.9,
        avgDealSize: 208000,
        totalLeads: 26,
        totalDeals: 5,
        totalRevenue: 1040000,
        messagesCount: 123,
        avgResponseRate: 89
      },
      rank: 'bronze' as Rank,
      trend: 'up' as Trend,
      recentActivity: '25 мин назад',
      activeLeads: 5,
      pendingTasks: 2
    },
  ],
  petropavlovsk: [
    {
      id: 'pet-1',
      name: 'Виктор Николаев',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 83,
        responseTime: 15,
        qualityScore: 85,
        conversionRate: 17.9,
        avgDealSize: 212000,
        totalLeads: 22,
        totalDeals: 4,
        totalRevenue: 848000,
        messagesCount: 98,
        avgResponseRate: 88
      },
      rank: 'bronze' as Rank,
      trend: 'stable' as Trend,
      recentActivity: '35 мин назад',
      activeLeads: 4,
      pendingTasks: 2
    },
  ],
  taraz: [
    {
      id: 'tar-1',
      name: 'Алия Кенжетаева',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 85,
        responseTime: 13,
        qualityScore: 87,
        conversionRate: 18.1,
        avgDealSize: 218000,
        totalLeads: 24,
        totalDeals: 4,
        totalRevenue: 872000,
        messagesCount: 112,
        avgResponseRate: 90
      },
      rank: 'silver' as Rank,
      trend: 'up' as Trend,
      recentActivity: '22 мин назад',
      activeLeads: 5,
      pendingTasks: 3
    },
  ],
  turkestan: [
    {
      id: 'tur-1',
      name: 'Бахыт Оразбаев',
      avatar: '',
      role: 'Менеджер',
      metrics: {
        totalScore: 82,
        responseTime: 16,
        qualityScore: 84,
        conversionRate: 18.8,
        avgDealSize: 202000,
        totalLeads: 18,
        totalDeals: 3,
        totalRevenue: 606000,
        messagesCount: 78,
        avgResponseRate: 86
      },
      rank: 'bronze' as Rank,
      trend: 'stable' as Trend,
      recentActivity: '45 мин назад',
      activeLeads: 3,
      pendingTasks: 2
    },
  ],
};

// Populate "all" with combined managers
MANAGERS_BY_CITY.all = Object.values(MANAGERS_BY_CITY)
  .filter((managers, index) => index > 0) // Skip 'all' itself
  .flat()
  .sort((a, b) => b.metrics.totalScore - a.metrics.totalScore);

// AI Recommendations by city
export const RECOMMENDATIONS_BY_CITY: Record<CityCode, AIRecommendation[]> = {
  all: [
    {
      id: 'rec-all-1',
      type: 'SCALE_OPPORTUNITY',
      priority: 'high',
      title: 'Масштабировать кампанию в Алматы',
      insight: 'ROI кампании "Свадьбы 2026" в Алматы составляет 871%. Можно увеличить бюджет на 20%.',
      recommendation: 'Увеличить бюджет на Instagram для Алматы',
      expectedImpact: 'Дополнительно 8-12 лидов в неделю',
      confidence: 85,
      target: { type: 'Город', name: 'Алматы' },
    },
    {
      id: 'rec-all-2',
      type: 'MANAGER_UNDERPERFORM',
      priority: 'medium',
      title: 'Конверсия в Актобе ниже нормы',
      insight: 'Менеджер Мирас Ж. имеет конверсию 15.2% против среднего 18%.',
      recommendation: 'Провести обучение по скриптам продаж',
      expectedImpact: 'Повышение конверсии до 17%',
      confidence: 72,
      target: { type: 'Менеджер', name: 'Мирас Жумабаев' },
    },
  ],
  almaty: [
    {
      id: 'rec-alm-1',
      type: 'SCALE_OPPORTUNITY',
      priority: 'high',
      title: 'Масштабировать Instagram',
      insight: 'Кампания "Свадьбы 2026" показывает ROI 871%. Частота показа 2.1 — есть запас.',
      recommendation: 'Увеличить бюджет на 15-20%',
      expectedImpact: '+5-8 лидов в неделю',
      confidence: 85,
      target: { type: 'Кампания', name: 'Свадьбы 2026' },
    },
    {
      id: 'rec-alm-2',
      type: 'CREATIVE_FATIGUE',
      priority: 'medium',
      title: 'Обновить креативы ДР',
      insight: 'CTR упал с 1.8% до 1.3% за неделю. Частота 3.8.',
      recommendation: 'Подготовить 3-4 новых креатива',
      expectedImpact: 'Восстановление CTR до 1.6%',
      confidence: 78,
      target: { type: 'Кампания', name: 'Дни рождения' },
    },
  ],
  astana: [
    {
      id: 'rec-ast-1',
      type: 'HIGH_POTENTIAL_LEAD',
      priority: 'critical',
      title: 'Горячий лид — корпоратив',
      insight: 'Компания "КазМунайГаз" запросила КП на 500 человек. Бюджет ~5М ₸.',
      recommendation: 'Связаться в течение часа',
      expectedImpact: 'Потенциальная сделка 5М ₸',
      confidence: 92,
      target: { type: 'Лид', name: 'КазМунайГаз' },
    },
    {
      id: 'rec-ast-2',
      type: 'SLOW_RESPONSE',
      priority: 'high',
      title: 'Медленный ответ в чатах',
      insight: 'Среднее время ответа 14 мин. Норма — до 10 мин.',
      recommendation: 'Настроить автоответ в нерабочее время',
      expectedImpact: 'Улучшение конверсии на 8%',
      confidence: 75,
      target: { type: 'Филиал', name: 'Астана' },
    },
  ],
  shymkent: [
    {
      id: 'rec-shm-1',
      type: 'TARGETING_ISSUE',
      priority: 'high',
      title: 'Неправильный таргетинг',
      insight: 'Кампания "Детские праздники" показывается мужчинам 35-55 вместо мам 25-40.',
      recommendation: 'Пересмотреть настройки аудитории',
      expectedImpact: 'Снижение CPL на 30%',
      confidence: 88,
      target: { type: 'Кампания', name: 'Детские праздники' },
    },
  ],
  aktobe: [
    {
      id: 'rec-akt-1',
      type: 'MANAGER_UNDERPERFORM',
      priority: 'medium',
      title: 'Низкая конверсия менеджера',
      insight: 'Конверсия 15.2% против среднего по филиалу 17%.',
      recommendation: 'Провести разбор звонков с РОПом',
      expectedImpact: 'Повышение до 16.5%',
      confidence: 70,
      target: { type: 'Менеджер', name: 'Мирас Жумабаев' },
    },
  ],
  karaganda: [
    {
      id: 'rec-kar-1',
      type: 'SCALE_OPPORTUNITY',
      priority: 'medium',
      title: 'Рост органики',
      insight: 'Органический трафик вырос на 25% за месяц.',
      recommendation: 'Усилить контент-маркетинг',
      expectedImpact: '+3-5 органических лидов',
      confidence: 72,
      target: { type: 'Канал', name: 'Органика' },
    },
  ],
  aktau: [
    {
      id: 'rec-aktu-1',
      type: 'PLACEMENT_SHIFT',
      priority: 'medium',
      title: 'Перенести бюджет в Stories',
      insight: 'Stories дают CPL на 40% ниже чем лента.',
      recommendation: 'Перераспределить 60% бюджета в Stories',
      expectedImpact: 'Снижение CPL с 4200 до 3000 ₸',
      confidence: 78,
      target: { type: 'Кампания', name: 'Все кампании' },
    },
  ],
  atyrau: [
    {
      id: 'rec-atr-1',
      type: 'HIGH_POTENTIAL_LEAD',
      priority: 'high',
      title: 'Крупный корпоративный запрос',
      insight: 'Тенгизшевройл запросил мероприятие на 300 чел.',
      recommendation: 'Подготовить VIP предложение',
      expectedImpact: 'Потенциал 3.5М ₸',
      confidence: 85,
      target: { type: 'Лид', name: 'Тенгизшевройл' },
    },
  ],
  kostanay: [
    {
      id: 'rec-kos-1',
      type: 'BUDGET_DRAIN',
      priority: 'high',
      title: 'Неэффективный Google Ads',
      insight: 'ROI Google Ads всего 15%. Facebook даёт 180%.',
      recommendation: 'Перенести бюджет в Facebook',
      expectedImpact: 'Экономия 15K ₸/месяц',
      confidence: 82,
      target: { type: 'Канал', name: 'Google Ads' },
    },
  ],
  petropavlovsk: [
    {
      id: 'rec-pet-1',
      type: 'SLOW_RESPONSE',
      priority: 'medium',
      title: 'Долгий ответ в WhatsApp',
      insight: 'Среднее время ответа 22 минуты.',
      recommendation: 'Добавить второго менеджера на подмену',
      expectedImpact: 'Сокращение до 12 минут',
      confidence: 68,
      target: { type: 'Канал', name: 'WhatsApp' },
    },
  ],
  taraz: [
    {
      id: 'rec-tar-1',
      type: 'SCALE_OPPORTUNITY',
      priority: 'medium',
      title: 'Успешная кампания свадеб',
      insight: 'Конверсия кампании свадеб 22% — выше среднего.',
      recommendation: 'Увеличить бюджет на 30%',
      expectedImpact: '+4 лида в неделю',
      confidence: 75,
      target: { type: 'Кампания', name: 'Свадьбы Тараз' },
    },
  ],
  turkestan: [
    {
      id: 'rec-tur-1',
      type: 'CREATIVE_FATIGUE',
      priority: 'low',
      title: 'Обновить визуалы',
      insight: 'Одни и те же креативы 2 месяца. CTR снижается.',
      recommendation: 'Создать сезонные креативы',
      expectedImpact: 'Повышение CTR на 15%',
      confidence: 65,
      target: { type: 'Кампания', name: 'Все кампании' },
    },
  ],
};

// Lead sources by city
export const LEAD_SOURCES_BY_CITY: Record<CityCode, LeadSource[]> = {
  all: [
    { id: 'src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 485, deals: 82, revenue: 21500000, spend: 325000, color: '#E1306C' },
    { id: 'src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 312, deals: 48, revenue: 12800000, spend: 185000, color: '#1877F2' },
    { id: 'src-3', name: 'Google Ads', icon: 'Globe', leads: 198, deals: 35, revenue: 9200000, spend: 95000, color: '#4285F4' },
    { id: 'src-4', name: 'Органика', icon: 'Users', leads: 156, deals: 38, revenue: 8500000, spend: 0, color: '#22C55E' },
    { id: 'src-5', name: 'Рекомендации', icon: 'Share2', leads: 135, deals: 25, revenue: 3700000, spend: 0, color: '#FFD700' },
  ],
  almaty: [
    { id: 'alm-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 98, deals: 18, revenue: 4850000, spend: 85000, color: '#E1306C' },
    { id: 'alm-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 62, deals: 10, revenue: 2650000, spend: 45000, color: '#1877F2' },
    { id: 'alm-src-3', name: 'Google Ads', icon: 'Globe', leads: 45, deals: 8, revenue: 2100000, spend: 35000, color: '#4285F4' },
    { id: 'alm-src-4', name: 'Органика', icon: 'Users', leads: 28, deals: 4, revenue: 1800000, spend: 0, color: '#22C55E' },
    { id: 'alm-src-5', name: 'Рекомендации', icon: 'Share2', leads: 12, deals: 2, revenue: 1100000, spend: 0, color: '#FFD700' },
  ],
  astana: [
    { id: 'ast-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 82, deals: 15, revenue: 4100000, spend: 72000, color: '#E1306C' },
    { id: 'ast-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 48, deals: 8, revenue: 2150000, spend: 38000, color: '#1877F2' },
    { id: 'ast-src-3', name: 'Google Ads', icon: 'Globe', leads: 38, deals: 7, revenue: 1850000, spend: 25000, color: '#4285F4' },
    { id: 'ast-src-4', name: 'Органика', icon: 'Users', leads: 22, deals: 4, revenue: 1200000, spend: 0, color: '#22C55E' },
    { id: 'ast-src-5', name: 'Рекомендации', icon: 'Share2', leads: 8, deals: 1, revenue: 500000, spend: 0, color: '#FFD700' },
  ],
  shymkent: [
    { id: 'shm-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 68, deals: 12, revenue: 2680000, spend: 42000, color: '#E1306C' },
    { id: 'shm-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 42, deals: 8, revenue: 1720000, spend: 22000, color: '#1877F2' },
    { id: 'shm-src-3', name: 'Google Ads', icon: 'Globe', leads: 28, deals: 5, revenue: 1080000, spend: 10000, color: '#4285F4' },
    { id: 'shm-src-4', name: 'Органика', icon: 'Users', leads: 14, deals: 2, revenue: 520000, spend: 0, color: '#22C55E' },
    { id: 'shm-src-5', name: 'Рекомендации', icon: 'Share2', leads: 4, deals: 1, revenue: 200000, spend: 0, color: '#FFD700' },
  ],
  aktobe: [
    { id: 'akt-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 52, deals: 9, revenue: 2050000, spend: 28000, color: '#E1306C' },
    { id: 'akt-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 32, deals: 5, revenue: 1150000, spend: 15000, color: '#1877F2' },
    { id: 'akt-src-3', name: 'Google Ads', icon: 'Globe', leads: 18, deals: 3, revenue: 720000, spend: 6000, color: '#4285F4' },
    { id: 'akt-src-4', name: 'Органика', icon: 'Users', leads: 8, deals: 2, revenue: 480000, spend: 0, color: '#22C55E' },
    { id: 'akt-src-5', name: 'Рекомендации', icon: 'Share2', leads: 2, deals: 0, revenue: 100000, spend: 0, color: '#FFD700' },
  ],
  karaganda: [
    { id: 'kar-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 58, deals: 11, revenue: 2320000, spend: 32000, color: '#E1306C' },
    { id: 'kar-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 38, deals: 6, revenue: 1350000, spend: 16000, color: '#1877F2' },
    { id: 'kar-src-3', name: 'Google Ads', icon: 'Globe', leads: 22, deals: 4, revenue: 880000, spend: 7000, color: '#4285F4' },
    { id: 'kar-src-4', name: 'Органика', icon: 'Users', leads: 12, deals: 2, revenue: 420000, spend: 0, color: '#22C55E' },
    { id: 'kar-src-5', name: 'Рекомендации', icon: 'Share2', leads: 4, deals: 1, revenue: 130000, spend: 0, color: '#FFD700' },
  ],
  aktau: [
    { id: 'aktu-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 42, deals: 8, revenue: 1820000, spend: 22000, color: '#E1306C' },
    { id: 'aktu-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 24, deals: 4, revenue: 980000, spend: 10000, color: '#1877F2' },
    { id: 'aktu-src-3', name: 'Google Ads', icon: 'Globe', leads: 14, deals: 2, revenue: 560000, spend: 4000, color: '#4285F4' },
    { id: 'aktu-src-4', name: 'Органика', icon: 'Users', leads: 7, deals: 1, revenue: 340000, spend: 0, color: '#22C55E' },
    { id: 'aktu-src-5', name: 'Рекомендации', icon: 'Share2', leads: 2, deals: 1, revenue: 100000, spend: 0, color: '#FFD700' },
  ],
  atyrau: [
    { id: 'atr-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 45, deals: 9, revenue: 2020000, spend: 24000, color: '#E1306C' },
    { id: 'atr-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 28, deals: 5, revenue: 1180000, spend: 12000, color: '#1877F2' },
    { id: 'atr-src-3', name: 'Google Ads', icon: 'Globe', leads: 15, deals: 2, revenue: 580000, spend: 4000, color: '#4285F4' },
    { id: 'atr-src-4', name: 'Органика', icon: 'Users', leads: 8, deals: 1, revenue: 320000, spend: 0, color: '#22C55E' },
    { id: 'atr-src-5', name: 'Рекомендации', icon: 'Share2', leads: 2, deals: 1, revenue: 100000, spend: 0, color: '#FFD700' },
  ],
  kostanay: [
    { id: 'kos-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 35, deals: 6, revenue: 1320000, spend: 15000, color: '#E1306C' },
    { id: 'kos-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 22, deals: 4, revenue: 880000, spend: 8000, color: '#1877F2' },
    { id: 'kos-src-3', name: 'Google Ads', icon: 'Globe', leads: 12, deals: 2, revenue: 420000, spend: 3000, color: '#4285F4' },
    { id: 'kos-src-4', name: 'Органика', icon: 'Users', leads: 7, deals: 1, revenue: 220000, spend: 0, color: '#22C55E' },
    { id: 'kos-src-5', name: 'Рекомендации', icon: 'Share2', leads: 2, deals: 1, revenue: 60000, spend: 0, color: '#FFD700' },
  ],
  petropavlovsk: [
    { id: 'pet-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 25, deals: 5, revenue: 980000, spend: 10000, color: '#E1306C' },
    { id: 'pet-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 16, deals: 3, revenue: 620000, spend: 5000, color: '#1877F2' },
    { id: 'pet-src-3', name: 'Google Ads', icon: 'Globe', leads: 8, deals: 1, revenue: 280000, spend: 2000, color: '#4285F4' },
    { id: 'pet-src-4', name: 'Органика', icon: 'Users', leads: 5, deals: 1, revenue: 180000, spend: 0, color: '#22C55E' },
    { id: 'pet-src-5', name: 'Рекомендации', icon: 'Share2', leads: 2, deals: 0, revenue: 40000, spend: 0, color: '#FFD700' },
  ],
  taraz: [
    { id: 'tar-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 32, deals: 6, revenue: 1280000, spend: 12000, color: '#E1306C' },
    { id: 'tar-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 20, deals: 4, revenue: 820000, spend: 7000, color: '#1877F2' },
    { id: 'tar-src-3', name: 'Google Ads', icon: 'Globe', leads: 12, deals: 2, revenue: 420000, spend: 3000, color: '#4285F4' },
    { id: 'tar-src-4', name: 'Органика', icon: 'Users', leads: 6, deals: 1, revenue: 220000, spend: 0, color: '#22C55E' },
    { id: 'tar-src-5', name: 'Рекомендации', icon: 'Share2', leads: 2, deals: 0, revenue: 60000, spend: 0, color: '#FFD700' },
  ],
  turkestan: [
    { id: 'tur-src-1', name: 'Instagram Ads', icon: 'Instagram', leads: 22, deals: 4, revenue: 820000, spend: 7000, color: '#E1306C' },
    { id: 'tur-src-2', name: 'Facebook Ads', icon: 'Facebook', leads: 14, deals: 3, revenue: 560000, spend: 3000, color: '#1877F2' },
    { id: 'tur-src-3', name: 'Google Ads', icon: 'Globe', leads: 8, deals: 1, revenue: 240000, spend: 1000, color: '#4285F4' },
    { id: 'tur-src-4', name: 'Органика', icon: 'Users', leads: 3, deals: 1, revenue: 140000, spend: 0, color: '#22C55E' },
    { id: 'tur-src-5', name: 'Рекомендации', icon: 'Share2', leads: 1, deals: 0, revenue: 40000, spend: 0, color: '#FFD700' },
  ],
};

// Get branch data helper functions
export const getBranchFunnel = (cityCode: CityCode): FunnelStageData[] => {
  return FUNNEL_BY_CITY[cityCode] || FUNNEL_BY_CITY.all;
};

export const getBranchManagers = (cityCode: CityCode): Manager[] => {
  return MANAGERS_BY_CITY[cityCode] || MANAGERS_BY_CITY.all;
};

export const getBranchRecommendations = (cityCode: CityCode): AIRecommendation[] => {
  return RECOMMENDATIONS_BY_CITY[cityCode] || RECOMMENDATIONS_BY_CITY.all;
};

export const getBranchLeadSources = (cityCode: CityCode): LeadSource[] => {
  return LEAD_SOURCES_BY_CITY[cityCode] || LEAD_SOURCES_BY_CITY.all;
};

export const getBranchStats = (cityCode: CityCode) => {
  if (cityCode === 'all') {
    return {
      revenue: BRANCHES.reduce((sum, b) => sum + b.monthlyRevenue, 0),
      leads: BRANCHES.reduce((sum, b) => sum + b.monthlyLeads, 0),
      deals: BRANCHES.reduce((sum, b) => sum + b.monthlyDeals, 0),
      managers: BRANCHES.reduce((sum, b) => sum + b.managersCount, 0),
    };
  }
  const branch = BRANCHES.find(b => b.code === cityCode);
  if (branch) {
    return {
      revenue: branch.monthlyRevenue,
      leads: branch.monthlyLeads,
      deals: branch.monthlyDeals,
      managers: branch.managersCount,
    };
  }
  return { revenue: 0, leads: 0, deals: 0, managers: 0 };
};
