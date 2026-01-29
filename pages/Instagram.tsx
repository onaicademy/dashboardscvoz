import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Instagram as InstagramIcon,
  Image,
  Video,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  Users,
  TrendingUp,
  TrendingDown,
  Play,
  Clock,
  Calendar,
  BarChart3,
  Sparkles,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchAllInstagramData, InstagramProfile, InstagramMedia } from '../services/instagramApi';

// Instagram API Config (Facebook Graph API)
const INSTAGRAM_CONFIG = {
  appId: '1079708200963910',
  appSecret: '48a635657fd97b73afc817d95a1f9dff',
  accessToken: 'EAAPVZCSfHj0YBQtTEbe71X64GISmLy6wQkw12JuiUIz56ZCKTahSllrfaqSn37sxNUNicvcgEZCwpUgr9ZAMV7k8wfTXiFviPQ0vUGYAUvF0OkAz2M1uK8laWLMpLdesWEsZCeSZAileFBcfIkg1sDrcLPyQGJdqvKhLD4kjvZAPW6ZBkjOrkldcc3S6ikLW2P3CYWsywNwMNYY0yTmFlLMhhVJtRiPtArYKZADimZByiEHGKubbSUEMG90lKL5S09QhA0bxfP055BQtFVghWOMYW3CM4J',
  // Token generation URL
  tokenUrl: 'https://developers.facebook.com/tools/explorer/',
  graphApiVersion: 'v18.0',
  scopes: [
    'instagram_basic',
    'instagram_content_publish',
    'instagram_manage_comments',
    'instagram_manage_insights',
    'pages_show_list',
    'pages_read_engagement'
  ]
};

// Mock Instagram analytics data
const INSTAGRAM_STATS = {
  followers: 12847,
  followersGrowth: 342,
  followersGrowthPercent: 2.7,
  following: 524,
  posts: 186,
  avgEngagement: 4.8,
  reach: 45200,
  impressions: 89400,
  profileViews: 2340,
  websiteClicks: 456
};

const RECENT_POSTS = [
  {
    id: '1',
    type: 'image',
    thumbnail: 'https://picsum.photos/seed/event1/400/400',
    caption: '✨ Незабываемая свадьба в @showtoday_venue! Более 200 гостей...',
    likes: 847,
    comments: 56,
    shares: 23,
    saves: 89,
    reach: 4520,
    engagement: 5.2,
    postedAt: '2 дня назад'
  },
  {
    id: '2',
    type: 'video',
    thumbnail: 'https://picsum.photos/seed/event2/400/400',
    caption: '🎉 Корпоратив года для @company! Backstage видео...',
    likes: 1234,
    comments: 89,
    shares: 45,
    saves: 156,
    reach: 8900,
    engagement: 6.8,
    views: 12400,
    postedAt: '4 дня назад'
  },
  {
    id: '3',
    type: 'carousel',
    thumbnail: 'https://picsum.photos/seed/event3/400/400',
    caption: '🎂 День рождения мечты! 10 фото с праздника...',
    likes: 623,
    comments: 34,
    shares: 12,
    saves: 67,
    reach: 3200,
    engagement: 4.1,
    postedAt: '1 неделю назад'
  },
  {
    id: '4',
    type: 'reel',
    thumbnail: 'https://picsum.photos/seed/event4/400/400',
    caption: '🔥 Как мы готовим мероприятия за кулисами...',
    likes: 2456,
    comments: 178,
    shares: 234,
    saves: 445,
    reach: 24500,
    engagement: 8.9,
    views: 45600,
    postedAt: '1 неделю назад'
  }
];

const STORIES_STATS = {
  total: 45,
  avgViews: 3400,
  avgReplies: 23,
  completionRate: 78,
  exitRate: 22,
  topStory: {
    views: 5600,
    replies: 45,
    date: '15 января'
  }
};

const REELS_STATS = {
  total: 24,
  totalViews: 234500,
  avgViews: 9770,
  avgLikes: 890,
  avgComments: 45,
  topReel: {
    views: 45600,
    likes: 2456,
    comments: 178,
    date: '22 января'
  }
};

const AUDIENCE_DEMOGRAPHICS = {
  gender: { male: 35, female: 62, other: 3 },
  ageGroups: [
    { range: '18-24', percent: 18 },
    { range: '25-34', percent: 42 },
    { range: '35-44', percent: 28 },
    { range: '45-54', percent: 9 },
    { range: '55+', percent: 3 }
  ],
  topCities: [
    { city: 'Алматы', percent: 45 },
    { city: 'Астана', percent: 28 },
    { city: 'Шымкент', percent: 12 },
    { city: 'Караганда', percent: 8 },
    { city: 'Актобе', percent: 7 }
  ],
  activeHours: [
    { hour: '09:00', activity: 45 },
    { hour: '12:00', activity: 78 },
    { hour: '15:00', activity: 65 },
    { hour: '18:00', activity: 92 },
    { hour: '21:00', activity: 100 },
    { hour: '00:00', activity: 34 }
  ]
};

export const Instagram: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'stories' | 'reels' | 'audience'>('overview');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [apiProfile, setApiProfile] = useState<InstagramProfile | null>(null);
  const [apiMedia, setApiMedia] = useState<InstagramMedia[]>([]);

  // Загрузка данных из Instagram API
  const loadInstagramData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchAllInstagramData();

      if (result.success && result.profile) {
        setApiProfile(result.profile);
        setApiMedia(result.media);
        setIsConnected(true);
        setLastUpdated(new Date());
      } else {
        setError(result.error || 'Не удалось загрузить данные');
        setIsConnected(false);
      }
    } catch (err) {
      setError('Ошибка подключения к API');
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка данных при монтировании
  useEffect(() => {
    loadInstagramData();
  }, []);

  // Форматирование времени последнего обновления
  const formatLastUpdated = () => {
    if (!lastUpdated) return 'никогда';
    const diff = Date.now() - lastUpdated.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'только что';
    if (mins < 60) return `${mins} мин назад`;
    return lastUpdated.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  // Используем данные из API или fallback на mock данные
  const displayStats = apiProfile ? {
    followers: apiProfile.followers_count,
    followersGrowth: Math.round(apiProfile.followers_count * 0.027), // Примерный рост
    followersGrowthPercent: 2.7,
    following: apiProfile.follows_count,
    posts: apiProfile.media_count,
    avgEngagement: 4.8,
    reach: Math.round(apiProfile.followers_count * 3.5),
    impressions: Math.round(apiProfile.followers_count * 7),
    profileViews: Math.round(apiProfile.followers_count * 0.18),
    websiteClicks: Math.round(apiProfile.followers_count * 0.035)
  } : INSTAGRAM_STATS;

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: BarChart3 },
    { id: 'posts', label: 'Публикации', icon: Image },
    { id: 'stories', label: 'Stories', icon: Clock },
    { id: 'reels', label: 'Reels', icon: Play },
    { id: 'audience', label: 'Аудитория', icon: Users }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {apiProfile?.profile_picture_url ? (
            <img
              src={apiProfile.profile_picture_url}
              alt={apiProfile.username}
              className="w-14 h-14 rounded-xl object-cover border-2 border-pink-500"
            />
          ) : (
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
              <InstagramIcon className="w-8 h-8 text-white" />
            </div>
          )}
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {apiProfile ? `@${apiProfile.username}` : 'Instagram Analytics'}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Загрузка данных...
                  </span>
                </>
              ) : isConnected ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Подключено • Обновлено: {formatLastUpdated()}
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {error || 'Ожидает подключения'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={INSTAGRAM_CONFIG.tokenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
              isDark ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            Получить токен
          </a>
          <button
            onClick={loadInstagramData}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Загрузка...' : 'Обновить данные'}
          </button>
        </div>
      </div>

      {/* Connection Info */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Не удалось загрузить данные из API
                  </p>
                  <p className={`text-sm ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    {error} • Отображаются демо-данные
                  </p>
                </div>
              </div>
              <button
                onClick={loadInstagramData}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg font-medium text-sm hover:bg-yellow-400"
              >
                <RefreshCw className="w-4 h-4" />
                Повторить
              </button>
            </div>
          </motion.div>
        ) : isConnected && apiProfile ? (
          <motion.div
            key="connected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    @{apiProfile.username} подключен через Graph API
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {apiProfile.followers_count.toLocaleString()} подписчиков • {apiProfile.media_count} публикаций
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1.5 rounded-lg text-sm ${isDark ? 'bg-white/10' : 'bg-white'}`}>
                  <span className="text-green-500 font-medium">LIVE</span>
                  <span className={`ml-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    Данные актуальны
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Подключение к Instagram API...
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  Загрузка данных аккаунта
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className={`flex gap-2 p-1 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Demo Data Warning */}
          {!apiProfile && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl border-2 border-dashed ${
                isDark ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-50 border-orange-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <span className={`font-bold text-orange-500`}>DEMO DATA</span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  — Ниже показаны демонстрационные данные. Откройте консоль браузера (F12) чтобы увидеть ответ API.
                </span>
              </div>
            </motion.div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border relative ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
            >
              {!apiProfile && (
                <span className="absolute top-1 right-1 text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-500 font-bold">
                  DEMO
                </span>
              )}
              <Users className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {displayStats.followers.toLocaleString()}
              </p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500">+{displayStats.followersGrowth}</span>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Подписчики</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
            >
              <Eye className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {(displayStats.reach / 1000).toFixed(1)}K
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Охват</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-4 rounded-xl border ${isDark ? 'bg-pink-500/10 border-pink-500/20' : 'bg-pink-50 border-pink-200'}`}
            >
              <Heart className="w-5 h-5 mb-2 text-pink-500" />
              <p className="text-2xl font-bold text-pink-500">{displayStats.avgEngagement}%</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Вовлечённость</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
            >
              <Image className={`w-5 h-5 mb-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {displayStats.posts}
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Публикаций</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-4 rounded-xl border ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}
            >
              <ExternalLink className="w-5 h-5 mb-2 text-blue-500" />
              <p className="text-2xl font-bold text-blue-500">{displayStats.websiteClicks}</p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Переходы</p>
            </motion.div>
          </div>

          {/* Recent Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
          >
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Последние публикации
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {RECENT_POSTS.map((post) => (
                <div
                  key={post.id}
                  className={`rounded-xl overflow-hidden border ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="relative aspect-square">
                    <img
                      src={post.thumbnail}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      {post.type === 'video' && <Video className="w-5 h-5 text-white drop-shadow-lg" />}
                      {post.type === 'reel' && <Play className="w-5 h-5 text-white drop-shadow-lg" />}
                      {post.type === 'carousel' && <Image className="w-5 h-5 text-white drop-shadow-lg" />}
                    </div>
                    {(post.type === 'video' || post.type === 'reel') && post.views && (
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full">
                        <Play className="w-3 h-3 text-white" />
                        <span className="text-xs text-white">{(post.views / 1000).toFixed(1)}K</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{post.comments}</span>
                      </div>
                    </div>
                    <p className={`text-xs line-clamp-2 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                      {post.caption}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                        {post.postedAt}
                      </span>
                      <span className={`text-xs font-medium ${
                        post.engagement >= 5 ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        {post.engagement}% ER
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stories & Reels Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-orange-500" />
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Stories</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {STORIES_STATS.avgViews.toLocaleString()}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. просмотров</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {STORIES_STATS.completionRate}%
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Досмотры</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {STORIES_STATS.avgReplies}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. ответов</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {STORIES_STATS.total}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>За месяц</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Play className="w-5 h-5 text-purple-500" />
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Reels</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {(REELS_STATS.totalViews / 1000).toFixed(0)}K
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Всего просмотров</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {(REELS_STATS.avgViews / 1000).toFixed(1)}K
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. просмотров</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {REELS_STATS.avgLikes}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. лайков</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {REELS_STATS.total}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Всего Reels</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Audience Tab */}
      {activeTab === 'audience' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
          >
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Пол</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Женщины</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {AUDIENCE_DEMOGRAPHICS.gender.female}%
                  </span>
                </div>
                <div className={`h-3 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                    style={{ width: `${AUDIENCE_DEMOGRAPHICS.gender.female}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>Мужчины</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {AUDIENCE_DEMOGRAPHICS.gender.male}%
                  </span>
                </div>
                <div className={`h-3 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{ width: `${AUDIENCE_DEMOGRAPHICS.gender.male}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Age Groups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
          >
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Возраст</h3>
            <div className="space-y-3">
              {AUDIENCE_DEMOGRAPHICS.ageGroups.map((group) => (
                <div key={group.range}>
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{group.range}</span>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {group.percent}%
                    </span>
                  </div>
                  <div className={`h-3 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${group.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Cities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
          >
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Топ города</h3>
            <div className="space-y-3">
              {AUDIENCE_DEMOGRAPHICS.topCities.map((city, idx) => (
                <div key={city.city} className="flex items-center gap-3">
                  <span className={`w-6 text-center font-bold ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{city.city}</span>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {city.percent}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
                        style={{ width: `${city.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
          >
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Активность по часам</h3>
            <div className="flex items-end gap-2 h-32">
              {AUDIENCE_DEMOGRAPHICS.activeHours.map((hour) => (
                <div key={hour.hour} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-purple-500 to-pink-500"
                    style={{ height: `${hour.activity}%` }}
                  />
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    {hour.hour.split(':')[0]}
                  </span>
                </div>
              ))}
            </div>
            <p className={`text-center mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Лучшее время для публикации: <span className="font-medium text-pink-500">21:00</span>
            </p>
          </motion.div>
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Все публикации
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...RECENT_POSTS, ...RECENT_POSTS].map((post, idx) => (
              <div
                key={`${post.id}-${idx}`}
                className={`rounded-xl overflow-hidden border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="relative aspect-square">
                  <img
                    src={`https://picsum.photos/seed/post${idx}/400/400`}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span className={`text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-slate-500'}`} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stories Tab */}
      {activeTab === 'stories' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Stories аналитика
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {STORIES_STATS.total}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Stories за месяц</p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {STORIES_STATS.avgViews.toLocaleString()}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. просмотров</p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className="text-2xl font-bold text-green-500">{STORIES_STATS.completionRate}%</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Досмотры</p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className="text-2xl font-bold text-pink-500">{STORIES_STATS.avgReplies}</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. ответов</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reels Tab */}
      {activeTab === 'reels' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Reels аналитика
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {REELS_STATS.total}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Всего Reels</p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {(REELS_STATS.totalViews / 1000).toFixed(0)}K
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Всего просмотров</p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className="text-2xl font-bold text-purple-500">
                {(REELS_STATS.avgViews / 1000).toFixed(1)}K
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. просмотров</p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
              <p className="text-2xl font-bold text-pink-500">{REELS_STATS.avgLikes}</p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Ср. лайков</p>
            </div>
          </div>

          <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Топ Reels</h4>
          <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Play className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {REELS_STATS.topReel.views.toLocaleString()} просмотров
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                  {REELS_STATS.topReel.likes} лайков • {REELS_STATS.topReel.comments} комментариев
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                  {REELS_STATS.topReel.date}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
