/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"]
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/cadernos',
        destination: '/usuarios/cadernos',
      }
    ]
  },
  future: {
    webpack5: true,  
  },
  webpack: (config, { isServer }) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config; 
  }
}

module.exports = nextConfig;
