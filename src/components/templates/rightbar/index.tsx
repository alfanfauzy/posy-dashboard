import React, { useRef, useState } from 'react'
import { Button, Checkbox, Input, Select, Tabs } from 'posy-fnb-core'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { CgTrash } from 'react-icons/cg'
import { useReactToPrint } from 'react-to-print'
import NoOrderIcon from 'src/assets/icons/noOrder'

const orderType = [
  {
    label: 'Dine in',
    value: 'dine_in',
  },
  {
    label: 'Take away',
    value: 'take_away',
  },
]

const tableNumber = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
  {
    label: '5',
    value: 5,
  },
]

const TemplatesRightBar = () => {
  const componentRef = useRef<any>()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const noTransaction = false

  const Items = [{ label: 'Order' }, { label: 'Payment' }]
  const [tabValue, setTabValue] = useState(0)

  return (
    <main
      className="relative w-auto rounded-l-2xl bg-neutral-10"
      ref={componentRef}
    >
      {noTransaction && (
        <div className="h-full w-full p-6">
          <p className="text-xxl-bold">Transaction Details</p>

          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <NoOrderIcon />
            <p className="text-l-medium">There’s no order yet</p>
          </div>
        </div>
      )}
      {!noTransaction && (
        <article className="flex h-full flex-col">
          <section className="h-full px-4 py-6">
            <aside>
              <div className="flex items-center justify-between">
                <p className="text-xxl-bold">Transaction Details</p>
                <CgTrash size={20} className="cursor-pointer text-neutral-70" />
              </div>

              <div className="mt-2 flex flex-col items-start">
                <p className="text-l-semibold">Trx ID: O150123002</p>
                <p className="text-m-semibold">Trx time: 09:45</p>
              </div>
              <div className="my-2 border border-neutral-30" />
            </aside>

            <section className="h-4/5 overflow-y-auto">
              <aside>
                <div className="flex gap-4">
                  <div className="w-2/3">
                    <div>
                      <Input size="m" labelText="Customer Name (Optional)" />
                    </div>
                    <div className="mt-3">
                      <Select
                        size="m"
                        labelText="Dine in / Take away"
                        options={orderType}
                      />
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div>
                      <Input size="m" labelText="Pax" />
                    </div>
                    <div className="mt-3">
                      <Select
                        size="m"
                        labelText="Table"
                        options={tableNumber}
                      />
                    </div>
                  </div>
                </div>
                <Button size="m" variant="secondary" fullWidth className="mt-4">
                  Save
                </Button>
              </aside>

              <aside className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-xxl-bold">Order Details</p>
                  <CgTrash
                    size={20}
                    className="cursor-pointer text-neutral-70"
                  />
                </div>

                <div className="w-full">
                  <Tabs
                    items={Items}
                    value={tabValue}
                    onChange={(e) => setTabValue(e)}
                    fullWidth
                  />
                </div>

                {tabValue === 0 && (
                  <div className="pb-10">
                    <div className="my-4 flex w-full items-center justify-center gap-1 rounded-lg border border-neutral-40 py-2 text-m-semibold">
                      Order Time: 10:00
                      <AiOutlineInfoCircle />
                    </div>
                    <div className="w-full">
                      <div className="flex items-center justify-between text-s-bold">
                        <p>Order 1</p>
                        <p className="text-neutral-50">Processed</p>
                      </div>
                      <div className="w-full">
                        <Checkbox
                          title="Fried Kwetiau"
                          onChange={() => undefined}
                          size="m"
                        />
                        <Checkbox
                          title="Fried Kwetiau"
                          onChange={() => undefined}
                          size="m"
                        />
                        <Checkbox
                          title="Fried Kwetiau"
                          onChange={() => undefined}
                          size="m"
                        />
                        <Checkbox
                          title="Fried Kwetiau"
                          onChange={() => undefined}
                          size="m"
                        />
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={handlePrint}
                      size="m"
                      className="my-2"
                    >
                      + Add New Order
                    </Button>
                  </div>
                )}
              </aside>
            </section>
          </section>

          <section className="absolute bottom-0 w-full rounded-bl-2xl bg-white p-4 shadow-basic">
            <Button variant="secondary" fullWidth onClick={handlePrint}>
              Reprint QR
            </Button>
          </section>
        </article>
      )}
    </main>
  )
}

export default TemplatesRightBar
