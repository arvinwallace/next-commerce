/** @type {import('next').NextConfig} */
const { withFrameworkConfig } = require('./framework/common/config')

const nextConfig = withFrameworkConfig({
  reactStrictMode: true,
  swcMinify: true,
  framework: {
    name:"shopify_local"
  },
  i18n:{
    locales:["en-US","es"],
    defaultLocale:"en-US"
  }
})

module.exports = nextConfig

console.log(module.exports)
