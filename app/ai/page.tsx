'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

export default function AiPage() {
  const router = useRouter();
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pg on" id="pg-ai">
      <div className="hero">
  <div className="hero-bar"></div>
  <div className="h-tag"><div className="h-dot"></div>AI & TECHNOLOGY SERVICES</div>
  <h1 className="h-h1" style={{"fontSize":"38px"}}>AI-powered marketing and technology services — strategy, systems and software that drive measurable growth.</h1>
  <p className="h-sub">We develop AI strategies, build intelligent systems and apply machine learning to every marketing channel — giving our clients a measurable competitive edge across search, content, paid media and beyond.</p>
  <div className="h-btns">
    <button className="btn-fill" onClick={() => openModal('rfp')}>Get Started</button>
    <button className="btn-out" onClick={() => router.push('/ai')}>Explore AI Development →</button>
  </div>
</div>
<div className="s-white">
  <div className="sec-tag">CORE AI CAPABILITIES</div>
  <h2 className="sec-h2">How we apply AI to grow your business faster.</h2>
  <div className="aln"></div>
  <div className="sg2">
    <div className="scard"><div className="sc-ico">🗄️</div><div className="sc-n">Advanced data intelligence</div><div className="sc-d">We analyse billions of data points across the web to identify trends and opportunities before your competitors do. Our proprietary models integrate outputs from ChatGPT, Perplexity, Gemini and Cohere to continuously refine audience targeting and content strategy — giving clients a first-mover advantage in AI-driven search.</div></div>
    <div className="scard"><div className="sc-ico">📈</div><div className="sc-n">Predictive growth modelling</div><div className="sc-d">AI-powered forecasting of search intent, traffic trajectories and conversion probability across multiple channels simultaneously. Our models help clients make long-range marketing budget decisions with data-backed confidence — rather than industry averages and guesswork.</div></div>
    <div className="scard"><div className="sc-ico">🪄</div><div className="sc-n">Custom AI marketing systems</div><div className="sc-d">We build bespoke AI systems that evaluate campaign performance, identify missed opportunities and generate on-brand content automatically — reducing manual workload by up to 70% while improving output quality and consistency across all channels.</div></div>
    <div className="scard"><div className="sc-ico">👁️</div><div className="sc-n">Cross-channel AI optimization</div><div className="sc-d">AI-driven coordination of paid and organic channels — ensuring budget allocation, bidding decisions and content strategy all reinforce each other. The result: higher brand exposure at lower cost per acquisition, continuously improving over time without plateau.</div></div>
  </div>
</div>
<div className="s-gray">
  <div className="sec-tag">GEO / AEO — AI SEARCH OPTIMIZATION</div>
  <h2 className="sec-h2">Be found in ChatGPT, Gemini and the AI engines replacing Google.</h2>
  <div className="aln"></div>
  <p className="sec-sub" style={{"marginBottom":"28px"}}>Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) represent the most significant shift in search since the invention of Google. Amplipath is one of the first agencies globally offering structured GEO/AEO as a managed service.</p>
  <div className="sg">
    <div className="scard" onClick={() => router.push('/services/ai-marketing')}><div className="sc-ico">🤖</div><div className="sc-n">GEO / AEO Consulting</div><div className="sc-d">Full audit of your brand\'s current AI search presence — with a structured plan to increase citation frequency in ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard" onClick={() => router.push('/services/ai-brand-positioning')}><div className="sc-ico">✨</div><div className="sc-n">AI Content Strategy</div><div className="sc-d">Content frameworks, FAQ schemas and topic cluster strategies designed specifically for AI retrieval — not just traditional Google ranking.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard" onClick={() => router.push('/services/ai-brand-positioning')}><div className="sc-ico">🎨</div><div className="sc-n">AI Brand Positioning</div><div className="sc-d">Define and codify your brand\'s digital identity so every AI model consistently describes, recommends and positions your business correctly.</div><div className="sc-more">Learn more →</div></div>
  </div>
</div>
<div className="s-dark">
  <div className="sec-tag wh">AI DEVELOPMENT SERVICES</div>
  <h2 className="sec-h2 wh">We build intelligent systems that work for your business 24/7.</h2>
  <div className="aln wh"></div>
  <div className="sg2">
    <div className="scard dark" onClick={() => router.push('/ai')}><div className="sc-ico">🧠</div><div className="sc-n wh">AI Development & Integration</div><div className="sc-d wh">Custom AI-powered applications, LLM integrations (ChatGPT, Claude, Gemini), data pipelines and production-ready AI systems built for your specific business context and data.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard dark" onClick={() => router.push('/services/web-development')}><div className="sc-ico">💬</div><div className="sc-n wh">AI Chatbot Development</div><div className="sc-d wh">Intelligent LLM-powered chatbots for sales qualification, customer support and lead generation — trained on your products, services and brand voice for authentic conversations.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard dark" onClick={() => router.push('/ai')}><div className="sc-ico">⚡</div><div className="sc-n wh">AI Agents & Automation</div><div className="sc-d wh">Autonomous AI agents that handle repetitive workflows — content creation, data analysis, outreach campaigns and multi-step business processes — without constant human oversight.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard dark" onClick={() => router.push('/ai')}><div className="sc-ico">🗺️</div><div className="sc-n wh">AI Technology Consulting</div><div className="sc-d wh">Not sure where AI can help your business? We audit your workflows, identify high-ROI automation opportunities and deliver a practical AI adoption roadmap with clear financial projections.</div><div className="sc-more">Learn more →</div></div>
  </div>
</div>
<div className="s-white">
  <div className="sec-tag">AI FAQ</div>
  <h2 className="sec-h2">Common questions about AI marketing services.</h2>
  <div className="aln"></div>
  <div className="faq-wrap">
    
    <div className="faq-item" key={0}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
        <span>What AI marketing services does Amplipath offer?</span>
        <span>{openFaq === 0 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 0 ? 'open' : ''}`}>
        Traditional SEO optimizes your content to rank in Google\'s blue link results. GEO/AEO optimizes your content to be cited, recommended and referenced in AI-generated answers — in ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews. These are increasingly different disciplines. AI models retrieve content based on authority signals, entity recognition, FAQ structure and semantic depth — not just keyword density and backlinks. Both are essential in 2026 — and Amplipath is one of the only agencies offering both as integrated services.
      </div>
    </div>
    
    <div className="faq-item" key={1}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
        <span>How much does AI consulting and development cost?</span>
        <span>{openFaq === 1 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 1 ? 'open' : ''}`}>
        AI consulting engagements typically start from $2,500 for a strategy audit and roadmap. AI chatbot development starts from $3,500 for a rules-based system or $5,000+ for an LLM-powered system. Custom AI application development ranges from $15,000 to $150,000+ depending on complexity. GEO/AEO as a managed service is typically bundled with SEO retainers. We always provide a detailed fixed-price quote before beginning any development work — no hidden costs.
      </div>
    </div>
    
    <div className="faq-item" key={2}>
      <button className="faq-q" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
        <span>Can AI replace my marketing team?</span>
        <span>{openFaq === 2 ? '−' : '+'}</span>
      </button>
      <div className={`faq-a ${openFaq === 2 ? 'open' : ''}`}>
        AI augments great marketing teams — it doesn\'t replace them. The businesses winning with AI in 2026 are those using it to eliminate low-value repetitive work (content drafting, data reporting, bid adjustments) so their human marketers can focus on high-value strategic thinking, creative direction and relationship building. Amplipath helps clients find the right AI-to-human balance for their specific situation — and builds the systems that make AI genuinely useful rather than a distraction.
      </div>
    </div>
  </div>
</div>
    </div>
  );
}
