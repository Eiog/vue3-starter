import type { Request, Response } from 'express'

export default function handler(
  req: Request,
  res: Response,
) {
  const { body } = req
  res.send(body)
}
