'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

export default function FreeAuditPage() {
  const router = useRouter();
  const { openModal } = useModal();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    monthlySpend: 'Under $1,000 / month',
    primaryGoal: 'SEO & Organic Growth'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'free-audit',
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          website: formData.website,
          monthlySpend: formData.monthlySpend,
          primaryGoal: formData.primaryGoal,
          sourcePage: '/free-audit'
        })
      });
      if (!res.ok) throw new Error('Failed to submit audit request.');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pg on" id="pg-free-audit">
      {submitted ? (
        <div style={{ maxWidth: '600px', margin: '80px auto', padding: '40px', textAlign: 'center', background: '#f0fdf4', borderRadius: '16px', border: '1.5px solid #86efac' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#166534', marginBottom: '12px' }}>Audit Request Received!</h2>
          <p style={{ fontSize: '15px', color: '#15803d', lineHeight: '1.6' }}>Our growth team is analyzing your digital presence. Your comprehensive audit report will be delivered to <strong>{formData.email}</strong> within 5 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="hero"><div className="hero-bar"></div>
  <div className="h-tag"><div className="h-dot"></div>FREE AUDIT</div>
  <h1 className="h-h1" style={{"fontSize":"40px"}}>Get your free digital marketing audit — delivered in 5 hours.</h1>
  <p className="h-sub">Our specialists review your website, SEO performance, paid ads, competitors and growth opportunities — then deliver a clear, actionable report showing exactly where you are winning, where you are losing and the specific changes that will make the biggest difference.</p>
</div>
<div className="s-white">
  <div className="con-split">
    <div>
      <div className="sec-tag">WHAT IS INCLUDED</div>
      <h2 className="sec-h2" style={{"fontSize":"26px"}}>A complete review of your digital marketing.</h2>
      <div className="aln"></div>
      <div style={{"display":"flex","flexDirection":"column","gap":"12px"}}>
        <div style={{"display":"flex","gap":"12px","alignItems":"flex-start","padding":"14px","background":"#f8fafc","borderRadius":"10px","border":"1.5px solid var(--border)"}}><div style={{"fontSize":"20px","flexShrink":"0"}}>🔍</div><div><div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a","marginBottom":"2px"}}>SEO Health Check</div><div style={{"fontSize":"12px","color":"#64748b","lineHeight":"1.55"}}>Technical SEO score, keyword rankings, backlink profile and on-page optimization review.</div></div></div>
        <div style={{"display":"flex","gap":"12px","alignItems":"flex-start","padding":"14px","background":"#f8fafc","borderRadius":"10px","border":"1.5px solid var(--border)"}}><div style={{"fontSize":"20px","flexShrink":"0"}}>📣</div><div><div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a","marginBottom":"2px"}}>Paid Ads Review</div><div style={{"fontSize":"12px","color":"#64748b","lineHeight":"1.55"}}>Current ad account performance, budget efficiency, quality scores and wasted spend identification.</div></div></div>
        <div style={{"display":"flex","gap":"12px","alignItems":"flex-start","padding":"14px","background":"#f8fafc","borderRadius":"10px","border":"1.5px solid var(--border)"}}><div style={{"fontSize":"20px","flexShrink":"0"}}>🏆</div><div><div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a","marginBottom":"2px"}}>Competitor Analysis</div><div style={{"fontSize":"12px","color":"#64748b","lineHeight":"1.55"}}>Where your top 3 competitors outrank you and what they're doing differently.</div></div></div>
        <div style={{"display":"flex","gap":"12px","alignItems":"flex-start","padding":"14px","background":"#f8fafc","borderRadius":"10px","border":"1.5px solid var(--border)"}}><div style={{"fontSize":"20px","flexShrink":"0"}}>🤖</div><div><div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a","marginBottom":"2px"}}>AI Search Presence Check</div><div style={{"fontSize":"12px","color":"#64748b","lineHeight":"1.55"}}>How your brand currently appears in ChatGPT, Gemini and Google AI Overviews.</div></div></div>
        <div style={{"display":"flex","gap":"12px","alignItems":"flex-start","padding":"14px","background":"#f8fafc","borderRadius":"10px","border":"1.5px solid var(--border)"}}><div style={{"fontSize":"20px","flexShrink":"0"}}>📈</div><div><div style={{"fontSize":"13px","fontWeight":"700","color":"#0f172a","marginBottom":"2px"}}>Growth Opportunity Report</div><div style={{"fontSize":"12px","color":"#64748b","lineHeight":"1.55"}}>Prioritised list of the highest-impact changes you can make right now — ranked by effort and expected return.</div></div></div>
      </div>
      <div style={{"marginTop":"18px","padding":"14px","background":"var(--acl)","borderRadius":"10px","borderLeft":"4px solid var(--ac)"}}>
        <div style={{"fontSize":"13px","fontWeight":"700","color":"var(--ac)","marginBottom":"3px"}}>✓ Completely free. No credit card. No obligation.</div>
        <div style={{"fontSize":"12px","color":"#475569","lineHeight":"1.6"}}>This is a genuine audit performed by our senior specialists — not an automated report. We invest the time because demonstrating real expertise is the best way to earn your business.</div>
      </div>
    </div>
    <div className="cf">
      <div className="cf-h">Request your free audit.</div>
      <div className="cf-sub">Tell us about your website and we will start the review within 5 hours.</div>
      <div className="cf2">
        <div className="cf-f"><label>First name</label><input type="text" placeholder="John" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} required /></div>
        <div className="cf-f"><label>Last name</label><input type="text" placeholder="Smith" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} required /></div>
      </div>
      <div className="cf-f"><label>Business email</label><input type="email" placeholder="john@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required /></div>
      <div className="cf-f"><label>Website URL (required)</label><input type="text" placeholder="https://yourwebsite.com" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} required /></div>
      <div className="cf-f"><label>What do you want us to focus on?</label>
        <select value={formData.monthlySpend} onChange={e => setFormData({ ...formData, monthlySpend: e.target.value })}><option value="">Select audit focus...</option><option>SEO & Organic Traffic</option><option>Google Ads & PPC</option><option>Social Media & Paid Social</option><option>AI Search (GEO/AEO)</option><option>Full Digital Marketing Review</option><option>Website & Conversion Rate</option><option>Africa Market Performance</option></select>
      </div>
      <div className="cf-f"><label>Monthly marketing budget</label>
        <select value={formData.primaryGoal} onChange={e => setFormData({ ...formData, primaryGoal: e.target.value })}><option value="">Select range...</option><option>Under $500/mo</option><option>$500–$1,000/mo</option><option>$1,000–$2,500/mo</option><option>$2,500–$5,000/mo</option><option>$5,000–$10,000/mo</option><option>$10,000+/mo</option></select>
      </div>
      <button className="cf-btn" type="submit" disabled={submitting}>
        {submitting ? 'Submitting Request...' : 'Request my free audit →'}
      </button>
      <div className="cf-trust"><span className="cf-st">★★★★★</span><span className="cf-tt">Trusted by businesses worldwide · Senior specialists only · Response within 5 hours</span></div>
    </div>
  </div>
</div>
          {error && <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>{error}</div>}
        </form>
      )}
    </div>
  );
}
