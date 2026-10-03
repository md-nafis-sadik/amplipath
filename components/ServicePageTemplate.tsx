'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ServiceDetail } from '@/data/servicesData';
import { useModal } from '@/components/ModalContext';
import { getParentCategory, getParentCategoryForChild, ParentCategoryData } from '@/data/parentCategories';

interface ServicePageProps {
  data: ServiceDetail;
  serviceId: string;
  parentCategory?: ParentCategoryData;
}

export default function ServicePageTemplate({ data, serviceId, parentCategory }: ServicePageProps) {
  const { openModal } = useModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!data) {
    return <div className="p-20 text-center text-slate-600">Service information not found.</div>;
  }

  // Check if this page is a parent category page
  const parentCat = parentCategory || getParentCategory(serviceId);

  // If this is a child service page, find which parent category it belongs to
  const childParentCat = !parentCat ? getParentCategoryForChild(serviceId) : null;

  return (
    <div>
      {/* ══ SERVICE HERO ══ */}
      <div className="sp-hero">
        <div className="sp-breadcrumb">
          <Link href="/" className="hover:underline">Home</Link>
          {' / '}
          <Link href="/services" className="hover:underline">Services</Link>
          {parentCat ? (
            <>
              {' / '}
              <span>{parentCat.categoryName}</span>
            </>
          ) : childParentCat ? (
            <>
              {' / '}
              <Link href={`/services/${childParentCat.id}`} className="hover:underline">
                {childParentCat.categoryName}
              </Link>
              {' / '}
              <span>{data.shortTitle || data.eye}</span>
            </>
          ) : (
            <>
              {' / '}
              <span>{data.shortTitle || data.eye}</span>
            </>
          )}
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

      {/* ══ PARENT CATEGORY SERVICES DIRECTORY (WHEN ON PARENT PAGE) ══ */}
      {parentCat && (
        <section className="section white" id="category-services" style={{ borderBottom: '1px solid #e2e8f0', background: '#fafcff', padding: '60px 0' }}>
          <div className="container">
            <div className="sec-tag">{parentCat.categoryTag}</div>
            <h2 className="sec-h2">
              Explore All {parentCat.childServices.length} {parentCat.categoryName} Services
            </h2>
            <div className="aln"></div>
            <p className="sec-sub">
              Browse our specialized {parentCat.categoryName.toLowerCase()} solutions below. Click on any service to explore detailed capabilities, deliverables, methodology and case studies.
            </p>

            <div className="cat-layout" style={{ marginTop: '36px' }}>
              {/* Left Column: Cards List */}
              <div className="svc-list">
                {parentCat.childServices.map((svc, idx) => (
                  <Link
                    key={idx}
                    href={svc.href}
                    className="svc-card text-left no-underline block"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="svc-card-ico" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
                      {svc.icon || '⚡'}
                    </div>
                    <div className="svc-card-body">
                      <div className="svc-card-name flex items-center gap-2">
                        <span>{svc.name}</span>
                        {svc.badge && (
                          <span className="badge-new">{svc.badge}</span>
                        )}
                      </div>
                      <div className="svc-card-desc">{svc.desc}</div>
                      <div className="svc-card-link flex items-center gap-1 font-semibold">
                        <span>Explore {svc.name}</span>
                        <span>→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Right Column: Quick Nav & Proposal CTA */}
              <div className="space-y-5" style={{ position: 'sticky', top: '90px' }}>
                <div className="sidebar-box">
                  <div className="sidebar-head">Quick Navigation</div>
                  {parentCat.childServices.map((svc, idx) => (
                    <Link
                      key={idx}
                      href={svc.href}
                      className="sidebar-item no-underline flex items-center justify-between"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="sidebar-arrow">›</span>
                        <span className="sidebar-name truncate">{svc.name}</span>
                      </div>
                      {svc.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 ml-1">
                          {svc.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>

                <div className="sidebar-cta">
                  <p className="font-semibold text-slate-900 text-sm">
                    {parentCat.sidebarCta?.title || 'Need a custom strategy?'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 mb-3">
                    {parentCat.sidebarCta?.text || 'We assemble tailored capabilities into a high-ROI managed plan.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => openModal('rfp')}
                    className="btn-primary w-full text-center text-xs py-2.5 cursor-pointer"
                  >
                    {parentCat.sidebarCta?.buttonText || 'Request Custom Proposal →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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

      {/* ══ SIBLING SERVICES IN PARENT CATEGORY (FOR CHILD SERVICE PAGES) ══ */}
      {childParentCat && (
        <section className="section gray" style={{ borderTop: '1px solid #e2e8f0', background: '#f8fafc', padding: '60px 0' }}>
          <div className="container">
            <div className="sec-tag">{childParentCat.categoryTag}</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="sec-h2">Other Services in {childParentCat.categoryName}</h2>
                <div className="aln"></div>
                <p className="sec-sub" style={{ margin: 0 }}>
                  Explore complementary capabilities engineered to compound your growth across the {childParentCat.categoryName.toLowerCase()} ecosystem.
                </p>
              </div>
              <Link
                href={`/services/${childParentCat.id}`}
                className="text-sm font-bold text-blue-600 hover:text-blue-800 whitespace-nowrap flex items-center gap-1"
              >
                <span>View all {childParentCat.childServices.length} {childParentCat.categoryName} services</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {childParentCat.childServices
                .filter(s => s.slug !== serviceId && s.href !== `/services/${serviceId}`)
                .slice(0, 6)
                .map((sibling, idx) => (
                  <Link
                    key={idx}
                    href={sibling.href}
                    className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between no-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{sibling.icon || '⚡'}</span>
                        {sibling.badge && (
                          <span className="badge-new">{sibling.badge}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{sibling.name}</h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{sibling.desc}</p>
                    </div>
                    <div className="text-xs font-bold text-blue-600 hover:underline mt-3 flex items-center gap-1">
                      <span>Explore service</span>
                      <span>→</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ BOTTOM CTA BAND ══ */}
      <section className="cta-band">
        <div className="container">
          <h2>{data.ctaTitle || 'Ready to unlock measurable growth?'}</h2>
          <p>{data.ctaText || 'Tell us about your business — we’ll build a custom growth plan within 5 hours.'}</p>
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
