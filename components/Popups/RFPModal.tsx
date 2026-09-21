'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../ModalContext';
import { COUNTRIES, Country } from '@/lib/countries';
import { rfpBudgetConfig } from '@/lib/budgetConfig';

export default function RFPModal() {
  const { activeModal, closeModal, selectedIndustry } = useModal();
  const [supportType, setSupportType] = useState('');
  const [budget, setBudget] = useState('');
  const [buildBudget, setBuildBudget] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [serviceCat, setServiceCat] = useState('');
  const [industry, setIndustry] = useState('');

  // Country phone picker
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    COUNTRIES.find(c => c.n === 'Nigeria') || COUNTRIES.find(c => c.c === '+234') || COUNTRIES[0]
  );
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const countryWrapRef = useRef<HTMLDivElement>(null);

  // Form states
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedIndustry) {
      setIndustry(selectedIndustry);
    }
  }, [selectedIndustry]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (countryWrapRef.current && !countryWrapRef.current.contains(e.target as Node)) {
        setCountryPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (activeModal !== 'rfp') return null;

  const currentBudgetConfig = supportType ? rfpBudgetConfig[supportType] : null;

  const filteredCountries = countrySearch.trim()
    ? COUNTRIES.filter(c =>
        c.n.toLowerCase().includes(countrySearch.toLowerCase()) ||
        c.c.includes(countrySearch)
      )
    : COUNTRIES;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const data = {
      formType: 'RFP',
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      website: formData.get('website') || '',
      supportType,
      budget: supportType === 'hybrid' ? `Build: ${buildBudget}, Monthly: ${monthlyBudget}` : budget,
      serviceCategory: serviceCat,
      industry: industry || 'Not specified',
      phone: `${selectedCountry.c} ${formData.get('phone')}`,
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

  const inputStyle: React.CSSProperties = {
    background: '#f4f6f8',
    borderColor: '#e2e8f0',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    fontSize: '14px',
    padding: '13px 14px',
    borderRadius: '6px',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
    color: '#0f172a'
  };

  return (
    <div
      className="pop-wrap open"
      id="pop-rfp"
      onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('pop-wrap')) closeModal();
      }}
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div
        className="pop-box"
        style={{
          background: '#fff',
          borderRadius: '14px',
          maxWidth: '560px',
          position: 'relative',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.2)'
        }}
      >
        <button
          className="pop-close"
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '22px',
            color: '#aaa',
            zIndex: 10,
            lineHeight: 1
          }}
        >
          ✕
        </button>

        <div style={{ padding: '32px 40px 24px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <img
              src="/images/logo-horizontal.jpg"
              alt="AMPLIPATH"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', letterSpacing: '-.02em' }}>
            Request for Proposal
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
            Tell us what you are trying to build, grow or improve — and we'll recommend the right marketing and technology plan.
          </p>
        </div>

        <div style={{ padding: '24px 40px 32px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Thank You!</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                Your Request for Proposal has been submitted. Our team will review your requirements and get back to you within 12 hours.
              </p>
              <button
                onClick={closeModal}
                style={{
                  width: '100%',
                  background: '#1A56DB',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '13px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#dc2626', fontSize: '13px', marginBottom: '12px' }}>
                  {errorMsg}
                </div>
              )}

              {/* Row 1: First Name, Last Name */}
              <div className="p2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <input required name="firstName" className="pinp" type="text" placeholder="First Name" style={inputStyle} />
                <input required name="lastName" className="pinp" type="text" placeholder="Last Name" style={inputStyle} />
              </div>

              {/* Row 2: Business Email, Website URL */}
              <div className="p2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <input required name="email" className="pinp" type="email" placeholder="Business Email" style={inputStyle} />
                <input name="website" className="pinp" type="text" placeholder="Website URL (optional)" style={inputStyle} />
              </div>

              {/* Row 3: Support Type */}
              <select
                required
                className="pinp"
                id="rfp-engagement"
                value={supportType}
                onChange={(e) => {
                  setSupportType(e.target.value);
                  setBudget('');
                }}
                style={{ ...inputStyle, marginBottom: '12px' }}
              >
                <option value="">What type of support do you need?</option>
                <option value="marketing">Ongoing marketing growth</option>
                <option value="website">Website / ecommerce development</option>
                <option value="app">Mobile app / software / AI development</option>
                <option value="hybrid">Marketing + technology together</option>
                <option value="unsure">Not sure yet</option>
              </select>

              {/* Row 4: Phone Picker matching index.html */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', position: 'relative' }} ref={countryWrapRef}>
                <div
                  id="country-btn"
                  onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#f4f6f8',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '13px 12px',
                    cursor: 'pointer',
                    minWidth: '140px',
                    fontSize: '14px',
                    color: '#334155',
                    fontFamily: 'inherit',
                    userSelect: 'none',
                    flexShrink: 0
                  }}
                >
                  <span id="country-flag">{selectedCountry.f}</span>
                  <span id="country-code" style={{ fontWeight: 600 }}>{selectedCountry.c}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#94a3b8' }}>▼</span>
                </div>

                {countryPickerOpen && (
                  <div
                    id="country-dropdown"
                    style={{
                      position: 'absolute',
                      top: '56px',
                      left: 0,
                      width: '300px',
                      background: '#fff',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '10px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      zIndex: 999,
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                      <input
                        id="country-search"
                        type="text"
                        placeholder="Search country..."
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        style={{
                          width: '100%',
                          border: '1.5px solid #e2e8f0',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontSize: '13px',
                          color: '#111',
                          fontFamily: 'inherit',
                          outline: 'none'
                        }}
                        autoFocus
                      />
                    </div>
                    <div id="country-list" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                      {filteredCountries.map((c, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setSelectedCountry(c);
                            setCountryPickerOpen(false);
                            setCountrySearch('');
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '9px 14px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            borderBottom: '1px solid #f8fafc'
                          }}
                          className="hover:bg-slate-50"
                        >
                          <span style={{ fontSize: '18px' }}>{c.f}</span>
                          <span style={{ flex: 1, color: '#1e293b' }}>{c.n}</span>
                          <span style={{ color: '#94a3b8', fontSize: '12px' }}>{c.c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <input
                  type="tel"
                  id="rfp-phone"
                  name="phone"
                  required
                  placeholder="Phone number"
                  style={{
                    flex: 1,
                    background: '#f4f6f8',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    padding: '13px 14px',
                    color: '#111',
                    fontFamily: 'inherit',
                    outline: 'none',
                    minWidth: 0
                  }}
                />
              </div>

              {/* Row 5: Service category */}
              <select
                required
                className="pinp"
                id="rfp-interest"
                value={serviceCat}
                onChange={(e) => setServiceCat(e.target.value)}
                style={{ ...inputStyle, marginBottom: '12px' }}
              >
                <option value="">What service category are you interested in?</option>
                <option value="search">Search &amp; GEO/AEO (SEO, AI Search, Google Ads)</option>
                <option value="social">Social &amp; Paid Ads (Meta, TikTok, YouTube, Influencer)</option>
                <option value="content">Content &amp; Strategy (Content, Email, PR, CRO)</option>
                <option value="ai">AI &amp; Technology (Chatbots, AI Systems, Automation)</option>
                <option value="web">Web &amp; Apps (Websites, Apps, Ecommerce, Custom)</option>
                <option value="africa">Africa Market (Pan-African, Local SEO, WhatsApp)</option>
                <option value="niche">Niche Growth (Gaming, Course, MLM, Real Estate)</option>
              </select>

              {/* Row 6: Dynamic Budget Selection */}
              {supportType === 'hybrid' ? (
                <div style={{ marginBottom: '12px' }}>
                  <select
                    required
                    className="pinp"
                    value={buildBudget}
                    onChange={(e) => setBuildBudget(e.target.value)}
                    style={{ ...inputStyle, marginBottom: '8px' }}
                  >
                    <option value="">Estimated Build Budget</option>
                    <option>Not sure yet</option>
                    <option>Under $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000 - $50,000</option>
                    <option>$50,000+</option>
                  </select>
                  <select
                    required
                    className="pinp"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="">Estimated Monthly Growth Budget</option>
                    <option>Not sure yet</option>
                    <option>Under $1,000/mo</option>
                    <option>$1,000 - $2,500/mo</option>
                    <option>$2,500 - $5,000/mo</option>
                    <option>$5,000 - $10,000/mo</option>
                    <option>$10,000+/mo</option>
                  </select>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '5px', lineHeight: 1.5 }}>
                    Hybrid projects include a one-time build investment plus ongoing marketing support after launch.
                  </div>
                </div>
              ) : currentBudgetConfig ? (
                <div style={{ marginBottom: '12px' }}>
                  <select
                    required
                    className="pinp"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="">{currentBudgetConfig.label}</option>
                    {currentBudgetConfig.opts.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '5px', lineHeight: 1.5 }}>
                    {currentBudgetConfig.hint}
                  </div>
                </div>
              ) : null}

              {/* Row 7: Industry Dropdown */}
              <div style={{ marginBottom: '12px' }}>
                <select
                  className="pinp"
                  id="rfp-industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Which industry are you in? (optional)</option>
                  <option value="ecommerce">E-Commerce &amp; Retail</option>
                  <option value="saas">SaaS &amp; Technology</option>
                  <option value="law">Legal &amp; Professional Services</option>
                  <option value="healthcare">Healthcare &amp; Wellness</option>
                  <option value="realestate">Real Estate &amp; Property</option>
                  <option value="fintech">Finance &amp; Fintech</option>
                  <option value="game">Gaming &amp; Entertainment</option>
                  <option value="restaurant">Food, Hospitality &amp; Restaurant</option>
                  <option value="nonprofit">Non-Profit &amp; NGO</option>
                  <option value="course">Education &amp; Online Courses</option>
                  <option value="roofing">Home Services &amp; Construction</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Disclaimer */}
              <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.65, marginBottom: '16px' }}>
                By clicking the button below, you consent for Amplipath to contact you using the information provided. This consent is not required to make a purchase.{' '}
                <span style={{ color: '#1A56DB', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy.</span>
              </p>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  background: '#1A56DB',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '15px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '.01em',
                  transition: 'background 0.15s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#1243B0')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#1A56DB')}
              >
                {status === 'loading' ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
