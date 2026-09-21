export interface BuilderServiceItem {
  file: string;
  slug: string;
  category: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  stats: [string, string][];
  problems: [string, string][];
  pillars: [string, string][];
  deliverables: string[];
  process: [string, string][];
  capabilityGroups: { name: string; items: string[] }[];
  audiences: [string, string, string][];
  compliance?: string;
  faqs: [string, string][];
  related: [string, string][];
  ctaTitle: string;
  ctaText: string;
}

export const commonWhy = [
  {
    icon:"🧭",
    title:"Strategy before tactics",
    text:"We start with your market, customer journey, commercial goals and current digital footprint before deciding what should be built or promoted."
  },
  {
    icon:"📊",
    title:"Measurement built in",
    text:"Campaigns and deliverables are structured around meaningful performance signals instead of vanity metrics alone."
  },
  {
    icon:"🔄",
    title:"Flexible month-to-month support",
    text:"Engagements can be scoped around projects or ongoing optimization without forcing every client into the same long-term package."
  }
];

export const newServicesData: BuilderServiceItem[] = [

/* ============================================================
   1. AI BRAND POSITIONING
============================================================ */
{
  file:"ai-brand-positioning.html",
  slug:"ai-brand-positioning",
  category:"AI Search & Brand Strategy",
  eyebrow:"AI Search Visibility",
  title:"AI Brand Positioning Services: <em>Shape How AI Describes Your Brand</em>",
  shortTitle:"AI Brand Positioning",
  metaTitle:"AI Brand Positioning Services | Amplipath",
  metaDescription:"Shape how ChatGPT, Gemini, Perplexity and AI search experiences understand and describe your brand with AI brand audits, entity optimization, authority building and ongoing monitoring.",
  intro:"AI assistants are increasingly part of the buying journey. Amplipath helps brands understand how they are represented in AI-generated answers, strengthen the digital evidence behind the position they want to own, and monitor how that narrative changes across major answer engines.",
  stats:[
    ["AI + Search","Visibility layer"],
    ["Multi-platform","Monitoring"],
    ["Entity-led","Strategy"],
    ["Monthly","Optimization"]
  ],
  problems:[
    ["AI describes your business inaccurately","Models may surface outdated, incomplete or inconsistent descriptions of your company, products or expertise."],
    ["Competitors own the category narrative","Competitors with stronger third-party mentions and clearer positioning can become the brands AI systems repeatedly recommend."],
    ["Your messaging is inconsistent online","Different descriptions across your website, profiles, directories and media mentions can weaken machine understanding."],
    ["You appear, but not for the right reasons","AI visibility alone is not enough if the summary, sentiment or comparison does not support the position you want buyers to see."]
  ],
  pillars:[
    ["AI Brand Narrative Audit","We test targeted buyer and category prompts to identify how major AI systems describe, compare and recommend your brand today."],
    ["Entity & Message Alignment","We create a clearer set of brand facts, differentiators, category associations and proof points that can be reinforced consistently online."],
    ["AI Search Content Strategy","We strengthen owned content so your expertise, services, comparisons, answers and brand facts are easier for search and AI systems to understand."],
    ["Earned Authority Roadmap","We identify opportunities for independent mentions, expert contributions, digital PR, citations and reputable third-party references."],
    ["Competitive Positioning","We compare your AI visibility and narrative against priority competitors to find gaps, advantages and category positions worth owning."],
    ["Ongoing AI Monitoring","We periodically retest important prompts and monitor changes in visibility, descriptions, sentiment, citations and competitive positioning."]
  ],
  deliverables:[
    "AI brand visibility and narrative audit",
    "Priority prompt and buyer-question library",
    "Competitor AI positioning benchmark",
    "Brand entity and messaging framework",
    "AI-search content gap analysis",
    "Third-party authority and citation roadmap",
    "Owned-content optimization recommendations",
    "Recurring AI visibility and sentiment reporting"
  ],
  process:[
    ["Benchmark","Test how AI platforms currently describe your brand, competitors, category and products."],
    ["Position","Define the facts, expertise, differentiators and narrative your digital presence should consistently reinforce."],
    ["Strengthen Signals","Improve owned content and pursue credible external signals that support the desired market position."],
    ["Monitor & Refine","Retest high-value prompts, review citation patterns and adjust strategy as AI search behavior evolves."]
  ],
  capabilityGroups:[
    {
      name:"Platforms We Monitor",
      items:["ChatGPT","Google AI Overviews","Google AI Mode","Gemini","Perplexity","Claude","Bing Copilot"]
    },
    {
      name:"Signals We Strengthen",
      items:["Brand entities","Topical authority","Expert mentions","Digital PR","Structured content","Third-party citations","Consistent brand facts"]
    },
    {
      name:"What We Measure",
      items:["Brand inclusion","Competitive share","Narrative accuracy","Sentiment","Citation sources","Category association","Recommendation frequency"]
    },
    {
      name:"Related Disciplines",
      items:["GEO","AEO","LLM SEO","Digital PR","Reputation strategy","SEO","Content marketing"]
    }
  ],
  audiences:[
    ["🏢","Established Brands","Companies already appearing in AI answers that want stronger narrative control and differentiation."],
    ["🚀","Challenger Brands","Businesses trying to become a recognized alternative to better-known competitors."],
    ["💻","SaaS & Technology","Complex products where buyers increasingly use AI to compare vendors and solutions."],
    ["🌍","Global Businesses","Brands that need consistent positioning across markets, websites and third-party sources."]
  ],
  compliance:"",
  faqs:[
    ["What is AI brand positioning?","AI brand positioning is the process of understanding and improving the digital signals that influence how AI answer engines describe, compare and recommend a company. It combines AI visibility analysis, entity clarity, content strategy, authority building and ongoing monitoring."],
    ["How is AI brand positioning different from GEO or AI SEO?","GEO and AI SEO primarily focus on improving whether your brand and content appear in AI-generated answers. AI brand positioning goes a step further and focuses on how the brand is characterized once it appears — including category association, differentiation, sentiment and comparison with competitors."],
    ["Can Amplipath control exactly what ChatGPT or Gemini says?","No agency can directly control a third-party AI model's output. What we can do is improve the quality, consistency and authority of the public information those systems can discover and use, then monitor whether the resulting narrative moves in the right direction."],
    ["Which AI platforms do you monitor?","Depending on the engagement, monitoring can include ChatGPT, Google AI Overviews and AI Mode, Gemini, Perplexity, Claude and Bing Copilot, with emphasis placed on the platforms most relevant to your buyers."],
    ["How do you measure AI brand positioning performance?","We can track visibility across target prompts, competitor share of mention, narrative consistency, positive or negative sentiment, category association, recommendation frequency and the sources AI systems cite when discussing your brand."],
    ["How long does AI brand positioning take?","This is generally a medium- to long-term authority-building discipline rather than an instant campaign. Some owned-content improvements can be published quickly, while changes that depend on new authority signals, third-party coverage and model refresh cycles can take considerably longer."],
    ["Do we need AI SEO before brand positioning?","Strong search visibility and machine-readable content make AI brand positioning easier because an AI system needs enough reliable information about your business before it can consistently form a useful narrative. We can evaluate both areas together."],
    ["Can you help if AI currently displays incorrect information about our company?","Yes. We can identify likely sources of inconsistent information, recommend updates across owned properties and authoritative profiles, strengthen factual brand pages and monitor whether those corrections begin to appear in AI-generated responses."]
  ],
  related:[
    ["GEO / AEO","Improve your visibility in generative and answer engines."],
    ["Digital PR","Build credible independent mentions and third-party authority."],
    ["Content Marketing","Create useful, expert-led content that strengthens brand understanding."]
  ],
  ctaTitle:"Find out what AI is saying about your brand.",
  ctaText:"Let Amplipath benchmark your current AI visibility, competitive positioning and narrative gaps, then build a practical roadmap for improving them."
},

/* ============================================================
   2. PROGRAMMATIC
============================================================ */
{
  file:"programmatic-advertising.html",
  slug:"programmatic-advertising",
  category:"Digital Advertising",
  eyebrow:"Automated Media Buying",
  title:"Programmatic Advertising Services: <em>Reach the Right Audience Across the Open Web</em>",
  shortTitle:"Programmatic Advertising",
  metaTitle:"Programmatic Advertising Services | Amplipath",
  metaDescription:"Programmatic advertising strategy, audience targeting, display, video, connected TV, retargeting, first-party data activation and performance reporting from Amplipath.",
  intro:"Amplipath plans, launches and optimizes data-driven programmatic campaigns across display, video, native and connected environments. We combine audience strategy, automated media buying, creative testing and measurement so your advertising budget can reach more relevant prospects without relying on manual placement decisions.",
  stats:[
    ["Real-time","Media buying"],
    ["Cross-device","Reach"],
    ["1st-party","Data activation"],
    ["Always-on","Optimization"]
  ],
  problems:[
    ["Your media buying is too fragmented","Managing publishers, placements and networks individually can slow campaign execution and make optimization difficult."],
    ["Your targeting is too broad","Large impression counts mean little when the audience does not match your ideal customer profile or buying intent."],
    ["You cannot connect media to outcomes","Campaigns become difficult to scale when impressions and clicks are disconnected from qualified leads, pipeline or revenue."],
    ["Creative fatigue reduces performance","Audiences can quickly tune out repetitive ads when creative formats and messages are not refreshed or tested."]
  ],
  pillars:[
    ["Audience & Media Strategy","We define the people, companies, contexts, markets, devices and buying signals your campaign should prioritize."],
    ["Programmatic Media Buying","We manage automated media purchasing through appropriate DSP and network partners, including bidding, pacing and placement optimization."],
    ["Display, Video & Native Creative","Campaigns can include responsive display concepts, static creative, video, native placements and landing-page recommendations."],
    ["First-Party Data Activation","Where technically and legally appropriate, CRM lists, customer audiences and website engagement data can support smarter targeting and retargeting."],
    ["Retargeting & Funnel Campaigns","We create audience journeys for visitors, active prospects, abandoned leads and high-intent users rather than treating every impression the same."],
    ["Measurement & Optimization","We monitor spend, reach, frequency, conversions, CPA and downstream performance so budget can move toward stronger audiences and placements."]
  ],
  deliverables:[
    "Programmatic media strategy and channel plan",
    "Audience and targeting matrix",
    "Campaign and conversion tracking setup",
    "Creative specifications and ad concepts",
    "Display, video, native or CTV campaign configuration",
    "Bid, budget and frequency management",
    "Placement and brand-safety review",
    "Performance dashboard and optimization reporting"
  ],
  process:[
    ["Plan","Define goals, conversion events, audiences, markets, inventory types, creative needs and budget."],
    ["Build","Configure audiences, tracking, media buying, creative variations, exclusions and landing-page journeys."],
    ["Launch","Activate campaigns with controlled pacing and early monitoring for delivery, quality and conversion signals."],
    ["Optimize","Refine targeting, creative, frequency, bids and placements based on performance and business outcomes."]
  ],
  capabilityGroups:[
    {
      name:"Audience Options",
      items:["Demographics","Interests","Contextual signals","Remarketing","CRM audiences","Firmographics","Job roles","Geography"]
    },
    {
      name:"Creative Formats",
      items:["Display","Native","Online video","Connected TV","Responsive ads","Retargeting creative","Landing pages"]
    },
    {
      name:"Measurement",
      items:["Impressions","Reach","Frequency","Clicks","View-through conversions","CPA","Leads","Revenue signals"]
    },
    {
      name:"Technology",
      items:["DSPs","Google Analytics 4","Google Tag Manager","CRM integrations","Conversion APIs","Attribution tools","Audience platforms"]
    }
  ],
  audiences:[
    ["🏢","B2B Companies","Reach buying committees and priority account profiles outside traditional search campaigns."],
    ["🛒","Ecommerce Brands","Expand acquisition and retargeting through display, video and customer-data activation."],
    ["🏠","Local & Multi-location","Reach defined geographic markets with controlled media, audience and frequency strategies."],
    ["📺","Consumer Brands","Combine online video, connected TV, display and retargeting across the customer journey."]
  ],
  compliance:"",
  faqs:[
    ["What is programmatic advertising?","Programmatic advertising uses automated technology and data signals to buy and place digital advertising inventory. Instead of manually negotiating every placement, campaigns can evaluate available impressions and bid for relevant opportunities in real time."],
    ["How is programmatic advertising different from Google Ads?","Google Ads focuses mainly on Google's own advertising ecosystem. Programmatic campaigns can provide access to a broader mix of publisher, display, video, native and connected-TV inventory through demand-side platforms and media partners."],
    ["What kinds of programmatic ads can Amplipath manage?","Depending on the strategy and available inventory, campaigns can include display, native, online video, connected TV and retargeting formats."],
    ["Can you use our CRM or customer data for targeting?","Where consent, privacy requirements and platform rules permit, first-party data can be used to create or refine audiences, suppress existing customers, support retargeting and improve conversion measurement."],
    ["Does programmatic advertising work for B2B companies?","Yes. B2B strategies can use firmographic, industry, role, account, contextual and remarketing signals to reach audiences beyond standard keyword-based advertising."],
    ["How much budget do we need?","The right budget depends on market size, audience availability, campaign objectives, creative formats and the media platforms being used. Amplipath scopes media investment separately from management and creative requirements."],
    ["How do you measure programmatic performance?","We can measure delivery metrics such as reach, frequency and CPM alongside business metrics such as qualified traffic, conversions, cost per acquisition, lead quality and revenue where suitable tracking is available."],
    ["Can programmatic advertising replace paid search?","Usually it works best as part of a broader mix. Paid search captures existing demand, while programmatic advertising can expand reach, build awareness, re-engage prospects and create additional touchpoints across the buying journey."]
  ],
  related:[
    ["Display Advertising","Reach prospects through visual campaigns across relevant digital properties."],
    ["YouTube & Video Ads","Build demand with video-first advertising and remarketing."],
    ["Paid Search / PPC","Capture high-intent demand across search engines."]
  ],
  ctaTitle:"Turn audience data into smarter advertising.",
  ctaText:"Tell Amplipath who you need to reach, where you want to grow and what a valuable conversion looks like. We'll design the media strategy around it."
},

/* ============================================================
   3. GOOGLE LOCAL SERVICES ADS
============================================================ */
{
  file:"google-local-services-ads.html",
  slug:"google-local-services-ads",
  category:"Local Lead Generation",
  eyebrow:"Google Local Advertising",
  title:"Google Local Services Ads Management: <em>Turn Local Searches Into Qualified Leads</em>",
  shortTitle:"Google Local Services Ads",
  metaTitle:"Google Local Services Ads Management | Amplipath",
  metaDescription:"Google Local Services Ads management for eligible local businesses. Amplipath helps with eligibility, setup, verification, service areas, budgets, lead quality, reviews and reporting.",
  intro:"Google Local Services Ads help eligible local businesses connect with people actively searching for nearby services. Amplipath helps you navigate eligibility and verification, configure service areas, manage budgets and lead flow, strengthen your profile, and measure which enquiries are actually becoming customers.",
  stats:[
    ["Pay-per-lead","Model"],
    ["Local","Intent"],
    ["Verified","Eligibility"],
    ["Lead-level","Reporting"]
  ],
  problems:[
    ["Verification becomes a bottleneck","Business information, licensing, insurance or other screening requirements can delay activation when the setup is incomplete."],
    ["Your service areas are inefficient","Targeting locations you cannot serve profitably can waste lead capacity and reduce operational efficiency."],
    ["You pay for leads but do not track quality","Without intake tracking, a business can optimize for lead volume while overlooking booking rate and actual revenue."],
    ["Your reviews and response process are weak","Slow responses and an underdeveloped local reputation can reduce the value of high-intent enquiries."]
  ],
  pillars:[
    ["Eligibility & Setup Support","We review your category, market and available Local Services Ads options, then help organize the business information required for setup."],
    ["Screening & Profile Readiness","We help prepare the profile and verification workflow while recognizing that final approval and screening decisions remain with Google."],
    ["Service Area Strategy","Campaign geography is aligned with the locations, jobs, margins and service categories your business actually wants."],
    ["Budget & Lead Management","We monitor budget allocation, bidding settings and lead volume while keeping attention on lead relevance and operational capacity."],
    ["Reviews & Local Trust","We help align review-generation practices, Google Business Profile signals and customer experience with your local advertising strategy."],
    ["Reporting & Lead Quality","We connect ad enquiries to calls, messages, bookings and customer outcomes so decisions are based on more than raw lead counts."]
  ],
  deliverables:[
    "LSA eligibility and readiness review",
    "Account and profile setup assistance",
    "Service category and area configuration",
    "Budget and bidding recommendations",
    "Lead tracking and quality review",
    "Review-generation workflow recommendations",
    "Google Business Profile alignment",
    "Recurring lead, spend and booking reports"
  ],
  process:[
    ["Assess","Confirm market, category, eligibility considerations, service areas and current local search presence."],
    ["Prepare","Organize profile data, verification requirements, tracking, service categories and lead-handling processes."],
    ["Launch","Activate approved campaigns, establish budgets and monitor early lead volume and quality."],
    ["Improve","Refine service areas, budget, intake, reviews and supporting local marketing based on real customer outcomes."]
  ],
  capabilityGroups:[
    {
      name:"Management Areas",
      items:["Eligibility","Verification support","Service areas","Budgets","Bidding","Lead quality","Reviews","Reporting"]
    },
    {
      name:"Lead Types",
      items:["Phone calls","Messages","Quote requests","Bookings where available","Direct enquiries"]
    },
    {
      name:"Supporting Channels",
      items:["Google Business Profile","Local SEO","Google Search Ads","Review strategy","Call tracking","CRM"]
    },
    {
      name:"Performance Signals",
      items:["Lead volume","Cost per lead","Valid lead rate","Booking rate","Response time","Customer value","Service-area performance"]
    }
  ],
  audiences:[
    ["🔧","Home Services","Plumbers, HVAC companies, electricians, contractors and other eligible home-service providers."],
    ["⚖️","Professional Services","Eligible local professional businesses seeking high-intent enquiries in supported markets."],
    ["🏠","Multi-location Businesses","Organizations that need structured service areas, lead routing and performance visibility."],
    ["📍","Local Growth Teams","Businesses combining Local Services Ads with Google Business Profile, local SEO and traditional PPC."]
  ],
  compliance:"Google controls Local Services Ads eligibility, screening, supported categories, badges and verification requirements. Availability and product structure can vary by country, industry and account. Amplipath can assist with preparation and management, but cannot guarantee Google approval, a particular badge, lead volume or placement.",
  faqs:[
    ["What are Google Local Services Ads?","Local Services Ads are Google's local lead-generation ads for eligible service businesses. They can connect searchers directly with providers through calls, messages, quote requests or booking options depending on the market and category."],
    ["Do Local Services Ads charge per click?","The traditional Local Services Ads model charges for valid leads rather than ordinary website clicks. Google is also evolving some local lead-generation products and interfaces, so the exact campaign experience can vary by account, country and category."],
    ["Is my business eligible for Local Services Ads?","Eligibility depends on Google's supported categories, location and screening requirements. We can review your business and market, but Google makes the final eligibility and verification decisions."],
    ["Can Amplipath guarantee a Google badge or verification?","No. Screening, verification and any trust designation are controlled by Google and may involve business, licence, insurance or background requirements depending on the category and region."],
    ["Can bad leads be disputed?","Google's lead-credit and dispute options vary by country, vertical and product configuration. Where an account supports those features, Amplipath can help review lead quality and maintain a process for handling questionable leads."],
    ["Should I stop running regular Google Search Ads if I use LSAs?","Usually not. Local Services Ads, Google Search Ads, Google Business Profile optimization and local SEO serve different parts of local search visibility and can work together."],
    ["What metrics should we track?","Beyond cost per lead, we recommend tracking answer rate, qualified lead rate, booking rate, job value, customer acquisition cost and revenue by service category or location whenever your CRM and phone systems make that possible."],
    ["How long does setup take?","Timing varies because verification and screening can depend on your industry, documents, country and Google's review process. Amplipath can help make the preparation cleaner, but cannot control Google's review timeline."]
  ],
  related:[
    ["Local SEO","Improve organic visibility in maps and location-based search."],
    ["Google Business Profile","Strengthen the business information and reputation supporting local discovery."],
    ["Google Ads Management","Capture additional search demand with conventional paid search."]
  ],
  ctaTitle:"Get more value from high-intent local searches.",
  ctaText:"Amplipath can review your eligibility, profile readiness, service areas and lead-handling system before building a Local Services Ads management plan."
},

/* ============================================================
   4. WEBSITE SECURITY
============================================================ */
{
  file:"website-security-analysis.html",
  slug:"website-security-analysis",
  category:"Web Development & Security",
  eyebrow:"Website Security",
  title:"Website Security Analysis & Testing: <em>Find Weaknesses Before They Become Expensive Problems</em>",
  shortTitle:"Website Security Analysis",
  metaTitle:"Website Security Analysis & Testing | Amplipath",
  metaDescription:"Website security audits and vulnerability analysis covering web applications, SSL/TLS, servers, software, malware, access controls, backups and practical remediation recommendations.",
  intro:"A website can look perfectly healthy while outdated software, weak access controls, exposed services or insecure configuration quietly increase business risk. Amplipath reviews the technical security posture of your website and turns findings into a practical remediation plan your team can act on.",
  stats:[
    ["Web app","Review"],
    ["Server","Checks"],
    ["SSL/TLS","Analysis"],
    ["Actionable","Remediation"]
  ],
  problems:[
    ["Your website has not been reviewed recently","Themes, plugins, frameworks, server software and integrations change over time, creating new security exposure."],
    ["You do not know what an attacker can see","Publicly exposed services, weak configurations or unnecessary information can make reconnaissance easier."],
    ["A breach could interrupt sales or lead generation","Security incidents can create downtime, lost customer confidence, cleanup costs and operational disruption."],
    ["Your team receives findings but no priorities","A long vulnerability list is less useful than knowing which issues matter most and what should be fixed first."]
  ],
  pillars:[
    ["Website Vulnerability Review","We inspect your public website and application surface for common weaknesses, risky configuration and signs that require deeper investigation."],
    ["Software & Dependency Review","We review exposed CMS, plugin, theme, framework and server components for outdated or vulnerable software where detectable."],
    ["SSL/TLS & Security Headers","HTTPS configuration, certificate health and important browser security headers can be reviewed as part of the assessment."],
    ["Malware & Integrity Checks","We look for suspicious scripts, injected content, redirects, known malware indicators and other signs of compromise."],
    ["Access & Hardening Review","Administrative access, authentication practices, permissions, exposed endpoints and hardening opportunities are assessed within the agreed scope."],
    ["Prioritized Remediation Plan","Findings are grouped by severity and business impact so developers and administrators know what to address first."]
  ],
  deliverables:[
    "Website and web-application security assessment",
    "SSL/TLS and HTTPS configuration review",
    "CMS, plugin, theme or dependency review",
    "Server and publicly exposed service checks",
    "Malware and suspicious-code screening",
    "Security header and configuration review",
    "Prioritized vulnerability findings report",
    "Developer-ready remediation recommendations"
  ],
  process:[
    ["Scope","Define domains, applications, technology, access level and testing boundaries before work begins."],
    ["Assess","Review the website, configuration, exposed services and agreed technical areas using non-destructive testing methods."],
    ["Prioritize","Separate informational issues from weaknesses that could create material security or business risk."],
    ["Remediate","Provide clear recommendations and, where contracted, assist your developer or hosting team with fixes and retesting."]
  ],
  capabilityGroups:[
    {
      name:"Website Layer",
      items:["Web applications","CMS","Plugins","Themes","Forms","Authentication","Admin surfaces","Third-party scripts"]
    },
    {
      name:"Infrastructure",
      items:["Web servers","DNS observations","SSL/TLS","HTTP headers","Software versions","Public services","Hosting configuration"]
    },
    {
      name:"Security Operations",
      items:["Malware review","Patch hygiene","Backups","Access control","Hardening","Incident readiness","Retesting"]
    },
    {
      name:"Reporting",
      items:["Severity","Evidence","Business impact","Affected component","Recommended fix","Priority order","Retest status"]
    }
  ],
  audiences:[
    ["🛒","Ecommerce Websites","Sites processing orders and customer information where availability and trust are commercially important."],
    ["🏢","Business Websites","Lead-generation and corporate sites that depend on uptime, forms and brand credibility."],
    ["💻","Web Applications","Custom applications, dashboards and portals with authentication or more complex application logic."],
    ["🧩","WordPress & CMS Sites","Websites with plugins, themes and frequent software updates that require regular maintenance discipline."]
  ],
  compliance:"Security testing is performed only on systems the client owns or is explicitly authorized to test. Standard assessments are designed to be controlled and non-destructive. No security provider can guarantee that a website will never be compromised; the goal is to reduce known risk, improve hardening and strengthen detection and response.",
  faqs:[
    ["What is a website security analysis?","It is a structured review of a website's security posture, including the application, software stack, configuration and publicly visible infrastructure within an agreed scope. The objective is to identify weaknesses and provide practical remediation guidance."],
    ["Is this the same as a penetration test?","Not necessarily. A security analysis can include vulnerability testing and manual validation without performing aggressive exploitation. Formal penetration testing is a deeper engagement with explicitly defined attack scenarios and authorization. We scope the appropriate level before testing."],
    ["Can you check a hacked website?","Yes. A compromised-site engagement can focus on identifying suspicious changes, malware indicators, vulnerable entry points and recovery priorities. Depending on the incident, specialist hosting, forensic or infrastructure support may also be required."],
    ["Can Amplipath guarantee my website cannot be hacked?","No responsible security provider can promise absolute security. The objective is to reduce avoidable risk, identify known weaknesses, strengthen configuration and improve the organization's ability to respond to future issues."],
    ["How often should a website be reviewed?","Frequency depends on risk and change rate. Ecommerce sites, custom applications and frequently updated CMS websites generally benefit from recurring reviews, especially after major releases, migrations or changes to hosting and authentication."],
    ["Will you fix the issues you find?","We provide prioritized remediation instructions. Depending on the technology and project scope, Amplipath can also implement selected fixes or work with your existing developer, host or IT provider."],
    ["Will the testing cause downtime?","Standard assessments are scoped to minimize operational impact and avoid destructive techniques. Any testing that could create increased risk must be explicitly discussed and authorized beforehand."],
    ["What will the final report contain?","The report can include an executive summary, technical findings, severity, evidence, affected systems, likely impact, remediation guidance and recommended priorities, with retesting available when required."]
  ],
  related:[
    ["Website Development","Repair, rebuild or modernize websites that have accumulated technical debt."],
    ["Website Maintenance","Keep software, performance, backups and routine website operations under control."],
    ["Technical SEO","Resolve technical issues that affect crawling, performance and organic visibility."]
  ],
  ctaTitle:"Know where your website is exposed.",
  ctaText:"Request a website security review and receive a prioritized picture of what needs attention, what can wait and what your developers should fix first."
},

/* ============================================================
   5. WEBSITE COPYWRITING
============================================================ */
{
  file:"website-copywriting.html",
  slug:"website-copywriting",
  category:"Content Marketing",
  eyebrow:"SEO + Conversion Copy",
  title:"Website Copywriting Services: <em>Clear, Search-Ready Copy That Converts</em>",
  shortTitle:"Website Copywriting",
  metaTitle:"Website Copywriting Services | Amplipath",
  metaDescription:"Professional website copywriting for service pages, landing pages, ecommerce, SEO, GEO/AEO, brand voice, content refreshes and conversion-focused websites.",
  intro:"Your website copy has to explain what you do, answer the questions buyers actually have, support search visibility and give visitors a reason to take the next step. Amplipath combines research, brand voice, SEO, AI-search readiness and conversion strategy to create copy built for both discovery and action.",
  stats:[
    ["SEO + GEO","Ready"],
    ["Human","Editorial review"],
    ["Brand-led","Messaging"],
    ["Conversion","Focused"]
  ],
  problems:[
    ["Visitors do not understand your offer quickly","Complex or generic language makes prospects work too hard to understand what you sell and why it matters."],
    ["Your pages target the wrong search intent","A page can mention keywords and still fail when it does not answer the problem behind the search."],
    ["Your website sounds like everyone else","Overused claims and AI-generated filler can weaken trust and make differentiation difficult."],
    ["Traffic reaches the page but does not convert","Weak hierarchy, unclear proof and poor calls to action can reduce enquiries even when traffic is healthy."]
  ],
  pillars:[
    ["Messaging & Brand Voice","We clarify audience, offer, differentiation, tone and proof so the copy sounds recognizably like your business."],
    ["Keyword & Search-Intent Research","Search demand and buyer questions inform page structure without forcing unnatural keyword repetition."],
    ["SEO, GEO & AEO Optimization","Content is structured for traditional search while also making important facts and answers easier for AI search systems to interpret."],
    ["Service & Product Copy","We write detailed pages that explain benefits, use cases, differentiators, deliverables and next steps."],
    ["Landing & Conversion Copy","Campaign pages are built around one audience, one offer and a deliberate conversion path."],
    ["Content Refresh & Optimization","Existing pages can be rewritten, consolidated or expanded when the current copy is thin, outdated, duplicated or poorly aligned with intent."]
  ],
  deliverables:[
    "Messaging and brand-voice review",
    "Keyword and search-intent research",
    "Page outline and information hierarchy",
    "Original website or landing-page copy",
    "SEO title and meta description recommendations",
    "FAQ and AI-answer-ready content",
    "CTA and conversion-message recommendations",
    "Developer-ready copy handoff or HTML-ready formatting"
  ],
  process:[
    ["Discover","Review your audience, offer, existing site, competitors, brand guidelines and business objectives."],
    ["Research","Map search intent, buyer questions, useful proof, competitive gaps and topics the page must answer."],
    ["Write & Edit","Develop structured copy, then refine clarity, persuasion, accuracy, tone and search alignment."],
    ["Publish & Improve","Hand off implementation-ready content and refine important pages as rankings, conversions and products evolve."]
  ],
  capabilityGroups:[
    {
      name:"Page Types",
      items:["Homepages","Service pages","Landing pages","Product pages","Category pages","About pages","Location pages","Sales pages"]
    },
    {
      name:"Content Formats",
      items:["Website copy","Blog articles","Guides","FAQs","Case studies","Email copy","Ad landing pages","Product descriptions"]
    },
    {
      name:"Optimization",
      items:["SEO","GEO","AEO","Internal linking","Search intent","Entity clarity","Featured-answer formatting","Conversion copy"]
    },
    {
      name:"Editorial",
      items:["Brand voice","Fact review","Readability","Tone","Structure","Proof points","Calls to action","Human editing"]
    }
  ],
  audiences:[
    ["🏢","Service Businesses","Explain complex services more clearly and turn search traffic into enquiries."],
    ["🛒","Ecommerce","Improve product, category and promotional copy across the buying journey."],
    ["💻","SaaS & Technology","Translate technical features into differentiated, commercially useful messaging."],
    ["🌍","Growing Brands","Refresh inconsistent website content as offers, markets and positioning evolve."]
  ],
  compliance:"",
  faqs:[
    ["What is included in website copywriting services?","A typical project can include research, messaging strategy, page structure, keyword and intent analysis, copywriting, editing, SEO recommendations, FAQs and calls to action. The exact scope depends on the pages and business goals."],
    ["Do you use AI to write website content?","Amplipath may use AI tools for research, ideation, analysis or workflow support where useful, but final website copy is reviewed and shaped by a human strategist or editor. We do not treat raw automated output as finished client copy."],
    ["Is the copy optimized for SEO?","Yes, when SEO is part of the scope. We map the page to relevant search intent, topics and supporting terms while prioritizing natural language and usefulness rather than keyword stuffing."],
    ["Can you optimize copy for ChatGPT and AI search?","We can structure content for GEO/AEO by making important entities, facts, definitions, FAQs, comparisons and answers easier to understand and cite. No agency can guarantee inclusion in a specific AI answer."],
    ["Can you rewrite our existing website instead of starting from scratch?","Yes. We can audit current pages, preserve useful material, remove repetition, improve positioning, expand weak sections and align the content with search and conversion goals."],
    ["Will the content be original?","Yes. Final deliverables are written for your brand and should not reproduce competitors' protected copy. Competitor research is used to understand market expectations, content gaps and positioning opportunities."],
    ["Do you upload the copy to our website?","Implementation can be included when appropriate or the content can be delivered in a clean developer-ready format for your existing team to publish."],
    ["How is website copywriting priced?","Pricing depends on page count, complexity, research requirements, industry, word depth and whether strategy, SEO or implementation is included. Amplipath can quote a defined project or an ongoing content engagement."]
  ],
  related:[
    ["Content Marketing","Build a broader content system around commercial and informational search demand."],
    ["SEO Services","Improve the technical, content and authority signals supporting organic growth."],
    ["GEO / AEO","Prepare important website content for AI-generated search and answer engines."]
  ],
  ctaTitle:"Make every important page easier to understand — and easier to act on.",
  ctaText:"Send Amplipath your website and priorities. We'll identify which pages need rewriting, expansion or better search and conversion alignment."
},

/* ============================================================
   6. MLM / NETWORK MARKETING
============================================================ */
{
  file:"mlm-network-marketing.html",
  slug:"mlm-network-marketing",
  category:"Niche & Growth Marketing",
  eyebrow:"Network Marketing Growth",
  title:"MLM & Network Marketing Services: <em>Build a Smarter, Compliance-Aware Growth System</em>",
  shortTitle:"MLM & Network Marketing",
  metaTitle:"MLM & Network Marketing Services | Amplipath",
  metaDescription:"Marketing services for legitimate MLM and network marketing businesses including funnels, customer acquisition, distributor lead generation, content, paid media, email, WhatsApp, CRM and onboarding systems.",
  intro:"Network marketing businesses need more than motivational social posts. Amplipath builds structured digital systems for legitimate product-led MLM and direct-selling companies — covering customer acquisition, distributor lead generation, landing pages, content, CRM follow-up, automation and performance tracking while keeping compliance at the center of the strategy.",
  stats:[
    ["Product-led","Strategy"],
    ["Multi-channel","Funnels"],
    ["CRM","Follow-up"],
    ["Compliance","Aware"]
  ],
  problems:[
    ["Your distributors rely only on personal contacts","A business cannot build a dependable acquisition engine when every distributor is expected to market only through friends and family."],
    ["Recruitment messages create compliance risk","Unsubstantiated income, lifestyle or product claims can expose both the company and individual distributors to significant problems."],
    ["Leads disappear after the first conversation","Without CRM, automation, education and follow-up, interested prospects often receive inconsistent communication."],
    ["Every distributor invents their own marketing","When field teams create unapproved messaging and assets, the brand becomes inconsistent and difficult to govern."]
  ],
  pillars:[
    ["Network Marketing Strategy","We map products, customer segments, distributor profiles, acquisition channels, compliance boundaries and the complete lead journey before campaigns launch."],
    ["Recruitment Funnels","We create educational landing pages and lead-generation journeys for prospective distributors without relying on deceptive earnings or lifestyle promises."],
    ["Product Customer Acquisition","Campaigns can prioritize real retail demand for the underlying products or services through content, search, social and paid media."],
    ["Distributor Content Systems","We develop reusable social, educational and campaign content that makes it easier for field teams to communicate consistently."],
    ["Email, SMS & WhatsApp Follow-Up","Lead nurturing can include automated education, reminders, webinar follow-up, product sequences and distributor onboarding where consent and platform rules allow."],
    ["CRM & Lead Routing","We help organize enquiries, assign leads, track follow-up activity and create visibility into which channels are actually producing customers or qualified distributor prospects."]
  ],
  deliverables:[
    "Network marketing digital growth strategy",
    "Customer and distributor audience mapping",
    "Recruitment and product landing pages",
    "Lead magnets, webinar or presentation funnels",
    "Social media content and distributor asset kits",
    "Email, SMS or WhatsApp nurture workflows",
    "CRM setup and lead-routing recommendations",
    "Campaign reporting and conversion optimization"
  ],
  process:[
    ["Audit","Review the compensation communication, products, audiences, existing funnels, distributor journey and marketing policies."],
    ["Build","Create compliant messaging, landing pages, lead capture, CRM workflows, approved content and campaign infrastructure."],
    ["Activate","Launch suitable organic and paid channels, education campaigns, webinars, product offers and follow-up sequences."],
    ["Scale Carefully","Improve conversion and distributor enablement while monitoring claim quality, lead quality and platform-policy requirements."]
  ],
  capabilityGroups:[
    {
      name:"Growth Channels",
      items:["SEO","Social media","Content marketing","Email","WhatsApp","Webinars","Influencer campaigns","Paid ads where permitted"]
    },
    {
      name:"Funnel Assets",
      items:["Recruitment pages","Product pages","Lead magnets","Webinar funnels","Application forms","Thank-you pages","Training portals"]
    },
    {
      name:"Systems",
      items:["CRM","Lead routing","Marketing automation","Distributor onboarding","Analytics","Conversion tracking","Dashboards"]
    },
    {
      name:"Governance",
      items:["Approved messaging","Claim review","Content templates","Brand consistency","Disclosure placement","Distributor guidelines"]
    }
  ],
  audiences:[
    ["📦","Product-led MLM Companies","Legitimate direct-selling brands that want stronger retail customer acquisition and digital infrastructure."],
    ["👥","Network Marketing Teams","Established field organizations that need repeatable lead generation, follow-up and content systems."],
    ["🌍","International Direct Selling","Companies localizing funnels, messaging and acquisition strategies for different regional markets."],
    ["🚀","Growing Distributor Leaders","High-performing teams that have outgrown manual prospecting and need organized marketing operations."]
  ],
  compliance:"Amplipath does not promote illegal pyramid schemes, deceptive investment opportunities or unsupported income, health, lifestyle or product claims. MLM and direct-selling marketing must comply with applicable laws, platform advertising policies and the company's own approved claims. Paid advertising availability also varies by platform and market, and ad approval cannot be guaranteed.",
  faqs:[
    ["What is MLM or network marketing digital marketing?","It is the use of websites, content, search, social media, lead funnels, CRM and automation to help legitimate direct-selling companies acquire retail customers and communicate with prospective distributors more systematically."],
    ["Can you generate distributor leads?","Yes, we can build marketing funnels intended to attract and educate prospective distributors. The strategy avoids presenting participation as guaranteed income and should use accurate, substantiated representations about the opportunity."],
    ["Can you run Facebook, Instagram, Google or TikTok ads for an MLM?","Possibly, but business-opportunity and MLM advertising is subject to platform-specific policies and account review. We evaluate the offer, creative and destination before recommending paid media, and we cannot guarantee platform approval."],
    ["Can our marketing promise how much distributors will earn?","Only claims that are lawful, properly substantiated and representative should be used. We strongly recommend avoiding exaggerated earnings or luxury-lifestyle messaging and ensuring any required disclosures are clear and prominent."],
    ["Can you help sell the actual MLM products instead of only recruiting distributors?","Yes. In many cases, strong retail customer demand is an important part of a healthier digital strategy. We can build product-focused SEO, content, ecommerce, social campaigns, email marketing and customer-retention systems."],
    ["Can you build a distributor recruitment website or funnel?","Yes. We can create landing pages, educational funnels, application flows, webinar journeys and CRM follow-up while keeping the messaging focused on accurate information rather than unrealistic promises."],
    ["Can you create marketing materials for our distributors?","Yes. Amplipath can create approved social posts, email templates, landing-page assets, educational materials, onboarding sequences and campaign kits that help distributors communicate more consistently."],
    ["Do you provide WhatsApp marketing for network marketing?","Yes, where appropriate and consent-based. WhatsApp can support lead follow-up, webinar reminders, onboarding, customer communication and distributor education, especially in mobile-first markets."],
    ["Do you work with any MLM company?","No. We work with legitimate businesses selling real products or services and reserve the right to reject projects involving pyramid structures, deceptive recruiting, misleading financial representations or unsupported product claims."],
    ["Can you help us market internationally?","Yes. International work can include localized landing pages, paid and organic channel strategy, CRM workflows, WhatsApp marketing and regional content, while the client remains responsible for obtaining appropriate legal guidance for each market."]
  ],
  related:[
    ["Social Media Marketing","Create structured brand and campaign content across priority social channels."],
    ["Marketing Automation","Turn enquiries into organized follow-up, nurturing and CRM workflows."],
    ["Africa Market Services","Localize mobile-first acquisition and WhatsApp-led campaigns across African markets."]
  ],
  ctaTitle:"Build a network marketing system that does more than post motivational content.",
  ctaText:"Amplipath can map your customer journey, distributor funnel, content, follow-up and CRM into one measurable digital growth system."
}

];

