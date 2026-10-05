import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: "AI Development & Consulting Services | AMPLIPATH",
  description: "Custom AI software, autonomous agent systems, automated workflows, and enterprise AI consulting from AMPLIPATH.",
  alternates: {
    canonical: '/services/ai-development',
  },
  openGraph: {
    title: "AI Development & Consulting Services | AMPLIPATH",
    description: "Custom AI software, autonomous agent systems, automated workflows, and enterprise AI consulting from AMPLIPATH.",
    url: '/services/ai-development',
  },
};

export default function ServicePage() {
  const baseData = SERVICES_DATA['aidev'] || Object.values(SERVICES_DATA)[0];
  const data = {
    ...baseData,
    eye: "AI Development & Consulting Services",
    shortTitle: "AI Development",
    h1: "Build intelligence into your business — custom AI that delivers measurable ROI.",
    sub: "AI-powered applications, LLM integrations, autonomous agents, chatbot development and strategic AI consulting — enterprise-grade AI capability built for scale.",
  };
  return <ServicePageTemplate data={data} serviceId="ai-development" />;
}
