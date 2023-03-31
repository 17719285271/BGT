const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")

// 配置运行端口
const port = process.env.PORT || 3000

// 初始化 app
const app = next({ dev })
const handle = app.getRequestHandler()

// 代理配置表，这里和一般的 webpack 配置是一样的。
const proxyTable = {
  '/api': {
    target: 'http://127.0.0.1:10809',
    pathRewrite: {
      '^/api': '/api'
    },
    changeOrigin: true
  }
}

app.prepare().then(() => {
  const server = express()

server.use('/api', createProxyMiddleware(proxyTable['/api']));

  // 托管所有请求
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
    console.log('Error:::::', err)
})