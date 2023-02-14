/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
    reactStrictMode: false,
    i18n,
    images: {
        domains: ['images.unsplash.com'],
    },
};

module.exports = nextConfig;
