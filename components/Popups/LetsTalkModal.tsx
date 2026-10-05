'use client';
import React, { useState } from 'react';
import { useModal } from '../ModalContext';

export default function LetsTalkModal() {
  const { activeModal, closeModal } = useModal();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (activeModal !== 'lead') return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const firstName = (formData.get('firstName') as string) || '';
    const lastName = (formData.get('lastName') as string) || '';
    const data = {
      formType: "Let's Talk",
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(),
      email: formData.get('email'),
      website: formData.get('website') || '',
      discussionTopic: formData.get('discussionTopic'),
      monthlyBudget: formData.get('monthlyBudget'),
      projectBudget: formData.get('projectBudget'),
      sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/'
    };

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(result.message || 'Submission failed. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  return (
    <div
      className="pop-wrap open no-scrollbar"
      id="pop-lead"
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('pop-wrap')) closeModal();
      }}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <div
        className="pop-box no-scrollbar"
        style={{
          maxHeight: 'calc(100vh - 32px)',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="pop-top" style={{ padding: '18px 24px 14px' }}>
          <button className="pop-close" onClick={closeModal}>✕</button>
          <div className="pop-logo-row" style={{ marginBottom: '10px' }}>
            <div style={{ background: '#ffffff', padding: '4px 10px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center' }}>
              <img
                src="/images/logo-horizontal.jpg"
                alt="AMPLIPATH"
                style={{ height: '22px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
          <div className="pop-h" style={{ fontSize: '19px', marginBottom: '4px' }}>Tell Us About Your Project</div>
          <div className="pop-sub" style={{ fontSize: '12px', lineHeight: 1.45 }}>Have a project in mind? Tell us what you need help with and we’ll point you in the right direction.</div>
          <div className="pop-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '10px' }}>
            <div className="pop-card" style={{ height: 'auto', padding: '8px 10px', minHeight: 'auto', textAlign: 'center' }}>
              <div className="pc-tag">Marketing</div>
              <div className="pc-t">SEO, Ads &amp; Social</div>
            </div>
            <div className="pop-card" style={{ height: 'auto', padding: '8px 10px', minHeight: 'auto', textAlign: 'center' }}>
              <div className="pc-tag">Technology</div>
              <div className="pc-t">Web, AI &amp; Apps</div>
            </div>
            <div className="pop-card" style={{ height: 'auto', padding: '8px 10px', minHeight: 'auto', textAlign: 'center' }}>
              <div className="pc-tag">Africa</div>
              <div className="pc-t">Local &amp; Pan-African</div>
            </div>
          </div>
        </div>
        <div className="pop-bot" style={{ padding: '16px 24px 18px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 10px' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Thank You!</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                We have received your project details and will get back to you within 5 hours.
              </p>
              <button className="pop-btn" onClick={closeModal} style={{ width: '100%' }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div style={{ padding: '8px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#dc2626', fontSize: '12px', marginBottom: '10px' }}>
                  {errorMsg}
                </div>
              )}
              <div className="p2" style={{ marginBottom: '8px' }}>
                <input className="pinp" type="text" name="firstName" placeholder="First name" required />
                <input className="pinp" type="text" name="lastName" placeholder="Last name" required />
              </div>
              <div className="p2" style={{ marginBottom: '8px' }}>
                <input className="pinp" type="email" name="email" placeholder="Business email" required />
                <input className="pinp" type="text" name="website" placeholder="Website URL (optional)" />
              </div>
              <select className="pinp" name="discussionTopic" style={{ marginBottom: '8px' }}>
                <option value="">What would you like to discuss?</option>
                <option>Marketing growth (SEO, ads, social, content)</option>
                <option>Website / ecommerce development</option>
                <option>App / software / AI development</option>
                <option>Marketing + technology together</option>
                <option>Not sure yet</option>
              </select>
              <div className="p2" style={{ marginBottom: '8px' }}>
                <select className="pinp" name="projectBudget">
                  <option value="">Project budget (optional)</option>
                  <option>Not sure yet</option>
                  <option>Under $5,000</option>
                  <option>$5,000 – $10,000</option>
                  <option>$10,000 – $25,000</option>
                  <option>$25,000 – $50,000</option>
                  <option>$50,000+</option>
                  <option>Discuss on call</option>
                </select>
                <select className="pinp" name="monthlyBudget">
                  <option value="">Monthly budget (optional)</option>
                  <option>Not sure yet</option>
                  <option>Under $1,000/mo</option>
                  <option>$1,000 – $2,500/mo</option>
                  <option>$2,500 – $5,000/mo</option>
                  <option>$5,000 – $10,000/mo</option>
                  <option>$10,000+/mo</option>
                  <option>Discuss on call</option>
                </select>
              </div>
              <button className="pop-btn" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : "Let's Talk →"}
              </button>
              <div className="pop-legal" style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', marginTop: '8px', lineHeight: 1.45 }}>
                By submitting you agree to receive marketing emails from Amplipath. Unsubscribe anytime.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
