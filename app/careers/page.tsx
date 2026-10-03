'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

export default function CareersPage() {
  const router = useRouter();
  const { openModal } = useModal();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    role: 'SEO & GEO/AEO Specialist',
    portfolio: '',
    pitch: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          location: formData.location,
          role: formData.role,
          portfolio: formData.portfolio,
          pitch: formData.pitch
        })
      });
      if (!res.ok) throw new Error('Application submission failed. Please try again.');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pg on" id="pg-careers">
      {submitted ? (
        <div style={{ maxWidth: '600px', margin: '80px auto', padding: '40px', textAlign: 'center', background: '#f0fdf4', borderRadius: '16px', border: '1.5px solid #86efac' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#166534', marginBottom: '12px' }}>Application Received!</h2>
          <p style={{ fontSize: '15px', color: '#15803d', lineHeight: '1.6' }}>Thank you for applying to join Amplipath. Our talent team reviews all applications and will get in touch within 3 business days.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="hero">
  <div className="hero-bar"></div>
  <div className="h-tag"><div className="h-dot"></div>CAREERS AT AMPLIPATH</div>
  <h1 className="h-h1" style={{"fontSize":"38px"}}>Build the future of integrated growth — with us.</h1>
  <p className="h-sub">Amplipath is an early-stage integrated growth company combining digital marketing, technology and AI. We are building a global remote team of specialists who want to work on real client problems, grow alongside a company from the ground up, and be rewarded for the results they produce.</p>
</div>

<div className="s-white">
  <div className="sec-tag">BEFORE YOU APPLY</div>
  <h2 className="sec-h2">We are honest about where we are — and where we are going.</h2>
  <div className="aln"></div>
  <p className="sec-sub" style={{"maxWidth":"720px","marginBottom":"28px"}}>Amplipath is a startup. We are not going to pretend otherwise. What we offer right now is not a monthly salary — it is a project-based model where you are paid per deliverable, per campaign or per client engagement. This means your income depends on the work delivered and the results produced. The upside is real: as the company grows, so does the volume, the pay rate and the opportunity. If you want a guaranteed fixed salary on day one, we are not the right fit yet. If you want to build something meaningful from the ground up and be paid fairly for the work you actually do — read on.</p>
  <div style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit,minmax(220px,1fr))","gap":"16px","marginTop":"8px"}}>
    <div style={{"background":"#f0f7ff","borderRadius":"12px","padding":"20px 22px","border":"1.5px solid #dbeafe"}}>
      <div style={{"fontSize":"22px","marginBottom":"8px"}}>🌍</div>
      <div style={{"fontWeight":"700","color":"#0f172a","fontSize":"14px","marginBottom":"5px"}}>100% Remote</div>
      <div style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7"}}>Work from anywhere in the world. No relocation required. All collaboration happens online.</div>
    </div>
    <div style={{"background":"#f0f7ff","borderRadius":"12px","padding":"20px 22px","border":"1.5px solid #dbeafe"}}>
      <div style={{"fontSize":"22px","marginBottom":"8px"}}>💰</div>
      <div style={{"fontWeight":"700","color":"#0f172a","fontSize":"14px","marginBottom":"5px"}}>Project-Based Pay</div>
      <div style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7"}}>Paid per project, deliverable or campaign. Clear scope. Clear rate. No ambiguity about what you earn.</div>
    </div>
    <div style={{"background":"#f0f7ff","borderRadius":"12px","padding":"20px 22px","border":"1.5px solid #dbeafe"}}>
      <div style={{"fontSize":"22px","marginBottom":"8px"}}>📈</div>
      <div style={{"fontWeight":"700","color":"#0f172a","fontSize":"14px","marginBottom":"5px"}}>Real Growth Path</div>
      <div style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7"}}>Early contributors get priority for expanded roles, higher rates and leadership positions as the company scales.</div>
    </div>
    <div style={{"background":"#f0f7ff","borderRadius":"12px","padding":"20px 22px","border":"1.5px solid #dbeafe"}}>
      <div style={{"fontSize":"22px","marginBottom":"8px"}}>🔧</div>
      <div style={{"fontWeight":"700","color":"#0f172a","fontSize":"14px","marginBottom":"5px"}}>Real Client Work</div>
      <div style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7"}}>Work on actual campaigns and builds for real clients across multiple industries and markets worldwide.</div>
    </div>
  </div>
</div>

<div className="s-gray">
  <div className="sec-tag">OPEN POSITIONS</div>
  <h2 className="sec-h2">9 roles open worldwide — all project-based, all remote.</h2>
  <div className="aln"></div>
  <div style={{"display":"flex","flexDirection":"column","gap":"14px","marginTop":"16px"}}>

    {/*  Role 1  */}
    <div style={{"background":"#fff","borderRadius":"12px","border":"1.5px solid var(--border)","overflow":"hidden"}}>
      <div style={{"padding":"22px 24px","display":"flex","gap":"16px","alignItems":"flex-start","flexWrap":"wrap"}}>
        <div style={{"flex":"1","minWidth":"200px"}}>
          <div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"6px","flexWrap":"wrap"}}>
            <span style={{"fontWeight":"700","color":"#0f172a","fontSize":"16px"}}>Marketing Strategist</span>
            <span style={{"background":"#dbeafe","color":"#1e40af","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Strategy</span>
            <span style={{"background":"#f0fdf4","color":"#16a34a","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Remote · Worldwide</span>
          </div>
          <p style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7","margin":"0"}}>Build integrated marketing strategies for Amplipath clients across SEO, GEO/AEO, paid ads, social media and content. You will own the strategy layer — from initial audit and roadmap to monthly performance reviews. You should have deep knowledge of at least two marketing channels and a track record of building strategies that produced measurable results.</p>
        </div>
        <div style={{"flexShrink":"0","textAlign":"right","minWidth":"140px"}}>
          <div style={{"fontSize":"12px","color":"#94a3b8","marginBottom":"4px"}}>Compensation</div>
          <div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a"}}>Project-based</div>
          <div style={{"fontSize":"11px","color":"#64748b"}}>Per strategy deliverable</div>
        </div>
      </div>
    </div>

    {/*  Role 2  */}
    <div style={{"background":"#fff","borderRadius":"12px","border":"1.5px solid var(--border)","overflow":"hidden"}}>
      <div style={{"padding":"22px 24px","display":"flex","gap":"16px","alignItems":"flex-start","flexWrap":"wrap"}}>
        <div style={{"flex":"1","minWidth":"200px"}}>
          <div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"6px","flexWrap":"wrap"}}>
            <span style={{"fontWeight":"700","color":"#0f172a","fontSize":"16px"}}>Paid Ads Specialist</span>
            <span style={{"background":"#dbeafe","color":"#1e40af","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Paid Media</span>
            <span style={{"background":"#f0fdf4","color":"#16a34a","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Remote · Worldwide</span>
          </div>
          <p style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7","margin":"0"}}>Plan, launch and optimise paid advertising campaigns across Google Ads, Meta Ads (Facebook and Instagram), TikTok Ads and YouTube. You manage budgets, audiences, creatives and conversion tracking. Experience with African market audiences is a strong advantage. You must be able to show real ROAS or CPA results from previous campaigns.</p>
        </div>
        <div style={{"flexShrink":"0","textAlign":"right","minWidth":"140px"}}>
          <div style={{"fontSize":"12px","color":"#94a3b8","marginBottom":"4px"}}>Compensation</div>
          <div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a"}}>Project-based</div>
          <div style={{"fontSize":"11px","color":"#64748b"}}>Per campaign managed</div>
        </div>
      </div>
    </div>

    {/*  Role 3  */}
    <div style={{"background":"#fff","borderRadius":"12px","border":"1.5px solid var(--border)","overflow":"hidden"}}>
      <div style={{"padding":"22px 24px","display":"flex","gap":"16px","alignItems":"flex-start","flexWrap":"wrap"}}>
        <div style={{"flex":"1","minWidth":"200px"}}>
          <div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"6px","flexWrap":"wrap"}}>
            <span style={{"fontWeight":"700","color":"#0f172a","fontSize":"16px"}}>SEO &amp; GEO/AEO Specialist</span>
            <span style={{"background":"#dbeafe","color":"#1e40af","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>SEO</span>
            <span style={{"background":"#f0fdf4","color":"#16a34a","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Remote · Worldwide</span>
          </div>
          <p style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7","margin":"0"}}>Deliver SEO services including technical audits, content strategy, on-page optimisation, link building and GEO/AEO (Generative Engine Optimisation for ChatGPT, Gemini and Perplexity). You should understand how AI search works and have experience helping brands appear in AI-generated answers, not just traditional search results.</p>
        </div>
        <div style={{"flexShrink":"0","textAlign":"right","minWidth":"140px"}}>
          <div style={{"fontSize":"12px","color":"#94a3b8","marginBottom":"4px"}}>Compensation</div>
          <div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a"}}>Project-based</div>
          <div style={{"fontSize":"11px","color":"#64748b"}}>Per audit / per month</div>
        </div>
      </div>
    </div>

    {/*  Role 4  */}
    <div style={{"background":"#fff","borderRadius":"12px","border":"1.5px solid var(--border)","overflow":"hidden"}}>
      <div style={{"padding":"22px 24px","display":"flex","gap":"16px","alignItems":"flex-start","flexWrap":"wrap"}}>
        <div style={{"flex":"1","minWidth":"200px"}}>
          <div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"6px","flexWrap":"wrap"}}>
            <span style={{"fontWeight":"700","color":"#0f172a","fontSize":"16px"}}>Social Media Manager</span>
            <span style={{"background":"#dbeafe","color":"#1e40af","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Social</span>
            <span style={{"background":"#f0fdf4","color":"#16a34a","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Remote · Worldwide</span>
          </div>
          <p style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7","margin":"0"}}>Manage organic social media presence for Amplipath clients across Instagram, TikTok, LinkedIn, Facebook and X. You will handle content calendars, caption writing, community management and basic performance reporting. Knowledge of African social media behaviour and trends is a strong plus.</p>
        </div>
        <div style={{"flexShrink":"0","textAlign":"right","minWidth":"140px"}}>
          <div style={{"fontSize":"12px","color":"#94a3b8","marginBottom":"4px"}}>Compensation</div>
          <div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a"}}>Project-based</div>
          <div style={{"fontSize":"11px","color":"#64748b"}}>Per client / per month</div>
        </div>
      </div>
    </div>

    {/*  Role 5  */}
    <div style={{"background":"#fff","borderRadius":"12px","border":"1.5px solid var(--border)","overflow":"hidden"}}>
      <div style={{"padding":"22px 24px","display":"flex","gap":"16px","alignItems":"flex-start","flexWrap":"wrap"}}>
        <div style={{"flex":"1","minWidth":"200px"}}>
          <div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"6px","flexWrap":"wrap"}}>
            <span style={{"fontWeight":"700","color":"#0f172a","fontSize":"16px"}}>Frontend Developer</span>
            <span style={{"background":"#fef3c7","color":"#d97706","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Technology</span>
            <span style={{"background":"#f0fdf4","color":"#16a34a","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Remote · Worldwide</span>
          </div>
          <p style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7","margin":"0"}}>Build fast, responsive, conversion-focused websites and landing pages for Amplipath clients. Strong HTML, CSS and JavaScript required. Experience with React, Next.js or Vue is a plus. You should understand SEO-friendly markup, Core Web Vitals and mobile-first design. Portfolio of live websites required to apply.</p>
        </div>
        <div style={{"flexShrink":"0","textAlign":"right","minWidth":"140px"}}>
          <div style={{"fontSize":"12px","color":"#94a3b8","marginBottom":"4px"}}>Compensation</div>
          <div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a"}}>Project-based</div>
          <div style={{"fontSize":"11px","color":"#64748b"}}>Per website / project</div>
        </div>
      </div>
    </div>

    {/*  Role 6  */}
    <div style={{"background":"#fff","borderRadius":"12px","border":"1.5px solid var(--border)","overflow":"hidden"}}>
      <div style={{"padding":"22px 24px","display":"flex","gap":"16px","alignItems":"flex-start","flexWrap":"wrap"}}>
        <div style={{"flex":"1","minWidth":"200px"}}>
          <div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"6px","flexWrap":"wrap"}}>
            <span style={{"fontWeight":"700","color":"#0f172a","fontSize":"16px"}}>Full-Stack Software Developer</span>
            <span style={{"background":"#fef3c7","color":"#d97706","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Technology</span>
            <span style={{"background":"#f0fdf4","color":"#16a34a","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Remote · Worldwide</span>
          </div>
          <p style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7","margin":"0"}}>Build full-stack web applications, client portals, custom platforms, API integrations, ecommerce systems and internal tools. Proficient in both frontend (React, Next.js) and backend (Node.js, Python, Firebase or equivalent). Experience with database design, authentication and third-party API integration required.</p>
        </div>
        <div style={{"flexShrink":"0","textAlign":"right","minWidth":"140px"}}>
          <div style={{"fontSize":"12px","color":"#94a3b8","marginBottom":"4px"}}>Compensation</div>
          <div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a"}}>Project-based</div>
          <div style={{"fontSize":"11px","color":"#64748b"}}>Per project / milestone</div>
        </div>
      </div>
    </div>

    {/*  Role 7  */}
    <div style={{"background":"#fff","borderRadius":"12px","border":"1.5px solid var(--border)","overflow":"hidden"}}>
      <div style={{"padding":"22px 24px","display":"flex","gap":"16px","alignItems":"flex-start","flexWrap":"wrap"}}>
        <div style={{"flex":"1","minWidth":"200px"}}>
          <div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"6px","flexWrap":"wrap"}}>
            <span style={{"fontWeight":"700","color":"#0f172a","fontSize":"16px"}}>Mobile App Developer</span>
            <span style={{"background":"#fef3c7","color":"#d97706","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Technology</span>
            <span style={{"background":"#f0fdf4","color":"#16a34a","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Remote · Worldwide</span>
          </div>
          <p style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7","margin":"0"}}>Build mobile applications for Android and iOS using Flutter or React Native. Projects include client apps, marketplace platforms, booking systems, fintech tools and ecommerce mobile experiences. You should have at least two published apps on the Play Store or App Store, and be comfortable managing the full development-to-deployment lifecycle.</p>
        </div>
        <div style={{"flexShrink":"0","textAlign":"right","minWidth":"140px"}}>
          <div style={{"fontSize":"12px","color":"#94a3b8","marginBottom":"4px"}}>Compensation</div>
          <div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a"}}>Project-based</div>
          <div style={{"fontSize":"11px","color":"#64748b"}}>Per app / milestone</div>
        </div>
      </div>
    </div>

    {/*  Role 8  */}
    <div style={{"background":"#fff","borderRadius":"12px","border":"1.5px solid var(--border)","overflow":"hidden"}}>
      <div style={{"padding":"22px 24px","display":"flex","gap":"16px","alignItems":"flex-start","flexWrap":"wrap"}}>
        <div style={{"flex":"1","minWidth":"200px"}}>
          <div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"6px","flexWrap":"wrap"}}>
            <span style={{"fontWeight":"700","color":"#0f172a","fontSize":"16px"}}>AI Systems Developer</span>
            <span style={{"background":"#f3e8ff","color":"#7c3aed","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>AI</span>
            <span style={{"background":"#f0fdf4","color":"#16a34a","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Remote · Worldwide</span>
          </div>
          <p style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7","margin":"0"}}>Build AI-powered products and integrations for Amplipath clients: AI chatbots, automation pipelines, AI agents, lead qualification systems, WhatsApp AI automation, CRM AI integrations and custom LLM-powered tools. Experience with OpenAI, Anthropic Claude, Gemini or open-source LLMs required. Ability to work with APIs, prompt engineering and serverless functions essential.</p>
        </div>
        <div style={{"flexShrink":"0","textAlign":"right","minWidth":"140px"}}>
          <div style={{"fontSize":"12px","color":"#94a3b8","marginBottom":"4px"}}>Compensation</div>
          <div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a"}}>Project-based</div>
          <div style={{"fontSize":"11px","color":"#64748b"}}>Per system / project</div>
        </div>
      </div>
    </div>

    {/*  Role 9  */}
    <div style={{"background":"#fff","borderRadius":"12px","border":"1.5px solid var(--border)","overflow":"hidden"}}>
      <div style={{"padding":"22px 24px","display":"flex","gap":"16px","alignItems":"flex-start","flexWrap":"wrap"}}>
        <div style={{"flex":"1","minWidth":"200px"}}>
          <div style={{"display":"flex","gap":"8px","alignItems":"center","marginBottom":"6px","flexWrap":"wrap"}}>
            <span style={{"fontWeight":"700","color":"#0f172a","fontSize":"16px"}}>Content Writer &amp; Copywriter</span>
            <span style={{"background":"#dbeafe","color":"#1e40af","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Content</span>
            <span style={{"background":"#f0fdf4","color":"#16a34a","fontSize":"11px","fontWeight":"600","padding":"3px 10px","borderRadius":"20px"}}>Remote · Worldwide</span>
          </div>
          <p style={{"fontSize":"13px","color":"#475569","lineHeight":"1.7","margin":"0"}}>Write long-form SEO content, blog articles, landing page copy, email sequences, ad copy and social captions for Amplipath and its clients. You should understand SEO content principles, be able to write in multiple brand voices, and produce original content that drives real search traffic — not generic filler. Portfolio of published articles required.</p>
        </div>
        <div style={{"flexShrink":"0","textAlign":"right","minWidth":"140px"}}>
          <div style={{"fontSize":"12px","color":"#94a3b8","marginBottom":"4px"}}>Compensation</div>
          <div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a"}}>Project-based</div>
          <div style={{"fontSize":"11px","color":"#64748b"}}>Per article / per project</div>
        </div>
      </div>
    </div>

  </div>
</div>

{/*  Application Form  */}
<div className="s-white">
  <div style={{"display":"grid","gridTemplateColumns":"1fr 1.2fr","gap":"48px","alignItems":"start"}}>
    <div>
      <div className="sec-tag">APPLY NOW</div>
      <h2 className="sec-h2" style={{"fontSize":"28px"}}>Open to talent from any country.</h2>
      <div className="aln"></div>
      <p style={{"fontSize":"14px","color":"#475569","lineHeight":"1.8","marginBottom":"20px"}}>We review every application personally. We do not use automated screening. If your background and portfolio are relevant, you will hear back from us within 5 business days. If we are not hiring for your role at this moment, we will keep your application on file and reach out when the right project opens.</p>
      <div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
        <div style={{"display":"flex","gap":"10px","alignItems":"flex-start"}}><span style={{"color":"#1A56DB","fontWeight":"700","fontSize":"16px","flexShrink":"0"}}>✓</span><span style={{"fontSize":"13px","color":"#475569","lineHeight":"1.6"}}>Open to applicants from any country worldwide</span></div>
        <div style={{"display":"flex","gap":"10px","alignItems":"flex-start"}}><span style={{"color":"#1A56DB","fontWeight":"700","fontSize":"16px","flexShrink":"0"}}>✓</span><span style={{"fontSize":"13px","color":"#475569","lineHeight":"1.6"}}>All roles are 100% remote</span></div>
        <div style={{"display":"flex","gap":"10px","alignItems":"flex-start"}}><span style={{"color":"#1A56DB","fontWeight":"700","fontSize":"16px","flexShrink":"0"}}>✓</span><span style={{"fontSize":"13px","color":"#475569","lineHeight":"1.6"}}>Project-based compensation — paid per deliverable</span></div>
        <div style={{"display":"flex","gap":"10px","alignItems":"flex-start"}}><span style={{"color":"#1A56DB","fontWeight":"700","fontSize":"16px","flexShrink":"0"}}>✓</span><span style={{"fontSize":"13px","color":"#475569","lineHeight":"1.6"}}>No unpaid trial periods or test tasks without compensation</span></div>
        <div style={{"display":"flex","gap":"10px","alignItems":"flex-start"}}><span style={{"color":"#1A56DB","fontWeight":"700","fontSize":"16px","flexShrink":"0"}}>✓</span><span style={{"fontSize":"13px","color":"#475569","lineHeight":"1.6"}}>Early contributors get priority for higher-rate work as we scale</span></div>
      </div>
    </div>
    <div>
      <div style={{"background":"#f8fafc","borderRadius":"14px","padding":"32px","border":"1.5px solid var(--border)"}}>
        <h3 style={{"fontSize":"18px","fontWeight":"700","color":"#0f172a","marginBottom":"20px"}}>Submit your application</h3>
        <div className="cf2" style={{"marginBottom":"14px"}}>
          <div><label style={{"fontSize":"12px","fontWeight":"600","color":"#374151","display":"block","marginBottom":"5px"}}>First name</label><input type="text" placeholder="Your first name" style={{"width":"100%","background":"#fff","border":"1.5px solid #e2e8f0","borderRadius":"8px","padding":"11px 14px","fontSize":"14px","color":"#0f172a","fontFamily":"inherit","outline":"none","boxSizing":"border-box"}} value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required /></div>
          <div><label style={{"fontSize":"12px","fontWeight":"600","color":"#374151","display":"block","marginBottom":"5px"}}>Last name</label><input type="text" placeholder="Your last name" style={{"width":"100%","background":"#fff","border":"1.5px solid #e2e8f0","borderRadius":"8px","padding":"11px 14px","fontSize":"14px","color":"#0f172a","fontFamily":"inherit","outline":"none","boxSizing":"border-box"}} value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} required /></div>
        </div>
        <div style={{"marginBottom":"14px"}}><label style={{"fontSize":"12px","fontWeight":"600","color":"#374151","display":"block","marginBottom":"5px"}}>Email address</label><input type="email" placeholder="your@email.com" style={{"width":"100%","background":"#fff","border":"1.5px solid #e2e8f0","borderRadius":"8px","padding":"11px 14px","fontSize":"14px","color":"#0f172a","fontFamily":"inherit","outline":"none","boxSizing":"border-box"}} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required /></div>
        <div style={{"marginBottom":"14px"}}><label style={{"fontSize":"12px","fontWeight":"600","color":"#374151","display":"block","marginBottom":"5px"}}>Country</label><input type="text" placeholder="Where are you based?" style={{"width":"100%","background":"#fff","border":"1.5px solid #e2e8f0","borderRadius":"8px","padding":"11px 14px","fontSize":"14px","color":"#0f172a","fontFamily":"inherit","outline":"none","boxSizing":"border-box"}} value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} required /></div>
        <div style={{"marginBottom":"14px"}}><label style={{"fontSize":"12px","fontWeight":"600","color":"#374151","display":"block","marginBottom":"5px"}}>Role applying for</label>
          <select style={{"width":"100%","background":"#fff","border":"1.5px solid #e2e8f0","borderRadius":"8px","padding":"11px 14px","fontSize":"14px","color":"#0f172a","fontFamily":"inherit","outline":"none","boxSizing":"border-box"}} value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
            <option value="">Select a role...</option>
            <option>Marketing Strategist</option>
            <option>Paid Ads Specialist</option>
            <option>SEO &amp; GEO/AEO Specialist</option>
            <option>Social Media Manager</option>
            <option>Frontend Developer</option>
            <option>Full-Stack Software Developer</option>
            <option>Mobile App Developer</option>
            <option>AI Systems Developer</option>
            <option>Content Writer &amp; Copywriter</option>
          </select>
        </div>
        <div style={{"marginBottom":"14px"}}><label style={{"fontSize":"12px","fontWeight":"600","color":"#374151","display":"block","marginBottom":"5px"}}>Portfolio or LinkedIn URL</label><input type="url" placeholder="https://yourportfolio.com or linkedin.com/in/you" style={{"width":"100%","background":"#fff","border":"1.5px solid #e2e8f0","borderRadius":"8px","padding":"11px 14px","fontSize":"14px","color":"#0f172a","fontFamily":"inherit","outline":"none","boxSizing":"border-box"}} value={formData.portfolio} onChange={e => setFormData({ ...formData, portfolio: e.target.value })} /></div>
        <div style={{"marginBottom":"20px"}}><label style={{"fontSize":"12px","fontWeight":"600","color":"#374151","display":"block","marginBottom":"5px"}}>Why do you want to work with Amplipath?</label><textarea placeholder="Tell us briefly — what draws you to this role and what you bring to it..." style={{"width":"100%","background":"#fff","border":"1.5px solid #e2e8f0","borderRadius":"8px","padding":"11px 14px","fontSize":"14px","color":"#0f172a","fontFamily":"inherit","outline":"none","boxSizing":"border-box","minHeight":"100px","resize":"vertical"}} value={formData.pitch} onChange={e => setFormData({ ...formData, pitch: e.target.value })} required></textarea></div>
        <button type="submit" disabled={submitting} style={{"width":"100%","background":"#1A56DB","color":"#fff","fontSize":"14px","fontWeight":"700","padding":"14px","border":"none","borderRadius":"8px","cursor":"pointer","fontFamily":"inherit"}}>
          {submitting ? 'Submitting Application...' : 'Submit Application →'}
        </button>
        <p style={{"fontSize":"11px","color":"#94a3b8","marginTop":"10px","lineHeight":"1.5"}}>We review every application personally. You will hear back within 5 business days if your background is a fit.</p>
      </div>
    </div>
  </div>
</div>
          {error && <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>{error}</div>}
        </form>
      )}
    </div>
  );
}
