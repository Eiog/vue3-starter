/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Router } from 'express'
import hello from './hello.ts'
import info from './info.ts'
import track from './track.ts'

const router = Router()
router.all('/hello', hello)
router.all('/info', info)
router.all('/track', track)
export default router
