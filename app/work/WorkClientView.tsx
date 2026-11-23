'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useModal } from '@/components/ModalContext';
import { CaseStudy } from '@/data/caseStudiesData';
import CaseStudyDetailView from '@/components/CaseStudyDetailView';

interface WorkClientViewProps {
  initialCases: CaseStudy[];
}

function WorkPageContent({ initialCases }: WorkClientViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useModal();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [casesList, setCasesList] = useState<CaseStudy[]>(initialCases);

  useEffect(() => {
    setCasesList(initialCases);
  }, [initialCases]);

  // Check URL query on mount (e.g. /work?case=amber) and redirect to dedicated SEO page
  useEffect(() => {
    const caseParam = searchParams.get('case');
    if (caseParam) {
      router.replace(`/work/${caseParam}`);
    }
  }, [searchParams, router]);

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
    ? casesList
    : casesList.filter(c => c.categorySlug === activeFilter);

  return (
    <div className="bg-white min-h-screen text-[#0f172a] font-sans">
      {/* ══ IF A CASE STUDY IS SELECTED, SHOW DETAIL VIEW ══ */}
      {selectedCase ? (
        <CaseStudyDetailView caseStudy={selectedCase} onClose={handleCloseCase} />
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
              <div className="flex flex-wrap gap-2 pb-6 mb-8 border-b border-slate-200">
                {[
                  { label: 'All Projects', value: 'all' },
                  { label: 'Websites & Search', value: 'websites-search' },
                  { label: 'Growth & Acquisition', value: 'growth-acquisition' },
                  { label: 'AI & Platforms', value: 'ai-platforms' },
                  { label: 'Mobile Apps', value: 'mobile-apps' },
                ].map((chip) => (
                  <button
                    key={chip.value}
                    type="button"
                    onClick={() => setActiveFilter(chip.value)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeFilter === chip.value
                        ? 'bg-[#1A56DB] text-white shadow-sm'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Cases Grid */}
              {filteredCases.length === 0 ? (
                <div className="p-16 text-center bg-white rounded-2xl border border-slate-200">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center text-xl mx-auto mb-3">📁</div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">No case studies found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    There are no published case studies in this category at this time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCases.map((c) => (
                    <div
                      key={c.id}
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                    >
                      <div>
                        {/* Hero Image / Banner */}
                        <div
                          className="h-48 relative overflow-hidden flex items-center justify-center p-6 text-white cursor-pointer"
                          style={{ background: c.bgGradient }}
                          onClick={() => handleOpenCase(c)}
                        >
                          {/* Visual decorative watermark text */}
                          <span className="absolute -bottom-4 -right-2 text-6xl font-black text-white/10 select-none uppercase pointer-events-none">
                            {c.watermark}
                          </span>

                          {c.image ? (
                            <img
                              src={c.image}
                              alt={c.name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-lg shadow-md"
                            />
                          ) : (
                            <div className="text-center z-10">
                              <span className="text-xs font-semibold uppercase tracking-wider text-white/80 block mb-1">
                                {c.industry}
                              </span>
                              <h4 className="text-xl font-extrabold text-white">{c.name}</h4>
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-6">
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                            <span>{c.category}</span>
                            <span>{c.industry}</span>
                          </div>

                          <h4
                            onClick={() => handleOpenCase(c)}
                            className="text-lg font-bold text-[#0f172a] group-hover:text-[#1A56DB] transition-colors mb-2 cursor-pointer leading-snug"
                          >
                            {c.name}
                          </h4>

                          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                            {c.headline || c.summary}
                          </p>

                          {/* Key Metric Pill */}
                          {c.metric && (
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                              <div className="text-xl font-extrabold text-[#1A56DB]">{c.metric}</div>
                              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{c.metricLabel}</div>
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {c.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Action */}
                      <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/work/${c.id}`}
                          className="text-xs font-bold text-[#1A56DB] hover:text-[#1243B0] inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Read Dedicated Case Study</span>
                          <span>&rarr;</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenCase(c)}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">Ready to unlock growth?</h2>
              <p className="text-sm sm:text-base text-blue-100 mb-6">
                Tell us about your business — we&rsquo;ll build a custom growth plan within 5 hours.
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

export default function WorkClientView({ initialCases }: WorkClientViewProps) {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-sm">Loading verified client work...</div>}>
      <WorkPageContent initialCases={initialCases} />
    </Suspense>
  );
}
