/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ba440cb1bbf94eaaa325012bc72e0bfa.r2.dev',
      },
    ],
  },
};

export default nextConfig;
