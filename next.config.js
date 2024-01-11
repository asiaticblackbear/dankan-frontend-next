/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images:{
    unoptimized: true,
    remotePatterns:[
      {
        protocol: 'https',
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
  /*async redirects(){
    return [
      {
        source: '/',
        destination: '/user/signin',
        permanent: true,
      },
      {
        source: '/nickname',
        destination: '/user/signin',
        permanent: true,
      }
    ];
  }*/
}

module.exports = nextConfig
