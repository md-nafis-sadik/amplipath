import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Web & Tech Development Services | AMPLIPATH',
  description: 'Custom web development, e-commerce stores, web applications, and technical infrastructure by AMPLIPATH.',
  alternates: {
    canonical: '/services/web-development',
  },
  openGraph: {
    title: 'Web & Tech Development Services | AMPLIPATH',
    description: 'Custom web development, e-commerce stores, web applications, and technical infrastructure by AMPLIPATH.',
    url: '/services/web-development',
  },
};

export default function ServicePage() {
  const baseData = SERVICES_DATA['webdev'] || Object.values(SERVICES_DATA)[0];
  const data = {
    ...baseData,
    eye: 'Web & Technology Services',
    shortTitle: 'Web & Tech',
  };
  return <ServicePageTemplate data={data} serviceId="web-development" />;
}
