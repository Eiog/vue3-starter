import type { Request, Response } from 'express'

export default function handler(
  req: Request,
  res: Response,
) {
  const cityHeader = req.headers['x-vercel-ip-city'] as string
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-'
  const ipHeader = req.headers['x-forwarded-for'] as string
  const ip = ipHeader ? ipHeader.split(',')[0] : '-'
  res.send({ city, ip })
}
