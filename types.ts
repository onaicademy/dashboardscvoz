// Brand Colors
export const COLORS = {
  primary: '#FFD700', // Yellow
  primaryDark: '#E6C200',
  secondary: '#1A1A1A', // Black
  bgMain: '#F8FAFC',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

export interface Message {
  id: number;
  time: string;
  sender: 'client' | 'agent';
  text: string;
  responseTime?: string; // e.g., "1 min", "6 min"
  isSlowResponse?: boolean;
  hasError?: boolean;
}

export interface CategoryScore {
  name: string;
  score: number; // 0-10
}

export interface ChatAnalysis {
  id: string;
  clientName: string;
  clientPhone: string;
  agentName: string;
  date: string;
  amount: number;
  status: 'completed' | 'rejected' | 'pending';
  overallScore: number;
  summary: string;
  goodPoints: string[];
  criticalIssues: string[];
  missedOpportunities: string[];
  categoryScores: CategoryScore[];
  messages: Message[];
  source: string;
}

export interface MarketingChannel {
  name: string;
  value: number; // percentage or count
  color: string;
  conversionRate: number;
  roi: string;
  spend: string;
  revenue: string;
}
