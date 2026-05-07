/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: [
    "antd",
    "@ant-design/pro-components",
    "@ant-design/icons",
    "@ant-design/cssinjs",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-field-form",
  ],
  /* config options here */
  experimental: {
    optimizePackageImports: [
      "antd",
      "@ant-design/icons",
      "@ant-design/pro-components",
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    REDIRECT_URI: process.env.REDIRECT_URI,
    APP_BASE_URL: process.env.APP_BASE_URL,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ba440cb1bbf94eaaa325012bc72e0bfa.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
