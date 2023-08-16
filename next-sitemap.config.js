/** @type {import('next-sitemap').IConfig} */
// https://github.com/iamvishnusankar/next-sitemap
module.exports = {
  siteUrl: process.env.APP_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    '/watch',
    '/captions',
  ]
}
