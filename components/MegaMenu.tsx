'use client';
import React from 'react';
import Link from 'next/link';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className="mega open"
      id="mega"
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '64px',
        left: 0,
        right: 0,
        zIndex: 998,
        background: '#fff',
        borderBottom: '2px solid #e2e8f0',
        padding: '24px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
      }}
    >
      <div>
        <div className="mc-h">Search &amp; GEO/AEO</div>
        <Link href="/services/search-seo" onClick={onClose} className="mc-a">SEO Optimization</Link>
        <Link href="/services/search-seo" onClick={onClose} className="mc-a">GEO / AEO — AI Search</Link>
        <Link href="/services/ai-brand-positioning" onClick={onClose} className="mc-a">AI Brand Positioning 
        </Link>
        <Link href="/services/google-local-services-ads" onClick={onClose} className="mc-a">Google Local Services Ads 
        </Link>
        <Link href="/services/search-seo" onClick={onClose} className="mc-a">Local SEO</Link>
        <Link href="/services/search-seo" onClick={onClose} className="mc-a">Technical SEO</Link>
        <Link href="/services/search-seo" onClick={onClose} className="mc-a">E-Commerce SEO</Link>
        <Link href="/services/search-seo" onClick={onClose} className="mc-a">Video SEO</Link>
        <Link href="/services/paid-ads" onClick={onClose} className="mc-a">SEM &amp; Google Ads</Link>
        <Link href="/services/search-seo" onClick={onClose} className="mc-a">Reddit Marketing &amp; SEO</Link>
        <Link href="/services/search-seo" onClick={onClose} className="mc-a">Google Business Profile</Link>
        <Link href="/services/search-seo" onClick={onClose} className="mc-a">Amazon SEO &amp; Marketplace</Link>

        <div className="mc-h" style={{ marginTop: '14px' }}>AI Marketing</div>
        <Link href="/services/ai-marketing" onClick={onClose} className="mc-a">AI Marketing Prompt Strategy</Link>
        <Link href="/services/ai-marketing" onClick={onClose} className="mc-a">Brand Personality Design</Link>
        <Link href="/services/ai-marketing" onClick={onClose} className="mc-a">Email Marketing Personalization</Link>
        <Link href="/services/ai-marketing" onClick={onClose} className="mc-a">AI-Powered Campaign Mgmt</Link>
      </div>

      <div>
        <div className="mc-h">Social &amp; Paid Ads</div>
        <Link href="/services/programmatic-advertising" onClick={onClose} className="mc-a">Programmatic Advertising 
        </Link>
        <Link href="/services/paid-ads" onClick={onClose} className="mc-a">Facebook &amp; Instagram Ads</Link>
        <Link href="/services/paid-ads" onClick={onClose} className="mc-a">TikTok Ads &amp; Shop</Link>
        <Link href="/services/paid-ads" onClick={onClose} className="mc-a">YouTube Ads</Link>
        <Link href="/services/social-media" onClick={onClose} className="mc-a">Social Media Marketing</Link>
        <Link href="/services/social-media" onClick={onClose} className="mc-a">Social Media Management</Link>
        <Link href="/services/social-media" onClick={onClose} className="mc-a">Influencer Marketing</Link>
        <Link href="/services/paid-ads" onClick={onClose} className="mc-a">Display Advertising</Link>
        <Link href="/services/paid-ads" onClick={onClose} className="mc-a">LinkedIn Ads &amp; B2B Lead Gen</Link>
        <Link href="/services/paid-ads" onClick={onClose} className="mc-a">Reddit Ads</Link>
        <Link href="/services/paid-ads" onClick={onClose} className="mc-a">Amazon Ads Management</Link>

        <div className="mc-h" style={{ marginTop: '14px' }}>Content &amp; Strategy</div>
        <Link href="/services/website-copywriting" onClick={onClose} className="mc-a">Website Copywriting 
        </Link>
        <Link href="/services/content-strategy" onClick={onClose} className="mc-a">Content Marketing</Link>
        <Link href="/services/content-strategy" onClick={onClose} className="mc-a">Email Marketing &amp; Automations</Link>
        <Link href="/services/content-strategy" onClick={onClose} className="mc-a">Digital PR</Link>
        <Link href="/services/content-strategy" onClick={onClose} className="mc-a">Marketing Strategy &amp; Planning</Link>
        <Link href="/services/content-strategy" onClick={onClose} className="mc-a">Conversion Rate Optimization</Link>
      </div>

      <div>
        <div className="mc-h">Niche &amp; Growth</div>
        <Link href="/services/mlm-network-marketing" onClick={onClose} className="mc-a">MLM &amp; Network Marketing 
        </Link>
        <Link href="/services/africa-market" onClick={onClose} className="mc-a flex items-center justify-between">
          <span>Africa Market Services</span>
          <span className="mc-af">AFRICA</span>
        </Link>
        <Link href="/services/niche-services" onClick={onClose} className="mc-a">Game Marketing</Link>
        <Link href="/services/niche-services" onClick={onClose} className="mc-a">Steam Marketing</Link>
        <Link href="/services/niche-services" onClick={onClose} className="mc-a">Mobile App Marketing</Link>
        <Link href="/services/niche-services" onClick={onClose} className="mc-a">Course Promotion</Link>
        <Link href="/services/niche-services" onClick={onClose} className="mc-a">Podcast Marketing</Link>
        <Link href="/services/niche-services" onClick={onClose} className="mc-a">Book &amp; eBook Marketing</Link>
        <Link href="/services/niche-services" onClick={onClose} className="mc-a">Cryptocurrency Marketing</Link>

        <div className="mc-h" style={{ marginTop: '14px' }}>Analytics &amp; Strategy</div>
        <Link href="/services/content-strategy" onClick={onClose} className="mc-a">Web Analytics</Link>
        <Link href="/services/content-strategy" onClick={onClose} className="mc-a">Public Relations</Link>
        <Link href="/services/content-strategy" onClick={onClose} className="mc-a">Brand Strategy</Link>
      </div>

      <div>
        <div className="mc-h">Web &amp; Technology</div>
        <Link href="/services/website-security-analysis" onClick={onClose} className="mc-a">Website Security Analysis 
        </Link>
        <Link href="/services/web-development" onClick={onClose} className="mc-a">Web Development <span className="mc-new">POPULAR</span></Link>
        <Link href="/services/web-development" onClick={onClose} className="mc-a">E-Commerce Development</Link>
        <Link href="/services/web-development" onClick={onClose} className="mc-a">Custom Websites</Link>
        <Link href="/services/web-development" onClick={onClose} className="mc-a">Landing Pages</Link>
        <Link href="/services/web-development" onClick={onClose} className="mc-a">Dropshipping Websites</Link>

        <div className="mc-h" style={{ marginTop: '14px' }}>AI Development</div>
        <Link href="/ai" onClick={onClose} className="mc-a">AI Development</Link>
        <Link href="/ai" onClick={onClose} className="mc-a">AI Websites &amp; Software</Link>
        <Link href="/ai" onClick={onClose} className="mc-a">AI Mobile Apps</Link>
        <Link href="/ai" onClick={onClose} className="mc-a">AI Integrations</Link>
        <Link href="/ai" onClick={onClose} className="mc-a">AI Agents</Link>
        <Link href="/ai" onClick={onClose} className="mc-a">AI Chatbot Development</Link>
      </div>
    </div>
  );
}
