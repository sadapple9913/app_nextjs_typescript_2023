/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== 'production'
const name = 'app_nextjs_typescript_2023'
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: !debug ? `/${name}/`:'',
  basePath : '/app_extjs_typescript_2023',
  trailingSlash: true,
}

module.exports = nextConfig
