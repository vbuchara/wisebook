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
  compiler: {
    styledComponents: {
      ssr: true
    }
  },
  webpack: (config) => {

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config; 
  },
}

module.exports = nextConfig;
