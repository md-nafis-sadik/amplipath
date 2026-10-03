'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useModal } from '@/components/ModalContext';

export default function AfricaMarketTemplate() {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const FAQS = [
    {
      q: 'Which African countries can Amplipath help us target?',
      a: 'Amplipath develops country-specific growth strategies across African markets, with core market capability spanning Nigeria, Ghana, Kenya and South Africa. Additional countries can be assessed according to audience demand, language, competition, advertising access, payment infrastructure and local execution requirements. We do not treat Africa as one identical audience.'
    },
    {
      q: 'Can Amplipath help an international company enter an African market?',
      a: 'Yes. We help international companies identify suitable entry markets, understand local customer behaviour, adapt their positioning, localize the digital buying journey and select appropriate channels. We generally recommend proving demand in one or two priority markets before expanding across the continent.'
    },
    {
      q: 'What is included in Amplipath’s Africa Market Services?',
      a: 'Depending on the engagement, services can include market research, opportunity assessment, entry strategy, localized websites and e-commerce, search and local SEO, AI-search visibility, paid media, content, creator campaigns, WhatsApp and CRM journeys, analytics and practical AI automation. The final scope is built around your commercial objectives and current market stage.'
    },
    {
      q: 'Can you localize our website, e-commerce store, WhatsApp journey and payment system?',
      a: 'Yes. We can build or adapt landing pages, websites and e-commerce journeys for local audiences, including relevant language, currency, offers, contact methods and mobile experiences. We can also support WhatsApp and CRM journeys and assess integrations such as Paystack, Flutterwave or M-PESA where the provider supports the country, business type and account.'
    },
    {
      q: 'What do SEO, AEO and GEO mean within your Africa market service?',
      a: 'SEO helps your business appear in traditional and local search results. AEO structures content so search and answer platforms can understand and answer customer questions clearly, while GEO focuses on visibility within generative AI experiences. We combine these practices through technical SEO, local business information, structured content and useful market-specific answers without promising guaranteed placement.'
    },
    {
      q: 'Do you run paid advertising, content and influencer campaigns across Africa?',
      a: 'Yes. We can manage search and social advertising, localized campaign content and relevant creator or influencer partnerships. Before launch, we evaluate platform availability, industry restrictions, audience behaviour and media economics in each target country. Creators are selected using audience relevance, credibility and engagement quality—not follower count alone.'
    },
    {
      q: 'How will we measure whether an African market campaign is working?',
      a: 'We establish the measurement framework before launch and connect relevant advertising, website, CRM, commerce and lead-journey data. Depending on the objective, reporting may cover qualified traffic, enquiries, WhatsApp conversations, leads, sales, conversion rate, acquisition cost and return on advertising spend. We use these results to decide whether to improve, expand or stop an activity.'
    }
  ];

  return (
    <div className="bg-white text-[#202b3c] font-sans">
      {/* ══ HERO SECTION ══ */}
      <section className="py-14 sm:py-20 lg:py-24 border-b border-slate-200 overflow-hidden bg-white">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#1A56DB] transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-[#1A56DB] transition-colors">Services</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#1A56DB] font-bold">Africa market services</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#1A56DB] mb-3.5">
                Africa market growth
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-[#141e30] leading-[1.08] tracking-[-0.045em] mb-5">
                Africa is many markets. <span className="text-[#1A56DB]">Build for the one you want to win.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7 max-w-2xl">
                Amplipath connects country-specific research, websites, search, paid media, WhatsApp and intelligent automation into one growth plan. Enter a new African market or strengthen your position in an existing one with work built around your customers and commercial goals.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openModal('rfp')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1A56DB] text-white text-sm font-bold shadow-sm hover:bg-[#1243B0] hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  Discuss your market <span aria-hidden="true">&rarr;</span>
                </button>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-white border border-slate-300 text-[#141e30] text-sm font-bold hover:border-[#1A56DB] hover:text-[#1A56DB] transition-all"
                >
                  Explore services
                </a>
              </div>
              <p className="mt-5 text-xs text-slate-500">
                For African businesses expanding regionally and international brands entering African markets.
              </p>
            </div>

            {/* System Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/70 via-slate-50 to-blue-100/50 shadow-xl shadow-blue-900/5">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-700">
                      Amplipath / Africa
                    </span>
                    <strong className="block text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      One connected growth system
                    </strong>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-blue-700 text-[10px] font-bold shadow-xs">
                    Market-led
                  </span>
                </div>

                <svg className="w-full h-auto my-5 max-w-[420px] mx-auto overflow-visible" viewBox="0 0 440 280" role="img" aria-label="Connected Africa growth system">
                  <defs>
                    <linearGradient id="sys-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop stopColor="#3d75dc" />
                      <stop offset="100%" stopColor="#1243B0" />
                    </linearGradient>
                  </defs>
                  <path d="M111 78 195 128M330 78 245 128M111 207 195 158M330 207 245 158" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="5 5" />
                  <circle cx="220" cy="143" r="63" fill="none" stroke="#bfdbfe" strokeWidth="1.5" />
                  <circle cx="220" cy="143" r="48" fill="url(#sys-grad)" />
                  <text x="220" y="138" fill="#fff" textAnchor="middle" fontSize="15" fontWeight="800">GROWTH</text>
                  <text x="220" y="157" fill="#e0e7ff" textAnchor="middle" fontSize="9.5" fontWeight="700">BUILT TO MEASURE</text>

                  <rect x="18" y="47" width="145" height="59" rx="10" fill="#fff" stroke="#bfdbfe" />
                  <text x="90" y="72" fill="#1A56DB" textAnchor="middle" fontSize="11" fontWeight="800">01 / UNDERSTAND</text>
                  <text x="90" y="89" fill="#475569" textAnchor="middle" fontSize="10.5" fontWeight="600">Local market insight</text>

                  <rect x="278" y="47" width="145" height="59" rx="10" fill="#fff" stroke="#bfdbfe" />
                  <text x="350" y="72" fill="#1A56DB" textAnchor="middle" fontSize="11" fontWeight="800">02 / BUILD</text>
                  <text x="350" y="89" fill="#475569" textAnchor="middle" fontSize="10.5" fontWeight="600">Site &amp; conversion</text>

                  <rect x="18" y="178" width="145" height="59" rx="10" fill="#fff" stroke="#bfdbfe" />
                  <text x="90" y="203" fill="#1A56DB" textAnchor="middle" fontSize="11" fontWeight="800">03 / REACH</text>
                  <text x="90" y="220" fill="#475569" textAnchor="middle" fontSize="10.5" fontWeight="600">Search, paid &amp; social</text>

                  <rect x="278" y="178" width="145" height="59" rx="10" fill="#fff" stroke="#bfdbfe" />
                  <text x="350" y="203" fill="#1A56DB" textAnchor="middle" fontSize="11" fontWeight="800">04 / LEARN</text>
                  <text x="350" y="220" fill="#475569" textAnchor="middle" fontSize="10.5" fontWeight="600">Data &amp; improvement</text>
                </svg>

                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <span className="bg-white border border-slate-200 rounded-full px-3 py-1 text-slate-700 text-xs font-semibold shadow-2xs">
                    Local context
                  </span>
                  <span className="bg-white border border-slate-200 rounded-full px-3 py-1 text-slate-700 text-xs font-semibold shadow-2xs">
                    Connected channels
                  </span>
                  <span className="bg-white border border-slate-200 rounded-full px-3 py-1 text-slate-700 text-xs font-semibold shadow-2xs">
                    Measurable outcomes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3 PRINCIPLES STRIP ══ */}
      <section className="border-b border-slate-200 bg-slate-50/80 py-6 sm:py-8">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="py-4 md:py-0 md:pr-8">
              <strong className="block text-slate-900 text-sm font-bold mb-1">Country-first planning</strong>
              <p className="text-xs text-slate-600 leading-normal">Priorities shaped around the market and audience.</p>
            </div>
            <div className="py-4 md:py-0 md:px-8">
              <strong className="block text-slate-900 text-sm font-bold mb-1">Connected execution</strong>
              <p className="text-xs text-slate-600 leading-normal">Marketing and technology working together.</p>
            </div>
            <div className="py-4 md:py-0 md:pl-8">
              <strong className="block text-slate-900 text-sm font-bold mb-1">Commercial measurement</strong>
              <p className="text-xs text-slate-600 leading-normal">Track leads, sales and the steps between them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ APPROACH SECTION ══ */}
      <section id="approach" className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#1A56DB] mb-3">
                Why this approach
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141e30] leading-tight tracking-tight mb-4">
                A continent-wide ambition needs market-level decisions.
              </h2>
              <div className="w-12 h-1 bg-[#1A56DB] rounded-full" />
            </div>
            <div className="lg:col-span-7 space-y-4 text-slate-600 text-[15px] sm:text-base leading-relaxed">
              <p>
                What works in Lagos may need a different message, buying journey or payment experience in Accra, Nairobi or Johannesburg. A strong Africa strategy starts with a specific customer, in a specific market, solving a specific problem.
              </p>
              <p>
                We first look at demand, competition, search behavior, language, channel fit, mobile experience and the route from first interaction to sale. We then recommend the combination of content, technology and campaigns that fits the opportunity.
              </p>
              <div className="mt-6 p-5 sm:p-6 rounded-xl border-l-4 border-[#1A56DB] bg-slate-50 text-slate-800 text-sm sm:text-[15px] leading-relaxed">
                <strong className="text-slate-900 font-bold block mb-1">Start focused. Expand with evidence.</strong>
                Your plan can begin in one market and develop into a wider rollout when customer response and operational readiness support it.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6 SERVICES SECTION ══ */}
      <section id="services" className="py-16 sm:py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#1A56DB] mb-2.5">
              What we do
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141e30] tracking-tight mb-3.5">
              Africa market services that connect the full customer journey.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Choose a focused engagement or combine services into one growth program. The work and markets are defined during discovery.
            </p>
            <div className="w-12 h-1 bg-[#1A56DB] rounded-full mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 01 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#1A56DB] text-white flex items-center justify-center text-xs font-bold mb-4">
                  01
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">Market research &amp; entry strategy</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5">
                  Turn a broad expansion goal into a practical country, customer and channel plan before committing your full budget.
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>Demand and competitor review</li>
                <li>Audience, offer and message mapping</li>
                <li>Country priorities and test roadmap</li>
              </ul>
            </div>

            {/* 02 */}
            <div id="websites-search" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#1A56DB] text-white flex items-center justify-center text-xs font-bold mb-4">
                  02
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">Websites &amp; local commerce</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5">
                  Build or adapt the digital experience for real buyers, from a fast mobile landing page to an ecommerce journey.
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>Localized pages, UX and conversion improvements</li>
                <li>Currency, checkout and provider-fit planning</li>
                <li>Payment integration where supported by the provider</li>
              </ul>
            </div>

            {/* 03 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#1A56DB] text-white flex items-center justify-center text-xs font-bold mb-4">
                  03
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">Search, local SEO &amp; AI discovery</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5">
                  Make useful, clearly structured pages easier to find and understand across traditional and AI-assisted search.
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>Technical SEO and location-specific content</li>
                <li>Google Business Profile when eligible</li>
                <li>Answer-focused content and clear site structure</li>
              </ul>
            </div>

            {/* 04 */}
            <div id="ads-growth" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#1A56DB] text-white flex items-center justify-center text-xs font-bold mb-4">
                  04
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">Paid media, content &amp; creators</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5">
                  Test the right channels and creative for the audience instead of repeating one campaign across different countries.
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>Search and social ad planning and management</li>
                <li>Market-specific copy and creative testing</li>
                <li>Creator sourcing and vetting where appropriate</li>
              </ul>
            </div>

            {/* 05 */}
            <div id="whatsapp-growth" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#1A56DB] text-white flex items-center justify-center text-xs font-bold mb-4">
                  05
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">WhatsApp, CRM &amp; lead journeys</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5">
                  Connect interest to a timely, useful conversation, with a clear route to a person, a purchase or the next step.
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>Click-to-chat and website inquiry paths</li>
                <li>Permission-based messaging and follow-up flows</li>
                <li>Lead qualification, routing and CRM handoff</li>
              </ul>
            </div>

            {/* 06 */}
            <div id="ai-measurement" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#1A56DB] text-white flex items-center justify-center text-xs font-bold mb-4">
                  06
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5">Analytics &amp; practical AI automation</h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-5">
                  Bring campaign, website and lead data together so decisions reflect customer behavior and business value.
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                <li>Event tracking and performance dashboards</li>
                <li>Conversion and lead-quality reporting</li>
                <li>AI-assisted workflows or agents when useful</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CUSTOMER JOURNEY SECTION ══ */}
      <section className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#1A56DB] mb-3">
                A connected customer journey
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141e30] tracking-tight mb-4">
                Reach the right person. Make the next step easy.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                A search result, ad or creator post only starts the journey. The page, inquiry flow, response and follow-up have to work together to turn that interest into a qualified opportunity.
              </p>
              <div className="w-12 h-1 bg-[#1A56DB] rounded-full" />
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1A56DB] font-extrabold text-xs flex items-center justify-center shrink-0">1</span>
                  <p className="text-xs sm:text-sm text-slate-700 m-0"><strong className="text-slate-900">Discover:</strong> A prospective buyer finds a locally relevant search result or campaign.</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1A56DB] font-extrabold text-xs flex items-center justify-center shrink-0">2</span>
                  <p className="text-xs sm:text-sm text-slate-700 m-0"><strong className="text-slate-900">Understand:</strong> The landing page answers their questions and builds confidence.</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1A56DB] font-extrabold text-xs flex items-center justify-center shrink-0">3</span>
                  <p className="text-xs sm:text-sm text-slate-700 m-0"><strong className="text-slate-900">Act:</strong> They choose a form, checkout or WhatsApp conversation.</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1A56DB] font-extrabold text-xs flex items-center justify-center shrink-0">4</span>
                  <p className="text-xs sm:text-sm text-slate-700 m-0"><strong className="text-slate-900">Follow through:</strong> The lead is recorded, assigned and followed up appropriately.</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1A56DB] font-extrabold text-xs flex items-center justify-center shrink-0">5</span>
                  <p className="text-xs sm:text-sm text-slate-700 m-0"><strong className="text-slate-900">Improve:</strong> We review lead quality, conversion and sales signals together.</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 leading-normal">
                WhatsApp and payment options are recommended only where they fit the audience, platform rules, provider availability and agreed scope.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARKET EXAMPLES (DARK SECTION) ══ */}
      <section id="markets" className="py-16 sm:py-24 bg-[#152039] text-white relative overflow-hidden">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#8eb2ff] mb-2.5">
              Example market questions
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              The country changes the questions we ask.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We research each target country separately. These examples show decisions an engagement might need to address; they do not assume the same channel or checkout will work everywhere.
            </p>
            <div className="w-12 h-1 bg-[#1A56DB] rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/10 border border-white/15 rounded-xl p-5 sm:p-6 backdrop-blur-xs">
              <span className="text-[11px] font-extrabold text-blue-300 tracking-wider block mb-3">01 / NIGERIA</span>
              <h3 className="text-lg font-bold text-white mb-2">Nigeria</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Which cities and buyer groups show demand? What local language, price presentation, bank-transfer or card experiences fit the offer?
              </p>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-xl p-5 sm:p-6 backdrop-blur-xs">
              <span className="text-[11px] font-extrabold text-blue-300 tracking-wider block mb-3">02 / GHANA</span>
              <h3 className="text-lg font-bold text-white mb-2">Ghana</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                How should the offer be positioned for Ghanaian buyers? Does mobile money or card checkout better suit the selected audience?
              </p>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-xl p-5 sm:p-6 backdrop-blur-xs">
              <span className="text-[11px] font-extrabold text-blue-300 tracking-wider block mb-3">03 / KENYA</span>
              <h3 className="text-lg font-bold text-white mb-2">Kenya</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Where is the search demand, and how should mobile experience and M-PESA-aware checkout be considered?
              </p>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-xl p-5 sm:p-6 backdrop-blur-xs">
              <span className="text-[11px] font-extrabold text-blue-300 tracking-wider block mb-3">04 / SOUTH AFRICA</span>
              <h3 className="text-lg font-bold text-white mb-2">South Africa</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Which regions, search needs, competitive offers and available payment methods shape the buying journey?
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-7 max-w-3xl leading-relaxed">
            These are illustrative markets, not a claim that Amplipath operates offices, maintains proprietary consumer data or has pre-existing teams in each country. Additional markets can be assessed against your brief.
          </p>
        </div>
      </section>

      {/* ══ DELIVERABLES SECTION ══ */}
      <section id="deliverables" className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#1A56DB] mb-2.5">
              Possible deliverables
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141e30] tracking-tight mb-3">
              What you can expect from an engagement.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              The final scope depends on your starting point and goals. These are concrete examples of the work we can plan and deliver together.
            </p>
            <div className="w-12 h-1 bg-[#1A56DB] rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-900 text-sm font-bold mb-1">Market opportunity brief</strong>
                <p className="text-xs text-slate-600 leading-normal">Priority audiences, competing offers and country-specific assumptions to test.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-900 text-sm font-bold mb-1">Positioning and channel plan</strong>
                <p className="text-xs text-slate-600 leading-normal">Messages, media choices, launch sequence and budget priorities.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-900 text-sm font-bold mb-1">Localized page or website changes</strong>
                <p className="text-xs text-slate-600 leading-normal">Country-relevant messaging, mobile UX and clearer conversion paths.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-900 text-sm font-bold mb-1">Search and content roadmap</strong>
                <p className="text-xs text-slate-600 leading-normal">Technical fixes, local queries, helpful pages and discoverability priorities.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-900 text-sm font-bold mb-1">Campaign launch and testing plan</strong>
                <p className="text-xs text-slate-600 leading-normal">Creative variants, audiences and decisions for paid and creator activity.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-900 text-sm font-bold mb-1">Lead and follow-up workflow</strong>
                <p className="text-xs text-slate-600 leading-normal">Forms, WhatsApp handoff, CRM stages and response ownership as needed.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-900 text-sm font-bold mb-1">Tracking and measurement setup</strong>
                <p className="text-xs text-slate-600 leading-normal">Meaningful conversion events and a practical performance dashboard.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl border border-slate-200 bg-white">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1A56DB] text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-900 text-sm font-bold mb-1">Review and optimization recommendations</strong>
                <p className="text-xs text-slate-600 leading-normal">What worked, what to change and which market or channel to test next.</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-5">
            Deliverables are selected in the proposal; this page describes available service options, not a fixed package.
          </p>
        </div>
      </section>

      {/* ══ PROCESS & MEASUREMENT ══ */}
      <section className="py-16 sm:py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#1A56DB] mb-2.5">
              How we work
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141e30] tracking-tight mb-3">
              A clear route from opportunity to performance.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Each phase should answer a useful business question before more time or budget is committed.
            </p>
            <div className="w-12 h-1 bg-[#1A56DB] rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 bg-white border-t-4 border-[#1A56DB] rounded-xl shadow-xs">
              <span className="text-xs font-extrabold text-[#1A56DB] tracking-wider block mb-3">PHASE 01</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Discover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Define the market, customer, offer, baseline and commercial goal.</p>
            </div>
            <div className="p-6 bg-white border-t-4 border-[#1A56DB] rounded-xl shadow-xs">
              <span className="text-xs font-extrabold text-[#1A56DB] tracking-wider block mb-3">PHASE 02</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Design &amp; build</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Prepare the message, digital experience, tracking and necessary handoffs.</p>
            </div>
            <div className="p-6 bg-white border-t-4 border-[#1A56DB] rounded-xl shadow-xs">
              <span className="text-xs font-extrabold text-[#1A56DB] tracking-wider block mb-3">PHASE 03</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Launch &amp; learn</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Test agreed channels and study how real prospects respond.</p>
            </div>
            <div className="p-6 bg-white border-t-4 border-[#1A56DB] rounded-xl shadow-xs">
              <span className="text-xs font-extrabold text-[#1A56DB] tracking-wider block mb-3">PHASE 04</span>
              <h3 className="text-base font-bold text-slate-900 mb-2">Improve &amp; scale</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Refine conversion, creative and spend before expanding the approach.</p>
            </div>
          </div>

          <div className="mt-8 p-6 sm:p-7 rounded-xl border border-blue-200 bg-blue-50/70 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <strong className="md:col-span-4 text-base font-bold text-slate-900">What we measure</strong>
            <p className="md:col-span-8 text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
              Depending on the engagement: qualified inquiries, cost per qualified lead, conversion rate, checkout completion, sales or revenue where attributable, search visibility and response time. Targets and reporting methods are agreed before launch.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 3 ENGAGEMENT TIERS ══ */}
      <section className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#1A56DB] mb-2.5">
              Ways to work together
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141e30] tracking-tight mb-3">
              Start at the stage your business is in.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              You may need an entry plan, a launch team, or help improving activity already in market.
            </p>
            <div className="w-12 h-1 bg-[#1A56DB] rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[10px] font-extrabold text-[#1A56DB] uppercase tracking-widest block mb-2.5">Plan</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Market entry strategy</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clarify where to begin, whom to reach and which assumptions to test before committing to a broader rollout.
              </p>
            </div>
            <div className="p-7 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[10px] font-extrabold text-[#1A56DB] uppercase tracking-widest block mb-2.5">Launch</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Integrated market launch</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Align the website or store, content, tracking, campaigns and lead handling for one defined market.
              </p>
            </div>
            <div className="p-7 rounded-2xl border border-slate-200 bg-white shadow-xs">
              <span className="text-[10px] font-extrabold text-[#1A56DB] uppercase tracking-widest block mb-2.5">Grow</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ongoing optimization</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Use campaign and customer data to improve lead quality, conversion and performance over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9 FAQS ══ */}
      <section id="faq" className="py-16 sm:py-24 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#1A56DB] mb-3">
                Frequently asked questions
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141e30] tracking-tight mb-4">
                Questions about Africa market growth.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
                Answers to common questions about scope, technology, channels and measuring results.
              </p>
              <div className="w-12 h-1 bg-[#1A56DB] rounded-full" />
            </div>

            <div className="lg:col-span-7 space-y-3">
              {FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`rounded-xl border transition-all ${
                      isOpen
                        ? 'border-[#1A56DB] bg-white shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                    } overflow-hidden`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 text-[15.5px] sm:text-base font-semibold text-slate-800 hover:text-[#1A56DB] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                          isOpen
                            ? 'bg-[#1A56DB] text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100 text-sm sm:text-[14.5px] text-slate-600 leading-relaxed pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONNECTED CAPABILITIES ══ */}
      <section className="py-16 sm:py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#1A56DB] mb-2">
              Connected capabilities
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141e30] tracking-tight mb-2">
              The building blocks behind the growth plan.
            </h2>
            <div className="w-12 h-1 bg-[#1A56DB] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a href="#websites-search" className="p-6 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-extrabold text-[#1A56DB] uppercase tracking-wider block mb-2">Web &amp; search</span>
                <strong className="block text-slate-900 text-base font-bold group-hover:text-[#1A56DB] transition-colors">Digital foundations people can find and use</strong>
              </div>
              <em className="text-xs text-[#1A56DB] not-italic font-bold mt-5 block">&uarr; Explore the service</em>
            </a>

            <a href="#ads-growth" className="p-6 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-extrabold text-[#1A56DB] uppercase tracking-wider block mb-2">Ads &amp; growth</span>
                <strong className="block text-slate-900 text-base font-bold group-hover:text-[#1A56DB] transition-colors">Campaigns built for the selected audience</strong>
              </div>
              <em className="text-xs text-[#1A56DB] not-italic font-bold mt-5 block">&uarr; Explore the service</em>
            </a>

            <a href="#ai-measurement" className="p-6 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-blue-400 hover:bg-blue-50/30 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-extrabold text-[#1A56DB] uppercase tracking-wider block mb-2">AI &amp; measurement</span>
                <strong className="block text-slate-900 text-base font-bold group-hover:text-[#1A56DB] transition-colors">Better follow-through and clearer decisions</strong>
              </div>
              <em className="text-xs text-[#1A56DB] not-italic font-bold mt-5 block">&uarr; Explore the service</em>
            </a>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA BAND ══ */}
      <section className="py-16 sm:py-20 bg-[#1A56DB] text-white text-center">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Ready to plan your next market?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-6">
            Tell us which country you want to reach, where your business stands today and what growth would mean for you. We’ll take the conversation from there.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => openModal('rfp')}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-white text-[#1A56DB] text-sm font-bold shadow-md hover:bg-slate-100 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Talk to us <span aria-hidden="true">&rarr;</span>
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg border-2 border-white/60 text-white text-sm font-bold hover:border-white hover:bg-white/10 transition-all"
            >
              Review services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
