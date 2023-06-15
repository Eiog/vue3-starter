import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const cityHeader = req.headers['x-vercel-ip-city'] as string
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-'
  const ipHeader = req.headers['x-forwarded-for'] as string
  const ip = ipHeader ? ipHeader.split(',')[0] : '-'
  res.send({ city, ip })
}
