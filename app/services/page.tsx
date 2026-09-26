'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

export default function ServicesPage() {
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <div className="pg on" id="pg-solutions">
      <div className="hero">
  <div className="hero-bar"></div>
  <div className="h-tag"><div className="h-dot"></div>SERVICES</div>
  <h1 className="h-h1" style={{"fontSize":"40px"}}>Marketing strategy and technology services — built to grow your business.</h1>
  <p className="h-sub">Amplipath combines deep marketing expertise — SEO, GEO/AEO, paid ads, social media, content — with the technology capabilities to build whatever the strategy requires: websites, apps, AI chatbots and automation systems. One team. No handoffs. No outsourcing.</p>
</div>
<div style={{"background":"#fff","padding":"48px 40px","borderBottom":"1px solid var(--border)"}}>
  <div className="sec-tag">OUR SOLUTIONS</div>
  <h2 className="sec-h2">End-to-end marketing and technology services.</h2>
  <div className="aln"></div>
  <p style={{"fontSize":"14px","color":"#475569","lineHeight":"1.8","maxWidth":"620px","marginBottom":"36px"}}>Our capabilities span the full growth funnel — from attracting traffic through search and paid channels to converting it through websites, apps and AI systems built in-house. Strategy and technology under one roof, across every market.</p>
  <div className="sec-tag" style={{"marginBottom":"14px"}}>8 SERVICE CATEGORIES</div>
  <div className="cat-grid">
    <div className="cat-card" onClick={() => router.push('/services/search-seo')}>
      <div className="cat-ico-wrap" style={{"background":"#E8F0FE","color":"#1A56DB"}}>🔍</div>
      <div className="cat-name">Search &amp; GEO/AEO</div>
      <div className="cat-count-row"><span className="cat-count">11 services</span></div>
      <div className="cat-desc">From first-page Google rankings to AI-generated citations in ChatGPT and Gemini — our search team covers every channel where your audience looks for answers.</div>
      <div className="cat-tags">
        <span className="cat-tag-pill">SEO</span>
        <span className="cat-tag-pill">GEO/AEO</span>
        <span className="cat-tag-pill">Local SEO</span>
        <span className="cat-tag-pill">Technical SEO</span>
        <span className="cat-tag-pill">Google Business Profile</span>
        <span className="cat-tag-pill">Amazon SEO</span>
      </div>
      <div className="cat-arrow">Explore Search &amp; GEO/AEO <span>→</span></div>
    </div>
    <div className="cat-card" onClick={() => router.push('/services/paid-ads')}>
      <div className="cat-ico-wrap" style={{"background":"#F3E8FF","color":"#7C3AED"}}>💰</div>
      <div className="cat-name">Social Media &amp; Paid Ads</div>
      <div className="cat-count-row"><span className="cat-count">13 services</span></div>
      <div className="cat-desc">Full-funnel social and paid advertising across Meta, TikTok, YouTube, Reddit, LinkedIn, Pinterest and beyond — managed by certified platform specialists with transparent monthly reporting.</div>
      <div className="cat-tags">
        <span className="cat-tag-pill">Meta Ads</span>
        <span className="cat-tag-pill">TikTok Ads</span>
        <span className="cat-tag-pill">YouTube Ads</span>
        <span className="cat-tag-pill">LinkedIn Ads</span>
        <span className="cat-tag-pill">Reddit Ads</span>
        <span className="cat-tag-pill">Pinterest</span>
      </div>
      <div className="cat-arrow">Explore Social Media &amp; Paid Ads <span>→</span></div>
    </div>
    <div className="cat-card" onClick={() => router.push('/ai')}>
      <div className="cat-ico-wrap" style={{"background":"#FEF3C7","color":"#d97706"}}>🤖</div>
      <div className="cat-name">AI Marketing</div>
      <div className="cat-count-row"><span className="cat-count">6 services</span></div>
      <div className="cat-desc">AI-powered strategies, systems and automation that multiply the output of your marketing team — from campaign management to content personalization and CRM automation at scale.</div>
      <div className="cat-tags">
        <span className="cat-tag-pill">AI Campaigns</span>
        <span className="cat-tag-pill">Prompt Strategy</span>
        <span className="cat-tag-pill">AI Ad Bidding</span>
        <span className="cat-tag-pill">Email Personalization</span>
        <span className="cat-tag-pill">Brand AI</span>
        <span className="cat-tag-pill">CRM Automation</span>
      </div>
      <div className="cat-arrow">Explore AI Marketing <span>→</span></div>
    </div>
    <div className="cat-card" onClick={() => router.push('/services/website-copywriting')}>
      <div className="cat-ico-wrap" style={{"background":"#DCFCE7","color":"#15803d"}}>✍️</div>
      <div className="cat-name">Content, Email &amp; PR</div>
      <div className="cat-count-row"><span className="cat-count">11 services</span></div>
      <div className="cat-desc">Content strategy, email marketing, digital PR, copywriting and conversion optimization — the organic growth engines that compound in value over time and reduce dependence on paid traffic.</div>
      <div className="cat-tags">
        <span className="cat-tag-pill">Content Marketing</span>
        <span className="cat-tag-pill">Email Marketing</span>
        <span className="cat-tag-pill">Digital PR</span>
        <span className="cat-tag-pill">CRO</span>
        <span className="cat-tag-pill">Copywriting</span>
        <span className="cat-tag-pill">Brand Strategy</span>
        <span className="cat-tag-pill">Affiliate Marketing</span>
      </div>
      <div className="cat-arrow">Explore Content, Email &amp; PR <span>→</span></div>
    </div>
    <div className="cat-card" onClick={() => router.push('/services/niche-services')}>
      <div className="cat-ico-wrap" style={{"background":"#FEE2E2","color":"#b91c1c"}}>🎮</div>
      <div className="cat-name">Niche &amp; Growth</div>
      <div className="cat-count-row"><span className="cat-count">9 services</span></div>
      <div className="cat-desc">Game marketing, course promotion, music promotion, crypto marketing and more — highly specialized services that most agencies cannot execute. We have built the playbooks, the networks and the data.</div>
      <div className="cat-tags">
        <span className="cat-tag-pill">Game Marketing</span>
        <span className="cat-tag-pill">Steam</span>
        <span className="cat-tag-pill">Course Promotion</span>
        <span className="cat-tag-pill">Music Promotion</span>
        <span className="cat-tag-pill">Crypto Marketing</span>
        <span className="cat-tag-pill">App Marketing</span>
      </div>
      <div className="cat-arrow">Explore Niche &amp; Growth <span>→</span></div>
    </div>
    <div className="cat-card" onClick={() => router.push('/services/web-development')}>
      <div className="cat-ico-wrap" style={{"background":"#E2E8F0","color":"#0f172a"}}>💻</div>
      <div className="cat-name">Web &amp; AI Development</div>
      <div className="cat-count-row"><span className="cat-count">9 services</span></div>
      <div className="cat-desc">Business websites, e-commerce stores, landing pages, mobile apps, AI chatbots and custom automations — built using React, Flutter, Firebase and the same modern stack a dedicated dev shop would use. Engineered for conversion, speed and search from day one.</div>
      <div className="cat-tags">
        <span className="cat-tag-pill">Website Development</span>
        <span className="cat-tag-pill">E-Commerce</span>
        <span className="cat-tag-pill">AI Development</span>
        <span className="cat-tag-pill">Chatbots</span>
        <span className="cat-tag-pill">Mobile Apps</span>
      </div>
      <div className="cat-arrow">Explore Web &amp; AI Development <span>→</span></div>
    </div>
    <div className="cat-card" onClick={() => router.push('/services/website-copywriting')}>
      <div className="cat-ico-wrap" style={{"background":"#DBEAFE","color":"#1e40af"}}>📊</div>
      <div className="cat-name">Analytics &amp; Strategy</div>
      <div className="cat-count-row"><span className="cat-count">5 services</span></div>
      <div className="cat-desc">Web analytics, public relations, crowdfunding marketing, link building and custom dashboards — the strategic and measurement layer that ties all your channels together.</div>
      <div className="cat-tags">
        <span className="cat-tag-pill">Web Analytics</span>
        <span className="cat-tag-pill">Public Relations</span>
        <span className="cat-tag-pill">Crowdfunding</span>
        <span className="cat-tag-pill">Link Building</span>
      </div>
      <div className="cat-arrow">Explore Analytics &amp; Strategy <span>→</span></div>
    </div>
    <div className="cat-card" onClick={() => router.push('/services/africa-market')}>
      <div className="cat-ico-wrap" style={{"background":"#D1FAE5","color":"#166534"}}>🌍</div>
      <div className="cat-name">Africa Market Services</div>
      <div className="cat-count-row"><span className="cat-count">5 services</span></div>
      <div className="cat-desc">Dedicated infrastructure, real local market data and specialist teams for 15 African markets — from pan-African SEO to WhatsApp marketing and Jumia optimization.</div>
      <div className="cat-tags">
        <span className="cat-tag-pill">Pan-African SEO</span>
        <span className="cat-tag-pill">WhatsApp Marketing</span>
        <span className="cat-tag-pill">Influencer Marketing</span>
        <span className="cat-tag-pill">Jumia &amp; Konga</span>
      </div>
      <div className="cat-arrow">Explore Africa Market Services <span>→</span></div>
    </div>
  </div>
</div>

{/* ══ COMPLETE SERVICES DIRECTORY ══ */}
<div style={{ background: '#f8fafc', padding: '64px 40px', borderBottom: '1px solid var(--border)' }}>
  <div className="sec-tag">COMPREHENSIVE CATALOG</div>
  <h2 className="sec-h2">All services by category.</h2>
  <div className="aln"></div>
  <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: '1.8', maxWidth: '720px', marginBottom: '44px' }}>
    Every single capability we offer is built to operate as an integrated part of your larger growth system. Select any service below to view deliverables, metrics and execution frameworks.
  </p>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
    {/* 1. Search & GEO/AEO */}
    <div style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '20px' }}>🔍</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Search &amp; GEO/AEO</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/services/seo" className="mc-a hover:text-blue-600">SEO Optimization</Link>
        <Link href="/services/geo" className="mc-a hover:text-blue-600">GEO / AEO — AI Search</Link>
        <Link href="/services/localseo" className="mc-a hover:text-blue-600">Local SEO</Link>
        <Link href="/services/techseo" className="mc-a hover:text-blue-600">Technical SEO</Link>
        <Link href="/services/ecoseo" className="mc-a hover:text-blue-600">E-Commerce SEO</Link>
        <Link href="/services/videoseo" className="mc-a hover:text-blue-600">Video SEO</Link>
        <Link href="/services/sem" className="mc-a hover:text-blue-600">SEM &amp; Google Ads</Link>
        <Link href="/services/redditmarketing" className="mc-a hover:text-blue-600">Reddit Marketing &amp; SEO</Link>
        <Link href="/services/gbp" className="mc-a hover:text-blue-600">Google Business Profile</Link>
        <Link href="/services/amazonseo" className="mc-a hover:text-blue-600">Amazon SEO &amp; Marketplace</Link>
        <Link href="/services/pinterestseo" className="mc-a hover:text-blue-600">Pinterest SEO</Link>
      </div>
    </div>

    {/* 2. Social & Paid Ads */}
    <div style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '20px' }}>💰</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Social &amp; Paid Ads</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/services/smm" className="mc-a hover:text-blue-600">Social Media Marketing</Link>
        <Link href="/services/smmanage" className="mc-a hover:text-blue-600">Social Media Management</Link>
        <Link href="/services/socialcommerce" className="mc-a hover:text-blue-600">Social Commerce</Link>
        <Link href="/services/fbads" className="mc-a hover:text-blue-600">Facebook &amp; Instagram Ads</Link>
        <Link href="/services/tiktok" className="mc-a hover:text-blue-600">TikTok Ads &amp; Shop</Link>
        <Link href="/services/ytads" className="mc-a hover:text-blue-600">YouTube Ads</Link>
        <Link href="/services/influencer" className="mc-a hover:text-blue-600">Influencer Marketing</Link>
        <Link href="/services/display" className="mc-a hover:text-blue-600">Display Advertising</Link>
        <Link href="/services/linkedinads" className="mc-a hover:text-blue-600">LinkedIn Ads &amp; B2B Lead Gen</Link>
        <Link href="/services/quoraads" className="mc-a hover:text-blue-600">Quora Ads</Link>
        <Link href="/services/redditads" className="mc-a hover:text-blue-600">Reddit Ads</Link>
        <Link href="/services/amazonads" className="mc-a hover:text-blue-600">Amazon Ads Management</Link>
        <Link href="/services/pinterestbiz" className="mc-a hover:text-blue-600">Pinterest Business Optimization</Link>
      </div>
    </div>

    {/* 3. AI Marketing */}
    <div style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '20px' }}>🤖</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>AI Marketing</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/services/aiprompt" className="mc-a hover:text-blue-600">AI Marketing Prompt Strategy</Link>
        <Link href="/services/brandai" className="mc-a hover:text-blue-600">Brand Personality Design</Link>
        <Link href="/services/emailai" className="mc-a hover:text-blue-600">Email Marketing Personalization</Link>
        <Link href="/services/aicampaign" className="mc-a hover:text-blue-600">AI-Powered Campaign Mgmt</Link>
        <Link href="/services/aiads" className="mc-a hover:text-blue-600">AI-Powered Ad Bidding</Link>
      </div>
    </div>

    {/* 4. Content & Strategy */}
    <div style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '20px' }}>✍️</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Content &amp; Strategy</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/services/content" className="mc-a hover:text-blue-600">Content Marketing</Link>
        <Link href="/services/email" className="mc-a hover:text-blue-600">Email Marketing</Link>
        <Link href="/services/emailauto" className="mc-a hover:text-blue-600">Email Automations</Link>
        <Link href="/services/digitalpr" className="mc-a hover:text-blue-600">Digital PR</Link>
        <Link href="/services/strategy" className="mc-a hover:text-blue-600">Marketing Strategy &amp; Planning</Link>
        <Link href="/services/cro" className="mc-a hover:text-blue-600">Conversion Rate Optimization</Link>
        <Link href="/services/affiliate" className="mc-a hover:text-blue-600 font-semibold text-blue-600">Affiliate Marketing</Link>
        <Link href="/services/sms" className="mc-a hover:text-blue-600">Text Message Marketing</Link>
        <Link href="/services/copywriting" className="mc-a hover:text-blue-600">Conversion Copywriting</Link>
        <Link href="/services/crm" className="mc-a hover:text-blue-600 font-semibold text-blue-600">CRM Setup &amp; Marketing Automation</Link>
        <Link href="/services/marketinganalytics" className="mc-a hover:text-blue-600">Marketing Analytics &amp; Data Studio</Link>
      </div>
    </div>

    {/* 5. Niche & Growth */}
    <div style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '20px' }}>🎮</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Niche &amp; Growth</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/services/game" className="mc-a hover:text-blue-600">Game Marketing</Link>
        <Link href="/services/steam" className="mc-a hover:text-blue-600">Steam Marketing</Link>
        <Link href="/services/appmarketing" className="mc-a hover:text-blue-600">Mobile App Marketing</Link>
        <Link href="/services/course" className="mc-a hover:text-blue-600">Course Promotion</Link>
        <Link href="/services/music" className="mc-a hover:text-blue-600">Music Promotion</Link>
        <Link href="/services/podcast" className="mc-a hover:text-blue-600">Podcast Marketing</Link>
        <Link href="/services/book" className="mc-a hover:text-blue-600">Book &amp; eBook Marketing</Link>
        <Link href="/services/crypto" className="mc-a hover:text-blue-600">Cryptocurrency Marketing</Link>
        <Link href="/services/africa" className="mc-a hover:text-blue-600 flex items-center justify-between">
          <span>Africa Market Services</span>
          <span className="mc-af">AFRICA</span>
        </Link>
      </div>
    </div>

    {/* 6. Analytics & Strategy */}
    <div style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '20px' }}>📊</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Analytics &amp; Strategy</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/services/analytics" className="mc-a hover:text-blue-600">Web Analytics</Link>
        <Link href="/services/pr" className="mc-a hover:text-blue-600">Public Relations</Link>
        <Link href="/services/crowdfund" className="mc-a hover:text-blue-600 font-semibold text-blue-600">Crowdfunding Marketing</Link>
        <Link href="/services/guestpost" className="mc-a hover:text-blue-600 font-semibold text-blue-600">Guest Posting &amp; Link Building</Link>
        <Link href="/services/brandstrategy" className="mc-a hover:text-blue-600">Brand Strategy</Link>
      </div>
    </div>

    {/* 7. Web & Tech */}
    <div style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '20px' }}>💻</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Web &amp; Tech</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/services/webdev" className="mc-a hover:text-blue-600">Website Development</Link>
        <Link href="/services/ecomdev" className="mc-a hover:text-blue-600">E-Commerce Development</Link>
        <Link href="/services/customweb" className="mc-a hover:text-blue-600">Custom Websites</Link>
        <Link href="/services/landing" className="mc-a hover:text-blue-600">Landing Pages</Link>
        <Link href="/services/dropship" className="mc-a hover:text-blue-600">Dropshipping Websites</Link>
      </div>
    </div>

    {/* 8. AI Development */}
    <div style={{ background: '#fff', borderRadius: '12px', border: '1.5px solid var(--border)', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '20px' }}>⚡</span>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>AI Development</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/services/aidev" className="mc-a hover:text-blue-600">AI Development</Link>
        <Link href="/services/aiwebsoft" className="mc-a hover:text-blue-600">AI Websites &amp; Software</Link>
        <Link href="/services/aimobile" className="mc-a hover:text-blue-600">AI Mobile Apps</Link>
        <Link href="/services/aiintegrate" className="mc-a hover:text-blue-600">AI Integrations</Link>
        <Link href="/services/aiagents" className="mc-a hover:text-blue-600">AI Agents</Link>
        <Link href="/services/aiconsult" className="mc-a hover:text-blue-600 font-semibold text-blue-600">AI Technology Consulting</Link>
        <Link href="/services/chatbot" className="mc-a hover:text-blue-600">AI Chatbot Development</Link>
        <Link href="/services/mobileapp" className="mc-a hover:text-blue-600 font-semibold text-blue-600">Mobile App Development</Link>
      </div>
    </div>
  </div>
</div>

<div className="s-dark">
  <div className="sec-tag wh">DELIVERY MODEL</div>
  <h2 className="sec-h2 wh">End-to-end digital marketing solutions.</h2>
  <div className="aln wh"></div>
  <p className="sec-sub wh" style={{"marginBottom":"36px"}}>Our creative capabilities differentiate our work throughout the funnel, across platforms, devices and channels — supported by robust paid media coverage to support reach and frequency.</p>
  <div className="sg">
    <div className="scard dark"><div className="sc-ico">🏆</div><div className="sc-n wh">Earned Media</div><div className="sc-d wh">SEO, content marketing, digital PR and GEO/AEO — building lasting visibility through owned and earned channels that compound in value over time.</div></div>
    <div className="scard dark"><div className="sc-ico">💎</div><div className="sc-n wh">Paid Media</div><div className="sc-d wh">Google Ads, Meta, TikTok, programmatic and display — maximizing reach and conversions through data-driven paid campaigns that scale with your growth.</div></div>
    <div className="scard dark"><div className="sc-ico">🧠</div><div className="sc-n wh">Technology & AI</div><div className="sc-d wh">Web development, AI systems, marketing automation and custom technology — building the digital infrastructure that makes every other channel perform better.</div></div>
  </div>
</div>
    </div>
  );
}
