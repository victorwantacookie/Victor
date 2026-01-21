
import React from 'react';
import { Currency } from '../types';
import { CURRENCY_CONFIG } from '../constants';

interface ConverterProps {
  fromCurrency: Currency;
  toCurrency: Currency;
  amount: number;
  result: number;
  onAmountChange: (value: number) => void;
  onSwap: () => void;
}

const Converter: React.FC<ConverterProps> = ({
  fromCurrency,
  toCurrency,
  amount,
  result,
  onAmountChange,
  onSwap
}) => {
  const from = CURRENCY_CONFIG[fromCurrency];
  const to = CURRENCY_CONFIG[toCurrency];

  return (
    <div className="space-y-2 relative">
      <div className="space-y-0.5">
        <label className="text-[9px] font-extrabold text-slate-400 ml-2 uppercase tracking-wider">Source</label>
        <div className="flex items-center bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm focus-within:border-blue-400 transition-all duration-300">
          <span className="text-xl mr-2">{from.flag}</span>
          <span className="text-xs font-extrabold text-slate-900 mr-2">{fromCurrency}</span>
          <input
            type="number"
            inputMode="decimal"
            value={amount || ''}
            onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
            className="w-full text-right text-xl font-black bg-transparent outline-none text-slate-800 placeholder:text-slate-200"
            placeholder="0.00"
          />
        </div>
      </div>

      <button
        onClick={onSwap}
        className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white w-9 h-9 flex items-center justify-center rounded-full shadow-md z-10 hover:bg-blue-700 active:scale-90 transition-all duration-300 border-2 border-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </button>

      <div className="space-y-0.5">
        <label className="text-[9px] font-extrabold text-slate-400 ml-2 uppercase tracking-wider">Estimate</label>
        <div className="flex items-center bg-slate-50 border border-slate-100/50 rounded-2xl px-4 py-3">
          <span className="text-xl mr-2 opacity-80">{to.flag}</span>
          <span className="text-xs font-extrabold text-slate-900 mr-2 opacity-80">{toCurrency}</span>
          <div className="w-full text-right text-xl font-black text-blue-600">
            {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
