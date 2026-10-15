'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    // Respect user's motion preferences
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const selectors = [
      '.sec-tag',
      '.sec-h2',
      '.sec-sub',
      '.aln',
      '.scard',
      '.why-card',
      '.ind-card',
      '.cat-card',
      '.pillar',
      '.rc',
      '.wc',
      '.deliv-item',
      '.problem-item',
      '.cap-card',
      '.audience',
      '.proc-step',
      '.proc',
      '.stat-box',
      '.sp-s',
      '.attr-card',
      '.related-card',
      '.faq-item',
      '.trust-strip',
      '.explore-hub',
      '.cta-band',
      '.cs-inner',
      '.blog-card',
      '.val',
      '.ws',
      '.ni',
      '.lt-card',
      '.wk-card',
    ];

    const selectorString = selectors.join(', ');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(selectorString);

      elements.forEach((el) => {
        // Skip elements inside hero banners (they have their own tailored load animations)
        if (el.closest('.hero') || el.closest('.sp-hero') || el.closest('.cat-hero')) {
          return;
        }

        if (!el.classList.contains('motion-ready')) {
          el.classList.add('motion-ready');

          // Check if parent is a grid or container for cascading stagger
          const parent = el.parentElement;
          if (parent) {
            const isGrid =
              parent.classList.contains('sg') ||
              parent.classList.contains('sg2') ||
              parent.classList.contains('sg4') ||
              parent.classList.contains('why-grid') ||
              parent.classList.contains('industry-grid') ||
              parent.classList.contains('cat-grid') ||
              parent.classList.contains('pillars') ||
              parent.classList.contains('rg') ||
              parent.classList.contains('wg') ||
              parent.classList.contains('deliv-grid') ||
              parent.classList.contains('problem-grid') ||
              parent.classList.contains('cap-grid') ||
              parent.classList.contains('audience-grid') ||
              parent.classList.contains('process-grid') ||
              parent.classList.contains('stats-strip') ||
              parent.classList.contains('sp-stats') ||
              parent.classList.contains('vals') ||
              parent.classList.contains('wstats') ||
              parent.classList.contains('lt-grid');

            if (isGrid) {
              const siblings = Array.from(parent.children);
              const index = siblings.indexOf(el);
              if (index > 0) {
                const delay = Math.min(index * 60, 300);
                (el as HTMLElement).style.transitionDelay = `${delay}ms`;
              }
            }
          }

          // If already in the current viewport, reveal immediately
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('revealed');
          } else {
            observer.observe(el);
          }
        }
      });
    };

    // Run after DOM has updated
    const timer = setTimeout(observeElements, 50);

    // Also observe any dynamic mutations (e.g. tabs or filters)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
