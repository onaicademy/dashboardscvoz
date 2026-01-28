import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Phone, Wallet, User, MessageCircle } from 'lucide-react';
import { MOCK_CHATS } from '../services/mockData';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export const ChatDetail: React.FC = () => {
  const { id } = useParams();
  const chat = MOCK_CHATS.find(c => c.id === id);
  const { isDark } = useTheme();
  const { t } = useLanguage();

  if (!chat) return <div className="p-8">{t('analytics.title')} not found</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Link to="/analytics" className={`inline-flex items-center transition-colors text-sm font-medium ${
        isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
      }`}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t('chat.backToList')}
      </Link>

      {/* Header Info */}
      <div className={`p-6 rounded-2xl shadow-sm border flex flex-col md:flex-row justify-between md:items-center gap-4 ${
        isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-slate-100'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${
            chat.overallScore >= 7 ? 'bg-green-100 text-green-600' :
            chat.overallScore >= 5 ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
          }`}>
            {chat.overallScore}
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{chat.clientName}</h1>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t('chat.analysisFrom')} {chat.date}</p>
          </div>
        </div>
        <div className={`flex flex-col gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {chat.clientPhone}</div>
          <div className="flex items-center gap-2"><Wallet className="w-4 h-4" /> {chat.amount.toLocaleString()} ₸</div>
          <div className="flex items-center gap-2"><User className="w-4 h-4" /> {t('analytics.agent')}: {chat.agentName}</div>
        </div>
        <div className="flex items-center">
          <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
            chat.status === 'completed' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {chat.status === 'completed' ? t('status.orderCompleted') : t('status.rejected').toUpperCase()}
          </span>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-lg">
        <h3 className="text-[#FFD700] font-bold text-lg mb-2 flex items-center gap-2">
          ✨ {t('chat.aiSummary')}
        </h3>
        <p className="leading-relaxed opacity-90">{chat.summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analysis Columns */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-5 rounded-xl border-l-4 border-green-500 shadow-sm ${
            isDark ? 'bg-dark-card' : 'bg-white'
          }`}>
            <h4 className={`font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ✅ {t('chat.goodPoints')}
            </h4>
            <ul className="space-y-2">
              {chat.goodPoints.map((point, i) => (
                <li key={i} className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className={`p-5 rounded-xl border-l-4 border-red-500 shadow-sm ${
            isDark ? 'bg-dark-card' : 'bg-white'
          }`}>
            <h4 className={`font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ❌ {t('chat.criticalProblems')}
            </h4>
            <ul className="space-y-2">
              {chat.criticalIssues.length > 0 ? chat.criticalIssues.map((point, i) => (
                <li key={i} className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                  {point}
                </li>
              )) : <li className={`text-sm italic ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{t('chat.noProblems')}</li>}
            </ul>
          </div>
          <div className={`p-5 rounded-xl border-l-4 border-yellow-400 shadow-sm ${
            isDark ? 'bg-dark-card' : 'bg-white'
          }`}>
            <h4 className={`font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              💡 {t('chat.missedOpportunities')}
            </h4>
            <ul className="space-y-2">
              {chat.missedOpportunities.map((point, i) => (
                <li key={i} className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Left Col: Scores */}
        <div className={`lg:col-span-1 p-6 rounded-2xl shadow-sm border h-fit ${
          isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-slate-100'
        }`}>
          <h3 className={`font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('chat.chatScores')}</h3>
          <div className="space-y-4">
            {chat.categoryScores.map((cat) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={isDark ? 'text-gray-300' : 'text-slate-600'}>{cat.name}</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cat.score}</span>
                </div>
                <div className={`w-full rounded-full h-2 ${isDark ? 'bg-dark-border' : 'bg-slate-100'}`}>
                  <div
                    className={`h-2 rounded-full ${cat.score >= 8 ? 'bg-[#FFD700]' : cat.score >= 5 ? 'bg-orange-400' : 'bg-red-500'}`}
                    style={{ width: `${cat.score * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Chat History */}
        <div className={`lg:col-span-2 rounded-2xl shadow-sm border flex flex-col h-[600px] ${
          isDark ? 'bg-dark-card border-dark-border' : 'bg-white border-slate-100'
        }`}>
          <div className={`p-4 border-b rounded-t-2xl ${
            isDark ? 'border-dark-border bg-dark-border/50' : 'border-slate-100 bg-slate-50/50'
          }`}>
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('chat.history')}</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {chat.messages.length > 0 ? chat.messages.map((msg) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'client' ? 'items-start' : 'items-end'}`}
              >
                <div className="flex items-end gap-2 max-w-[80%]">
                  {msg.sender === 'client' && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isDark ? 'bg-dark-border text-gray-300' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {chat.clientName[0]}
                    </div>
                  )}

                  <div className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'client'
                      ? isDark
                        ? 'bg-dark-border text-gray-200 rounded-bl-none'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none'
                      : 'bg-[#FFD700] text-black rounded-br-none shadow-sm'
                  }`}>
                    {msg.text}
                    {msg.hasError && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm animate-pulse">
                        {t('chat.problem')}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xs font-bold text-[#FFD700]">
                      8D
                    </div>
                  )}
                </div>

                <div className="mt-1 flex items-center gap-2 px-1">
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{msg.time}</span>
                  {msg.sender === 'agent' && msg.responseTime && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                      msg.isSlowResponse
                        ? 'border-red-200 bg-red-50 text-red-600'
                        : 'border-green-200 bg-green-50 text-green-600'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {msg.responseTime}
                    </span>
                  )}
                </div>
              </motion.div>
            )) : (
              <div className={`h-full flex flex-col items-center justify-center ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                <MessageCircle className="w-12 h-12 mb-2 opacity-20" />
                <p>{t('chat.history')} недоступна для этого демо</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
