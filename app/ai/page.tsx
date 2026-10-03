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
    <button className="btn-out" onClick={() => router.push('/services/ai-development')}>Explore AI Development →</button>
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
    <div className="scard" onClick={() => router.push('/services/ai-marketing')}><div className="sc-ico">🤖</div><div className="sc-n">GEO / AEO Consulting</div><div className="sc-d">Full audit of your brand's current AI search presence — with a structured plan to increase citation frequency in ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard" onClick={() => router.push('/services/ai-brand-positioning')}><div className="sc-ico">✨</div><div className="sc-n">AI Content Strategy</div><div className="sc-d">Content frameworks, FAQ schemas and topic cluster strategies designed specifically for AI retrieval — not just traditional Google ranking.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard" onClick={() => router.push('/services/ai-brand-positioning')}><div className="sc-ico">🎨</div><div className="sc-n">AI Brand Positioning</div><div className="sc-d">Define and codify your brand's digital identity so every AI model consistently describes, recommends and positions your business correctly.</div><div className="sc-more">Learn more →</div></div>
  </div>
</div>
<div className="s-dark">
  <div className="sec-tag wh">AI DEVELOPMENT SERVICES</div>
  <h2 className="sec-h2 wh">We build intelligent systems that work for your business 24/7.</h2>
  <div className="aln wh"></div>
  <div className="sg2">
    <div className="scard dark" onClick={() => router.push('/services/ai-development')}><div className="sc-ico">🧠</div><div className="sc-n wh">AI Development & Integration</div><div className="sc-d wh">Custom AI-powered applications, LLM integrations (ChatGPT, Claude, Gemini), data pipelines and production-ready AI systems built for your specific business context and data.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard dark" onClick={() => router.push('/services/web-development')}><div className="sc-ico">💬</div><div className="sc-n wh">AI Chatbot Development</div><div className="sc-d wh">Intelligent LLM-powered chatbots for sales qualification, customer support and lead generation — trained on your products, services and brand voice for authentic conversations.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard dark" onClick={() => router.push('/services/ai-development')}><div className="sc-ico">⚡</div><div className="sc-n wh">AI Agents & Automation</div><div className="sc-d wh">Autonomous AI agents that handle repetitive workflows — content creation, data analysis, outreach campaigns and multi-step business processes — without constant human oversight.</div><div className="sc-more">Learn more →</div></div>
    <div className="scard dark" onClick={() => router.push('/services/ai-development')}><div className="sc-ico">🗺️</div><div className="sc-n wh">AI Technology Consulting</div><div className="sc-d wh">Not sure where AI can help your business? We audit your workflows, identify high-ROI automation opportunities and deliver a practical AI adoption roadmap with clear financial projections.</div><div className="sc-more">Learn more →</div></div>
  </div>
</div>
<div className="s-white" id="faq">
  <div className="sec-tag">AI &amp; TECHNOLOGY FAQ</div>
  <h2 className="sec-h2">Questions about AI automation, AI agents and app development.</h2>
  <div className="aln"></div>
  <p className="sec-sub">Understand what Amplipath can build, how implementation works, what affects cost and timelines, how your data is protected, and how we measure the business value of each solution.</p>
  
  <div className="faq-wrap">
    {[
      {
        q: "1. What AI and technology services does Amplipath offer?",
        a: "Amplipath provides AI consulting, AI readiness assessment, workflow automation, AI agents, business chatbots, AI-powered marketing systems, custom websites, web applications, mobile applications and technology integrations. We help businesses identify useful opportunities, design the right solution, connect it with existing systems and measure its performance after implementation."
      },
      {
        q: "2. What is AI automation, and how can it help my business?",
        a: "AI automation combines artificial intelligence with software workflows to complete repetitive or information-heavy tasks with less manual effort. It can help with lead qualification, customer enquiries, CRM updates, appointment scheduling, document processing, reporting, internal knowledge searches, marketing follow-up and support-ticket routing. The best opportunities are processes that are repeated frequently, follow identifiable rules and can be measured against a clear business outcome."
      },
      {
        q: "3. What is the difference between an AI agent, chatbot and workflow automation?",
        a: "A chatbot mainly communicates with users through conversation. Workflow automation follows predetermined triggers and rules to move information or complete tasks. An AI agent can interpret information, plan steps, use connected tools and take approved actions toward a defined objective. A business solution may combine all three—for example, a chatbot that qualifies a lead, an AI agent that evaluates the enquiry and an automation that updates the CRM."
      },
      {
        q: "4. Is AI automation suitable for small businesses?",
        a: "Yes. Small businesses can use AI automation without maintaining a large internal technology team. The best approach is usually to begin with one repetitive, high-value process—such as lead follow-up, customer support or reporting—and prove that it saves time or improves performance before expanding. Amplipath evaluates the process, available data, expected value, implementation cost and potential risk before recommending a solution."
      },
      {
        q: "5. How do I know whether my business is ready for AI?",
        a: "A business may be ready when it has a clearly defined problem, a repeatable process, accessible information or data, someone responsible for the process and a measurable definition of success. Amplipath can assess existing workflows, tools, data quality, integration options, risks and expected ROI. If AI is unnecessary, a simpler automation or conventional software solution may be more appropriate."
      },
      {
        q: "6. Can Amplipath integrate AI with my existing website, CRM and business tools?",
        a: "Yes, provided the existing systems offer suitable APIs, webhooks, connectors or other secure integration methods. AI solutions can potentially connect with websites, ecommerce platforms, CRMs, databases, calendars, communication tools, analytics platforms and internal systems. Before promising an integration, Amplipath evaluates authentication requirements, data access, system limitations, API costs, reliability and security."
      },
      {
        q: "7. Should my business use an existing AI tool or build a custom solution?",
        a: "An existing tool is usually suitable for a common task that does not require extensive customization. A custom solution may be more appropriate when the workflow involves proprietary business knowledge, several integrations, specialized permissions, unique customer experiences or functionality that creates a competitive advantage. Amplipath can also recommend a hybrid approach that combines established platforms with custom interfaces, integrations and automation."
      },
      {
        q: "8. How much do AI consulting, automation and app development services cost?",
        a: "Cost depends on the business objective, number of users, features, integrations, data preparation, security requirements, infrastructure, model or API usage and required level of ongoing support. A focused automation will normally cost less than a multi-system AI agent or custom application. Amplipath defines the requirements first and then provides a proposal covering the scope, milestones, timeline, fees and expected operating costs."
      },
      {
        q: "9. How long does it take to build an AI solution or application?",
        a: "A focused prototype or simple automation may be completed within several weeks, while a production application involving multiple integrations, user roles, complex data or security requirements may take several months. A typical project includes discovery, architecture, design, development, integration, testing, deployment and monitoring. Amplipath provides a project-specific timeline after the requirements and technical dependencies have been assessed."
      },
      {
        q: "10. How does Amplipath protect business and customer data?",
        a: "Data protection begins with understanding what information the system genuinely needs. Depending on the project, safeguards may include data minimization, authenticated integrations, role-based permissions, encryption where supported, secure credential storage, activity logs, retention controls, testing and restricted access to sensitive actions. Security, privacy and regulatory requirements are assessed according to the particular system, industry, data and deployment environment."
      },
      {
        q: "11. How accurate are AI systems, and will humans remain in control?",
        a: "AI systems are not guaranteed to be completely accurate. They can misunderstand instructions, produce incorrect information or take an inappropriate action if they are not properly constrained. Amplipath can use approved knowledge sources, testing, validation rules, restricted permissions, monitoring, fallback procedures and human-approval checkpoints. Decisions involving sensitive information, money, legal obligations or significant business risk should retain appropriate human oversight."
      },
      {
        q: "12. Can AI replace my marketing team or employees?",
        a: "AI is generally more effective at automating specific tasks than replacing an entire team. It can accelerate research, reporting, content operations, customer responses, data processing and follow-up, while people remain responsible for strategy, creativity, relationships, judgment and accountability. The objective is to reduce repetitive work and help employees concentrate on activities where human expertise creates greater value."
      },
      {
        q: "13. Who owns the source code, business data and AI system?",
        a: "Ownership and licensing terms are documented before development begins. The proposal identifies which custom code, designs, prompts, databases, accounts and documentation will be transferred to the client and which third-party services or reusable components remain subject to separate licences. Access, deployment and final handover are completed according to the agreed contract, project scope and payment terms."
      },
      {
        q: "14. How does Amplipath measure the ROI of an AI or automation project?",
        a: "Measurement begins with a baseline showing how the process performs before implementation. Depending on the project, KPIs may include hours saved, cost per task, response time, error rate, lead-conversion rate, customer satisfaction, completed transactions, revenue influenced or reduced operational workload. Implementation, software, model usage and maintenance costs should be considered when calculating the overall return."
      },
      {
        q: "15. Does Amplipath provide testing, maintenance and support after launch?",
        a: "Yes. Post-launch support can include error monitoring, performance testing, security updates, integration maintenance, prompt or workflow improvement, usage-cost monitoring and new feature development. AI models, APIs and connected platforms change over time, so important systems require periodic evaluation. The length and level of ongoing support are defined in the project proposal."
      },
      {
        q: "16. How do I start an AI automation or app-development project with Amplipath?",
        a: "Start by describing the business problem, current process, intended users, existing technology, desired outcome, available budget and preferred timeline. Amplipath will evaluate the project and may recommend an assessment, proof of concept, fixed-scope build or phased implementation. You will receive a defined proposal before development begins."
      }
    ].map((faq, idx) => {
      const isOpen = openFaq === idx;
      return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
          <button
            className="faq-q"
            type="button"
            onClick={() => setOpenFaq(isOpen ? null : idx)}
            aria-expanded={isOpen}
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
    </div>
  );
}
