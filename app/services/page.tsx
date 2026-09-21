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
