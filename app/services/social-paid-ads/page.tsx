import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: "Social & Paid Advertising Services | AMPLIPATH",
  description: "High-converting social advertising, Google PPC, and programmatic campaigns engineered by AMPLIPATH.",
};

export default function ServicePage() {
  const baseData = SERVICES_DATA['fbads'] || Object.values(SERVICES_DATA)[0];
  const data = {
    ...baseData,
    eye: "Social & Paid Advertising Services",
    shortTitle: "Social & Paid Ads",
    h1: "High-impact social campaigns and paid acquisition that maximize every dollar spent.",
    sub: "Full-funnel paid advertising across Meta, TikTok, YouTube, Google, and LinkedIn — managed by certified specialists with transparent monthly reporting.",
  };
  return <ServicePageTemplate data={data} serviceId="social-paid-ads" />;
}
