export interface ChildServiceItem {
  name: string;
  slug: string;
  href: string;
  desc: string;
  icon: string;
  badge?: string;
}

export interface ParentCategoryData {
  id: string;
  categoryName: string;
  categoryTag: string;
  categoryIcon: string;
  gradient: string;
  h1: string;
  sub: string;
  aliases: string[];
  childServices: ChildServiceItem[];
  focusAreas?: Array<{ name: string; href: string }>;
  sidebarCta?: { title: string; text: string; buttonText: string };
}

export const PARENT_CATEGORIES: Record<string, ParentCategoryData> = {
  'search-seo': {
    id: 'search-seo',
    categoryName: 'Search & GEO/AEO',
    categoryTag: 'SEARCH & GEO/AEO SERVICES',
    categoryIcon: '🔍',
    gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    h1: 'Be found everywhere your customers search — including AI.',
    sub: 'From first-page Google rankings to AI-generated citations in ChatGPT, Perplexity and Gemini — comprehensive organic and paid search solutions engineered for scalable market leadership.',
    aliases: ['search-geo-aeo', 'search-seo', 'geo-search', 'seo-services'],
    focusAreas: [
      { name: 'SEO Optimization', href: '/services/seo' },
      { name: 'GEO / AEO — AI Search', href: '/services/geo' },
      { name: 'Local SEO', href: '/services/localseo' },
      { name: 'Technical SEO', href: '/services/techseo' },
      { name: 'SEM & Google Ads', href: '/services/sem' },
    ],
    sidebarCta: {
      title: 'Losing organic search market share?',
      text: 'Request a full search audit — discover keyword gaps, technical crawl blockers and AI search citations.',
      buttonText: 'Request Search Audit →',
    },
    childServices: [
      {
        name: 'SEO Optimization',
        slug: 'seo',
        href: '/services/seo',
        desc: 'Custom SEO strategies engineered to future-proof your discoverability and capture first-page rankings.',
        icon: '🔍',
      },
      {
        name: 'GEO / AEO — AI Search',
        slug: 'geo',
        href: '/services/geo',
        desc: 'Optimize your brand for citations in ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews.',
        icon: '🤖',
        badge: 'NEW ERA',
      },
      {
        name: 'Local SEO',
        slug: 'localseo',
        href: '/services/localseo',
        desc: 'Dominate local search and Google Maps results in any city, region or territory.',
        icon: '📍',
      },
      {
        name: 'Technical SEO',
        slug: 'techseo',
        href: '/services/techseo',
        desc: 'Core Web Vitals, site architecture, structured data, indexation and performance audits.',
        icon: '⚙️',
      },
      {
        name: 'E-Commerce SEO',
        slug: 'ecoseo',
        href: '/services/ecoseo',
        desc: 'Drive high-intent organic traffic to product and category pages that convert into sales.',
        icon: '🛒',
      },
      {
        name: 'Video SEO',
        slug: 'videoseo',
        href: '/services/videoseo',
        desc: 'Rank higher in YouTube search and Google video carousels with strategic metadata optimization.',
        icon: '🎥',
      },
      {
        name: 'SEM & Google Ads',
        slug: 'sem',
        href: '/services/sem',
        desc: 'High-intent search, shopping and Performance Max campaigns with transparent ROI tracking.',
        icon: '🎯',
      },
      {
        name: 'Reddit Marketing & SEO',
        slug: 'redditmarketing',
        href: '/services/redditmarketing',
        desc: 'Leverage Reddit community authority and organic conversations that Google search prioritizes.',
        icon: '💬',
      },
      {
        name: 'Google Business Profile',
        slug: 'gbp',
        href: '/services/gbp',
        desc: 'Complete GBP optimization, review acquisition systems and local map pack dominance.',
        icon: '🏢',
      },
      {
        name: 'Amazon SEO & Marketplace',
        slug: 'amazonseo',
        href: '/services/amazonseo',
        desc: 'A9/Cosmo algorithm optimization, keyword indexing and premium A+ content design.',
        icon: '📦',
      },
      {
        name: 'Pinterest SEO',
        slug: 'pinterestseo',
        href: '/services/pinterestseo',
        desc: 'Visual search optimization, rich pins and high-intent visual commerce traffic.',
        icon: '📌',
      },
      {
        name: 'AI Brand Positioning',
        slug: 'ai-brand-positioning',
        href: '/services/ai-brand-positioning',
        desc: 'Ensure AI search engines represent your company accurately and recommend your brand.',
        icon: '✨',
      },
      {
        name: 'Google Local Services Ads',
        slug: 'google-local-services-ads',
        href: '/services/google-local-services-ads',
        desc: 'Pay-per-lead Google Guaranteed and Screened ads for local service businesses.',
        icon: '🛡️',
      },
    ],
  },

  'ai-marketing': {
    id: 'ai-marketing',
    categoryName: 'AI Marketing',
    categoryTag: 'AI MARKETING SERVICES',
    categoryIcon: '🤖',
    gradient: 'linear-gradient(135deg, #78350f, #d97706)',
    h1: 'Scale your marketing performance with artificial intelligence.',
    sub: 'AI-driven prompt engineering, predictive campaign management, autonomous bidding and personalization systems that multiply marketing efficiency.',
    aliases: ['ai-marketing', 'aimarketing'],
    focusAreas: [
      { name: 'AI Prompt Strategy', href: '/services/aiprompt' },
      { name: 'Brand AI Design', href: '/services/brandai' },
      { name: 'Email Personalization', href: '/services/emailai' },
      { name: 'AI Ad Bidding', href: '/services/aiads' },
    ],
    sidebarCta: {
      title: 'Ready to scale marketing with AI?',
      text: 'We audit your workflows and integrate intelligent models into your content, ad, and email channels.',
      buttonText: 'Book AI Strategy Call →',
    },
    childServices: [
      {
        name: 'AI Marketing Prompt Strategy',
        slug: 'aiprompt',
        href: '/services/aiprompt',
        desc: 'Custom enterprise prompt libraries and system workflows for scalable marketing execution.',
        icon: '📝',
      },
      {
        name: 'Brand Personality Design',
        slug: 'brandai',
        href: '/services/brandai',
        desc: 'Codify your brand tone, voice and personality into AI models for unified messaging.',
        icon: '🎭',
      },
      {
        name: 'Email Marketing Personalization',
        slug: 'emailai',
        href: '/services/emailai',
        desc: 'Predictive send-time and hyper-personalized content blocks that double engagement.',
        icon: '📧',
      },
      {
        name: 'AI-Powered Campaign Mgmt',
        slug: 'aicampaign',
        href: '/services/aicampaign',
        desc: 'Machine learning campaign optimization across creative, copy and budget allocation.',
        icon: '📈',
      },
      {
        name: 'AI-Powered Ad Bidding',
        slug: 'aiads',
        href: '/services/aiads',
        desc: 'Real-time algorithm bidding that maximizes ROAS while eliminating wasted ad spend.',
        icon: '⚡',
      },
    ],
  },

  'paid-ads': {
    id: 'paid-ads',
    categoryName: 'Social & Paid Ads',
    categoryTag: 'SOCIAL MEDIA & PAID ADVERTISING',
    categoryIcon: '💰',
    gradient: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
    h1: 'Data-driven paid and social campaigns that maximize every dollar spent.',
    sub: 'Full-funnel customer acquisition across Meta, TikTok, YouTube, LinkedIn, Google and Reddit — managed with obsessive attention to unit economics and ROI.',
    aliases: ['paid-ads', 'social-paid-ads', 'social-media'],
    focusAreas: [
      { name: 'Facebook & Instagram Ads', href: '/services/fbads' },
      { name: 'TikTok Ads & Shop', href: '/services/tiktok' },
      { name: 'LinkedIn Ads & B2B Lead Gen', href: '/services/linkedinads' },
      { name: 'YouTube Ads', href: '/services/ytads' },
      { name: 'Programmatic Advertising', href: '/services/programmatic-advertising' },
    ],
    sidebarCta: {
      title: 'Wasting budget on unprofitable ads?',
      text: 'Get an account audit from our paid media specialists to eliminate waste and unlock higher ROAS.',
      buttonText: 'Request Ads Audit →',
    },
    childServices: [
      {
        name: 'Social Media Marketing',
        slug: 'smm',
        href: '/services/smm',
        desc: 'Organic growth strategies, viral content frameworks and community management across platforms.',
        icon: '📱',
      },
      {
        name: 'Social Media Management',
        slug: 'smmanage',
        href: '/services/smmanage',
        desc: 'Done-for-you daily posting, comment management, monthly reporting and community building.',
        icon: '🗓️',
      },
      {
        name: 'Social Commerce',
        slug: 'socialcommerce',
        href: '/services/socialcommerce',
        desc: 'Turn social into a direct sales channel — TikTok Shop, Instagram Shopping and in-app checkout funnels.',
        icon: '🛍️',
      },
      {
        name: 'Facebook & Instagram Ads',
        slug: 'fbads',
        href: '/services/fbads',
        desc: 'Full-funnel Meta campaigns — prospecting, retargeting and creative testing frameworks.',
        icon: '👥',
      },
      {
        name: 'TikTok Ads & Shop',
        slug: 'tiktok',
        href: '/services/tiktok',
        desc: 'Native short-form ad creative, TikTok Shop setup, creator collabs and viral growth campaigns.',
        icon: '🎵',
      },
      {
        name: 'YouTube Ads',
        slug: 'ytads',
        href: '/services/ytads',
        desc: 'In-stream, discovery and bumper ad campaigns on YouTube with deep audience retention tracking.',
        icon: '▶️',
      },
      {
        name: 'Influencer Marketing',
        slug: 'influencer',
        href: '/services/influencer',
        desc: 'Vetted micro to mega influencer matching globally and across African markets with tracked attribution.',
        icon: '⭐',
      },
      {
        name: 'Display Advertising',
        slug: 'display',
        href: '/services/display',
        desc: 'Targeted programmatic display, dynamic retargeting and premium brand placements.',
        icon: '🖥️',
      },
      {
        name: 'LinkedIn Ads & B2B Lead Gen',
        slug: 'linkedinads',
        href: '/services/linkedinads',
        desc: 'Account-based marketing (ABM) and verified decision-maker lead generation on LinkedIn.',
        icon: '💼',
      },
      {
        name: 'Quora Ads',
        slug: 'quoraads',
        href: '/services/quoraads',
        desc: 'Intent-based advertising reaching buyers actively asking questions and researching products.',
        icon: '❓',
      },
      {
        name: 'Reddit Ads',
        slug: 'redditads',
        href: '/services/redditads',
        desc: 'Reach niche subreddit communities with native, respectful conversation-driven ads.',
        icon: '👾',
      },
      {
        name: 'Amazon Ads Management',
        slug: 'amazonads',
        href: '/services/amazonads',
        desc: 'Sponsored Products, Sponsored Brands and DSP campaigns with strict ACoS optimization.',
        icon: '📦',
      },
      {
        name: 'Pinterest Business Optimization',
        slug: 'pinterestbiz',
        href: '/services/pinterestbiz',
        desc: 'Pinterest Business setup, catalog feed syncing, promoted pins and shopping campaigns.',
        icon: '📌',
      },
      {
        name: 'Programmatic Advertising',
        slug: 'programmatic-advertising',
        href: '/services/programmatic-advertising',
        desc: 'Omnichannel real-time bidding media buys with advanced audience data enrichment.',
        icon: '🌐',
      },
    ],
  },

  'content-strategy': {
    id: 'content-strategy',
    categoryName: 'Content & Strategy',
    categoryTag: 'CONTENT MARKETING & STRATEGY',
    categoryIcon: '✍️',
    gradient: 'linear-gradient(135deg, #14532d, #15803d)',
    h1: 'Build authority, earn trust and nurture your audience to conversion.',
    sub: 'SEO-driven content, email automation, PR and conversion copywriting that turn attention into sustainable, compounding enterprise value.',
    aliases: ['content-strategy', 'content'],
    focusAreas: [
      { name: 'Content Marketing', href: '/services/content' },
      { name: 'Marketing Strategy & Planning', href: '/services/strategy' },
      { name: 'Email Automations', href: '/services/emailauto' },
      { name: 'Conversion Rate Optimization', href: '/services/cro' },
      { name: 'Digital PR', href: '/services/digitalpr' },
    ],
    sidebarCta: {
      title: 'Content not generating pipeline?',
      text: 'Let us build a full-funnel content roadmap that turns organic readers into qualified sales leads.',
      buttonText: 'Request Strategy Plan →',
    },
    childServices: [
      {
        name: 'Content Marketing',
        slug: 'content',
        href: '/services/content',
        desc: 'Data-driven content clusters, whitepapers and case studies that attract and educate high-value buyers.',
        icon: '📚',
      },
      {
        name: 'Email Marketing',
        slug: 'email',
        href: '/services/email',
        desc: 'Revenue-generating newsletters, promotional campaigns and subscriber retention strategies.',
        icon: '✉️',
      },
      {
        name: 'Email Automations',
        slug: 'emailauto',
        href: '/services/emailauto',
        desc: 'Automated lifecycle journeys, onboarding funnels and abandoned cart recovery sequences.',
        icon: '🔄',
      },
      {
        name: 'Digital PR',
        slug: 'digitalpr',
        href: '/services/digitalpr',
        desc: 'High-authority media placements, journalist outreach and brand reputation building.',
        icon: '📰',
      },
      {
        name: 'Marketing Strategy & Planning',
        slug: 'strategy',
        href: '/services/strategy',
        desc: 'Comprehensive 90-day roadmaps, channel prioritization and KPI scorecards.',
        icon: '🗺️',
      },
      {
        name: 'Conversion Rate Optimization',
        slug: 'cro',
        href: '/services/cro',
        desc: 'A/B testing, user journey audits and multivariate experiments that lift website conversion rates.',
        icon: '🎯',
      },
      {
        name: 'Affiliate Marketing',
        slug: 'affiliate',
        href: '/services/affiliate',
        desc: 'Recruit, manage and incentivize high-volume affiliate partners to drive scalable sales.',
        icon: '🤝',
      },
      {
        name: 'Text Message Marketing',
        slug: 'sms',
        href: '/services/sms',
        desc: 'High-open-rate SMS campaigns and compliance-certified conversational messaging.',
        icon: '💬',
      },
      {
        name: 'Conversion Copywriting',
        slug: 'copywriting',
        href: '/services/copywriting',
        desc: 'Psychology-backed sales copy that commands attention and motivates immediate action.',
        icon: '✒️',
      },
      {
        name: 'CRM Setup & Marketing Automation',
        slug: 'crm',
        href: '/services/crm',
        desc: 'HubSpot, Klaviyo, Salesforce and ActiveCampaign workflow integration and pipeline automation.',
        icon: '🧩',
      },
      {
        name: 'Marketing Analytics & Data Studio',
        slug: 'marketinganalytics',
        href: '/services/marketinganalytics',
        desc: 'GA4 implementations, BigQuery pipelines and custom executive Looker Studio dashboards.',
        icon: '📊',
      },
      {
        name: 'Website Copywriting',
        slug: 'website-copywriting',
        href: '/services/website-copywriting',
        desc: 'Clear, compelling website copy that communicates value propositions and converts visitors.',
        icon: '💻',
      },
    ],
  },

  'niche-services': {
    id: 'niche-services',
    categoryName: 'Niche & Growth',
    categoryTag: 'NICHE & GROWTH MARKETING',
    categoryIcon: '🎮',
    gradient: 'linear-gradient(135deg, #7f1d1d, #b91c1c)',
    h1: 'Specialist services most agencies simply do not offer.',
    sub: 'Deep domain expertise for gaming studios, app publishers, course creators, crypto projects, and emerging African markets.',
    aliases: ['niche-services', 'niche-growth'],
    focusAreas: [
      { name: 'Game Marketing', href: '/services/game' },
      { name: 'Steam Marketing', href: '/services/steam' },
      { name: 'Mobile App Marketing', href: '/services/appmarketing' },
      { name: 'Africa Market Services', href: '/services/africa' },
      { name: 'Course Promotion', href: '/services/course' },
    ],
    sidebarCta: {
      title: 'Building in a specialized vertical?',
      text: 'Talk with our niche specialists who understand Steam wishlists, ASO metrics, and emerging market dynamics.',
      buttonText: 'Speak with Specialist →',
    },
    childServices: [
      {
        name: 'Game Marketing',
        slug: 'game',
        href: '/services/game',
        desc: 'Publisher-grade marketing for PC, console and indie games with community building.',
        icon: '🎮',
      },
      {
        name: 'Steam Marketing',
        slug: 'steam',
        href: '/services/steam',
        desc: 'Steam page optimization, wishlist velocity campaigns and launch day momentum.',
        icon: '🕹️',
      },
      {
        name: 'Mobile App Marketing',
        slug: 'appmarketing',
        href: '/services/appmarketing',
        desc: 'ASO, Apple Search Ads, Google App Campaigns and retention optimization.',
        icon: '📲',
      },
      {
        name: 'Course Promotion',
        slug: 'course',
        href: '/services/course',
        desc: 'High-ticket course launches, webinar funnels and evergreen student acquisition.',
        icon: '🎓',
      },
      {
        name: 'Music Promotion',
        slug: 'music',
        href: '/services/music',
        desc: 'Spotify playlist pitching, TikTok music trends and digital release campaigns.',
        icon: '🎵',
      },
      {
        name: 'Podcast Marketing',
        slug: 'podcast',
        href: '/services/podcast',
        desc: 'Podcast SEO, listener growth, guest booking and cross-show advertising.',
        icon: '🎙️',
      },
      {
        name: 'Book & eBook Marketing',
        slug: 'book',
        href: '/services/book',
        desc: 'Amazon KDP optimization, bestseller campaigns and reader community outreach.',
        icon: '📖',
      },
      {
        name: 'Cryptocurrency Marketing',
        slug: 'crypto',
        href: '/services/crypto',
        desc: 'Web3 community growth, Discord/Telegram engagement and compliant token PR.',
        icon: '🪙',
      },
      {
        name: 'Africa Market Services',
        slug: 'africa',
        href: '/services/africa',
        desc: 'Tailored digital growth, localized SEO and mobile commerce across 15+ African nations.',
        icon: '🌍',
        badge: 'AFRICA',
      },
      {
        name: 'MLM & Network Marketing',
        slug: 'mlm-network-marketing',
        href: '/services/mlm-network-marketing',
        desc: 'Compliant distributor acquisition, digital recruiting funnels and team onboarding systems.',
        icon: '👥',
      },
    ],
  },

  'analytics-strategy': {
    id: 'analytics-strategy',
    categoryName: 'Analytics & Strategy',
    categoryTag: 'ANALYTICS & STRATEGY',
    categoryIcon: '📊',
    gradient: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
    h1: 'Data architecture and marketing strategy that turn insights into decisions.',
    sub: 'Clean tracking, multi-touch attribution, link building, PR and executive reporting to eliminate wasted spend and scale predictability.',
    aliases: ['analytics-strategy', 'analytics'],
    focusAreas: [
      { name: 'Web Analytics', href: '/services/analytics' },
      { name: 'Public Relations', href: '/services/pr' },
      { name: 'Crowdfunding Marketing', href: '/services/crowdfund' },
      { name: 'Guest Posting & Link Building', href: '/services/guestpost' },
      { name: 'Brand Strategy', href: '/services/brandstrategy' },
    ],
    sidebarCta: {
      title: 'Unsure of true marketing ROI?',
      text: 'We configure GA4, server-side tracking, and Looker Studio dashboards that clearly prove channel attribution.',
      buttonText: 'Get Measurement Plan →',
    },
    childServices: [
      {
        name: 'Web Analytics',
        slug: 'analytics',
        href: '/services/analytics',
        desc: 'GA4 audits, server-side tracking, GTM setup, custom events and clean measurement architecture.',
        icon: '📈',
      },
      {
        name: 'Public Relations',
        slug: 'pr',
        href: '/services/pr',
        desc: 'Tier-1 press placements, journalist relationship management and authoritative brand coverage.',
        icon: '📢',
      },
      {
        name: 'Crowdfunding Marketing',
        slug: 'crowdfund',
        href: '/services/crowdfund',
        desc: 'Pre-launch reservation funnels, VIP communities and fully funded Kickstarter/Indiegogo campaigns.',
        icon: '🚀',
      },
      {
        name: 'Guest Posting & Link Building',
        slug: 'guestpost',
        href: '/services/guestpost',
        desc: 'High-DR editorial backlinks placed manually on legitimate, organic-traffic publications.',
        icon: '🔗',
      },
      {
        name: 'Brand Strategy',
        slug: 'brandstrategy',
        href: '/services/brandstrategy',
        desc: 'Brand positioning frameworks, competitive moat design, audience personas and brand guides.',
        icon: '🏆',
      },
    ],
  },

  'web-development': {
    id: 'web-development',
    categoryName: 'Web & Tech',
    categoryTag: 'WEB & TECHNOLOGY DEVELOPMENT',
    categoryIcon: '💻',
    gradient: 'linear-gradient(135deg, #0f172a, #334155)',
    h1: 'Build the high-performance digital foundation your marketing deserves.',
    sub: 'Ultra-fast websites, custom e-commerce stores, landing pages and web apps built for conversion, security and search engine visibility from day one.',
    aliases: ['web-development', 'web-tech', 'webdev'],
    focusAreas: [
      { name: 'Website Development', href: '/services/webdev' },
      { name: 'E-Commerce Development', href: '/services/ecomdev' },
      { name: 'Landing Pages', href: '/services/landing' },
      { name: 'Custom Websites', href: '/services/customweb' },
      { name: 'Website Security', href: '/services/website-security-analysis' },
    ],
    sidebarCta: {
      title: 'Need a fast, converting website?',
      text: 'Our engineering team builds scalable Next.js and Shopify stores optimized for sub-second speed.',
      buttonText: 'Request Dev Scope →',
    },
    childServices: [
      {
        name: 'Website Development',
        slug: 'webdev',
        href: '/services/webdev',
        desc: 'Custom Next.js, WordPress and Webflow development built for speed, responsiveness and SEO.',
        icon: '🌐',
        badge: 'POPULAR',
      },
      {
        name: 'E-Commerce Development',
        slug: 'ecomdev',
        href: '/services/ecomdev',
        desc: 'Scalable Shopify and WooCommerce stores with custom checkouts and app integrations.',
        icon: '🛒',
      },
      {
        name: 'Custom Websites',
        slug: 'customweb',
        href: '/services/customweb',
        desc: 'Bespoke web applications and portals engineered for performance and scalability.',
        icon: '💻',
      },
      {
        name: 'Landing Pages',
        slug: 'landing',
        href: '/services/landing',
        desc: 'High-converting campaign landing pages built for rapid A/B testing and maximum ROAS.',
        icon: '🎯',
      },
      {
        name: 'Dropshipping Websites',
        slug: 'dropship',
        href: '/services/dropship',
        desc: 'Turnkey automated dropshipping stores with supplier integrations and high-margin funnels.',
        icon: '📦',
      },
      {
        name: 'Website Security Analysis',
        slug: 'website-security-analysis',
        href: '/services/website-security-analysis',
        desc: 'Vulnerability audits, malware removal, SSL verification and ongoing server hardening.',
        icon: '🛡️',
      },
    ],
  },

  'ai-development': {
    id: 'ai-development',
    categoryName: 'AI Development',
    categoryTag: 'AI DEVELOPMENT & CONSULTING',
    categoryIcon: '⚡',
    gradient: 'linear-gradient(135deg, #1e1b4b, #4338ca)',
    h1: 'Build intelligence into your business — custom AI systems that deliver measurable ROI.',
    sub: 'Custom LLM applications, autonomous agent workflows, AI chatbots, mobile apps and enterprise technology consulting designed for practical ROI.',
    aliases: ['ai-development', 'aidev'],
    focusAreas: [
      { name: 'AI Development', href: '/services/aidev' },
      { name: 'AI Chatbots', href: '/services/chatbot' },
      { name: 'AI Agents', href: '/services/aiagents' },
      { name: 'AI Integrations', href: '/services/aiintegrate' },
      { name: 'Mobile Apps', href: '/services/mobileapp' },
    ],
    sidebarCta: {
      title: 'Want custom AI for your operations?',
      text: 'Talk with our AI engineers to scope custom chatbots, automated agent workflows, or predictive models.',
      buttonText: 'Scope AI Project →',
    },
    childServices: [
      {
        name: 'AI Development',
        slug: 'aidev',
        href: '/services/aidev',
        desc: 'Custom machine learning models, neural pipelines and proprietary AI software development.',
        icon: '🧠',
      },
      {
        name: 'AI Websites & Software',
        slug: 'aiwebsoft',
        href: '/services/aiwebsoft',
        desc: 'Web applications with embedded AI capabilities, natural language search and smart UX.',
        icon: '💻',
      },
      {
        name: 'AI Mobile Apps',
        slug: 'aimobile',
        href: '/services/aimobile',
        desc: 'Native iOS and Android apps powered by edge and cloud AI capabilities.',
        icon: '📱',
      },
      {
        name: 'AI Integrations',
        slug: 'aiintegrate',
        href: '/services/aiintegrate',
        desc: 'Connect OpenAI, Anthropic Claude, Gemini and open-source models into your existing stack.',
        icon: '🔌',
      },
      {
        name: 'AI Agents',
        slug: 'aiagents',
        href: '/services/aiagents',
        desc: 'Autonomous multi-step AI agents that execute complex operations 24/7 without supervision.',
        icon: '🤖',
      },
      {
        name: 'AI Technology Consulting',
        slug: 'aiconsult',
        href: '/services/aiconsult',
        desc: 'Strategic AI roadmaps, technical feasibility audits and team enablement workshops.',
        icon: '💡',
      },
      {
        name: 'AI Chatbot Development',
        slug: 'chatbot',
        href: '/services/chatbot',
        desc: 'Domain-trained customer support, sales qualification and workflow guidance chatbots.',
        icon: '💬',
      },
      {
        name: 'Mobile App Development',
        slug: 'mobileapp',
        href: '/services/mobileapp',
        desc: 'Cross-platform Flutter and React Native mobile applications built to scale to millions.',
        icon: '📲',
      },
    ],
  },

  'africa-market': {
    id: 'africa-market',
    categoryName: 'Africa Market Services',
    categoryTag: 'AFRICA MARKET SERVICES',
    categoryIcon: '🌍',
    gradient: 'linear-gradient(135deg, #14532d, #166534)',
    h1: 'Africa Market Growth Services for Brands Entering and Scaling Across Africa.',
    sub: 'Full-service digital marketing and commercial execution across 15 African markets — local SEO, WhatsApp automation, marketplace optimization and influencer campaigns.',
    aliases: ['africa-market', 'africa'],
    focusAreas: [
      { name: 'Africa Market Entry', href: '/services/africa' },
      { name: 'WhatsApp Marketing', href: '/services/sms' },
      { name: 'Local Maps & SEO', href: '/services/localseo' },
      { name: 'Social Commerce', href: '/services/socialcommerce' },
      { name: 'Paid Ads Africa', href: '/services/fbads' },
    ],
    sidebarCta: {
      title: 'Expanding into African markets?',
      text: 'Our on-the-ground specialists in Nigeria, Ghana, Kenya and South Africa will build your market entry roadmap.',
      buttonText: 'Speak with Africa Team →',
    },
    childServices: [
      {
        name: 'Africa Market Entry Strategy',
        slug: 'africa',
        href: '/services/africa',
        desc: 'Country selection, competitor landscape, regulatory navigation and localization roadmaps.',
        icon: '🌍',
        badge: 'AFRICA',
      },
      {
        name: 'WhatsApp Business Automation',
        slug: 'sms',
        href: '/services/sms',
        desc: 'WhatsApp Business catalog, automated sales funnels, and click-to-WhatsApp ad funnels.',
        icon: '💬',
      },
      {
        name: 'Local SEO & Maps Visibility',
        slug: 'localseo',
        href: '/services/localseo',
        desc: 'Google Business Profile, Google Maps ranking, city landing pages and local citations.',
        icon: '📍',
      },
      {
        name: 'Africa Marketplace Growth',
        slug: 'amazonseo',
        href: '/services/amazonseo',
        desc: 'Product listing optimization and sponsored ads on Jumia, Konga, Takealot, and Jiji.',
        icon: '🛍️',
      },
      {
        name: 'Paid Advertising in Africa',
        slug: 'fbads',
        href: '/services/fbads',
        desc: 'Meta, TikTok, YouTube and Google campaigns with localized payment-focused ad creative.',
        icon: '💰',
      },
      {
        name: 'African Influencer Marketing',
        slug: 'influencer',
        href: '/services/influencer',
        desc: 'Vetted creator partnerships across Nigeria, Kenya, South Africa, and Ghana with tracked ROI.',
        icon: '⭐',
      },
      {
        name: 'African Payment Integrations',
        slug: 'webdev',
        href: '/services/webdev',
        desc: 'Seamless checkout integration for Paystack, Flutterwave, M-Pesa, and mobile money.',
        icon: '💳',
      },
      {
        name: 'Social Commerce Campaigns',
        slug: 'socialcommerce',
        href: '/services/socialcommerce',
        desc: 'Instagram, TikTok, WhatsApp and marketplace-led campaigns driving instant orders.',
        icon: '📱',
      },
    ],
  },
};

export function getParentCategory(idOrSlug: string): ParentCategoryData | null {
  if (!idOrSlug) return null;
  const clean = idOrSlug.toLowerCase().trim();

  // Direct match
  if (PARENT_CATEGORIES[clean]) {
    return PARENT_CATEGORIES[clean];
  }

  // Alias match
  for (const cat of Object.values(PARENT_CATEGORIES)) {
    if (cat.aliases.includes(clean)) {
      return cat;
    }
  }

  return null;
}

export function getParentCategoryForChild(slug: string): ParentCategoryData | null {
  if (!slug) return null;
  const clean = slug.toLowerCase().replace(/^\/services\//, '').trim();
  for (const cat of Object.values(PARENT_CATEGORIES)) {
    if (cat.childServices.some(s => s.slug === clean || s.href === `/services/${clean}`)) {
      return cat;
    }
  }
  return null;
}

