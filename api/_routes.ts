import { Router } from 'express'
import info from './info'
import track from './track'

const router = Router()
router.get('/info', info)
router.post('/track', track)
export default router
