'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

export default function HomePage() {
  const router = useRouter();
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pg on" id="pg-home">
      {/*  HERO — High commercial intent, CRO-optimized  */}
<div className="hero">
  <div className="hero-bar"></div>
  <div className="h-tag"><div className="h-dot"></div>GROWTH, ENGINEERED.</div>
  <h1 className="h-h1">The Integrated Growth Partner<br />for <em>Ambitious Businesses.</em></h1>
  <p className="h-sub">Amplipath unifies digital marketing, technology and AI into one integrated system — so you can grow faster, operate smarter, and scale with confidence. One team. One system. Compound growth instead of disconnected campaigns.</p>
  <div className="h-btns">
    <button className="btn-fill" onClick={() => openModal('rfp')}>Work With Us</button>
    <button className="btn-out" onClick={() => router.push('/work')}>See Client Results →</button>
  </div>
  <div className="p-logo-strip">
    <span className="p-logo-lbl">Certified Partner</span>
    <div className="p-logo-item"><svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg><span className="p-logo-text"><b>Google</b> Premier Partner</span></div>
    <div className="p-logo-item"><svg viewBox="0 0 24 24"><path fill="#0668E1" d="M6.92 3C3.96 3 1.5 6.5 1.5 11.5c0 3.16 1.13 5.42 2.7 6.93.5.48 1.06.86 1.65 1.13l1.1-3.65c-.45-.4-.85-1.04-1.1-1.92-.2-.7-.3-1.46-.3-2.24 0-3.13 1.46-5.4 3.05-5.4.84 0 1.5.5 2.1 1.45.3.47.55 1 .76 1.55l-1.42 4.6c-.16.5-.3 1.08-.3 1.5 0 .9.5 1.45 1.3 1.45 1.1 0 2.04-1.2 2.6-3.05l1.42-4.6c.2-.66.46-1.27.78-1.78.62-1 1.3-1.5 2.13-1.5 1.6 0 2.9 2.27 2.9 5.4 0 3.6-1.6 6.4-3.7 6.4-.6 0-1.1-.2-1.5-.55l-1.05 3.5c.8.4 1.7.6 2.65.6 4 0 6.85-3.85 6.85-9.55C22.5 6.85 19.4 3 16.05 3c-1.85 0-3.4 1-4.6 2.55C10.3 4 8.75 3 6.92 3z"/></svg><span className="p-logo-text"><b>Meta</b> Business Partner</span></div>
    <div className="p-logo-item"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="9" height="9" fill="#F25022"/><rect x="13" y="2" width="9" height="9" fill="#7FBA00"/><rect x="2" y="13" width="9" height="9" fill="#00A4EF"/><rect x="13" y="13" width="9" height="9" fill="#FFB900"/></svg><span className="p-logo-text"><b>Microsoft</b> Ads Select Partner</span></div>
    <div className="p-logo-item"><svg viewBox="0 0 24 24"><path fill="#000000" d="M16.6 5.82c-.7-.77-1.1-1.76-1.1-2.82h-3.1v13.06c0 1.55-1.26 2.8-2.8 2.8-1.55 0-2.8-1.25-2.8-2.8 0-1.54 1.25-2.8 2.8-2.8.3 0 .58.05.85.13V10.2c-.27-.04-.56-.06-.85-.06-3.24 0-5.86 2.63-5.86 5.87s2.62 5.86 5.86 5.86 5.86-2.62 5.86-5.86V9.4a8.3 8.3 0 0 0 4.78 1.53V7.83a4.85 4.85 0 0 1-3.64-2.01z"/></svg><span className="p-logo-text"><b>TikTok</b> Marketing Partner</span></div>
    <div className="p-logo-item"><svg viewBox="0 0 24 24"><path fill="#FF9900" d="M12.5 14.2c-2.7 2-6.6 3-9.9 3-.4 0-.5-.2-.2-.5 1.2-1.5 4-4.8 9-4.8.4 0 .8.1 1.1.2.3.3.3.7 0 2.1zm1.3-1.2c-.1-1.3-.2-3.2.1-4.4.3-1.3 1.1-2.1 2.5-2.3 2.3-.3 3.8 1.5 3.8 4.4 0 1.6-.5 3.3-1.5 4.5l1.6 1.5c.2.2.1.4-.1.4h-3.2c-.2 0-.3-.1-.3-.3-1.2-1.3-2.5-2.5-2.9-3.8zm-3.6-3.8C9.5 8 9 6.8 9 5.5 9 3 11 1 13.5 1S18 3 18 5.5c0 1.1-.3 2.1-.9 2.9l-1.8-1.7c.2-.4.3-.8.3-1.2 0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2c.3 0 .6-.1.8-.2l1.7 1.8c-.7.5-1.6.8-2.5.8-1.7 0-3.1-1-3.6-2.4z"/><path fill="#FF9900" d="M2.6 18.2c4-2.9 9.9-4.5 14.9-2 .4.2.6.6.3 1-.3.3-.7.3-1 .1-4.5-2.2-9.7-.8-13.3 1.9-.3.2-.7.1-.9-.2-.2-.3-.1-.6 0-.8z"/></svg><span className="p-logo-text"><b>Amazon</b> Ads Verified Partner</span></div>
  </div>
</div>

{/*  STATS STRIP  */}
<div className="stats-strip">
  <div className="stat-box"><div className="stat-n">🌍</div><div className="stat-l">Global clients — every market</div></div>
  <div className="stat-box"><div className="stat-n">50+</div><div className="stat-l">Services offered</div></div>
  <div className="stat-box"><div className="stat-n">15</div><div className="stat-l">African markets</div></div>
  <div className="stat-box"><div className="stat-n">13</div><div className="stat-l">Tech &amp; AI Services: Websites, Apps, Chatbots &amp; AI Systems</div></div>
</div>

{/*  TRUST SIGNALS  */}
<div className="trust-strip">
  <div className="trust-item"><span className="trust-icon">🏆</span>GEO/AEO First-Mover Agency</div>
  <div className="trust-item"><span className="trust-icon">⭐</span>Highly Rated by Our Clients</div>
  <div className="trust-item"><span className="trust-icon">🌍</span>Global Clients — Every Market</div>
  <div className="trust-item"><span className="trust-icon">📈</span>Results from Day 30</div>
  <div className="trust-item"><span className="trust-icon">🔒</span>No Lock-In Contracts</div>
  <div className="trust-item"><span className="trust-icon">⚙️</span>Marketing + Development — One Team</div>
</div>

{/*  Internal linking hub - Section 1.3  */}
<div style={{"background":"var(--acl)","borderTop":"1px solid #c7d7f9","borderBottom":"1px solid #c7d7f9","padding":"16px 40px"}}>
  <div style={{"display":"flex","alignItems":"center","gap":"12px","flexWrap":"wrap","justifyContent":"center"}}>
    <span style={{"fontSize":"11px","fontWeight":"700","color":"var(--ac)","textTransform":"uppercase","letterSpacing":".1em","whiteSpace":"nowrap"}}>Explore services:</span>
    <button onClick={() => router.push('/services')} style={{"fontSize":"12px","color":"var(--ac)","background":"#fff","border":"1.5px solid var(--ac)","borderRadius":"20px","padding":"5px 14px","cursor":"pointer","fontWeight":"600","whiteSpace":"nowrap"}}>🔍 Search & SEO</button>
    <button onClick={() => router.push('/services')} style={{"fontSize":"12px","color":"#7C3AED","background":"#fff","border":"1.5px solid #7C3AED","borderRadius":"20px","padding":"5px 14px","cursor":"pointer","fontWeight":"600","whiteSpace":"nowrap"}}>💰 Paid Media</button>
    <button onClick={() => router.push('/services')} style={{"fontSize":"12px","color":"#0284c7","background":"#fff","border":"1.5px solid #0284c7","borderRadius":"20px","padding":"5px 14px","cursor":"pointer","fontWeight":"600","whiteSpace":"nowrap"}}>📱 Social Media</button>
    <button onClick={() => router.push('/services')} style={{"fontSize":"12px","color":"#15803d","background":"#fff","border":"1.5px solid #15803d","borderRadius":"20px","padding":"5px 14px","cursor":"pointer","fontWeight":"600","whiteSpace":"nowrap"}}>✍️ Content & PR</button>
    <button onClick={() => router.push('/services')} style={{"fontSize":"12px","color":"#0f172a","background":"#fff","border":"1.5px solid #0f172a","borderRadius":"20px","padding":"5px 14px","cursor":"pointer","fontWeight":"600","whiteSpace":"nowrap"}}>💻 Web & Tech</button>
    <button onClick={() => router.push('/services')} style={{"fontSize":"12px","color":"#b91c1c","background":"#fff","border":"1.5px solid #b91c1c","borderRadius":"20px","padding":"5px 14px","cursor":"pointer","fontWeight":"600","whiteSpace":"nowrap"}}>🎮 Niche & Growth</button>
    <button onClick={() => router.push('/services')} style={{"fontSize":"12px","color":"#15803d","background":"#fff","border":"1.5px solid #166534","borderRadius":"20px","padding":"5px 14px","cursor":"pointer","fontWeight":"600","whiteSpace":"nowrap"}}>🌍 Africa Market</button>
    <button onClick={() => router.push('/ai')} style={{"fontSize":"12px","color":"#d97706","background":"#fff","border":"1.5px solid #d97706","borderRadius":"20px","padding":"5px 14px","cursor":"pointer","fontWeight":"600","whiteSpace":"nowrap"}}>🤖 AI & Tech</button>
  </div>
</div>

{/*  SERVICES OVERVIEW — Commercial intent keywords woven in  */}
<div className="s-white">
  <div className="sec-tag">OUR MARKETING &amp; TECHNOLOGY SERVICES</div>
  <h2 className="sec-h2">Everything your business needs to attract, convert and scale.</h2>
  <div className="aln"></div>
  <p className="sec-sub" style={{"marginBottom":"32px"}}>Most agencies only handle traffic. Amplipath connects the full growth journey — search visibility, paid acquisition, content, social media, websites, apps, automation, analytics and AI systems — so every campaign has the digital infrastructure needed to convert.</p>
  <div className="sg">
    <div className="scard" onClick={() => router.push('/services/search-seo')}><div className="sc-ico">🔍</div><div className="sc-n">SEO Services</div><div className="sc-d">Rank higher on Google and Bing. On-page, off-page and technical SEO strategies that deliver first-page rankings and sustainable organic traffic growth.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard" onClick={() => router.push('/services/ai-marketing')}><div className="sc-ico">🤖</div><div className="sc-n">GEO / AEO — AI Search</div><div className="sc-d">Get your brand cited in ChatGPT, Gemini and Google AI Overviews. The fastest-growing traffic source in 2026 — most agencies don\'t offer this yet.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard" onClick={() => router.push('/services/paid-ads')}><div className="sc-ico">📣</div><div className="sc-n">Paid Advertising (PPC)</div><div className="sc-d">Google Ads, Meta, TikTok, YouTube — full-funnel paid campaigns managed by certified specialists with transparent ROI reporting every month.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard" onClick={() => router.push('/services/niche-services')}><div className="sc-ico">🎮</div><div className="sc-n">Game & Course Marketing</div><div className="sc-d">Steam wishlist campaigns, mobile app growth, Udemy instructor marketing — niche expertise that specialist agencies charge 3x more for.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard" onClick={() => router.push('/services/africa-market')}><div className="sc-ico">🌍</div><div className="sc-n">Africa Market Services</div><div className="sc-d">The only global agency with dedicated African market expertise. Real local data for 15 countries. WhatsApp marketing, Jumia SEO and pan-African campaigns.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard" onClick={() => router.push('/services/web-development')}><div className="sc-ico">💻</div><div className="sc-n">Web & AI Development</div><div className="sc-d">Business websites, e-commerce stores, AI chatbots and mobile apps. Built to convert, load fast and rank well from day one.</div><div className="sc-more">Learn more →</div></div>
  </div>
  <div style={{"marginTop":"24px","textAlign":"center"}}>
    <button className="btn-out" onClick={() => router.push('/services')}>View all 50+ services →</button>
  </div>
</div>

{/*  WHY CHOOSE US — Competitor gap analysis implemented  */}
<div className="s-gray">
  <div className="sec-tag">WHY AMPLIPATH — MARKETING &amp; TECHNOLOGY</div>
  <h2 className="sec-h2">One agency for strategy, traffic and the technology that converts it.</h2>
  <div className="aln"></div>
  <div className="why-grid">
    <div className="why-card">
      <div className="why-ico">🎯</div>
      <div className="why-title">Specialists, not generalists</div>
      <div className="why-desc">Unlike large agencies that assign junior staff to your account, every Amplipath campaign is managed by a senior specialist with 5+ years of experience in your specific channel and industry.</div>
    </div>
    <div className="why-card">
      <div className="why-ico">🤖</div>
      <div className="why-title">GEO/AEO — first movers</div>
      <div className="why-desc">We are one of the only agencies globally offering structured Generative Engine Optimization and Answer Engine Optimization — getting your brand cited in ChatGPT, Gemini and Perplexity answers.</div>
    </div>
    <div className="why-card">
      <div className="why-ico">🌍</div>
      <div className="why-title">Africa expertise no one else has</div>
      <div className="why-desc">While competitors ignore Africa, we\'ve built dedicated infrastructure, real local keyword data and specialist teams for 15 African markets — a $4.2B digital ad market growing at 67% annually.</div>
    </div>
    <div className="why-card">
      <div className="why-ico">⚙️</div>
      <div className="why-title">One team for strategy and build</div>
      <div className="why-desc">Most marketing agencies outsource development — and most developers don't run campaigns. We do both, in-house, so your website, app or AI chatbot is built by the same team that knows exactly what your marketing needs it to do.</div>
    </div>
    <div className="why-card">
      <div className="why-ico">🔒</div>
      <div className="why-title">No lock-in contracts</div>
      <div className="why-desc">We don\'t hide behind 12-month lock-ins. Month-to-month engagements available for all services. We earn your business every month through results, not contracts.</div>
    </div>
    <div className="why-card">
      <div className="why-ico">⚡</div>
      <div className="why-title">Results within 90 days</div>
      <div className="why-desc">Our 90-day rapid growth framework delivers measurable improvements in traffic, leads and conversions within the first quarter — not the first year.</div>
    </div>
  </div>
</div>


{/*  TECHNOLOGY SYSTEM SECTION  */}
<div className="s-gray">
  <div className="sec-tag">DIGITAL MARKETING + TECHNOLOGY — IN-HOUSE</div>
  <h2 className="sec-h2">Marketing performs better when the right digital systems are built behind it.</h2>
  <div className="aln"></div>
  <p className="sec-sub" style={{"marginBottom":"36px"}}>A campaign is only as strong as the system it sends traffic into. That's why Amplipath also builds the websites, ecommerce stores, mobile apps, landing pages, AI chatbots, automations, dashboards and integrations that help businesses capture, qualify and convert demand.</p>
  <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(240px,1fr))","gap":"18px"}}>
    <div style={{"background":"#fff","borderRadius":"12px","padding":"22px 24px","border":"1.5px solid var(--border)"}}>
      <div style={{"fontSize":"24px","marginBottom":"10px"}}>🌐</div>
      <div style={{"fontWeight":"700","color":"#0f172a","marginBottom":"6px","fontSize":"15px"}}>Websites &amp; Landing Pages</div>
      <div style={{"fontSize":"13px","color":"#64748b","lineHeight":"1.7"}}>Conversion-focused websites, landing pages and service pages built for SEO, speed, tracking and lead generation. React, Next.js, WordPress &amp; custom builds.</div>
    </div>
    <div style={{"background":"#fff","borderRadius":"12px","padding":"22px 24px","border":"1.5px solid var(--border)"}}>
      <div style={{"fontSize":"24px","marginBottom":"10px"}}>🛒</div>
      <div style={{"fontWeight":"700","color":"#0f172a","marginBottom":"6px","fontSize":"15px"}}>E-Commerce &amp; Payment Systems</div>
      <div style={{"fontSize":"13px","color":"#64748b","lineHeight":"1.7"}}>Shopify, WooCommerce and custom builds with product pages, checkout optimization, abandoned cart flows and analytics dashboards.</div>
    </div>
    <div style={{"background":"#fff","borderRadius":"12px","padding":"22px 24px","border":"1.5px solid var(--border)"}}>
      <div style={{"fontSize":"24px","marginBottom":"10px"}}>📱</div>
      <div style={{"fontWeight":"700","color":"#0f172a","marginBottom":"6px","fontSize":"15px"}}>Mobile Apps &amp; Custom Platforms</div>
      <div style={{"fontSize":"13px","color":"#64748b","lineHeight":"1.7"}}>Android, iOS, Flutter and React Native app development for businesses, startups, marketplaces, booking systems and digital products.</div>
    </div>
    <div style={{"background":"#fff","borderRadius":"12px","padding":"22px 24px","border":"1.5px solid var(--border)"}}>
      <div style={{"fontSize":"24px","marginBottom":"10px"}}>🤖</div>
      <div style={{"fontWeight":"700","color":"#0f172a","marginBottom":"6px","fontSize":"15px"}}>AI Chatbots &amp; Automation</div>
      <div style={{"fontSize":"13px","color":"#64748b","lineHeight":"1.7"}}>AI chatbots, lead qualification systems, automated follow-up, AI agents, CRM workflows and support automation. Powered by OpenAI, Claude and Gemini APIs.</div>
    </div>
    <div style={{"background":"#fff","borderRadius":"12px","padding":"22px 24px","border":"1.5px solid var(--border)"}}>
      <div style={{"fontSize":"24px","marginBottom":"10px"}}>📊</div>
      <div style={{"fontWeight":"700","color":"#0f172a","marginBottom":"6px","fontSize":"15px"}}>Analytics &amp; Conversion Tracking</div>
      <div style={{"fontSize":"13px","color":"#64748b","lineHeight":"1.7"}}>GA4, Tag Manager, Meta Pixel, TikTok Pixel, CRM dashboards, call tracking, event tracking and performance reports tied to real business outcomes.</div>
    </div>
  </div>
</div>

{/*  Comparison table - Section 5.3  */}
<div className="s-white">
  <div className="sec-tag">AMPLIPATH VS THE ALTERNATIVES — MARKETING + TECHNOLOGY</div>
  <h2 className="sec-h2">Marketing agency. Technology company. One team.</h2>
  <div className="aln"></div>
  <p className="sec-sub" style={{"marginBottom":"28px"}}>See how Amplipath compares to large agencies, freelancers and in-house teams — including the technology and AI capabilities most agencies simply don't offer.</p>
  <div style={{"overflowX":"auto"}}>
    <table style={{"width":"100%","borderCollapse":"collapse","fontSize":"13px"}}>
      <thead>
        <tr style={{"background":"#0f172a"}}>
          <th style={{"padding":"14px 18px","textAlign":"left","color":"#94a3b8","fontSize":"11px","fontWeight":"700","letterSpacing":".1em","textTransform":"uppercase","width":"28%"}}>What you need</th>
          <th style={{"padding":"14px 18px","textAlign":"center","color":"var(--ac)","fontSize":"12px","fontWeight":"700","width":"18%"}}>Amplipath</th>
          <th style={{"padding":"14px 18px","textAlign":"center","color":"#94a3b8","fontSize":"12px","fontWeight":"700","width":"18%"}}>Large Agency</th>
          <th style={{"padding":"14px 18px","textAlign":"center","color":"#94a3b8","fontSize":"12px","fontWeight":"700","width":"18%"}}>Freelancer</th>
          <th style={{"padding":"14px 18px","textAlign":"center","color":"#94a3b8","fontSize":"12px","fontWeight":"700","width":"18%"}}>In-House</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{"borderBottom":"1px solid var(--border)"}}>
          <td style={{"padding":"13px 18px","color":"#0f172a","fontWeight":"600"}}>Senior specialist on your account</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a","fontWeight":"700"}}>✓ Always</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Junior staff typical</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#f59e0b"}}>~ 1 person only</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#f59e0b"}}>~ Depends on hire</td>
        </tr>
        <tr style={{"borderBottom":"1px solid var(--border)","background":"#f8fafc"}}>
          <td style={{"padding":"13px 18px","color":"#0f172a","fontWeight":"600"}}>GEO/AEO — AI search optimization</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a","fontWeight":"700"}}>✓ Core service</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Rarely offered</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Very rare</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Hard to build</td>
        </tr>
        <tr style={{"borderBottom":"1px solid var(--border)"}}>
          <td style={{"padding":"13px 18px","color":"#0f172a","fontWeight":"600"}}>Africa market expertise</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a","fontWeight":"700"}}>✓ 15 countries</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Generic coverage</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Very rare</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Not scalable</td>
        </tr>
        <tr style={{"borderBottom":"1px solid var(--border)","background":"#f8fafc"}}>
          <td style={{"padding":"13px 18px","color":"#0f172a","fontWeight":"600"}}>No long-term contracts</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a","fontWeight":"700"}}>✓ Month-to-month</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ 6–12 month lock-in</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a"}}>✓ Flexible</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Employment contract</td>
        </tr>
        <tr style={{"borderBottom":"1px solid var(--border)"}}>
          <td style={{"padding":"13px 18px","color":"#0f172a","fontWeight":"600"}}>50+ services under one roof</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a","fontWeight":"700"}}>✓ Full-service</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#f59e0b"}}>~ Limited scope</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ 1–3 skills only</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Expensive to staff</td>
        </tr>
        <tr style={{"borderBottom":"1px solid var(--border)","background":"#f8fafc"}}>
          <td style={{"padding":"13px 18px","color":"#0f172a","fontWeight":"600"}}>Niche services (games, courses, music)</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a","fontWeight":"700"}}>✓ Specialist teams</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Not offered</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#f59e0b"}}>~ Rare specialists</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Not feasible</td>
        </tr>
        <tr style={{"borderBottom":"1px solid var(--border)"}}>
          <td style={{"padding":"13px 18px","color":"#0f172a","fontWeight":"600"}}>Revenue-tied reporting (not vanity metrics)</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a","fontWeight":"700"}}>✓ Always</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#f59e0b"}}>~ Varies widely</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#f59e0b"}}>~ Depends</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#f59e0b"}}>~ Internal only</td>
        </tr>
        <tr style={{"background":"#f8fafc"}}>
          <td style={{"padding":"13px 18px","color":"#0f172a","fontWeight":"600"}}>Results within 90 days</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a","fontWeight":"700"}}>✓ Committed</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ 6–12 months typical</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#f59e0b"}}>~ Varies</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Slow ramp-up</td>
        </tr>
        <tr style={{"background":"#f0fdf4"}}>
          <td style={{"padding":"13px 18px","color":"#0f172a","fontWeight":"600"}}>In-house tech: websites, apps &amp; AI systems</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#16a34a","fontWeight":"700"}}>✓ In-house team</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Outsourced or N/A</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Not offered</td>
          <td style={{"padding":"13px 18px","textAlign":"center","color":"#dc2626"}}>✗ Cost-prohibitive</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style={{"marginTop":"32px","textAlign":"center","padding":"32px 24px","background":"#f8fafc","borderRadius":"12px","border":"1.5px solid var(--border)"}}>
    <div style={{"fontSize":"12px","fontWeight":"700","letterSpacing":".08em","color":"var(--ac1)","textTransform":"uppercase","marginBottom":"10px"}}>Ready to grow?</div>
    <p style={{"fontSize":"18px","fontWeight":"700","color":"#0f172a","marginBottom":"8px"}}>One team for marketing strategy and the technology that delivers it.</p>
    <p style={{"fontSize":"14px","color":"#64748b","marginBottom":"20px"}}>SEO, paid ads, web development, AI chatbots, apps and automation — no lock-in contracts.</p>
    <button className="btn-fill" onClick={() => openModal('rfp')}>Work With Us</button>
  </div>
</div>

{/*  RESULTS — Social proof with strong commercial signals  */}
<div className="s-white">
  <div className="sec-tag">CLIENT RESULTS</div>
  <h2 className="sec-h2">Real brands. Real revenue. Real numbers.</h2>
  <div className="aln"></div>
  <div className="rg">
    <div className="rc">
      <div className="rc-cl">E-Commerce / Retail — SEO Campaign</div>
      <div className="rc-st">+2,068%</div>
      <div className="rc-d">Increase in direct sales from organic search after a holistic SEO strategy — content, technical and off-page combined. Achieved within 12 months of engagement.</div>
      <button className="rc-lk" onClick={() => router.push('/work')}>Read full case study →</button>
    </div>
    <div className="rc">
      <div className="rc-cl">SaaS / Technology — Organic Growth</div>
      <div className="rc-st">+259%</div>
      <div className="rc-d">Total organic conversions after improving on-site relevancy, off-site authority and technical page health. Competitor traffic captured within 6 months.</div>
      <button className="rc-lk" onClick={() => router.push('/work')}>Read full case study →</button>
    </div>
    <div className="rc">
      <div className="rc-cl">Finance / Fintech — Product Launch</div>
      <div className="rc-st">+120%</div>
      <div className="rc-d">Organic search became the primary driver of traffic and funded accounts for a brand new product — powered by targeted content clusters and off-site trust building.</div>
      <button className="rc-lk" onClick={() => router.push('/work')}>Read full case study →</button>
    </div>
    <div className="rc">
      <div className="rc-cl">Media / Publishing — SEO & Content</div>
      <div className="rc-st">+91%</div>
      <div className="rc-d">Page views delivered in a single calendar year through integrated SEO and content strategy — a 91% increase delivered ahead of schedule and under budget.</div>
      <button className="rc-lk" onClick={() => router.push('/work')}>Read full case study →</button>
    </div>
  </div>
</div>

{/*  INDUSTRIES WE SERVE — Buyer intent targeting  */}
<div className="s-gray">
  <div className="sec-tag">INDUSTRIES WE SERVE</div>
  <h2 className="sec-h2">Deep expertise across every major industry.</h2>
  <div className="aln"></div>
  <p className="sec-sub" style={{"marginBottom":"0"}}>We've driven growth for businesses across every sector — from enterprise SaaS to local service businesses, from gaming studios to healthcare providers.</p>
  <div className="industry-grid">
    <div className="ind-card" onClick={() => router.push('/industries/saas')} style={{"cursor":"pointer"}}><div className="ind-ico">💻</div><div className="ind-name">SaaS & Technology</div><div className="ind-desc">Demand gen, product-led SEO, developer marketing</div></div>
    <div className="ind-card" onClick={() => router.push('/industries/ecommerce')} style={{"cursor":"pointer"}}><div className="ind-ico">🛒</div><div className="ind-name">E-Commerce & Retail</div><div className="ind-desc">Product SEO, shopping ads, conversion optimization</div></div>
    <div className="ind-card" onClick={() => router.push('/industries/healthcare')} style={{"cursor":"pointer"}}><div className="ind-ico">🏥</div><div className="ind-name">Healthcare & Medical</div><div className="ind-desc">HIPAA-aware marketing, local SEO, patient acquisition</div></div>
    <div className="ind-card" onClick={() => router.push('/industries/law-firms')} style={{"cursor":"pointer"}}><div className="ind-ico">⚖️</div><div className="ind-name">Legal & Professional</div><div className="ind-desc">Attorney marketing, local SEO, lead generation</div></div>
    <div className="ind-card" onClick={() => router.push('/industries/real-estate')} style={{"cursor":"pointer"}}><div className="ind-ico">🏠</div><div className="ind-name">Real Estate</div><div className="ind-desc">Local SEO, PPC, property listing optimization</div></div>
    <div className="ind-card"><div className="ind-ico">💰</div><div className="ind-name">Finance & Fintech</div><div className="ind-desc">Regulated content, YMYL SEO, paid acquisition</div></div>
    <div className="ind-card" onClick={() => router.push('/industries/education')} style={{"cursor":"pointer"}}><div className="ind-ico">🎓</div><div className="ind-name">Education & Courses</div><div className="ind-desc">Student acquisition, Udemy SEO, YouTube marketing</div></div>
    <div className="ind-card" onClick={() => router.push('/industries/gaming')} style={{"cursor":"pointer"}}><div className="ind-ico">🎮</div><div className="ind-name">Gaming & Entertainment</div><div className="ind-desc">Steam marketing, game launch, influencer seeding</div></div>
    <div className="ind-card"><div className="ind-ico">🍽️</div><div className="ind-name">Food & Hospitality</div><div className="ind-desc">Local SEO, reputation management, social media</div></div>
    <div className="ind-card" onClick={() => router.push('/contact')} style={{"cursor":"pointer"}}><div className="ind-ico">🔧</div><div className="ind-name">Home Services</div><div className="ind-desc">Local SEO, Google Maps, lead generation campaigns</div></div>
    <div className="ind-card"><div className="ind-ico">🎵</div><div className="ind-name">Music & Entertainment</div><div className="ind-desc">Streaming strategy, playlist promotion, social growth</div></div>
    <div className="ind-card" onClick={() => router.push('/services')} style={{"cursor":"pointer"}}><div className="ind-ico">🌍</div><div className="ind-name">Africa Market</div><div className="ind-desc">Pan-African SEO, WhatsApp marketing, local data</div></div>
  </div>
</div>

{/*  HOW WE WORK — Process CRO section  */}
<div className="s-dark">
  <div className="sec-tag wh">OUR PROCESS</div>
  <h2 className="sec-h2 wh">From strategy to results — in 4 clear steps.</h2>
  <div className="aln wh"></div>
  <p className="sec-sub wh" style={{"marginBottom":"40px"}}>No jargon. No guesswork. A clear, accountable process that moves your business forward from week one.</p>
  <div className="process-grid">
    <div className="proc-step">
      <div className="proc-num">1</div>
      <div className="proc-title">Discovery & Audit</div>
      <div className="proc-desc">Free strategy session. We audit your current marketing, competitors and growth opportunities — then build a custom roadmap.</div>
    </div>
    <div className="proc-step">
      <div className="proc-num">2</div>
      <div className="proc-title">Custom Growth Plan</div>
      <div className="proc-desc">A tailored 90-day plan with clear KPIs, channel recommendations and revenue projections — delivered within 12 hours.</div>
    </div>
    <div className="proc-step">
      <div className="proc-num">3</div>
      <div className="proc-title">Execute & Optimise</div>
      <div className="proc-desc">Our specialists execute the plan with weekly optimisation cycles — no set-and-forget. Every decision is data-driven.</div>
    </div>
    <div className="proc-step">
      <div className="proc-num">4</div>
      <div className="proc-title">Report & Scale</div>
      <div className="proc-desc">Monthly reports tied to revenue, not vanity metrics. We identify what\'s working, double down and scale what drives ROI.</div>
    </div>
  </div>
</div>

{/*  HOMEPAGE FAQ — Schema-optimized, objection-handling  */}
<div className="s-white">
  <div className="sec-tag">FREQUENTLY ASKED QUESTIONS</div>
  <h2 className="sec-h2">Common questions about hiring a digital marketing agency.</h2>
  <div className="aln"></div>
  <div className="faq-wrap">
    
    <div className="faq-item" key={0}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
        <span>How much does digital marketing cost?</span>
        <span>{openFaq === 0 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 0 ? 'open' : ''}`}>
        Digital marketing costs vary significantly based on services, channels and business size. Most small-to-medium businesses invest between $1,500 and $10,000 per month for a full-service digital marketing engagement. Specific services like SEO typically range from $1,000–$5,000/month, PPC management from $500–$3,000/month, and social media management from $800–$3,000/month. At Amplipath we offer transparent, performance-based pricing with no lock-in contracts. Book a free strategy session for a custom quote based on your specific goals and budget.
      </div>
    </div>
    
    <div className="faq-item" key={1}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
        <span>How long does it take to see results from SEO?</span>
        <span>{openFaq === 1 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 1 ? 'open' : ''}`}>
        Most businesses see measurable SEO improvements within 3–6 months. Competitive industries may take 6–12 months for significant ranking gains. However, our 90-day rapid growth framework typically delivers measurable improvements in organic traffic, rankings and lead quality within the first quarter. We set honest, specific timelines based on your market and competition during the initial strategy session — and we hold ourselves accountable to those timelines.
      </div>
    </div>
    
    <div className="faq-item" key={2}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
        <span>What is GEO/AEO and why does my business need it?</span>
        <span>{openFaq === 2 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 2 ? 'open' : ''}`}>
        GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) ensure your brand appears in AI-generated search results from ChatGPT, Gemini, Perplexity and Google AI Overviews. In 2026, AI tools handle millions of daily searches that never result in a traditional Google click. Businesses not optimizing for AI search are already losing visibility to competitors who are. Amplipath is one of the first agencies globally to offer structured GEO/AEO services — making this a significant competitive advantage for our clients.
      </div>
    </div>
    
    <div className="faq-item" key={3}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}>
        <span>Do you work with small businesses and startups?</span>
        <span>{openFaq === 3 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 3 ? 'open' : ''}`}>
        Yes — we work with businesses at every stage, from early-stage startups to enterprise companies. We have services and engagement models designed for every budget. A startup with $1,500/month can engage us for focused SEO or social media work. An enterprise with $50,000+/month can engage us as a full-service agency partner. Every client receives the same quality of strategy and execution — we don\'t assign junior staff to smaller accounts.
      </div>
    </div>
    
    <div className="faq-item" key={4}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}>
        <span>What makes Amplipath different from other marketing agencies?</span>
        <span>{openFaq === 4 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 4 ? 'open' : ''}`}>
        Three things differentiate Amplipath: (1) GEO/AEO leadership — we\'re one of the only agencies globally offering structured AI search optimization. (2) Africa market expertise — we\'re the first premium global agency with real local data and dedicated teams for 15 African countries. (3) Niche services — game marketing, Steam campaigns, Udemy course promotion, music promotion and more — services most agencies simply don\'t offer. All backed by transparent monthly reporting, no lock-in contracts and a 90-day results commitment.
      </div>
    </div>
    
    <div className="faq-item" key={5}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}>
        <span>Do you offer a free consultation or audit?</span>
        <span>{openFaq === 5 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 5 ? 'open' : ''}`}>
        Yes — we offer a free strategy session for every new prospective client. In this session, our team reviews your website, current marketing performance and key competitors, then identifies your biggest growth opportunities. We also offer a free website SEO audit for businesses that want a detailed technical review before committing to a full engagement. Book your free session using the 'Let's talk!' button anywhere on our website.
      </div>
    </div>
    
    <div className="faq-item" key={6}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}>
        <span>How is GEO/AEO different from traditional SEO?</span>
        <span>{openFaq === 6 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 6 ? 'open' : ''}`}>
        Traditional SEO targets Google's ten blue links. GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) target the direct answers given by ChatGPT, Google AI Overviews, Perplexity and Gemini. The optimization techniques differ — AI engines favor clearly structured, directly-answerable content with strong entity signals, rather than keyword density. Amplipath runs both as complementary strategies since most buyers now research across both traditional search and AI chat interfaces.
      </div>
    </div>
    
    <div className="faq-item" key={7}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 7 ? null : 7)}>
        <span>Can you show me if my brand currently appears in ChatGPT or Google AI answers?</span>
        <span>{openFaq === 7 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 7 ? 'open' : ''}`}>
        Yes — an AI search visibility check is part of every free audit we run. We test how your brand, products and key topics currently appear (or fail to appear) across ChatGPT, Google AI Overviews, Perplexity and Gemini, then build a roadmap to improve that visibility through structured content, schema markup and entity optimization.
      </div>
    </div>
    
    <div className="faq-item" key={8}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 8 ? null : 8)}>
        <span>Is Amplipath a real company or just a website?</span>
        <span>{openFaq === 8 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 8 ? 'open' : ''}`}>
        Amplipath is a fully operational digital marketing and technology agency with offices in Ondo, Nigeria (our primary physical office) and a virtual presence in Tallahassee, Florida, United States. We work with businesses worldwide on a month-to-month basis with no lock-in contracts — book a free strategy session to speak directly with our team.
      </div>
    </div>
    
    <div className="faq-item" key={9}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 9 ? null : 9)}>
        <span>What services can I hire Amplipath for without a long-term contract?</span>
        <span>{openFaq === 9 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 9 ? 'open' : ''}`}>
        All of them. Every service we offer — including SEO, GEO/AEO, paid advertising, social media management, web development, content marketing, email automation and Africa market services — is available on a flexible month-to-month basis. You can scale up, scale down or pause at any time with 30 days notice.
      </div>
    </div>
    
    <div className="faq-item" key={10}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 10 ? null : 10)}>
        <span>Does Amplipath only do marketing, or do you also build websites and apps?</span>
        <span>{openFaq === 10 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 10 ? 'open' : ''}`}>
        Amplipath is both a digital marketing agency and a technology company. Alongside SEO, GEO/AEO and paid advertising, our in-house team builds websites, e-commerce stores, mobile apps, AI chatbots and custom AI systems — using the same platforms a dedicated development agency would use: React, Flutter, Firebase, OpenAI, Claude and Gemini APIs. Most clients use us for both: the marketing strategy and the technology that makes it convert.
      </div>
    </div>
    
    <div className="faq-item" key={11}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 11 ? null : 11)}>
        <span>Is Amplipath a digital marketing agency or a technology company?</span>
        <span>{openFaq === 11 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 11 ? 'open' : ''}`}>
        Amplipath is both. We are a full-service marketing and technology agency that helps businesses attract customers through SEO, GEO/AEO, paid ads, social media and content — then convert that traffic using websites, apps, AI chatbots, automation and analytics systems. One team for strategy, traffic and the technology that converts it.
      </div>
    </div>
  </div>
</div>


    </div>
  );
}
