import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "Course & Education Marketing Agency | Amplipath",
  description: "Grow course enrolments and student conversions with SEO, paid ads, sales funnels and marketing for Udemy, Kajabi and other learning platforms.",
  alternates: {
    canonical: '/industries/education',
  },
  openGraph: {
    title: "Course & Education Marketing Agency | Amplipath",
    description: "Grow course enrolments and student conversions with SEO, paid ads, sales funnels and marketing for Udemy, Kajabi and other learning platforms.",
    url: '/industries/education',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - Course & Education Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Course & Education Marketing Agency | Amplipath",
    description: "Grow course enrolments and student conversions with SEO, paid ads, sales funnels and marketing for Udemy, Kajabi and other learning platforms.",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['course'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="course" />;
}
