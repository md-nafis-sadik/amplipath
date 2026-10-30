'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useModal } from '@/components/ModalContext';
import { CaseStudy, CASE_STUDIES } from '@/data/caseStudiesData';
import CaseStudyDetailView from '@/components/CaseStudyDetailView';

function WorkPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openModal } = useModal();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [casesList, setCasesList] = useState<CaseStudy[]>(CASE_STUDIES);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        if (data.caseStudies && data.caseStudies.length > 0) {
          const mapped: CaseStudy[] = data.caseStudies.map((dbCs: any) => {
            const fallback = CASE_STUDIES.find((c) => c.id === dbCs.slug);
            let keyStats = fallback?.keyStats || [];
            let servicesDelivered = fallback?.servicesDelivered || [];
            try {
              if (dbCs.services) servicesDelivered = typeof dbCs.services === 'string' ? JSON.parse(dbCs.services) : dbCs.services;
            } catch {}
            try {
              if (dbCs.keyStats) keyStats = typeof dbCs.keyStats === 'string' ? JSON.parse(dbCs.keyStats) : dbCs.keyStats;
            } catch {}

            return {
              id: dbCs.slug,
              name: dbCs.name,
              category: fallback?.category || 'Websites & Search',
              categorySlug: fallback?.categorySlug || 'websites-search',
              industry: dbCs.industry || fallback?.industry || '',
              headline: dbCs.headline || fallback?.headline || '',
              metric: dbCs.metric || fallback?.metric || '',
              metricLabel: dbCs.metricLabel || fallback?.metricLabel || '',
              summary: dbCs.summary || fallback?.summary || '',
              tags: fallback?.tags || ['Growth & Technology'],
              image: dbCs.image || fallback?.image || '',
              gradient: fallback?.gradient || 'from-[#1e293b] to-[#0f172a]',
              bgGradient: fallback?.bgGradient || 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              accentColor: fallback?.accentColor || '#2563eb',
              watermark: fallback?.watermark || 'Case',
              websiteUrl: dbCs.clientWebsite || fallback?.websiteUrl,
              websiteDisplay: fallback?.websiteDisplay,
              heroTitle: fallback?.heroTitle || dbCs.headline || dbCs.name,
              heroSub: fallback?.heroSub || dbCs.summary || '',
              keyStats: Array.isArray(keyStats) && keyStats.length > 0 ? keyStats : (fallback?.keyStats || []),
              theCompany: fallback?.theCompany || dbCs.summary || '',
              theOpportunity: dbCs.overview || fallback?.theOpportunity || '',
              ourSolution: dbCs.solution ? [dbCs.solution] : (fallback?.ourSolution || []),
              theResults: dbCs.results ? [dbCs.results] : (fallback?.theResults || []),
              servicesDelivered: Array.isArray(servicesDelivered) && servicesDelivered.length > 0 ? servicesDelivered : (fallback?.servicesDelivered || []),
            };
          });
          setCasesList(mapped);
        }
      })
      .catch(() => {});
  }, []);

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
              <div
                className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
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
                  <Link
                    key={cs.id}
                    href={`/work/${cs.id}`}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col cursor-pointer group"
                  >
                    {/* Visual Card Header with Photo */}
                    <div className="h-48 relative overflow-hidden text-white bg-slate-900">
                      <img
                        src={cs.image}
                        alt={cs.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      {/* Gradient overlay for readability and polish */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-slate-950/30" />

                      <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md shadow-xs border border-white/15">
                            {cs.category}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs text-white/80 font-medium tracking-wide drop-shadow-sm">{cs.name}</div>
                          <div className="text-white font-bold text-base sm:text-lg leading-tight mt-0.5 drop-shadow-sm">{cs.industry}</div>
                        </div>
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
                  </Link>
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

export default function WorkPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-sm">Loading verified client work...</div>}>
      <WorkPageContent />
    </Suspense>
  );
}
