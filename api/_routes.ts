import { Router } from 'express'
import info from './info'
import trackExposure from './track/exposure'
import trackClick from './track/click'
import trackLongPress from './track/long-press'

const router = Router()
router.get('/info', info)
router.post('/track/exposure', trackExposure)
router.post('/track/click', trackClick)
router.post('/track/long-press', trackLongPress)
export default router
