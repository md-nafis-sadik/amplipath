import { Metadata } from 'next';
import AfricaMarketTemplate from '@/components/AfricaMarketTemplate';

export const metadata: Metadata = {
  title: 'Africa Market Growth & Digital Marketing Services | Amplipath',
  description: 'Africa market entry and growth services from Amplipath: country-specific research, websites and ecommerce, local SEO, paid media, WhatsApp journeys, AI automation and measurement.',
};

export default function AfricaServicePage() {
  return <AfricaMarketTemplate />;
}
