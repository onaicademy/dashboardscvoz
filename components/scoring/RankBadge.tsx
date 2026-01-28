import React from 'react';
import { motion } from 'framer-motion';
import { Rank, getRankColor, getRankBgColor } from '../../types/scoring';

interface RankBadgeProps {
  rank: Rank;
  size?: 'sm' | 'md' | 'lg';
  showGlow?: boolean;
}

export const RankBadge: React.FC<RankBadgeProps> = ({
  rank,
  size = 'md',
  showGlow = true
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-xl'
  };

  const glowColors: Record<Rank, string> = {
    'S': 'shadow-purple-500/50',
    'A': 'shadow-green-500/50',
    'B': 'shadow-blue-500/50',
    'C': 'shadow-yellow-500/50',
    'D': 'shadow-red-500/50'
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className={`
        ${sizeClasses[size]}
        ${getRankBgColor(rank)}
        ${getRankColor(rank)}
        ${showGlow ? `shadow-lg ${glowColors[rank]}` : ''}
        rounded-lg font-bold flex items-center justify-center
        border border-white/20
      `}
    >
      {rank}
    </motion.div>
  );
};
