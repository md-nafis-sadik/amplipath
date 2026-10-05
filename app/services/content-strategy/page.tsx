import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Content Marketing & Growth Strategy | AMPLIPATH',
  description: 'Enterprise content marketing, search strategy, conversion copywriting, and digital PR campaigns engineered for organic authority and sustainable growth.',
  alternates: {
    canonical: '/services/content-strategy',
  },
  openGraph: {
    title: 'Content Marketing & Growth Strategy | AMPLIPATH',
    description: 'Enterprise content marketing, search strategy, conversion copywriting, and digital PR campaigns engineered for organic authority and sustainable growth.',
    url: '/services/content-strategy',
  },
};

export default function ServicePage() {
  const data = SERVICES_DATA['content'] || Object.values(SERVICES_DATA)[0];
  return <ServicePageTemplate data={data} serviceId="content-strategy" />;
}
