# ShowToday AI Analytics — Активные задачи

> Текущий статус работ
> Обновлено: 29 января 2026

---

## ✅ Завершено

### Этап 1: MVP Frontend
- [x] Создать контексты (Theme, Language)
- [x] Улучшить SVG логотип (3D эффекты)
- [x] Доделать все страницы (Dashboard, Analytics, ChatDetail, Marketing, Trends, Settings)
- [x] Проверить package.json
- [x] Написать README с инструкцией
- [x] Сделать сайдбар сворачиваемым
- [x] Уменьшить элементы сайдбара
- [x] Добавить эффекты и анимации
- [x] Исправить обрезку контента
- [x] Проверить сборку

### Этап 2: Планирование
- [x] Изучить Roistat (сквозная аналитика)
- [x] Изучить AI-targetolog (Lead Scoring, Liquid Glass)
- [x] Создать ПЛАН_РАЗВИТИЯ_V2.md
- [x] Создать СИСТЕМА_СКОРИНГА.md
- [x] Создать Memory Bank

---

## 🔄 В процессе

*Нет активных задач*

---

## ✅ Завершено (29 января 2026)

### Система скоринга
- [x] Создать типы данных для KPI (types/scoring.ts)
- [x] Реализовать функции расчёта скоров (getRank, formatCurrency, etc.)
- [x] Создать mock данные (services/scoringData.ts)
- [x] UI компоненты карточек с рейтингами:
  - RankBadge.tsx
  - ScoreBar.tsx
  - TrendIndicator.tsx
  - ManagerCard.tsx
  - TargetologistCard.tsx
  - PlacementCard.tsx
  - CreativeCard.tsx
  - AIRecommendationCard.tsx
  - SalesFunnel.tsx
  - LeadSourceCard.tsx

### Воронка продаж
- [x] Компонент SalesFunnel (визуализация)
- [x] Компонент LeadSourceCard
- [x] Интеграция с mock данными на Dashboard

### AI рекомендации
- [x] Типы для AI рекомендаций (types/scoring.ts)
- [x] Компонент AIRecommendationCard
- [x] Mock AI рекомендации (5 штук)
- [ ] (Позже) Интеграция Claude API

### Liquid Glass дизайн
- [x] Добавить CSS классы в index.html
- [x] Стили liquid-glass, premium-glass
- [x] Добавить hover-glow эффекты
- [x] Анимации (pulse, shimmer, float)
- [x] Rank glow colors

---

## 📋 Следующие шаги

### Приоритет 1: Страница Managers
- [ ] Создать pages/Managers.tsx
- [ ] Детальные карточки менеджеров
- [ ] История и тренды

### Приоритет 2: Страница Funnel (Kanban)
- [ ] Создать pages/Funnel.tsx
- [ ] LeadsKanban компонент (drag-and-drop)
- [ ] Фильтры по менеджерам/источникам

### Приоритет 3: Детальные страницы
- [ ] Страница таргетолога
- [ ] Страница креатива
- [ ] Страница плейсмента

### Приоритет 4: Интеграции
- [ ] Bitrix24 API (типы, сервисы)
- [ ] WhatsApp Business API
- [ ] Claude API для AI рекомендаций

---

## 🐛 Известные проблемы

1. ~~LanguageContext.tsx — escaped backticks в template literal~~ ✅ Исправлено
2. ~~README.md — неправильный порт (5173 вместо 3000)~~ ✅ Исправлено

---

## 📅 Timeline

| Дата | Этап | Статус |
|------|------|--------|
| 28 янв | MVP Frontend | ✅ Готово |
| 29 янв | Планирование, Memory Bank | ✅ Готово |
| 30-31 янв | Система скоринга | ⏳ Запланировано |
| 1-2 фев | Воронка продаж | ⏳ Запланировано |
| 3-5 фев | AI рекомендации | ⏳ Запланировано |
| 6-7 фев | Liquid Glass дизайн | ⏳ Запланировано |
| 8-10 фев | Интеграции (Bitrix, WhatsApp) | ⏳ Запланировано |
| 11-14 фев | Тестирование, деплой | ⏳ Запланировано |

---

*Обновляй этот файл при смене статуса задач*
