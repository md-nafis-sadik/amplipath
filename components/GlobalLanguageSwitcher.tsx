'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface LanguageOption {
  code: string;
  name: string;
  country: string;
  flag: string;
  region: 'All' | 'Americas' | 'Europe' | 'Asia & ME' | 'Africa';
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'Global (English)', country: 'International', flag: '🌐', region: 'Americas' },
  { code: 'en', name: 'United States', country: 'English (US)', flag: '🇺🇸', region: 'Americas' },
  { code: 'es', name: 'Español', country: 'Spain & LATAM', flag: '🇪🇸', region: 'Americas' },
  { code: 'pt', name: 'Português', country: 'Brasil & Portugal', flag: '🇧🇷', region: 'Americas' },
  { code: 'en', name: 'United Kingdom', country: 'English (UK)', flag: '🇬🇧', region: 'Europe' },
  { code: 'fr', name: 'Français', country: 'France & Canada', flag: '🇫🇷', region: 'Europe' },
  { code: 'de', name: 'Deutsch', country: 'Deutschland & DACH', flag: '🇩🇪', region: 'Europe' },
  { code: 'it', name: 'Italiano', country: 'Italia', flag: '🇮🇹', region: 'Europe' },
  { code: 'nl', name: 'Nederlands', country: 'Nederland', flag: '🇳🇱', region: 'Europe' },
  { code: 'ar', name: 'العربية', country: 'Middle East & UAE', flag: '🇸🇦', region: 'Asia & ME' },
  { code: 'ja', name: '日本語', country: 'Japan', flag: '🇯🇵', region: 'Asia & ME' },
  { code: 'zh-CN', name: '简体中文', country: 'China & Global', flag: '🇨🇳', region: 'Asia & ME' },
  { code: 'bn', name: 'বাংলা', country: 'Bangladesh', flag: '🇧🇩', region: 'Asia & ME' },
  { code: 'hi', name: 'हिन्दी', country: 'India', flag: '🇮🇳', region: 'Asia & ME' },
  { code: 'en', name: 'Pan-Africa', country: 'Nigeria, Kenya, SA', flag: '🇳🇬', region: 'Africa' },
];

// Aggressively suppress Google Translate banner and body shift
export const cleanGoogleTranslateBanner = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // 1. Force body and html top to 0px
  if (document.body) {
    if (document.body.style.top && document.body.style.top !== '0px') {
      document.body.style.setProperty('top', '0px', 'important');
    }
    if (document.body.style.position && document.body.style.position !== 'static') {
      document.body.style.setProperty('position', 'static', 'important');
    }
  }
  if (document.documentElement) {
    if (document.documentElement.style.top && document.documentElement.style.top !== '0px') {
      document.documentElement.style.setProperty('top', '0px', 'important');
    }
    if (document.documentElement.style.position && document.documentElement.style.position !== 'static') {
      document.documentElement.style.setProperty('position', 'static', 'important');
    }
  }

  // 2. Hide all Google banner frames, containers, and skiptranslate elements
  const selectors = [
    '.goog-te-banner-frame',
    'iframe.goog-te-banner-frame',
    '[id*=":1.container"]',
    '[id*=":2.container"]',
    '[id*=":0.container"]',
    '[id*=".container"]',
    'iframe[class*="VIpgJd"]',
    'div[class*="VIpgJd"]',
    '.VIpgJd-ZVi9C-bOHAno-hpBBKc-OWXEXe-O12Aj-bN77Pb-haAclf',
    '.VIpgJd-ZVi9C-bOHAno-hpBBKc-OWXEXe-O12Aj-bN77Pb-haAclf-Hvh21',
    'body > .skiptranslate'
  ];

  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.id === 'google_translate_element') return;
      htmlEl.style.setProperty('display', 'none', 'important');
      htmlEl.style.setProperty('visibility', 'hidden', 'important');
      htmlEl.style.setProperty('height', '0px', 'important');
      htmlEl.style.setProperty('max-height', '0px', 'important');
      htmlEl.style.setProperty('width', '0px', 'important');
      htmlEl.style.setProperty('opacity', '0', 'important');
      htmlEl.style.setProperty('pointer-events', 'none', 'important');
      htmlEl.style.setProperty('position', 'absolute', 'important');
      htmlEl.style.setProperty('top', '-9999px', 'important');
      htmlEl.style.setProperty('left', '-9999px', 'important');
      htmlEl.style.setProperty('z-index', '-9999', 'important');
    });
  });
};

export const switchWebsiteLanguage = (code: string) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem('amplipath_lang', code);
  const hostname = window.location.hostname;

  if (code === 'en') {
    // Reset back to English
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;

    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = 'en';
      select.dispatchEvent(new Event('change'));
    }
    cleanGoogleTranslateBanner();
    window.location.reload();
    return;
  }

  // Set cookie for target language
  document.cookie = `googtrans=/en/${code}; path=/;`;
  document.cookie = `googtrans=/en/${code}; path=/; domain=${hostname};`;
  document.cookie = `googtrans=/en/${code}; path=/; domain=.${hostname};`;

  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (select) {
    select.value = code;
    select.dispatchEvent(new Event('change'));

    // Suppress any Google banner attempts immediately and smoothly
    cleanGoogleTranslateBanner();
    setTimeout(cleanGoogleTranslateBanner, 30);
    setTimeout(cleanGoogleTranslateBanner, 100);
    setTimeout(cleanGoogleTranslateBanner, 250);
    setTimeout(cleanGoogleTranslateBanner, 500);
    setTimeout(cleanGoogleTranslateBanner, 1000);
  } else {
    // If widget not initialized in DOM yet, reload with cookie to trigger translation
    window.location.reload();
  }
};

interface GlobalLanguageSwitcherProps {
  isMobile?: boolean;
  onSelectMobile?: () => void;
}

export default function GlobalLanguageSwitcher({ isMobile = false, onSelectMobile }: GlobalLanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Americas' | 'Europe' | 'Asia & ME' | 'Africa'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLangCode, setCurrentLangCode] = useState('en');
  const [currentLabel, setCurrentLabel] = useState('Global');
  const [currentFlag, setCurrentFlag] = useState('🌐');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize language from cookie or localStorage on mount
  useEffect(() => {
    // Read googtrans cookie
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
    const savedCode = match ? match[1] : (localStorage.getItem('amplipath_lang') || 'en');
    
    setCurrentLangCode(savedCode);
    const matchedOption = LANGUAGES.find(l => l.code === savedCode);
    if (matchedOption) {
      setCurrentLabel(matchedOption.name.split(' ')[0]);
      setCurrentFlag(matchedOption.flag);
    }

    cleanGoogleTranslateBanner();

    const observer = new MutationObserver(() => {
      cleanGoogleTranslateBanner();
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });

    const interval = setInterval(cleanGoogleTranslateBanner, 200);
    const stopTimer = setTimeout(() => clearInterval(interval), 10000);

    // Initialize Google Translate Script
    if (typeof window !== 'undefined') {
      // Define callback
      (window as any).googleTranslateElementInit = () => {
        try {
          new (window as any).google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              autoDisplay: false,
              layout: (window as any).google?.translate?.TranslateElement?.InlineLayout?.SIMPLE,
              includedLanguages: 'en,es,fr,de,pt,it,nl,ar,ja,zh-CN,bn,hi',
            },
            'google_translate_element'
          );
        } catch (e) {
          // ignore
        }
      };

      // Check if script already inserted
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      observer.disconnect();
      clearInterval(interval);
      clearTimeout(stopTimer);
    };
  }, []);

  // Handle switching language
  const handleSelectLanguage = (lang: LanguageOption) => {
    setCurrentLangCode(lang.code);
    setCurrentLabel(lang.name.split(' ')[0]);
    setCurrentFlag(lang.flag);
    setIsOpen(false);
    if (onSelectMobile) onSelectMobile();
    switchWebsiteLanguage(lang.code);
  };

  // Hover handlers with debounce for desktop
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 220);
  };

  // Filtered languages
  const filteredLanguages = LANGUAGES.filter(l => {
    const matchesTab = activeTab === 'All' || l.region === activeTab;
    const matchesSearch = !searchQuery.trim() || 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Mobile Version
  if (isMobile) {
    return (
      <div className="py-2.5 border-t border-slate-200 mt-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-2 flex items-center justify-between text-[15px] font-semibold text-slate-800 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{currentFlag}</span>
            <span>Language / Region</span>
            <span className="text-xs text-blue-600 font-normal">({currentLabel})</span>
          </div>
          <span className={`text-slate-500 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <input
              type="text"
              placeholder="Search language or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white mb-2 text-slate-900 focus:outline-none focus:border-blue-500"
            />
            <div className="max-h-56 overflow-y-auto space-y-1">
              {filteredLanguages.map((lang, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectLanguage(lang)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    currentLangCode === lang.code ? 'bg-blue-100 text-blue-800 font-bold' : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                    <span className="text-[11px] text-slate-500">({lang.country})</span>
                  </div>
                  {currentLangCode === lang.code && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Version with hover dropdown
  return (
    <div
      ref={dropdownRef}
      className="relative hidden sm:inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="nx-globe inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer py-1 px-2 rounded-md hover:text-blue-600 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="text-[12px]">{currentFlag}</span>
        <span>/ {currentLabel} ▾</span>
      </button>

      {/* Hidden container for Google Translate widget */}
      <div
        id="google_translate_element"
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: -9999,
        }}
      />

      {isOpen && (
        <div
          className="absolute left-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[999] overflow-hidden transition-all duration-150 animate-in fade-in slide-in-from-top-1"
          style={{ width: '420px', top: '100%' }}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  GLOBAL REGION &amp; LANGUAGE
                </div>
                <h3 className="text-[15px] font-bold text-white mt-0.5">
                  Select your website language
                </h3>
              </div>
              <span className="text-xl">🌐</span>
            </div>

            {/* Search Input */}
            <div className="mt-3 relative">
              <input
                type="text"
                placeholder="Search country or language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-400 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1 px-3 py-2 bg-slate-50 border-b border-slate-200 text-xs overflow-x-auto">
            {(['All', 'Americas', 'Europe', 'Asia & ME', 'Africa'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Language Items Grid */}
          <div className="p-2 max-h-72 overflow-y-auto grid grid-cols-2 gap-1 bg-white">
            {filteredLanguages.length === 0 ? (
              <div className="col-span-2 py-6 text-center text-xs text-slate-500">
                No matching languages found.
              </div>
            ) : (
              filteredLanguages.map((lang, idx) => {
                const isSelected = currentLangCode === lang.code && currentLabel === lang.name.split(' ')[0];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectLanguage(lang)}
                    className={`text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {lang.name}
                        </span>
                        {isSelected && (
                          <span className="text-blue-600 text-xs font-bold ml-1">✓</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate leading-tight">
                        {lang.country}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <span>⚡ Real-time translation powered by Google Neural Translation</span>
          </div>
        </div>
      )}
    </div>
  );
}
