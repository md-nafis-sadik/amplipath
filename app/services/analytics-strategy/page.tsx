import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: "Analytics & Strategy Services | AMPLIPATH",
  description: "Enterprise web analytics, marketing strategy, and decision-ready data infrastructure engineered for measurable ROI by AMPLIPATH.",
};

export default function ServicePage() {
  const baseData = SERVICES_DATA['analytics'] || Object.values(SERVICES_DATA)[0];
  const data = {
    ...baseData,
    eye: "Analytics & Strategy Services",
    shortTitle: "Analytics & Strategy",
    h1: "Data architecture and marketing strategy that turn insights into scalable revenue.",
    sub: "From GA4 and Looker Studio data infrastructure to comprehensive go-to-market strategies, we eliminate guesswork and build decision-ready systems that scale your growth predictably.",
  };
  return <ServicePageTemplate data={data} serviceId="analytics-strategy" />;
}
