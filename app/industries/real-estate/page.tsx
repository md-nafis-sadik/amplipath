import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Real Estate & Property Development Marketing | AMPLIPATH',
  description: 'Specialized marketing, technology, and customer acquisition systems for this industry from AMPLIPATH.',
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['realestate'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="realestate" />;
}
