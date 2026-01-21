
export interface ExchangeRates {
  cnyToMyr: number;
  myrToCny: number;
  lastUpdated: string;
}

export interface HistoricalRates {
  yesterdayCnyToMyr: number | null;
}

export enum Currency {
  CNY = 'CNY',
  MYR = 'MYR'
}

export interface Banknote {
  value: number;
  color: string;
  name: string;
  description: string;
}
