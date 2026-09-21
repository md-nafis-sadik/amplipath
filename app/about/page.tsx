'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

export default function AboutPage() {
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <div className="pg on" id="pg-about">
      <div className="hero">
  <div className="hero-bar"></div>
  <div className="h-tag"><div className="h-dot"></div>ABOUT AMPLIPATH</div>
  <h1 className="h-h1" style={{"fontSize":"38px"}}>Built by marketers, for businesses that demand real results.</h1>
  <p className="h-sub">We didn't build Amplipath to be another agency. We built it to be the agency we always wished existed — one that combines global execution standards with genuine local expertise, across every market that matters.</p>
</div>
<div className="s-white">
  <div className="sec-tag">OUR MISSION</div>
  <h2 className="sec-h2">Making world-class digital marketing accessible to every business — worldwide.</h2>
  <div className="aln"></div>
  <p className="sec-sub" style={{"maxWidth":"700px"}}>Most premium digital marketing agencies serve only US and European markets at enterprise price points. Amplipath was founded to change that — delivering the same calibre of strategy and execution to startups, SMBs and enterprises in every major global market, including Africa.</p>
  <p className="sec-sub" style={{"maxWidth":"700px","marginTop":"16px"}}>That's why Amplipath was built as both a marketing and technology agency from day one — because a growth plan is only as good as the website, app or system that has to deliver it.</p>
  <div className="vals" style={{"marginTop":"36px"}}>
    <div className="val"><div className="v-icon">💡</div><div className="v-title">Think big</div><div className="v-desc">We go deep on every channel and every market. Surface-level strategies produce surface-level results. We are channel specialists — not generalists who dabble in everything and excel at nothing.</div></div>
    <div className="val"><div className="v-icon">🎯</div><div className="v-title">Own it</div><div className="v-desc">Full accountability for our clients' results. Every campaign, every report, every recommendation — we own it completely. No excuses, no blaming external factors, no vanishing acts when results are slow.</div></div>
    <div className="val"><div className="v-icon">🚀</div><div className="v-title">Have fun</div><div className="v-desc">We combine data rigour with genuine creativity. Great marketing requires both. We bring energy and enthusiasm to every project — because we genuinely love building brands that people notice.</div></div>
  </div>
</div>
<div className="s-gray">
  <div className="sec-tag">BY THE NUMBERS</div>
  <h2 className="sec-h2">Global reach. Measurable impact.</h2>
  <div className="aln"></div>
  <div className="wstats">
    <div className="ws"><div className="ws-n">🌍</div><div className="ws-l">Global clients — every market</div></div>
    <div className="ws"><div className="ws-n">50+</div><div className="ws-l">Services delivered worldwide</div></div>
    <div className="ws"><div className="ws-n">Global</div><div className="ws-l">Distributed specialist team</div></div>
    <div className="ws"><div className="ws-n">15</div><div className="ws-l">African markets covered</div></div>
  </div>
  <div className="wstats" style={{"marginTop":"12px"}}>
    <div className="ws"><div className="ws-n">50+</div><div className="ws-l">Services offered</div></div>
    <div className="ws"><div className="ws-n">Month-to-month</div><div className="ws-l">No lock-in contracts</div></div>
    <div className="ws"><div className="ws-n">Revenue-first</div><div className="ws-l">We measure client revenue impact</div></div>
    <div className="ws"><div className="ws-n">30+</div><div className="ws-l">Days to first results</div></div>
  </div>
</div>
<div className="s-white">
  <div className="sec-tag">FOUNDER & STORY</div>
  <h2 className="sec-h2">Built by a marketer who believed every business deserves world-class marketing.</h2>
  <div className="aln"></div>
  <div style={{"display":"grid","gridTemplateColumns":"280px 1fr","gap":"40px","alignItems":"start","marginTop":"8px"}}>
    <div style={{"textAlign":"center"}}>
      <img src="/images/about_img_1.jpg" alt="Adebayo Ogungbemile — Founder & CEO, Amplipath" style={{"width":"220px","height":"220px","borderRadius":"50%","objectFit":"cover","objectPosition":"top","border":"4px solid var(--ac)","boxShadow":"0 8px 32px rgba(26,86,219,0.2)"}}/>
      <div style={{"marginTop":"14px"}}>
        <div style={{"fontSize":"15px","fontWeight":"700","color":"#0f172a"}}>Adebayo Ogungbemile</div>
        <div style={{"fontSize":"13px","color":"var(--ac)","fontWeight":"600","marginTop":"3px"}}>Founder & CEO</div>
        <a href="https://www.linkedin.com/in/adebayo-ogungbemile/" target="_blank" rel="noopener" style={{"display":"inline-flex","alignItems":"center","gap":"5px","marginTop":"10px","fontSize":"12px","color":"#0a66c2","fontWeight":"700","textDecoration":"none","border":"1.5px solid #0a66c2","borderRadius":"6px","padding":"5px 12px"}}>
          <span style={{"fontSize":"14px"}}>in</span> Connect on LinkedIn
        </a>
      </div>
    </div>
    <div>
      <p style={{"fontSize":"15px","color":"#475569","lineHeight":"1.85","marginBottom":"16px"}}>With over 10 years in the marketing industry, <strong>Adebayo Ogungbemile</strong> founded Amplipath with a singular conviction: that world-class digital marketing should not be reserved for enterprise companies with enterprise budgets.</p>
      <p style={{"fontSize":"15px","color":"#475569","lineHeight":"1.85","marginBottom":"16px"}}>Throughout his career, Adebayo saw the same pattern repeat — small and medium-sized businesses left behind by agencies that either charged too much, delivered too little, or lacked the specialist knowledge to drive genuine growth. He built Amplipath to be the agency he always wished existed for those businesses.</p>
      <p style={{"fontSize":"15px","color":"#475569","lineHeight":"1.85","marginBottom":"24px"}}>Today, Amplipath operates across the US, UK, Africa and worldwide — delivering specialist-level execution across 50+ digital marketing services, with particular expertise in the emerging disciplines that most agencies are only beginning to understand: GEO/AEO for AI search, Africa market marketing, and niche verticals like game marketing and course promotion.</p>
      <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>
        <div style={{"background":"var(--acl)","borderRadius":"10px","padding":"16px","borderLeft":"4px solid var(--ac)"}}>
          <div style={{"fontSize":"11px","fontWeight":"700","color":"var(--ac)","textTransform":"uppercase","letterSpacing":".08em","marginBottom":"6px"}}>Our Mission</div>
          <div style={{"fontSize":"13px","color":"#475569","lineHeight":"1.6"}}>To make world-class digital marketing accessible to every business — from local SMBs to global enterprises — with no lock-in contracts and full accountability for results.</div>
        </div>
        <div style={{"background":"#f8fafc","borderRadius":"10px","padding":"16px","borderLeft":"4px solid #64748b"}}>
          <div style={{"fontSize":"11px","fontWeight":"700","color":"#475569","textTransform":"uppercase","letterSpacing":".08em","marginBottom":"6px"}}>Our Vision</div>
          <div style={{"fontSize":"13px","color":"#475569","lineHeight":"1.6"}}>To be the most trusted global digital marketing agency for businesses in every market — including the 15+ African markets that the industry has historically underserved.</div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="s-dark">
  <div className="sec-tag wh">LEADERSHIP TEAM</div>
  <h2 className="sec-h2 wh">The specialists behind your growth.</h2>
  <div className="aln wh"></div>
  <p className="sec-sub wh" style={{"marginBottom":"32px"}}>Our leadership team brings together deep expertise across SEO, paid media, technology, content strategy and Africa markets.</p>
  <div className="team-grid">
    <div>
      <div className="tm-av" style={{"background":"var(--ac)","padding":"0","overflow":"hidden"}}><img src="/images/about_img_2.jpg" alt="Adebayo Ogungbemile" style={{"width":"100%","height":"100%","objectFit":"cover","objectPosition":"top","borderRadius":"50%"}}/></div>
      <div className="tm-n">Adebayo Ogungbemile</div>
      <div className="tm-r">Founder & Chief Executive Officer</div>
    </div>
    <div>
      <div className="tm-av" style={{"background":"#1e293b","border":"2px dashed #475569","color":"#64748b","fontSize":"18px"}}>👤</div>
      <div className="tm-n">Head of Growth</div>
      <div className="tm-r">Chief Growth Officer</div>
    </div>
    <div>
      <div className="tm-av" style={{"background":"#1e293b","border":"2px dashed #475569","color":"#64748b","fontSize":"18px"}}>👤</div>
      <div className="tm-n">SEO & GEO/AEO Director</div>
      <div className="tm-r">VP, Search & AI Optimization</div>
    </div>
    <div>
      <div className="tm-av" style={{"background":"#1e293b","border":"2px dashed #475569","color":"#64748b","fontSize":"18px"}}>👤</div>
      <div className="tm-n">Africa Market Lead</div>
      <div className="tm-r">Head of African Markets</div>
    </div>
  </div>
  <p style={{"fontSize":"12px","color":"#475569","textAlign":"center","marginTop":"24px"}}>Full team profiles and credentials — coming soon.</p>
</div>
<div className="s-white">
  <div className="sec-tag">GLOBAL OFFICES</div>
  <h2 className="sec-h2">Where in the world we work.</h2>
  <div className="aln"></div>
  <div style={{"display":"grid","gridTemplateColumns":"repeat(2,1fr)","gap":"16px","marginTop":"8px","maxWidth":"640px"}}>
    <div style={{"background":"var(--acl)","border":"2px solid var(--ac)","borderRadius":"10px","padding":"18px"}}>
      <div style={{"fontSize":"20px","marginBottom":"8px"}}>🇺🇸</div>
      <div style={{"fontSize":"14px","fontWeight":"700","color":"#0f172a"}}>United States — Virtual Office</div>
      <div style={{"fontSize":"12px","color":"#64748b","marginTop":"3px"}}>215 S Monroe St, Tallahassee,<br/>Florida 32301</div>
      <a href="https://maps.google.com/?q=215+S+Monroe+St+Tallahassee+FL+32301" target="_blank" rel="noopener" style={{"display":"inline-block","marginTop":"8px","fontSize":"11px","color":"var(--ac)","fontWeight":"700","textDecoration":"none"}}>📍 View on map →</a>
    </div>
    <div style={{"background":"var(--acl)","border":"2px solid var(--ac)","borderRadius":"10px","padding":"18px"}}>
      <div style={{"fontSize":"20px","marginBottom":"8px"}}>🇳🇬</div>
      <div style={{"fontSize":"14px","fontWeight":"700","color":"#0f172a"}}>Nigeria — Africa Office</div>
      <div style={{"fontSize":"12px","color":"#64748b","marginTop":"3px"}}>7 Igele Maroko St, Opp Ayadi Junction,<br/>Ondo, Ondo State</div>
      <a href="https://maps.google.com/?q=7+Igele+Maroko+St+Ondo+Ondo+State+Nigeria" target="_blank" rel="noopener" style={{"display":"inline-block","marginTop":"8px","fontSize":"11px","color":"var(--ac)","fontWeight":"700","textDecoration":"none"}}>📍 View on map →</a>
    </div>
    </div>
</div>
    </div>
  );
}
