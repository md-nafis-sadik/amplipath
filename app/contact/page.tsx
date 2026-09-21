'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

export default function ContactPage() {
  const router = useRouter();
  const { openModal } = useModal();

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
        <p className="h-sub">General enquiries, support, partnerships, media and careers — send us a message and our team will respond within 12 hours.</p>
      </div>
      <div className="s-white">
        <div className="con-split">
          <div>
            <h2 className="ci-h">Get in touch</h2>
            <p className="ci-sub">Whether you need SEO, paid ads, a new website, game marketing or a full-service agency partner — our team responds within 24 hours with clear, honest recommendations for your specific situation.</p>
            <div className="ci-row"><div className="ci-ico">📧</div><div><strong>General enquiries:</strong> hello@amplipath.com</div></div>
            <div className="ci-row"><div className="ci-ico">💼</div><div><strong>New business &amp; RFP:</strong> sales@amplipath.com</div></div>
            <div className="ci-row"><div className="ci-ico">🤝</div><div><strong>Partnerships:</strong> partners@amplipath.com</div></div>
            <div style={{ marginTop: '16px', padding: '16px', background: '#E8F0FE', borderRadius: '10px', borderLeft: '4px solid #1A56DB' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A56DB', marginBottom: '5px' }}>📋 Submitting an RFP?</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>Email our sales team directly at <strong>sales@amplipath.com</strong> or click the RFP button in the navigation bar. We respond to all RFP submissions within 12 hours.</div>
            </div>
            <div style={{ marginTop: '24px' }}>
              <button className="btn-fill" onClick={() => openModal('rfp')}>Submit RFP Online →</button>
            </div>
          </div>
          <div className="con-form">
            {submitted ? (
              <div style={{ padding: '30px', textAlign: 'center', background: '#f0fdf4', borderRadius: '12px', border: '1.5px solid #86efac' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#166534', marginBottom: '8px' }}>Message Sent Successfully!</h3>
                <p style={{ fontSize: '14px', color: '#15803d', lineHeight: '1.6' }}>Thank you for reaching out. Our team will review your message and respond within 12 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="p2">
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>First name *</label>
                    <input className="cinp" type="text" placeholder="John" required value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Last name *</label>
                    <input className="cinp" type="text" placeholder="Smith" required value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Business email *</label>
                  <input className="cinp" type="email" placeholder="john@company.com" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Subject</label>
                  <input className="cinp" type="text" placeholder="e.g. Partnership inquiry" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Enquiry type</label>
                  <select className="cinp" name="enquiry_type" value={formData.enquiryType} onChange={e => setFormData({ ...formData, enquiryType: e.target.value })}>
                    <option>General Enquiry</option>
                    <option>New Business / RFP</option>
                    <option>Partnership</option>
                    <option>Careers</option>
                    <option>Media &amp; Press</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>Message *</label>
                  <textarea className="cinp" placeholder="Tell us how we can help..." style={{ minHeight: '120px' }} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                </div>
                {error && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '10px' }}>{error}</div>}
                <button className="cbtn" type="submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
