/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
    reactStrictMode: false,
    i18n,
    // distDir: 'build',
    images: {
        domains: ['images.unsplash.com', 'img.laximo.ru', '1zap.uz'],
    },
};

module.exports = nextConfig;
