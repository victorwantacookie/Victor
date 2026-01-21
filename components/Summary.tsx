
import React from 'react';

interface SummaryProps {
  currentRate: number;
  yesterdayRate: number | null;
  lastUpdated: string;
  isCnyToMyr: boolean;
}

const Summary: React.FC<SummaryProps> = ({ currentRate, yesterdayRate, lastUpdated, isCnyToMyr }) => {
  const diff = yesterdayRate ? currentRate - yesterdayRate : 0;
  const isUp = diff > 0;
  
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-[1.5rem] p-4 shadow-lg shadow-blue-100 text-white">
      <div className="flex justify-between items-center mb-3">
        <div className="bg-blue-400/30 px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-widest">
          LIVE • {lastUpdated}
        </div>
        {yesterdayRate && (
          <div className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md ${isUp ? 'bg-green-400/30 text-green-100' : 'bg-red-400/30 text-red-100'}`}>
            {isUp ? '▲' : '▼'} {Math.abs((diff / yesterdayRate) * 100).toFixed(2)}%
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[9px] font-medium text-blue-100 uppercase mb-0.5">Rate</p>
          <p className="text-2xl font-black">
            {isCnyToMyr ? '¥1 = ' : 'RM1 = '}
            <span className="text-blue-100">
              {currentRate.toFixed(4)}
            </span>
          </p>
        </div>
        {yesterdayRate && (
          <div className="text-right">
            <p className="text-[9px] font-medium text-blue-100 uppercase mb-0.5">Prev</p>
            <p className="text-sm font-bold opacity-80">
              {yesterdayRate.toFixed(4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
