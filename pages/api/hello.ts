/* eslint-disable @typescript-eslint/no-var-requires */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const ThermalPrinter = require('node-thermal-printer').printer

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const printer = new ThermalPrinter({
    type: 'epson',
  })
  console.log(printer, '<<<<<')
  const isConnected = await printer.isPrinterConnected()

  console.log(isConnected, '>>>')
  // printer. center()
  printer.println('testt aja')
  printer.cut()

  printer.execute((err: any) => {
    if (err) {
      console.error('Print failed', err)
      return res.status(500).send({ error: 'Print failed' })
    }
    console.log('Print success')
    return res.send({ message: 'Print success' })
  })

  res.status(200).json({ name: 'John Doe' })
}
