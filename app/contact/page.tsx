'use client';

import React, { useState } from 'react';

export default function ContactPage() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    enquiryType: 'General Enquiry',
    message: ''
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
          formType: 'contact',
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          subject: formData.subject,
          enquiryType: formData.enquiryType,
          message: formData.message,
          sourcePage: '/contact'
        })
      });
      if (!res.ok) throw new Error('Submission failed. Please try again.');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pg on" id="pg-contact">
      <div className="hero">
        <div className="hero-bar"></div>
        <div className="h-tag"><div className="h-dot"></div>CONTACT US</div>
        <h1 className="h-h1" style={{ fontSize: '38px' }}>Contact Amplipath.</h1>
        <p className="h-sub">General enquiries, support, partnerships, media and careers — send us a message and our team will respond within 5 hours.</p>
      </div>
      <div className="s-white" style={{ minHeight: '600px', display: 'flex', alignItems: 'center' }}>
        <div className="con-split">
          <div style={{ maxWidth: '460px' }}>
            <h2 className="ci-h" style={{ fontSize: '26px', color: '#0f172a', marginBottom: '12px' }}>Get in touch</h2>
            <p className="ci-sub" style={{ fontSize: '14.5px', color: '#475569', lineHeight: '1.7', marginBottom: '22px' }}>
              Whether you need SEO, paid ads, a new website, game marketing or a full-service agency partner — our team responds within 5 hours with clear, honest recommendations for your specific situation.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1.5px solid #e2e8f0', marginBottom: '24px' }}>
              <div className="ci-ico" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--acl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>📧</div>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', fontWeight: 700 }}>General Enquiries</div>
                <a href="mailto:hello@amplipath.com" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ac)', textDecoration: 'none' }}>hello@amplipath.com</a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#22c55e', fontSize: '16px', lineHeight: 1.2 }}>✓</span>
                <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}><strong style={{ color: '#0f172a' }}>Rapid Response:</strong> Dedicated marketing specialist answers within 5 hours</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#22c55e', fontSize: '16px', lineHeight: 1.2 }}>✓</span>
                <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}><strong style={{ color: '#0f172a' }}>Tailored Advice:</strong> Honest recommendations for your specific growth stage</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ color: '#22c55e', fontSize: '16px', lineHeight: 1.2 }}>✓</span>
                <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}><strong style={{ color: '#0f172a' }}>Zero Lock-in:</strong> Transparent, agile month-to-month contracts</span>
              </div>
            </div>
          </div>
          <div className="cf" style={{ maxWidth: '480px', width: '100%', marginLeft: 'auto' }}>
            {submitted ? (
              <div style={{ padding: '30px', textAlign: 'center', background: '#1e293b', borderRadius: '12px', border: '1.5px solid #22c55e' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Message Sent Successfully!</h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6' }}>Thank you for reaching out. Our team will review your message and respond within 5 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="cf-h">Get in Touch.</div>
                <div className="cf-sub">Questions, support, partnerships, media or careers — send us a message and we’ll get back to you within 5 hours.</div>
                <div className="cf2">
                  <div className="cf-f">
                    <label>First name *</label>
                    <input type="text" placeholder="John" required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                  </div>
                  <div className="cf-f">
                    <label>Last name *</label>
                    <input type="text" placeholder="Smith" required value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                  </div>
                </div>
                <div className="cf-f">
                  <label>Business email *</label>
                  <input type="email" placeholder="john@company.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="cf-f">
                  <label>Subject</label>
                  <input type="text" placeholder="e.g. Partnership inquiry" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                </div>
                <div className="cf-f">
                  <label>What is this about?</label>
                  <select name="enquiry_type" value={formData.enquiryType} onChange={e => setFormData({ ...formData, enquiryType: e.target.value })}>
                    <option value="General Enquiry">General question</option>
                    <option value="New Project">New project inquiry</option>
                    <option value="Support">Existing client support</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Careers">Careers</option>
                    <option value="Press">Press / media</option>
                  </select>
                </div>
                <div className="cf-f">
                  <label>Message *</label>
                  <textarea placeholder="Tell us how we can help..." style={{ minHeight: '85px' }} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                </div>
                {error && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '10px' }}>{error}</div>}
                <button className="cf-btn" type="submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
                <div className="cf-trust">
                  <span className="cf-st">★★★★★</span>
                  <span className="cf-tt">Trusted by businesses worldwide · No lock-in contracts · Response within 5 hours</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
