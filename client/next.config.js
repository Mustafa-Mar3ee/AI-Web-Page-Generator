/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')

module.exports = nextTranslate({
  images: {
    domains: ['robohash.org'],
  },
});