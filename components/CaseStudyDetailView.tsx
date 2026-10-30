'use client';

import React from 'react';
import Link from 'next/link';
import { useModal } from '@/components/ModalContext';
import { CaseStudy } from '@/data/caseStudiesData';

interface CaseStudyDetailViewProps {
  caseStudy: CaseStudy;
  onClose?: () => void;
}

export default function CaseStudyDetailView({ caseStudy, onClose }: CaseStudyDetailViewProps) {
  const { openModal } = useModal();

  return (
    <div className="bg-white min-h-screen text-[#0f172a] font-sans">
      <div className="animate-in fade-in duration-200">
        {/* Hero Banner */}
        <div
          className="text-white py-14 sm:py-20 relative overflow-hidden"
          style={{ background: caseStudy.bgGradient || 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
        >
          {caseStudy.image && (
            <img
              src={caseStudy.image}
              alt={caseStudy.name}
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-overlay"
            />
          )}
          <div className="absolute -bottom-10 -right-6 text-white/10 text-9xl font-extrabold select-none pointer-events-none">
            {caseStudy.watermark || 'Case'}
          </div>
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 relative z-10">
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white/80 hover:text-white transition-colors mb-6 cursor-pointer bg-transparent border-none p-0"
              >
                &larr; Back to all projects
              </button>
            ) : (
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white/80 hover:text-white transition-colors mb-6 cursor-pointer"
              >
                &larr; Back to all projects
              </Link>
            )}

            <div className="flex items-center gap-2 text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
              <span>{caseStudy.name}</span>
              <span>/</span>
              <span className="text-white font-extrabold">{caseStudy.category}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight mb-4">
              {caseStudy.heroTitle || caseStudy.headline || caseStudy.name}
            </h1>

            <p className="text-sm sm:text-lg text-white/90 max-w-2xl leading-relaxed">
              {caseStudy.heroSub || caseStudy.summary}
            </p>

            {caseStudy.websiteUrl && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={caseStudy.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-900 font-bold text-xs shadow-lg hover:bg-slate-100 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-[#1A56DB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>Visit Live Project</span>
                  <span className="text-slate-400 font-bold">&rarr;</span>
                </a>
                {caseStudy.websiteDisplay && (
                  <span className="text-xs text-white/80 font-mono bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-xs">
                    {caseStudy.websiteDisplay}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Case Detail Body */}
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Meta Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-8 border-b border-slate-200">
            <div>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Client</span>
              <strong className="text-sm sm:text-base font-bold text-slate-900">{caseStudy.name}</strong>
            </div>
            <div>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Industry</span>
              <span className="text-sm sm:text-base font-semibold text-slate-800">{caseStudy.industry || 'Growth'}</span>
            </div>
            <div>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Primary Category</span>
              <span className="text-sm sm:text-base font-semibold text-slate-800">{caseStudy.category}</span>
            </div>
            <div>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">Key Impact</span>
              <span className="text-base sm:text-lg font-extrabold text-[#1A56DB]">{caseStudy.metric}</span>
            </div>
            <div>
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                {caseStudy.websiteUrl ? 'Live Project' : 'Project Status'}
              </span>
              {caseStudy.websiteUrl ? (
                <a
                  href={caseStudy.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1A56DB] hover:text-blue-700 hover:underline"
                >
                  <span className="truncate max-w-[140px]">{caseStudy.websiteDisplay || 'Visit Website'}</span>
                  <span>↗</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live & Deployed
                </span>
              )}
            </div>
          </div>

          {/* Key Results Numbers Bar */}
          {caseStudy.keyStats && caseStudy.keyStats.length > 0 && (
            <div className="my-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {caseStudy.keyStats.map((st, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1A56DB] tracking-tight">{st.value}</div>
                  <div className="text-xs font-semibold text-slate-600 mt-1">{st.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-8">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-8 space-y-10">
              {/* The Company */}
              {caseStudy.theCompany && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A56DB] mb-2">The Company</h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {caseStudy.theCompany}
                  </p>
                </div>
              )}

              {/* The Opportunity */}
              {caseStudy.theOpportunity && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A56DB] mb-2">The Opportunity</h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {caseStudy.theOpportunity}
                  </p>
                </div>
              )}

              {/* Our Solution */}
              {caseStudy.ourSolution && caseStudy.ourSolution.length > 0 && (
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A56DB] mb-3">Our Solution</h3>
                  <div className="space-y-2.5">
                    {caseStudy.ourSolution.map((sol, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✓</span>
                        <p className="text-sm sm:text-base text-slate-700 m-0 leading-relaxed">{sol}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* The Results */}
              {caseStudy.theResults && caseStudy.theResults.length > 0 && (
                <div className="p-6 rounded-2xl bg-blue-50/60 border-l-4 border-[#1A56DB]">
                  <h3 className="text-base font-extrabold text-[#141e30] mb-3">The Outcome</h3>
                  <div className="space-y-2">
                    {caseStudy.theResults.map((res, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium m-0">
                        {res}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Services & CTA */}
            <div className="lg:col-span-4 space-y-6">
              {/* Live Project Website Card */}
              {caseStudy.websiteUrl && (
                <div className="p-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-slate-50/70 shadow-xs">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#1A56DB] mb-2">Live Project Website</span>
                  <div className="text-sm font-bold text-slate-900 mb-3 truncate">
                    {caseStudy.websiteDisplay || caseStudy.websiteUrl}
                  </div>
                  <a
                    href={caseStudy.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#1A56DB] hover:bg-[#1243B0] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Visit Live Website</span>
                    <span>↗</span>
                  </a>
                </div>
              )}

              {caseStudy.servicesDelivered && caseStudy.servicesDelivered.length > 0 && (
                <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">Services Delivered</h4>
                  <ul className="space-y-2 text-xs font-semibold text-slate-700">
                    {caseStudy.servicesDelivered.map((srv, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A56DB]" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:border-[#1A56DB] hover:text-[#1A56DB] text-xs font-bold transition-colors cursor-pointer"
              >
                &larr; Back to all projects
              </button>
            ) : (
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:border-[#1A56DB] hover:text-[#1A56DB] text-xs font-bold transition-colors cursor-pointer"
              >
                &larr; Back to all projects
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
