# ShowToday AI Analytics — AI Паттерны

> Референсы из AI-targetolog для внедрения
> Обновлено: 29 января 2026

---

## 🎯 Lead Scoring (из AI-targetolog)

### Источник
`/Users/miso/AI-targetolog/src/server/services/whatsapp/lead-scorer.ts`

### Ключевые слова для скоринга

```typescript
// HIGH INTENT (20-25 points) - Явное намерение купить
const HIGH_INTENT_KEYWORDS = {
  'купить': 25, 'заказать': 25, 'оформить': 25,
  'хочу': 20, 'нужно': 18, 'беру': 25
};

// MEDIUM INTENT (15-20 points) - Интерес к цене
const MEDIUM_INTENT_KEYWORDS = {
  'цена': 20, 'стоимость': 20, 'сколько': 18,
  'скидка': 18, 'акция': 15, 'оплата': 15
};

// INTEREST SIGNALS (10-15 points) - Проявление интереса
const INTEREST_KEYWORDS = {
  'интересует': 15, 'расскажите': 12, 'подробнее': 12,
  'информация': 10, 'детали': 10
};

// TIMING SIGNALS (10-18 points) - Срочность
const TIMING_KEYWORDS = {
  'сегодня': 18, 'завтра': 15, 'срочно': 18,
  'сейчас': 15, 'быстро': 15
};

// NEGATIVE SIGNALS (отрицательные баллы)
const NEGATIVE_KEYWORDS = {
  'не интересует': -20, 'дорого': -8, 'потом': -5,
  'нет спасибо': -15, 'отстаньте': -20
};
```

### Расчёт скора

```typescript
interface RuleScore {
  keywordScore: number;      // max 40
  responseTimeScore: number; // max 20
  messageCountScore: number; // max 20
  recencyScore: number;      // max 10
  mediaScore: number;        // max 10
  total: number;             // 0-100
}

// Время ответа
under5min: +20 очков
under30min: +12 очков
under1hour: +5 очков

// Статусы
HOT (61-100): Готов к сделке
WARM (31-60): Требует внимания
COLD (0-30): Нужно прогревать
```

---

## 🤖 Business Insights (из AI-targetolog)

### Источник
`/Users/miso/AI-targetolog/src/components/dashboard/business-insights.tsx`

### Типы сценариев

```typescript
type ScenarioType =
  | 'HIGH_ENGAGEMENT_LOW_SALES'  // Много активности, мало продаж
  | 'HIGH_LEADS_LOW_ENGAGEMENT'  // Много лидов, мало вовлечённости
  | 'BUDGET_DRAIN'               // Слив бюджета
  | 'SCALE_OPPORTUNITY'          // Возможность масштабирования
  | 'CREATIVE_FATIGUE';          // Креатив устал

type ScenarioPriority = 'urgent' | 'high' | 'medium' | 'low';
```

### Пороговые значения

```typescript
const THRESHOLDS = {
  HIGH_ENGAGEMENT_LOW_SALES: {
    engagementMin: 5,    // engagement > 5%
    conversionsMax: 1,   // conversions < 1
  },
  BUDGET_DRAIN: {
    spendMin: 100,       // spend > $100
    conversionsMax: 0,   // conversions = 0
  },
  SCALE_OPPORTUNITY: {
    roasMin: 3,          // ROAS > 3x
    cpaRatio: 0.5,       // CPA < 50% цели
  },
  CREATIVE_FATIGUE: {
    frequencyMin: 5,     // frequency > 5
    ctrTrendMax: -20,    // CTR упал на 20%+
  },
};
```

### Структура рекомендации

```typescript
interface BusinessScenario {
  type: ScenarioType;
  confidence: number;        // 0-100%
  indicators: string[];      // Что обнаружено
  recommendation: string;    // Что делать
  priority: ScenarioPriority;
  campaignId?: string;
  campaignName?: string;
  metrics?: {
    current: number;
    benchmark: number;
    unit: string;
  };
  actions?: {
    label: string;
    href?: string;
    onClick?: () => void;
  }[];
}
```

---

## 🎨 Liquid Glass Стили (из AI-targetolog)

### Источник
`/Users/miso/AI-targetolog/src/app/globals.css`

### CSS классы для копирования

```css
/* Базовый glass эффект */
.liquid-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

.dark .liquid-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 50%,
    rgba(255, 255, 255, 0.08) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
}

/* Professional Glass для карточек */
.professional-glass {
  position: relative;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.18) 100%
  );
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px -8px rgba(0, 0, 0, 0.1),
    0 4px 16px -4px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

/* Hover эффект с подъёмом */
.hover-glow {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-glow:hover {
  box-shadow:
    0 16px 48px -12px rgba(0, 0, 0, 0.15),
    0 8px 24px -6px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transform: translateY(-4px) scale(1.01);
}
```

---

## 📊 Metric Card (из AI-targetolog)

### Источник
`/Users/miso/AI-targetolog/src/components/dashboard/metric-card.tsx`

### Структура

```typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  tooltip?: string;
}
```

### Анимации

```typescript
// Framer Motion варианты
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

// Hover эффект
whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
```

---

## 🎯 Kanban Лидов (из AI-targetolog)

### Источник
`/Users/miso/AI-targetolog/src/components/leads/leads-kanban.tsx`

### Структура

```typescript
type LeadStatus = 'NEW' | 'QUALIFIED' | 'WON' | 'LOST';

interface LeadData {
  id: string;
  name: string;
  phone: string;
  source: string;
  score: number;
  status: LeadStatus;
  columnOrder: number;
  createdAt: Date;
}

// Колонки
const columns = [
  { id: 'NEW', title: 'Новые', color: 'bg-blue-500' },
  { id: 'QUALIFIED', title: 'Квалифицированные', color: 'bg-amber-500' },
  { id: 'WON', title: 'Выиграны', color: 'bg-green-500' },
  { id: 'LOST', title: 'Потеряны', color: 'bg-red-500' },
];
```

### Drag-and-Drop

```typescript
// Используется @dnd-kit
import {
  DndContext,
  DragOverlay,
  closestCorners,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
```

---

## 🎬 Анимация смены темы

### View Transitions API

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 9999;
}

/* Направление перехода */
html[data-theme-direction="to-dark"]::view-transition-new(root) {
  animation: liquid-reveal 0.5s ease-out;
}

@keyframes liquid-reveal {
  from { clip-path: circle(0% at var(--x) var(--y)); }
  to { clip-path: circle(150% at var(--x) var(--y)); }
}
```

### Реализация в React

```typescript
async function toggleTheme(event: React.MouseEvent) {
  const x = event.clientX;
  const y = event.clientY;

  // Set CSS variables for animation origin
  document.documentElement.style.setProperty('--x', `${x}px`);
  document.documentElement.style.setProperty('--y', `${y}px`);

  // Check if View Transitions API is supported
  if (!document.startViewTransition) {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    return;
  }

  // Set direction
  document.documentElement.dataset.themeDirection =
    theme === 'dark' ? 'to-light' : 'to-dark';

  // Start transition
  const transition = document.startViewTransition(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  });

  await transition.finished;
  delete document.documentElement.dataset.themeDirection;
}
```

---

## 📝 Использование

При реализации функции:
1. Найди соответствующий раздел в этом файле
2. Скопируй структуры данных и типы
3. Адаптируй под ShowToday (локализация, стили)
4. Используй Tailwind классы из дизайн-системы

---

*Референс-документ для разработки AI-функций*
