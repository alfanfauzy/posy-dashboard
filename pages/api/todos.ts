import type { NextApiRequest, NextApiResponse } from 'next'

export function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      res.status(200).json('s')
      break
    case 'POST':
      //   const { todo, completed } = req.body
      //   todos.push({
      //     id: todos.length + 1,
      //     todo,
      //     completed,
      //   })
      res.status(200).json('amsuk posr')
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
