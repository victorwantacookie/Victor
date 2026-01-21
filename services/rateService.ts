
import { ExchangeRates } from '../types';

export async function fetchCurrentRates(): Promise<ExchangeRates> {
  try {
    const res = await fetch("https://hexarate.paikama.co/api/rates/CNY/MYR/latest");
    const data = await res.json();
    
    const mid = data?.data?.mid || 0;
    const ts = data?.data?.timestamp;
    
    return {
      cnyToMyr: mid,
      myrToCny: mid ? 1 / mid : 0,
      lastUpdated: ts ? new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Offline',
    };
  } catch (error) {
    console.error("Error fetching live rates:", error);
    return { cnyToMyr: 0, myrToCny: 0, lastUpdated: 'Error' };
  }
}

export async function fetchYesterdayRate(): Promise<number | null> {
  try {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const dateStr = d.toISOString().split("T")[0];
    const res = await fetch(`https://api.frankfurter.app/${dateStr}?from=CNY&to=MYR`);
    const data = await res.json();
    return data?.rates?.MYR || null;
  } catch (error) {
    console.error("Error fetching yesterday's rate:", error);
    return null;
  }
}
