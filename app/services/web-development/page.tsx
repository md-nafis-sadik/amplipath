import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Web & E-Commerce Development | AMPLIPATH',
  description: 'Measurable growth delivered through specialized digital marketing and technology solutions from AMPLIPATH.',
};

export default function ServicePage() {
  const data = SERVICES_DATA['webdev'] || Object.values(SERVICES_DATA)[0];
  return <ServicePageTemplate data={data} serviceId="web-development" />;
}
