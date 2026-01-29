import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Trend } from '../../types/scoring';

interface TrendIndicatorProps {
  trend: Trend;
  value: number;
  size?: 'sm' | 'md';
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  trend,
  value,
  size = 'md'
}) => {
  const iconSize = size === 'sm' ? 12 : 16;
  const textClass = size === 'sm' ? 'text-xs' : 'text-sm';

  const getConfig = () => {
    switch (trend) {
      case 'up':
        return {
          icon: <TrendingUp size={iconSize} />,
          color: 'text-green-400',
          bgColor: 'bg-green-500/10',
          prefix: '+'
        };
      case 'down':
        return {
          icon: <TrendingDown size={iconSize} />,
          color: 'text-red-400',
          bgColor: 'bg-red-500/10',
          prefix: ''
        };
      case 'stable':
        return {
          icon: <Minus size={iconSize} />,
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/10',
          prefix: ''
        };
    }
  };

  const config = getConfig();

  return (
    <div className={`
      inline-flex items-center gap-1 px-2 py-1 rounded-full
      ${config.bgColor} ${config.color} ${textClass}
    `}>
      {config.icon}
      <span className="font-medium">
        {config.prefix}{(value ?? 0).toFixed(1)}%
      </span>
    </div>
  );
};
