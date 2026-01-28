import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

// Пресеты как в Facebook Ads Manager
const PRESETS = [
  { id: 'today', label: 'Сегодня', getDates: () => {
    const today = new Date();
    return { startDate: today, endDate: today };
  }},
  { id: 'yesterday', label: 'Вчера', getDates: () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return { startDate: yesterday, endDate: yesterday };
  }},
  { id: 'last7', label: 'Последние 7 дней', getDates: () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 6);
    return { startDate: start, endDate: end };
  }},
  { id: 'last14', label: 'Последние 14 дней', getDates: () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 13);
    return { startDate: start, endDate: end };
  }},
  { id: 'last30', label: 'Последние 30 дней', getDates: () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 29);
    return { startDate: start, endDate: end };
  }},
  { id: 'thisMonth', label: 'Этот месяц', getDates: () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return { startDate: start, endDate: today };
  }},
  { id: 'lastMonth', label: 'Прошлый месяц', getDates: () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return { startDate: start, endDate: end };
  }},
  { id: 'thisQuarter', label: 'Этот квартал', getDates: () => {
    const today = new Date();
    const quarter = Math.floor(today.getMonth() / 3);
    const start = new Date(today.getFullYear(), quarter * 3, 1);
    return { startDate: start, endDate: today };
  }},
];

const MONTHS_RU = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const DAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
};

const isSameDay = (d1: Date, d2: Date): boolean => {
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear();
};

const isInRange = (date: Date, start: Date, end: Date): boolean => {
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

interface CalendarMonthProps {
  month: Date;
  selectedRange: DateRange;
  hoverDate: Date | null;
  selectingStart: boolean;
  onDateClick: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
  isDark: boolean;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  month,
  selectedRange,
  hoverDate,
  selectingStart,
  onDateClick,
  onDateHover,
  isDark
}) => {
  const year = month.getFullYear();
  const monthNum = month.getMonth();

  const firstDay = new Date(year, monthNum, 1);
  const lastDay = new Date(year, monthNum + 1, 0);

  // Monday = 0
  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek < 0) startDayOfWeek = 6;

  const daysInMonth = lastDay.getDate();
  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = [];

  // Fill empty days before month starts
  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push(null);
  }

  // Fill days
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(new Date(year, monthNum, day));
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill empty days after month ends
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const today = new Date();

  const getPreviewRange = (): { start: Date; end: Date } | null => {
    if (!hoverDate) return null;
    if (selectingStart) {
      return { start: hoverDate, end: selectedRange.endDate };
    } else {
      return { start: selectedRange.startDate, end: hoverDate };
    }
  };

  const previewRange = getPreviewRange();

  return (
    <div className="w-[280px]">
      {/* Header */}
      <div className={`text-center font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {MONTHS_RU[monthNum]} {year}
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_RU.map(day => (
          <div key={day} className={`text-center text-xs font-medium py-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="space-y-1">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="grid grid-cols-7 gap-0">
            {week.map((date, dayIdx) => {
              if (!date) {
                return <div key={dayIdx} className="w-10 h-9" />;
              }

              const isToday = isSameDay(date, today);
              const isStart = isSameDay(date, selectedRange.startDate);
              const isEnd = isSameDay(date, selectedRange.endDate);
              const isSelected = isStart || isEnd;
              const inRange = isInRange(date, selectedRange.startDate, selectedRange.endDate);
              const inPreviewRange = previewRange && isInRange(date,
                previewRange.start < previewRange.end ? previewRange.start : previewRange.end,
                previewRange.start < previewRange.end ? previewRange.end : previewRange.start
              );

              return (
                <div
                  key={dayIdx}
                  onClick={() => onDateClick(date)}
                  onMouseEnter={() => onDateHover(date)}
                  onMouseLeave={() => onDateHover(null)}
                  className={`
                    relative w-10 h-9 flex items-center justify-center text-sm cursor-pointer
                    transition-all duration-150
                    ${isSelected
                      ? 'bg-primary text-black font-semibold rounded-lg z-10'
                      : inRange
                        ? isDark
                          ? 'bg-primary/20 text-primary'
                          : 'bg-primary/10 text-primary'
                        : inPreviewRange
                          ? isDark
                            ? 'bg-primary/10 text-primary/70'
                            : 'bg-primary/5 text-primary/70'
                          : isDark
                            ? 'text-gray-300 hover:bg-white/10'
                            : 'text-slate-700 hover:bg-slate-100'
                    }
                    ${isStart && !isSameDay(selectedRange.startDate, selectedRange.endDate) ? 'rounded-l-lg' : ''}
                    ${isEnd && !isSameDay(selectedRange.startDate, selectedRange.endDate) ? 'rounded-r-lg' : ''}
                    ${isToday && !isSelected ? 'ring-2 ring-primary/50 ring-inset rounded-lg' : ''}
                  `}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectingStart, setSelectingStart] = useState(true);
  const [tempRange, setTempRange] = useState<DateRange>(value);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [leftMonth, setLeftMonth] = useState(() => {
    const d = new Date(value.startDate);
    d.setDate(1);
    return d;
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const rightMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTempRange(value);
      setSelectingStart(true);
    }
  }, [isOpen, value]);

  const handlePrevMonth = () => {
    setLeftMonth(new Date(leftMonth.getFullYear(), leftMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setLeftMonth(new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (selectingStart) {
      setTempRange({ startDate: date, endDate: date });
      setSelectingStart(false);
    } else {
      if (date < tempRange.startDate) {
        setTempRange({ startDate: date, endDate: tempRange.startDate });
      } else {
        setTempRange({ ...tempRange, endDate: date });
      }
      setSelectingStart(true);
    }
  };

  const handlePresetClick = (preset: typeof PRESETS[0]) => {
    const dates = preset.getDates();
    setTempRange(dates);
    onChange(dates);
    setIsOpen(false);
  };

  const handleApply = () => {
    onChange(tempRange);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempRange(value);
    setIsOpen(false);
  };

  const getActivePreset = (): string | null => {
    for (const preset of PRESETS) {
      const dates = preset.getDates();
      if (isSameDay(dates.startDate, value.startDate) && isSameDay(dates.endDate, value.endDate)) {
        return preset.id;
      }
    }
    return null;
  };

  const activePreset = getActivePreset();

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all
          ${isOpen
            ? 'border-primary ring-2 ring-primary/20'
            : isDark
              ? 'bg-white/5 border-white/10 hover:border-white/20'
              : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
          }
        `}
      >
        <Calendar className={`w-4 h-4 ${isDark ? 'text-primary' : 'text-primary'}`} />
        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {formatDate(value.startDate)} — {formatDate(value.endDate)}
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute top-full right-0 mt-2 z-50 rounded-2xl shadow-2xl border overflow-hidden
              ${isDark ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-slate-200'}
            `}
            style={{ minWidth: '700px' }}
          >
            <div className="flex">
              {/* Presets Sidebar */}
              <div className={`w-48 border-r p-3 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 px-2 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                  Быстрый выбор
                </p>
                <div className="space-y-0.5">
                  {PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetClick(preset)}
                      className={`
                        w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                        ${activePreset === preset.id
                          ? 'bg-primary text-black font-medium'
                          : isDark
                            ? 'text-gray-300 hover:bg-white/10'
                            : 'text-slate-600 hover:bg-slate-100'
                        }
                      `}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Area */}
              <div className="p-4">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePrevMonth}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={handleNextMonth}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Two Calendars */}
                <div className="flex gap-8">
                  <CalendarMonth
                    month={leftMonth}
                    selectedRange={tempRange}
                    hoverDate={hoverDate}
                    selectingStart={selectingStart}
                    onDateClick={handleDateClick}
                    onDateHover={setHoverDate}
                    isDark={isDark}
                  />
                  <CalendarMonth
                    month={rightMonth}
                    selectedRange={tempRange}
                    hoverDate={hoverDate}
                    selectingStart={selectingStart}
                    onDateClick={handleDateClick}
                    onDateHover={setHoverDate}
                    isDark={isDark}
                  />
                </div>

                {/* Selected Range Display */}
                <div className={`mt-4 pt-4 border-t flex items-center justify-between ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Начало</p>
                      <p className={`text-sm font-medium ${selectingStart ? 'text-primary' : isDark ? 'text-white' : 'text-slate-900'}`}>
                        {formatDate(tempRange.startDate)}
                      </p>
                    </div>
                    <span className={isDark ? 'text-gray-500' : 'text-slate-300'}>→</span>
                    <div>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Конец</p>
                      <p className={`text-sm font-medium ${!selectingStart ? 'text-primary' : isDark ? 'text-white' : 'text-slate-900'}`}>
                        {formatDate(tempRange.endDate)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancel}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isDark
                          ? 'text-gray-400 hover:bg-white/10'
                          : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleApply}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-black hover:bg-primary-dark transition-colors"
                    >
                      Применить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangePicker;
