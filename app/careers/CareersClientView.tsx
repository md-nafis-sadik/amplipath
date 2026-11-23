'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export interface JobRole {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  type: string;
  location: string;
  compensation: string;
  compDetail: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

interface CareersClientViewProps {
  initialRoles: JobRole[];
}

export default function CareersClientView({ initialRoles }: CareersClientViewProps) {
  const [roles] = useState<JobRole[]>(initialRoles);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Roles');
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);

  // Form State (only active when roles exist)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    role: roles.length > 0 ? roles[0].title : '',
    portfolio: '',
    pitch: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const formRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const dynamicCategories = ['All Roles', ...Array.from(new Set(roles.map((r) => r.categoryLabel).filter(Boolean)))];

  const filteredRoles =
    selectedCategory === 'All Roles'
      ? roles
      : roles.filter((r) => r.categoryLabel === selectedCategory);

  const handleApplyClick = (roleTitle: string) => {
    setFormData((prev) => ({ ...prev, role: roleTitle }));
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
          whyAmplipath: formData.pitch,
        }),
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

  const hasOpenRoles = roles.length > 0;

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans antialiased">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-white border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {hasOpenRoles ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Careers at Amplipath &bull; We&apos;re Hiring Remotely
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold tracking-wide uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Careers at Amplipath &bull; Applications Currently Closed
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Work at Amplipath
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            {hasOpenRoles
              ? 'We’re a global remote team that puts people, autonomy, and craftsmanship first. Work from where you want, collaborate with top specialists across marketing, tech, and AI, and be rewarded for the measurable impact you produce.'
              : 'All current roles have been filled and we have received more than enough applications. We are currently not accepting new applications or form submissions. Future project milestones and open roles will be announced here.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {hasOpenRoles ? (
              <a
                href="#open-roles"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Explore Open Roles ({roles.length})</span>
                <span>&darr;</span>
              </a>
            ) : (
              <a
                href="#culture"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Our Culture &amp; Values</span>
                <span>&darr;</span>
              </a>
            )}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
            >
              <span>Back to Home</span>
              <span>&rarr;</span>
            </Link>
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

      {/* ── 2. OPEN POSITIONS SECTION (DYNAMIC) ── */}
      <section id="open-roles" className="py-20 md:py-28 max-w-6xl mx-auto px-6">
        {!hasOpenRoles ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-14 text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center text-3xl mx-auto mb-6">
              💼
            </div>
            <div className="text-xs font-extrabold tracking-widest text-slate-500 uppercase mb-2">
              OPPORTUNITIES STATUS
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              No Open Positions at This Time
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-6">
              All roles across our engineering, marketing, and strategy teams are currently filled.
              We are not accepting applications or talent form submissions right now.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-medium">
              <span>🔒</span> Applications and hiring are currently closed. Check back later for future openings.
            </div>
          </div>
        ) : (
          <>
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
            {dynamicCategories.length > 2 && (
              <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
                {dynamicCategories.map((cat) => (
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
            )}

            {/* Roles List */}
            <div className="space-y-4">
              {filteredRoles.map((role) => {
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
                          {role.compDetail && <div className="text-xs text-slate-500">{role.compDetail}</div>}
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
                          {role.responsibilities.length > 0 && (
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
                          )}

                          {role.requirements.length > 0 && (
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
                          )}
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
          </>
        )}
      </section>

      {/* ── 3. CULTURE SECTION ── */}
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

      {/* ── 4. APPLICATION FORM (ONLY RENDERED WHEN ACTIVE ROLES EXIST) ── */}
      {hasOpenRoles && (
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
                    SUBMIT APPLICATION
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
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-900 transition-all bg-white"
                      >
                        {roles.map((r) => (
                          <option key={r.id} value={r.title}>
                            {r.title} ({r.categoryLabel})
                          </option>
                        ))}
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
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
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
      )}
    </div>
  );
}
