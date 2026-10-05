import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Search & GEO/AEO Services | AMPLIPATH',
  description: 'Search Engine Optimization, GEO and AI search optimization services from AMPLIPATH.',
  alternates: {
    canonical: '/services/search-seo',
  },
  openGraph: {
    title: 'Search & GEO/AEO Services | AMPLIPATH',
    description: 'Search Engine Optimization, GEO and AI search optimization services from AMPLIPATH.',
    url: '/services/search-seo',
  },
};

export default function ServicePage() {
  const baseData = SERVICES_DATA['seo'] || Object.values(SERVICES_DATA)[0];
  const data = {
    ...baseData,
    eye: 'Search & GEO/AEO Services',
    shortTitle: 'Search & GEO/AEO',
  };
  return <ServicePageTemplate data={data} serviceId="search-seo" />;
}
