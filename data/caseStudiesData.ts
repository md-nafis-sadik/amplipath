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
  image: string;
  gradient: string;
  bgGradient: string;
  accentColor: string;
  watermark: string;
  websiteUrl?: string;
  websiteDisplay?: string;
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
    image: '/images/portfolio/amber.jpg',
    gradient: 'from-[#3a2a1a] to-[#c9862e]',
    bgGradient: 'linear-gradient(135deg, #3a2a1a 0%, #c9862e 100%)',
    accentColor: '#c9862e',
    watermark: 'Beauty',
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
    image: '/images/portfolio/print.jpg',
    gradient: 'from-[#10243f] to-[#0f766e]',
    bgGradient: 'linear-gradient(135deg, #10243f 0%, #0f766e 100%)',
    accentColor: '#0f766e',
    watermark: '3D Print',
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
    image: '/images/portfolio/furry.jpg',
    gradient: 'from-[#331021] to-[#be185d]',
    bgGradient: 'linear-gradient(135deg, #331021 0%, #be185d 100%)',
    accentColor: '#be185d',
    watermark: 'Pet Care',
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
    image: '/images/portfolio/ola.jpg',
    gradient: 'from-[#0f2a4a] to-[#0369a1]',
    bgGradient: 'linear-gradient(135deg, #0f2a4a 0%, #0369a1 100%)',
    accentColor: '#0369a1',
    watermark: 'Property',
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
      "Integrated direct WhatsApp and phone consultation pathways to capture high-intent buyers immediately."
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
    image: '/images/portfolio/forbidden.jpg',
    gradient: 'from-[#1e1b4b] to-[#4338ca]',
    bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
    accentColor: '#4338ca',
    watermark: 'Wellness',
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
    image: '/images/portfolio/savajay.jpg',
    gradient: 'from-[#064e3b] to-[#059669]',
    bgGradient: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
    accentColor: '#059669',
    watermark: 'Accessory',
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
    id: 'zarea-web',
    name: 'Zarea — B2B Commodity Marketplace Website',
    category: 'Websites & Search',
    categorySlug: 'websites-search',
    industry: 'B2B Ecommerce, Commodities & Procurement',
    headline: 'A digital marketplace connecting commodity buyers and suppliers across Pakistan.',
    metric: 'B2B Commerce',
    metricLabel: 'Quotations, accounts & multi-category catalogue',
    summary: 'A B2B ecommerce marketplace combining product categories, supplier access, quotation requests, customer accounts, and shopping-cart functionality built for business procurement.',
    tags: ['Web Platform', 'B2B Ecommerce', 'Catalogue Architecture', 'Enterprise UX'],
    image: '/images/portfolio/zarea-web.png',
    gradient: 'from-[#1f2937] to-[#b45309]',
    bgGradient: 'linear-gradient(135deg, #1f2937 0%, #b45309 100%)',
    accentColor: '#b45309',
    watermark: 'Commodities',
    heroTitle: 'A digital marketplace connecting commodity buyers and suppliers across Pakistan.',
    heroSub: 'A responsive digital platform built for business procurement, combining supplier access, quotation requests, and commercial ecommerce.',
    keyStats: [
      { label: 'Platform Type', value: 'B2B Web Marketplace' },
      { label: 'Commerce Tools', value: 'RFQ & Cart Engine' },
      { label: 'Experience', value: 'Responsive Desktop & Mobile' }
    ],
    theCompany: "Zarea is a B2B ecommerce marketplace designed to make commodity sourcing faster and more accessible for commercial enterprises.",
    theOpportunity: "Enterprise buyers and institutional suppliers require comprehensive product documentation, bulk pricing structures, and quotation workflows that mirror real-world corporate purchasing procedures.",
    ourSolution: [
      "Architected and developed the responsive web platform tailored specifically for business procurement.",
      "Combined product categories, supplier access, quotation requests (RFQs), customer accounts, and shopping-cart functionality.",
      "Engineered corporate information hubs, transaction safeguards, and high-volume catalogue navigation.",
      "Optimized technical performance and search visibility across all core commodity sectors."
    ],
    theResults: [
      "Delivered a dependable digital marketplace handling substantial commercial transaction inquiry volume.",
      "Established brand credibility with corporate institutional clients and manufacturing leaders.",
      "Streamlined supplier onboarding and quotation management across diverse commodity categories."
    ],
    servicesDelivered: [
      'Full-stack B2B marketplace development',
      'Product category and catalogue architecture',
      'Quotation and customer account workflows',
      'Enterprise UI/UX design',
      'Technical SEO and platform performance'
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
    image: '/images/portfolio/aceofcoins.jpg',
    gradient: 'from-[#1e293b] to-[#475569]',
    bgGradient: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    accentColor: '#475569',
    watermark: 'Funnel',
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
    image: '/images/portfolio/actorpass.jpg',
    gradient: 'from-[#581c87] to-[#7e22ce]',
    bgGradient: 'linear-gradient(135deg, #581c87 0%, #7e22ce 100%)',
    accentColor: '#7e22ce',
    watermark: 'Gaming',
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
    image: '/images/portfolio/davinci.jpg',
    gradient: 'from-[#1e3a8a] to-[#2563eb]',
    bgGradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    accentColor: '#2563eb',
    watermark: 'Video',
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
    image: '/images/portfolio/alexafischer.jpg',
    gradient: 'from-[#831843] to-[#db2777]',
    bgGradient: 'linear-gradient(135deg, #831843 0%, #db2777 100%)',
    accentColor: '#db2777',
    watermark: 'Pitch',
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
    image: '/images/portfolio/novella.jpg',
    gradient: 'from-[#0f172a] to-[#3b82f6]',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #3b82f6 100%)',
    accentColor: '#3b82f6',
    watermark: 'AI Video',
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
  },
  {
    id: 'thimin',
    name: 'Thimin — AI Life Coach',
    category: 'AI Automation & App Development',
    categorySlug: 'ai-automation-app-development',
    industry: 'AI, Wellness & Personal Development',
    headline: 'An AI-powered life coach built to support personal growth through natural voice conversations.',
    metric: 'Voice AI',
    metricLabel: 'Real-time conversational coaching',
    summary: 'A cross-platform AI life-coaching app for iOS and Android combining natural voice conversations, transcription, session summaries, journaling and goal tracking.',
    tags: ['Mobile App', 'Voice AI', 'iOS & Android', 'Personal Development'],
    image: '/images/portfolio/thimin.png',
    gradient: 'from-[#1e1b4b] to-[#4338ca]',
    bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
    accentColor: '#4338ca',
    watermark: 'AI Coach',
    heroTitle: 'AI-powered personal coaching through natural voice conversations.',
    heroSub: 'A cross-platform iOS and Android application combining voice AI, transcription, structured session summaries, and personal growth journaling.',
    keyStats: [
      { label: 'Supported Platforms', value: 'iOS & Android' },
      { label: 'Core Interface', value: 'Natural Voice AI' },
      { label: 'Key Features', value: 'Journaling & Goals' }
    ],
    theCompany: "Thimin is an innovative wellness and personal development application designed to help individuals incorporate mindful self-reflection and personal growth into everyday life.",
    theOpportunity: "Traditional coaching and journaling tools require manual typing or rigid scheduling. Thimin required an intuitive mobile experience where users could speak naturally, receive thoughtful contextual reflections, and track their personal growth over time without friction.",
    ourSolution: [
      "Designed and developed the cross-platform mobile application for iOS and Android.",
      "Engineered low-latency voice-based AI conversations with contextual responses and adaptive empathy.",
      "Built automated real-time speech-to-text transcription and structured session summary generation.",
      "Implemented personal journaling, daily reflection prompts, and habit/goal-tracking workflows within one accessible mobile experience."
    ],
    theResults: [
      "Successfully launched an intuitive, highly engaging cross-platform coaching experience with high user retention.",
      "Delivered instant voice AI interaction with zero audio lag across mobile networks.",
      "Provided users with an organized personal knowledge base of past reflections, insights, and milestones."
    ],
    servicesDelivered: [
      'Mobile app development (iOS & Android)',
      'Voice AI integration & prompt engineering',
      'Real-time audio streaming & transcription',
      'Session summarization engine',
      'App Store & Google Play deployment'
    ]
  },
  {
    id: 'peony',
    name: 'Peony Bloom — Couples Game',
    category: 'AI Automation & App Development',
    categorySlug: 'ai-automation-app-development',
    industry: 'Lifestyle, Relationships & Mobile Gaming',
    headline: 'A private couples game designed to create more meaningful and playful conversations.',
    metric: 'Private Pairing',
    metricLabel: 'Simultaneous response reveals',
    summary: 'A cross-platform couples game where partners connect privately, answer questions separately and reveal responses together across multiple conversation modes.',
    tags: ['Mobile Gaming', 'iOS & Android', 'Relationship Tech', 'In-App Subscriptions'],
    image: '/images/portfolio/peony.png',
    gradient: 'from-[#831843] to-[#e11d48]',
    bgGradient: 'linear-gradient(135deg, #831843 0%, #e11d48 100%)',
    accentColor: '#e11d48',
    watermark: 'Couples',
    heroTitle: 'Sparking deeper connections through interactive couple gameplay.',
    heroSub: 'A cross-platform mobile gaming experience featuring private partner syncing, categorized conversation decks, and simultaneous answer reveals.',
    keyStats: [
      { label: 'Supported Platforms', value: 'iOS & Android' },
      { label: 'Interaction Model', value: 'Private Pairing' },
      { label: 'Monetization', value: 'Subscriptions & Decks' }
    ],
    theCompany: "Peony Bloom is a mobile lifestyle and gaming experience created to help couples build intimacy, have fun, and engage in meaningful conversations.",
    theOpportunity: "Couples often struggle to initiate fresh, playful conversations amidst busy schedules. The app needed a private, delightful interface that made vulnerability fun through game mechanics rather than clinical exercises.",
    ourSolution: [
      "Architected cross-platform mobile apps for iOS and Android with real-time pairing via secure invite codes.",
      "Engineered synchronized question-and-answer mechanics where responses remain hidden until both partners answer.",
      "Created curated question decks across intimacy, fun memories, future aspirations, and playful debates.",
      "Integrated turn push notifications, saved favorite moments, and premium subscription access via App Store & Play Store in-app purchases."
    ],
    theResults: [
      "Delivered an engaging, highly rated mobile experience for couples globally.",
      "Achieved seamless real-time synchronization between paired devices without connection drops.",
      "Established recurring subscription revenue with high deck completion rates."
    ],
    servicesDelivered: [
      'Cross-platform mobile app development',
      'Real-time partner synchronization backend',
      'Interactive UI/UX design & animation',
      'In-app purchase & subscription management',
      'Push notification workflows'
    ]
  },
  {
    id: 'fresenius',
    name: 'Fresenius Kabi Enteral App',
    category: 'AI Automation & App Development',
    categorySlug: 'ai-automation-app-development',
    industry: 'Healthcare & Medical Technology',
    headline: 'A mobile product and nutritional-reference platform built for healthcare professionals.',
    metric: 'HCP Platform',
    metricLabel: 'Product compendium & RNI comparison',
    summary: 'A mobile product and nutritional-reference platform delivering adult and paediatric enteral nutrition product information, clinical resources, and PDF export functionality.',
    tags: ['HealthTech', 'Clinical App', 'Nutritional Calculator', 'PDF Export'],
    image: '/images/portfolio/fresenius.png',
    gradient: 'from-[#0f2e4e] to-[#0284c7]',
    bgGradient: 'linear-gradient(135deg, #0f2e4e 0%, #0284c7 100%)',
    accentColor: '#0284c7',
    watermark: 'Medical',
    heroTitle: 'Clinical nutritional reference at healthcare professionals’ fingertips.',
    heroSub: 'A mobile application delivering adult and paediatric enteral nutrition product information, RNI comparison tools, clinical resources, and patient sample requests.',
    keyStats: [
      { label: 'Target Audience', value: 'Healthcare Professionals' },
      { label: 'Platforms', value: 'iOS & Android' },
      { label: 'Key Tool', value: 'RNI Comparison' }
    ],
    theCompany: "Fresenius Kabi is a global healthcare leader specializing in clinical nutrition, infusion therapies, and lifesaving medical products.",
    theOpportunity: "Healthcare professionals require rapid, accurate nutritional specifications when recommending adult and paediatric enteral nutrition solutions. The app needed to provide immediate, compliant access to comprehensive product compendiums and reference calculations.",
    ourSolution: [
      "Delivered the iOS and Android application experience for accessing Fresenius Kabi's adult and paediatric enteral nutrition product information.",
      "Engineered an interactive product compendium and healthcare-professional registration system.",
      "Built a dynamic Reference Nutrient Intake (RNI) comparison tool and clinical resource library.",
      "Integrated seamless patient sample requests and one-click PDF export functionality."
    ],
    theResults: [
      "Equipped medical professionals with an essential daily bedside clinical calculator and formula compendium.",
      "Accelerated institutional sample request turnaround and improved nutritional prescription accuracy.",
      "Delivered a dependable digital resource recognized for speed, reliability, and clinical utility."
    ],
    servicesDelivered: [
      'Mobile application development (iOS & Android)',
      'Clinical product compendium architecture',
      'RNI comparison tool engineering',
      'Patient sample request integration',
      'PDF export & clinical documentation'
    ]
  },
  {
    id: 'zarea-app',
    name: 'Zarea — B2B Marketplace Mobile App',
    category: 'AI Automation & App Development',
    categorySlug: 'ai-automation-app-development',
    industry: 'B2B Ecommerce, Commodities & Procurement',
    headline: 'A cross-platform B2B marketplace simplifying commodity sourcing and procurement.',
    metric: 'Mobile B2B',
    metricLabel: 'End-to-end commodity procurement',
    summary: 'A cross-platform B2B marketplace enabling businesses to source construction materials, agricultural products, industrial chemicals and commodities with live delivery tracking.',
    tags: ['B2B Marketplace', 'Mobile App', 'Commodity Trading', 'Logistics Tracking'],
    image: '/images/portfolio/zarea-app.png',
    gradient: 'from-[#1c1917] to-[#d97706]',
    bgGradient: 'linear-gradient(135deg, #1c1917 0%, #d97706 100%)',
    accentColor: '#d97706',
    watermark: 'B2B App',
    heroTitle: 'Modernizing commodity procurement through mobile B2B commerce.',
    heroSub: 'A cross-platform mobile solution for commercial sourcing across construction materials, chemicals, and agricultural goods.',
    keyStats: [
      { label: 'Platforms', value: 'iOS & Android' },
      { label: 'Categories', value: 'Materials, Agri & Chemicals' },
      { label: 'Workflows', value: 'Sourcing to Tracking' }
    ],
    theCompany: "Zarea is a cross-platform B2B marketplace that enables businesses to source construction materials, agricultural products, industrial chemicals and other commodities.",
    theOpportunity: "Traditional commodity sourcing involves disjointed broker negotiations and manual coordination. Zarea needed a unified mobile experience enabling commercial buyers to discover suppliers, manage quotations, and follow orders in real time.",
    ourSolution: [
      "Designed and developed the cross-platform mobile solution for iOS and Android.",
      "Structured product discovery, verified supplier access, and streamlined commercial checkout.",
      "Engineered instant order placement, delivery tracking, and procurement management.",
      "Built a consistent, responsive experience optimized for procurement officers and field operations."
    ],
    theResults: [
      "Significantly accelerated order processing times for commercial and industrial commodity buyers.",
      "Provided buyers with full price transparency and reliable delivery timelines directly on mobile.",
      "Expanded Zarea's buyer network with thousands of active business procurement managers."
    ],
    servicesDelivered: [
      'Cross-platform mobile app development',
      'B2B checkout and order placement flows',
      'Live delivery and procurement tracking',
      'Supplier and product catalogue architecture',
      'App Store and Play Store deployment'
    ]
  },
  {
    id: 'zarea-web',
    name: 'Zarea — B2B Commodity Marketplace Website',
    category: 'Websites & Search',
    categorySlug: 'websites-search',
    industry: 'B2B Ecommerce, Commodities & Procurement',
    headline: 'A digital marketplace connecting commodity buyers and suppliers across Pakistan.',
    metric: 'B2B Commerce',
    metricLabel: 'Quotations, accounts & multi-category catalogue',
    summary: 'A B2B ecommerce marketplace combining product categories, supplier access, quotation requests, customer accounts, and shopping-cart functionality built for business procurement.',
    tags: ['Web Platform', 'B2B Ecommerce', 'Catalogue Architecture', 'Enterprise UX'],
    image: '/images/portfolio/zarea-web.png',
    gradient: 'from-[#1f2937] to-[#b45309]',
    bgGradient: 'linear-gradient(135deg, #1f2937 0%, #b45309 100%)',
    accentColor: '#b45309',
    watermark: 'Commodities',
    heroTitle: 'A digital marketplace connecting commodity buyers and suppliers across Pakistan.',
    heroSub: 'A responsive digital platform built for business procurement, combining supplier access, quotation requests, and commercial ecommerce.',
    keyStats: [
      { label: 'Platform Type', value: 'B2B Web Marketplace' },
      { label: 'Commerce Tools', value: 'RFQ & Cart Engine' },
      { label: 'Experience', value: 'Responsive Desktop & Mobile' }
    ],
    theCompany: "Zarea is a B2B ecommerce marketplace designed to make commodity sourcing faster and more accessible for commercial enterprises.",
    theOpportunity: "Enterprise buyers and institutional suppliers require comprehensive product documentation, bulk pricing structures, and quotation workflows that mirror real-world corporate purchasing procedures.",
    ourSolution: [
      "Architected and developed the responsive web platform tailored specifically for business procurement.",
      "Combined product categories, supplier access, quotation requests (RFQs), customer accounts, and shopping-cart functionality.",
      "Engineered corporate information hubs, transaction safeguards, and high-volume catalogue navigation.",
      "Optimized technical performance and search visibility across all core commodity sectors."
    ],
    theResults: [
      "Delivered a dependable digital marketplace handling substantial commercial transaction inquiry volume.",
      "Established brand credibility with corporate institutional clients and manufacturing leaders.",
      "Streamlined supplier onboarding and quotation management across diverse commodity categories."
    ],
    servicesDelivered: [
      'Full-stack B2B marketplace development',
      'Product category and catalogue architecture',
      'Quotation and customer account workflows',
      'Enterprise UI/UX design',
      'Technical SEO and platform performance'
    ]
  },
  {
    id: 'postpadel',
    name: 'Post Padel – AI Coaching Mobile App',
    category: 'AI Automation & App Development',
    categorySlug: 'ai-automation-app-development',
    industry: 'Sports Technology',
    headline: 'An AI-powered padel coaching app that transforms match data into personalized improvement tips, performance insights and shareable coaching reports.',
    metric: 'AI Coaching',
    metricLabel: 'Performance insights & shareable reports',
    summary: 'An AI-powered padel coaching app that transforms match data into personalized improvement tips, performance insights, and shareable reports for players and trainers.',
    tags: ['Mobile App Development', 'AI Integration', 'Sports Technology', 'App-Store Deployment'],
    image: '/images/portfolio/postpadel.png',
    gradient: 'from-[#064e3b] to-[#10b981]',
    bgGradient: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
    accentColor: '#10b981',
    watermark: 'Post Padel',
    heroTitle: 'Transforming padel match data into personalized AI coaching.',
    heroSub: 'An AI-powered mobile coaching application built for iOS and Android that converts logged match data into actionable insights and trainer-ready reports.',
    keyStats: [
      { label: 'Platforms', value: 'iOS & Android' },
      { label: 'Shot Analysis', value: 'Serves, Volleys, Smashes' },
      { label: 'Outputs', value: 'Personalized Coaching Tips' }
    ],
    theCompany: "Post Padel helps padel players learn from every match or training session by recording performance, assessing individual shots and monitoring game development over time.",
    theOpportunity: "Most amateur and competitive padel players lack affordable, continuous access to private coaching. Players needed an easy way to log shot breakdowns and receive actionable, data-backed guidance immediately after games.",
    ourSolution: [
      "Developed the AI-powered mobile coaching application for iOS and Android.",
      "Engineered algorithms that convert each player's logged match data into personalized coaching tips.",
      "Generated weekly and monthly progress insights and exportable reports shareable with personal trainers.",
      "Supported panel-specific performance tracking across serves, volleys, smashes, forehands, backhands, bandejas, and viboras."
    ],
    theResults: [
      "Successfully launched on iOS and Android with rapid adoption across padel clubs and competitive players.",
      "Empowered players to pinpoint technique gaps and track measurable performance improvements over time.",
      "Delivered clean, professional exportable reports utilized by both players and professional trainers."
    ],
    servicesDelivered: [
      'Mobile app development (iOS & Android)',
      'AI integration & personalized coaching logic',
      'Sports performance analytics engine',
      'Exportable coaching reports generation',
      'App Store & Play Store deployment'
    ]
  },
  {
    id: 'webprivacy',
    name: 'Web Privacy AI – AI Data Removal App',
    category: 'AI Automation & App Development',
    categorySlug: 'ai-automation-app-development',
    industry: 'Data Privacy and Cybersecurity',
    headline: 'An AI-powered privacy application that finds personal information across data-broker websites and automates ongoing opt-out and removal requests.',
    metric: '199+ Sites',
    metricLabel: 'Automated data broker opt-out & removal',
    summary: 'An AI-powered privacy application that finds personal information across 199+ data-broker websites and automates ongoing opt-out and removal requests.',
    tags: ['Mobile App Development', 'AI Automation', 'Cybersecurity', 'App-Store Deployment'],
    image: '/images/portfolio/webprivacy.jpg',
    gradient: 'from-[#0f172a] to-[#2563eb]',
    bgGradient: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
    accentColor: '#2563eb',
    watermark: 'Privacy AI',
    heroTitle: 'Automating personal data removal across 199+ broker directories.',
    heroSub: 'An AI-driven mobile application for iOS and Android that replaces manual opt-out labor with continuous monitoring and automated privacy protection.',
    keyStats: [
      { label: 'Scanned Registries', value: '199+ Data Brokers' },
      { label: 'Process', value: 'Automated Opt-Out' },
      { label: 'Platforms', value: 'iOS & Android' }
    ],
    theCompany: "Web Privacy AI helps individuals reduce unwanted exposure of their personal information across data-broker and people-search websites by replacing time-consuming manual removals with automated monitoring.",
    theOpportunity: "Personal names, phone numbers, addresses and family histories are routinely scraped and sold without permission. Opting out manually from hundreds of directories takes countless hours and requires perpetual follow-up.",
    ourSolution: [
      "Engineered an AI-driven data-removal mobile application for iOS and Android.",
      "Built scanning systems that search more than 199 data-broker and people-search websites.",
      "Automated the submission of formal opt-out and personal data removal requests.",
      "Implemented continuous monitoring and detailed privacy reports to follow removal progress and catch reappearing records."
    ],
    theResults: [
      "Eliminated dozens of hours of manual opt-out effort for users seeking online privacy.",
      "Achieved consistent data removal across leading people-search and data-broker networks.",
      "Provided ongoing peace of mind through real-time notifications and audit reports."
    ],
    servicesDelivered: [
      'Mobile app development (iOS & Android)',
      'AI automation & opt-out submission pipelines',
      'Data-broker directory monitoring engine',
      'Real-time privacy reporting dashboard',
      'App Store & Play Store deployment'
    ]
  },
  {
    id: 'osity',
    name: 'Osity – AI Learning and Discovery App',
    category: 'AI Automation & App Development',
    categorySlug: 'ai-automation-app-development',
    industry: 'Education Technology',
    headline: 'An intelligent learning and discovery app that helps curious minds explore meaningful ideas, investigate topics and organize knowledge without endless scrolling.',
    metric: 'Curated AI',
    metricLabel: 'Intentional discovery & knowledge vault',
    summary: 'An intelligent learning and discovery app that helps curious minds explore meaningful ideas, investigate topics and organize knowledge without endless scrolling.',
    tags: ['Mobile App Development', 'AI-Assisted Discovery', 'EdTech', 'App-Store Deployment'],
    image: '/images/portfolio/osity.png',
    gradient: 'from-[#27272a] to-[#71717a]',
    bgGradient: 'linear-gradient(135deg, #27272a 0%, #71717a 100%)',
    accentColor: '#71717a',
    watermark: 'Osity',
    heroTitle: 'Mindful knowledge discovery for curious thinkers.',
    heroSub: 'An AI-assisted iOS and Android learning app providing daily curated concepts, deep topic investigations, and a private knowledge vault.',
    keyStats: [
      { label: 'Platforms', value: 'iOS & Android' },
      { label: 'Philosophy', value: 'Mindful Exploration' },
      { label: 'Feature', value: 'Personal Knowledge Vault' }
    ],
    theCompany: "Osity is designed for lifelong learners and curious thinkers who want a calmer and more intentional way to discover information, combining daily ideas, words, quotes and topics with tools for deeper exploration.",
    theOpportunity: "Passive algorithmic social feeds promote distraction and shallow attention. Osity sought to build a calm, intellectually stimulating haven where users can investigate big questions without doom-scrolling.",
    ourSolution: [
      "Built the AI-assisted learning and discovery application for iOS and Android.",
      "Integrated daily ideas, words, quotes and topics with tools for deeper investigation.",
      "Engineered intelligent topic exploration allowing users to explore almost any subject.",
      "Created a personal knowledge vault where users organize, curate, and revisit saved ideas."
    ],
    theResults: [
      "Delivered a calming, focused alternative to passive content consumption.",
      "Enabled curious minds to investigate topics in depth and preserve intellectual insights effortlessly.",
      "Earned strong user acclaim for clean design, curated depth, and cognitive value."
    ],
    servicesDelivered: [
      'Mobile app development (iOS & Android)',
      'AI-assisted discovery & exploration engine',
      'Knowledge vault architecture & organization',
      'Minimalist UI/UX design',
      'App Store & Play Store deployment'
    ]
  }
];
