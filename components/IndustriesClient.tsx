'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

const INDUSTRIES_LIST = [
  {
    name: 'Digital Marketing for Law Firms',
    slug: 'law-firms',
    icon: '⚖️',
    bg: '#E8F0FE',
    color: '#1A56DB',
    desc: 'Attract qualified legal clients with practice-area SEO, Google Ads, local search, and intake automation built for legal firms.',
    tags: ['Legal SEO', 'Google Ads', 'Local Pack', 'Client Intake']
  },
  {
    name: 'Ecommerce Growth Agency',
    slug: 'ecommerce',
    icon: '🛒',
    bg: '#F3E8FF',
    color: '#7C3AED',
    desc: 'Scale online sales with technical ecommerce SEO, paid acquisition, social commerce, and store optimization from Shopify to TikTok Shop.',
    tags: ['Shopify SEO', 'Paid Social', 'CRO', 'TikTok Shop']
  },
  {
    name: 'SaaS & Tech Startup Marketing',
    slug: 'saas',
    icon: '💻',
    bg: '#EFF6FF',
    color: '#2563EB',
    desc: 'Generate product signups and demo requests with organic search authority, high-intent paid search, and AI answer engine visibility.',
    tags: ['Demo Generation', 'Product SEO', 'GEO/AEO', 'B2B Ads']
  },
  {
    name: 'App & Game Marketing Agency',
    slug: 'gaming',
    icon: '🎮',
    bg: '#FEF3C7',
    color: '#D97706',
    desc: 'Launch and grow mobile apps and PC games with App Store Optimization (ASO), Steam wishlist campaigns, paid user acquisition, and player retention.',
    tags: ['ASO', 'Steam Wishlists', 'User Acquisition', 'Discord Growth']
  },
  {
    name: 'Course & Education Marketing',
    slug: 'education',
    icon: '🎓',
    bg: '#ECFDF5',
    color: '#059669',
    desc: 'Increase student enrollments and course revenue with search funnels, paid advertising, and email sequences for online academies.',
    tags: ['Student Acquisition', 'Webinar Funnels', 'Kajabi', 'Udemy']
  },
  {
    name: 'Real Estate Marketing',
    slug: 'real-estate',
    icon: '🏠',
    bg: '#FDF2F8',
    color: '#DB2777',
    desc: 'Generate qualified buyer and seller leads through local search dominance, high-intent property PPC, and automated CRM follow-up.',
    tags: ['Property Ads', 'Local Maps', 'Lead Generation', 'Virtual Tours']
  },
  {
    name: 'Roofing & Home Services',
    slug: 'home-services',
    icon: '🔧',
    bg: '#FFF7ED',
    color: '#EA580C',
    desc: 'Get more phone calls and booked appointments with Google Local Services Ads, local search optimization, and verified review management.',
    tags: ['Google LSA', 'Local SEO', 'Call Tracking', 'Review Growth']
  },
  {
    name: 'Healthcare & Wellness Marketing',
    slug: 'healthcare',
    icon: '🏥',
    bg: '#F0FDFA',
    color: '#0D9488',
    desc: 'Help medical practices, dental clinics, and wellness brands attract patients with compliance-first SEO, content, and local search visibility.',
    tags: ['HIPAA Compliant', 'Doctor SEO', 'Patient Acquisition', 'Local Search']
  },
  {
    name: 'Restaurant & Food Service',
    slug: 'restaurants',
    icon: '🍽️',
    bg: '#FEF2F2',
    color: '#DC2626',
    desc: 'Fill tables and drive direct online orders with Google Business Profile optimization, local food SEO, social media marketing, and loyalty campaigns.',
    tags: ['Google Maps', 'Online Ordering', 'Local Food SEO', 'Instagram']
  },
  {
    name: 'Nonprofit & Charity Marketing',
    slug: 'nonprofits',
    icon: '💛',
    bg: '#FEF9C3',
    color: '#CA8A04',
    desc: 'Reach donors, volunteers, and advocates with Google Ad Grants management, fundraising funnels, social campaigns, and impactful digital storytelling.',
    tags: ['Google Ad Grants', 'Donation Funnels', 'Digital PR', 'Storytelling']
  },
  {
    name: 'Finance & Fintech Marketing',
    slug: 'fintech',
    icon: '💰',
    bg: '#F8FAFC',
    color: '#0F172A',
    desc: 'Acquire high-value clients and build financial trust through authoritative SEO, compliance-ready paid media, and analytics-driven conversion architecture.',
    tags: ['Trust Building', 'High LTV Search', 'B2B Fintech', 'Compliance']
  },
];

export default function IndustriesClient() {
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <div className="pg on" id="pg-industries">
      {/* ══ HERO ══ */}
      <div className="hero">
        <div className="hero-bar"></div>
        <div className="h-tag">
          <div className="h-dot"></div>INDUSTRIES WE SERVE
        </div>
        <h1 className="h-h1" style={{ fontSize: '40px' }}>
          Tailored growth systems engineered for your specific industry.
        </h1>
        <p className="h-sub">
          Generic marketing produces generic outcomes. Amplipath builds industry-specific acquisition systems—combining channel expertise, buyer psychology, compliance knowledge, and technology built around how your customers actually decide and buy.
        </p>
        <div className="h-btns">
          <button className="btn-fill" onClick={() => openModal('rfp')}>
            Request Custom Proposal
          </button>
          <button className="btn-out" onClick={() => router.push('/free-audit')}>
            Get Free Growth Audit →
          </button>
        </div>
      </div>

      {/* ══ GRID SECTION ══ */}
      <div style={{ background: '#fff', padding: '48px 40px', borderBottom: '1px solid var(--border)' }}>
        <div className="sec-tag">SPECIALIZED VERTICALS</div>
        <h2 className="sec-h2">11 Dedicated Industry Sectors</h2>
        <div className="aln"></div>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.8', maxWidth: '640px', marginBottom: '36px' }}>
          Explore how we tailor search engine optimization, AI discoverability, paid advertising funnels, conversion web development, and CRM automation to your sector’s commercial economics.
        </p>

        <div className="cat-grid">
          {INDUSTRIES_LIST.map((ind) => (
            <div
              key={ind.slug}
              className="cat-card cursor-pointer"
              onClick={() => router.push(`/industries/${ind.slug}`)}
            >
              <div className="cat-ico-wrap" style={{ background: ind.bg, color: ind.color }}>
                {ind.icon}
              </div>
              <div className="cat-name">{ind.name}</div>
              <div className="cat-desc">{ind.desc}</div>
              <div className="cat-tags">
                {ind.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="cat-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="cat-arrow">
                Explore {ind.name} <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ CTA SECTION ══ */}
      <div className="s-gray" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div className="sec-tag">DON’T SEE YOUR INDUSTRY?</div>
        <h2 className="sec-h2" style={{ maxWidth: '650px', margin: '0 auto 16px' }}>
          We adapt proven growth frameworks to specialized business models worldwide.
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', maxWidth: '580px', margin: '0 auto 28px', lineHeight: '1.8' }}>
          Whether you operate a high-ticket B2B service, international marketplace, or emerging technology startup, our engineers and growth specialists will scope a strategy built around your unit economics.
        </p>
        <button className="btn-fill" onClick={() => openModal('lead')}>
          Speak With An Industry Specialist
        </button>
      </div>
    </div>
  );
}
