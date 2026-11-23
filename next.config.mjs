/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/industries/game',
        destination: '/industries/gaming',
        permanent: true,
      },
      {
        source: '/industries/nonprofit',
        destination: '/industries/nonprofits',
        permanent: true,
      },
      {
        source: '/industries/law',
        destination: '/industries/law-firms',
        permanent: true,
      },
      {
        source: '/industries/course',
        destination: '/industries/education',
        permanent: true,
      },
      {
        source: '/industries/realestate',
        destination: '/industries/real-estate',
        permanent: true,
      },
      {
        source: '/industries/roofing',
        destination: '/industries/home-services',
        permanent: true,
      },
      {
        source: '/industries/restaurant',
        destination: '/industries/restaurants',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
