import type { Currency } from '@/types';

/** Approximate USD conversion rates. Base currency stored across the app is USD. */
const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  PKR: 278,
  AUD: 1.52,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  PKR: 'Rs ',
  AUD: 'A$',
};

/**
 * Formats a USD amount into the given display currency.
 * Accepts either a Currency enum value or a plain string (some call sites pass 'USD' literally).
 */
export function formatPrice(amountUSD: number, currency: string): string {
  const key = (currency in EXCHANGE_RATES ? currency : 'USD') as Currency;
  const rate = EXCHANGE_RATES[key];
  const symbol = CURRENCY_SYMBOLS[key];
  const converted = Math.round(amountUSD * rate);

  return `${symbol}${converted.toLocaleString('en-US')}`;
}
