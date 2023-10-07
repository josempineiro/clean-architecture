/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com',
        pathname: '/docs/images/products/**',
      },
    ],
  },
}

module.exports = nextConfig
