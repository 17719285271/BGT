// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
// const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      process.env.SUPABASE_HOSTNAME || 'xxxx.supabase.co', // to prevent vercel failed
      'b.jimmylv.cn',
      'avatars.dicebear.com',
      // "i2.hdslb.com",
      // "avatars.githubusercontent.com",
      // "s3-us-west-2.amazonaws.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: '/blocked',
        destination: '/shop',
      },
    ]
  },

  async serverMiddleware() {
    // 配置代理服务器
    const proxy = createProxyMiddleware({
      target: 'http:127.0.0.1:10809',
      changeOrigin: true,
    });

    // 将API请求路由到代理服务器
    return (req, res, next) => {
        proxy(req, res, next);
        console.log("使用了代理");
    };
  }
}
const nextConfig = {
  swcMinify: false, // 'minify' in Next versions < 12.0
}

// module.exports = withSentryConfig(module.exports, { silent: true }, { hideSourcemaps: true })
