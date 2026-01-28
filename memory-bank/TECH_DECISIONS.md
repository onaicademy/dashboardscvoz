# ShowToday AI Analytics — Технические решения

> Документация архитектурных и технических решений
> Обновлено: 29 января 2026

---

## 🏗 Архитектура

### Почему Vite + React, а не Next.js?

**Решение**: Vite + React для MVP

**Причины**:
1. Быстрый старт без сложной настройки
2. ESM CDN (esm.sh) — не нужен node_modules
3. Лёгкий вес проекта
4. Достаточно для презентации клиенту

**Планы**: Миграция на Next.js 15 при добавлении бэкенда

---

## 🎨 UI/UX решения

### Сворачиваемый сайдбар

**Проблема**: Сайдбар занимал 280px, контент обрезался

**Решение**:
- Ширина: 240px (развёрнут) → 72px (свёрнут)
- Кнопка "Свернуть" с анимацией
- Тултипы при наведении на свёрнутые пункты
- localStorage для сохранения состояния

**Код**: `components/Sidebar.tsx`

### Темная/светлая тема

**Решение**: Tailwind `darkMode: 'class'`

**Реализация**:
- ThemeContext с useState + localStorage
- CSS переменные для цветов
- Класс `dark` на `<html>`

**Код**: `contexts/ThemeContext.tsx`

### Локализация RU/KZ

**Решение**: Собственный контекст без i18n библиотек

**Причины**:
1. Только 2 языка
2. Не нужна сложная логика pluralization
3. Меньше зависимостей

**Код**: `contexts/LanguageContext.tsx` (70+ ключей)

---

## 📊 Данные

### Mock данные vs Real API

**Текущее**: Mock данные в `services/mockData.ts`

**Структура**:
```typescript
MOCK_CHATS: ChatAnalysis[]     // 3 чата
MARKETING_DATA: MarketingSource[] // 5 источников
TRENDS_DATA: TrendPoint[]      // 7 дней
```

**Планы**: API endpoints через Next.js API Routes

### Типы данных

**Файл**: `types.ts`

```typescript
interface ChatAnalysis {
  id: string;
  clientName: string;
  clientPhone: string;
  agentName: string;
  date: string;
  status: 'completed' | 'rejected';
  overallScore: number;
  amount: number;
  summary: string;
  goodPoints: string[];
  criticalIssues: string[];
  missedOpportunities: string[];
  categoryScores: CategoryScore[];
  messages: Message[];
}
```

---

## 🔧 Конфигурация

### Vite config

**Файл**: `vite.config.ts`

```typescript
{
  server: { port: 3000, host: '0.0.0.0' },
  resolve: { alias: { '@': path.resolve(__dirname, '.') } }
}
```

### Tailwind config (в index.html)

```javascript
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#FFD700', dark: '#E6C200' },
        dark: { bg: '#0F0F0F', card: '#1A1A1A', border: '#2A2A2A' }
      }
    }
  }
}
```

---

## 📦 Зависимости

### Production
| Пакет | Версия | Назначение |
|-------|--------|------------|
| react | ^19.2.4 | UI фреймворк |
| react-dom | ^19.2.4 | DOM рендеринг |
| react-router-dom | ^7.13.0 | Роутинг |
| recharts | ^3.7.0 | Графики |
| framer-motion | ^12.29.2 | Анимации |
| lucide-react | ^0.563.0 | Иконки |

### Development
| Пакет | Версия | Назначение |
|-------|--------|------------|
| vite | ^6.2.0 | Сборщик |
| typescript | ~5.8.2 | Типизация |
| @vitejs/plugin-react | ^5.0.0 | React для Vite |
| @types/react | ^19.2.10 | Типы React |
| @types/react-dom | ^19.2.3 | Типы ReactDOM |

---

## 🚀 Будущие решения

### AI интеграция

**Выбор**: Claude API (Anthropic)

**Причины**:
1. Лучше понимает контекст на русском
2. Более точный анализ текста
3. Хорошо работает с structured output

**Альтернатива**: Gemini API (уже используется в AI-targetolog)

### База данных

**Выбор**: Supabase (PostgreSQL)

**Причины**:
1. Бесплатный tier
2. Real-time подписки
3. Встроенная аутентификация
4. Edge Functions

### ORM

**Выбор**: Prisma

**Причины**:
1. Type-safe запросы
2. Автогенерация типов
3. Миграции
4. Хорошо работает с Supabase

---

## 📝 Соглашения

### Именование файлов
- Компоненты: `PascalCase.tsx` (Dashboard.tsx)
- Утилиты: `camelCase.ts` (mockData.ts)
- Типы: `types.ts` в корне или `types/` папка

### Структура компонентов
```typescript
// 1. Imports
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

// 2. Types/Interfaces
interface Props { ... }

// 3. Component
export const Component: React.FC<Props> = ({ ... }) => {
  // Hooks
  const { isDark } = useTheme();

  // Logic

  // Render
  return ( ... );
};
```

### Git commits
```
feat: добавить воронку продаж
fix: исправить обрезку сайдбара
docs: обновить README
refactor: переработать скоринг
```

---

*Обновляй при принятии новых технических решений*
