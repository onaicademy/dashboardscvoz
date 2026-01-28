import React from 'react';
import { motion } from 'framer-motion';

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
  color?: string;
  showValue?: boolean;
  size?: 'sm' | 'md';
}

export const ScoreBar: React.FC<ScoreBarProps> = ({
  label,
  score,
  maxScore = 100,
  color,
  showValue = true,
  size = 'md'
}) => {
  const percentage = Math.min((score / maxScore) * 100, 100);

  const getColor = () => {
    if (color) return color;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const heightClass = size === 'sm' ? 'h-1.5' : 'h-2';
  const textClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="w-full">
      <div className={`flex justify-between items-center mb-1 ${textClass}`}>
        <span className="text-gray-400">{label}</span>
        {showValue && (
          <span className="font-medium text-white">{score.toFixed(0)}</span>
        )}
      </div>
      <div className={`w-full ${heightClass} bg-white/10 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full ${getColor()} rounded-full`}
        />
      </div>
    </div>
  );
};
