export interface CaseStudy {
  id: string;
  name: string;
  category: 'Websites & Search' | 'Ads & Growth' | 'Content, Strategy & Analytics' | 'AI Automation & App Development';
  categorySlug: 'websites-search' | 'ads-growth' | 'content-strategy-analytics' | 'ai-automation-app-development';
  industry: string;
  headline: string;
  metric: string;
  metricLabel: string;
  summary: string;
  tags: string[];
  gradient: string;
  bgGradient: string;
  accentColor: string;
  watermark: string;
  websiteUrl: string;
  websiteDisplay: string;
  // Detail page content
  heroTitle: string;
  heroSub: string;
  keyStats: { label: string; value: string }[];
  theCompany: string;
  theOpportunity: string;
  ourSolution: string[];
  theResults: string[];
  servicesDelivered: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'amber',
    name: "Amber’s Eternal",
    category: 'Websites & Search',
    categorySlug: 'websites-search',
    industry: 'Health, Beauty & Ecommerce',
    headline: 'Full ecommerce development and technical SEO created a search-ready path from product discovery to checkout.',
    metric: '+140%',
    metricLabel: 'Increase in organic website traffic',
    summary: 'A complete ecommerce website and SEO foundation for a growing health and beauty brand, restructuring product discovery across 132+ items with a +90% conversion lift.',
    tags: ['Ecommerce Build', 'Technical SEO', 'On-Page SEO', 'CRO'],
    gradient: 'from-[#3a2a1a] to-[#c9862e]',
    bgGradient: 'linear-gradient(135deg, #3a2a1a 0%, #c9862e 100%)',
    accentColor: '#c9862e',
    watermark: 'Beauty',
    websiteUrl: 'https://amberseternal.com/',
    websiteDisplay: 'amberseternal.com',
    heroTitle: 'A beauty store built for discovery and purchase.',
    heroSub: 'A complete ecommerce experience that brings Amber’s Eternal’s 132+ botanical product range together and supports how shoppers find what they need.',
    keyStats: [
      { label: 'Live Products', value: '132+' },
      { label: 'Organic Traffic Lift', value: '+140%' },
      { label: 'Conversion Rate Lift', value: '+90%' }
    ],
    theCompany: "Amber’s Eternal is a health and beauty ecommerce brand offering essential oils, skincare, haircare, cosmetics, oil diffusers and other self-care products. The brand focuses on helping customers incorporate botanical-inspired wellness into their everyday routines.",
    theOpportunity: "Amber’s Eternal needed more than an attractive online shop. Its broad product catalogue required a clear ecommerce structure that would help customers find suitable products while giving search engines a better understanding of the brand’s collections and individual product pages.",
    ourSolution: [
      "Designed and developed the complete ecommerce website from scratch, creating a scalable digital storefront for Amber’s Eternal.",
      "Organised the catalogue into clear commercial categories covering essential oils, skincare, haircare, cosmetics, diffusers and beauty wellness.",
      "Engineered an extensive technical and on-page SEO framework covering crawlability, metadata, structured schema, and collection optimization.",
      "Refined the entire conversion journey from initial search discovery to product exploration and final checkout."
    ],
    theResults: [
      "The completed website gave Amber’s Eternal a professional, scalable ecommerce presence supported by a stronger organic-search foundation.",
      "Recorded +140% growth in organic website search traffic within months of deployment.",
      "Ecommerce conversion rate increased by +90% as navigation and checkout friction were eliminated across mobile and desktop."
    ],
    servicesDelivered: [
      'Complete ecommerce website development',
      'Mobile-responsive design',
      'Product and collection architecture',
      'Ecommerce navigation and user experience',
      'Technical SEO & on-page optimization',
      'Internal linking and metadata optimization',
      'Conversion-focused shopping journey'
    ]
  },
  {
    id: 'print',
    name: 'Printin3D',
    category: 'Websites & Search',
    categorySlug: 'websites-search',
    industry: '3D Printing & Ecommerce',
    headline: 'Integrated Shopify, TikTok Shop and SEO launch generates 50%+ early sales growth.',
    metric: '+400%',
    metricLabel: 'Increase in organic search traffic',
    summary: 'A Shopify, TikTok Shop and SEO ecosystem for a specialist 3D-printing retailer—generating more than 50% early sales growth while building a stronger foundation for organic discovery.',
    tags: ['Shopify', 'TikTok Shop', 'Meta Shop', 'Dropship SEO'],
    gradient: 'from-[#10243f] to-[#0f766e]',
    bgGradient: 'linear-gradient(135deg, #10243f 0%, #0f766e 100%)',
    accentColor: '#0f766e',
    watermark: '3D Print',
    websiteUrl: 'https://printin3d.co/',
    websiteDisplay: 'printin3d.co',
    heroTitle: 'Making specialist 3D printing equipment easier to find and shop.',
    heroSub: 'A full Shopify store build, dropship catalogue setup, social commerce integration, and technical SEO for a specialist retailer.',
    keyStats: [
      { label: 'Early Sales Growth', value: '50%+' },
      { label: 'Channels Launched', value: '3 Platforms' },
      { label: 'Organic Traffic Lift', value: '+400%' }
    ],
    theCompany: "Printin3D is a specialist ecommerce store offering 3D printers, printing materials (PLA, PETG, TPU, resin), nozzles, hotends, tools and essential accessories. Its catalogue serves makers, educators, and industrial professionals.",
    theOpportunity: "Launching a specialist ecommerce business in the 3D-printing market required a platform capable of organising a technically diverse catalogue without making product discovery difficult, while driving sales beyond a single website channel.",
    ourSolution: [
      "Designed and developed the full Shopify store with structured navigation across printers, filaments, resins, and replacement components.",
      "Integrated dropshipping fulfillment pipelines with automated catalog syncing and order routing.",
      "Implemented comprehensive technical and on-page SEO targeting high-intent commercial keywords across 3D-printing categories.",
      "Built and launched integrated TikTok Shop and Meta Shop storefronts to capture social commerce demand directly."
    ],
    theResults: [
      "Recorded 50%+ early sales growth within the first days following multi-channel deployment.",
      "Organic search traffic increased by +400% as category and product pages gained prominence across search engines.",
      "Successfully established 3 interconnected sales channels: Shopify Web, TikTok Shop, and Meta Shop."
    ],
    servicesDelivered: [
      'Complete Shopify ecommerce development',
      'Dropshipping catalogue setup & order routing',
      'Product and collection architecture',
      'TikTok Shop & Meta Shop integration',
      'Technical & ecommerce SEO',
      'Search-focused site structure'
    ]
  },
  {
    id: 'furry',
    name: 'Furry Fiesta',
    category: 'Websites & Search',
    categorySlug: 'websites-search',
    industry: 'Pet Accessories & Ecommerce',
    headline: 'Conversion-focused ecommerce redesign delivers a 250%+ increase in store conversions.',
    metric: '+250%',
    metricLabel: 'Increase in ecommerce conversions',
    summary: 'A complete ecommerce redesign that improved product discovery, simplified the buying journey and helped turn more store visitors into customers.',
    tags: ['Store Redesign', 'CRO', 'Mobile Responsiveness', 'UX Design'],
    gradient: 'from-[#331021] to-[#be185d]',
    bgGradient: 'linear-gradient(135deg, #331021 0%, #be185d 100%)',
    accentColor: '#be185d',
    watermark: 'Pet Care',
    websiteUrl: 'https://furryfiesta.shop/',
    websiteDisplay: 'furryfiesta.shop',
    heroTitle: 'A clearer shopping journey with measurable commercial impact.',
    heroSub: 'A pet store redesign focused on making products easier to explore and the buying experience seamless to complete.',
    keyStats: [
      { label: 'Conversion Lift', value: '+250%' },
      { label: 'Mobile Checkout Speed', value: '<1.8s' },
      { label: 'Navigation Friction', value: '-65%' }
    ],
    theCompany: "Furry Fiesta is an online pet-accessories retailer offering pet beds, grooming brushes, collars, feeding bowls, toys and everyday pet essentials designed to combine comfort, functionality, safety and style.",
    theOpportunity: "Furry Fiesta needed a more cohesive ecommerce experience capable of turning product interest into completed purchases. Product discovery, navigation, page hierarchy and calls to action all needed to work together as one conversion-focused shopping system.",
    ourSolution: [
      "Restructured the entire storefront experience around how pet owners discover, evaluate and purchase essentials.",
      "Refreshed the visual presentation, strengthened page hierarchy, and created clearer pathways from homepage to product pages.",
      "Positioned product information and CTAs to reduce friction and guide shoppers intuitively toward checkout.",
      "Optimised the responsive mobile layout to ensure lightning-fast performance across all mobile devices."
    ],
    theResults: [
      "Delivered a verified 250%+ increase in completed store conversions from existing traffic.",
      "Significantly reduced checkout abandonment and improved multi-item cart values.",
      "Preserved the friendly brand personality while providing a robust, commercially engineered digital storefront."
    ],
    servicesDelivered: [
      'Complete ecommerce store redesign',
      'Product and collection-page optimisation',
      'Navigation and customer-journey restructuring',
      'Mobile-responsive design',
      'Calls-to-action optimisation',
      'Ecommerce conversion-rate optimisation'
    ]
  },
  {
    id: 'ola',
    name: 'Olakunle & Partners Ltd',
    category: 'Websites & Search',
    categorySlug: 'websites-search',
    industry: 'Real Estate & Property Investment',
    headline: 'A conversion-ready real estate website produces an 80%+ increase in property enquiries.',
    metric: '+80%',
    metricLabel: 'Increase in property enquiries',
    summary: 'A complete real estate website that transformed property discovery into a clearer, more credible and conversion-focused enquiry experience.',
    tags: ['Website Build', 'Property Listings', 'Lead Generation', 'WhatsApp Routing'],
    gradient: 'from-[#0f2a4a] to-[#0369a1]',
    bgGradient: 'linear-gradient(135deg, #0f2a4a 0%, #0369a1 100%)',
    accentColor: '#0369a1',
    watermark: 'Property',
    websiteUrl: 'https://www.olakunleandpartnersltd.com/',
    websiteDisplay: 'olakunleandpartnersltd.com',
    heroTitle: 'A digital home for property discovery and qualified consultations.',
    heroSub: 'An end-to-end real estate web platform designed to introduce the company, showcase listings, and convert visitors into active leads.',
    keyStats: [
      { label: 'Enquiry Growth', value: '+80%' },
      { label: 'WhatsApp Leads', value: '3.4x' },
      { label: 'Listing Engagement', value: '+120%' }
    ],
    theCompany: "Olakunle & Partners Ltd is a Nigerian real estate and property investment company providing property sales, rentals, facility management, estate development and advisory services for individuals and institutional investors.",
    theOpportunity: "The company required a credible digital platform where potential clients could understand its services, explore available properties and quickly express interest matching their budget, preferred location and property requirements.",
    ourSolution: [
      "Planned information architecture and developed a modern, high-speed responsive real estate web platform.",
      "Organised available properties into clear categories including sales, rentals, and commercial estate developments.",
      "Implemented structured enquiry pathways allowing prospective clients to submit their budget, location, and property criteria.",
      "Integrated direct WhatsApp and phone consultation pathways to capture high-intent buyers immediately.",
    ],
    theResults: [
      "Generated an 80%+ increase in verified property enquiries across residential and commercial opportunities.",
      "Established a credible digital presence that elevated the firm's authority among high-net-worth investors.",
      "Created a scalable foundation for listing new developments and capturing ongoing buyer leads."
    ],
    servicesDelivered: [
      'Website strategy and information architecture',
      'Responsive website development',
      'Property listing and category structure',
      'Lead-generation form development',
      'WhatsApp and contact-path integration',
      'Conversion-path optimisation'
    ]
  },
  {
    id: 'forbidden',
    name: 'Forbidden Touch',
    category: 'Websites & Search',
    categorySlug: 'websites-search',
    industry: 'Beauty, Spa & Wellness',
    headline: 'Complete SEO optimisation achieves a 96% performance score and an A-grade website experience.',
    metric: '96%',
    metricLabel: 'Performance score & Grade A experience',
    summary: 'A complete SEO and website-performance programme that delivered an A-grade experience, 1.2-second main-content loading and excellent visual stability.',
    tags: ['Technical SEO', 'Core Web Vitals', 'PageSpeed', 'On-Page SEO'],
    gradient: 'from-[#1e1b4b] to-[#4338ca]',
    bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
    accentColor: '#4338ca',
    watermark: 'Wellness',
    websiteUrl: 'http://forbiddentouch.net/',
    websiteDisplay: 'forbiddentouch.net',
    heroTitle: 'High-speed technical SEO and premium wellness experience.',
    heroSub: 'Strengthening the website’s technical foundation, search readiness and overall user experience for a wellness spa brand.',
    keyStats: [
      { label: 'GTmetrix Grade', value: 'Grade A' },
      { label: 'Performance Score', value: '96%' },
      { label: 'Largest Contentful Paint', value: '1.2s' },
      { label: 'Total Blocking Time', value: '59ms' }
    ],
    theCompany: "Forbidden Touch was a beauty, wellness and body-spa brand created to provide customers with a relaxing digital experience that reflected the comfort and quality of its services.",
    theOpportunity: "For a wellness business, slow loading, poor structure or weak on-page signals create immediate bounce-offs. The SEO engagement needed to improve technical performance, page hierarchy, and search accessibility simultaneously.",
    ourSolution: [
      "Conducted a comprehensive technical SEO review covering Core Web Vitals, server responsiveness, and asset delivery.",
      "Optimised image payloads, asset minification, and browser caching to achieve sub-1.5s page load times.",
      "Restructured heading tags, metadata, and on-page content around local wellness and spa search queries.",
      "Eliminated layout shifts and blocking scripts to provide a perfectly stable, tranquil browsing environment."
    ],
    theResults: [
      "Achieved a 96% GTmetrix performance score and 98% website structure score.",
      "Recorded a rapid 1.2-second Largest Contentful Paint (LCP) and minimal 59ms Total Blocking Time.",
      "Attained a Cumulative Layout Shift (CLS) of 0.02, delivering flawless visual stability across devices."
    ],
    servicesDelivered: [
      'Complete website SEO',
      'Technical SEO audit and implementation',
      'On-page content optimisation',
      'Page-speed optimisation & asset minification',
      'Core Web Vitals remediation',
      'Mobile and desktop performance review'
    ]
  },
  {
    id: 'savajay',
    name: 'Savajay',
    category: 'Websites & Search',
    categorySlug: 'websites-search',
    industry: 'Cannabis Accessories & Specialist Ecommerce',
    headline: 'Complete SEO implementation achieves an excellent 96/100 website health score.',
    metric: '96/100',
    metricLabel: 'Excellent website health score',
    summary: 'Complete technical and on-page SEO for a specialist ecommerce product, resulting in 127 error-free URLs, 130 successful HTTP responses and a search-ready website structure.',
    tags: ['Site Audit', 'Technical SEO', 'Keyword Architecture', 'Indexation'],
    gradient: 'from-[#064e3b] to-[#059669]',
    bgGradient: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
    accentColor: '#059669',
    watermark: 'Accessory',
    websiteUrl: 'https://savajay.com/',
    websiteDisplay: 'savajay.com',
    heroTitle: 'Specialist product search architecture with 96/100 health.',
    heroSub: 'Building a stronger technical and on-page search foundation around a specialized extinguisher and storage product.',
    keyStats: [
      { label: 'Site Health Score', value: '96 / 100' },
      { label: 'Error-Free URLs', value: '127 URLs' },
      { label: 'Clean HTTP 200s', value: '130 Responses' }
    ],
    theCompany: "Savajay is a specialist product brand offering a compact, portable device designed to extinguish and smell-proof store partially used joints and smoking items.",
    theOpportunity: "Because the product represents a highly specialised niche, potential buyers search using varied terms (e.g., 'joint extinguisher', 'joint storage case', 'smell-proof joint holder'). The SEO strategy had to unite these terms and ensure flawless search engine crawlability.",
    ourSolution: [
      "Conducted thorough keyword mapping and mapped search intent across product titles, descriptions, and headings.",
      "Structured the homepage with one clear H1 supported by 7 H2 and 6 H3 subheadings for optimal topical hierarchy.",
      "Configured canonical tags, XML sitemaps, robots.txt directives, and clean internal link structures.",
      "Audited all HTTP status codes, resolving redirect chains and eliminating broken assets across the domain."
    ],
    theResults: [
      "Achieved an outstanding 96/100 overall technical website health score on comprehensive audit tools.",
      "Verified 127 URLs completely free of errors with 130 clean 2xx responses and canonical tags detected.",
      "Positioned the specialist product prominently for diverse commercial search phrases across its category."
    ],
    servicesDelivered: [
      'Complete website SEO audit',
      'Technical SEO remediation',
      'Keyword research and mapping',
      'Heading and content hierarchy optimisation',
      'Canonical URL and directive configuration',
      'Crawlability and indexation optimisation'
    ]
  },
  {
    id: 'aceofcoins',
    name: 'Ace of Coins',
    category: 'Ads & Growth',
    categorySlug: 'ads-growth',
    industry: 'Online Education & Digital Courses',
    headline: 'Two conversion-focused course funnels generate 8,759 page views and a 35%+ conversion rate.',
    metric: '35%+',
    metricLabel: 'Funnel conversion rate (8,759 page views)',
    summary: 'Two purpose-built course funnels designed to turn specialised educational offers into focused, measurable conversion journeys.',
    tags: ['Sales Funnels', 'Landing Pages', 'Conversion Strategy', 'Analytics'],
    gradient: 'from-[#1e293b] to-[#475569]',
    bgGradient: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    accentColor: '#475569',
    watermark: 'Funnel',
    websiteUrl: 'https://aceofcoins.club/',
    websiteDisplay: 'aceofcoins.club',
    heroTitle: 'High-converting sales funnels for specialist educational offers.',
    heroSub: 'Dedicated, conversion-engineered landing pages and student enrollment journeys built for John Jay’s digital courses.',
    keyStats: [
      { label: 'Page Views Tracked', value: '8,759' },
      { label: 'Tracked Conversion Rate', value: '35%+' },
      { label: 'Funnels Built', value: '2 Custom Journeys' }
    ],
    theCompany: "Ace of Coins is an online learning platform offering specialist paid educational courses, video lessons, and digital resources for professionals and learners worldwide.",
    theOpportunity: "General catalog pages dilute focus for specialized course offers. Ace of Coins required dedicated, persuasive funnel pages capable of guiding visitors through course value, addressing objections, and converting interest into paid enrollments.",
    ourSolution: [
      "Developed dedicated, high-converting sales funnels for individual course titles including 'Cryptos Are Not Taxable' and 'Divorcing the State'.",
      "Organised course curriculum into a clear, persuasive hierarchy highlighting student benefits, instructor credibility, and objection handling.",
      "Constructed fast, mobile-first layouts with conversion-optimized CTAs and minimal checkout friction.",
      "Integrated full-funnel tracking to measure traffic sources, scroll depths, and conversion completion."
    ],
    theResults: [
      "Recorded 8,759 page views with an extraordinary tracked conversion rate exceeding 35%.",
      "Created an independent sales engine allowing course offers to be marketed via paid and organic channels with predictable ROI.",
      "Provided Ace of Coins with a proven template for rolling out future digital course launches."
    ],
    servicesDelivered: [
      'Sales-funnel strategy & architecture',
      'Conversion landing-page design & development',
      'Calls-to-action & offer positioning',
      'Responsive mobile development',
      'Traffic and conversion event tracking'
    ]
  },
  {
    id: 'actorpass',
    name: 'Act or Pass',
    category: 'Ads & Growth',
    categorySlug: 'ads-growth',
    industry: 'Games, Entertainment & Ecommerce',
    headline: 'Multichannel promotion drives 700% website traffic growth and more than 19,000 YouTube views.',
    metric: '+700%',
    metricLabel: 'Website traffic growth & 19K+ video views',
    summary: 'A multichannel promotional campaign combining Reddit, forums, classified advertising, social media and YouTube to generate 24,845 impressions and a reported conversion rate above 75%.',
    tags: ['Reddit Marketing', 'YouTube Marketing', 'Social Media', 'Community Seeding'],
    gradient: 'from-[#581c87] to-[#7e22ce]',
    bgGradient: 'linear-gradient(135deg, #581c87 0%, #7e22ce 100%)',
    accentColor: '#7e22ce',
    watermark: 'Gaming',
    websiteUrl: 'https://www.actorpassgame.com/',
    websiteDisplay: 'actorpassgame.com',
    heroTitle: 'Interactive party game launch across viral video and community channels.',
    heroSub: 'A coordinated online promotion strategy combining community outreach, classified advertising, and video marketing to drive product awareness and sales.',
    keyStats: [
      { label: 'Traffic Growth', value: '+700%' },
      { label: 'YouTube Views', value: '19,000+' },
      { label: 'Reported Conversion', value: '75%+' },
      { label: 'Campaign Impressions', value: '24,845' }
    ],
    theCompany: "Act or Pass is a movie-inspired party card game that brings friends, families and colleagues together through acting, film trivia and creative communication.",
    theOpportunity: "As a novel physical card game sold online, Act or Pass needed more than standard ads. Potential buyers needed to understand the fun of playing the game, see it demonstrated visually, and be engaged within entertainment communities.",
    ourSolution: [
      "Executed targeted Reddit and forum marketing in active movie, gaming, and entertainment sub-communities.",
      "Produced and distributed engaging YouTube video demonstrations showcasing authentic gameplay and player reactions.",
      "Integrated classified advertising and social media campaigns to direct interested players straight to the online shop.",
      "Built a seamless path connecting organic video views directly to the ecommerce purchase funnel."
    ],
    theResults: [
      "Generated 24,845 campaign impressions and delivered a +700% surge in website traffic.",
      "Achieved over 19,000 YouTube video views with high engagement from entertainment enthusiasts.",
      "Recorded a reported campaign conversion rate exceeding 75% on targeted landing experiences."
    ],
    servicesDelivered: [
      'Digital growth strategy',
      'Reddit and forum community marketing',
      'Classified advertising campaigns',
      'Social media promotion',
      'YouTube video marketing & distribution',
      'Conversion-path optimisation'
    ]
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve Mastery',
    category: 'Ads & Growth',
    categorySlug: 'ads-growth',
    industry: 'Online Education & Video Production',
    headline: 'Targeted course promotion delivers +9,009% student growth and +21,084% more ratings.',
    metric: '+9,009%',
    metricLabel: 'Student growth (564 to 51,373 enrolled)',
    summary: 'A targeted course promotion campaign that scaled student enrolment from 564 to 51,373 and grew ratings to 9,533 while sustaining a strong 4.6-star rating.',
    tags: ['Course Promotion', 'Marketplace SEO', 'Paid Acquisition', 'Social Proof'],
    gradient: 'from-[#1e3a8a] to-[#2563eb]',
    bgGradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    accentColor: '#2563eb',
    watermark: 'Video',
    websiteUrl: 'https://www.udemy.com/course/davinci-resolve-training-course/?couponCode=KEEPLEARNING',
    websiteDisplay: 'udemy.com (DaVinci Bootcamp)',
    heroTitle: 'Scaling creative video education into a marketplace category leader.',
    heroSub: 'Expanding student reach, accelerating enrolment velocity, and cementing marketplace authority for a premier video editing bootcamp.',
    keyStats: [
      { label: 'Students Enrolled', value: '564 → 51,373' },
      { label: 'Student Growth', value: '+9,009%' },
      { label: 'Rating Volume', value: '45 → 9,533 (+21,084%)' },
      { label: 'Course Rating', value: '4.6 Stars' }
    ],
    theCompany: "This comprehensive video editing course teaches aspiring filmmakers and editors DaVinci Resolve—from fundamentals to advanced colour grading, audio post-production, and visual effects.",
    theOpportunity: "At the start of the engagement, the course had 564 students and 45 ratings. Despite excellent content, it lacked the marketplace search momentum and social proof needed to compete against entrenched video editing courses.",
    ourSolution: [
      "Optimised course metadata, keywords, and title structures for marketplace search algorithms.",
      "Ran targeted promotional campaigns attracting relevant video creators, editors, and hobbyists.",
      "Implemented review and rating acquisition sequences that converted enrolled learners into active reviewers.",
      "Established multi-channel promotional funnels that fed continuous new enrollments into the course."
    ],
    theResults: [
      "Student enrolment scaled from 564 to 51,373—representing a monumental +9,009% increase.",
      "Rating volume expanded from 45 to 9,533 verified reviews—a +21,084% increase.",
      "Sustained an outstanding 4.6-star student satisfaction rating throughout rapid scale."
    ],
    servicesDelivered: [
      'Course promotion & marketplace SEO',
      'Targeted paid learner acquisition',
      'Social proof & rating generation workflow',
      'Audience segmentation & creative strategy',
      'Continuous conversion monitoring'
    ]
  },
  {
    id: 'alexafischer',
    name: 'Pitch Yourself! (Alexa Fischer)',
    category: 'Ads & Growth',
    categorySlug: 'ads-growth',
    industry: 'Professional & Personal Development',
    headline: 'Growth campaign generates +4,317% student growth and +11,087% more ratings.',
    metric: '+4,317%',
    metricLabel: 'Student growth (834 to 36,834 enrolled)',
    summary: 'A targeted growth campaign that increased course discovery, attracted 36,000+ relevant learners, and generated over 10,000 positive ratings while maintaining a 4.5-star rating.',
    tags: ['Course Growth', 'Audience Expansion', 'Marketplace SEO', 'Reviews'],
    gradient: 'from-[#831843] to-[#db2777]',
    bgGradient: 'linear-gradient(135deg, #831843 0%, #db2777 100%)',
    accentColor: '#db2777',
    watermark: 'Pitch',
    websiteUrl: 'https://www.udemy.com/course/market-your-message-ignite-curiosity-inspire-action/?couponCode=KEEPLEARNING',
    websiteDisplay: 'udemy.com (Pitch Yourself!)',
    heroTitle: 'Transforming communication coaching into a global course powerhouse.',
    heroSub: 'A targeted promotional campaign focused on increasing course discovery, attracting relevant learners and building stronger social proof.',
    keyStats: [
      { label: 'Enrolled Students', value: '834 → 36,834' },
      { label: 'Student Growth', value: '+4,317%' },
      { label: 'Rating Volume', value: '92 → 10,292 (+11,087%)' },
      { label: 'Average Rating', value: '4.5 Stars' }
    ],
    theCompany: "Pitch Yourself! is an acclaimed personal-development course created by executive coach Alexa Fischer, designed to help professionals, entrepreneurs, and speakers communicate with clarity, confidence, and authenticity.",
    theOpportunity: "Prior to our campaign, the course had 834 students and 92 ratings. The objective was to expand course visibility globally, reach professionals seeking presentation confidence, and establish category dominance.",
    ourSolution: [
      "Refined course keywords, titles, and curriculum previews to align with professional communication search queries.",
      "Launched multi-channel promotional campaigns targeting professionals, founders, and career-switchers.",
      "Created an automated student engagement and review workflow to drive high rating velocity.",
      "Maintained aggressive marketplace category positioning to trigger algorithm recommendations."
    ],
    theResults: [
      "Student enrolment increased from 834 to 36,834—delivering a massive +4,317% growth.",
      "Review count grew from 92 to 10,292 verified ratings—an extraordinary +11,087% expansion.",
      "Maintained a stellar 4.5-star overall rating while becoming one of the most recommended public speaking courses."
    ],
    servicesDelivered: [
      'Course marketing & marketplace algorithm strategy',
      'Targeted professional learner acquisition',
      'Social proof and review generation engine',
      'Campaign performance tracking & scaling'
    ]
  },
  {
    id: 'novella',
    name: 'Novella AI',
    category: 'Content, Strategy & Analytics',
    categorySlug: 'content-strategy-analytics',
    industry: 'AI, SaaS & Video Technology',
    headline: 'Integrated investor outreach helps Novella AI nearly triple its Wefunder raise to $349,494.',
    metric: '$349,494',
    metricLabel: 'Raised on Wefunder (+200% funding growth)',
    summary: 'A multichannel investor-acquisition campaign delivered through Boostfunders that helped Novella AI progress from $116,509 to $349,494 and grow its investor community from 83 to 162.',
    tags: ['Equity Crowdfunding', 'Investor Outreach', 'Social Promotion', 'PR'],
    gradient: 'from-[#0f172a] to-[#3b82f6]',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)',
    accentColor: '#3b82f6',
    watermark: 'AI Video',
    websiteUrl: 'https://wefunder.com/novellaai',
    websiteDisplay: 'wefunder.com/novellaai',
    heroTitle: 'Scaling an AI video SaaS community round on Wefunder.',
    heroSub: 'Multichannel promotional outreach that expanded investor reach, added $233,000 in capital, and nearly doubled Novella AI’s backing community.',
    keyStats: [
      { label: 'Total Raised', value: '$349,494' },
      { label: 'Capital Added', value: '+$232,985' },
      { label: 'Fundraising Growth', value: '+200%' },
      { label: 'Investor Count', value: '83 → 162 (+95.2%)' }
    ],
    theCompany: "Novella AI is an advanced AI-powered video editing software developed by industry veterans with deep Hollywood and tech backgrounds (Apple, Adobe, Google), built to redefine creative video post-production.",
    theOpportunity: "Novella AI had raised an initial $116,509 from 83 investors on Wefunder. To maintain momentum and reach its expansion milestones, the company needed a strategic push to introduce the opportunity to accredited and retail tech investors outside its immediate network.",
    ourSolution: [
      "Deployed Boostfunders' equity crowdfunding framework combining direct investor outreach, social media, and community engagement.",
      "Targeted relevant tech founder forums, creative video communities, and retail investor syndicates.",
      "Crafted compelling campaign positioning highlighting the founding team's Hollywood pedigree and AI architecture.",
      "Monitored momentum daily, actively engaging prospective backers and addressing questions on the Wefunder platform."
    ],
    theResults: [
      "The campaign added $232,985 in fresh capital, progressing from $116,509 to a final raise of $349,494.",
      "Total funds raised surged by approximately 200%—finishing with almost three times its starting funding total.",
      "Expanded the investor community from 83 to 162 backers, achieving a 95.2% increase in participating investors."
    ],
    servicesDelivered: [
      'Equity crowdfunding marketing',
      'Direct investor outreach & engagement',
      'Social media marketing & distribution',
      'Community and tech forum promotion',
      'Campaign positioning & messaging support',
      'Multichannel promotional strategy'
    ]
  }
];
