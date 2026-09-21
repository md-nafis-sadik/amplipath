import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Ecommerce Growth Marketing Agency | AMPLIPATH',
  description: 'Specialized marketing, technology, and customer acquisition systems for this industry from AMPLIPATH.',
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['ecommerce'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="ecommerce" />;
}
