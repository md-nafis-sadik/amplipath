import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: 'Social & Paid Advertising Services | AMPLIPATH',
  description: 'High-converting social advertising, Google PPC, and programmatic campaigns engineered by AMPLIPATH.',
};

export default function ServicePage() {
  const baseData = SERVICES_DATA['fbads'] || Object.values(SERVICES_DATA)[0];
  const data = {
    ...baseData,
    eye: 'Social & Paid Advertising Services',
    shortTitle: 'Social & Paid Ads',
  };
  return <ServicePageTemplate data={data} serviceId="paid-ads" />;
}
