import { Metadata } from 'next';
import { newServicesData } from '@/data/newServicesData';
import NewServicePageTemplate from '@/components/NewServicePageTemplate';

const service = newServicesData.find((s) => s.slug === 'programmatic-advertising')!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: {
    canonical: `https://amplipath.com/services/${service.slug}/`,
  },
};

export default function ServicePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.shortTitle,
    description: service.metaDescription,
    url: `https://amplipath.com/services/${service.slug}/`,
    provider: {
      '@type': 'Organization',
      name: 'Amplipath',
      url: 'https://amplipath.com',
    },
    areaServed: 'Worldwide',
    serviceType: service.shortTitle,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((x) => ({
      '@type': 'Question',
      name: x[0],
      acceptedAnswer: {
        '@type': 'Answer',
        text: x[1],
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NewServicePageTemplate service={service} />
    </>
  );
}
