import express from 'express'

const app = express()
app.get('/api', (req, res) => {
  res.send('Hello Mock API!')
})
app.get('/info', (req, res) => {
  const cityHeader = req.headers['x-vercel-ip-city'] as string
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-'
  const ipHeader = req.headers['x-forwarded-for'] as string
  const ip = ipHeader ? ipHeader.split(',')[0] : '-'
  res.send({ city, ip })
})
export default app
