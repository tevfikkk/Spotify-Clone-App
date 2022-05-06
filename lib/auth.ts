import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from './prisma'

export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (token) {
      let user: any

      try {
        const { id } = jwt.verify(token, 'hello')
        user = await prisma.user.findUnique({
          where: { id },
        })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401).json({ error: 'Not Authorized' })
        return
      }
      return handler(req, res, user)
    }
    res.status(401).json({ error: 'Not Authorized' })
  }
}

export const validateToken = (token: any) => {
  const user = jwt.verify(token, 'hello')
  return user
}
