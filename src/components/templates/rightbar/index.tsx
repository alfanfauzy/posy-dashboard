import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Button, Checkbox, Input, Select, Tabs } from 'posy-fnb-core'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useReactToPrint } from 'react-to-print'
import { CgTrash } from 'react-icons/cg'
import useDisclosure from '@/hooks/useDisclosure'
import NoOrderIcon from 'src/assets/icons/noOrder'
import { useAppSelector } from 'store/hooks'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  loading: () => <div />,
})

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

const Items = [{ label: 'Order' }, { label: 'Payment' }]

interface TemplatesRightBarProps {
  qrRef: React.RefObject<HTMLDivElement>
}

const TemplatesRightBar = ({ qrRef }: TemplatesRightBarProps) => {
  const { selectedTrxId } = useAppSelector((state) => state.transaction)

  const [tabValue, setTabValue] = useState(0)

  const [isOpenCancelTrx, { open: openCancelTrx, close: closeCancelTrx }] =
    useDisclosure({
      initialState: false,
    })

  const [
    isOpenCancelOrder,
    { open: openCancelOrder, close: closeCancelOrder },
  ] = useDisclosure({
    initialState: false,
  })

  const [
    isOpenCancelAllOrder,
    { open: openCancelAllOrder, close: closeCancelAllOrder },
  ] = useDisclosure({
    initialState: false,
  })

  const [
    showDeleteOrder,
    { toggle: toggleShowDeleteOrder, close: closeDeleteOrder },
  ] = useDisclosure({
    initialState: false,
  })

  const handlePrint = useReactToPrint({
    content: () => qrRef.current,
  })

  return (
    <main className="relative w-[340px] rounded-l-2xl bg-neutral-10">
      {!selectedTrxId && (
        <div className="h-full w-full p-6">
          <p className="text-xxl-bold">Transaction Details</p>

          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <NoOrderIcon />
            <p className="text-l-medium">There’s no order yet</p>
          </div>
        </div>
      )}
      {selectedTrxId && (
        <article className="flex h-full flex-col">
          <section className="h-full px-4 py-6">
            <aside>
              <div className="flex items-center justify-between">
                <p className="text-xxl-bold">Transaction Details</p>
                <CgTrash
                  className="cursor-pointer text-neutral-70"
                  size={20}
                  onClick={openCancelTrx}
                />
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
                        placeholder="Select Type"
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
                        placeholder="table"
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
                    onClick={toggleShowDeleteOrder}
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
                    {!showDeleteOrder && (
                      <div className="w-full">
                        <div className="flex items-center justify-between text-s-bold">
                          <p>Order 1</p>
                          <p className="text-neutral-50">Processed</p>
                        </div>
                        <div className="mt-2 w-full">
                          <Checkbox
                            title="Fried Kwetiau"
                            onChange={() => undefined}
                            size="m"
                            disabled
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
                    )}

                    {showDeleteOrder && (
                      <div className="mt-4 w-full">
                        <div className="flex items-center justify-between text-s-bold">
                          <p>Order 1</p>
                          <div
                            className="cursor-pointer text-red-accent duration-150"
                            role="presentation"
                            onClick={openCancelAllOrder}
                          >
                            Cancel Order
                          </div>
                        </div>
                        <div className="mt-2 w-full">
                          <div className="my-2 flex items-center justify-between">
                            <p className="text-m-regular">Fried Kwetiau</p>
                            <p
                              role="presentation"
                              onClick={openCancelOrder}
                              className="cursor-pointer text-s-semibold text-red-caution hover:text-opacity-75"
                            >
                              Cancel
                            </p>
                          </div>
                          <div className="my-2 flex items-center justify-between">
                            <p className="text-m-regular">Fried Kwetiau</p>
                            <p className="cursor-pointer text-s-semibold text-red-caution hover:text-opacity-75">
                              Cancel
                            </p>
                          </div>
                          <div className="my-2 flex items-center justify-between">
                            <p className="text-m-regular">Fried Kwetiau</p>
                            <p className="cursor-pointer text-s-semibold text-red-caution hover:text-opacity-75">
                              Cancel
                            </p>
                          </div>
                          <div className="my-2 flex items-center justify-between">
                            <p className="text-m-regular">Fried Kwetiau</p>
                            <p className="cursor-pointer text-s-semibold text-red-caution hover:text-opacity-75">
                              Cancel
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <Button
                      variant="secondary"
                      fullWidth
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
            {showDeleteOrder && (
              <Button variant="secondary" onClick={closeDeleteOrder} fullWidth>
                <p className="whitespace-nowrap text-m-semibold">
                  Back to order details
                </p>
              </Button>
            )}
            {!showDeleteOrder && (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handlePrint}>
                  <p className="whitespace-nowrap text-m-semibold">
                    Reprint QR
                  </p>
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handlePrint}
                  className="whitespace-nowrap text-m-semibold"
                >
                  Print to Kitchen
                </Button>
              </div>
            )}
          </section>
        </article>
      )}

      <Modal open={isOpenCancelTrx} handleClose={closeCancelTrx}>
        <section className="flex w-[380px] flex-col items-center justify-center p-4">
          <div className="px-16">
            <p className="text-center text-l-semibold line-clamp-2">
              Are you sure you want to delete this transaction?
            </p>
          </div>
          <div className="mt-8 flex w-full gap-3">
            <Button
              variant="secondary"
              size="m"
              fullWidth
              onClick={closeCancelTrx}
              className="whitespace-nowrap"
            >
              No, Maybe Later
            </Button>
            <Button
              variant="primary"
              size="m"
              fullWidth
              onClick={closeCancelTrx}
            >
              Delete Trx
            </Button>
          </div>
        </section>
      </Modal>

      <Modal open={isOpenCancelOrder} handleClose={closeCancelOrder}>
        <section className="flex w-[340px] flex-col items-center justify-center p-4">
          <div className="px-12">
            <p className="text-center text-l-semibold line-clamp-2">
              Are you sure you want to cancel Fried Kwetiau?
            </p>
            <div className="mt-6">
              <Select
                className="w-full"
                size="l"
                options={orderType}
                placeholder="Select Type"
              />
            </div>
          </div>
          <div className="mt-8 flex w-full gap-3">
            <Button
              variant="secondary"
              size="l"
              fullWidth
              onClick={closeCancelOrder}
              className="whitespace-nowrap"
            >
              No
            </Button>
            <Button
              variant="primary"
              size="l"
              fullWidth
              onClick={closeCancelOrder}
            >
              Yes
            </Button>
          </div>
        </section>
      </Modal>

      <Modal open={isOpenCancelAllOrder} handleClose={closeCancelAllOrder}>
        <section className="flex w-[340px] flex-col items-center justify-center p-4">
          <div className="px-12">
            <p className="text-center text-l-semibold line-clamp-2">
              Are you sure you want to cancel all order ?
            </p>
            <div className="mt-6">
              <Select
                className="w-full"
                size="l"
                options={orderType}
                placeholder="Select Type"
              />
            </div>
          </div>
          <div className="mt-8 flex w-full gap-3">
            <Button
              variant="secondary"
              size="l"
              fullWidth
              onClick={closeCancelAllOrder}
              className="whitespace-nowrap"
            >
              No
            </Button>
            <Button
              variant="primary"
              size="l"
              fullWidth
              onClick={closeCancelAllOrder}
            >
              Yes
            </Button>
          </div>
        </section>
      </Modal>
    </main>
  )
}

export default TemplatesRightBar
