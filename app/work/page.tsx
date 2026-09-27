'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useModal } from '@/components/ModalContext';
import { CaseStudy, CASE_STUDIES } from '@/data/caseStudiesData';

function WorkPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useModal();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Check URL query on mount (e.g. /work?case=amber)
  useEffect(() => {
    const caseParam = searchParams.get('case');
    if (caseParam) {
      const found = CASE_STUDIES.find(c => c.id === caseParam);
      if (found) {
        setSelectedCase(found);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  const handleOpenCase = (c: CaseStudy) => {
    setSelectedCase(c);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseCase = () => {
    setSelectedCase(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered case studies
  const filteredCases = activeFilter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(c => c.categorySlug === activeFilter);

  return (
    <div className="bg-white min-h-screen text-[#0f172a] font-sans">
      {/* ══ IF A CASE STUDY IS SELECTED, SHOW DETAIL VIEW ══ */}
      {selectedCase ? (
        <div className="animate-in fade-in duration-200">
          {/* Hero Banner */}
          <div
            className="text-white py-14 sm:py-20 relative overflow-hidden"
            style={{ background: selectedCase.bgGradient }}
          >
            <div className="absolute -bottom-10 -right-6 text-white/10 text-9xl font-extrabold select-none pointer-events-none">
              {selectedCase.watermark}
            </div>
            <div className="max-w-[1180px] mx-auto px-4 sm:px-6 relative z-10">
              <button
                type="button"
                onClick={handleCloseCase}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white/80 hover:text-white transition-colors mb-6 cursor-pointer bg-transparent border-none p-0"
              >
                &larr; Back to all projects
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
                <span>{selectedCase.name}</span>
                <span>/</span>
                <span className="text-white font-extrabold">{selectedCase.category}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight mb-4">
                {selectedCase.heroTitle}
              </h1>

              <p className="text-sm sm:text-lg text-white/90 max-w-2xl leading-relaxed">
                {selectedCase.heroSub}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={selectedCase.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-900 font-bold text-xs shadow-lg hover:bg-slate-100 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-[#1A56DB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>Visit Live Website</span>
                  <span className="text-slate-400 font-bold">&rarr;</span>
                </a>
                <span className="text-xs text-white/80 font-mono bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-xs">
                  {selectedCase.websiteDisplay}
                </span>
              </div>
            </div>
          </div>

          {/* Case Detail Body */}
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
            {/* Meta Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-8 border-b border-slate-200">
              <div>
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Client</span>
                <strong className="text-sm sm:text-base font-bold text-slate-900">{selectedCase.name}</strong>
              </div>
              <div>
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Industry</span>
                <span className="text-sm sm:text-base font-semibold text-slate-800">{selectedCase.industry}</span>
              </div>
              <div>
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Primary Category</span>
                <span className="text-sm sm:text-base font-semibold text-slate-800">{selectedCase.category}</span>
              </div>
              <div>
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Key Impact</span>
                <span className="text-base sm:text-lg font-extrabold text-[#1A56DB]">{selectedCase.metric}</span>
              </div>
              <div>
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Live Project</span>
                <a
                  href={selectedCase.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1A56DB] hover:text-blue-700 hover:underline"
                >
                  <span className="truncate max-w-[140px]">{selectedCase.websiteDisplay}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Key Results Numbers Bar */}
            <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {selectedCase.keyStats.map((st, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1A56DB] tracking-tight">{st.value}</div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">{st.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-8">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-8 space-y-10">
                {/* The Company */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A56DB] mb-2">The Company</h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {selectedCase.theCompany}
                  </p>
                </div>

                {/* The Opportunity */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A56DB] mb-2">The Opportunity</h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {selectedCase.theOpportunity}
                  </p>
                </div>

                {/* Our Solution */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A56DB] mb-3">Our Solution</h3>
                  <div className="space-y-2.5">
                    {selectedCase.ourSolution.map((sol, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        <p className="text-sm sm:text-base text-slate-700 m-0 leading-relaxed">{sol}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* The Results */}
                <div className="p-6 rounded-2xl bg-blue-50/60 border-l-4 border-[#1A56DB]">
                  <h3 className="text-base font-extrabold text-[#141e30] mb-3">The Outcome</h3>
                  <div className="space-y-2">
                    {selectedCase.theResults.map((res, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium m-0">
                        {res}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Services & CTA */}
              <div className="lg:col-span-4 space-y-6">
                {/* Live Project Website Card */}
                <div className="p-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-slate-50/70 shadow-xs">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#1A56DB] mb-2">Live Project Website</span>
                  <div className="text-sm font-bold text-slate-900 mb-3 truncate">
                    {selectedCase.websiteDisplay}
                  </div>
                  <a
                    href={selectedCase.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#1A56DB] hover:bg-[#1243B0] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Visit Live Website</span>
                    <span>↗</span>
                  </a>
                </div>

                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">Services Delivered</h4>
                  <ul className="space-y-2 text-xs font-semibold text-slate-700">
                    {selectedCase.servicesDelivered.map((srv, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center">
                  <h4 className="text-lg font-bold text-white mb-2">Want Similar Growth?</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    Let’s evaluate your current performance and build a bespoke execution strategy.
                  </p>
                  <button
                    type="button"
                    onClick={() => openModal('rfp')}
                    className="w-full py-3 px-4 rounded-xl bg-[#1A56DB] hover:bg-[#1243B0] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Start a Project &rarr;
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-14 pt-8 border-t border-slate-200">
              <button
                type="button"
                onClick={handleCloseCase}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:border-[#1A56DB] hover:text-[#1A56DB] text-xs font-bold transition-colors cursor-pointer"
              >
                &larr; Back to all projects
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ══ HUB VIEW: HERO + FILTERABLE GRID ══ */
        <div>
          {/* Work Hero */}
          <section className="relative overflow-hidden text-white bg-[#081729] py-16 sm:py-24 border-b border-slate-800">
            <div className="max-w-[1180px] mx-auto px-4 sm:px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.19em] text-[#6da2ff] mb-4">
                    <span className="w-6 h-[1px] bg-currentColor" />
                    <span>Client Results</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-[-0.04em] mb-5">
                    Connected thinking.<br />
                    <em className="text-[#8fb4ff] not-italic">Tangible progress.</em>
                  </h1>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-7 max-w-xl">
                    Every business has its own path to growth. We bring marketing, technology and AI into one joined-up approach, then build around the outcome that matters.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => openModal('rfp')}
                      className="px-6 py-3.5 rounded-lg bg-[#1A56DB] text-white text-sm font-bold shadow-sm hover:bg-[#1243B0] transition-all cursor-pointer"
                    >
                      Start a Project
                    </button>
                    <a
                      href="#wk-explore"
                      className="inline-flex items-center gap-2 text-sm font-bold text-white border-b border-[#8fb4ff] pb-1 hover:text-[#8fb4ff] transition-colors"
                    >
                      Explore Our Work ↗
                    </a>
                  </div>
                </div>

                {/* SVG Connected Diagram */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <svg className="w-full max-w-[420px] h-auto drop-shadow-2xl" viewBox="0 0 500 430" role="img" aria-label="Integrated growth system diagram">
                    <defs>
                      <linearGradient id="wk-grad" x1="0" y1="0" x2="1" y2="0">
                        <stop stopColor="#3d75dc" />
                        <stop offset="1" stopColor="#b5d5ff" />
                      </linearGradient>
                      <radialGradient id="wk-core">
                        <stop stopColor="#477eef" />
                        <stop offset="1" stopColor="#173a7a" />
                      </radialGradient>
                    </defs>
                    <circle cx="309" cy="211" r="146" fill="none" stroke="#86aaf4" opacity=".12" />
                    <circle cx="309" cy="211" r="113" fill="none" stroke="#86aaf4" opacity=".13" />
                    <circle cx="309" cy="211" r="80" fill="none" stroke="#86aaf4" opacity=".17" />
                    <path d="M102 110 C181 110 170 211 271 211" fill="none" stroke="url(#wk-grad)" strokeWidth="2" />
                    <path d="M105 211 L271 211" fill="none" stroke="url(#wk-grad)" strokeWidth="2" />
                    <path d="M102 315 C181 315 170 211 271 211" fill="none" stroke="url(#wk-grad)" strokeWidth="2" />
                    <circle cx="97" cy="110" r="8" fill="#96b7fc" />
                    <circle cx="97" cy="211" r="8" fill="#96b7fc" />
                    <circle cx="97" cy="315" r="8" fill="#96b7fc" />
                    <circle cx="309" cy="211" r="47" fill="url(#wk-core)" stroke="#afd0ff" strokeWidth="1.5" />
                    <circle cx="309" cy="211" r="61" fill="none" stroke="#86aaf4" opacity=".4" />
                    <path d="M355 211 H444" fill="none" stroke="url(#wk-grad)" strokeWidth="2" />
                    <path d="m435 204 9 7-9 7" fill="none" stroke="#b5d5ff" strokeWidth="2" />
                    <text x="124" y="114" fill="#ddeaff" fontSize="15" fontWeight="600">Marketing</text>
                    <text x="124" y="216" fill="#ddeaff" fontSize="15" fontWeight="600">Technology</text>
                    <text x="124" y="320" fill="#ddeaff" fontSize="15" fontWeight="600">AI</text>
                    <text x="309" y="217" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700">ONE</text>
                    <text x="386" y="178" fill="#91acdc" fontSize="10" fontWeight="600" letterSpacing="0.15em">MEASURABLE</text>
                    <text x="386" y="194" fill="#91acdc" fontSize="10" fontWeight="600" letterSpacing="0.15em">PROGRESS</text>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy Statement */}
          <section className="py-14 sm:py-16 border-b border-slate-200 bg-white">
            <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A56DB] block mb-2">WORK</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
                Built around the outcome, not the pitch.
              </h2>
              <div className="w-12 h-1 bg-[#1A56DB] rounded-full mb-5" />
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                We take on a project when we&rsquo;re confident we can move a real number for it — traffic, conversion, funded leads, whatever the business actually runs on. That&rsquo;s why you&rsquo;ll find fewer projects here than on most agency pages: we&rsquo;d rather show you exactly how each one was won than hand you a wall of logos. Every case study below goes deep on the brief, the build and the outcome, so you can judge the thinking, not just a name you recognize.
              </p>
            </div>
          </section>

          {/* Interactive Filter Bar & Portfolio Grid */}
          <section id="wk-explore" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
            <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1A56DB] block mb-1">CLIENT WORK</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Explore our work</h3>
                </div>
                <div className="text-xs text-slate-500 font-semibold">
                  Showing {filteredCases.length} case {filteredCases.length === 1 ? 'study' : 'studies'}
                </div>
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
                {[
                  { label: 'All', slug: 'all' },
                  { label: 'Websites & Search', slug: 'websites-search' },
                  { label: 'Ads & Growth', slug: 'ads-growth' },
                  { label: 'Content, Strategy & Analytics', slug: 'content-strategy-analytics' },
                  { label: 'AI Automation & App Development', slug: 'ai-automation-app-development' },
                ].map((chip) => {
                  const isActive = activeFilter === chip.slug;
                  return (
                    <button
                      key={chip.slug}
                      type="button"
                      onClick={() => setActiveFilter(chip.slug)}
                      className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#1A56DB] text-white border-[#1A56DB] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>

              {/* Grid of Case Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCases.map((cs) => (
                  <div
                    key={cs.id}
                    onClick={() => handleOpenCase(cs)}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col cursor-pointer group"
                  >
                    {/* Visual Card Header */}
                    <div
                      className="h-36 p-5 flex flex-col justify-between relative overflow-hidden text-white"
                      style={{ background: cs.bgGradient }}
                    >
                      <div className="flex items-center justify-between z-10">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/15 text-white backdrop-blur-xs">
                          {cs.category}
                        </span>
                        <span className="text-white/80 text-[11px] font-mono font-medium flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded backdrop-blur-xs">
                          {cs.websiteDisplay.replace(/^www\./, '').split('/')[0]} ↗
                        </span>
                      </div>
                      <div className="z-10">
                        <div className="text-xs text-white/80 font-semibold">{cs.name}</div>
                        <div className="text-white font-bold text-base leading-tight mt-0.5">{cs.industry}</div>
                      </div>
                      <div className="absolute -bottom-6 -right-6 text-white/5 text-7xl font-extrabold select-none">
                        {cs.watermark}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-3xl font-extrabold text-[#1A56DB] mb-1 tracking-tight">
                          {cs.metric}
                        </div>
                        <div className="text-[11px] font-semibold text-slate-500 mb-3">
                          {cs.metricLabel}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {cs.summary}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {cs.tags.map((t, tidx) => (
                            <span key={tidx} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1A56DB] group-hover:text-blue-700">
                        <span>Read full case study</span>
                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCases.length === 0 && (
                <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 p-8">
                  <h4 className="text-base font-bold text-slate-800 mb-1">No case studies in this category yet</h4>
                  <p className="text-xs text-slate-500 mb-4">More verified client results are being added continuously.</p>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('all')}
                    className="px-4 py-2 rounded-lg bg-[#1A56DB] text-white text-xs font-bold"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Industries We've Grown (Dark Section) */}
          <section className="py-16 bg-[#0f172a] text-white">
            <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2">INDUSTRIES WE&rsquo;VE GROWN</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                We&rsquo;ve driven results across every major sector.
              </h2>
              <div className="w-12 h-1 bg-[#1A56DB] rounded-full mb-8" />

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  '💻 SaaS & Technology',
                  '🛒 E-Commerce',
                  '💰 Finance & Fintech',
                  '🏥 Healthcare',
                  '🎮 Gaming & Entertainment',
                  '🎓 Education & Courses',
                  '🌍 Africa Markets',
                  '⚖️ Legal & Professional',
                  '🏠 Real Estate',
                  '🎵 Music & Entertainment',
                  '📚 Publishing & Media',
                  '🔧 Home Services'
                ].map((ind, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-semibold text-slate-300">
                    {ind}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom CTA Band */}
          <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">Ready to unlock growth?</h2>
              <p className="text-sm sm:text-base text-blue-100 mb-6">
                Tell us about your business — we&rsquo;ll build a custom growth plan within 12 hours.
              </p>
              <button
                type="button"
                onClick={() => openModal('rfp')}
                className="px-7 py-3.5 rounded-lg bg-white text-[#1A56DB] font-bold text-sm shadow-lg hover:bg-slate-50 transition-all cursor-pointer"
              >
                Get Started &rarr;
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-sm">Loading verified client work...</div>}>
      <WorkPageContent />
    </Suspense>
  );
}
