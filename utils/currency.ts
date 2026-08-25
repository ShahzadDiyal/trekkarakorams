import { Currency } from '../types';

const RATES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  AUD: { symbol: 'A$', rate: 1.54 },
  PKR: { symbol: 'PKR ', rate: 278.5 }
};

export function formatPrice(amountUSD: number, currency: Currency): string {
  const { symbol, rate } = RATES[currency] || RATES.USD;
  const converted = Math.round(amountUSD * rate);
  
  if (currency === 'PKR') {
    return `${symbol} ${converted.toLocaleString('en-US')}`;
  }
  return `${symbol}${converted.toLocaleString('en-US')}`;
}
