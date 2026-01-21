
import React, { useState, useEffect, useCallback } from 'react';
import { Currency, ExchangeRates } from './types';
import { fetchCurrentRates, fetchYesterdayRate } from './services/rateService';
import { RMB_NOTES } from './constants';
import Summary from './components/Summary';
import Converter from './components/Converter';

const App: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [isCnyToMyr, setIsCnyToMyr] = useState<boolean>(true);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [yesterdayRate, setYesterdayRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const current = await fetchCurrentRates();
    const yesterday = await fetchYesterdayRate();
    
    setRates(current);
    setYesterdayRate(yesterday);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 600000); // 10 min refresh
    return () => clearInterval(timer);
  }, [loadData]);

  const currentRate = isCnyToMyr ? rates?.cnyToMyr || 0 : rates?.myrToCny || 0;
  const displayYesterday = isCnyToMyr ? yesterdayRate : (yesterdayRate ? 1 / yesterdayRate : null);
  const result = amount * currentRate;

  const handleSwap = () => {
    setIsCnyToMyr(!isCnyToMyr);
    setAmount(parseFloat(result.toFixed(2)));
  };

  const addNote = (val: number) => {
    if (isCnyToMyr) {
      setAmount(prev => prev + val);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center px-4 pt-4 max-w-md mx-auto overflow-hidden">
      <header className="w-full text-center mb-3">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Quick Converter</h1>
        <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">CNY ⇄ MYR</p>
      </header>

      <main className="w-full flex-1 flex flex-col space-y-3 min-h-0">
        {loading && !rates ? (
          <div className="bg-white rounded-[2rem] p-8 text-center shadow-sm animate-pulse">
            <div className="w-10 h-10 bg-blue-100 rounded-full mx-auto mb-3 animate-bounce" />
            <p className="text-slate-400 font-bold text-xs">Syncing rates...</p>
          </div>
        ) : (
          <>
            <Summary 
              currentRate={currentRate} 
              yesterdayRate={displayYesterday} 
              lastUpdated={rates?.lastUpdated || ''}
              isCnyToMyr={isCnyToMyr}
            />

            <div className="glass-panel rounded-[2rem] p-4 custom-shadow">
              <Converter
                fromCurrency={isCnyToMyr ? Currency.CNY : Currency.MYR}
                toCurrency={isCnyToMyr ? Currency.MYR : Currency.CNY}
                amount={amount}
                result={result}
                onAmountChange={setAmount}
                onSwap={handleSwap}
              />
            </div>

            <section className="flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-center px-1 mb-2">
                <h2 className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center">
                  <span className="mr-1.5">🇨🇳</span> RMB Quick Add
                </h2>
                <button 
                  onClick={() => setAmount(0)}
                  className="text-[9px] font-black text-red-500 bg-red-50 px-2.5 py-1 rounded-full hover:bg-red-100 transition-colors"
                >
                  CLEAR
                </button>
              </div>
              
              <div className={`grid grid-cols-3 gap-2 flex-1 transition-all duration-500 ${!isCnyToMyr ? 'opacity-20 grayscale pointer-events-none' : ''}`}>
                {RMB_NOTES.map((note) => (
                  <button
                    key={note.value}
                    onClick={() => addNote(note.value)}
                    className={`${note.color} bg-opacity-5 hover:bg-opacity-10 border border-slate-100 p-2 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-90 text-center`}
                  >
                    <div className={`w-8 h-8 ${note.color} text-white rounded-lg flex items-center justify-center font-black text-[10px] mb-1 shadow-sm shadow-black/10`}>
                      {note.value}
                    </div>
                    <p className="text-[9px] font-black text-slate-800 leading-tight truncate w-full px-1">{note.name.split(' ')[0]}</p>
                  </button>
                ))}
              </div>
              {!isCnyToMyr && (
                <p className="text-[9px] text-center text-slate-400 font-bold mt-1">CNY → MYR mode only</p>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="w-full py-3 text-center space-y-1 mt-auto">
        <p className="text-[8px] text-slate-400 font-bold px-4 leading-tight">
          Reference mid-market rates. Not bank spread indicative.
        </p>
        <div className="flex justify-center gap-2">
          <a href="https://hexarate.paikama.co/" target="_blank" className="text-[8px] font-black text-blue-500 uppercase">HexaRate</a>
          <span className="text-slate-200">•</span>
          <a href="https://www.frankfurter.app/" target="_blank" className="text-[8px] font-black text-blue-500 uppercase">Frankfurter</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
