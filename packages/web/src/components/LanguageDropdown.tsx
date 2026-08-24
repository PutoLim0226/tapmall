import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'zh-CN', label: '简体中文' }
  ];

  const currentLangLabel = languages.find(l => l.code === i18n.language)?.label || 'English';

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
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill="white"/><path d="M8 2.5a4 4 0 0 0-3.5 2.1c.3.1.6.3.8.5A3 3 0 0 1 8 3.5a3 3 0 0 1 2.7 1.6c.2-.2.5-.4.8-.5A4 4 0 0 0 8 2.5z" fill="white"/></svg>
        <span>{currentLangLabel}</span>
        <svg className={`chevron ${isOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {languages.map(lang => (
            <li 
              key={lang.code}
              className={i18n.language === lang.code ? 'active' : ''}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
