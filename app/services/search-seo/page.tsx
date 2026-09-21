import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'SEO & Search Optimization Services | AMPLIPATH',
  description: 'Measurable growth delivered through specialized digital marketing and technology solutions from AMPLIPATH.',
};

export default function ServicePage() {
  const data = SERVICES_DATA['seo'] || Object.values(SERVICES_DATA)[0];
  return <ServicePageTemplate data={data} serviceId="search-seo" />;
}
