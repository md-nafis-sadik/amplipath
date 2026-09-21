import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: 'Healthcare & Medical Practice Marketing | AMPLIPATH',
  description: 'Specialized marketing, technology, and customer acquisition systems for this industry from AMPLIPATH.',
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['healthcare'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="healthcare" />;
}
