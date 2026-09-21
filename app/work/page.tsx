'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

export default function WorkPage() {
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <div className="pg on" id="pg-work">
      <div className="hero">
  <div className="hero-bar"></div>
  <div className="h-tag"><div className="h-dot"></div>CLIENT RESULTS</div>
  <h1 className="h-h1" style={{"fontSize":"38px"}}>Digital marketing results that move the needle.</h1>
  <p className="h-sub">We measure success the way our clients do — in revenue, leads and market share. Here's what happens when strategy meets execution.</p>
  <div className="h-btns">
    <button className="btn-fill" onClick={() => openModal('rfp')}>Get Results Like These</button>
    <button className="btn-out" onClick={() => router.push('/contact')}>Speak With a Strategist</button>
  </div>
</div>
<div className="stats-strip">
  <div className="stat-box"><div className="stat-n">🌍</div><div className="stat-l">Global clients — every market</div></div>
  <div className="stat-box"><div className="stat-n">50+</div><div className="stat-l">Services under one roof</div></div>
  <div className="stat-box"><div className="stat-n">50+</div><div className="stat-l">Services delivered</div></div>
  <div className="stat-box"><div className="stat-n">30</div><div className="stat-l">Days to first results</div></div>
</div>
<div className="s-white">
  <div className="sec-tag">ENTERPRISE RESULTS</div>
  <h2 className="sec-h2">Enterprise clients. Proven outcomes.</h2>
  <div className="aln"></div>
  <div className="wg">
    <div className="wc"><div className="wc-thumb"><div className="wc-t">Finance</div></div><div className="wc-body"><div className="wc-cl">Finance / Auto Refinancing</div><div className="wc-tt">AI SEO & GEO/AEO Strategy</div><div className="wc-st">+2,012%</div><div className="wc-d">Referral traffic from ChatGPT and AI search via GEO/AEO optimization — content aligned with high-intent AI queries across all major LLMs.</div></div></div>
    <div className="wc"><div className="wc-thumb"><div className="wc-t">SaaS</div></div><div className="wc-body"><div className="wc-cl">Technology / SaaS Platform</div><div className="wc-tt">Full organic search overhaul</div><div className="wc-st">+259%</div><div className="wc-d">Total conversions from organic search through technical SEO remediation, content cluster strategy and off-page authority building over 8 months.</div></div></div>
    <div className="wc"><div className="wc-thumb"><div className="wc-t">FinTech</div></div><div className="wc-body"><div className="wc-cl">Finance / Fintech Startup</div><div className="wc-tt">New product launch SEO</div><div className="wc-st">+120%</div><div className="wc-d">Organic search became the primary driver of funded accounts for a brand new product — powered by targeted content clusters and digital PR.</div></div></div>
  </div>
</div>
<div className="s-gray">
  <div className="sec-tag">SMB & NICHE RESULTS</div>
  <h2 className="sec-h2">Results at every scale — not just enterprise.</h2>
  <div className="aln"></div>
  <div className="wg">
    <div className="wc"><div className="wc-thumb"><div className="wc-t">Gaming</div></div><div className="wc-body"><div className="wc-cl">Gaming / Indie Studio</div><div className="wc-tt">Steam launch campaign</div><div className="wc-st">50,000+</div><div className="wc-d">Wishlists before launch day via Steam SEO, Reddit community seeding, TikTok influencer campaigns and targeted Meta ads. Top 10 New Release on launch.</div></div></div>
    <div className="wc"><div className="wc-thumb"><div className="wc-t">Education</div></div><div className="wc-body"><div className="wc-cl">Education / Udemy Instructor</div><div className="wc-tt">Course promotion campaign</div><div className="wc-st">10,000+</div><div className="wc-d">Students enrolled in 90 days via YouTube SEO, targeted YouTube Ads, Udemy algorithm optimization and automated email marketing sequences.</div></div></div>
    <div className="wc"><div className="wc-thumb"><div className="wc-t">Africa</div></div><div className="wc-body"><div className="wc-cl">Retail / Nigeria</div><div className="wc-tt">WhatsApp + Local SEO</div><div className="wc-st">+329%</div><div className="wc-d">Sales increase combining WhatsApp Business catalogue marketing with Google Maps local SEO and Nigerian micro-influencer campaigns in one quarter.</div></div></div>
  </div>
  <div className="wg" style={{"marginTop":"14px"}}>
    <div className="wc"><div className="wc-thumb"><div className="wc-t">Media</div></div><div className="wc-body"><div className="wc-cl">Media / Publishing</div><div className="wc-tt">SEO & content strategy</div><div className="wc-st">+91%</div><div className="wc-d">Page views in one calendar year. Full content audit, cluster strategy and technical SEO — delivered ahead of timeline and under budget.</div></div></div>
    <div className="wc"><div className="wc-thumb"><div className="wc-t">E-Com</div></div><div className="wc-body"><div className="wc-cl">E-Commerce / Retail Brand</div><div className="wc-tt">Shopify rebuild + CRO</div><div className="wc-st">+87%</div><div className="wc-d">Conversion rate increase after full Shopify rebuild focusing on Core Web Vitals, mobile-first checkout and conversion rate optimization throughout.</div></div></div>
    <div className="wc"><div className="wc-thumb"><div className="wc-t">Music</div></div><div className="wc-body"><div className="wc-cl">Music / Independent Artist</div><div className="wc-tt">Spotify & social growth</div><div className="wc-st">250K+</div><div className="wc-d">Monthly Spotify listeners in 6 months via playlist placement strategy, TikTok content campaigns and targeted social ads across three markets.</div></div></div>
  </div>
</div>
<div className="s-dark">
  <div className="sec-tag wh">INDUSTRIES WE'VE GROWN</div>
  <h2 className="sec-h2 wh">We've driven results across every major sector.</h2>
  <div className="aln wh"></div>
  <div style={{"display":"grid","gridTemplateColumns":"repeat(4,1fr)","gap":"10px","marginTop":"8px"}}>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>💻 SaaS & Technology</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>🛒 E-Commerce</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>💰 Finance & Fintech</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>🏥 Healthcare</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>🎮 Gaming & Entertainment</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>🎓 Education & Courses</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>🌍 Africa Markets</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>⚖️ Legal & Professional</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>🏠 Real Estate</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>🎵 Music & Entertainment</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>📚 Publishing & Media</div>
    <div style={{"background":"rgba(255,255,255,0.05)","border":"1px solid rgba(255,255,255,0.08)","borderRadius":"8px","padding":"14px","fontSize":"13px","color":"rgba(255,255,255,0.7)","fontWeight":"600"}}>🔧 Home Services</div>
  </div>
</div>
    </div>
  );
}
