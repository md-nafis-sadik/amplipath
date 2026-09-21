'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { IndustryDetail } from '@/data/industriesData';
import { useModal } from '@/components/ModalContext';

interface IndustryPageProps {
  data: IndustryDetail;
  industryKey: string;
}

export default function IndustryPageTemplate({ data, industryKey }: IndustryPageProps) {
  const { openModal } = useModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!data) {
    return <div className="p-20 text-center text-slate-600">Industry information not found.</div>;
  }

  return (
    <div>
      {/* ══ HERO ══ */}
      <div className="hero">
        <div className="hero-bar"></div>
        <div className="h-tag">
          <div className="h-dot"></div>
          {data.emoji ? `${data.emoji} ` : ''}{data.eye}
        </div>
        <h1 className="h-h1" style={{ fontSize: '38px' }}>{data.h1}</h1>
        <p className="h-sub">{data.sub}</p>
        <div className="h-btns">
          <button className="btn-fill" onClick={() => openModal('rfp', industryKey)}>
            Get Started with {data.eye}
          </button>
          <button className="btn-out" onClick={() => openModal('lead', industryKey)}>
            Discuss Strategy
          </button>
        </div>
      </div>

      {/* ══ THE CHALLENGE ══ */}
      {data.problems && data.problems.length > 0 && (
        <div className="s-white">
          <div className="sec-tag">THE CHALLENGE</div>
          <h2 className="sec-h2">Where Most Industry Marketing Fails</h2>
          <div className="aln"></div>
          <div className="problem-grid flex flex-col gap-3 max-w-3xl">
            {data.problems.map((p, idx) => (
              <div key={idx} className="problem-item flex items-start gap-3 p-3 bg-red-50/50 border border-red-100 rounded-lg text-slate-700 text-sm">
                <span className="w-5 h-5 bg-red-100 text-red-600 font-bold rounded-full flex items-center justify-center flex-shrink-0 text-xs">!</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ WHAT WE BUILD ══ */}
      {data.buildAssets && data.buildAssets.length > 0 && (
        <div className="s-gray">
          <div className="sec-tag">WHAT WE BUILD</div>
          <h2 className="sec-h2">Marketing and Technology, Built Together.</h2>
          <div className="aln"></div>
          {data.buildIntro && (
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, maxWidth: '760px', marginBottom: '16px' }}>
              {data.buildIntro}
            </p>
          )}
          <div className="deliv-grid grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
            {data.buildAssets.map((a, idx) => (
              <div key={idx} className="deliv-item flex items-start gap-2.5 p-3.5 bg-white border border-slate-200 rounded-lg text-slate-800 text-sm font-medium">
                <span className="text-green-600 font-bold">✓</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ BUYER JOURNEY / FUNNEL ══ */}
      {data.funnel && data.funnel.length > 0 && (
        <div className="s-white">
          <div className="sec-tag">BUYER JOURNEY</div>
          <h2 className="sec-h2">How a Prospect Moves from Discovery to Conversion</h2>
          <div className="aln"></div>
          <div className="funnel-flow flex flex-wrap items-center gap-4 mt-6">
            {data.funnel.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="funnel-step flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl flex-1 min-w-[200px]">
                  <div className="funnel-step-n w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <div className="funnel-step-t text-sm font-semibold text-slate-800">
                    {step}
                  </div>
                </div>
                {idx < data.funnel.length - 1 && (
                  <div className="hidden lg:block text-slate-400 font-bold text-lg">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* ══ TECHNOLOGY STACK ══ */}
      {data.techStack && data.techStack.length > 0 && (
        <div className="s-gray">
          <div className="sec-tag">TECHNOLOGY STACK</div>
          <h2 className="sec-h2">The Platforms and Tools Behind the System</h2>
          <div className="aln"></div>
          <div className="attr-wrap">
            {data.techStack.map((tech, idx) => (
              <div key={idx} className="attr-card">
                <div className="attr-label">{tech.l}</div>
                <div className="attr-chips flex flex-wrap gap-2 mt-2">
                  {tech.it.map((it, i) => (
                    <span key={i} className="attr-chip bg-white border border-slate-200 px-3 py-1 rounded text-xs text-slate-700 font-medium">
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ KPIS WE TRACK ══ */}
      {data.kpis && data.kpis.length > 0 && (
        <div className="s-white">
          <div className="sec-tag">KPIS WE TRACK</div>
          <h2 className="sec-h2">Measurable Outcomes, Reported Transparently</h2>
          <div className="aln"></div>
          <div className="attr-card max-w-3xl">
            <div className="attr-chips flex flex-wrap gap-2">
              {data.kpis.map((kpi, idx) => (
                <span key={idx} className="attr-chip bg-slate-100 text-blue-700 font-semibold px-3 py-1.5 rounded-md border border-slate-200 text-xs">
                  📈 {kpi}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ FREQUENTLY ASKED QUESTIONS ══ */}
      {data.faqs && data.faqs.length > 0 && (
        <div className="s-gray">
          <div className="sec-tag">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="sec-h2">Common Questions About {data.eye}</h2>
          <div className="aln"></div>
          <div className="faq-wrap">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="faq-item">
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-a open">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
