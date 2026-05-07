
import { TraitVector } from './personality-data';

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

export const ACHIEVEMENTS: Badge[] = [
  {
    id: 'menace',
    name: 'The Absolute Menace',
    description: 'Score over 15 in Chaos. Pure unadulterated entropy.',
    icon: '🔥',
    color: 'bg-orange-400'
  },
  {
    id: 'spreadsheet',
    name: 'Living Spreadsheet',
    description: 'Score over 15 in Logic. You are terrifyingly efficient.',
    icon: '📊',
    color: 'bg-blue-400'
  },
  {
    id: 'zen',
    name: 'Zen Master',
    description: 'Score over 15 in Order. Everything in its right place.',
    icon: '🧘',
    color: 'bg-teal-400'
  },
  {
    id: 'main-character',
    name: 'Main Character',
    description: 'Score over 15 in Emotion. The vibes are simply too loud.',
    icon: '👑',
    color: 'bg-purple-400'
  },
  {
    id: 'astral',
    name: 'Astral Traveler',
    description: 'Score over 15 in Imagination. Welcome back to Earth.',
    icon: '🌌',
    color: 'bg-pink-400'
  },
  {
    id: 'paradox',
    name: 'Walking Paradox',
    description: 'High Chaos and high Order simultaneously. Make up your mind.',
    icon: '☯️',
    color: 'bg-yellow-400'
  }
];

export function getEarnedBadges(vector: TraitVector): Badge[] {
  const earned: Badge[] = [];
  if (vector.chaos > 15) earned.push(ACHIEVEMENTS[0]);
  if (vector.logic > 15) earned.push(ACHIEVEMENTS[1]);
  if (vector.order > 15) earned.push(ACHIEVEMENTS[2]);
  if (vector.emotion > 15) earned.push(ACHIEVEMENTS[3]);
  if (vector.imagination > 15) earned.push(ACHIEVEMENTS[4]);
  if (vector.chaos > 8 && vector.order > 8) earned.push(ACHIEVEMENTS[5]);
  return earned;
}
