import fs from 'fs'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
const app = express()
const port = process.env.PORT || 3602

/* 代理配置 start */
const proxyOptions = {
  target: 'http://localhost:3609/', // 后端服务器地址
  changeOrigin: true, // 处理跨域
  pathRewrite: {
    '^/api': '/',
  },
}
const exampleProxy = createProxyMiddleware('/api', proxyOptions) // api前缀的请求都走代理
app.use(exampleProxy)
/* 代理配置 end */

app.use('/', express.static('./dist'))
app.get('*', (req, res) => {
  const indexHtml = fs.readFileSync('./dist/index.html', 'utf-8')
  res.send(indexHtml)
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Local: http://localhost:${port}`)
})
