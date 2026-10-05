import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'AI Marketing & Prompt Strategy | AMPLIPATH',
  description: 'AI prompt strategy, personalized marketing workflows, brand persona engineering, and AI-driven campaign management from AMPLIPATH.',
  alternates: {
    canonical: '/services/ai-marketing',
  },
  openGraph: {
    title: 'AI Marketing & Prompt Strategy | AMPLIPATH',
    description: 'AI prompt strategy, personalized marketing workflows, brand persona engineering, and AI-driven campaign management from AMPLIPATH.',
    url: '/services/ai-marketing',
  },
};

export default function ServicePage() {
  const data = SERVICES_DATA['aiprompt'] || Object.values(SERVICES_DATA)[0];
  return <ServicePageTemplate data={data} serviceId="ai-marketing" />;
}
