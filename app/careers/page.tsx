'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface JobRole {
  id: string;
  title: string;
  category: 'Engineering' | 'Growth & Ads' | 'SEO & Search' | 'Strategy' | 'Content';
  categoryLabel: string;
  type: string;
  location: string;
  compensation: string;
  compDetail: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const OPEN_ROLES: JobRole[] = [
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    category: 'Engineering',
    categoryLabel: 'Technology & Engineering',
    type: 'Project-Based / Contract',
    location: 'Remote · Worldwide',
    compensation: 'Project-Based',
    compDetail: 'Per website / landing page deliverable',
    description: 'Build fast, responsive, conversion-focused websites and landing pages for Amplipath clients using modern web technologies.',
    responsibilities: [
      'Translate design wireframes and UX specs into clean, responsive web pages and components',
      'Optimize Core Web Vitals, page load speeds, and mobile accessibility for global audiences',
      'Integrate interactive UI elements, lead capture forms, and analytics tracking pixels',
      'Collaborate asynchronously with design and SEO leads to ensure technical search friendliness'
    ],
    requirements: [
      'Strong proficiency in modern HTML5, CSS3, JavaScript/TypeScript, and React or Next.js',
      'Proven experience building responsive, mobile-first websites with clean, maintainable code',
      'Understanding of technical SEO principles, semantic markup, and performance optimization',
      'Portfolio of live websites or web applications that you have built or contributed to'
    ]
  },
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Software Developer',
    category: 'Engineering',
    categoryLabel: 'Technology & Engineering',
    type: 'Project-Based / Contract',
    location: 'Remote · Worldwide',
    compensation: 'Project-Based',
    compDetail: 'Per project milestone / build',
    description: 'Build end-to-end web applications, custom platforms, client portals, and third-party API integrations that scale.',
    responsibilities: [
      'Architect and develop full-stack applications with robust backend APIs and clean frontend interfaces',
      'Build secure database schemas, user authentication, and multi-tenant logic',
      'Integrate payment gateways (Stripe, Paystack, Flutterwave), CRMs, and marketing automation APIs',
      'Deploy, monitor, and maintain serverless and cloud infrastructure for client systems'
    ],
    requirements: [
      'Solid experience with React/Next.js, Node.js, Python, or serverless cloud backends',
      'Experience with SQL/NoSQL databases, RESTful and GraphQL APIs, and third-party integrations',
      'Knowledge of web security best practices, data protection, and scalable architecture',
      'A track record of shipping production-grade applications with clean documentation'
    ]
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Developer (Flutter / React Native)',
    category: 'Engineering',
    categoryLabel: 'Technology & Engineering',
    type: 'Project-Based / Contract',
    location: 'Remote · Worldwide',
    compensation: 'Project-Based',
    compDetail: 'Per app sprint / milestone',
    description: 'Build intuitive, high-performance cross-platform mobile apps for iOS and Android across fintech, ecommerce, and sports tech.',
    responsibilities: [
      'Develop cross-platform mobile applications using Flutter or React Native',
      'Connect mobile frontends to REST/GraphQL APIs and cloud backend services',
      'Manage app store submission, guidelines compliance, and deployment pipelines',
      'Ensure smooth 60fps animations, offline capabilities, and high-performance native bridges'
    ],
    requirements: [
      'Demonstrated experience with Flutter (Dart) or React Native (TypeScript)',
      'At least 2 published apps on Google Play Store or Apple App Store',
      'Solid grasp of state management, mobile UI patterns, and secure local storage',
      'Strong communication skills for asynchronous sprint reviews and milestone delivery'
    ]
  },
  {
    id: 'ai-developer',
    title: 'AI Systems Developer',
    category: 'Engineering',
    categoryLabel: 'Technology & Engineering',
    type: 'Project-Based / Contract',
    location: 'Remote · Worldwide',
    compensation: 'Project-Based',
    compDetail: 'Per AI system / workflow deliverable',
    description: 'Build custom AI workflows, autonomous agent systems, WhatsApp bots, and LLM-powered business automation tools.',
    responsibilities: [
      'Engineer custom AI pipelines integrating OpenAI, Claude, Gemini, or open-source LLMs',
      'Build intelligent conversational agents and WhatsApp chatbots for lead qualification and support',
      'Develop retrieval-augmented generation (RAG) systems over proprietary client knowledge bases',
      'Connect AI agent workflows to client CRMs, databases, and operational software'
    ],
    requirements: [
      'Hands-on experience with LLM APIs, prompt engineering, and agent frameworks (LangChain, LlamaIndex, etc.)',
      'Backend scripting proficiency in Python or Node.js with API integration experience',
      'Understanding of token efficiency, streaming responses, and reliable error handling',
      'Passionate about practical, commercial AI applications that save businesses real hours'
    ]
  },
  {
    id: 'paid-ads',
    title: 'Paid Ads Specialist',
    category: 'Growth & Ads',
    categoryLabel: 'Growth & Paid Media',
    type: 'Project-Based / Contract',
    location: 'Remote · Worldwide',
    compensation: 'Project-Based',
    compDetail: 'Per campaign managed / performance bonus',
    description: 'Plan, execute, and scale paid acquisition campaigns across Meta Ads, Google Ads, TikTok Ads, and YouTube Ads.',
    responsibilities: [
      'Formulate paid advertising funnels from top-of-funnel discovery to high-intent retargeting',
      'Manage ad budgets, creative iterations, audience segmentation, and A/B split testing',
      'Implement server-side tracking (Conversions API, Google Tag Manager, GA4 event tracking)',
      'Analyze ROAS, CAC, and conversion metrics to optimize campaign velocity continuously'
    ],
    requirements: [
      'Demonstrated track record of managing paid spend with verified positive ROAS or CPA benchmarks',
      'Deep expertise in Meta Ads Manager and Google Ads; TikTok Ads and YouTube experience is a plus',
      'Data-driven mindset with analytical proficiency in Google Analytics 4 and Tag Manager',
      'Familiarity with African, North American, or UK consumer acquisition markets'
    ]
  },
  {
    id: 'smm-manager',
    title: 'Social Media & Community Manager',
    category: 'Growth & Ads',
    categoryLabel: 'Growth & Paid Media',
    type: 'Project-Based / Contract',
    location: 'Remote · Worldwide',
    compensation: 'Project-Based',
    compDetail: 'Per client retainer / monthly milestone',
    description: 'Grow and engage brand audiences across LinkedIn, X (Twitter), Instagram, and TikTok with high-impact organic storytelling.',
    responsibilities: [
      'Develop monthly social media content calendars aligned with brand positioning and sales goals',
      'Craft compelling short-form video hooks, graphic carousel briefs, and authoritative text posts',
      'Actively manage community conversations, comment replies, and brand partner interactions',
      'Compile monthly social performance reports highlighting audience growth and engagement rate'
    ],
    requirements: [
      'Proven experience growing social channels for B2B brands, tech companies, or direct-to-consumer businesses',
      'Exceptional copywriting ability with keen awareness of modern social trends and humor',
      'Familiarity with Canva, Figma, or basic video editing tools for rapid content creation',
      'Proactive attitude and strong organizational discipline for consistent publishing'
    ]
  },
  {
    id: 'seo-specialist',
    title: 'SEO & GEO/AEO Specialist',
    category: 'SEO & Search',
    categoryLabel: 'SEO & Search',
    type: 'Project-Based / Contract',
    location: 'Remote · Worldwide',
    compensation: 'Project-Based',
    compDetail: 'Per SEO audit / monthly organic retainer',
    description: 'Lead technical SEO, keyword architecture, and modern Generative Engine Optimization (GEO/AEO) for AI search engines.',
    responsibilities: [
      'Conduct in-depth technical SEO audits covering crawlability, indexation, schema, and Core Web Vitals',
      'Formulate keyword maps and content cluster strategies targeting commercial search intent',
      'Implement Generative Engine Optimization tactics so clients get cited in ChatGPT, Gemini, and Perplexity',
      'Execute high-authority digital PR, link outreach, and local search optimization'
    ],
    requirements: [
      '3+ years of verifiable experience driving organic search growth for ecommerce or service websites',
      'Proficiency with industry tools: Ahrefs, SEMrush, Screaming Frog, Google Search Console',
      'Clear understanding of AI search mechanics (GEO, citation frequency, entity search)',
      'Ability to articulate technical recommendations clearly to developers and business founders'
    ]
  },
  {
    id: 'marketing-strategist',
    title: 'Marketing Strategist',
    category: 'Strategy',
    categoryLabel: 'Strategy & Management',
    type: 'Project-Based / Contract',
    location: 'Remote · Worldwide',
    compensation: 'Project-Based',
    compDetail: 'Per strategy deliverable / client roadmap',
    description: 'Develop comprehensive, omnichannel go-to-market strategies that connect marketing, technology, and AI into one cohesive growth engine.',
    responsibilities: [
      'Lead discovery audits analyzing client market positioning, competitors, and growth funnels',
      'Craft end-to-end 90-day growth blueprints spanning acquisition, conversion, and retention',
      'Guide multidisciplinary teams (SEO, Dev, Paid Media) to ensure alignment around client business KPIs',
      'Deliver strategic briefing decks and executive performance reviews'
    ],
    requirements: [
      '5+ years in digital marketing, growth strategy, or agency leadership',
      'Deep fluency across multiple growth channels: SEO, paid ads, lifecycle email, and conversion rate optimization',
      'Strong commercial acumen with the ability to link marketing tactics to revenue and customer lifetime value',
      'Exceptional presentation and client communication skills'
    ]
  },
  {
    id: 'content-writer',
    title: 'Content Writer & Copywriter',
    category: 'Content',
    categoryLabel: 'Content & Copy',
    type: 'Project-Based / Contract',
    location: 'Remote · Worldwide',
    compensation: 'Project-Based',
    compDetail: 'Per article / copywriting project',
    description: 'Craft research-backed long-form articles, high-converting landing page copy, and strategic thought leadership pieces.',
    responsibilities: [
      'Write original, authoritative long-form content that answers real search intent and ranks in Google and AI engines',
      'Draft persuasive landing page copy, value propositions, and email sequences that drive action',
      'Interview subject matter experts and turn complex technical topics into engaging, accessible prose',
      'Proofread and edit copy to uphold rigorous brand tone of voice and editorial standards'
    ],
    requirements: [
      'Exceptional native-level English writing and editing capability with zero tolerance for fluff',
      'Experience writing about technology, marketing, SaaS, business, or finance',
      'Understanding of on-page SEO best practices (heading hierarchy, keyword integration, entity coverage)',
      'Portfolio of published articles, website copy, or case studies that demonstrate strong research'
    ]
  }
];

const CATEGORIES = [
  'All Roles',
  'Technology & Engineering',
  'Growth & Paid Media',
  'SEO & Search',
  'Strategy & Management',
  'Content & Copy'
];

export default function CareersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Roles');
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    role: 'Frontend Developer',
    portfolio: '',
    pitch: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const filteredRoles = selectedCategory === 'All Roles'
    ? OPEN_ROLES
    : OPEN_ROLES.filter(r => r.categoryLabel === selectedCategory);

  const handleApplyClick = (roleTitle: string) => {
    setFormData(prev => ({ ...prev, role: roleTitle }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        if (firstInputRef.current) firstInputRef.current.focus();
      }, 500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          country: formData.country,
          role: formData.role,
          portfolioUrl: formData.portfolio,
          whyAmplipath: formData.pitch
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Application submission failed. Please try again.');
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong while submitting. Please try again or email hello@amplipath.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans antialiased">
      {/* ── 1. HERO SECTION (MailerLite Style) ── */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Careers at Amplipath &bull; We&apos;re Hiring Remotely
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Work at Amplipath
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            We’re a global remote team that puts people, autonomy, and craftsmanship first. 
            Work from where you want, collaborate with top specialists across marketing, tech, and AI, 
            and be rewarded for the measurable impact you produce.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#open-roles"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Explore Open Roles ({OPEN_ROLES.length})</span>
              <span>&darr;</span>
            </a>
            <a
              href="#culture"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
            >
              <span>Our Culture &amp; Perks</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* Quick Perks Bar */}
          <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-100">
              <div className="text-base font-bold text-slate-900 mb-0.5">🌍 100% Remote</div>
              <div className="text-xs text-slate-500">Work from anywhere in the world</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-100">
              <div className="text-base font-bold text-slate-900 mb-0.5">⏱️ Flexible Hours</div>
              <div className="text-xs text-slate-500">Autonomous, asynchronous flow</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-100">
              <div className="text-base font-bold text-slate-900 mb-0.5">💰 Project-Based Pay</div>
              <div className="text-xs text-slate-500">Clear rates per milestone</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-100">
              <div className="text-base font-bold text-slate-900 mb-0.5">🚀 Fast Growth</div>
              <div className="text-xs text-slate-500">Priority for lead retainers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OPEN POSITIONS SECTION (MailerLite Style Filterable List) ── */}
      <section id="open-roles" className="py-20 md:py-28 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-extrabold tracking-widest text-blue-600 uppercase mb-2">
            CURRENT OPPORTUNITIES
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Find your next opportunity
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            All roles are 100% remote. We evaluate talent based on past craft, real problem-solving, 
            and reliability — not geographic borders.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Roles List */}
        <div className="space-y-4">
          {filteredRoles.map(role => {
            const isExpanded = expandedRoleId === role.id;
            return (
              <div
                key={role.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs hover:shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        {role.categoryLabel}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {role.location}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {role.type}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                      {role.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                      {role.description}
                    </p>
                  </div>

                  {/* Actions / Meta */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Compensation</div>
                      <div className="text-sm font-bold text-slate-900">{role.compensation}</div>
                      <div className="text-xs text-slate-500">{role.compDetail}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                        className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        {isExpanded ? 'Hide Details ▲' : 'View Details ▼'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApplyClick(role.title)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all hover:-translate-y-0.5"
                      >
                        Apply Now &rarr;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="px-6 pb-8 pt-4 md:px-8 border-t border-slate-100 bg-slate-50/60">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                          What you&apos;ll be doing:
                        </h4>
                        <ul className="space-y-2">
                          {role.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                              <span className="text-blue-600 font-bold shrink-0">✓</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                          What we&apos;re looking for:
                        </h4>
                        <ul className="space-y-2">
                          {role.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                              <span className="text-emerald-600 font-bold shrink-0">●</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Ready to make an impact? We review every portfolio submission personally.
                      </span>
                      <button
                        type="button"
                        onClick={() => handleApplyClick(role.title)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
                      >
                        Apply for {role.title} &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* General Pitch CTA */}
        <div className="mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold mb-1">Don&apos;t see your exact role listed?</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We are constantly onboarding exceptional marketing, design, and development talent. 
              Submit an open application and tell us what you do best.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleApplyClick('General Application / Specialist')}
            className="px-5 py-2.5 bg-white text-slate-950 hover:bg-blue-50 font-bold text-xs rounded-xl whitespace-nowrap transition-all shadow-sm"
          >
            Send Open Application &rarr;
          </button>
        </div>
      </section>

      {/* ── 3. WE FOCUS ON PEOPLE (MailerLite Culture Section) ── */}
      <section id="culture" className="py-20 md:py-28 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-extrabold tracking-widest text-blue-600 uppercase mb-2">
              OUR CULTURE &amp; VALUES
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              We focus on people &amp; outcomes
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              A culture of autonomy, trust, and craftsmanship helps our global team and clients thrive together.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 md:p-8 rounded-2xl bg-[#fafbfc] border border-slate-200 hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-600 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                🌍
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100% Remote-First</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Work from anywhere in the world. No morning commute, no relocation required. 
                All communication and collaboration is online and asynchronous.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-[#fafbfc] border border-slate-200 hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                🎯
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Outcomes Over Hours</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                We don’t track chair time or surveillance software. We care about the craftsmanship 
                of your code, the efficacy of your campaigns, and client results.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-[#fafbfc] border border-slate-200 hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-600 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                💰
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Transparent Milestone Pay</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Clear scope and clear payment rates for every deliverable. No unpaid trial tasks, 
                no ambiguous deductions, and guaranteed on-time disbursements.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-[#fafbfc] border border-slate-200 hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-100/70 text-purple-600 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                🚀
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Long-Term Growth Upside</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Early contributors get priority for recurring client accounts, higher-tier milestone 
                budgets, and full leadership retainers as we scale globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. HOW WE WORK / PROCESS (MailerLite Style) ── */}
      <section className="py-20 md:py-24 max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-extrabold tracking-widest text-blue-600 uppercase mb-2">
            TRANSPARENT PROCESS
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            What happens after you apply?
          </h2>
          <p className="text-slate-600 text-xs md:text-sm">
            We respect your time. No 6-round corporate interviews or automated screening bots.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">Application &amp; Portfolio Review</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our core team reviews your past work and portfolio personally. We look for real-world execution, 
              attention to detail, and problem-solving.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">Quick Intro &amp; Alignment Call</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A 20-minute informal conversation to discuss how you like to work, your availability, 
              and upcoming client projects that match your skills.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">Paid Milestone Kickoff</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We agree on a clear scope, rate, and timeline for your first paid deliverable. 
              Deliver great work, get paid promptly, and build continuous momentum.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. APPLICATION FORM (Clean, High-Conversion Card) ── */}
      <section ref={formRef} id="apply" className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          {submitted ? (
            <div className="p-10 md:p-14 bg-white rounded-3xl border border-emerald-200 shadow-md text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-6">
                🎉
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                Application Received!
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Thank you for applying to collaborate with Amplipath. Our team reviews all applications 
                personally and will get in touch via email within 3 business days.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8 md:p-12">
              <div className="max-w-2xl mb-8">
                <div className="text-xs font-extrabold tracking-widest text-blue-600 uppercase mb-2">
                  JOIN OUR TALENT NETWORK
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                  Submit your application
                </h2>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  Fill in your details and link your portfolio or past work. We review every application personally.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      First Name *
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      required
                      placeholder="e.g. Alex"
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smith"
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Country &bull; Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nigeria, United Kingdom, Canada..."
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Role Applying For *
                    </label>
                    <select
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition-all bg-white"
                    >
                      {OPEN_ROLES.map(r => (
                        <option key={r.id} value={r.title}>
                          {r.title} ({r.categoryLabel})
                        </option>
                      ))}
                      <option value="General Application / Specialist">
                        General Application / Other Specialist
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Portfolio, GitHub, or LinkedIn URL *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://yourwork.com or linkedin.com/in/you"
                      value={formData.portfolio}
                      onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Why do you want to collaborate with Amplipath? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us briefly about the projects you're proudest of, what you bring to the table, and what kind of work excites you..."
                    value={formData.pitch}
                    onChange={e => setFormData({ ...formData, pitch: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition-all resize-y"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? 'Submitting Application to Talent Team...' : 'Submit Application →'}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-3">
                    🔒 Your information is confidential and will only be reviewed by the Amplipath talent team.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
