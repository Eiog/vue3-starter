import express from 'express'

const app = express()
app.get('/api', (req, res) => {
  res.send('Hello API!')
})

export default app
