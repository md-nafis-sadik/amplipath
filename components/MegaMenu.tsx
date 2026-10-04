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
      className="mega open no-scrollbar"
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
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {/* ── COLUMN 1: Search & GEO/AEO + AI Marketing ── */}
      <div>
        <div className="mc-h">Search &amp; GEO/AEO</div>
        <Link href="/services/seo" onClick={onClose} className="mc-a">SEO Optimization</Link>
        <Link href="/services/geo" onClick={onClose} className="mc-a">GEO / AEO — AI Search</Link>
        <Link href="/services/localseo" onClick={onClose} className="mc-a">Local SEO</Link>
        <Link href="/services/techseo" onClick={onClose} className="mc-a">Technical SEO</Link>
        <Link href="/services/ecoseo" onClick={onClose} className="mc-a">E-Commerce SEO</Link>
        <Link href="/services/videoseo" onClick={onClose} className="mc-a">Video SEO</Link>
        <Link href="/services/sem" onClick={onClose} className="mc-a">SEM &amp; Google Ads</Link>
        <Link href="/services/redditmarketing" onClick={onClose} className="mc-a">Reddit Marketing &amp; SEO</Link>
        <Link href="/services/gbp" onClick={onClose} className="mc-a">Google Business Profile</Link>
        <Link href="/services/amazonseo" onClick={onClose} className="mc-a">Amazon SEO &amp; Marketplace</Link>
        <Link href="/services/pinterestseo" onClick={onClose} className="mc-a">Pinterest SEO</Link>
        <Link href="/services/ai-brand-positioning" onClick={onClose} className="mc-a">AI Brand Positioning</Link>
        <Link href="/services/google-local-services-ads" onClick={onClose} className="mc-a">Google Local Services Ads</Link>

        <div className="mc-h" style={{ marginTop: '14px' }}>AI Marketing</div>
        <Link href="/services/aiprompt" onClick={onClose} className="mc-a">AI Marketing Prompt Strategy</Link>
        <Link href="/services/brandai" onClick={onClose} className="mc-a">Brand Personality Design</Link>
        <Link href="/services/emailai" onClick={onClose} className="mc-a">Email Marketing Personalization</Link>
        <Link href="/services/aicampaign" onClick={onClose} className="mc-a">AI-Powered Campaign Mgmt</Link>
        <Link href="/services/aiads" onClick={onClose} className="mc-a">AI-Powered Ad Bidding</Link>
      </div>

      {/* ── COLUMN 2: Social & Paid Ads + Content & Strategy ── */}
      <div>
        <div className="mc-h">Social &amp; Paid Ads</div>
        <Link href="/services/smm" onClick={onClose} className="mc-a">Social Media Marketing</Link>
        <Link href="/services/smmanage" onClick={onClose} className="mc-a">Social Media Management</Link>
        <Link href="/services/socialcommerce" onClick={onClose} className="mc-a">Social Commerce</Link>
        <Link href="/services/fbads" onClick={onClose} className="mc-a">Facebook &amp; Instagram Ads</Link>
        <Link href="/services/tiktok" onClick={onClose} className="mc-a">TikTok Ads &amp; Shop</Link>
        <Link href="/services/ytads" onClick={onClose} className="mc-a">YouTube Ads</Link>
        <Link href="/services/influencer" onClick={onClose} className="mc-a">Influencer Marketing</Link>
        <Link href="/services/display" onClick={onClose} className="mc-a">Display Advertising</Link>
        <Link href="/services/linkedinads" onClick={onClose} className="mc-a">LinkedIn Ads &amp; B2B Lead Gen</Link>
        <Link href="/services/quoraads" onClick={onClose} className="mc-a">Quora Ads</Link>
        <Link href="/services/redditads" onClick={onClose} className="mc-a">Reddit Ads</Link>
        <Link href="/services/amazonads" onClick={onClose} className="mc-a">Amazon Ads Management</Link>
        <Link href="/services/pinterestbiz" onClick={onClose} className="mc-a">Pinterest Business Optimization</Link>
        <Link href="/services/programmatic-advertising" onClick={onClose} className="mc-a">Programmatic Advertising</Link>

        <div className="mc-h" style={{ marginTop: '14px' }}>Content &amp; Strategy</div>
        <Link href="/services/content" onClick={onClose} className="mc-a">Content Marketing</Link>
        <Link href="/services/email" onClick={onClose} className="mc-a">Email Marketing</Link>
        <Link href="/services/emailauto" onClick={onClose} className="mc-a">Email Automations</Link>
        <Link href="/services/digitalpr" onClick={onClose} className="mc-a">Digital PR</Link>
        <Link href="/services/strategy" onClick={onClose} className="mc-a">Marketing Strategy &amp; Planning</Link>
        <Link href="/services/cro" onClick={onClose} className="mc-a">Conversion Rate Optimization</Link>
        <Link href="/services/affiliate" onClick={onClose} className="mc-a">Affiliate Marketing</Link>
        <Link href="/services/sms" onClick={onClose} className="mc-a">Text Message Marketing</Link>
        <Link href="/services/copywriting" onClick={onClose} className="mc-a">Conversion Copywriting</Link>
        <Link href="/services/crm" onClick={onClose} className="mc-a">CRM Setup &amp; Marketing Automation</Link>
        <Link href="/services/marketinganalytics" onClick={onClose} className="mc-a">Marketing Analytics &amp; Data Studio</Link>
        <Link href="/services/website-copywriting" onClick={onClose} className="mc-a">Website Copywriting</Link>
      </div>

      {/* ── COLUMN 3: Niche & Growth + Analytics & Strategy ── */}
      <div>
        <div className="mc-h">Niche &amp; Growth</div>
        <Link href="/services/game" onClick={onClose} className="mc-a">Game Marketing</Link>
        <Link href="/services/steam" onClick={onClose} className="mc-a">Steam Marketing</Link>
        <Link href="/services/appmarketing" onClick={onClose} className="mc-a">Mobile App Marketing</Link>
        <Link href="/services/course" onClick={onClose} className="mc-a">Course Promotion</Link>
        <Link href="/services/music" onClick={onClose} className="mc-a">Music Promotion</Link>
        <Link href="/services/podcast" onClick={onClose} className="mc-a">Podcast Marketing</Link>
        <Link href="/services/book" onClick={onClose} className="mc-a">Book &amp; eBook Marketing</Link>
        <Link href="/services/crypto" onClick={onClose} className="mc-a">Cryptocurrency Marketing</Link>
        <Link href="/services/africa" onClick={onClose} className="mc-a flex items-center justify-between">
          <span>Africa Market Services</span>
          <span className="mc-af">AFRICA</span>
        </Link>
        <Link href="/services/mlm-network-marketing" onClick={onClose} className="mc-a">MLM &amp; Network Marketing</Link>

        <div className="mc-h" style={{ marginTop: '14px' }}>Analytics &amp; Strategy</div>
        <Link href="/services/analytics" onClick={onClose} className="mc-a">Web Analytics</Link>
        <Link href="/services/pr" onClick={onClose} className="mc-a">Public Relations</Link>
        <Link href="/services/crowdfund" onClick={onClose} className="mc-a">Crowdfunding Marketing</Link>
        <Link href="/services/guestpost" onClick={onClose} className="mc-a">Guest Posting &amp; Link Building</Link>
        <Link href="/services/brandstrategy" onClick={onClose} className="mc-a">Brand Strategy</Link>
      </div>

      {/* ── COLUMN 4: Web & Tech + AI Development ── */}
      <div>
        <div className="mc-h">Web &amp; Tech</div>
        <Link href="/services/webdev" onClick={onClose} className="mc-a">Website Development <span className="mc-new">POPULAR</span></Link>
        <Link href="/services/ecomdev" onClick={onClose} className="mc-a">E-Commerce Development</Link>
        <Link href="/services/customweb" onClick={onClose} className="mc-a">Custom Websites</Link>
        <Link href="/services/landing" onClick={onClose} className="mc-a">Landing Pages</Link>
        <Link href="/services/dropship" onClick={onClose} className="mc-a">Dropshipping Websites</Link>
        <Link href="/services/website-security-analysis" onClick={onClose} className="mc-a">Website Security Analysis</Link>

        <div className="mc-h" style={{ marginTop: '14px' }}>AI Development</div>
        <Link href="/services/aidev" onClick={onClose} className="mc-a">AI Development</Link>
        <Link href="/services/aiwebsoft" onClick={onClose} className="mc-a">AI Websites &amp; Software</Link>
        <Link href="/services/aimobile" onClick={onClose} className="mc-a">AI Mobile Apps</Link>
        <Link href="/services/aiintegrate" onClick={onClose} className="mc-a">AI Integrations</Link>
        <Link href="/services/aiagents" onClick={onClose} className="mc-a">AI Agents</Link>
        <Link href="/services/aiconsult" onClick={onClose} className="mc-a">AI Technology Consulting</Link>
        <Link href="/services/chatbot" onClick={onClose} className="mc-a">AI Chatbot Development</Link>
        <Link href="/services/mobileapp" onClick={onClose} className="mc-a">Mobile App Development</Link>
      </div>
    </div>
  );
}
