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
    const data = {
      formType: 'lead',
      name: `${formData.get('firstName') || ''} ${formData.get('lastName') || ''}`.trim(),
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
      className="pop-wrap open"
      id="pop-lead"
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('pop-wrap')) closeModal();
      }}
    >
      <div className="pop-box">
        <div className="pop-top">
          <button className="pop-close" onClick={closeModal}>✕</button>
          <div className="pop-logo-row" style={{ marginBottom: '16px' }}>
            <div style={{ background: '#ffffff', padding: '5px 12px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center' }}>
              <img
                src="/images/logo-horizontal.jpg"
                alt="AMPLIPATH"
                style={{ height: '26px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
          <div className="pop-h">Tell Us About Your Project</div>
          <div className="pop-sub">Have a project in mind? Tell us what you need help with and we’ll point you in the right direction.</div>
          <div className="pop-cards">
            <div className="pop-card">
              <div className="pc-tag">Marketing</div>
              <div className="pc-t">SEO, GEO/AEO, paid ads, social media, content and email — all channels, one team</div>
              <div className="pc-bar"></div>
            </div>
            <div className="pop-card">
              <div className="pc-tag">Technology</div>
              <div className="pc-t">Websites, apps, AI chatbots, automation and ecommerce — built in-house</div>
              <div className="pc-bar" style={{ width: '80%' }}></div>
            </div>
            <div className="pop-card">
              <div className="pc-tag">Africa</div>
              <div className="pc-t">WhatsApp marketing, local SEO, Paystack/Flutterwave and Africa market entry</div>
              <div className="pc-bar" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
        <div className="pop-bot">
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Thank You!</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                We have received your project details and will get back to you within 12 hours.
              </p>
              <button className="pop-btn" onClick={closeModal} style={{ width: '100%' }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div style={{ padding: '10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '12.5px', marginBottom: '12px' }}>
                  {errorMsg}
                </div>
              )}
              <div className="p2">
                <input className="pinp" type="text" name="firstName" placeholder="First name" required />
                <input className="pinp" type="text" name="lastName" placeholder="Last name" required />
              </div>
              <div className="p2">
                <input className="pinp" type="email" name="email" placeholder="Business email" required />
                <input className="pinp" type="text" name="website" placeholder="Website URL" />
              </div>
              <select className="pinp" name="discussionTopic" style={{ marginBottom: '8px' }}>
                <option value="">What would you like to discuss?</option>
                <option>Marketing growth (SEO, ads, social, content)</option>
                <option>Website / ecommerce development</option>
                <option>App / software / AI development</option>
                <option>Marketing + technology together</option>
                <option>Not sure yet</option>
              </select>
              <select className="pinp" name="monthlyBudget" style={{ marginBottom: '8px' }}>
                <option value="">Monthly marketing budget (optional)</option>
                <option>Not sure yet</option>
                <option>Under $1,000</option>
                <option>$1,000 – $2,500</option>
                <option>$2,500 – $5,000</option>
                <option>$5,000 – $10,000</option>
                <option>$10,000 – $25,000</option>
                <option>$25,000+</option>
                <option>Prefer to discuss on a call</option>
              </select>
              <select className="pinp" name="projectBudget" style={{ marginBottom: '8px' }}>
                <option value="">One-time project budget (optional)</option>
                <option>Not sure yet</option>
                <option>Under $2,500</option>
                <option>$2,500 – $5,000</option>
                <option>$5,000 – $10,000</option>
                <option>$10,000 – $25,000</option>
                <option>$25,000 – $50,000</option>
                <option>$50,000 – $100,000</option>
                <option>Above $100,000</option>
                <option>Prefer to discuss on a call</option>
              </select>
              <button className="pop-btn" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : "Let's Talk →"}
              </button>
              <div className="pop-legal">
                By submitting you agree to receive marketing emails from Amplipath. Unsubscribe anytime. We never share your data with third parties.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
