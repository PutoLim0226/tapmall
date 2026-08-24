import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

export function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currencies = [
    { code: 'USD', label: 'USD ($)' },
    { code: 'TWD', label: 'TWD (NT$)' },
    { code: 'CNY', label: 'CNY (¥)' }
  ] as const;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-dropdown" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>{currency}</span>
        <svg className={`chevron ${isOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {currencies.map(curr => (
            <li 
              key={curr.code}
              className={currency === curr.code ? 'active' : ''}
              onClick={() => {
                setCurrency(curr.code);
                setIsOpen(false);
              }}
            >
              {curr.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
