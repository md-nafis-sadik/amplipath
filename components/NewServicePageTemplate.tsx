'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BuilderServiceItem, commonWhy } from '@/data/newServicesData';
import { useModal } from '@/components/ModalContext';

interface NewServicePageTemplateProps {
  service: BuilderServiceItem;
}

export default function NewServicePageTemplate({ service: s }: NewServicePageTemplateProps) {
  const { openModal } = useModal();
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (!s) {
    return <div className="p-20 text-center text-slate-600">Service not found.</div>;
  }

  return (
    <div className="builder-service-page">
      {/* ══ HEADER / HERO ══ */}
      <header className="sp-hero">
        <div className="hero-bar"></div>
        <div className="container">
          <div className="sp-breadcrumb">
            <Link href="/" className="hover:underline">Amplipath</Link> / <Link href="/services" className="hover:underline">Services</Link> / <span>{s.shortTitle}</span>
          </div>

          <div className="eyebrow">{s.eyebrow}</div>

          <h1 className="sp-h1" dangerouslySetInnerHTML={{ __html: s.title }} />

          <p className="sp-sub">{s.intro}</p>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary cursor-pointer"
              onClick={() => openModal('rfp')}
            >
              Request a Custom Proposal
            </button>

            <button
              type="button"
              className="btn-secondary cursor-pointer"
              onClick={() => openModal('lead')}
            >
              Email Our Team
            </button>
          </div>

          <div className="sp-stats">
            {s.stats.map(([num, label], idx) => (
              <div key={idx} className="sp-s">
                <div className="sp-sn">{num}</div>
                <div className="sp-sl">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══ 1. THE CHALLENGE ══ */}
      <section className="section gray">
        <div className="container">
          <div className="sec-tag">The Challenge</div>
          <h2 className="sec-h2">Why businesses invest in {s.shortTitle.toLowerCase()}</h2>
          <div className="aln"></div>

          <p className="sec-sub">
            The service becomes valuable when a specific growth, visibility, operational
            or conversion problem is already costing the business opportunities.
          </p>

          <div className="problem-grid">
            {s.problems.map(([title, desc], idx) => (
              <div key={idx} className="problem-item">
                <div className="problem-mark">!</div>
                <div className="problem-text">
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. WHAT WE DO ══ */}
      <section className="section white">
        <div className="container">
          <div className="sec-tag">What We Do</div>
          <h2 className="sec-h2">Amplipath {s.shortTitle} services</h2>
          <div className="aln"></div>

          <p className="sec-sub">
            Your strategy is customized around your market, digital maturity,
            commercial goals and existing systems rather than being forced into a
            generic checklist.
          </p>

          <div className="pillars">
            {s.pillars.map(([title, desc], idx) => (
              <article key={idx} className="pillar">
                <div className="pillar-num">{String(idx + 1).padStart(2, '0')}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. DELIVERABLES ══ */}
      <section className="section gray">
        <div className="container">
          <div className="sec-tag">Deliverables</div>
          <h2 className="sec-h2">What can be included in your engagement</h2>
          <div className="aln"></div>

          <p className="sec-sub">
            Final deliverables depend on your scope, but a typical engagement can
            combine the strategy, implementation and measurement components below.
          </p>

          <div className="deliv-grid">
            {s.deliverables.map((deliv, idx) => (
              <div key={idx} className="deliv-item">
                <div className="deliv-check">✓</div>
                <div>{deliv}</div>
              </div>
            ))}
          </div>

          {s.compliance && (
            <div className="compliance">
              <strong>Important:</strong> {s.compliance}
            </div>
          )}
        </div>
      </section>

      {/* ══ 4. OUR PROCESS ══ */}
      <section className="section dark">
        <div className="container">
          <div className="sec-tag wh">Our Process</div>
          <h2 className="sec-h2 wh">From strategy to measurable execution</h2>
          <div className="aln"></div>

          <p className="sec-sub wh">
            We keep the workflow straightforward: understand the commercial problem,
            build the right system, launch carefully and improve using real data.
          </p>

          <div className="process-grid">
            {s.process.map(([title, desc], idx) => (
              <article key={idx} className="proc">
                <div className="proc-num">{idx + 1}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. CAPABILITIES ══ */}
      <section className="section white">
        <div className="container">
          <div className="sec-tag">Capabilities</div>
          <h2 className="sec-h2">Platforms, methods and performance signals</h2>
          <div className="aln"></div>

          <p className="sec-sub">
            The exact technology stack varies by client, but these are the kinds of
            channels, systems and metrics the service can involve.
          </p>

          <div className="cap-grid">
            {s.capabilityGroups.map((group, idx) => (
              <article key={idx} className="cap-card">
                <h3>{group.name}</h3>
                <div className="chips">
                  {group.items.map((chip, ci) => (
                    <span key={ci} className="chip">{chip}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. WHO IT'S FOR ══ */}
      <section className="section gray">
        <div className="container">
          <div className="sec-tag">Who It's For</div>
          <h2 className="sec-h2">Built for businesses that need more than a generic campaign</h2>
          <div className="aln"></div>

          <div className="audience-grid">
            {s.audiences.map(([ico, title, desc], idx) => (
              <article key={idx} className="audience">
                <div className="ico">{ico}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. WHY AMPLIPATH ══ */}
      <section className="section white">
        <div className="container">
          <div className="sec-tag">Why Amplipath</div>
          <h2 className="sec-h2">Marketing strategy, technology and execution in one team</h2>
          <div className="aln"></div>

          <div className="why-grid">
            {commonWhy.map((item, idx) => (
              <article key={idx} className="why-card">
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. FAQS ══ */}
      <section className="section gray" id="faq">
        <div className="container">
          <div className="sec-tag">Frequently Asked Questions</div>
          <h2 className="sec-h2">{s.shortTitle} FAQs</h2>
          <div className="aln"></div>

          <div className="faq-wrap">
            {s.faqs.map(([q, a], idx) => {
              const isOpen = openFaqs.has(idx);
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-q"
                    type="button"
                    aria-expanded={isOpen ? 'true' : 'false'}
                    aria-controls={`faq-${idx}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{q}</span>
                    <span className="faq-plus">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className="faq-a" id={`faq-${idx}`}>
                    <div className="faq-a-inner">{a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 9. RELATED SERVICES ══ */}
      <section className="section white">
        <div className="container">
          <div className="sec-tag">Related Services</div>
          <h2 className="sec-h2">Build a more complete growth system</h2>
          <div className="aln"></div>

          <div className="related-grid">
            {s.related.map(([title, desc], idx) => (
              <article key={idx} className="related">
                <small>Related Service</small>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 10. BOTTOM CTA BAND ══ */}
      <section className="cta-band">
        <div className="container">
          <h2>{s.ctaTitle}</h2>
          <p>{s.ctaText}</p>
          <div className="cta-buttons">
            <button
              type="button"
              className="cta-white cursor-pointer"
              onClick={() => openModal('rfp')}
            >
              Book a Free Strategy Session
            </button>
            <button
              type="button"
              className="cta-outline cursor-pointer"
              onClick={() => openModal('lead')}
            >
              Talk to a Specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
