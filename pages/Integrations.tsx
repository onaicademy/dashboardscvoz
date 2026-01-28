import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plug,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Settings,
  ChevronDown,
  ChevronUp,
  Activity,
  Database,
  MessageCircle,
  Phone,
  Users,
  FileText,
  Zap,
  Shield,
  Info
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Integration,
  IntegrationStatus,
  getIntegrationStatusColor,
  getIntegrationStatusLabel
} from '../types/scoring';
import { MOCK_INTEGRATIONS } from '../services/trafficTeamData';

// Integration icons mapping
const integrationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  bitrix24: Database,
  whatsapp: MessageCircle
};

const integrationColors: Record<string, string> = {
  bitrix24: '#00BFFF',
  whatsapp: '#25D366'
};

const StatusIcon = ({ status }: { status: IntegrationStatus }) => {
  switch (status) {
    case 'connected': return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'disconnected': return <XCircle className="w-5 h-5 text-gray-500" />;
    case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
    case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
  }
};

interface IntegrationCardProps {
  integration: Integration;
  isDark: boolean;
  t: (key: string) => string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, isDark, t }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = integrationIcons[integration.type];
  const color = integrationColors[integration.type];

  const formatLastSync = (date?: Date) => {
    if (!date) return 'Никогда';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'Только что';
    if (minutes < 60) return `${minutes} мин. назад`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ч. назад`;
    return `${Math.floor(hours / 24)} д. назад`;
  };

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
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: color + '20' }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div>
              <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {integration.name}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                {t(`integrations.${integration.type}Desc`)}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${getIntegrationStatusColor(integration.status)}`}>
            <StatusIcon status={integration.status} />
            <span className="text-sm font-medium">
              {getIntegrationStatusLabel(integration.status)}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Activity className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                {t('integrations.health')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${integration.healthScore}%` }}
                  className={`h-full rounded-full ${
                    integration.healthScore >= 80 ? 'bg-green-500' :
                    integration.healthScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                />
              </div>
              <span className={`text-sm font-bold ${
                integration.healthScore >= 80 ? 'text-green-500' :
                integration.healthScore >= 50 ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {integration.healthScore}%
              </span>
            </div>
          </div>

          <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                {t('integrations.lastSync')}
              </span>
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {formatLastSync(integration.lastSync)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors
              ${integration.status === 'connected'
                ? isDark
                  ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                : 'bg-primary text-black hover:bg-primary-dark'
              }
            `}
          >
            {integration.status === 'connected' ? (
              <>
                <RefreshCw className="w-4 h-4" />
                {t('integrations.reconnect')}
              </>
            ) : (
              <>
                <Plug className="w-4 h-4" />
                Подключить
              </>
            )}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
              ${isDark
                ? 'bg-white/5 text-gray-300 hover:bg-white/10'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }
            `}
          >
            <Settings className="w-4 h-4" />
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}
          >
            <div className="p-5 space-y-4">
              {/* Configuration Info */}
              <div>
                <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Конфигурация
                </h4>
                <div className="space-y-2">
                  {Object.entries(integration.config).map(([key, value]) => (
                    <div
                      key={key}
                      className={`
                        flex items-center justify-between p-2 rounded-lg
                        ${isDark ? 'bg-white/5' : 'bg-slate-50'}
                      `}
                    >
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        {key}
                      </span>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {typeof value === 'boolean' ? (value ? 'Да' : 'Нет') : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Synced Entities */}
              {integration.type === 'bitrix24' && (
                <div>
                  <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Синхронизируемые сущности
                  </h4>
                  <div className="flex gap-2">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Лиды</span>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <FileText className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Сделки</span>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <Phone className="w-4 h-4 text-purple-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Контакты</span>
                    </div>
                  </div>
                </div>
              )}

              {/* WhatsApp Features */}
              {integration.type === 'whatsapp' && (
                <div>
                  <h4 className={`text-sm font-medium mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Возможности
                  </h4>
                  <div className="flex gap-2">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <MessageCircle className="w-4 h-4 text-green-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Чаты</span>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Автоответы</span>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Шифрование</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Errors (if any) */}
              {integration.errors && integration.errors.length > 0 && (
                <div className={`p-3 rounded-xl ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <h4 className="text-sm font-medium text-red-500">
                      {t('integrations.errors')}
                    </h4>
                  </div>
                  <ul className="space-y-1">
                    {integration.errors.map((error, idx) => (
                      <li key={idx} className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                        • {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* No Errors */}
              {(!integration.errors || integration.errors.length === 0) && (
                <div className={`flex items-center gap-2 p-3 rounded-xl ${isDark ? 'bg-green-500/10' : 'bg-green-50'}`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className={`text-sm ${isDark ? 'text-green-300' : 'text-green-600'}`}>
                    {t('integrations.noErrors')}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Integrations: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <Plug className="w-7 h-7" />
          {t('integrations.title')}
        </h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          {t('integrations.subtitle')}
        </p>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_INTEGRATIONS.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            isDark={isDark}
            t={t}
          />
        ))}
      </div>

      {/* Setup Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`p-6 rounded-2xl border ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-lg'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Info className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
          <h2 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t('integrations.setupGuide')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bitrix24 Guide */}
          <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-5 h-5 text-blue-500" />
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Bitrix24
              </h3>
            </div>
            <ol className={`text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              <li>1. Откройте настройки Bitrix24 → Разработчикам</li>
              <li>2. Создайте исходящий веб-хук</li>
              <li>3. Выберите права: CRM, Сделки, Контакты</li>
              <li>4. Скопируйте URL веб-хука</li>
              <li>5. Вставьте URL в настройки интеграции</li>
            </ol>
          </div>

          {/* WhatsApp Guide */}
          <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-green-500" />
              <h3 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                WhatsApp Business
              </h3>
            </div>
            <ol className={`text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              <li>1. Создайте аккаунт Meta Business</li>
              <li>2. Подключите номер WhatsApp Business</li>
              <li>3. Настройте API в Meta for Developers</li>
              <li>4. Получите токен доступа</li>
              <li>5. Введите токен в настройках интеграции</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
