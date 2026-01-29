import { ChatAnalysis, MarketingChannel } from '../types';

export const MOCK_CHATS: ChatAnalysis[] = [
  // =============================================
  // ПОЗИТИВНЫЕ ПРИМЕРЫ (3 шт) - быстрые ответы, отличная работа
  // =============================================
  {
    id: '1',
    clientName: 'Айгуль Сериккызы',
    clientPhone: '+7 701 555 42 12',
    agentName: 'Алия',
    date: '28.01.2026',
    amount: 185000,
    status: 'completed',
    overallScore: 9.2,
    source: 'Instagram',
    responseTimeAvg: '47 сек',
    firstResponseTime: '32 сек',
    summary: 'Идеальная работа менеджера. Молниеносные ответы, полное выявление потребностей, грамотное закрытие на свадебный пакет "Всё включено".',
    goodPoints: [
      'Ответ на первое сообщение за 32 секунды - клиент сразу вовлечён',
      'Выявила бюджет и дату мероприятия за 2 минуты',
      'Предложила upsell: фотограф + видеограф со скидкой 15%',
      'Закрыла на предоплату в том же диалоге'
    ],
    criticalIssues: [],
    missedOpportunities: [
      'Можно было предложить VIP-декор зала'
    ],
    categoryScores: [
      { name: 'Приветствие', score: 10.0 },
      { name: 'Скорость ответа', score: 9.5 },
      { name: 'Знание продукта', score: 9.0 },
      { name: 'Техника продаж', score: 9.5 },
      { name: 'Коммуникация', score: 9.0 },
      { name: 'Обработка заказа', score: 9.0 },
      { name: 'Решение проблем', score: 9.0 },
    ],
    messages: [
      { id: 1, time: '14:22', sender: 'client', text: 'Здравствуйте! Видела ваши работы, хотим свадьбу у вас организовать' },
      { id: 2, time: '14:22', sender: 'agent', text: 'Добрый день, Айгуль! Рада видеть вас 💛 Поздравляю с предстоящим событием! Расскажите, когда планируете торжество и на сколько гостей?', responseTime: '32 сек', isSlowResponse: false },
      { id: 3, time: '14:23', sender: 'client', text: '15 марта, около 80 человек. Бюджет примерно 200к' },
      { id: 4, time: '14:23', sender: 'agent', text: 'Отлично! Для 80 гостей идеально подойдёт наш пакет "Премиум" за 185 000 ₸. В него входит: ведущий + DJ, 2 танцевальных шоу, фотозона, координатор. Могу показать портфолио?', responseTime: '45 сек', isSlowResponse: false },
      { id: 5, time: '14:24', sender: 'client', text: 'Да, покажите пожалуйста!' },
      { id: 6, time: '14:25', sender: 'agent', text: '[Отправила портфолио] И кстати, у нас сейчас акция: при заказе пакета "Премиум" - фотограф и видеограф со скидкой 15%. Хотите добавить?', responseTime: '55 сек', isSlowResponse: false },
      { id: 7, time: '14:26', sender: 'client', text: 'Давайте! Как оплатить?' },
      { id: 8, time: '14:27', sender: 'agent', text: 'Супер! Для брони нужна предоплата 50% - 92 500 ₸. Отправляю реквизиты и договор на WhatsApp. После оплаты дата 15 марта будет закреплена за вами 🎉', responseTime: '48 сек', isSlowResponse: false },
    ]
  },
  {
    id: '2',
    clientName: 'ТОО "Астана Групп"',
    clientPhone: '+7 717 222 33 44',
    agentName: 'Марат',
    date: '27.01.2026',
    amount: 420000,
    status: 'completed',
    overallScore: 8.8,
    source: 'Google Ads',
    responseTimeAvg: '1 мин 12 сек',
    firstResponseTime: '58 сек',
    summary: 'Отличная работа с B2B клиентом. Быстрые ответы, профессиональный подход, грамотно закрыл корпоратив на 120 человек.',
    goodPoints: [
      'Сразу перешёл на деловой тон для корпоративного клиента',
      'Предложил 3 варианта пакетов с детальным сравнением',
      'Учёл специфику IT-компании - добавил тимбилдинг',
      'Договорился о встрече для финального согласования'
    ],
    criticalIssues: [],
    missedOpportunities: [],
    categoryScores: [
      { name: 'Приветствие', score: 9.0 },
      { name: 'Скорость ответа', score: 8.5 },
      { name: 'Знание продукта', score: 9.5 },
      { name: 'Техника продаж', score: 9.0 },
      { name: 'Коммуникация', score: 9.0 },
      { name: 'Обработка заказа', score: 8.5 },
      { name: 'Решение проблем', score: 8.5 },
    ],
    messages: [
      { id: 1, time: '11:00', sender: 'client', text: 'Добрый день. Нужен корпоратив для IT компании, 120 человек' },
      { id: 2, time: '11:01', sender: 'agent', text: 'Добрый день! Марат, отдел корпоративных мероприятий. Рад вашему обращению. Когда планируете мероприятие и какой формат рассматриваете?', responseTime: '58 сек', isSlowResponse: false },
      { id: 3, time: '11:02', sender: 'client', text: '20 февраля. Нужен ведущий, музыка, что-то интерактивное для айтишников' },
      { id: 4, time: '11:03', sender: 'agent', text: 'Понял! Для IT-команды рекомендую формат с квизами и VR-зоной. Есть 3 пакета: Стандарт (280К), Бизнес (380К) с тимбилдингом, и Премиум (450К) с полной организацией. Какой бюджет закладываете?', responseTime: '1 мин 15 сек', isSlowResponse: false },
      { id: 5, time: '11:05', sender: 'client', text: 'До 450, но хотим понять что входит' },
      { id: 6, time: '11:06', sender: 'agent', text: 'Отправляю детальную презентацию всех пакетов. Предлагаю встретиться завтра в 15:00 - покажу площадку и обсудим детали. Удобно?', responseTime: '1 мин 8 сек', isSlowResponse: false },
    ]
  },
  {
    id: '3',
    clientName: 'Дана Муратова',
    clientPhone: '+7 707 888 99 00',
    agentName: 'Алия',
    date: '26.01.2026',
    amount: 45000,
    status: 'completed',
    overallScore: 8.5,
    source: 'WhatsApp Direct',
    responseTimeAvg: '38 сек',
    firstResponseTime: '25 сек',
    summary: 'Рекордно быстрые ответы! Клиент пришёл по рекомендации, менеджер отлично отработала - детский праздник закрыт за 8 минут диалога.',
    goodPoints: [
      'Ответ за 25 секунд - лучший показатель дня',
      'Сразу уточнила возраст ребёнка для подбора программы',
      'Предложила актуальную тематику (Minecraft)',
      'Добавила аквагрим как бонус'
    ],
    criticalIssues: [],
    missedOpportunities: [
      'Не предложила фотосъёмку'
    ],
    categoryScores: [
      { name: 'Приветствие', score: 9.0 },
      { name: 'Скорость ответа', score: 10.0 },
      { name: 'Знание продукта', score: 8.5 },
      { name: 'Техника продаж', score: 8.0 },
      { name: 'Коммуникация', score: 9.0 },
      { name: 'Обработка заказа', score: 8.5 },
      { name: 'Решение проблем', score: 8.0 },
    ],
    messages: [
      { id: 1, time: '16:40', sender: 'client', text: 'Привет! Подруга посоветовала вас. Нужен ДР для сына' },
      { id: 2, time: '16:40', sender: 'agent', text: 'Привет, Дана! 💛 Спасибо за доверие! Сколько лет исполняется и когда праздник?', responseTime: '25 сек', isSlowResponse: false },
      { id: 3, time: '16:41', sender: 'client', text: '8 лет, 2 февраля. Он фанат Майнкрафта' },
      { id: 4, time: '16:41', sender: 'agent', text: 'О, отлично! У нас как раз новая программа "Minecraft Party" - 2 аниматора в костюмах, квесты, мастер-класс по крафтингу. 45 000 ₸ за 2 часа. В подарок аквагрим для всех детей! 🎮', responseTime: '42 сек', isSlowResponse: false },
      { id: 5, time: '16:42', sender: 'client', text: 'Супер! Берём! Куда платить?' },
      { id: 6, time: '16:43', sender: 'agent', text: 'Отлично! Записала на 2 февраля. Предоплата 22 500 ₸ для брони. Отправляю реквизиты 👇', responseTime: '35 сек', isSlowResponse: false },
    ]
  },

  // =============================================
  // НЕГАТИВНЫЕ ПРИМЕРЫ (3 шт) - медленные ответы, ошибки
  // =============================================
  {
    id: '4',
    clientName: 'Бахытжан Касымов',
    clientPhone: '+7 701 555 42 12',
    agentName: 'Дамир',
    date: '25.01.2026',
    amount: 0,
    status: 'rejected',
    overallScore: 3.2,
    source: 'Instagram',
    responseTimeAvg: '8 мин 45 сек',
    firstResponseTime: '12 мин',
    summary: 'КРИТИЧНО: Клиент потерян из-за катастрофических задержек. Первый ответ через 12 минут - клиент уже нашёл конкурентов. Грубый тон усугубил ситуацию.',
    goodPoints: [],
    criticalIssues: [
      'Первый ответ через 12 минут - клиент написал "алло, есть кто?"',
      'Грубый тон: "Ну подождите, я один тут работаю"',
      'Не извинился за задержку',
      'Клиент ушёл к конкурентам и написал негативный отзыв'
    ],
    missedOpportunities: [
      'Потерянная сделка на ~50 000 ₸',
      'Негативный отзыв в Instagram'
    ],
    categoryScores: [
      { name: 'Приветствие', score: 2.0 },
      { name: 'Скорость ответа', score: 1.0 },
      { name: 'Знание продукта', score: 5.0 },
      { name: 'Техника продаж', score: 3.0 },
      { name: 'Коммуникация', score: 2.0 },
      { name: 'Обработка заказа', score: 1.0 },
      { name: 'Решение проблем', score: 2.0 },
    ],
    messages: [
      { id: 1, time: '19:15', sender: 'client', text: 'Здравствуйте! Хочу заказать шоу на юбилей мамы' },
      { id: 2, time: '19:22', sender: 'client', text: 'Алло, есть кто?' },
      { id: 3, time: '19:27', sender: 'agent', text: 'Да, здравствуйте', responseTime: '12 мин', isSlowResponse: true, hasError: true },
      { id: 4, time: '19:28', sender: 'client', text: 'Наконец-то. Нужно шоу на 60 лет маме, 1 февраля' },
      { id: 5, time: '19:35', sender: 'agent', text: 'Ну подождите, я один тут работаю. Какой бюджет?', responseTime: '7 мин', isSlowResponse: true, hasError: true },
      { id: 6, time: '19:36', sender: 'client', text: 'Неважно уже. Нашёл других, они за минуту ответили. Удачи.' },
    ]
  },
  {
    id: '5',
    clientName: 'Асель Нурланова',
    clientPhone: '+7 702 333 11 00',
    agentName: 'Дамир',
    date: '24.01.2026',
    amount: 0,
    status: 'rejected',
    overallScore: 4.1,
    source: 'Google Ads',
    responseTimeAvg: '5 мин 20 сек',
    firstResponseTime: '6 мин',
    summary: 'Клиент потерян из-за неумения работать с возражениями. Менеджер не знал текущих акций, грубо ответил на вопрос о скидке.',
    goodPoints: [
      'Хотя бы ответил на все вопросы'
    ],
    criticalIssues: [
      'Задержка первого ответа 6 минут при активном клиенте',
      'Грубый ответ: "Если дорого, ищите других"',
      'Не знал о текущей акции -10% для новых клиентов',
      'Не предложил альтернативный пакет'
    ],
    missedOpportunities: [
      'Был пакет "Эконом" за 25К - идеально под запрос клиента',
      'Акция -10% могла закрыть сделку'
    ],
    categoryScores: [
      { name: 'Приветствие', score: 6.0 },
      { name: 'Скорость ответа', score: 4.0 },
      { name: 'Знание продукта', score: 3.0 },
      { name: 'Техника продаж', score: 3.0 },
      { name: 'Коммуникация', score: 4.0 },
      { name: 'Обработка заказа', score: 2.0 },
      { name: 'Решение проблем', score: 3.0 },
    ],
    messages: [
      { id: 1, time: '10:00', sender: 'client', text: 'Здравствуйте, сколько стоит аниматор на детский праздник?' },
      { id: 2, time: '10:06', sender: 'agent', text: 'От 35 000 тенге.', responseTime: '6 мин', isSlowResponse: true },
      { id: 3, time: '10:07', sender: 'client', text: 'А что входит? И есть скидки?' },
      { id: 4, time: '10:12', sender: 'agent', text: '2 аниматора, 2 часа. Скидок нет.', responseTime: '5 мин', isSlowResponse: true },
      { id: 5, time: '10:13', sender: 'client', text: 'Дороговато... у конкурентов видела за 28К' },
      { id: 6, time: '10:18', sender: 'agent', text: 'У нас качество. Если дорого - ищите других.', responseTime: '5 мин', isSlowResponse: true, hasError: true },
      { id: 7, time: '10:19', sender: 'client', text: 'Ладно, поищу' },
    ]
  },
  {
    id: '6',
    clientName: 'Ержан Муканов',
    clientPhone: '+7 771 444 55 66',
    agentName: 'Бахытжан',
    date: '23.01.2026',
    amount: 0,
    status: 'rejected',
    overallScore: 2.8,
    source: 'WhatsApp Direct',
    responseTimeAvg: '15 мин',
    firstResponseTime: '23 мин',
    summary: 'ПРОВАЛ: Горячий лид на корпоратив 200К потерян из-за игнорирования. Клиент писал 3 раза, ответ пришёл через 23 минуты. К этому моменту уже забронировал у конкурента.',
    goodPoints: [],
    criticalIssues: [
      'Игнорирование клиента 23 минуты - НЕДОПУСТИМО',
      'Клиент писал 3 сообщения подряд без ответа',
      'Горячий корпоративный лид - потенциал 200К+',
      'Когда ответил - клиент уже оплатил конкурентам'
    ],
    missedOpportunities: [
      'Потеря крупной сделки 200 000+ ₸',
      'B2B клиент мог стать постоянным',
      'Репутационный урон - HR директор крупной компании'
    ],
    categoryScores: [
      { name: 'Приветствие', score: 3.0 },
      { name: 'Скорость ответа', score: 1.0 },
      { name: 'Знание продукта', score: 4.0 },
      { name: 'Техника продаж', score: 2.0 },
      { name: 'Коммуникация', score: 3.0 },
      { name: 'Обработка заказа', score: 1.0 },
      { name: 'Решение проблем', score: 2.0 },
    ],
    messages: [
      { id: 1, time: '15:00', sender: 'client', text: 'Добрый день! Срочно нужен корпоратив на 100 человек, 5 февраля. IT компания.' },
      { id: 2, time: '15:08', sender: 'client', text: 'Есть кто? Это срочно, бюджет не ограничен' },
      { id: 3, time: '15:15', sender: 'client', text: 'Окей, понял. Пишу в другое агентство' },
      { id: 4, time: '15:23', sender: 'agent', text: 'Здравствуйте! Извините за задержку. Готовы обсудить ваш корпоратив.', responseTime: '23 мин', isSlowResponse: true, hasError: true },
      { id: 5, time: '15:25', sender: 'client', text: 'Уже поздно. 10 минут назад оплатил другим. У вас проблемы с сервисом - 23 минуты ждал ответа при "срочно".' },
    ]
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
