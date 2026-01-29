/**
 * ShowToday AI Analytics - Scoring System Types
 * Система скоринга для менеджеров, таргетологов, плейсментов и креативов
 */

// ===== ОБЩИЕ ТИПЫ =====

export type Rank = 'S' | 'A' | 'B' | 'C' | 'D';
export type Trend = 'up' | 'down' | 'stable';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

// ===== ПЕРИОДЫ И КАТЕГОРИИ ТРЕНДОВ =====

export type TimePeriod = 'week' | 'month' | '3months';
export type TrendCategory = 'calls' | 'whatsapp' | 'decisions';

// ===== РЕКОМЕНДАЦИИ ПО КОМАНДЕ =====

export type TeamRecommendation = 'keep' | 'expand' | 'train' | 'consider_removal';

// ===== СТАТУСЫ ИНТЕГРАЦИЙ =====

export type IntegrationStatus = 'connected' | 'disconnected' | 'error' | 'pending';
export type IntegrationType = 'bitrix24' | 'whatsapp';

export interface ScoreBreakdown {
  name: string;
  score: number;
  maxScore: number;
  weight: number;
}

// ===== МЕНЕДЖЕРЫ =====

export interface ManagerMetrics {
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
  avgResponseTime: number; // в минутах
  totalMessages: number;
  clientMessages: number;
  aiQualityScore: number; // 1-10
}

export interface ManagerScores {
  conversion: number;      // 0-100
  avgCheck: number;        // 0-100
  responseSpeed: number;   // 0-100
  engagement: number;      // 0-100
  quality: number;         // 0-100
}

export interface Manager {
  id: string;
  name: string;
  avatar?: string;
  department: string;

  metrics: ManagerMetrics;
  scores: ManagerScores;

  totalScore: number;
  rank: Rank;
  trend: Trend;
  trendValue: number; // % изменение

  // AI анализ
  aiInsight?: string;
  recommendations?: string[];
}

// ===== ТАРГЕТОЛОГИ =====

export interface TargetologistMetrics {
  totalCampaigns: number;
  totalSpend: number;
  totalRevenue: number;
  totalLeads: number;
  totalConversions: number;
  avgCTR: number;
  avgCPL: number;
}

export interface TargetologistScores {
  trafficQuality: number;  // 0-100 (конверсия лидов)
  roi: number;             // 0-100
  cpl: number;             // 0-100 (обратная шкала)
  ctr: number;             // 0-100
}

export interface Targetologist {
  id: string;
  name: string;
  avatar?: string;

  campaigns: CampaignSummary[];
  metrics: TargetologistMetrics;
  scores: TargetologistScores;

  totalScore: number;
  rank: Rank;
  trend: Trend;
  trendValue: number;

  aiInsight?: string;
  recommendations?: string[];
}

export interface CampaignSummary {
  id: string;
  name: string;
  spend: number;
  leads: number;
  conversions: number;
  revenue: number;
}

// ===== ТРАФИК-КОМАНДЫ =====

export interface TeamMetrics {
  totalSpend: number;
  totalRevenue: number;
  totalLeads: number;
  totalConversions: number;
  avgCPL: number;
  avgROI: number;
  avgCTR: number;
}

export interface TrafficTeam {
  id: string;
  name: string;
  members: Targetologist[];
  metrics: TeamMetrics;
  totalScore: number;
  rank: Rank;
  trend: Trend;
  trendValue: number;
  recommendation: TeamRecommendation;
  aiInsight?: string;
}

// ===== ПЛЕЙСМЕНТЫ =====

export type PlacementType =
  | 'instagram_feed'
  | 'instagram_stories'
  | 'instagram_reels'
  | 'facebook_feed'
  | 'facebook_marketplace'
  | 'audience_network'
  | 'whatsapp';

export type PlacementRecommendation = 'scale' | 'maintain' | 'optimize' | 'pause';

export interface PlacementMetrics {
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  spend: number;
  revenue: number;
}

export interface PlacementScores {
  ctr: number;
  conversionRate: number;
  roi: number;
  efficiency: number;
}

export interface Placement {
  id: string;
  type: PlacementType;
  name: string;
  icon: string;

  metrics: PlacementMetrics;
  scores: PlacementScores;

  totalScore: number;
  recommendation: PlacementRecommendation;
  trend: Trend;
  trendValue: number;

  aiInsight?: string;
}

// ===== КРЕАТИВЫ =====

export type CreativeType = 'image' | 'video' | 'carousel' | 'story';
export type CreativeStatus = 'top' | 'performing' | 'declining' | 'fatigue';

export interface CreativeMetrics {
  impressions: number;
  reach: number;
  clicks: number;
  leads: number;
  conversions: number;
  spend: number;
  revenue: number;

  // Engagement
  likes: number;
  comments: number;
  shares: number;
  saves: number;

  // Video specific
  videoViews?: number;
  avgWatchTime?: number;
  videoLength?: number;
}

export interface CreativeScores {
  roi: number;
  engagementRate: number;
  clickToLead: number;
  thumbStopRate?: number;  // для видео
  holdRate?: number;       // для видео
}

export interface Creative {
  id: string;
  name: string;
  type: CreativeType;
  thumbnail: string;
  placementTypes: PlacementType[];

  metrics: CreativeMetrics;
  scores: CreativeScores;

  totalScore: number;
  status: CreativeStatus;
  frequency: number;
  trend: Trend;
  trendValue: number;

  aiInsight?: string;
  recommendations?: string[];
}

// ===== AI РЕКОМЕНДАЦИИ =====

export type RecommendationType =
  | 'BUDGET_DRAIN'           // Слив бюджета
  | 'SCALE_OPPORTUNITY'      // Возможность масштабирования
  | 'CREATIVE_FATIGUE'       // Креатив устал
  | 'MANAGER_UNDERPERFORM'   // Менеджер недорабатывает
  | 'SLOW_RESPONSE'          // Медленные ответы
  | 'HIGH_POTENTIAL_LEAD'    // Горячий лид
  | 'TARGETING_ISSUE'        // Проблема с таргетингом
  | 'PLACEMENT_SHIFT';       // Сменить плейсмент

export interface AIRecommendation {
  id: string;
  type: RecommendationType;
  priority: Priority;

  target: {
    type: 'manager' | 'campaign' | 'creative' | 'placement' | 'lead';
    id: string;
    name: string;
  };

  title: string;
  insight: string;
  recommendation: string;
  expectedImpact: string;

  metrics?: {
    current: number;
    benchmark: number;
    unit: string;
  };

  actions: {
    label: string;
    type: 'primary' | 'secondary';
    action: string; // ID действия
  }[];

  confidence: number; // 0-100
  createdAt: Date;
}

// ===== АНАЛИЗ ТРЕНДОВ =====

export type ActionType = 'campaign_change' | 'manager_action' | 'creative_update' | 'budget_change';

export interface ActionTaken {
  id: string;
  type: ActionType;
  description: string;
  impact: number; // процент изменения
  timestamp: Date;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  actions?: ActionTaken[];
}

export interface TrendCorrelation {
  action: string;
  metric: string;
  impactPercentage: number;
  confidence: number;
}

export interface TrendAnalysis {
  category: TrendCategory;
  period: TimePeriod;
  data: TrendDataPoint[];
  aiIdentifiedPatterns: string[];
  correlations: TrendCorrelation[];
}

// ===== ВОРОНКА ПРОДАЖ =====

export type FunnelStage =
  | 'traffic'
  | 'leads'
  | 'contacted'
  | 'qualified'
  | 'warm'
  | 'deal'
  | 'lost';

export interface FunnelStageData {
  stage: FunnelStage;
  name: string;
  count: number;
  value: number;
  spend: number; // расход на этап
  conversionRate: number;
  avgTimeInStage: number; // часы
  color: string;
  channel?: string; // канал трафика
}

export interface LeadSource {
  id: string;
  name: string;
  icon: string;
  color: string;

  leads: number;
  conversions: number;
  revenue: number;
  spend: number;

  conversionRate: number;
  roi: number;
  cpl: number;
}

// ===== ЛИДЫ =====

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WARM' | 'WON' | 'LOST';
export type LeadTemperature = 'HOT' | 'WARM' | 'COLD';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;

  source: string;
  sourceIcon: string;

  status: LeadStatus;
  temperature: LeadTemperature;
  score: number; // 0-100

  assignedTo: string;
  managerId: string;

  amount?: number;

  createdAt: Date;
  lastActivity: Date;

  tags?: string[];
  notes?: string;
}

// ===== ФИЛЬТРЫ ВОРОНКИ =====

export interface FunnelFilter {
  managerId?: string;
  trafficTeamId?: string;
  source?: string;
  dateRange?: { start: Date; end: Date };
}

// ===== НАСТРОЙКИ AI =====

export type AIFocusArea = 'conversion' | 'response_time' | 'deal_size' | 'lead_quality';

export interface AISettings {
  temperature: number;     // 0-100, стиль взаимодействия
  creativity: number;      // 0-100, креативность ответов
  actionScale: number;     // 0-100, масштаб рекомендаций
  focusAreas: AIFocusArea[];
}

// ===== ИНТЕГРАЦИИ =====

export interface Integration {
  id: string;
  type: IntegrationType;
  name: string;
  status: IntegrationStatus;
  lastSync?: Date;
  healthScore: number; // 0-100
  config: Record<string, unknown>;
  errors?: string[];
}

// ===== UTM-МЕТКИ И АТРИБУЦИЯ =====

export interface UTMData {
  utm_source?: string;      // Источник (instagram, google, whatsapp)
  utm_medium?: string;      // Канал (cpc, organic, referral)
  utm_campaign?: string;    // Название кампании
  utm_content?: string;     // ID/название креатива
  utm_term?: string;        // Ключевое слово (для поиска)
}

export interface AdAttribution {
  trafficTeamId?: string;
  trafficTeamName?: string;
  targetologistId?: string;
  targetologistName?: string;
  adId?: string;
  adName?: string;
  campaignId?: string;
  campaignName?: string;
  creativeId?: string;
  creativeName?: string;
  placement?: PlacementType;
  utmData?: UTMData;
}

export interface AdPerformanceStats {
  adId: string;
  adName: string;
  campaignName: string;
  trafficTeamName: string;
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  totalRevenue: number;
  avgQualityScore: number;
  conversionRate: number;
  costPerCall: number;
  roi: number;
}

// ===== ГЛУБОКИЙ АНАЛИЗ ЗВОНКОВ =====

export interface CallScriptStep {
  id: string;
  name: string;
  description: string;
}

export interface CallScriptEvaluation {
  scriptStep: string;
  followed: boolean;
  qualityScore: number;
  aiComment: string;
}

export interface EnhancedCallAnalysis {
  callId: string;
  qualityScore: number;
  qualityExplanation: string;
  scriptEvaluation: CallScriptEvaluation[];
  dealOutcome: 'success' | 'failed' | 'pending';
  strengths: string[];
  weaknesses: string[];
  aiRecommendations: string[];
}

// ===== ДАШБОРД =====

export interface DashboardMetrics {
  totalLeads: number;
  totalDeals: number;
  totalRevenue: number;
  conversionRate: number;
  avgCheck: number;
  roi: number;

  leadsChange: number;
  dealsChange: number;
  revenueChange: number;
  conversionChange: number;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  funnel: FunnelStageData[];
  sources: LeadSource[];
  topManagers: Manager[];
  topCreatives: Creative[];
  recommendations: AIRecommendation[];
  recentLeads: Lead[];
}

// ===== УТИЛИТЫ =====

export function getRank(score: number): Rank {
  if (score >= 90) return 'S';
  if (score >= 75) return 'A';
  if (score >= 60) return 'B';
  if (score >= 45) return 'C';
  return 'D';
}

export function getRankColor(rank: Rank): string {
  switch (rank) {
    case 'S': return 'text-purple-500';
    case 'A': return 'text-green-500';
    case 'B': return 'text-blue-500';
    case 'C': return 'text-yellow-500';
    case 'D': return 'text-red-500';
  }
}

export function getRankBgColor(rank: Rank): string {
  switch (rank) {
    case 'S': return 'bg-purple-500/10';
    case 'A': return 'bg-green-500/10';
    case 'B': return 'bg-blue-500/10';
    case 'C': return 'bg-yellow-500/10';
    case 'D': return 'bg-red-500/10';
  }
}

export function getTemperatureColor(temp: LeadTemperature): string {
  switch (temp) {
    case 'HOT': return 'text-red-500';
    case 'WARM': return 'text-orange-500';
    case 'COLD': return 'text-blue-500';
  }
}

export function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case 'critical': return 'text-red-500 bg-red-500/10';
    case 'high': return 'text-orange-500 bg-orange-500/10';
    case 'medium': return 'text-yellow-500 bg-yellow-500/10';
    case 'low': return 'text-green-500 bg-green-500/10';
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('ru-KZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + ' ₸';
}

export function formatPercent(value: number): string {
  return (value ?? 0).toFixed(1) + '%';
}

export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toString();
}

export function getTeamRecommendationColor(recommendation: TeamRecommendation): string {
  switch (recommendation) {
    case 'expand': return 'text-green-500 bg-green-500/10';
    case 'keep': return 'text-blue-500 bg-blue-500/10';
    case 'train': return 'text-yellow-500 bg-yellow-500/10';
    case 'consider_removal': return 'text-red-500 bg-red-500/10';
  }
}

export function getTeamRecommendationLabel(recommendation: TeamRecommendation): string {
  switch (recommendation) {
    case 'expand': return 'Расширить';
    case 'keep': return 'Оставить';
    case 'train': return 'Обучить';
    case 'consider_removal': return 'На рассмотрение';
  }
}

export function getIntegrationStatusColor(status: IntegrationStatus): string {
  switch (status) {
    case 'connected': return 'text-green-500 bg-green-500/10';
    case 'disconnected': return 'text-gray-500 bg-gray-500/10';
    case 'error': return 'text-red-500 bg-red-500/10';
    case 'pending': return 'text-yellow-500 bg-yellow-500/10';
  }
}

export function getIntegrationStatusLabel(status: IntegrationStatus): string {
  switch (status) {
    case 'connected': return 'Подключено';
    case 'disconnected': return 'Отключено';
    case 'error': return 'Ошибка';
    case 'pending': return 'Ожидание';
  }
}

export function getPeriodLabel(period: TimePeriod): string {
  switch (period) {
    case 'week': return 'Неделя';
    case 'month': return 'Месяц';
    case '3months': return '3 месяца';
  }
}

export function getCategoryLabel(category: TrendCategory): string {
  switch (category) {
    case 'calls': return 'Звонки';
    case 'whatsapp': return 'WhatsApp';
    case 'decisions': return 'Решения';
  }
}
