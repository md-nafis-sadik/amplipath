'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import { useModal } from './ModalContext';

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [indOpen, setIndOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useModal();

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMegaOpen(false);
        setIndOpen(false);
        setResOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav ref={navRef} className="nx-nav flex items-center justify-between px-5 md:px-10 h-16 border-b border-slate-200 bg-white relative">
        <div className="flex items-center">
          <Logo />
          <span className="nx-globe hidden sm:inline-block">/ Global ▾</span>
        </div>

        <div className="hidden lg:flex items-center gap-1">
          <Link href="/about" className="nx-a">About</Link>
          
          <div
            className="relative"
            onMouseEnter={() => { setMegaOpen(true); setIndOpen(false); setResOpen(false); }}
          >
            <Link href="/services" className="nx-a inline-block">
              Services ▾
            </Link>
          </div>

          <div
            className="ind-drop-wrap relative"
            onMouseEnter={() => { setIndOpen(true); setMegaOpen(false); setResOpen(false); }}
            onMouseLeave={() => setIndOpen(false)}
          >
            <button
              type="button"
              className="nx-a"
              onClick={() => setIndOpen(!indOpen)}
            >
              Industries ▾
            </button>
            {indOpen && (
              <div
                className="ind-drop-menu open"
                id="ind-drop"
                style={{
                  display: 'block',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '280px',
                  background: '#fff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  padding: '8px 0',
                  zIndex: 999
                }}
              >
                <Link href="/industries/law-firms" onClick={() => setIndOpen(false)} className="ind-drop-item">⚖️ Digital Marketing for Law Firms</Link>
                <Link href="/industries/ecommerce" onClick={() => setIndOpen(false)} className="ind-drop-item">🛒 Ecommerce Growth Agency</Link>
                <Link href="/industries/saas" onClick={() => setIndOpen(false)} className="ind-drop-item">💻 SaaS & Tech Startup Marketing</Link>
                <Link href="/industries/gaming" onClick={() => setIndOpen(false)} className="ind-drop-item">🎮 App & Game Marketing Agency</Link>
                <Link href="/industries/education" onClick={() => setIndOpen(false)} className="ind-drop-item">🎓 Course & Education Marketing</Link>
                <div className="ind-drop-divider"></div>
                <Link href="/industries/real-estate" onClick={() => setIndOpen(false)} className="ind-drop-item">🏠 Real Estate Marketing</Link>
                <Link href="/industries/home-services" onClick={() => setIndOpen(false)} className="ind-drop-item">🔧 Roofing & Home Services</Link>
                <Link href="/industries/healthcare" onClick={() => setIndOpen(false)} className="ind-drop-item">🏥 Healthcare & Wellness Marketing</Link>
                <div className="ind-drop-divider"></div>
                <Link href="/industries/restaurants" onClick={() => setIndOpen(false)} className="ind-drop-item">🍽️ Restaurant & Food Service</Link>
                <Link href="/industries/nonprofits" onClick={() => setIndOpen(false)} className="ind-drop-item">💛 Nonprofit & Charity</Link>
                <Link href="/industries/fintech" onClick={() => setIndOpen(false)} className="ind-drop-item">💰 Finance & Fintech</Link>
              </div>
            )}
          </div>

          <Link href="/work" className="nx-a">Work</Link>

          <div
            className="res-drop-wrap relative"
            onMouseEnter={() => { setResOpen(true); setMegaOpen(false); setIndOpen(false); }}
            onMouseLeave={() => setResOpen(false)}
          >
            <button type="button" className="nx-a" onClick={() => setResOpen(!resOpen)}>Resources ▾</button>
            {resOpen && (
              <div
                className="res-drop-menu open"
                style={{
                  display: 'block',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '220px',
                  background: '#fff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  padding: '8px 0',
                  zIndex: 999
                }}
              >
                <Link href="/blog" onClick={() => setResOpen(false)} className="res-drop-item">📰 Blog & Insights</Link>
                <Link href="/free-audit" onClick={() => setResOpen(false)} className="res-drop-item">🔍 Free Audit</Link>
              </div>
            )}
          </div>

          <Link href="/ai" className="nx-a">AI & Technology</Link>
          <Link href="/contact" className="nx-a">Contact</Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="nx-rfp"
            onClick={() => openModal('rfp')}
          >
            RFP
          </button>
          <button
            type="button"
            className="nx-talk"
            onClick={() => openModal('lead')}
          >
            Let&apos;s talk!
          </button>
          
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} />
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-lg flex flex-col gap-3">
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 font-medium">About</Link>
          <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 font-medium">Services</Link>
          <Link href="/work" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 font-medium">Work</Link>
          <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 font-medium">AI & Technology</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 font-medium">Blog & Insights</Link>
          <Link href="/free-audit" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 font-medium">Free Audit</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 font-medium">Contact</Link>
          <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className="py-2 text-slate-700 font-medium">Careers</Link>
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); openModal('rfp'); }}
              className="flex-1 py-2 text-center text-blue-600 border border-blue-600 font-bold rounded-lg"
            >
              RFP
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); openModal('lead'); }}
              className="flex-1 py-2 text-center bg-blue-600 text-white font-bold rounded-lg"
            >
              Let&apos;s talk!
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
