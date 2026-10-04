'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from './ModalContext';
import { LANGUAGES, switchWebsiteLanguage } from './GlobalLanguageSwitcher';

export default function Footer() {
  const { openModal } = useModal();
  const pathname = usePathname();

  const [openRegion, setOpenRegion] = useState<string | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Americas' | 'Europe' | 'Asia & ME' | 'Africa'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
      const saved = match ? match[1] : (localStorage.getItem('amplipath_lang') || 'en');
      setCurrentLang(saved);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLanguageModal(false);
      }
    };
    if (showLanguageModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLanguageModal]);

  const globalRegions = [
    {
      id: 'na',
      name: 'North America',
      languages: [
        { name: 'English (US)', flag: '🇺🇸', code: 'en' },
        { name: 'Français (Canada)', flag: '🇨🇦', code: 'fr' },
      ],
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      languages: [
        { name: 'English (UK)', flag: '🇬🇧', code: 'en' },
      ],
    },
    {
      id: 'africa',
      name: 'Africa',
      languages: [
        { name: 'Pan-Africa (EN)', flag: '🇳🇬', code: 'en' },
      ],
      exploreLink: { text: 'Africa Market Services →', href: '/services/africa' },
    },
    {
      id: 'europe',
      name: 'Europe',
      languages: [
        { name: 'Deutsch', flag: '🇩🇪', code: 'de' },
        { name: 'Français', flag: '🇫🇷', code: 'fr' },
        { name: 'Español', flag: '🇪🇸', code: 'es' },
        { name: 'Italiano', flag: '🇮🇹', code: 'it' },
        { name: 'Nederlands', flag: '🇳🇱', code: 'nl' },
      ],
    },
    {
      id: 'apac',
      name: 'APAC',
      languages: [
        { name: 'العربية (Arabic)', flag: '🇸🇦', code: 'ar' },
        { name: '日本語 (Japanese)', flag: '🇯🇵', code: 'ja' },
        { name: '简体中文 (Chinese)', flag: '🇨🇳', code: 'zh-CN' },
        { name: 'हिन्दी (Hindi)', flag: '🇮🇳', code: 'hi' },
        { name: 'বাংলা (Bengali)', flag: '🇧🇩', code: 'bn' },
      ],
    },
    {
      id: 'latam',
      name: 'LATAM',
      languages: [
        { name: 'Español (LATAM)', flag: '🇪🇸', code: 'es' },
        { name: 'Português (Brasil)', flag: '🇧🇷', code: 'pt' },
      ],
    },
  ];

  const handleSelectLang = (code: string) => {
    setCurrentLang(code);
    switchWebsiteLanguage(code);
  };

  // Suppress duplicate global CTA band on pages that have their own dedicated, contextual CTA or form
  const isIndividualServicePage = pathname !== '/services' && pathname?.startsWith('/services');
  const hideCtaBand = isIndividualServicePage || pathname === '/work' || pathname === '/contact' || pathname === '/free-audit';

  return (
    <>
      {!hideCtaBand && (
        <div className="cta-band">
          <h2>Ready to unlock growth?</h2>
          <p>Tell us about your business — we’ll build a custom growth plan within 5 hours.</p>
          <div className="cta-row">
            <button className="btn-cw" onClick={() => openModal('lead')}>Get Started</button>
            <Link href="/contact" className="btn-co no-underline inline-block">Contact Us</Link>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="fg">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <img src="/images/logo-icon.jpg" alt="Amplipath" className="w-6 h-6 rounded-full object-cover" />
              <span className="fb-brand text-white font-bold text-lg">AMPLIPATH</span>
            </div>
            <p className="fb-desc">
              Premium global digital marketing and technology agency — delivering integrated marketing, technology and AI for ambitious businesses worldwide.
            </p>
            <p className="fb-contact">hello@amplipath.com</p>
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, marginBottom: '10px' }}>
                SOCIAL
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <a href="https://facebook.com/amplipath" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: '#cbd5e1', transition: 'color .18s' }} className="hover:text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/amplipath" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#cbd5e1', transition: 'color .18s' }} className="hover:text-white">
                  <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://twitter.com/amplipath" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{ color: '#cbd5e1', transition: 'color .18s' }} className="hover:text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/amplipath" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#cbd5e1', transition: 'color .18s' }} className="hover:text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.763z"/>
                  </svg>
                </a>
                <a href="https://youtube.com/@amplipath" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: '#cbd5e1', transition: 'color .18s' }} className="hover:text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="fc-head">Global</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {globalRegions.map((region) => {
                const isOpen = openRegion === region.id;
                return (
                  <div key={region.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '3px' }}>
                    <button
                      type="button"
                      onClick={() => setOpenRegion(isOpen ? null : region.id)}
                      className="fl"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        color: isOpen ? '#ffffff' : undefined,
                        fontWeight: isOpen ? 600 : 400,
                        marginBottom: 0,
                        padding: '4px 0',
                      }}
                      aria-expanded={isOpen}
                    >
                      <span>{region.name}</span>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: isOpen ? '#38bdf8' : '#64748b',
                          transition: 'transform 0.2s ease, color 0.2s ease',
                          transform: isOpen ? 'rotate(45deg)' : 'none',
                          display: 'inline-block',
                          lineHeight: 1,
                        }}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderLeft: '2px solid #3b82f6',
                          borderRadius: '0 6px 6px 0',
                          padding: '6px 8px',
                          margin: '3px 0 6px 0',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                      >
                        {region.languages.map((lang, lIdx) => {
                          const isLangActive = currentLang === lang.code;
                          return (
                            <button
                              key={lIdx}
                              type="button"
                              onClick={() => handleSelectLang(lang.code)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                background: isLangActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '4px 6px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: isLangActive ? '#38bdf8' : '#cbd5e1',
                                fontSize: '11px',
                                transition: 'all 0.12s ease',
                              }}
                              className="hover:bg-slate-800 hover:text-white"
                            >
                              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '12px' }}>{lang.flag}</span>
                                <span>{lang.name}</span>
                              </span>
                              {isLangActive && <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 700 }}>✓</span>}
                            </button>
                          );
                        })}

                        {region.exploreLink && (
                          <Link
                            href={region.exploreLink.href}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              color: '#60a5fa',
                              fontSize: '10.5px',
                              fontWeight: 600,
                              textDecoration: 'none',
                              padding: '4px 6px',
                              marginTop: '2px',
                            }}
                            className="hover:underline"
                          >
                            <span>🌍</span>
                            <span>{region.exploreLink.text}</span>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowLanguageModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '12px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#94a3b8',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '5px 8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              className="hover:text-white hover:border-slate-500"
            >
              <span>🌐</span>
              <span>All Languages &amp; Regions</span>
            </button>
          </div>

          <div>
            <div className="fc-head">Company</div>
            <Link href="/about" className="fl">About us</Link>
            <Link href="/services" className="fl">Services</Link>
            <Link href="/work" className="fl">Our work</Link>
            <Link href="/blog" className="fl">Blog &amp; Insights</Link>
            <Link href="/careers" className="fl" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span>Careers</span>
              <span style={{ fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)', marginLeft: '10px', whiteSpace: 'nowrap' }}>
                We&apos;re hiring
              </span>
            </Link>
            <Link href="/ai" className="fl">AI &amp; Technology</Link>
            <Link href="/contact" className="fl">Contact</Link>
          </div>

          <div>
            <div className="fc-head">Services</div>
            <Link href="/services/search-seo" className="fl">Search &amp; GEO/AEO</Link>
            <Link href="/services/ai-marketing" className="fl">AI Marketing</Link>
            <Link href="/services/paid-ads" className="fl">Social &amp; Paid Ads</Link>
            <Link href="/services/content-strategy" className="fl">Content &amp; Strategy</Link>
            <Link href="/services/niche-services" className="fl">Niche &amp; Growth</Link>
            <Link href="/services/analytics-strategy" className="fl">Analytics &amp; Strategy</Link>
            <Link href="/services/web-development" className="fl">Web &amp; Tech</Link>
            <Link href="/services/ai-development" className="fl">AI Development</Link>
          </div>

          <div>
            <div className="fc-head">Resources</div>
            <Link href="/blog" className="fl">Blog & Insights</Link>
            <Link href="/free-audit" className="fl">Free Marketing Audit</Link>
            <button type="button" onClick={() => openModal('rfp')} className="fl text-left bg-transparent border-none p-0 cursor-pointer">Request Proposal (RFP)</button>
            <div className="fc-head" style={{ marginTop: '18px' }}>Offices</div>
            <p style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5, marginBottom: '6px' }}>📍 215 S Monroe St, Tallahassee, FL, US</p>
            <p style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.5 }}>📍 7 Igele Maroko St, Ondo State, NG</p>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <span className="fb-copy">© 2026 AMPLIPATH, LLC. All rights reserved.</span>
        <div className="fb-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/about">Terms</Link>
          <Link href="/contact">Support</Link>
        </div>
        <div className="fb-logo-strip">
          <div className="fb-logo-item">
            <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span className="fb-logo-text">Google Premier Partner</span>
          </div>
          <div className="fb-logo-item">
            <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#0668E1" d="M6.92 3C3.96 3 1.5 6.5 1.5 11.5c0 3.16 1.13 5.42 2.7 6.93.5.48 1.06.86 1.65 1.13l1.1-3.65c-.45-.4-.85-1.04-1.1-1.92-.2-.7-.3-1.46-.3-2.24 0-3.13 1.46-5.4 3.05-5.4.84 0 1.5.5 2.1 1.45.3.47.55 1 .76 1.55l-1.42 4.6c-.16.5-.3 1.08-.3 1.5 0 .9.5 1.45 1.3 1.45 1.1 0 2.04-1.2 2.6-3.05l1.42-4.6c.2-.66.46-1.27.78-1.78.62-1 1.3-1.5 2.13-1.5 1.6 0 2.9 2.27 2.9 5.4 0 3.6-1.6 6.4-3.7 6.4-.6 0-1.1-.2-1.5-.55l-1.05 3.5c.8.4 1.7.6 2.65.6 4 0 6.85-3.85 6.85-9.55C22.5 6.85 19.4 3 16.05 3c-1.85 0-3.4 1-4.6 2.55C10.3 4 8.75 3 6.92 3z"/></svg>
            <span className="fb-logo-text">Meta Business Partner</span>
          </div>
          <div className="fb-logo-item">
            <svg viewBox="0 0 24 24" className="w-4 h-4"><rect x="2" y="2" width="9" height="9" fill="#F25022"/><rect x="13" y="2" width="9" height="9" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" fill="#FFB900"/></svg>
            <span className="fb-logo-text">Microsoft Ads Partner</span>
          </div>
          <div className="fb-logo-item">
            <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#000000" d="M16.6 5.82c-.7-.77-1.1-1.76-1.1-2.82h-3.1v13.06c0 1.55-1.26 2.8-2.8 2.8-1.55 0-2.8-1.25-2.8-2.8 0-1.54 1.25-2.8 2.8-2.8.3 0 .58.05.85.13V10.2c-.27-.04-.56-.06-.85-.06-3.24 0-5.86 2.63-5.86 5.87s2.62 5.86 5.86 5.86 5.86-2.62 5.86-5.86V9.4a8.3 8.3 0 0 0 4.78 1.53V7.83a4.85 4.85 0 0 1-3.64-2.01z"/></svg>
            <span className="fb-logo-text">TikTok Marketing Partner</span>
          </div>
        </div>
      </div>

      {showLanguageModal && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowLanguageModal(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto no-scrollbar p-6 text-white shadow-2xl relative"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowLanguageModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌐</span>
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-blue-400">Global Region &amp; Language</span>
                <h3 className="text-lg font-bold text-white">Select Website Language</h3>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Choose your preferred language. Translations are powered in real-time by Google Neural Machine Translation.
            </p>

            {/* Search Input */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search language, country, or region..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-400 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs bg-transparent border-none cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Region Tabs */}
            <div
              className="flex items-center gap-1 mb-3 pb-2 border-b border-slate-800 overflow-x-auto no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(['All', 'Americas', 'Europe', 'Asia & ME', 'Africa'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-colors border-none cursor-pointer ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Language Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-72 overflow-y-auto no-scrollbar mb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {LANGUAGES.filter((l) => {
                const matchesTab = activeTab === 'All' || l.region === activeTab;
                const matchesSearch =
                  !searchQuery.trim() ||
                  l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  l.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  l.code.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesTab && matchesSearch;
              }).map((lang, idx) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setShowLanguageModal(false);
                      handleSelectLang(lang.code);
                    }}
                    className={`text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 border cursor-pointer ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-500/60 text-white'
                        : 'bg-slate-800/40 border-slate-700/40 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">{lang.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold truncate">{lang.name}</span>
                        {isSelected && <span className="text-blue-400 text-xs font-bold ml-1">✓</span>}
                      </div>
                      <p className="text-[10.5px] text-slate-400 truncate leading-tight mt-0.5">
                        {lang.country}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span>⚡ Google Neural Translation</span>
              <button
                type="button"
                onClick={() => {
                  setShowLanguageModal(false);
                  handleSelectLang('en');
                }}
                className="text-blue-400 hover:text-blue-300 bg-transparent border-none p-0 cursor-pointer font-medium"
              >
                Reset to English
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
