import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export const metadata: Metadata = {
  title: "Search & GEO/AEO Services | AMPLIPATH",
  description: "Search Engine Optimization and Generative Engine Optimization (GEO/AEO) for modern search and AI engines by AMPLIPATH.",
};

export default function ServicePage() {
  const baseData = SERVICES_DATA['seo'] || Object.values(SERVICES_DATA)[0];
  const data = {
    ...baseData,
    eye: "Search & GEO/AEO Services",
    shortTitle: "Search & GEO/AEO",
    h1: "Be discoverable everywhere your customers search — on Google and modern AI engines.",
    sub: "Custom SEO and Generative Engine Optimization engineered to capture first-page rankings and build lasting organic visibility across Google, Bing, ChatGPT, and Gemini.",
  };
  return <ServicePageTemplate data={data} serviceId="search-geo-aeo" />;
}
