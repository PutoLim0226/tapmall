import { createContext, useContext, useState, type ReactNode } from 'react';

type Currency = 'USD' | 'TWD' | 'CNY';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdPrice: number) => string;
}

const rates: Record<Currency, number> = {
  USD: 1,
  TWD: 32,
  CNY: 7.2
};

const symbols: Record<Currency, string> = {
  USD: '$',
  TWD: 'NT$',
  CNY: '¥'
};

const CurrencyContext = createContext<CurrencyContextType>({} as CurrencyContextType);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (usdPrice: number) => {
    const rate = rates[currency];
    const converted = usdPrice * rate;
    return `${symbols[currency]}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
