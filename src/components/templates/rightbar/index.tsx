import dynamic from 'next/dynamic'
import React, { useRef, useState } from 'react'
import { Button, Checkbox, Input, Select, Tabs, Textarea } from 'posy-fnb-core'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useReactToPrint } from 'react-to-print'
import { CgTrash } from 'react-icons/cg'
import { IoMdArrowBack } from 'react-icons/io'
import {
  listMenus,
  listMenuTabs,
  listCancelReason,
  listOrderTabs,
  orderType,
  tableNumber,
} from './helpertemp'
import useDisclosure from '@/hooks/useDisclosure'
import NoOrderIcon from 'src/assets/icons/noOrder'
import { useAppSelector } from 'store/hooks'
import InputSearch from '@/atoms/input/search'
import { toRupiah } from 'utils/common'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  loading: () => <div />,
})

const BottomSheet = dynamic(
  () => import('posy-fnb-core').then((el) => el.BottomSheet),
  {
    loading: () => <div />,
  },
)

interface TemplatesRightBarProps {
  qrRef: React.RefObject<HTMLDivElement>
}

const TemplatesRightBar = ({ qrRef }: TemplatesRightBarProps) => {
  const kitchenRef = useRef<any>()
  const { selectedTrxId } = useAppSelector((state) => state.transaction)

  const [tabValueorder, setTabValueOrder] = useState(0)
  const [tabValueMenu, setTabValueMenu] = useState(0)

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

  const [
    isOpenCreateOrder,
    { open: openCreateOrder, close: closeCreateOrder },
  ] = useDisclosure({ initialState: false })

  const [
    isOpenAddVariantOrder,
    { open: openAddVariantOrder, close: closeAddVariantOrder },
  ] = useDisclosure({ initialState: false })

  const noOrder = true

  const handlePrintQr = useReactToPrint({
    content: () => qrRef.current,
  })
  const handlePrintToKitchen = useReactToPrint({
    content: () => kitchenRef.current,
  })

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const regex = new RegExp(e.target.value, 'i')
    // const newData = data.filter(({ name }) => name.match(regex))
    // setDataTransaction(newData)
    // dispatch(onChangeSearch({ search: e.target.value }))
  }
  const onClear = () => {
    // dispatch(onClearSearch())
    // setDataTransaction(data)
    // closeSearch()
  }

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
              <div className="my-2 border-b border-neutral-30" />
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
                    items={listOrderTabs}
                    value={tabValueorder}
                    onChange={(e) => setTabValueOrder(e)}
                    fullWidth
                  />
                </div>

                {tabValueorder === 0 && (
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
                      onClick={openCreateOrder}
                    >
                      + Add New Order
                    </Button>

                    <article className="hidden">
                      <section ref={kitchenRef} className="p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-xl-semibold">Dine in</p>
                          <p className="text-xl-semibold">Print x1</p>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            <p className="text-m-semibold">Trx ID</p>
                            <p className="text-m-semibold">O150123002</p>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-m-semibold">Henderson</p>
                            <p className="text-m-semibold">Table 01</p>
                          </div>
                        </div>
                        <div className="mt-4 border-b border-dotted border-neutral-40" />

                        <div className="mt-4 flex flex-col items-start">
                          <p className="text-xl-semibold">Order 1</p>
                          <div className="mt-5">
                            <p className="text-xxl-bold">Fried Kwetiau x1</p>
                            <p className="mt-2 text-l-regular">
                              Spicy lv 1, Extra Mushroom, Extra Eggs, Extra
                              Baso, Extra Sausages
                            </p>
                            <p className="mt-2 text-l-regular">
                              <b className="mr-1">Notes:</b>I want to make this
                              food is super spicy without any other ingredients
                            </p>
                          </div>
                          <div className="mt-5">
                            <p className="text-xxl-bold">Fried Capcay x1</p>
                            <p className="mt-2 text-l-regular">Spicy lv 3</p>
                          </div>
                          <div className="mt-5">
                            <p className="text-xxl-bold">Orange Juice x1</p>
                          </div>
                        </div>
                        <div className="mt-4 border-b border-dotted border-neutral-40" />

                        <div className="mt-4 flex flex-col items-start">
                          <p className="text-xl-semibold">Order 2</p>
                          <div className="mt-5">
                            <p className="text-xxl-bold">Fried Kwetiau x1</p>
                            <p className="mt-2 text-l-regular">
                              Spicy lv 1, Extra Mushroom, Extra Eggs, Extra
                              Baso, Extra Sausages
                            </p>
                            <p className="mt-2 text-l-regular">
                              <b className="mr-1">Notes:</b>I want to make this
                              food is super spicy without any other ingredients
                            </p>
                          </div>
                          <div className="mt-5">
                            <p className="text-xxl-bold">Fried Capcay x1</p>
                            <p className="mt-2 text-l-regular">Spicy lv 3</p>
                          </div>
                          <div className="mt-5">
                            <p className="text-xxl-bold">Orange Juice x1</p>
                          </div>
                        </div>
                        <div className="mt-4 border-b border-dotted border-neutral-40" />
                      </section>
                    </article>
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
                <Button variant="secondary" onClick={handlePrintQr}>
                  <p className="whitespace-nowrap text-m-semibold">
                    Reprint QR
                  </p>
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handlePrintToKitchen}
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
              size="l"
              fullWidth
              onClick={closeCancelTrx}
              className="whitespace-nowrap"
            >
              No, Maybe Later
            </Button>
            <Button
              variant="primary"
              size="l"
              fullWidth
              onClick={closeCancelTrx}
            >
              Delete Trx
            </Button>
          </div>
        </section>
      </Modal>

      <Modal
        open={isOpenCancelOrder}
        handleClose={closeCancelOrder}
        overflow={false}
      >
        <section className="flex w-[340px] flex-col items-center justify-center p-4">
          <div className="">
            <p className="text-center text-l-semibold line-clamp-2">
              Are you sure you want to cancel Fried Kwetiau?
            </p>
            <div className="mt-6">
              <Select
                className="w-full"
                size="l"
                options={listCancelReason}
                placeholder="Select the reason"
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

      <Modal
        open={isOpenCancelAllOrder}
        handleClose={closeCancelAllOrder}
        overflow={false}
      >
        <section className="flex w-[340px] flex-col items-center justify-center p-4">
          <div>
            <p className="text-center text-l-semibold line-clamp-2">
              Are you sure you want to cancel all order ?
            </p>
            <div className="mt-6">
              <Select
                className="w-full"
                size="l"
                options={listCancelReason}
                placeholder="Select the reason"
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

      <BottomSheet
        open={isOpenCreateOrder}
        onClose={closeCreateOrder}
        style={{
          background: '#F7F7F7',
          padding: '24px 0',
          height: '100%',
          borderRadius: 0,
        }}
      >
        <section className="flex h-full gap-6 bg-neutral-20">
          <div className="w-2/3 flex-1 rounded-r-2xl bg-neutral-10 p-6">
            <section id="filter" className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <IoMdArrowBack
                  size={24}
                  onClick={closeCreateOrder}
                  className="cursor-pointer hover:opacity-70"
                />
                <p className="cursor-default text-xxl-bold">Choose Orders</p>
              </div>
              <div className="w-1/3">
                <InputSearch
                  placeholder="Search product"
                  isOpen
                  onSearch={onSearch}
                  onClearSearch={onClear}
                />
              </div>
            </section>

            <section id="menus" className="mt-6 h-full w-full">
              <Tabs
                scrollable
                items={listMenuTabs}
                value={tabValueMenu}
                onChange={(e) => setTabValueMenu(e)}
              />
              <article className="my-6 h-4/5 overflow-y-auto">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {listMenus.map((menu) => (
                    <div
                      role="presentation"
                      onClick={openAddVariantOrder}
                      key={menu.name}
                      className="min-h-[116px] cursor-pointer rounded-2xl border border-neutral-90 p-4 duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-50 active:shadow-md"
                    >
                      <p className="min-h-[48px] text-center text-l-semibold text-neutral-70 line-clamp-2">
                        {menu.name}
                      </p>
                      <div className="my-2 border-b border-neutral-40" />
                      <div className="flex items-center justify-center gap-1">
                        <p className="text-m-regular text-neutral-90">
                          {toRupiah(menu.discount_price || menu.price)}
                        </p>
                        {menu.discount_price && (
                          <p className="text-xs line-through">
                            {toRupiah(menu.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </div>

          <div className="relative flex w-60 flex-col gap-[10px] rounded-l-2xl bg-neutral-10 md:w-72 lg:w-96 xl:w-[500px]">
            <aside className="w-full px-6 pt-6">
              <div className="flex flex-col items-start">
                <p className="mb-2 text-xxl-bold">Your Order</p>
                <p className="text-l-semibold">Trx ID: O150123002</p>
                <p className="text-m-semibold">Trx time: 09:45</p>
              </div>
              <div className="my-2 border-b border-neutral-30" />
              <div className="flex gap-2">
                <div className="w-2/3">
                  <div>
                    <p className="text-s-regular">Customer name</p>
                    <p className="text-l-semibold line-clamp-1">
                      Henderson Moraes
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-s-regular">Type of transaction</p>
                    <p className="text-l-semibold">Dine in</p>
                  </div>
                </div>
                <div className="w-1/3">
                  <div>
                    <p className="text-s-regular">Total pax</p>
                    <p className="text-l-semibold">4</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-s-regular">Table number</p>
                    <p className="text-l-semibold">20</p>
                  </div>
                </div>
              </div>
              <div className="my-2 border-b border-neutral-30" />
            </aside>

            {noOrder && (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                <div className="-mt-24">
                  <NoOrderIcon />
                  <p className="text-l-medium">There’s no order yet</p>
                </div>
              </div>
            )}
            {!noOrder && <div className="px-6">tes</div>}

            <section className="absolute bottom-0 w-full rounded-bl-2xl bg-neutral-10 p-6 shadow-basic">
              <Button variant="primary" onClick={closeDeleteOrder} fullWidth>
                Submit Order
              </Button>
            </section>
          </div>
        </section>

        <Modal
          open={isOpenAddVariantOrder}
          handleClose={() => undefined}
          style={{ maxWidth: '80%', width: '80%', padding: 0 }}
        >
          <section>
            <section className="px-12 pt-8 pb-32 md:px-20 lg:px-28">
              <aside>
                <p className="text-heading-s-semibold">Fried Capcay</p>
                <p className="text-xxl-medium">{toRupiah(50000)}</p>
              </aside>

              <aside className="mt-4 flex items-center gap-10">
                <div className="flex-1 border-b border-neutral-40">
                  <p className="text-xxl-semibold">Item Quantity</p>
                </div>
                <div className="flex items-center justify-center gap-6">
                  <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 px-9 text-heading-s-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                    -
                  </div>
                  <div className="text-heading-s-semibold">1</div>
                  <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 px-9 text-heading-s-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                    +
                  </div>
                </div>
              </aside>

              <aside className="mt-6">
                <div className="flex items-center gap-4">
                  <p className="text-xxl-semibold">Spicy Level</p>
                  <div className="text-m-regular">Required | select 1</div>
                </div>

                <div className="mt-4 flex items-center justify-start gap-6 overflow-x-auto whitespace-nowrap">
                  <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                    Spicy lv 0
                  </div>
                  <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                    Spicy lv 1
                  </div>
                  <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                    Spicy lv 2
                  </div>
                  <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                    Spicy lv 3
                  </div>
                  <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                    Spicy lv 4
                  </div>
                  <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                    Spicy lv 5
                  </div>
                  <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                    Spicy lv 6
                  </div>
                </div>
              </aside>

              <aside className="mt-6">
                <div className="flex items-center gap-4">
                  <p className="text-xxl-semibold">Additional Request</p>
                  <div className="text-m-regular">Optional</div>
                </div>

                <div className="mt-4 flex items-center justify-start gap-6 overflow-x-auto whitespace-nowrap">
                  <div className="flex flex-col items-center">
                    <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                      Extra Salt
                    </div>
                    <div className="mt-1 text-m-regular">+ 0</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                      Extra Shrimp
                    </div>
                    <div className="mt-1 text-m-regular">
                      + {toRupiah(100000)}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                      Extra Eggs
                    </div>
                    <div className="mt-1 text-m-regular">
                      + {toRupiah(130000)}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                      Extra Carrot
                    </div>
                    <div className="mt-1 text-m-regular">
                      + {toRupiah(200000)}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80">
                      Extra Meatball
                    </div>
                    <div className="mt-1 text-m-regular">
                      + {toRupiah(45000)}
                    </div>
                  </div>
                </div>
              </aside>

              <aside className="mt-6">
                <p className="text-xxl-semibold">Notes</p>
                <Textarea
                  className="mt-2 h-32"
                  placeholder="Example: no onion, please"
                />
              </aside>
            </section>

            <section className="fixed bottom-8 flex w-4/5 items-center justify-between gap-6 rounded-b-2xl bg-neutral-10 p-6 px-12 shadow-basic md:px-20 lg:px-28">
              <Button
                variant="secondary"
                onClick={closeAddVariantOrder}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={closeAddVariantOrder}
                fullWidth
              >
                Add to Basket
              </Button>
            </section>
          </section>
        </Modal>
      </BottomSheet>
    </main>
  )
}

export default TemplatesRightBar
