import express from 'express'

const app = express()
app.get('/api', (req, res) => {
  res.send('Hello Mock API!')
})

export default app
