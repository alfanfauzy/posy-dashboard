import { Button, Input } from 'posy-fnb-core'
import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { CgTrash } from 'react-icons/cg'
import NoOrderIcon from 'src/assets/icons/noOrder'

const TemplatesRightBar = () => (
  <main className="w-auto rounded-l-2xl bg-neutral-10 p-6">
    <article className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-xxl-bold">Transaction Details</p>
        <div className="w-fit cursor-pointer rounded-lg border border-neutral-60 p-2 duration-300 hover:bg-neutral-20">
          <CgTrash />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-m-semibold">Trx ID: O150123002</p>
        <div className="flex items-center gap-1">
          <p className="text-m-semibold">Trx time: 09:45</p>
          <AiOutlineInfoCircle />
        </div>
      </div>

      <aside className="mt-4">
        <div className="flex gap-4">
          <div className="w-2/3">
            <Input labelText="Customer Name (Optional)" />
          </div>
          <div className="w-1/3">
            <Input labelText="Pax" />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-2/3">
            <Input labelText="Dine in / Take away" />
          </div>
          <div className="w-1/3">
            <Input labelText="Table" />
          </div>
        </div>
      </aside>

      <aside className="flex h-full justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <NoOrderIcon />
          <p className="text-l-medium">There’s no order yet</p>
        </div>
      </aside>

      <aside>
        <Button variant="secondary" fullWidth>
          Reprint QR
        </Button>
      </aside>
    </article>
  </main>
)

export default TemplatesRightBar
