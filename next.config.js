/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: 'export',
  trailingSlash: true,
  images:{
    unoptimized: true,
    remotePatterns:[
      {
        protocol: "https",
      hostname: "*"
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
}

module.exports = nextConfig
