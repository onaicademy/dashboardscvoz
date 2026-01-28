import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'kz';

interface Translations {
  [key: string]: {
    ru: string;
    kz: string;
  };
}

export const translations: Translations = {
  'nav.dashboard': { ru: 'Панель управления', kz: 'Басқару панелі' },
  'nav.analytics': { ru: 'Анализы чатов', kz: 'Чат талдаулары' },
  'nav.trends': { ru: 'Тренды', kz: 'Трендтер' },
  'nav.marketing': { ru: 'Маркетинг', kz: 'Маркетинг' },
  'nav.settings': { ru: 'Настройки', kz: 'Баптаулар' },
  'dashboard.title': { ru: 'Панель управления', kz: 'Басқару панелі' },
  'dashboard.subtitle': { ru: 'Обзор качества обслуживания в чатах', kz: 'Чаттардағы қызмет көрсету сапасына шолу' },
  'dashboard.avgScore': { ru: 'Средняя оценка', kz: 'Орташа баға' },
  'dashboard.totalChats': { ru: 'Всего чатов', kz: 'Барлық чаттар' },
  'dashboard.ordersCompleted': { ru: 'Заказов оформлено', kz: 'Тапсырыстар рәсімделді' },
  'dashboard.conversion': { ru: 'Конверсия', kz: 'Конверсия' },
  'dashboard.categoryScores': { ru: 'Оценки по категориям', kz: 'Санаттар бойынша бағалар' },
  'dashboard.frequentErrors': { ru: 'Частые ошибки', kz: 'Жиі қателіктер' },
  'dashboard.recentAnalysis': { ru: 'Последние анализы', kz: 'Соңғы талдаулар' },
  'dashboard.viewAll': { ru: 'Смотреть все', kz: 'Барлығын көру' },
  'dashboard.restartAnalysis': { ru: 'Перезапустить анализ', kz: 'Талдауды қайта бастау' },
  'category.salesTechnique': { ru: 'Техника продаж', kz: 'Сату техникасы' },
  'category.productKnowledge': { ru: 'Знание продукта', kz: 'Өнімді білу' },
  'category.support': { ru: 'Сопровождение', kz: 'Қолдау' },
  'category.problemSolving': { ru: 'Решение проблем', kz: 'Мәселелерді шешу' },
  'category.orderProcessing': { ru: 'Обработка заказа', kz: 'Тапсырысты өңдеу' },
  'category.greeting': { ru: 'Приветствие', kz: 'Сәлемдесу' },
  'category.responseSpeed': { ru: 'Скорость ответа', kz: 'Жауап беру жылдамдығы' },
  'category.communication': { ru: 'Коммуникация', kz: 'Коммуникация' },
  'analytics.title': { ru: 'Анализы чатов', kz: 'Чат талдаулары' },
  'analytics.subtitle': { ru: 'Все проанализированные диалоги', kz: 'Барлық талданған диалогтар' },
  'analytics.search': { ru: 'Поиск...', kz: 'Іздеу...' },
  'analytics.filter': { ru: 'Фильтр', kz: 'Сүзгі' },
  'analytics.date': { ru: 'Дата', kz: 'Күні' },
  'analytics.score': { ru: 'Оценка', kz: 'Баға' },
  'analytics.client': { ru: 'Клиент', kz: 'Клиент' },
  'analytics.agent': { ru: 'Агент', kz: 'Агент' },
  'analytics.amount': { ru: 'Сумма', kz: 'Сома' },
  'analytics.source': { ru: 'Источник', kz: 'Көзі' },
  'analytics.status': { ru: 'Статус', kz: 'Күйі' },
  'status.completed': { ru: 'Оформлен', kz: 'Рәсімделген' },
  'status.rejected': { ru: 'Отказ', kz: 'Бас тарту' },
  'status.orderCompleted': { ru: 'ЗАКАЗ ОФОРМЛЕН', kz: 'ТАПСЫРЫС РӘСІМДЕЛДІ' },
  'chat.backToList': { ru: 'Назад к списку', kz: 'Тізімге оралу' },
  'chat.analysisFrom': { ru: 'Анализ от', kz: 'Талдау күні' },
  'chat.aiSummary': { ru: 'Заключение ИИ', kz: 'ЖИ қорытындысы' },
  'chat.goodPoints': { ru: 'Что сделано хорошо', kz: 'Не жақсы жасалды' },
  'chat.criticalProblems': { ru: 'Критические проблемы', kz: 'Маңызды мәселелер' },
  'chat.missedOpportunities': { ru: 'Упущенные возможности', kz: 'Жіберілген мүмкіндіктер' },
  'chat.chatScores': { ru: 'Оценки по чату', kz: 'Чат бойынша бағалар' },
  'chat.history': { ru: 'История переписки', kz: 'Хат алмасу тарихы' },
  'chat.noProblems': { ru: 'Проблем не выявлено', kz: 'Мәселелер анықталмады' },
  'chat.responseTime': { ru: 'Время ответа', kz: 'Жауап беру уақыты' },
  'chat.problem': { ru: 'ПРОБЛЕМА', kz: 'МӘСЕЛЕ' },
  'marketing.title': { ru: 'Маркетинг', kz: 'Маркетинг' },
  'marketing.subtitle': { ru: 'Анализ источников трафика и ROI', kz: 'Трафик көздері мен ROI талдауы' },
  'marketing.sources': { ru: 'Источники заявок', kz: 'Өтініш көздері' },
  'marketing.leads': { ru: 'Лидов', kz: 'Лидтер' },
  'marketing.roi': { ru: 'ROI рекламных каналов', kz: 'Жарнама арналарының ROI' },
  'marketing.channel': { ru: 'Канал', kz: 'Арна' },
  'marketing.conversionRate': { ru: 'Конверсия', kz: 'Конверсия' },
  'marketing.spend': { ru: 'Расходы', kz: 'Шығындар' },
  'marketing.revenue': { ru: 'Выручка', kz: 'Кіріс' },
  'marketing.aiRecommendations': { ru: 'Рекомендации ИИ', kz: 'ЖИ ұсыныстары' },
  'trends.title': { ru: 'Тренды', kz: 'Трендтер' },
  'trends.subtitle': { ru: 'Динамика показателей отдела продаж', kz: 'Сату бөлімі көрсеткіштерінің динамикасы' },
  'trends.quality': { ru: 'Качество обслуживания (7 дней)', kz: 'Қызмет көрсету сапасы (7 күн)' },
  'trends.chatVolume': { ru: 'Количество диалогов', kz: 'Диалогтар саны' },
  'settings.title': { ru: 'Настройки', kz: 'Баптаулар' },
  'settings.available': { ru: 'Настройки доступны в полной версии платформы.', kz: 'Баптаулар платформаның толық нұсқасында қол жетімді.' },
  'settings.contact': { ru: 'Связаться с менеджером', kz: 'Менеджермен байланысу' },
  'settings.theme': { ru: 'Тема оформления', kz: 'Безендіру тақырыбы' },
  'settings.language': { ru: 'Язык', kz: 'Тіл' },
  'settings.light': { ru: 'Светлая', kz: 'Жарық' },
  'settings.dark': { ru: 'Темная', kz: 'Қараңғы' },
  'common.times': { ru: 'раз', kz: 'рет' },
  'common.perWeek': { ru: 'за неделю', kz: 'апта ішінде' },
  'common.min': { ru: 'мин', kz: 'мин' },
  'common.fromLastWeek': { ru: 'с прошлой недели', kz: 'өткен аптадан' },
  'common.last7days': { ru: 'За последние 7 дней', kz: 'Соңғы 7 күн' },
  'common.goal': { ru: 'Цель', kz: 'Мақсат' },
  'common.forAmount': { ru: 'На сумму', kz: 'Сомаға' },

  // Навигация - новые разделы
  'nav.integrations': { ru: 'Интеграции', kz: 'Интеграциялар' },
  'nav.calls': { ru: 'Звонки', kz: 'Қоңыраулар' },

  // Трафик-команды
  'traffic.title': { ru: 'Эффективность трафик-команды', kz: 'Трафик тобының тиімділігі' },
  'traffic.team': { ru: 'Команда', kz: 'Топ' },
  'traffic.members': { ru: 'Участники', kz: 'Қатысушылар' },
  'traffic.recommendation': { ru: 'Рекомендация', kz: 'Ұсыныс' },
  'traffic.expand': { ru: 'Расширить', kz: 'Кеңейту' },
  'traffic.keep': { ru: 'Оставить', kz: 'Қалдыру' },
  'traffic.train': { ru: 'Обучить', kz: 'Оқыту' },
  'traffic.considerRemoval': { ru: 'На рассмотрение', kz: 'Қарауға' },
  'traffic.comparison': { ru: 'Сравнение таргетологов', kz: 'Таргетологтарды салыстыру' },
  'traffic.whoToKeep': { ru: 'Кого оставить', kz: 'Кімді қалдыру' },
  'traffic.whoToTrain': { ru: 'Кого обучить', kz: 'Кімді оқыту' },

  // Тренды - расширенные
  'trends.historical': { ru: 'Исторический анализ', kz: 'Тарихи талдау' },
  'trends.period.week': { ru: 'Неделя', kz: 'Апта' },
  'trends.period.month': { ru: 'Месяц', kz: 'Ай' },
  'trends.period.3months': { ru: '3 месяца', kz: '3 ай' },
  'trends.category.calls': { ru: 'Звонки', kz: 'Қоңыраулар' },
  'trends.category.whatsapp': { ru: 'WhatsApp', kz: 'WhatsApp' },
  'trends.category.decisions': { ru: 'Решения', kz: 'Шешімдер' },
  'trends.actions': { ru: 'История действий', kz: 'Әрекеттер тарихы' },
  'trends.correlations': { ru: 'Что повлияло на тренды', kz: 'Трендтерге не әсер етті' },
  'trends.patterns': { ru: 'AI выявил паттерны', kz: 'AI анықтаған үлгілер' },
  'trends.impact': { ru: 'Влияние', kz: 'Әсер' },
  'trends.confidence': { ru: 'Уверенность', kz: 'Сенімділік' },

  // Настройки AI
  'settings.ai.title': { ru: 'Настройки AI анализа', kz: 'AI талдау баптаулары' },
  'settings.ai.subtitle': { ru: 'Настройте поведение искусственного интеллекта', kz: 'Жасанды интеллект мінез-құлқын баптаңыз' },
  'settings.ai.temperature': { ru: 'Температура AI', kz: 'AI температурасы' },
  'settings.ai.temperatureDesc': { ru: 'Стиль анализа: консервативный или агрессивный', kz: 'Талдау стилі: консервативті немесе агрессивті' },
  'settings.ai.creativity': { ru: 'Креативность', kz: 'Креативтілік' },
  'settings.ai.creativityDesc': { ru: 'Уровень нестандартных рекомендаций', kz: 'Стандартты емес ұсыныстар деңгейі' },
  'settings.ai.actionScale': { ru: 'Масштаб действий', kz: 'Әрекет ауқымы' },
  'settings.ai.actionScaleDesc': { ru: 'Значимость предлагаемых изменений', kz: 'Ұсынылған өзгерістердің маңыздылығы' },
  'settings.ai.qualityInfo': { ru: 'Что влияет на качество AI', kz: 'AI сапасына не әсер етеді' },
  'settings.ai.qualityTip1': { ru: 'Качество входных данных из CRM', kz: 'CRM-ден кіріс деректерінің сапасы' },
  'settings.ai.qualityTip2': { ru: 'Полнота записей звонков', kz: 'Қоңырау жазбаларының толықтығы' },
  'settings.ai.qualityTip3': { ru: 'Регулярность синхронизации', kz: 'Синхрондау жүйелілігі' },
  'settings.ai.conservative': { ru: 'Консервативный', kz: 'Консервативті' },
  'settings.ai.aggressive': { ru: 'Агрессивный', kz: 'Агрессивті' },
  'settings.ai.low': { ru: 'Низкая', kz: 'Төмен' },
  'settings.ai.high': { ru: 'Высокая', kz: 'Жоғары' },
  'settings.ai.small': { ru: 'Мелкие', kz: 'Ұсақ' },
  'settings.ai.large': { ru: 'Крупные', kz: 'Ірі' },

  // Глубокий анализ звонков
  'calls.title': { ru: 'Аналитика звонков', kz: 'Қоңырау аналитикасы' },
  'calls.subtitle': { ru: 'Глубокий AI-анализ качества звонков', kz: 'Қоңырау сапасының терең AI-талдауы' },
  'calls.qualityExplanation': { ru: 'Почему такая оценка', kz: 'Неге мұндай баға' },
  'calls.scriptEvaluation': { ru: 'Оценка по скрипту', kz: 'Скрипт бойынша баға' },
  'calls.scriptStep': { ru: 'Этап скрипта', kz: 'Скрипт кезеңі' },
  'calls.followed': { ru: 'Выполнено', kz: 'Орындалды' },
  'calls.notFollowed': { ru: 'Пропущено', kz: 'Өткізіп жіберілді' },
  'calls.strengths': { ru: 'Сильные стороны', kz: 'Күшті жақтары' },
  'calls.weaknesses': { ru: 'Слабые стороны', kz: 'Әлсіз жақтары' },
  'calls.managerStats': { ru: 'Статистика по менеджерам', kz: 'Менеджерлер бойынша статистика' },
  'calls.teamStats': { ru: 'Статистика по командам', kz: 'Топтар бойынша статистика' },
  'calls.successful': { ru: 'Успешные сделки', kz: 'Сәтті мәмілелер' },
  'calls.failed': { ru: 'Неуспешные', kz: 'Сәтсіз' },
  'calls.pending': { ru: 'В работе', kz: 'Жұмыста' },
  'calls.scriptAdherence': { ru: 'Следование скрипту', kz: 'Скриптті ұстану' },
  'calls.conversionRate': { ru: 'Конверсия', kz: 'Конверсия' },

  // Воронка - фильтры
  'funnel.filterByManager': { ru: 'По менеджеру', kz: 'Менеджер бойынша' },
  'funnel.filterByTeam': { ru: 'По команде', kz: 'Топ бойынша' },
  'funnel.allManagers': { ru: 'Все менеджеры', kz: 'Барлық менеджерлер' },
  'funnel.allTeams': { ru: 'Все команды', kz: 'Барлық топтар' },
  'funnel.clearFilters': { ru: 'Сбросить', kz: 'Тазалау' },

  // WhatsApp анализ
  'whatsapp.title': { ru: 'Анализ WhatsApp диалогов', kz: 'WhatsApp диалогтарын талдау' },
  'whatsapp.subtitle': { ru: 'WhatsApp и WhatsApp Direct переписки', kz: 'WhatsApp және WhatsApp Direct хат алмасулары' },
  'whatsapp.source': { ru: 'Источник', kz: 'Көзі' },
  'whatsapp.direct': { ru: 'WhatsApp Direct', kz: 'WhatsApp Direct' },
  'whatsapp.business': { ru: 'WhatsApp Business', kz: 'WhatsApp Business' },

  // Интеграции
  'integrations.title': { ru: 'Интеграции', kz: 'Интеграциялар' },
  'integrations.subtitle': { ru: 'Управление подключениями и синхронизацией', kz: 'Қосылымдар мен синхрондауды басқару' },
  'integrations.status': { ru: 'Статус', kz: 'Күй' },
  'integrations.connected': { ru: 'Подключено', kz: 'Қосылған' },
  'integrations.disconnected': { ru: 'Отключено', kz: 'Ажыратылған' },
  'integrations.error': { ru: 'Ошибка', kz: 'Қате' },
  'integrations.pending': { ru: 'Ожидание', kz: 'Күту' },
  'integrations.lastSync': { ru: 'Последняя синхронизация', kz: 'Соңғы синхрондау' },
  'integrations.health': { ru: 'Здоровье подключения', kz: 'Қосылым денсаулығы' },
  'integrations.reconnect': { ru: 'Переподключить', kz: 'Қайта қосу' },
  'integrations.configure': { ru: 'Настроить', kz: 'Баптау' },
  'integrations.bitrix24': { ru: 'Bitrix24', kz: 'Bitrix24' },
  'integrations.bitrix24Desc': { ru: 'Синхронизация лидов, сделок и контактов', kz: 'Лидтер, мәмілелер мен контактілерді синхрондау' },
  'integrations.whatsapp': { ru: 'WhatsApp Business', kz: 'WhatsApp Business' },
  'integrations.whatsappDesc': { ru: 'Анализ переписок и рекламные кампании', kz: 'Хат алмасуларды талдау және жарнама науқандары' },
  'integrations.setupGuide': { ru: 'Инструкция по подключению', kz: 'Қосылу нұсқаулығы' },
  'integrations.errors': { ru: 'Ошибки', kz: 'Қателер' },
  'integrations.noErrors': { ru: 'Ошибок нет', kz: 'Қателер жоқ' },

  // Общие - дополнительные
  'common.all': { ru: 'Все', kz: 'Барлығы' },
  'common.filter': { ru: 'Фильтр', kz: 'Сүзгі' },
  'common.clear': { ru: 'Очистить', kz: 'Тазалау' },
  'common.save': { ru: 'Сохранить', kz: 'Сақтау' },
  'common.cancel': { ru: 'Отмена', kz: 'Болдырмау' },
  'common.loading': { ru: 'Загрузка...', kz: 'Жүктелуде...' },
  'common.noData': { ru: 'Нет данных', kz: 'Деректер жоқ' },
  'common.success': { ru: 'Успешно', kz: 'Сәтті' },
  'common.error': { ru: 'Ошибка', kz: 'Қате' },
  'common.viewDetails': { ru: 'Подробнее', kz: 'Толығырақ' },
  'common.collapse': { ru: 'Свернуть', kz: 'Жию' },
  'common.expand': { ru: 'Развернуть', kz: 'Жаю' },

  // Аналитика - фильтры
  'analytics.activeFilters': { ru: 'Активные фильтры', kz: 'Белсенді сүзгілер' },
  'analytics.resetAll': { ru: 'Сбросить всё', kz: 'Барлығын тазалау' },
  'analytics.manager': { ru: 'Менеджер', kz: 'Менеджер' },
  'analytics.found': { ru: 'Найдено диалогов', kz: 'Диалогтар табылды' },
  'analytics.nothingFound': { ru: 'Ничего не найдено', kz: 'Ештеңе табылмады' },
  'analytics.changeFilters': { ru: 'Попробуйте изменить параметры фильтрации', kz: 'Сүзгі параметрлерін өзгертіп көріңіз' },
  'analytics.completed': { ru: 'Завершён', kz: 'Аяқталған' },
  'analytics.rejected': { ru: 'Отклонён', kz: 'Қабылданбаған' },

  // Маркетинг - валюта
  'marketing.currency': { ru: 'Валюта', kz: 'Валюта' },
  'marketing.exchangeRate': { ru: 'Курс', kz: 'Бағам' },
  'marketing.funnel': { ru: 'Воронка', kz: 'Воронка' },
  'marketing.spendToRevenue': { ru: 'Расход → Выручка', kz: 'Шығын → Кіріс' },
  'marketing.warmLeads': { ru: 'Тёплые', kz: 'Жылы' },
  'marketing.deals': { ru: 'Сделки', kz: 'Мәмілелер' },

  // Тренды - действия
  'trends.actionHistory': { ru: 'История действий и результаты', kz: 'Әрекеттер тарихы мен нәтижелер' },
  'trends.success': { ru: 'Успех', kz: 'Сәттілік' },
  'trends.failure': { ru: 'Неудача', kz: 'Сәтсіздік' },
  'trends.before': { ru: 'До', kz: 'Дейін' },
  'trends.after': { ru: 'После', kz: 'Кейін' },
  'trends.forecast': { ru: 'Прогноз выручки', kz: 'Кіріс болжамы' },
  'trends.current': { ru: 'Текущая', kz: 'Ағымдағы' },
  'trends.projected': { ru: 'Прогноз', kz: 'Болжам' },
  'trends.potentialActions': { ru: 'Потенциальные действия для роста', kz: 'Өсуге арналған ықтимал әрекеттер' },
  'trends.whatWorks': { ru: 'Что работает', kz: 'Не жұмыс істейді' },
  'trends.whatToAvoid': { ru: 'Чего избегать', kz: 'Неден аулақ болу керек' },
  'trends.aiConclusions': { ru: 'AI-выводы за период', kz: 'AI-қорытындылар' },

  // Скоринг
  'scoring.creativeFatigue': { ru: 'Усталость креатива', kz: 'Креативтің шаршауы' },
  'scoring.frequency': { ru: 'Частота показа', kz: 'Көрсету жиілігі' },
  'scoring.frequencyTip': { ru: 'Сколько раз один человек видел рекламу', kz: 'Бір адам жарнаманы неше рет көрді' },

  // Дашборд - воронка и секции
  'dashboard.salesFunnel': { ru: 'Воронка продаж', kz: 'Сату воронкасы' },
  'dashboard.aiRecommendations': { ru: 'AI Рекомендации', kz: 'AI Ұсыныстары' },
  'dashboard.topManagers': { ru: 'Топ менеджеры', kz: 'Топ менеджерлер' },
  'dashboard.trafficSources': { ru: 'Источники трафика', kz: 'Трафик көздері' },
  'dashboard.topCreatives': { ru: 'Топ креативы', kz: 'Топ креативтер' },
  'dashboard.revenueLabel': { ru: 'Выручка', kz: 'Кіріс' },
  'dashboard.leadsLabel': { ru: 'Лиды', kz: 'Лидтер' },
  'dashboard.dealsLabel': { ru: 'Сделки', kz: 'Мәмілелер' },
  'dashboard.spendLabel': { ru: 'Расход', kz: 'Шығын' },
  'dashboard.roiLabel': { ru: 'ROI', kz: 'ROI' },
  'dashboard.byChannel': { ru: 'По каналу', kz: 'Арна бойынша' },
  'dashboard.allChannels': { ru: 'Все каналы', kz: 'Барлық арналар' },
  'dashboard.organic': { ru: 'Органика', kz: 'Органикалық' },
  'dashboard.promoActions': { ru: 'Промо-акции', kz: 'Промо-акциялар' },
  'dashboard.totalFunnelSpend': { ru: 'Общий расход на воронку', kz: 'Воронкаға жалпы шығын' },
  'dashboard.avgTime': { ru: 'Среднее время', kz: 'Орташа уақыт' },
  'dashboard.hours': { ru: 'ч', kz: 'сағ' },
  'dashboard.days': { ru: 'д', kz: 'к' },

  // Тренды - форма отчёта
  'trends.dailyReport': { ru: 'Ежедневный отчёт для AI', kz: 'AI үшін күнделікті есеп' },
  'trends.recordAction': { ru: 'Записать действие', kz: 'Әрекетті жазу' },
  'trends.whatDidYouDo': { ru: 'Что вы сделали?', kz: 'Сіз не істедіңіз?' },
  'trends.category': { ru: 'Категория', kz: 'Санат' },
  'trends.categoryMarketing': { ru: 'Маркетинг', kz: 'Маркетинг' },
  'trends.categorySales': { ru: 'Продажи', kz: 'Сату' },
  'trends.categoryProcess': { ru: 'Процессы', kz: 'Процестер' },
  'trends.categoryOther': { ru: 'Другое', kz: 'Басқа' },
  'trends.metricBefore': { ru: 'Метрика (было)', kz: 'Метрика (болды)' },
  'trends.metricAfter': { ru: 'Метрика (стало)', kz: 'Метрика (болды)' },
  'trends.unit': { ru: 'Единица измерения', kz: 'Өлшем бірлігі' },
  'trends.notes': { ru: 'Дополнительные заметки', kz: 'Қосымша жазбалар' },
  'trends.recordDescription': { ru: 'Записывайте все изменения, которые вы делаете. AI будет анализировать их влияние на метрики и давать рекомендации.', kz: 'Жасаған барлық өзгерістеріңізді жазып отырыңыз. AI олардың метрикаларға әсерін талдап, ұсыныстар береді.' },
  'trends.submittedActions': { ru: 'Записанные действия (ожидают анализа AI)', kz: 'Жазылған әрекеттер (AI талдауын күтуде)' },
  'trends.pendingAnalysis': { ru: 'Ожидает анализа', kz: 'Талдауды күтуде' },
  'trends.analyzed': { ru: 'Проанализировано', kz: 'Талданды' },
  'trends.historyAndImpact': { ru: 'История действий и их влияние на результаты', kz: 'Әрекеттер тарихы және олардың нәтижелерге әсері' },
  'trends.nextMonth': { ru: 'на следующий месяц', kz: 'келесі айға' },

  // Маркетинг - дополнительные
  'marketing.campaigns': { ru: 'Рекламные кампании', kz: 'Жарнама науқандары' },
  'marketing.cpl': { ru: 'CPL', kz: 'CPL' },
  'marketing.leadToWarm': { ru: 'Лид → Тёплый', kz: 'Лид → Жылы' },
  'marketing.conversionToDeal': { ru: 'Конверсия в сделку', kz: 'Мәмілеге конверсия' },
  'marketing.avgCheck': { ru: 'Ср. чек', kz: 'Орт. чек' },
  'marketing.funnelSpendToRevenue': { ru: 'Воронка: Расход → Выручка', kz: 'Воронка: Шығын → Кіріс' },
  'marketing.spendToDeals': { ru: 'Расходы → Лиды → Тёплые → Сделки', kz: 'Шығындар → Лидтер → Жылы → Мәмілелер' },
  'marketing.stopped': { ru: 'Остановлена', kz: 'Тоқтатылған' },
  'marketing.weeklyDynamics': { ru: 'Динамика за неделю', kz: 'Апталық динамика' },
  'marketing.aiAnalysis': { ru: 'AI Анализ', kz: 'AI Талдау' },
  'marketing.aiStrategy': { ru: 'AI Стратегия', kz: 'AI Стратегия' },

  // Звонки - дополнительные
  'calls.revenue': { ru: 'Выручка', kz: 'Кіріс' },
  'calls.leads': { ru: 'Лиды', kz: 'Лидтер' },
  'calls.deals': { ru: 'Сделки', kz: 'Мәмілелер' },

  // Общие метки времени
  'time.today': { ru: 'Сегодня', kz: 'Бүгін' },
  'time.yesterday': { ru: 'Вчера', kz: 'Кеше' },
  'time.thisWeek': { ru: 'На этой неделе', kz: 'Осы аптада' },
  'time.thisMonth': { ru: 'В этом месяце', kz: 'Осы айда' },
  'time.minutes': { ru: 'мин', kz: 'мин' },
  'time.hours': { ru: 'ч', kz: 'сағ' },

  // Статусы креатива
  'creative.top': { ru: 'Топ', kz: 'Топ' },
  'creative.performing': { ru: 'Работает', kz: 'Жұмыс істеуде' },
  'creative.declining': { ru: 'Падает', kz: 'Құлдырауда' },
  'creative.fatigue': { ru: 'Устал', kz: 'Шаршады' },
  'creative.impressionsPerPerson': { ru: 'Показов/чел.', kz: 'Көрсетілім/адам' },
  'creative.fatigueWarning': { ru: 'Сколько раз один человек видел рекламу. >3 = усталость', kz: 'Бір адам жарнаманы неше рет көрді. >3 = шаршау' },

  // AI Рекомендации - типы
  'recommendation.budgetDrain': { ru: 'Слив бюджета', kz: 'Бюджет құйылуы' },
  'recommendation.scaleOpportunity': { ru: 'Масштабирование', kz: 'Масштабтау' },
  'recommendation.creativeFatigue': { ru: 'Усталость креатива', kz: 'Креатив шаршауы' },
  'recommendation.managerUnderperform': { ru: 'Проблема менеджера', kz: 'Менеджер мәселесі' },
  'recommendation.slowResponse': { ru: 'Медленный ответ', kz: 'Баяу жауап' },
  'recommendation.highPotentialLead': { ru: 'Горячий лид', kz: 'Ыстық лид' },
  'recommendation.targetingIssue': { ru: 'Проблема таргетинга', kz: 'Таргетинг мәселесі' },
  'recommendation.placementShift': { ru: 'Смена плейсмента', kz: 'Плейсмент өзгерту' },
  'recommendation.apply': { ru: 'Применить', kz: 'Қолдану' },
  'recommendation.stop': { ru: 'Остановить', kz: 'Тоқтату' },
  'recommendation.scaleBudget': { ru: 'Увеличить бюджет', kz: 'Бюджетті ұлғайту' },
  'recommendation.update': { ru: 'Обновить', kz: 'Жаңарту' },
  'recommendation.investigate': { ru: 'Разобраться', kz: 'Түсіну' },
  'recommendation.speedUp': { ru: 'Ускорить', kz: 'Жылдамдату' },
  'recommendation.contact': { ru: 'Связаться', kz: 'Байланысу' },
  'recommendation.fix': { ru: 'Исправить', kz: 'Түзету' },
  'recommendation.switch': { ru: 'Переключить', kz: 'Ауыстыру' },
  'recommendation.confidence': { ru: 'Уверенность', kz: 'Сенімділік' },
  'recommendation.solution': { ru: 'Решение', kz: 'Шешім' },
  'recommendation.effect': { ru: 'Эффект', kz: 'Әсер' },
  'recommendation.now': { ru: 'Сейчас', kz: 'Қазір' },
  'recommendation.target': { ru: 'Цель', kz: 'Мақсат' },

  // Приоритеты
  'priority.critical': { ru: 'Критично', kz: 'Маңызды' },
  'priority.high': { ru: 'Высокий', kz: 'Жоғары' },
  'priority.medium': { ru: 'Средний', kz: 'Орташа' },
  'priority.low': { ru: 'Низкий', kz: 'Төмен' },

  // Менеджеры - карточки
  'manager.totalScore': { ru: 'Общий скор', kz: 'Жалпы скор' },
  'manager.conversion': { ru: 'Конверсия', kz: 'Конверсия' },
  'manager.avgCheck': { ru: 'Ср. чек', kz: 'Орт. чек' },
  'manager.response': { ru: 'Отклик', kz: 'Жауап' },
  'manager.messages': { ru: 'Сообщений', kz: 'Хабарламалар' },
  'manager.quality': { ru: 'Качество', kz: 'Сапа' },
  'manager.speed': { ru: 'Скорость', kz: 'Жылдамдық' },
  'manager.engagement': { ru: 'Вовлечённость', kz: 'Тартылу' },
  'manager.deals': { ru: 'сделок', kz: 'мәміле' },
  'manager.lastActivity': { ru: 'Последняя активность', kz: 'Соңғы белсенділік' },
  'manager.activeLeads': { ru: 'активных лидов', kz: 'белсенді лидтер' },
  'manager.tasks': { ru: 'задач', kz: 'тапсырма' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('showtoday-language');
    return (saved as Language) || 'ru';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('showtoday-language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
