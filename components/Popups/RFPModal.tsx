'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../ModalContext';
import { COUNTRIES, Country } from '@/lib/countries';
import { rfpBudgetConfig, defaultRfpBudgetOpts } from '@/lib/budgetConfig';

export default function RFPModal() {
  const { activeModal, closeModal, selectedIndustry } = useModal();
  const [supportType, setSupportType] = useState('');
  const [budget, setBudget] = useState('');
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
  const budgetOptions = currentBudgetConfig ? currentBudgetConfig.opts : defaultRfpBudgetOpts;

  const handleSupportTypeChange = (val: string) => {
    setSupportType(val);
    const newConfig = val ? rfpBudgetConfig[val] : null;
    const newOpts = newConfig ? newConfig.opts : defaultRfpBudgetOpts;
    if (budget && !newOpts.includes(budget)) {
      setBudget('');
    }
  };

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
      budget,
      serviceCategory: serviceCat,
      industry: industry || selectedIndustry || 'Not specified',
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
    background: '#f8fafc',
    borderColor: '#e2e8f0',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    fontSize: '13px',
    padding: '9px 12px',
    borderRadius: '6px',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
    color: '#0f172a',
    boxSizing: 'border-box'
  };

  return (
    <div
      className="pop-wrap open no-scrollbar"
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
        padding: '16px',
        backdropFilter: 'blur(4px)',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      <div
        className="pop-box no-scrollbar"
        style={{
          background: '#fff',
          borderRadius: '14px',
          maxWidth: '580px',
          position: 'relative',
          width: '100%',
          maxHeight: 'calc(100vh - 32px)',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
          boxSizing: 'border-box'
        }}
      >
        <button
          className="pop-close"
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            color: '#94a3b8',
            zIndex: 10,
            lineHeight: 1
          }}
        >
          ✕
        </button>

        <div style={{ padding: '18px 24px 12px', textAlign: 'center', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
            <img
              src="/images/logo-horizontal.jpg"
              alt="AMPLIPATH"
              style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '4px', letterSpacing: '-.02em' }}>
            Request for Proposal
          </h2>
          <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.45, maxWidth: '460px', margin: '0 auto' }}>
            Tell us what you are trying to build, grow or improve — and we’ll recommend the right marketing and technology plan.
          </p>
        </div>

        <div style={{ padding: '16px 24px 18px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>✅</div>
              <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Thank You!</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '16px' }}>
                Your Request for Proposal has been submitted. Our team will review your requirements and get back to you within 5 hours.
              </p>
              <button
                onClick={closeModal}
                style={{
                  width: '100%',
                  background: '#1A56DB',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
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
                <div style={{ padding: '8px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#dc2626', fontSize: '12px', marginBottom: '10px' }}>
                  {errorMsg}
                </div>
              )}

              {/* Row 1: First Name, Last Name */}
              <div className="p2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <input required name="firstName" className="pinp" type="text" placeholder="First Name" style={inputStyle} />
                <input required name="lastName" className="pinp" type="text" placeholder="Last Name" style={inputStyle} />
              </div>

              {/* Row 2: Business Email, Website URL */}
              <div className="p2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <input required name="email" className="pinp" type="email" placeholder="Business Email" style={inputStyle} />
                <input name="website" className="pinp" type="text" placeholder="Website URL (optional)" style={inputStyle} />
              </div>

              {/* Row 3: Support Type & Service category in 2 columns */}
              <div className="p2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <select
                  required
                  className="pinp"
                  id="rfp-engagement"
                  value={supportType}
                  onChange={(e) => handleSupportTypeChange(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">What support do you need?</option>
                  <option value="marketing">Ongoing marketing growth</option>
                  <option value="website">Website / ecommerce development</option>
                  <option value="app">Mobile app / software / AI development</option>
                  <option value="hybrid">Marketing + technology together</option>
                  <option value="unsure">Not sure yet</option>
                </select>

                <select
                  required
                  className="pinp"
                  id="rfp-interest"
                  value={serviceCat}
                  onChange={(e) => setServiceCat(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Service category?</option>
                  <option value="search">Search &amp; GEO/AEO (SEO, AI, Ads)</option>
                  <option value="social">Social &amp; Paid Ads (Meta, TikTok)</option>
                  <option value="content">Content &amp; Strategy (CRO, Email)</option>
                  <option value="ai">AI &amp; Tech (Chatbots, Automation)</option>
                  <option value="web">Web &amp; Apps (Custom, Ecommerce)</option>
                  <option value="africa">Africa Market (Local SEO, Ads)</option>
                  <option value="niche">Niche Growth (Gaming, Real Estate)</option>
                </select>
              </div>

              {/* Row 4: Phone Picker & Industry Dropdown in 2 columns */}
              <div className="p2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '6px', position: 'relative' }} ref={countryWrapRef}>
                  <div
                    id="country-btn"
                    onClick={() => setCountryPickerOpen(!countryPickerOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#f8fafc',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '6px',
                      padding: '9px 8px',
                      cursor: 'pointer',
                      fontSize: '12.5px',
                      color: '#334155',
                      fontFamily: 'inherit',
                      userSelect: 'none',
                      flexShrink: 0
                    }}
                  >
                    <span id="country-flag">{selectedCountry.f}</span>
                    <span id="country-code" style={{ fontWeight: 600 }}>{selectedCountry.c}</span>
                    <span style={{ fontSize: '8px', color: '#94a3b8' }}>▼</span>
                  </div>

                  {countryPickerOpen && (
                    <div
                      id="country-dropdown"
                      style={{
                        position: 'absolute',
                        top: '42px',
                        left: 0,
                        width: '280px',
                        background: '#fff',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                        zIndex: 999,
                        overflow: 'hidden'
                      }}
                    >
                      <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9' }}>
                        <input
                          id="country-search"
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          style={{
                            width: '100%',
                            border: '1px solid #e2e8f0',
                            borderRadius: '5px',
                            padding: '6px 10px',
                            fontSize: '12px',
                            color: '#111',
                            fontFamily: 'inherit',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                          autoFocus
                        />
                      </div>
                      <div id="country-list" className="no-scrollbar" style={{ maxHeight: '180px', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
                              gap: '8px',
                              padding: '7px 10px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              borderBottom: '1px solid #f8fafc'
                            }}
                            className="hover:bg-slate-50"
                          >
                            <span style={{ fontSize: '15px' }}>{c.f}</span>
                            <span style={{ flex: 1, color: '#1e293b' }}>{c.n}</span>
                            <span style={{ color: '#94a3b8', fontSize: '11px' }}>{c.c}</span>
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
                      background: '#f8fafc',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '13px',
                      padding: '9px 10px',
                      color: '#111',
                      fontFamily: 'inherit',
                      outline: 'none',
                      minWidth: 0,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <select
                  className="pinp"
                  id="rfp-budget"
                  name="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Estimated budget (optional)</option>
                  {budgetOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Disclaimer */}
              <p style={{ fontSize: '10.5px', color: '#94a3b8', lineHeight: 1.45, marginBottom: '10px' }}>
                By clicking below, you consent for Amplipath to contact you. We respect your privacy.{' '}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#1A56DB', textDecoration: 'underline' }}>Privacy Policy.</a>
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
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '.01em',
                  transition: 'background 0.15s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#1243B0')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#1A56DB')}
              >
                {status === 'loading' ? 'Submitting...' : 'Submit Request →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
