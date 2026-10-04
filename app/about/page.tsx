'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

export default function AboutPage() {
  const router = useRouter();
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pg on" id="pg-about">
      <div className="hero">
  <div className="hero-bar"></div>
  <div className="h-tag"><div className="h-dot"></div>ABOUT AMPLIPATH</div>
  <h1 className="h-h1" style={{"fontSize":"38px"}}>Built for businesses that demand connected, measurable growth.</h1>
  <p className="h-sub">Amplipath was created for businesses that need more than isolated services and disconnected providers. We bring marketing, technology, data and AI together around shared objectives—combining global execution standards with the market understanding required to help businesses reach, convert and serve their customers more effectively.</p>
</div>
<div className="s-white">
  <div className="sec-tag">OUR MISSION</div>
  <h2 className="sec-h2">Unifying marketing, technology and AI to amplify business growth.</h2>
  <div className="aln"></div>
  <p className="sec-sub" style={{"maxWidth":"700px"}}>Growth is strongest when strategy, customer acquisition, digital experiences, analytics and business operations support one another. We design integrated growth systems for startups, SMEs and established organizations across Africa and international markets.</p>
  <p className="sec-sub" style={{"maxWidth":"700px","marginTop":"16px"}}>From marketing campaigns and search visibility to websites, applications, analytics and AI automation, every solution is shaped around clear business priorities and measured against meaningful outcomes.</p>
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
    <div className="ws"><div className="ws-n">10+</div><div className="ws-l">Years industry experience</div></div>
    <div className="ws"><div className="ws-n">Month-to-month</div><div className="ws-l">No lock-in contracts</div></div>
    <div className="ws"><div className="ws-n">Revenue-first</div><div className="ws-l">We measure client revenue impact</div></div>
    <div className="ws"><div className="ws-n">30+</div><div className="ws-l">Days to first results</div></div>
  </div>
</div>
<div className="s-white">
  <div className="sec-tag">FOUNDER & STORY</div>
  <h2 className="sec-h2">Built from a belief that business growth should work as one connected system.</h2>
  <div className="aln"></div>
  <div style={{"display":"grid","gridTemplateColumns":"280px 1fr","gap":"40px","alignItems":"start","marginTop":"8px"}}>
    <div style={{"textAlign":"center"}}>
      <img src="/images/team/adebayo.png" alt="Adebayo Ogungbemile — Founder & CEO, Amplipath" style={{"width":"220px","height":"220px","borderRadius":"50%","objectFit":"cover","objectPosition":"top","border":"4px solid var(--ac)","boxShadow":"0 8px 32px rgba(26,86,219,0.2)"}}/>
      <div style={{"marginTop":"14px"}}>
        <div style={{"fontSize":"15px","fontWeight":"700","color":"#0f172a"}}>Adebayo Ogungbemile</div>
        <div style={{"fontSize":"13px","color":"var(--ac)","fontWeight":"600","marginTop":"3px"}}>Founder & CEO</div>
        <a href="https://www.linkedin.com/in/adebayo-ogungbemile/" target="_blank" rel="noopener" style={{"display":"inline-flex","alignItems":"center","gap":"5px","marginTop":"10px","fontSize":"12px","color":"#0a66c2","fontWeight":"700","textDecoration":"none","border":"1.5px solid #0a66c2","borderRadius":"6px","padding":"5px 12px"}}>
          <span style={{"fontSize":"14px"}}>in</span> Connect on LinkedIn
        </a>
      </div>
    </div>
    <div>
      <p style={{"fontSize":"15px","color":"#475569","lineHeight":"1.85","marginBottom":"16px"}}>With 10 years of experience in marketing and business growth, <strong>Adebayo Ogungbemile</strong> founded Amplipath with a singular conviction: that world-class marketing, technology and intelligent systems should not be reserved for large enterprises with enterprise budgets.</p>
      <p style={{"fontSize":"15px","color":"#475569","lineHeight":"1.85","marginBottom":"16px"}}>Throughout his career, Adebayo saw the same pattern repeat—startups and growing businesses forced to work with separate marketers, developers and technology providers, often resulting in disconnected strategies, inconsistent execution and limited accountability. He built Amplipath to bring these essential capabilities together through one integrated growth partner.</p>
      <p style={{"fontSize":"15px","color":"#475569","lineHeight":"1.85","marginBottom":"24px"}}>Today, Amplipath works with businesses globally, bringing strategy and execution together across digital marketing, website and software development, mobile app development, search and analytics, AI automation and intelligent business systems. By integrating these capabilities into one coordinated growth system, we help businesses attract customers, strengthen their digital infrastructure, streamline operations and turn growth opportunities into measurable performance.</p>
      <div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>
        <div style={{"background":"var(--acl)","borderRadius":"10px","padding":"16px","borderLeft":"4px solid var(--ac)"}}>
          <div style={{"fontSize":"11px","fontWeight":"700","color":"var(--ac)","textTransform":"uppercase","letterSpacing":".08em","marginBottom":"6px"}}>Our Mission</div>
          <div style={{"fontSize":"13px","color":"#475569","lineHeight":"1.6"}}>To amplify business growth by unifying marketing, technology and AI into integrated systems that turn potential into measurable performance.</div>
        </div>
        <div style={{"background":"#f8fafc","borderRadius":"10px","padding":"16px","borderLeft":"4px solid #64748b"}}>
          <div style={{"fontSize":"11px","fontWeight":"700","color":"#475569","textTransform":"uppercase","letterSpacing":".08em","marginBottom":"6px"}}>Our Vision</div>
          <div style={{"fontSize":"13px","color":"#475569","lineHeight":"1.6"}}>To become the global standard for integrated growth—where marketing, technology and AI work as one intelligent system.</div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="s-dark">
  <div className="sec-tag wh">LEADERSHIP TEAM</div>
  <h2 className="sec-h2 wh">The specialists behind your growth.</h2>
  <div className="aln wh"></div>
  <p className="sec-sub wh" style={{"marginBottom":"24px"}}>Our leadership team brings together deep expertise across SEO and web development, mobile and AI systems, and automation.</p>
  
  <div className="lt-grid">
    {/* Member 1: Adebayo Ogungbemile */}
    <div className="lt-card">
      <div className="lt-photo">
        <img src="/images/team/adebayo.png" alt="Adebayo Ogungbemile" />
      </div>
      <div className="lt-name">Adebayo Ogungbemile</div>
      <div className="lt-role">Founder &amp; Chief Executive Officer</div>
      <a
        className="lt-linkedin"
        href="https://www.linkedin.com/in/adebayo-ogungbemile/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Adebayo Ogungbemile on LinkedIn"
      >
        <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
      </a>
    </div>

    {/* Member 2: Nafis Sadik */}
    <div className="lt-card">
      <div className="lt-photo">
        <img src="/images/team/nafis.png" alt="Nafis Sadik" />
      </div>
      <div className="lt-name">Nafis Sadik</div>
      <div className="lt-role">SEO &amp; Web Development Lead</div>
      <a
        className="lt-linkedin"
        href="https://md-nafis-sadik.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nafis Sadik"
      >
        <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
      </a>
    </div>

    {/* Member 3: Raheel Wazir */}
    <div className="lt-card">
      <div className="lt-photo">
        <img src="/images/team/raheel.png" alt="Raheel Wazir" />
      </div>
      <div className="lt-name">Raheel Wazir</div>
      <div className="lt-role">AI Systems &amp; Full-Stack Software Developer</div>
      <a
        className="lt-linkedin"
        href="https://linkedin.com/in/rahil-wazir"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Raheel Wazir on LinkedIn"
      >
        <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
      </a>
    </div>

    {/* Member 4: Rana Fahad */}
    <div className="lt-card">
      <div className="lt-photo">
        <img src="/images/team/rana.png" alt="Rana Fahad" />
      </div>
      <div className="lt-name">Rana Fahad</div>
      <div className="lt-role">Mobile App Developer Lead</div>
      <a
        className="lt-linkedin"
        href="https://www.linkedin.com/company/amplipath"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Rana Fahad on LinkedIn"
      >
        <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
      </a>
    </div>

    {/* Member 5: Gouravdeep Singh */}
    <div className="lt-card">
      <div className="lt-photo">
        <img src="/images/team/gouravdeep.png" alt="Gouravdeep Singh" />
      </div>
      <div className="lt-name">Gouravdeep Singh</div>
      <div className="lt-role">Mobile App Developer</div>
      <a
        className="lt-linkedin"
        href="https://www.linkedin.com/in/gouravdeepsingh/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Gouravdeep Singh on LinkedIn"
      >
        <svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
      </a>
    </div>
  </div>
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

{/* ══ ABOUT PAGE FAQS ══ */}
<div className="s-gray" id="faq">
  <div className="sec-tag">FREQUENTLY ASKED QUESTIONS</div>
  <h2 className="sec-h2">Frequently asked questions about Amplipath.</h2>
  <div className="aln"></div>
  <p className="sec-sub">Learn how Amplipath works, what makes us different and what to expect when working with us.</p>

  <div className="faq-wrap">
    {[
      {
        q: "What makes Amplipath different from other digital marketing agencies?",
        a: "Amplipath unifies marketing, technology, data and AI under one growth strategy. This means the team attracting traffic can also improve the website or app, connect analytics, automate follow-up and optimize conversion. Clients receive coordinated execution and reporting around business outcomes instead of disconnected campaigns, isolated deliverables or channel metrics that do not show their effect on growth."
      },
      {
        q: "What does “integrated growth” mean at Amplipath?",
        a: "Integrated growth means connecting marketing, technology, data and AI around the same business objectives. Instead of running advertising, websites, search, analytics and automation as disconnected activities, we design them to work together as one measurable system for attracting customers, improving conversions and supporting business operations."
      },
      {
        q: "Is Amplipath a registered business?",
        a: "Yes. Amplipath is registered in Nigeria with the Corporate Affairs Commission, or CAC, under registration number 9842325."
      },
      {
        q: "Does Amplipath offer one-time projects and ongoing monthly services?",
        a: "Yes. Fixed-scope engagements can include audits, strategies, websites, sales funnels, apps and automation systems. Services such as SEO, GEO/AEO, paid media, content, analytics and conversion optimization normally benefit from ongoing engagement because they require testing and refinement. A long-term contract is not automatically assumed; the duration, milestones, renewal conditions and exit terms are explained in the proposal."
      },
      {
        q: "How does Amplipath decide which services our business actually needs?",
        a: "We begin by understanding your goals, customers, current performance, digital assets, technology, budget and operational challenges. We then identify the most important growth barriers and recommend a prioritised combination of services. We do not assume that every client needs every service we offer."
      },
      {
        q: "Can Amplipath work with our internal team, developers or existing agencies?",
        a: "Yes. We can work as your primary growth partner or collaborate with your existing marketing, sales, creative, development or technology teams. We define responsibilities, access requirements, approval processes and performance expectations at the beginning so every team understands its role and duplicated work is avoided."
      },
      {
        q: "Will our business own the accounts, data, website, code and digital assets created for us?",
        a: "We prefer important business assets—including domains, advertising accounts, analytics accounts and approved deliverables—to remain under the client’s ownership or client-controlled access. Any third-party software, licensed assets, reusable frameworks or pre-existing intellectual property will be identified in the proposal or agreement before work begins."
      },
      {
        q: "How does Amplipath use AI while maintaining human oversight and quality?",
        a: "We use AI to support research, analysis, content workflows, personalization, automation and operational efficiency. Human specialists remain responsible for strategy, quality assurance, brand accuracy, technical decisions and final client-facing outputs. We select AI tools according to the project’s needs rather than using automation where human judgement is more appropriate."
      }
    ].map((faq, idx) => {
      const isOpen = openFaq === idx;
      return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
          <button
            className="faq-q"
            type="button"
            onClick={() => setOpenFaq(isOpen ? null : idx)}
            aria-expanded={isOpen}
          >
            <span>{faq.q}</span>
            <span className="faq-plus">{isOpen ? '−' : '+'}</span>
          </button>
          {isOpen && (
            <div className="faq-a open">
              <div className="faq-a-inner">{faq.a}</div>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
    </div>
  );
}
