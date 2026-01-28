import React, { useState, useEffect } from 'react';
import { Sun, Moon, Globe, MessageSquare, Sparkles, Info, Thermometer, Lightbulb, Gauge, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { AISettings } from '../types/scoring';

// Default AI Settings
const DEFAULT_AI_SETTINGS: AISettings = {
  temperature: 50,
  creativity: 50,
  actionScale: 50,
  focusAreas: ['conversion', 'response_time']
};

// Slider Component
const AISlider: React.FC<{
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  isDark: boolean;
}> = ({ label, description, value, onChange, leftLabel, rightLabel, icon: Icon, isDark }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
            <Icon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
          </div>
          <div>
            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{label}</h4>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{description}</p>
          </div>
        </div>
        <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}%</span>
      </div>
      <div className="space-y-1">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
          style={{
            background: isDark
              ? `linear-gradient(to right, #FFD700 0%, #FFD700 ${value}%, rgba(255,255,255,0.1) ${value}%, rgba(255,255,255,0.1) 100%)`
              : `linear-gradient(to right, #FFD700 0%, #FFD700 ${value}%, #E5E7EB ${value}%, #E5E7EB 100%)`
          }}
        />
        <div className="flex justify-between">
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{leftLabel}</span>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{rightLabel}</span>
        </div>
      </div>
    </div>
  );
};

export const Settings: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // AI Settings State
  const [aiSettings, setAISettings] = useState<AISettings>(() => {
    const saved = localStorage.getItem('showtoday-ai-settings');
    return saved ? JSON.parse(saved) : DEFAULT_AI_SETTINGS;
  });

  // Save AI settings to localStorage
  useEffect(() => {
    localStorage.setItem('showtoday-ai-settings', JSON.stringify(aiSettings));
  }, [aiSettings]);

  const updateAISetting = <K extends keyof AISettings>(key: K, value: AISettings[K]) => {
    setAISettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {t('settings.title')}
      </h1>

      <div className="space-y-4">
        {/* Theme Setting */}
        <div className={`p-6 rounded-2xl shadow-sm border ${
          isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {isDark ? <Moon className="w-6 h-6 text-yellow-400" /> : <Sun className="w-6 h-6 text-yellow-500" />}
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t('settings.theme')}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {isDark ? t('settings.dark') : t('settings.light')}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                isDark ? 'bg-yellow-400' : 'bg-slate-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                isDark ? 'translate-x-7' : 'translate-x-1'
              }`}></div>
            </button>
          </div>
        </div>

        {/* Language Setting */}
        <div className={`p-6 rounded-2xl shadow-sm border ${
          isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Globe className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t('settings.language')}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {language === 'ru' ? 'Русский' : 'Қазақша'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  language === 'ru'
                    ? 'bg-[#FFD700] text-black'
                    : isDark
                      ? 'bg-dark-border text-gray-400 hover:text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('kz')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  language === 'kz'
                    ? 'bg-[#FFD700] text-black'
                    : isDark
                      ? 'bg-dark-border text-gray-400 hover:text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                KZ
              </button>
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl shadow-sm border ${
            isDark ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-white/10' : 'bg-white border-slate-100'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t('settings.ai.title')}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                {t('settings.ai.subtitle')}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Temperature Slider */}
            <AISlider
              label={t('settings.ai.temperature')}
              description={t('settings.ai.temperatureDesc')}
              value={aiSettings.temperature}
              onChange={(v) => updateAISetting('temperature', v)}
              leftLabel={t('settings.ai.conservative')}
              rightLabel={t('settings.ai.aggressive')}
              icon={Thermometer}
              isDark={isDark}
            />

            {/* Creativity Slider */}
            <AISlider
              label={t('settings.ai.creativity')}
              description={t('settings.ai.creativityDesc')}
              value={aiSettings.creativity}
              onChange={(v) => updateAISetting('creativity', v)}
              leftLabel={t('settings.ai.low')}
              rightLabel={t('settings.ai.high')}
              icon={Lightbulb}
              isDark={isDark}
            />

            {/* Action Scale Slider */}
            <AISlider
              label={t('settings.ai.actionScale')}
              description={t('settings.ai.actionScaleDesc')}
              value={aiSettings.actionScale}
              onChange={(v) => updateAISetting('actionScale', v)}
              leftLabel={t('settings.ai.small')}
              rightLabel={t('settings.ai.large')}
              icon={Gauge}
              isDark={isDark}
            />
          </div>

          {/* Info Panel */}
          <div className={`
            mt-6 p-4 rounded-xl
            ${isDark ? 'bg-white/5' : 'bg-slate-50'}
          `}>
            <div className="flex items-start gap-3">
              <Info className={`w-5 h-5 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              <div>
                <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t('settings.ai.qualityInfo')}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      {t('settings.ai.qualityTip1')}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      {t('settings.ai.qualityTip2')}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                      {t('settings.ai.qualityTip3')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <div className={`p-6 rounded-2xl shadow-sm border ${
          isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MessageSquare className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Полная версия
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {t('settings.available')}
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors shadow-sm">
              {t('settings.contact')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
