'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ServiceDetail } from '@/data/servicesData';
import { useModal } from '@/components/ModalContext';

interface ServicePageProps {
  data: ServiceDetail;
  serviceId: string;
}

export default function ServicePageTemplate({ data, serviceId }: ServicePageProps) {
  const { openModal } = useModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!data) {
    return <div className="p-20 text-center text-slate-600">Service information not found.</div>;
  }

  return (
    <div>
      {/* ══ SERVICE HERO ══ */}
      <div className="sp-hero">
        <div className="sp-breadcrumb">
          <Link href="/" className="hover:underline">Home</Link> / <Link href="/services" className="hover:underline">Services</Link> / <span>{data.shortTitle || data.eye}</span>
        </div>
        {data.eyebrow && (
          <div className="eyebrow">{data.eyebrow}</div>
        )}
        <h1 className="sp-h1">{data.h1}</h1>
        <p className="sp-sub">{data.sub}</p>
        <div style={{ marginTop: '24px' }} className="hero-actions">
          <button className="btn-primary" onClick={() => openModal('rfp')}>Request a Custom Proposal</button>
          <button className="btn-secondary" onClick={() => openModal('lead')}>Speak With a Specialist</button>
        </div>

        {/* Stats Strip */}
        {data.stats && data.stats.length > 0 && (
          <div className="sp-stats">
            {data.stats.map((s, idx) => (
              <div key={idx} className="sp-s">
                <div className="sp-sn">{s.n}</div>
                <div className="sp-sl">{s.l}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══ THE CHALLENGE / PROBLEMS ══ */}
      {data.problems && data.problems.length > 0 && (
        <section className="section gray">
          <div className="container">
            <div className="sec-tag">The Challenge</div>
            <h2 className="sec-h2">Why businesses invest in {(data.shortTitle || data.eye).toLowerCase()}</h2>
            <div className="aln"></div>
            <p className="sec-sub">
              The service becomes valuable when a specific growth, visibility, operational or conversion problem is already costing the business opportunities.
            </p>
            <div className="problem-grid">
              {data.problems.map((p, idx) => (
                <div key={idx} className="problem-item">
                  <div className="problem-mark">!</div>
                  <div className="problem-text">
                    <strong>{p.title}</strong>
                    <span>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ WHAT WE DO / PILLARS ══ */}
      {data.pillars && data.pillars.length > 0 && (
        <section className="section white">
          <div className="container">
            <div className="sec-tag">What We Do</div>
            <h2 className="sec-h2">Amplipath {data.shortTitle || data.eye} services</h2>
            <div className="aln"></div>
            <p className="sec-sub">
              Your strategy is customized around your market, digital maturity, commercial goals and existing systems rather than being forced into a generic checklist.
            </p>
            <div className="pillars">
              {data.pillars.map((p, idx) => (
                <article key={idx} className="pillar">
                  <div className="pillar-num">{String(idx + 1).padStart(2, '0')}</div>
                  <h3>{p.n}</h3>
                  <p>{p.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ DELIVERABLES ══ */}
      {data.deliverables && data.deliverables.length > 0 && (
        <section className="section gray">
          <div className="container">
            <div className="sec-tag">Deliverables</div>
            <h2 className="sec-h2">What can be included in your engagement</h2>
            <div className="aln"></div>
            <p className="sec-sub">
              Final deliverables depend on your scope, but a typical engagement can combine the strategy, implementation and measurement components below.
            </p>
            <div className="deliv-grid">
              {data.deliverables.map((item, idx) => (
                <div key={idx} className="deliv-item">
                  <div className="deliv-check">✓</div>
                  <div>{item}</div>
                </div>
              ))}
            </div>

            {data.compliance && (
              <div className="compliance">
                <strong>Important:</strong> {data.compliance}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══ PROCESS ══ */}
      {data.process && data.process.length > 0 && (
        <section className="section dark">
          <div className="container">
            <div className="sec-tag wh">Our Process</div>
            <h2 className="sec-h2 wh">From strategy to measurable execution</h2>
            <div className="aln wh"></div>
            <p className="sec-sub wh">
              We keep the workflow straightforward: understand the commercial problem, build the right system, launch carefully and improve using real data.
            </p>
            <div className="process-grid">
              {data.process.map((proc, idx) => (
                <article key={idx} className="proc">
                  <div className="proc-num">{proc.num || idx + 1}</div>
                  <h3>{proc.title}</h3>
                  <p>{proc.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ CAPABILITIES ══ */}
      {data.capabilityGroups && data.capabilityGroups.length > 0 && (
        <section className="section white">
          <div className="container">
            <div className="sec-tag">Capabilities</div>
            <h2 className="sec-h2">Platforms, methods and performance signals</h2>
            <div className="aln"></div>
            <p className="sec-sub">
              The exact technology stack varies by client, but these are the kinds of channels, systems and metrics the service can involve.
            </p>
            <div className="cap-grid">
              {data.capabilityGroups.map((group, idx) => (
                <article key={idx} className="cap-card">
                  <h3>{group.name}</h3>
                  <div className="chips">
                    {group.items.map((it, i) => (
                      <span key={i} className="chip">{it}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ AUDIENCES / WHO IT IS FOR ══ */}
      {data.audiences && data.audiences.length > 0 && (
        <section className="section gray">
          <div className="container">
            <div className="sec-tag">Who It's For</div>
            <h2 className="sec-h2">Built for businesses that need more than a generic campaign</h2>
            <div className="aln"></div>
            <div className="audience-grid">
              {data.audiences.map((aud, idx) => (
                <article key={idx} className="audience">
                  <div className="ico">{aud.ico}</div>
                  <h3>{aud.title}</h3>
                  <p>{aud.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ LEGACY ATTRS (IF ANY) ══ */}
      {data.attrs && data.attrs.length > 0 && !data.capabilityGroups && (
        <div className="s-white">
          <div className="sec-tag">SPECIFICATIONS & DELIVERABLES</div>
          <h2 className="sec-h2">What Is Included</h2>
          <div className="aln"></div>
          <div className="attr-wrap">
            {data.attrs.map((attr, idx) => (
              <div key={idx} className="attr-card">
                <div className="attr-label">{attr.l}</div>
                <div className="attr-chips flex flex-wrap gap-2 mt-2">
                  {attr.it.map((item, i) => (
                    <span key={i} className="attr-chip bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md border border-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ CASE STUDY STRIP ══ */}
      {data.cs && (
        <div className="case-strip">
          <div className="cs-lbl">FEATURED CLIENT RESULT</div>
          <div className="cs-stat">{data.cs.stat}</div>
          <div className="cs-title">{data.cs.title}</div>
          <div className="cs-desc">{data.cs.desc}</div>
          <button className="cs-cta" onClick={() => openModal('rfp')}>
            Request Similar Results →
          </button>
        </div>
      )}

      {/* ══ FAQS ACCORDION ══ */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="section gray" id="faq">
          <div className="container">
            <div className="sec-tag">Frequently Asked Questions</div>
            <h2 className="sec-h2">{data.shortTitle || data.eye} FAQs</h2>
            <div className="aln"></div>
            <div className="faq-wrap">
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-q"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    >
                      <span>{faq.q}</span>
                      <span className="faq-plus">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-a open">
                        <div className="faq-a-inner">{faq.a}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ RELATED SERVICES ══ */}
      {data.related && data.related.length > 0 && (
        <section className="section white">
          <div className="container">
            <div className="sec-tag">Related Services</div>
            <h2 className="sec-h2">Build a more complete growth system</h2>
            <div className="aln"></div>
            <div className="related-grid">
              {data.related.map((rel: any, idx) => {
                const isObj = typeof rel === 'object' && rel !== null;
                const title = isObj ? rel.title : rel;
                const desc = isObj ? rel.desc : 'Explore how this service integrates with your broader growth strategy.';
                const href = (isObj && typeof rel.link === 'string') ? rel.link : '/services';

                return (
                  <article key={idx} className="related">
                    <small>Related Service</small>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <Link href={href} className="text-xs font-bold text-blue-600 hover:underline mt-2 inline-block">
                      Learn more &rarr;
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ BOTTOM CTA BAND ══ */}
      <section className="cta-band">
        <div className="container">
          <h2>{data.ctaTitle || 'Ready to unlock measurable growth?'}</h2>
          <p>{data.ctaText || 'Tell us about your business — we’ll build a custom growth plan within 12 hours.'}</p>
          <div className="cta-buttons">
            <button className="cta-white cursor-pointer" onClick={() => openModal('rfp')}>
              Request a Custom Proposal
            </button>
            <button className="cta-outline cursor-pointer" onClick={() => openModal('lead')}>
              Book a Strategy Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
