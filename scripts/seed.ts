import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SERVICES_DATA } from '../data/servicesData';
import { INDUSTRIES_DATA } from '../data/industriesData';
import { CASE_STUDIES } from '../data/caseStudiesData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Amplipath CMS database seeding...');

  // 1. Create Default Admin User
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: 'admin@amplipath.com' },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.adminUser.create({
      data: {
        email: 'admin@amplipath.com',
        passwordHash,
        name: 'Amplipath Admin',
        role: 'superadmin',
      },
    });
    console.log('✅ Admin user created: admin@amplipath.com / admin123');
  } else {
    console.log('ℹ️ Admin user already exists.');
  }

  // 2. Seed Blog Categories
  const catGeo = await prisma.blogCategory.upsert({
    where: { slug: 'geo-and-ai' },
    update: {},
    create: {
      name: 'GEO & AI',
      slug: 'geo-and-ai',
    },
  });

  const catGrowth = await prisma.blogCategory.upsert({
    where: { slug: 'growth-strategy' },
    update: {},
    create: {
      name: 'Growth & Strategy',
      slug: 'growth-strategy',
    },
  });

  console.log('✅ Blog categories seeded.');

  // 3. Seed Existing Blog Posts from /posts
  const postsDir = path.join(process.cwd(), 'posts');
  if (fs.existsSync(postsDir)) {
    const postFiles = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'));
    for (const file of postFiles) {
      const slug = file.replace(/\.md$/, '');
      const fullPath = path.join(postsDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const categoryId =
        data.category && data.category.toLowerCase().includes('geo')
          ? catGeo.id
          : catGrowth.id;

      await prisma.blogPost.upsert({
        where: { slug },
        update: {
          title: data.title || slug,
          excerpt: data.excerpt || null,
          contentHtml: content,
          status: 'published',
          publishedAt: data.date ? new Date(data.date) : new Date(),
          seoTitle: data.title || null,
          metaDescription: data.excerpt || null,
        },
        create: {
          title: data.title || slug,
          slug,
          excerpt: data.excerpt || null,
          contentHtml: content,
          authorName: 'Amplipath Team',
          status: 'published',
          publishedAt: data.date ? new Date(data.date) : new Date(),
          categoryId,
          seoTitle: data.title || null,
          metaDescription: data.excerpt || null,
          ogTitle: data.title || null,
          ogDescription: data.excerpt || null,
          ogImage: '/images/logo-horizontal.jpg',
        },
      });
    }
    console.log(`✅ ${postFiles.length} blog posts imported from /posts.`);
  }

  // 4. Seed Case Studies
  for (let idx = 0; idx < CASE_STUDIES.length; idx++) {
    const cs = CASE_STUDIES[idx];
    const slug = cs.id;
    const overview = [cs.theCompany, cs.theOpportunity].filter(Boolean).join('\n\n');
    const solution = Array.isArray(cs.ourSolution) ? cs.ourSolution.join('\n\n') : '';
    const results = Array.isArray(cs.theResults) ? cs.theResults.join('\n\n') : '';

    await prisma.caseStudy.upsert({
      where: { slug },
      update: {
        name: cs.name,
        industry: cs.industry,
        headline: cs.headline,
        metric: cs.metric,
        metricLabel: cs.metricLabel,
        summary: cs.summary,
        image: cs.image,
        clientWebsite: cs.websiteUrl || null,
        overview: overview || null,
        solution: solution || null,
        results: results || null,
        services: JSON.stringify(cs.servicesDelivered || cs.tags || []),
        deliverables: JSON.stringify(cs.tags || []),
        keyStats: JSON.stringify(cs.keyStats || []),
        sortOrder: idx,
      },
      create: {
        name: cs.name,
        slug,
        industry: cs.industry,
        headline: cs.headline,
        metric: cs.metric,
        metricLabel: cs.metricLabel,
        summary: cs.summary,
        image: cs.image,
        clientWebsite: cs.websiteUrl || null,
        overview: overview || null,
        solution: solution || null,
        results: results || null,
        services: JSON.stringify(cs.servicesDelivered || cs.tags || []),
        deliverables: JSON.stringify(cs.tags || []),
        keyStats: JSON.stringify(cs.keyStats || []),
        status: 'published',
        isFeatured: idx < 3,
        sortOrder: idx,
        seoTitle: `${cs.name} Case Study | Amplipath`,
        metaDescription: cs.summary || cs.headline || '',
      },
    });
  }
  console.log(`✅ ${CASE_STUDIES.length} case studies seeded.`);

  // 5. Seed Core Pages SEO
  const corePages = [
    {
      pagePath: '/',
      pageName: 'Homepage',
      seoTitle: 'Amplipath | Digital Marketing, SEO, PPC & AI Agency',
      metaDescription:
        'Amplipath is a digital marketing and AI agency offering SEO, PPC, web and mobile app development, AI automation and AI agents for businesses worldwide.',
    },
    {
      pagePath: '/about',
      pageName: 'About Us',
      seoTitle: 'About Amplipath | Connected Growth, Marketing & AI Agency',
      metaDescription:
        'Learn about Amplipath, our mission, leadership team, and how we unify marketing, technology, and AI to amplify business growth globally.',
    },
    {
      pagePath: '/services',
      pageName: 'Services Hub',
      seoTitle: 'Digital Marketing, SEO, Web Development & AI Services | Amplipath',
      metaDescription:
        'Explore Amplipath’s 70+ specialized services spanning SEO, Generative Engine Optimization (GEO), paid ads, software development, and AI automation.',
    },
    {
      pagePath: '/work',
      pageName: 'Portfolio & Case Studies',
      seoTitle: 'Case Studies & Client Results | Amplipath',
      metaDescription:
        'Review real-world case studies and measurable revenue results delivered for startups, SMEs, and international brands by Amplipath.',
    },
    {
      pagePath: '/blog',
      pageName: 'Blog & Insights',
      seoTitle: 'Growth, SEO & AI Insights | Amplipath Blog',
      metaDescription:
        'Practical guides, playbooks, and strategic insights on digital marketing, generative engine optimization, web technology, and AI automation.',
    },
    {
      pagePath: '/ai',
      pageName: 'AI Systems & Automation',
      seoTitle: 'AI Automation, AI Agents & Custom AI Systems | Amplipath',
      metaDescription:
        'Intelligent AI agents, automated workflow systems, and custom AI development engineered to scale operations and convert customers.',
    },
    {
      pagePath: '/contact',
      pageName: 'Contact Us',
      seoTitle: 'Contact Amplipath | Request a Proposal or Consultation',
      metaDescription:
        'Connect with the Amplipath team to discuss your marketing goals, software development requirements, or AI automation project.',
    },
    {
      pagePath: '/careers',
      pageName: 'Careers & Open Roles',
      seoTitle: 'Careers at Amplipath | Work with Global Growth Specialists',
      metaDescription:
        'Explore open engineering, SEO, marketing, and growth roles at Amplipath. Work on international client challenges with a high-calibre team.',
    },
    {
      pagePath: '/free-audit',
      pageName: 'Free Growth Audit',
      seoTitle: 'Free Growth & Digital Marketing Audit | Amplipath',
      metaDescription:
        'Request a comprehensive, no-obligation audit of your website, SEO rankings, paid advertising, and conversion funnels.',
    },
  ];

  for (const cp of corePages) {
    await prisma.pageSeo.upsert({
      where: { pagePath: cp.pagePath },
      update: {
        pageName: cp.pageName,
        seoTitle: cp.seoTitle,
        metaDescription: cp.metaDescription,
        ogTitle: cp.seoTitle,
        ogDescription: cp.metaDescription,
      },
      create: {
        pagePath: cp.pagePath,
        pageName: cp.pageName,
        pageType: 'core',
        seoTitle: cp.seoTitle,
        metaDescription: cp.metaDescription,
        ogTitle: cp.seoTitle,
        ogDescription: cp.metaDescription,
        ogImage: '/images/logo-horizontal.jpg',
      },
    });
  }
  console.log(`✅ ${corePages.length} core pages SEO seeded.`);

  // 6. Seed All 73 Services SEO & FAQs
  const serviceKeys = Object.keys(SERVICES_DATA);
  for (const slug of serviceKeys) {
    const svc = SERVICES_DATA[slug];
    const pathUrl = `/services/${slug}`;

    const seoTitle =
      svc.metaTitle ||
      `${svc.h1} | Amplipath`;
    const metaDescription =
      svc.metaDescription ||
      svc.sub ||
      `Professional ${svc.h1} services from Amplipath.`;

    await prisma.pageSeo.upsert({
      where: { pagePath: pathUrl },
      update: {
        pageName: svc.h1,
        seoTitle,
        metaDescription,
        ogTitle: seoTitle,
        ogDescription: metaDescription,
        breadcrumbTitle: svc.shortTitle || svc.h1,
      },
      create: {
        pagePath: pathUrl,
        pageName: svc.h1,
        pageType: 'service',
        seoTitle,
        metaDescription,
        ogTitle: seoTitle,
        ogDescription: metaDescription,
        ogImage: '/images/services-og.jpg',
        breadcrumbTitle: svc.shortTitle || svc.h1,
        ctaText: 'Speak With Our Team',
        ctaLink: '/contact',
      },
    });

    // Seed FAQs for this service if present
    if (svc.faqs && svc.faqs.length > 0) {
      for (let fIdx = 0; fIdx < svc.faqs.length; fIdx++) {
        const f = svc.faqs[fIdx];
        const faqItem = await prisma.faqItem.create({
          data: {
            question: f.q,
            answer: f.a,
            category: svc.h1,
            sortOrder: fIdx,
          },
        });

        await prisma.pageFaq.upsert({
          where: {
            pagePath_faqId: {
              pagePath: pathUrl,
              faqId: faqItem.id,
            },
          },
          update: {},
          create: {
            pagePath: pathUrl,
            faqId: faqItem.id,
            sortOrder: fIdx,
          },
        });
      }
    }
  }
  console.log(`✅ ${serviceKeys.length} services SEO & FAQs seeded.`);

  // 7. Seed All 11 Industries SEO
  const indKeys = Object.keys(INDUSTRIES_DATA);
  for (const slug of indKeys) {
    const ind = INDUSTRIES_DATA[slug];
    const pathUrl = `/industries/${slug}`;

    const seoTitle = `${ind.h1} | Amplipath`;
    const metaDescription =
      ind.sub ||
      `Specialized marketing, SEO, and technology solutions for ${ind.h1}.`;


    await prisma.pageSeo.upsert({
      where: { pagePath: pathUrl },
      update: {
        pageName: ind.h1,
        seoTitle,
        metaDescription,
        ogTitle: seoTitle,
        ogDescription: metaDescription,
        breadcrumbTitle: ind.h1,
      },
      create: {
        pagePath: pathUrl,
        pageName: ind.h1,
        pageType: 'industry',
        seoTitle,
        metaDescription,
        ogTitle: seoTitle,
        ogDescription: metaDescription,
        ogImage: '/images/industry-og.jpg',
        breadcrumbTitle: ind.h1,
        ctaText: 'Speak With An Industry Specialist',
        ctaLink: '/contact',
      },
    });
  }
  console.log(`✅ ${indKeys.length} industries SEO seeded.`);

  // 8. Seed Team Members (from /about)
  const teamMembers = [
    {
      name: 'Adebayo Ogungbemile',
      role: 'Founder & Chief Executive Officer',
      photoUrl: '/images/team/adebayo.png',
      linkedinUrl: 'https://www.linkedin.com/in/adebayo-ogungbemile/',
      sortOrder: 1,
    },
    {
      name: 'Nafis Sadik',
      role: 'SEO & Web Development Lead',
      photoUrl: '/images/team/nafis.png',
      linkedinUrl: 'https://md-nafis-sadik.vercel.app/',
      sortOrder: 2,
    },
    {
      name: 'Raheel Wazir',
      role: 'AI Systems & Full-Stack Software Developer',
      photoUrl: '/images/team/raheel.png',
      linkedinUrl: 'https://linkedin.com/in/rahil-wazir',
      sortOrder: 3,
    },
    {
      name: 'Rana Fahad',
      role: 'Mobile App Developer Lead',
      photoUrl: '/images/team/rana.png',
      linkedinUrl: 'https://www.linkedin.com/company/amplipath',
      sortOrder: 4,
    },
    {
      name: 'Gouravdeep Singh',
      role: 'Mobile App Developer',
      photoUrl: '/images/team/gouravdeep.png',
      linkedinUrl: 'https://www.linkedin.com/in/gouravdeepsingh/',
      sortOrder: 5,
    },
  ];

  for (const tm of teamMembers) {
    const existing = await prisma.teamMember.findFirst({
      where: { name: tm.name },
    });
    if (!existing) {
      await prisma.teamMember.create({
        data: tm,
      });
    }
  }
  console.log(`✅ ${teamMembers.length} team members seeded.`);

  // 9. Seed Open Job Listings (from /careers)
  const jobs = [
    {
      title: 'Frontend Developer',
      slug: 'frontend-dev',
      category: 'Engineering',
      categoryLabel: 'Technology & Engineering',
      employmentType: 'Project-Based / Contract',
      location: 'Remote · Worldwide',
      compensation: 'Project-Based',
      compDetail: 'Per website / landing page deliverable',
      description:
        'Build fast, responsive, conversion-focused websites and landing pages for Amplipath clients using modern web technologies.',
      responsibilities: JSON.stringify([
        'Translate design wireframes and UX specs into clean, responsive web pages and components',
        'Optimize Core Web Vitals, page load speeds, and mobile accessibility for global audiences',
        'Integrate interactive UI elements, lead capture forms, and analytics tracking pixels',
        'Collaborate asynchronously with design and SEO leads to ensure technical search friendliness',
      ]),
      requirements: JSON.stringify([
        'Strong proficiency in modern HTML5, CSS3, JavaScript/TypeScript, and React or Next.js',
        'Proven experience building responsive, mobile-first websites with clean, maintainable code',
        'Understanding of technical SEO principles, semantic markup, and performance optimization',
        'Portfolio of live websites or web applications that you have built or contributed to',
      ]),
    },
    {
      title: 'Full-Stack Software Developer',
      slug: 'fullstack-dev',
      category: 'Engineering',
      categoryLabel: 'Technology & Engineering',
      employmentType: 'Project-Based / Contract',
      location: 'Remote · Worldwide',
      compensation: 'Project-Based',
      compDetail: 'Per project milestone / build',
      description:
        'Build end-to-end web applications, custom platforms, client portals, and third-party API integrations that scale.',
      responsibilities: JSON.stringify([
        'Architect and develop full-stack applications with robust backend APIs and clean frontend interfaces',
        'Build secure database schemas, user authentication, and multi-tenant logic',
        'Integrate payment gateways (Stripe, Paystack, Flutterwave), CRMs, and marketing automation APIs',
        'Deploy, monitor, and maintain serverless and cloud infrastructure for client systems',
      ]),
      requirements: JSON.stringify([
        'Proven track record building full-stack web applications with Node.js/TypeScript and modern SQL/NoSQL databases',
        'Experience with Next.js App Router, REST/GraphQL APIs, and cloud deployment pipelines',
        'Strong problem-solving ability with attention to security, performance, and code quality',
        'Clean communication skills and ability to manage project milestones autonomously',
      ]),
    },
    {
      title: 'Senior SEO & Technical Search Specialist',
      slug: 'senior-seo-specialist',
      category: 'SEO & Search',
      categoryLabel: 'Search & Generative Optimization',
      employmentType: 'Contract / Ongoing Retainer',
      location: 'Remote · Worldwide',
      compensation: 'Monthly Retainer',
      compDetail: 'Tiered retainer based on client accounts managed',
      description:
        'Lead organic search strategy, technical SEO audits, and generative engine optimization (GEO) programs for international clients.',
      responsibilities: JSON.stringify([
        'Conduct comprehensive technical SEO, content gap, and competitor architecture audits',
        'Develop keyword clustering and topical authority maps that drive commercial qualified pipeline',
        'Optimize brand entity footprint for generative AI engines (ChatGPT, Perplexity, Gemini)',
        'Deliver data-backed monthly reporting with revenue and attribution impact analysis',
      ]),
      requirements: JSON.stringify([
        '5+ years demonstrable experience running SEO campaigns that generated verified revenue growth',
        'Deep command of Screaming Frog, Ahrefs, SEMrush, Google Search Console, and schema markup',
        'Solid grasp of modern LLM citation models and Answer Engine Optimization (AEO) mechanics',
        'Strong English business writing and client communication capability',
      ]),
    },
  ];

  for (const job of jobs) {
    await prisma.jobListing.upsert({
      where: { slug: job.slug },
      update: job,
      create: job,
    });
  }
  console.log(`✅ ${jobs.length} career listings seeded.`);

  console.log('\n🎉 ALL SEED DATA SUCCESSFULLY IMPORTED INTO MYSQL DATABASE!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
