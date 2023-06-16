import express from 'express'
import hello from './hello'
import info from './info'

const app = express()
app.get('/hello', hello)
app.get('/info', info)
export default app
