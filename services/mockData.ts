import { ChatAnalysis, MarketingChannel } from '../types';

export const MOCK_CHATS: ChatAnalysis[] = [
  {
    id: '1',
    clientName: 'Bakhtiyar',
    clientPhone: '+7 701 555 42 12',
    agentName: 'Alya',
    date: '21.01.2026',
    amount: 35000,
    status: 'completed',
    overallScore: 6.5,
    source: 'Instagram',
    summary: 'Несмотря на хорошую работу агента по консультированию и оформлению заказа, значительные задержки в ответах могли создать негативное впечатление.',
    goodPoints: [
      'Агент предоставил подробную консультацию по услугам.',
      'Общение было вежливым и структурным.',
      'Все шаги по оформлению сделки выполнены корректно.'
    ],
    criticalIssues: [
      'Критические задержки в ответах (более 5 минут) в активной фазе.',
      'Не было предложено альтернативных дат при первом отказе.'
    ],
    missedOpportunities: [
      'Не было попытки дополнительной продажи (upsell) фотографа.',
      'Не взят контакт для рассылки анонсов.'
    ],
    categoryScores: [
      { name: 'Приветствие', score: 5.0 },
      { name: 'Скорость ответа', score: 4.0 },
      { name: 'Знание продукта', score: 8.0 },
      { name: 'Техника продаж', score: 7.0 },
      { name: 'Коммуникация', score: 8.0 },
      { name: 'Обработка заказа', score: 9.0 },
      { name: 'Решение проблем', score: 7.0 },
    ],
    messages: [
      { id: 1, time: '19:26', sender: 'client', text: 'Классно! Видел ваше шоу в инсте.' },
      { id: 2, time: '19:28', sender: 'client', text: 'Давайте тогда что-то закажу у вас на ДР.' },
      { id: 3, time: '19:34', sender: 'agent', text: 'Добрый вечер! По какому поводу Вы обращаетесь: день рождения, особое событие или просто для настроения? И какой бюджет рассматриваете?', responseTime: '6 мин', isSlowResponse: true, hasError: true },
      { id: 4, time: '19:35', sender: 'client', text: 'ДР сына, 10 лет. Бюджет до 40к.' },
      { id: 5, time: '19:36', sender: 'agent', text: 'Отлично! Для 10 лет идеально подойдет программа "TikTok Party" или "Among Us". Стоимость 35 000 тг за 2 часа. Входит 2 аниматора.', responseTime: '1 мин' },
      { id: 6, time: '19:37', sender: 'client', text: 'О, Амонг Ас он любит. Давайте её.' },
      { id: 7, time: '19:40', sender: 'agent', text: 'Записала! Дата 25 января, верно? Пришлите адрес.', responseTime: '3 мин' },
    ]
  },
  {
    id: '2',
    clientName: 'Asel Nurlanova',
    clientPhone: '+7 702 333 11 00',
    agentName: 'Damir',
    date: '20.01.2026',
    amount: 28000,
    status: 'rejected',
    overallScore: 4.2,
    source: 'Google Ads',
    summary: 'Менеджер не смог отработать возражение по цене, клиент ушел к конкурентам.',
    goodPoints: ['Быстрое приветствие.'],
    criticalIssues: ['Грубый тон при обсуждении скидок.', 'Не знание текущих акций.'],
    missedOpportunities: ['Не предложен пакет "Эконом".'],
    categoryScores: [
      { name: 'Приветствие', score: 8.0 },
      { name: 'Скорость ответа', score: 9.0 },
      { name: 'Знание продукта', score: 3.0 },
      { name: 'Техника продаж', score: 4.0 },
      { name: 'Коммуникация', score: 4.0 },
      { name: 'Обработка заказа', score: 2.0 },
      { name: 'Решение проблем', score: 3.0 },
    ],
    messages: [
      { id: 1, time: '10:00', sender: 'client', text: 'Здравствуйте, сколько стоит аниматор?' },
      { id: 2, time: '10:01', sender: 'agent', text: 'От 25 000 тенге.', responseTime: '1 мин' },
      { id: 3, time: '10:05', sender: 'client', text: 'А скидки есть?' },
      { id: 4, time: '10:06', sender: 'agent', text: 'Нет, у нас фиксированные цены. Если дорого, ищите других.', responseTime: '1 мин', hasError: true },
    ]
  },
  {
    id: '3',
    clientName: 'Marat Serikov',
    clientPhone: '+7 777 123 45 67',
    agentName: 'Alya',
    date: '20.01.2026',
    amount: 45000,
    status: 'completed',
    overallScore: 7.8,
    source: 'Recommendation',
    summary: 'Отличная работа, сделка закрыта быстро. Небольшие недочеты в скрипте прощания.',
    goodPoints: ['Инициатива в диалоге.', 'Быстрое закрытие сделки.'],
    criticalIssues: [],
    missedOpportunities: ['Можно было предложить оформление шарами.'],
    categoryScores: [
      { name: 'Приветствие', score: 9.0 },
      { name: 'Скорость ответа', score: 9.5 },
      { name: 'Знание продукта', score: 9.0 },
      { name: 'Техника продаж', score: 8.5 },
      { name: 'Коммуникация', score: 9.0 },
      { name: 'Обработка заказа', score: 9.0 },
      { name: 'Решение проблем', score: 8.0 },
    ],
    messages: []
  }
];

export const MARKETING_DATA: MarketingChannel[] = [
  { name: 'Instagram', value: 45, color: '#E1306C', conversionRate: 40, roi: '260%', spend: '150 000 ₸', revenue: '540 000 ₸' },
  { name: 'Google Ads', value: 25, color: '#4285F4', conversionRate: 48, roi: '260%', spend: '100 000 ₸', revenue: '360 000 ₸' },
  { name: 'WhatsApp', value: 15, color: '#25D366', conversionRate: 53, roi: 'Infinite', spend: '0 ₸', revenue: '210 000 ₸' },
  { name: 'Referral', value: 10, color: '#FFD700', conversionRate: 70, roi: 'High', spend: '10 000 ₸', revenue: '150 000 ₸' },
  { name: '2GIS', value: 5, color: '#10B981', conversionRate: 20, roi: '150%', spend: '50 000 ₸', revenue: '75 000 ₸' },
];

export const TRENDS_DATA = [
  { day: 'Mon', score: 6.2, chats: 12 },
  { day: 'Tue', score: 6.8, chats: 19 },
  { day: 'Wed', score: 7.1, chats: 15 },
  { day: 'Thu', score: 6.5, chats: 22 },
  { day: 'Fri', score: 7.5, chats: 28 },
  { day: 'Sat', score: 8.0, chats: 35 },
  { day: 'Sun', score: 7.8, chats: 30 },
];
