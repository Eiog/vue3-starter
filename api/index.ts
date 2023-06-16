import express from 'express'

const app = express()
const router = express.Router()
app.use('/api', router)
router.get('/express', (req, res) => {
  res.send({ express: 'Hello from Express.js' })
})

export default app
