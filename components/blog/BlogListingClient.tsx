'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useModal } from '@/components/ModalContext';

export interface PostCardData {
  slug: string;
  title: string;
  date: string;
  dateTxt?: string;
  category: string;
  categorySlug?: string;
  excerpt: string;
  readTime: string;
  featuredImage?: string | null;
  imageAlt?: string | null;
  authorName?: string;
  authorRole?: string | null;
  authorImage?: string | null;
}

interface Props {
  initialPosts: PostCardData[];
}

const CATEGORIES = [
  { label: 'All', key: 'all' },
  { label: 'SEO', key: 'seo' },
  { label: 'AEO / GEO', key: 'aeo-geo' },
  { label: 'Paid Ads', key: 'paid-ads' },
  { label: 'Social Media', key: 'social-media' },
  { label: 'Content Marketing', key: 'content' },
  { label: 'Web & App', key: 'web-app' },
  { label: 'AI Automation', key: 'ai-automation' },
];

function stripHtml(html?: string | null): string {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').trim();
}

export default function BlogListingClient({ initialPosts }: Props) {
  const { openModal } = useModal();
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(9);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync with ?category= URL query parameter on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      if (catParam) {
        setCat(catParam);
      }
    }
  }, []);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCategoryChange = (catKey: string) => {
    setCat(catKey);
    setShown(9);
    if (typeof window !== 'undefined' && window.history.replaceState) {
      const newUrl = catKey === 'all' ? window.location.pathname : `?category=${catKey}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  const filteredPosts = useMemo(() => {
    const query = q.trim().toLowerCase();
    return initialPosts.filter((p) => {
      const matchCat =
        cat === 'all' ||
        (p.categorySlug && p.categorySlug.toLowerCase() === cat.toLowerCase()) ||
        (p.category && p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(cat.toLowerCase()));
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  }, [initialPosts, cat, q]);

  const displayedPosts = filteredPosts.slice(0, shown);
  const isFeatureMode = cat === 'all' && !q && filteredPosts.length > 0;

  const isArticleNew = (dateStr?: string) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return false;
    return Date.now() - date.getTime() < 14 * 24 * 60 * 60 * 1000; // 14 days
  };

  const currentCategoryLabel = CATEGORIES.find((c) => c.key === cat)?.label || 'Articles';

  return (
    <div className="abl">
      {/* Hero Section */}
      <header className="abl-hero">
        <div className="abl-wrap abl-hero-in">
          <div>
            <span className="abl-eyebrow">Blog &amp; Insights</span>
            <h1>
              Get found. Get cited. <span>Get chosen.</span>
            </h1>
            <p>
              <b>Practical guides from the Amplipath team.</b> SEO, AI search (GEO and AEO), paid ads, websites, apps and AI automation, explained by the people who do the work.
            </p>
          </div>
          <label className="abl-search" htmlFor="ablQ">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10 2a8 8 0 016.32 12.9l5.39 5.4-1.41 1.4-5.4-5.39A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
            <input
              id="ablQ"
              ref={searchInputRef}
              type="search"
              placeholder="Search articles"
              aria-label="Search articles"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setShown(9);
              }}
            />
            <kbd aria-hidden="true">/</kbd>
          </label>
        </div>
      </header>

      {/* Filter Chips Bar */}
      <div className="abl-wrap abl-bar">
        <nav className="abl-chips" aria-label="Filter by category">
          {CATEGORIES.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => handleCategoryChange(category.key)}
              className={`abl-chip ${cat === category.key ? 'is-on' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Grid */}
      <main className="abl-wrap abl-main">
        <div className="abl-sh">
          <h2>{cat === 'all' ? 'Latest articles' : currentCategoryLabel}</h2>
          <span>{filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}</span>
        </div>

        {displayedPosts.length === 0 ? (
          <div className="abl-empty">
            <b>{q ? `No articles match “${q}”` : `New ${currentCategoryLabel} guides are on the way`}</b>
            <p>
              {q
                ? 'Try a different word or browse all categories.'
                : 'We publish new insights regularly. In the meantime, browse all articles.'}
            </p>
          </div>
        ) : (
          <div className={`abl-grid ${isFeatureMode ? 'has-feat' : ''}`} aria-live="polite">
            {displayedPosts.map((post, index) => {
              const isFeaturedCard = isFeatureMode && index === 0;
              const hasNewRibbon = isArticleNew(post.date);

              return (
                <article
                  key={post.slug}
                  className={`abl-card ${isFeaturedCard ? 'is-feat' : ''}`}
                >
                  <div className="abl-thumb">
                    <img
                      src={post.featuredImage || '/images/blog/what-are-geo-and-aeo-cover-800.webp'}
                      alt={post.imageAlt || post.title}
                      width={800}
                      height={421}
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                    {hasNewRibbon && <span className="abl-new">NEW</span>}
                  </div>

                  <div className="abl-body">
                    {isFeaturedCard && <span className="abl-feat-tag">Latest guide</span>}

                    <div className="abl-meta">
                      <span className="abl-cat">{post.category}</span>
                      <span className="abl-mins">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.4l3.3 3.3-1.4 1.4-3.9-3.9V6h2z" />
                        </svg>
                        {post.readTime || '5 min read'}
                      </span>
                    </div>

                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>

                    <div className="abl-foot">
                      <img
                        src={post.authorImage || '/images/team/adebayo-ogungbemile-320.jpg'}
                        alt={post.authorName || 'Adebayo Ogungbemile'}
                        width={42}
                        height={42}
                        loading="lazy"
                      />
                      <div className="abl-who">
                        <b>{post.authorName || 'Adebayo Ogungbemile'}</b>
                        <small>{stripHtml(post.authorRole) || 'Founder & CEO of Amplipath & Owner of Boostfunders'}</small>
                      </div>
                      <div className="abl-date">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M7 2v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2V2h-2v2H9V2zm-2 8h14v10H5z" />
                        </svg>
                        <time dateTime={post.date}>{post.dateTxt || post.date}</time>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="abl-link"
                    aria-label={`Read: ${post.title}`}
                  />
                </article>
              );
            })}
          </div>
        )}

        {filteredPosts.length > shown && (
          <div className="abl-more">
            <button type="button" onClick={() => setShown((prev) => prev + 6)}>
              Load more articles
            </button>
          </div>
        )}

        {/* CTA Strip */}
        <section className="abl-cta">
          <div>
            <h2>Want this done for your business?</h2>
            <p>
              Tell us where you want to grow. We'll show you what to fix first across search, AI answers and paid channels.
            </p>
          </div>
          <div className="abl-cta-btns">
            <button
              type="button"
              className="abl-btn"
              onClick={() => openModal('rfp')}
            >
              Request a Proposal
            </button>
            <Link className="abl-btn ghost" href="/free-audit">
              Get a Free Audit
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
