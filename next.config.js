/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "i.imgur.com"]
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/cadernos/:name*',
        destination: '/usuarios/cadernos/:name*',
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
