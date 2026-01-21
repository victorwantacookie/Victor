
import { Banknote, Currency } from './types';

export const CURRENCY_CONFIG = {
  [Currency.CNY]: {
    flag: '🇨🇳',
    symbol: '¥',
    name: 'Chinese Yuan',
  },
  [Currency.MYR]: {
    flag: '🇲🇾',
    symbol: 'RM',
    name: 'Malaysian Ringgit',
  }
};

export const RMB_NOTES: Banknote[] = [
  { value: 100, color: 'bg-red-500', name: 'Red Note', description: 'Mao / Great Hall' },
  { value: 50, color: 'bg-green-600', name: 'Green Note', description: 'Potala Palace' },
  { value: 20, color: 'bg-amber-700', name: 'Brown Note', description: 'Li River' },
  { value: 10, color: 'bg-blue-600', name: 'Blue Note', description: 'Three Gorges' },
  { value: 5, color: 'bg-purple-600', name: 'Purple Note', description: 'Mount Tai' },
  { value: 1, color: 'bg-emerald-600', name: 'Green Note', description: 'West Lake' },
];
