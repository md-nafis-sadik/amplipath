'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/markdown';
import { useModal } from '@/components/ModalContext';

interface TocItem {
  id: string;
  title: string;
  number?: string;
}

function renderAuthorRole(role?: string | null) {
  if (!role) {
    return (
      <>
        Founder &amp; CEO of <Link href="/about">Amplipath</Link> &amp; Owner of{' '}
        <a href="https://boostfunders.com" target="_blank" rel="noopener">
          Boostfunders
        </a>
      </>
    );
  }
  if (role.includes('<a ')) {
    return <span dangerouslySetInnerHTML={{ __html: role }} />;
  }
  if (role.includes('Amplipath') && role.includes('Boostfunders')) {
    return (
      <>
        Founder &amp; CEO of <Link href="/about">Amplipath</Link> &amp; Owner of{' '}
        <a href="https://boostfunders.com" target="_blank" rel="noopener">
          Boostfunders
        </a>
      </>
    );
  }
  return <>{role}</>;
}

export function extractTocFromHtml(htmlContent: string): TocItem[] {
  if (!htmlContent) return [];
  const items: TocItem[] = [];
  const h2Regex = /<h2([^>]*)>([\s\S]*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  let counter = 0;

  while ((match = h2Regex.exec(htmlContent)) !== null) {
    const attrs = match[1] || '';
    const rawTitle = match[2].replace(/<[^>]+>/g, '').trim();
    if (!rawTitle) continue;

    let id = '';
    const prevSubstr = htmlContent.slice(Math.max(0, match.index - 350), match.index);
    const secMatch = prevSubstr.match(/<section[^>]*id=["']([^"']+)["'][^>]*>(?:(?!<\/section>)[\s\S])*?$/i);
    if (secMatch) {
      id = secMatch[1];
    } else {
      const idMatch = attrs.match(/id=["']([^"']+)["']/i);
      if (idMatch) id = idMatch[1];
    }

    if (!id) {
      id = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `sec-${items.length + 1}`;
    }

    counter++;
    const number = `${counter}.`;

    let title = rawTitle;
    if (/^frequently asked questions?/i.test(title.trim())) {
      title = 'FAQs';
    }

    items.push({ id, title, number });
  }

  return items;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { openModal } = useModal();
  const articleRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // Initial SSR-compatible TOC items
  const initialToc = useMemo(() => extractTocFromHtml(post.contentHtml || ''), [post.contentHtml]);
  const [tocItems, setTocItems] = useState<TocItem[]>(initialToc);
  const [activeId, setActiveId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);

  const canonicalUrl = post.canonicalUrl
    ? (post.canonicalUrl.startsWith('http') ? post.canonicalUrl : `https://amplipath.com${post.canonicalUrl}`)
    : `https://amplipath.com/blog/${post.slug}`;

  // Set up window.openPop for any raw onclick="openPop('rfp')" inside editor HTML
  useEffect(() => {
    (window as any).openPop = (type: string) => {
      openModal(type === 'lead' ? 'lead' : 'rfp');
    };
    return () => {
      delete (window as any).openPop;
    };
  }, [openModal]);

  // Ensure <html> has 'js' class for animations
  useEffect(() => {
    document.documentElement.classList.add('js');
  }, []);

  // Sync DOM headings: ensure all <h2> have IDs matching TOC items
  useEffect(() => {
    if (!articleRef.current) return;
    const h2Elements = Array.from(articleRef.current.querySelectorAll('h2'));
    const detected: TocItem[] = [];
    let counter = 0;

    h2Elements.forEach((h2) => {
      if (
        h2.closest('.apb-author') ||
        h2.closest('.apb-endcta') ||
        h2.closest('.apb-side') ||
        h2.closest('.apb-toc')
      ) {
        return;
      }

      const parentSec = h2.closest('section');
      let id = parentSec?.id || h2.id;
      const rawText = h2.textContent?.trim() || '';
      if (!rawText) return;

      if (!id) {
        id = rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        h2.id = id;
      }

      counter++;
      const number = `${counter}.`;

      let title = rawText;
      if (/^frequently asked questions?/i.test(title.trim())) {
        title = 'FAQs';
      }

      detected.push({ id, title, number });
    });

    if (detected.length > 0) {
      setTocItems(detected);
    }
  }, [post.contentHtml]);

  // Scroll spy, reading progress, and timeline progress
  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;
      const rect = mainRef.current.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / (scrollableHeight > 0 ? scrollableHeight : 1)));
      setScrollProgress(p);

      setShowTopBtn(window.scrollY > 800);

      // Timeline line progress
      const timelineEl = articleRef.current?.querySelector('.apb-timeline') as HTMLElement | null;
      if (timelineEl) {
        const tRect = timelineEl.getBoundingClientRect();
        const q = (window.innerHeight * 0.6 - tRect.top) / tRect.height;
        timelineEl.style.setProperty('--tl', Math.min(100, Math.max(0, q * 100)) + '%');
      }

      // TOC active section spy
      const line = window.innerHeight * 0.35;
      let currentActiveId = '';
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= line) {
            currentActiveId = item.id;
          }
        }
      }
      if (currentActiveId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [tocItems]);

  // Reveal on scroll (immediately mark elements as visible to prevent white screen)
  useEffect(() => {
    if (!articleRef.current) return;
    const rvElements = Array.from(articleRef.current.querySelectorAll('.rv'));
    rvElements.forEach((el) => el.classList.add('is-in'));
  }, [post.contentHtml]);

  // Wire up Before/After toggle and FAQ accordion inside article HTML
  useEffect(() => {
    if (!articleRef.current) return;
    const root = articleRef.current;

    // 1. Before/After Switchers
    const baWidgets = Array.from(root.querySelectorAll('.apb-ba'));
    baWidgets.forEach((ba) => {
      const btns = Array.from(ba.querySelectorAll('[data-v]'));
      btns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const v = btn.getAttribute('data-v');
          if (v) {
            ba.setAttribute('data-state', v);
            btns.forEach((x) => x.setAttribute('aria-selected', x === btn ? 'true' : 'false'));
          }
        });
      });
    });

    // 2. Smooth FAQ Accordion
    const faqs = Array.from(root.querySelectorAll('.apb-faq'));
    faqs.forEach((faq) => {
      const summary = faq.querySelector('summary');
      const answer = faq.querySelector('.apb-faq-a') as HTMLElement | null;
      if (!summary || !answer) return;

      summary.addEventListener('click', (e) => {
        if (!answer.animate) return;
        e.preventDefault();
        const details = faq as HTMLDetailsElement;
        if (details.open) {
          const h = answer.offsetHeight;
          const anim = answer.animate(
            [{ height: `${h}px`, opacity: 1 }, { height: '0px', opacity: 0 }],
            { duration: 250, easing: 'ease' }
          );
          anim.onfinish = () => {
            details.open = false;
          };
        } else {
          details.open = true;
          const h = answer.offsetHeight;
          answer.animate(
            [{ height: '0px', opacity: 0 }, { height: `${h}px`, opacity: 1 }],
            { duration: 280, easing: 'ease' }
          );
        }
      });
    });
  }, [post.contentHtml]);

  // Smooth scroll handler for TOC links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    // Close mobile TOC details if open
    const mtoc = document.querySelector('.apb-mtoc') as HTMLDetailsElement | null;
    if (mtoc) mtoc.open = false;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  };

  // Click interceptor for buttons/links inside post.contentHtml
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest('a, button');
    if (!target) return;

    const href = target.getAttribute('href');
    const onclickAttr = target.getAttribute('onclick') || '';
    const text = target.textContent?.trim().toLowerCase() || '';

    if (
      onclickAttr.includes('rfp') ||
      onclickAttr.includes('openPop') ||
      text.includes('request a proposal')
    ) {
      e.preventDefault();
      openModal('rfp');
    }
  };

  // Copy URL with toast
  const handleCopyLink = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setToastMessage('Link copied to clipboard!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      // Fallback
      setToastMessage('Link copied!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="apb-wrapper relative bg-white">
      {/* Reading Progress Bar (Fixed at top) */}
      <div className="apb-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }}></span>
      </div>

      <div className="apb" id="apb-top" ref={articleRef} onClick={handleContentClick}>
        <div className="apb-wrap">
          {/* Breadcrumbs (Image 3 Red Mark) */}
          <nav className="apb-crumbs" aria-label="Breadcrumb">
            <Link href="/" aria-label="Home">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z" />
              </svg>
            </Link>
            <i>/</i>
            <Link href="/blog">Blog</Link>
            <i>/</i>
            <Link href={`/blog?category=${post.categorySlug || 'aeo-geo'}`}>
              {post.category}
            </Link>
            <i>/</i>
            <span aria-current="page">{post.title}</span>
          </nav>

          <div className="apb-grid">
            {/* Main Article Content Column */}
            <article className="apb-main" ref={mainRef} itemScope itemType="https://schema.org/BlogPosting">
              <header className="apb-head">
                <Link className="apb-cat" href={`/blog?category=${post.categorySlug || 'aeo-geo'}`}>
                  {post.category}
                </Link>
                <h1 itemProp="headline">
                  {post.title}
                </h1>
                {/* Byline (Image 3 Red Mark) */}
                <div className="apb-byline">
                  <img
                    src={post.authorImage || '/images/team/adebayo-ogungbemile-320.jpg'}
                    alt={post.authorName || 'Author'}
                    width={48}
                    height={48}
                  />
                  <div className="apb-by-who">
                    <a href="#about-the-author" itemProp="author">
                      {post.authorName || 'Adebayo Ogungbemile'}
                    </a>
                    <span>{renderAuthorRole(post.authorRole)}</span>
                  </div>
                  <div className="apb-by-meta">
                    <span>
                      <svg viewBox="0 0 24 24">
                        <path d="M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2zm-2 8h14v10H5z" />
                      </svg>
                      <time dateTime={post.date} itemProp="datePublished">
                        {post.dateTxt || post.date}
                      </time>
                    </span>
                    <span>
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.4l3.3 3.3-1.4 1.4-3.9-3.9V6h2z" />
                      </svg>
                      {post.readTime || '5 min read'}
                    </span>
                  </div>
                </div>
              </header>

              {/* Cover Image */}
              {post.featuredImage && (
                <figure className="apb-cover">
                  <img
                    src={post.featuredImage}
                    alt={post.imageAlt || post.title}
                    width={1728}
                    height={910}
                    fetchPriority="high"
                    itemProp="image"
                  />
                </figure>
              )}

              {/* Mobile Collapsible TOC */}
              {tocItems.length > 0 && (
                <details className="apb-mtoc">
                  <summary>
                    On this page <span aria-hidden="true"></span>
                  </summary>
                  <ol>
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a href={`#${item.id}`} onClick={(e) => handleAnchorClick(e, item.id)}>
                          {item.number ? <em style={{ marginRight: '6px' }}>{item.number}</em> : null}{' '}
                          <span>{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}

              {/* Article Rich HTML Body */}
              <div
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
              />

              {/* About the Author Card (Image 1 Red Mark) */}
              <section className="apb-author rv" id="about-the-author" aria-label="About the author">
                <div className="apb-author-photo">
                  <img
                    src={post.authorImage || '/images/team/adebayo-ogungbemile-320.jpg'}
                    alt={`${post.authorName || 'Author'}, ${post.authorRole?.replace(/<[^>]+>/g, '') || 'Founder & CEO of Amplipath'}`}
                    width={320}
                    height={457}
                    loading="lazy"
                  />
                </div>
                <div className="apb-author-body">
                  <p className="apb-author-eyebrow">About the author:</p>
                  <h2 className="apb-author-name">{post.authorName || 'Adebayo Ogungbemile'}</h2>
                  <div className="apb-author-role">
                    {renderAuthorRole(post.authorRole)}
                  </div>
                  <div className="apb-author-bio">
                    {post.authorBio ? (
                      <div dangerouslySetInnerHTML={{ __html: post.authorBio }} />
                    ) : (
                      <p>
                        Adebayo Ogungbemile is the founder and CEO of <Link href="/about">Amplipath</Link>, an integrated digital marketing, technology and AI agency. He leads the company&apos;s work across SEO, generative engine optimization (GEO), answer engine optimization (AEO), paid advertising, website and mobile app development, analytics, and AI automation.
                      </p>
                    )}
                  </div>
                  <div className="apb-follow">
                    <span>Follow the expert:</span>
                    {post.authorLinkedin && (
                      <a
                        href={post.authorLinkedin}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${post.authorName} on LinkedIn`}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.2h4.56V23H.22zM8.1 8.2h4.37v2.02h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7V23h-4.56v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V23H8.1z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </section>
            </article>

            {/* Sidebar Column: Dynamic TOC + Sticky CTA Widget */}
            <aside className="apb-side" aria-label="Article sidebar">
              {tocItems.length > 0 && (
                <nav className="apb-toc" aria-label="Table of contents">
                  <div className="apb-toc-h">
                    <b>Table of Contents</b>
                    <div className="apb-share" aria-label="Follow Amplipath & Share">
                      <a
                        href="https://www.facebook.com/amplipath"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Amplipath on Facebook"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/amplipath"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Amplipath on LinkedIn"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.2h4.56V23H.22zM8.1 8.2h4.37v2.02h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7V23h-4.56v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V23H8.1z" />
                        </svg>
                      </a>
                      <a
                        href="https://x.com/amplipaths"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Amplipath on X"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.pinterest.com/Amplipaths"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Amplipath on Pinterest"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <button
                        type="button"
                        className="apb-copy"
                        onClick={handleCopyLink}
                        aria-label="Copy link"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M10.6 13.4a1 1 0 010-1.4l3.5-3.5a3 3 0 114.2 4.2l-2 2a1 1 0 11-1.4-1.4l2-2a1 1 0 10-1.4-1.4l-3.5 3.5a1 1 0 01-1.4 0zm2.8-2.8a1 1 0 010 1.4l-3.5 3.5a3 3 0 11-4.2-4.2l2-2a1 1 0 111.4 1.4l-2 2a1 1 0 101.4 1.4l3.5-3.5a1 1 0 011.4 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="apb-toc-bar">
                    <span style={{ transform: `scaleX(${scrollProgress})` }}></span>
                  </div>
                  <ol>
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={activeId === item.id ? 'is-active' : ''}
                          onClick={(e) => handleAnchorClick(e, item.id)}
                        >
                          {item.number ? <em style={{ marginRight: '6px' }}>{item.number}</em> : null}{' '}
                          <span>{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Sticky CTA Widget (Image 2 Right Red Mark) */}
              <div className="apb-sticky">
                <div className="apb-cta">
                  <span className="apb-cta-ribbon">AI SEARCH</span>
                  <h3>Let&apos;s get your brand cited by AI</h3>
                  <ul>
                    <li>More visibility on Google &amp; AI Overviews</li>
                    <li>Get cited on ChatGPT, Gemini &amp; Perplexity</li>
                    <li>Fix the technical issues blocking crawlers</li>
                    <li>Content built to be quoted and trusted</li>
                    <li>Reporting tied to leads, not vanity metrics</li>
                  </ul>
                  <button
                    type="button"
                    className="apb-btn full cursor-pointer"
                    onClick={() => openModal('rfp')}
                  >
                    Request a Proposal
                  </button>
                  <Link href="/free-audit" className="apb-cta-link">
                    Or get a free audit &rarr;
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          className={`apb-top ${showTopBtn ? 'is-on' : ''}`}
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 5l7 7-1.4 1.4L13 8.8V20h-2V8.8l-4.6 4.6L5 12z" />
          </svg>
        </button>

        {/* Toast Notification */}
        <div className={`apb-toast ${showToast ? 'is-on' : ''}`} role="status" aria-live="polite">
          {toastMessage || 'Link copied'}
        </div>
      </div>
    </div>
  );
}
