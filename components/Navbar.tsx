'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import { useModal } from './ModalContext';
import GlobalLanguageSwitcher from './GlobalLanguageSwitcher';

// Comprehensive catalog of all 73 services grouped by their 8 categories
const SERVICE_CATEGORIES = [
  {
    name: 'Search & GEO/AEO',
    icon: '🔍',
    items: [
      { name: 'SEO Optimization', href: '/services/seo' },
      { name: 'GEO / AEO — AI Search', href: '/services/geo' },
      { name: 'Local SEO', href: '/services/localseo' },
      { name: 'Technical SEO', href: '/services/techseo' },
      { name: 'E-Commerce SEO', href: '/services/ecoseo' },
      { name: 'Video SEO', href: '/services/videoseo' },
      { name: 'SEM & Google Ads', href: '/services/sem' },
      { name: 'Reddit Marketing & SEO', href: '/services/redditmarketing' },
      { name: 'Google Business Profile', href: '/services/gbp' },
      { name: 'Amazon SEO & Marketplace', href: '/services/amazonseo' },
      { name: 'Pinterest SEO', href: '/services/pinterestseo' },
      { name: 'AI Brand Positioning', href: '/services/ai-brand-positioning' },
      { name: 'Google Local Services Ads', href: '/services/google-local-services-ads' },
    ],
  },
  {
    name: 'AI Marketing',
    icon: '🤖',
    items: [
      { name: 'AI Marketing Prompt Strategy', href: '/services/aiprompt' },
      { name: 'Brand Personality Design', href: '/services/brandai' },
      { name: 'Email Marketing Personalization', href: '/services/emailai' },
      { name: 'AI-Powered Campaign Mgmt', href: '/services/aicampaign' },
      { name: 'AI-Powered Ad Bidding', href: '/services/aiads' },
    ],
  },
  {
    name: 'Social & Paid Ads',
    icon: '💰',
    items: [
      { name: 'Social Media Marketing', href: '/services/smm' },
      { name: 'Social Media Management', href: '/services/smmanage' },
      { name: 'Social Commerce', href: '/services/socialcommerce' },
      { name: 'Facebook & Instagram Ads', href: '/services/fbads' },
      { name: 'TikTok Ads & Shop', href: '/services/tiktok' },
      { name: 'YouTube Ads', href: '/services/ytads' },
      { name: 'Influencer Marketing', href: '/services/influencer' },
      { name: 'Display Advertising', href: '/services/display' },
      { name: 'LinkedIn Ads & B2B Lead Gen', href: '/services/linkedinads' },
      { name: 'Quora Ads', href: '/services/quoraads' },
      { name: 'Reddit Ads', href: '/services/redditads' },
      { name: 'Amazon Ads Management', href: '/services/amazonads' },
      { name: 'Pinterest Business Optimization', href: '/services/pinterestbiz' },
      { name: 'Programmatic Advertising', href: '/services/programmatic-advertising' },
    ],
  },
  {
    name: 'Content & Strategy',
    icon: '✍️',
    items: [
      { name: 'Content Marketing', href: '/services/content' },
      { name: 'Email Marketing', href: '/services/email' },
      { name: 'Email Automations', href: '/services/emailauto' },
      { name: 'Digital PR', href: '/services/digitalpr' },
      { name: 'Marketing Strategy & Planning', href: '/services/strategy' },
      { name: 'Conversion Rate Optimization', href: '/services/cro' },
      { name: 'Affiliate Marketing', href: '/services/affiliate' },
      { name: 'Text Message Marketing', href: '/services/sms' },
      { name: 'Conversion Copywriting', href: '/services/copywriting' },
      { name: 'CRM Setup & Marketing Automation', href: '/services/crm' },
      { name: 'Marketing Analytics & Data Studio', href: '/services/marketinganalytics' },
      { name: 'Website Copywriting', href: '/services/website-copywriting' },
    ],
  },
  {
    name: 'Niche & Growth',
    icon: '🎮',
    items: [
      { name: 'Game Marketing', href: '/services/game' },
      { name: 'Steam Marketing', href: '/services/steam' },
      { name: 'Mobile App Marketing', href: '/services/appmarketing' },
      { name: 'Course Promotion', href: '/services/course' },
      { name: 'Music Promotion', href: '/services/music' },
      { name: 'Podcast Marketing', href: '/services/podcast' },
      { name: 'Book & eBook Marketing', href: '/services/book' },
      { name: 'Cryptocurrency Marketing', href: '/services/crypto' },
      { name: 'Africa Market Services', href: '/services/africa', badge: 'AFRICA' },
      { name: 'MLM & Network Marketing', href: '/services/mlm-network-marketing' },
    ],
  },
  {
    name: 'Analytics & Strategy',
    icon: '📊',
    items: [
      { name: 'Web Analytics', href: '/services/analytics' },
      { name: 'Public Relations', href: '/services/pr' },
      { name: 'Crowdfunding Marketing', href: '/services/crowdfund' },
      { name: 'Guest Posting & Link Building', href: '/services/guestpost' },
      { name: 'Brand Strategy', href: '/services/brandstrategy' },
    ],
  },
  {
    name: 'Web & Tech',
    icon: '💻',
    items: [
      { name: 'Website Development', href: '/services/webdev', badge: 'POPULAR' },
      { name: 'E-Commerce Development', href: '/services/ecomdev' },
      { name: 'Custom Websites', href: '/services/customweb' },
      { name: 'Landing Pages', href: '/services/landing' },
      { name: 'Dropshipping Websites', href: '/services/dropship' },
      { name: 'Website Security Analysis', href: '/services/website-security-analysis' },
    ],
  },
  {
    name: 'AI Development',
    icon: '⚡',
    items: [
      { name: 'AI Development', href: '/services/aidev' },
      { name: 'AI Websites & Software', href: '/services/aiwebsoft' },
      { name: 'AI Mobile Apps', href: '/services/aimobile' },
      { name: 'AI Integrations', href: '/services/aiintegrate' },
      { name: 'AI Agents', href: '/services/aiagents' },
      { name: 'AI Technology Consulting', href: '/services/aiconsult' },
      { name: 'AI Chatbot Development', href: '/services/chatbot' },
      { name: 'Mobile App Development', href: '/services/mobileapp' },
    ],
  },
];

const INDUSTRIES = [
  { name: 'Digital Marketing for Law Firms', href: '/industries/law-firms', icon: '⚖️' },
  { name: 'Ecommerce Growth Agency', href: '/industries/ecommerce', icon: '🛒' },
  { name: 'SaaS & Tech Startup Marketing', href: '/industries/saas', icon: '💻' },
  { name: 'App & Game Marketing Agency', href: '/industries/gaming', icon: '🎮' },
  { name: 'Course & Education Marketing', href: '/industries/education', icon: '🎓' },
  { name: 'Real Estate Marketing', href: '/industries/real-estate', icon: '🏠' },
  { name: 'Roofing & Home Services', href: '/industries/home-services', icon: '🔧' },
  { name: 'Healthcare & Wellness Marketing', href: '/industries/healthcare', icon: '🏥' },
  { name: 'Restaurant & Food Service', href: '/industries/restaurants', icon: '🍽️' },
  { name: 'Nonprofit & Charity', href: '/industries/nonprofits', icon: '💛' },
  { name: 'Finance & Fintech', href: '/industries/fintech', icon: '💰' },
];

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [indOpen, setIndOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mobile accordion state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [mobileSearch, setMobileSearch] = useState('');

  const { openModal } = useModal();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMegaOpen(false);
        setIndOpen(false);
        setResOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeAllMobile = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileIndustriesOpen(false);
    setMobileResourcesOpen(false);
    setExpandedCat(null);
    setMobileSearch('');
  };

  const toggleCategory = (catName: string) => {
    setExpandedCat(expandedCat === catName ? null : catName);
  };

  // Filter items if user is searching
  const searchLower = mobileSearch.trim().toLowerCase();
  const filteredServices = searchLower
    ? SERVICE_CATEGORIES.flatMap(cat => 
        cat.items.filter(it => it.name.toLowerCase().includes(searchLower)).map(it => ({ ...it, category: cat.name }))
      )
    : [];
  const filteredIndustries = searchLower
    ? INDUSTRIES.filter(ind => ind.name.toLowerCase().includes(searchLower))
    : [];

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav ref={navRef} className="nx-nav flex items-center justify-between px-4 sm:px-6 md:px-10 h-16 border-b border-slate-200 bg-white relative">
        <div className="flex items-center">
          <Logo />
          <GlobalLanguageSwitcher isMobile={false} />
        </div>

        {/* ══ DESKTOP NAV LINKS (100% UNCHANGED >= 1024px) ══ */}
        <div className="hidden lg:flex items-center gap-1">
          <Link href="/about" className="nx-a">About</Link>
          
          <div
            className="relative"
            onMouseEnter={() => { setMegaOpen(true); setIndOpen(false); setResOpen(false); }}
          >
            <Link href="/services" className="nx-a inline-block">
              Services ▾
            </Link>
          </div>

          <div
            className="ind-drop-wrap relative"
            onMouseEnter={() => { setIndOpen(true); setMegaOpen(false); setResOpen(false); }}
            onMouseLeave={() => setIndOpen(false)}
          >
            <button
              type="button"
              className="nx-a"
              onClick={() => setIndOpen(!indOpen)}
            >
              Industries ▾
            </button>
            {indOpen && (
              <div
                className="ind-drop-menu open"
                id="ind-drop"
                style={{
                  display: 'block',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '280px',
                  background: '#fff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  padding: '8px 0',
                  zIndex: 999
                }}
              >
                <Link href="/industries/law-firms" onClick={() => setIndOpen(false)} className="ind-drop-item">⚖️ Digital Marketing for Law Firms</Link>
                <Link href="/industries/ecommerce" onClick={() => setIndOpen(false)} className="ind-drop-item">🛒 Ecommerce Growth Agency</Link>
                <Link href="/industries/saas" onClick={() => setIndOpen(false)} className="ind-drop-item">💻 SaaS &amp; Tech Startup Marketing</Link>
                <Link href="/industries/gaming" onClick={() => setIndOpen(false)} className="ind-drop-item">🎮 App &amp; Game Marketing Agency</Link>
                <Link href="/industries/education" onClick={() => setIndOpen(false)} className="ind-drop-item">🎓 Course &amp; Education Marketing</Link>
                <div className="ind-drop-divider"></div>
                <Link href="/industries/real-estate" onClick={() => setIndOpen(false)} className="ind-drop-item">🏠 Real Estate Marketing</Link>
                <Link href="/industries/home-services" onClick={() => setIndOpen(false)} className="ind-drop-item">🔧 Roofing &amp; Home Services</Link>
                <Link href="/industries/healthcare" onClick={() => setIndOpen(false)} className="ind-drop-item">🏥 Healthcare &amp; Wellness Marketing</Link>
                <div className="ind-drop-divider"></div>
                <Link href="/industries/restaurants" onClick={() => setIndOpen(false)} className="ind-drop-item">🍽️ Restaurant &amp; Food Service</Link>
                <Link href="/industries/nonprofits" onClick={() => setIndOpen(false)} className="ind-drop-item">💛 Nonprofit &amp; Charity</Link>
                <Link href="/industries/fintech" onClick={() => setIndOpen(false)} className="ind-drop-item">💰 Finance &amp; Fintech</Link>
              </div>
            )}
          </div>

          <Link href="/work" className="nx-a">Work</Link>

          <div
            className="res-drop-wrap relative"
            onMouseEnter={() => { setResOpen(true); setMegaOpen(false); setIndOpen(false); }}
            onMouseLeave={() => setResOpen(false)}
          >
            <button type="button" className="nx-a" onClick={() => setResOpen(!resOpen)}>Resources ▾</button>
            {resOpen && (
              <div
                className="res-drop-menu open"
                style={{
                  display: 'block',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '220px',
                  background: '#fff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  padding: '8px 0',
                  zIndex: 999
                }}
              >
                <Link href="/blog" onClick={() => setResOpen(false)} className="res-drop-item">📰 Blog &amp; Insights</Link>
                <Link href="/free-audit" onClick={() => setResOpen(false)} className="res-drop-item">🔍 Free Audit</Link>
              </div>
            )}
          </div>

          <Link href="/ai" className="nx-a">AI &amp; Technology</Link>
          <Link href="/contact" className="nx-a">Contact</Link>
        </div>

        {/* ══ HEADER ACTIONS & HAMBURGER ══ */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            className="nx-rfp text-xs sm:text-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5"
            onClick={() => openModal('rfp')}
          >
            RFP
          </button>
          <button
            type="button"
            className="nx-talk text-xs sm:text-sm px-2.5 sm:px-4 py-1.5"
            onClick={() => openModal('lead')}
          >
            Let&apos;s talk!
          </button>
          
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setMegaOpen(false);
            }}
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors ml-0.5"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} />
      </nav>

      {/* ══ COMPLETE MOBILE NAVIGATION DRAWER (< 1024px) ══ */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 bottom-0 bg-white z-[999] overflow-y-auto border-t border-slate-200"
          style={{ top: '64px' }}
        >
          <div className="px-5 py-4 flex flex-col pb-32">
            {/* Quick Live Search Bar for all 73+ Services & Industries */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder="Search all 73+ services & pages..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 text-[13.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
                <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">🔍</span>
                {mobileSearch && (
                  <button
                    onClick={() => setMobileSearch('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* If searching, display matching results directly */}
            {searchLower ? (
              <div className="flex flex-col gap-2 pb-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Search Results ({filteredServices.length + filteredIndustries.length})
                </div>

                {filteredServices.length === 0 && filteredIndustries.length === 0 ? (
                  <div className="text-sm text-slate-500 py-6 text-center">
                    No services found matching &ldquo;{mobileSearch}&rdquo;.
                  </div>
                ) : (
                  <>
                    {filteredServices.map((it, idx) => (
                      <Link
                        key={idx}
                        href={it.href}
                        onClick={closeAllMobile}
                        className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-300 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-[13.5px] font-semibold text-slate-800">{it.name}</div>
                          <div className="text-[11px] text-slate-400">{it.category}</div>
                        </div>
                        <span className="text-blue-600 text-xs">→</span>
                      </Link>
                    ))}
                    {filteredIndustries.map((ind, idx) => (
                      <Link
                        key={`ind-${idx}`}
                        href={ind.href}
                        onClick={closeAllMobile}
                        className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-300 flex items-center justify-between"
                      >
                        <div className="text-[13.5px] font-semibold text-slate-800">
                          {ind.icon} {ind.name}
                        </div>
                        <span className="text-blue-600 text-xs">→</span>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            ) : (
              /* Regular Full Tree Navigation */
              <div className="flex flex-col divide-y divide-slate-100">
                {/* About Link */}
                <Link
                  href="/about"
                  onClick={closeAllMobile}
                  className="py-3 text-[15px] font-semibold text-slate-800 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>About us</span>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>

                {/* ══ SERVICES EXPANDABLE ACCORDION (ALL 8 CATEGORIES & ALL 73 SERVICES) ══ */}
                <div className="py-2.5">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full py-1.5 flex items-center justify-between text-[15px] font-semibold text-slate-800 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span>Services</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        73 Services
                      </span>
                    </div>
                    <span className={`text-slate-500 text-xs transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {mobileServicesOpen && (
                    <div className="mt-2.5 flex flex-col gap-2 pl-1 pr-1 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                      <Link
                        href="/services"
                        onClick={closeAllMobile}
                        className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-wider flex items-center justify-between pb-2 border-b border-slate-200"
                      >
                        <span>Explore All Services Overview</span>
                        <span>→</span>
                      </Link>

                      {/* Sub-categories */}
                      {SERVICE_CATEGORIES.map((cat, cIdx) => {
                        const isCatOpen = expandedCat === cat.name;
                        return (
                          <div key={cIdx} className="border-b border-slate-200/60 last:border-b-0 pb-1.5 pt-1">
                            <button
                              type="button"
                              onClick={() => toggleCategory(cat.name)}
                              className="w-full flex items-center justify-between text-left py-1.5 text-[13px] font-bold text-slate-700 hover:text-blue-600"
                            >
                              <div className="flex items-center gap-2">
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                                <span className="text-[10px] text-slate-400 font-normal">({cat.items.length})</span>
                              </div>
                              <span className="text-slate-400 text-xs">
                                {isCatOpen ? '−' : '+'}
                              </span>
                            </button>

                            {isCatOpen && (
                              <div className="pl-6 py-1 flex flex-col gap-1.5">
                                {cat.items.map((svc, sIdx) => (
                                  <Link
                                    key={sIdx}
                                    href={svc.href}
                                    onClick={closeAllMobile}
                                    className="text-[12.5px] text-slate-600 hover:text-blue-600 py-1 flex items-center justify-between"
                                  >
                                    <span>{svc.name}</span>
                                    {svc.badge && (
                                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                        svc.badge === 'AFRICA' 
                                          ? 'bg-emerald-800 text-emerald-200' 
                                          : 'bg-blue-600 text-white'
                                      }`}>
                                        {svc.badge}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ══ INDUSTRIES EXPANDABLE ACCORDION (ALL 11 INDUSTRIES) ══ */}
                <div className="py-2.5">
                  <button
                    type="button"
                    onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                    className="w-full py-1.5 flex items-center justify-between text-[15px] font-semibold text-slate-800 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span>Industries</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        11 Sectors
                      </span>
                    </div>
                    <span className={`text-slate-500 text-xs transition-transform duration-200 ${mobileIndustriesOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {mobileIndustriesOpen && (
                    <div className="mt-2.5 flex flex-col gap-1.5 pl-2 pr-1 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                      {INDUSTRIES.map((ind, iIdx) => (
                        <Link
                          key={iIdx}
                          href={ind.href}
                          onClick={closeAllMobile}
                          className="text-[13px] text-slate-700 hover:text-blue-600 py-1.5 flex items-center gap-2"
                        >
                          <span>{ind.icon}</span>
                          <span>{ind.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Work Link */}
                <Link
                  href="/work"
                  onClick={closeAllMobile}
                  className="py-3 text-[15px] font-semibold text-slate-800 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>Our Work</span>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>

                {/* Resources Accordion */}
                <div className="py-2.5">
                  <button
                    type="button"
                    onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                    className="w-full py-1.5 flex items-center justify-between text-[15px] font-semibold text-slate-800 text-left"
                  >
                    <span>Resources</span>
                    <span className={`text-slate-500 text-xs transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {mobileResourcesOpen && (
                    <div className="mt-2.5 flex flex-col gap-1.5 pl-2 pr-1 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                      <Link href="/blog" onClick={closeAllMobile} className="text-[13px] text-slate-700 hover:text-blue-600 py-1.5">
                        📰 Blog &amp; Insights
                      </Link>
                      <Link href="/free-audit" onClick={closeAllMobile} className="text-[13px] text-slate-700 hover:text-blue-600 py-1.5">
                        🔍 Free Marketing Audit
                      </Link>
                    </div>
                  )}
                </div>

                {/* AI & Technology */}
                <Link
                  href="/ai"
                  onClick={closeAllMobile}
                  className="py-3 text-[15px] font-semibold text-slate-800 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>AI &amp; Technology</span>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>

                {/* Careers */}
                <Link
                  href="/careers"
                  onClick={closeAllMobile}
                  className="py-3 text-[15px] font-semibold text-slate-800 hover:text-blue-600 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span>Careers</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 ml-2.5">
                      We&apos;re hiring
                    </span>
                  </div>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>

                {/* Contact */}
                <Link
                  href="/contact"
                  onClick={closeAllMobile}
                  className="py-3 text-[15px] font-semibold text-slate-800 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>Contact</span>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>
              </div>
            )}

            {/* Mobile Language Switcher */}
            <GlobalLanguageSwitcher isMobile={true} onSelectMobile={closeAllMobile} />

            {/* Mobile Action Buttons */}
            <div className="pt-6 flex flex-col gap-2.5 border-t border-slate-200 mt-4">
              <button
                type="button"
                onClick={() => {
                  closeAllMobile();
                  openModal('rfp');
                }}
                className="w-full py-3 text-center text-blue-600 border-2 border-blue-600 font-bold rounded-xl text-[14px] hover:bg-blue-50 transition-colors"
              >
                Request Proposal (RFP)
              </button>
              <button
                type="button"
                onClick={() => {
                  closeAllMobile();
                  openModal('lead');
                }}
                className="w-full py-3 text-center bg-blue-600 text-white font-bold rounded-xl text-[14px] shadow-sm hover:bg-blue-700 transition-colors"
              >
                Let&apos;s talk!
              </button>
              <p className="text-center text-xs text-slate-400 mt-1">
                hello@amplipath.com · 24/7 Global Team
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
