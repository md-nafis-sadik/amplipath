import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: "Niche & Growth Marketing Services | AMPLIPATH",
  description: "Specialist marketing services for games, mobile apps, education, podcasts, and emerging markets by AMPLIPATH.",
};

export default function ServicePage() {
  const baseData = SERVICES_DATA['game'] || Object.values(SERVICES_DATA)[0];
  const data = {
    ...baseData,
    eye: "Niche & Growth Services",
    shortTitle: "Niche & Growth",
    h1: "Specialist marketing services for high-growth sectors most agencies overlook.",
    sub: "Game marketing, Steam optimization, app launches, course marketing, music promotion, and crypto — specialized playbooks for specialized industries.",
  };
  return <ServicePageTemplate data={data} serviceId="niche-growth" />;
}
