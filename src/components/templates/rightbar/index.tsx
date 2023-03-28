import { useQueryClient } from '@tanstack/react-query'
import moment from 'moment'
import dynamic from 'next/dynamic'
import {
  Button,
  Checkbox,
  Input,
  Loading,
  Select,
  Tabs,
  Textarea,
} from 'posy-fnb-core'
import React, { useCallback, useRef, useState } from 'react'
import { AiOutlineInfoCircle, AiOutlinePercentage } from 'react-icons/ai'
import { BsCreditCard, BsFillCheckCircleFill } from 'react-icons/bs'
import { CgTrash } from 'react-icons/cg'
import { FiPrinter } from 'react-icons/fi'
import { IoMdArrowBack } from 'react-icons/io'
import { useReactToPrint } from 'react-to-print'

import CountUpTimer from '@/atoms/countup'
import InputSearch from '@/atoms/input/search'
import { GetOrdersQueryKey } from '@/data/order/sources/GetOrdersQuery'
import { GetTransactionQueryKey } from '@/data/transaction/sources/GetTransactionQuery'
import { AddonVariant } from '@/domain/addon/model'
import { Product } from '@/domain/product/model'
import useDisclosure from '@/hooks/useDisclosure'
import NoOrderIcon from '@/icons/noOrder'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeModal, openModal } from '@/store/slices/modal'
import {
  onAddOrder,
  onChangeAddOn,
  onChangeNotes,
  onChangeProduct,
  onChangeQuantity,
  onClearOrder,
  onCloseOrderModal,
  onDropOrder,
} from '@/store/slices/order'
import {
  calculateOrder,
  calculateOrderBeforeDiscount,
  toRupiah,
} from '@/utils/common'
import { useGetCategoriesViewModel } from '@/view/category/view-models/GetCategoriesViewModel'
import { useCreateOrderManualViewModel } from '@/view/order/view-models/CreateOrderManualViewModel'
import { useGetOrdersViewModel } from '@/view/order/view-models/GetOrdersViewModel'
import { useGetMenuProductsViewModel } from '@/view/product/view-models/GetMenuProductsViewModel'
import { useGetMenuProductViewModel } from '@/view/product/view-models/GetMenuProductViewModel'
import { useGetTablesViewModel } from '@/view/table/view-models/GetTransactionsViewModel'
import { useGetTransactionViewModel } from '@/view/transaction/view-models/GetTransactionViewModel'

import { listCancelReason, listOrderTabs, orderType } from './helpertemp'

const Modal = dynamic(() => import('posy-fnb-core').then((el) => el.Modal), {
  loading: () => <div />,
})

const BottomSheet = dynamic(
  () => import('posy-fnb-core').then((el) => el.BottomSheet),
  {
    loading: () => <div />,
  },
)

const PAYMENT_METHOD = [
  { label: 'Cash', value: 'cash' },
  { label: 'Card', value: 'card' },
  { label: 'E-Wallet', value: 'ewallet' },
  { label: 'Bank Tranfer', value: 'bank' },
]

interface TemplatesRightBarProps {
  qrRef: React.RefObject<HTMLDivElement>
}

const TemplatesRightBar = ({ qrRef }: TemplatesRightBarProps) => {
  const dispatch = useAppDispatch()
  const kitchenRef = useRef<any>()
  const queryClient = useQueryClient()
  const { selectedTrxId } = useAppSelector((state) => state.transaction)
  const { outletId } = useAppSelector((state) => state.auth)

  const { quantity, product, notes, addOnVariant } = useAppSelector(
    (state) => state.order.orderForm,
  )

  const { order } = useAppSelector((state) => state.order)

  const [
    isOpenCreateOrder,
    { open: openCreateOrder, close: closeCreateOrder },
  ] = useDisclosure({ initialState: false })

  const [
    showDeleteOrder,
    { toggle: toggleShowDeleteOrder, close: closeDeleteOrder },
  ] = useDisclosure({
    initialState: false,
  })

  const [
    isOpenAddVariantOrder,
    { open: openAddVariantOrder, close: closeAddVariantOrder },
  ] = useDisclosure({ initialState: false })

  const [
    isOpenCreatePayment,
    { open: openCreatePayment, close: closeCreatePayment },
  ] = useDisclosure({ initialState: false })

  const [
    isOpenPaymentConfirmation,
    { open: openPaymentConfirmation, close: closePaymentConfirmation },
  ] = useDisclosure({ initialState: false })

  const [
    isOpenApplyDiscount,
    { open: openApplyDiscount, close: closeApplyDiscount },
  ] = useDisclosure({ initialState: false })

  const [selectedPayment, setSelectedPayment] = useState('cash')

  const { data: dataTransaction, isLoading: loadTransaction } =
    useGetTransactionViewModel(
      { transaction_uuid: selectedTrxId },
      { enabled: !!selectedTrxId },
    )

  const { data: dataTable, isLoading: loadTable } = useGetTablesViewModel(
    {
      limit: 100,
      sort: {
        field: 'priority',
        value: 'asc',
      },
      search: [
        {
          field: 'restaurant_outlet_uuid',
          value: outletId,
        },
      ],
    },
    { enabled: !!selectedTrxId },
  )

  const { data: dataProduct, isLoading: loadProduct } =
    useGetMenuProductsViewModel(
      {
        limit: 100,
        page: 1,
        sort: {
          field: 'created_at',
          value: 'desc',
        },
        search: [],
        restaurant_outlet_uuid: outletId,
      },
      { enabled: !!isOpenCreateOrder },
    )

  const { data: dataProductDetail, isLoading: loadProductDetail } =
    useGetMenuProductViewModel(
      {
        product_uuid: product?.uuid || '',
        restaurant_outlet_uuid: outletId,
      },
      { enabled: !!(isOpenAddVariantOrder && product?.uuid) },
    )

  const { data: dataCategory } = useGetCategoriesViewModel(
    {
      limit: 100,
      page: 1,
      sort: {
        field: 'category_name',
        value: 'desc',
      },
      search: [],
    },
    { enabled: !!isOpenCreateOrder },
  )

  const { data: dataOrder, isLoading: loadOrder } = useGetOrdersViewModel(
    {
      transaction_uuid: dataTransaction?.uuid || '',
    },
    { enabled: !!dataTransaction?.uuid },
  )

  const { createOrderManual, isLoading: loadCreateOrderManual } =
    useCreateOrderManualViewModel({
      onSuccess: () => {
        closeCreateOrder()
        dispatch(onClearOrder())
        queryClient.invalidateQueries(
          GetOrdersQueryKey({ transaction_uuid: dataTransaction?.uuid || '' }),
        )
        queryClient.invalidateQueries(
          GetTransactionQueryKey({
            transaction_uuid: dataTransaction?.uuid || '',
          }),
        )
      },
    })

  const [tabValueorder, setTabValueOrder] = useState(0)
  const [tabValueMenu, setTabValueMenu] = useState(0)

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

  const onOpenAddVariantOrder = (product: Product) => {
    openAddVariantOrder()
    dispatch(onChangeProduct({ product }))
    dispatch(onChangeQuantity({ operator: 'plus', value: 1 }))
  }

  const onCloseAddVariantOrder = () => {
    closeAddVariantOrder()
    dispatch(onCloseOrderModal())
  }

  const handleIncreamentQuantity = useCallback(
    () => dispatch(onChangeQuantity({ operator: 'plus', value: 1 })),
    [dispatch],
  )

  const handleDecreamentQuantity = useCallback(
    () => dispatch(onChangeQuantity({ operator: 'minus', value: 1 })),
    [dispatch],
  )

  const handleChangeAddon = (
    type: 'radio' | 'checkbox',
    variant: AddonVariant,
    addOn: { addOnName: string; addOnUuid: string },
  ) =>
    dispatch(
      onChangeAddOn({
        type,
        addOnVariant: {
          addOnName: addOn.addOnName,
          addOnUuid: addOn.addOnUuid,
          ...variant,
        },
      }),
    )

  const generateBgColor = (variant_uuid: string) => {
    const selected = addOnVariant?.some(
      (el) => el.variant_uuid === variant_uuid,
    )

    if (selected) return 'bg-[#F2F1F9] border-secondary-main'
    return 'bg-neutral-10 border-neutral-100'
  }

  const handleAddOrder = () => {
    if (product) {
      dispatch(
        onAddOrder({
          quantity,
          product,
          addOnVariant,
          notes,
          order_uuid: Math.floor(Math.random() * Date.now()),
        }),
      )
    }
    onCloseAddVariantOrder()
  }

  const onSubmitOrder = () => {
    const payload = order.map((el) => {
      const tempAddOn: any[] = []
      const addOn = el.addOnVariant

      addOn.map((addon) => {
        const filteredAddOn = tempAddOn.find((v) => v.uuid === addon.addOnUuid)
        if (filteredAddOn) {
          return filteredAddOn.variant_uuids.push(addon.variant_uuid)
        }

        const obj: any = {
          uuid: addon.addOnUuid,
          variant_uuids: [],
        }
        obj.variant_uuids.push(addon.variant_uuid)
        return tempAddOn.push(obj)
      })

      return {
        product_uuid: el.product?.uuid,
        qty: el.quantity,
        order_note: el.notes,
        addon: tempAddOn,
      }
    })

    if (dataTransaction && payload) {
      createOrderManual({
        restaurant_outlet_uuid: outletId,
        transaction_uuid: dataTransaction?.uuid,
        order: payload,
      })
    }
  }

  const openCancelTransaction = () => {
    dispatch(
      openModal({
        component: (
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
                onClick={() => dispatch(closeModal({}))}
                className="whitespace-nowrap"
              >
                No, Maybe Later
              </Button>
              <Button
                variant="primary"
                size="l"
                fullWidth
                onClick={() => dispatch(closeModal({}))}
              >
                Delete Trx
              </Button>
            </div>
          </section>
        ),
      }),
    )
  }

  const openCancelAllOrder = () => {
    dispatch(
      openModal({
        component: (
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
                onClick={() => dispatch(closeModal({}))}
                className="whitespace-nowrap"
              >
                No
              </Button>
              <Button
                variant="primary"
                size="l"
                fullWidth
                onClick={() => dispatch(closeModal({}))}
              >
                Yes
              </Button>
            </div>
          </section>
        ),
      }),
    )
  }

  const openCancelOrder = () => {
    dispatch(
      openModal({
        component: (
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
                onClick={() => dispatch(closeModal({}))}
                className="whitespace-nowrap"
              >
                No
              </Button>
              <Button
                variant="primary"
                size="l"
                fullWidth
                onClick={() => dispatch(closeModal({}))}
              >
                Yes
              </Button>
            </div>
          </section>
        ),
      }),
    )
  }

  const openDeleteNewOrder = (order_uuid: number) => {
    dispatch(
      openModal({
        component: (
          <section className="flex w-[380px] flex-col items-center justify-center p-4">
            <div className="px-16">
              <p className="text-center text-l-semibold line-clamp-2">
                Are you sure you want to delete this order?
              </p>
            </div>
            <div className="mt-8 flex w-full gap-3">
              <Button
                variant="secondary"
                size="l"
                fullWidth
                onClick={() => dispatch(closeModal({}))}
                className="whitespace-nowrap"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="l"
                fullWidth
                onClick={async () => {
                  dispatch(onDropOrder({ order_uuid }))
                  await dispatch(closeModal({}))
                }}
              >
                Yes, confirm
              </Button>
            </div>
          </section>
        ),
      }),
    )
  }

  const generateTransactionCode = (code: string) => {
    const codeArr = code.slice(code.length - 12)
    return codeArr
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
      {(loadTransaction || loadTable) && (
        <div className="-mt-10 flex h-full w-full items-center justify-center">
          <Loading size={75} />
        </div>
      )}

      {dataTransaction && (
        <article className="flex h-full flex-col">
          <section className="h-full px-4 py-6">
            <aside>
              <div className="flex items-center justify-between">
                <p className="text-xxl-bold">Transaction details</p>
                <CgTrash
                  className="cursor-pointer text-neutral-70"
                  size={20}
                  onClick={openCancelTransaction}
                />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-l-semibold">
                  ID:{' '}
                  {`${generateTransactionCode(
                    dataTransaction?.transaction_code,
                  )}`}
                </p>
                <p className="text-l-semibold">
                  Time:
                  {dataTransaction &&
                    moment.unix(dataTransaction?.created_at).format('HH:mm')}
                </p>
              </div>
              <div className="my-2 border-b border-neutral-30" />
            </aside>

            <section className="h-4/5 overflow-y-auto">
              <aside>
                <div className="flex gap-4">
                  <div className="w-2/3">
                    <div>
                      <Input size="m" labelText="Customer name" />
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
                    {dataTable && (
                      <div className="mt-3">
                        <Select
                          size="m"
                          labelText="Table"
                          options={dataTable.map((el) => ({
                            label: el.table_number,
                            value: el.uuid,
                          }))}
                          placeholder="table"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Button size="l" variant="secondary" fullWidth className="mt-4">
                  Save
                </Button>
              </aside>

              <aside className={`mt-6 ${tabValueorder === 1 ? 'mb-14' : ''}`}>
                <div className="flex items-center justify-between">
                  <p className="text-xxl-bold">Order details</p>
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

                {loadOrder && (
                  <div className="mt-20 flex w-full items-center justify-center">
                    <Loading size={60} />
                  </div>
                )}

                {tabValueorder === 0 && !loadOrder && (
                  <div className="pb-10">
                    {!showDeleteOrder && (
                      <div className="my-4 flex w-full items-center justify-center gap-1 rounded-lg border border-neutral-40 py-2 text-m-semibold">
                        Order time:
                        {dataTransaction &&
                        dataTransaction?.first_order_at > 0 ? (
                          <CountUpTimer
                            startTime={dataTransaction?.first_order_at}
                          />
                        ) : (
                          <div className="mx-0.5">-</div>
                        )}
                        <AiOutlineInfoCircle />
                      </div>
                    )}

                    {!showDeleteOrder &&
                      dataOrder &&
                      dataOrder.map((order, idx) => (
                        <div key={order.uuid} className="my-4 w-full">
                          <div className="flex items-center justify-between text-m-semibold">
                            <p>{`Order ${idx + 1}`}</p>
                            <p className="lowercase text-neutral-50 first-letter:uppercase">
                              {order.status.split('_')[1]}
                            </p>
                          </div>
                          <div className="mt-2 w-full">
                            {order.order_detail.map((orderDetail) => (
                              <Checkbox
                                key={orderDetail.uuid}
                                title={orderDetail.product_name}
                                onChange={() => undefined}
                                size="m"
                                // disabled
                              />
                            ))}
                          </div>
                        </div>
                      ))}

                    {showDeleteOrder &&
                      dataOrder &&
                      dataOrder.map((order, idx) => (
                        <div key={order.uuid} className="my-4 w-full">
                          <div className="flex items-center justify-between text-m-semibold">
                            <p>{`Order ${idx + 1}`}</p>
                            <div
                              className="cursor-pointer text-red-accent duration-150"
                              role="presentation"
                              onClick={openCancelAllOrder}
                            >
                              Cancel Order
                            </div>
                          </div>
                          <div className="mt-2 w-full">
                            {order.order_detail.map((orderDetail) => (
                              <div
                                key={orderDetail.uuid}
                                className="my-2 flex items-center justify-between"
                              >
                                <p className="text-m-regular">
                                  {orderDetail.product_name}
                                </p>
                                <p
                                  role="presentation"
                                  onClick={openCancelOrder}
                                  className="cursor-pointer text-s-semibold text-red-caution hover:text-opacity-75"
                                >
                                  Cancel
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                    {!showDeleteOrder && (
                      <Button
                        variant="secondary"
                        fullWidth
                        size="l"
                        className="my-2"
                        onClick={openCreateOrder}
                      >
                        Add New Order
                      </Button>
                    )}

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

                {tabValueorder === 1 && !showDeleteOrder && dataOrder && (
                  <div>
                    {dataOrder.map((order, idx) => (
                      <div key={order.uuid} className="my-4 w-full">
                        <div className="flex items-center justify-between text-m-semibold">
                          <p>{`Order ${idx + 1}`}</p>
                          <p className="lowercase text-green-success first-letter:uppercase">
                            Served
                            {/* {order.status.split('_')[1]} */}
                          </p>
                        </div>
                        <div className="mt-2 flex w-full flex-col gap-2">
                          {order.order_detail.map((orderDetail) => (
                            <div
                              key={orderDetail.uuid}
                              className="flex justify-between"
                            >
                              <p className="flex-1 text-m-regular">
                                {orderDetail.product_name} x{orderDetail.qty}
                              </p>
                              <p className="text-m-regular">
                                {orderDetail.price_final}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="mt-2.5 flex flex-col gap-2 border-t border-t-neutral-30 pt-2">
                      <p className="text-m-semibold">Payment Details</p>
                      <div className="flex items-center justify-between text-m-medium">
                        <p>Subtotal</p>
                        <p>{toRupiah(75000)}</p>
                      </div>
                      <div className="flex items-center justify-between text-m-medium">
                        <p>Discount</p>
                        <p>-{toRupiah(7500)}</p>
                      </div>
                      <div className="flex items-center justify-between text-m-medium">
                        <p>Service</p>
                        <p>{toRupiah(0)}</p>
                      </div>
                      <div className="flex items-center justify-between text-m-medium">
                        <p>PB1</p>
                        <p>{toRupiah(7500)}</p>
                      </div>
                      <div className="flex items-center justify-between text-l-semibold">
                        <p>Total</p>
                        <p>{toRupiah(75000)}</p>
                      </div>
                    </div>
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
            {!showDeleteOrder && tabValueorder === 0 && (
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
            {!showDeleteOrder && tabValueorder === 1 && (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={openApplyDiscount}>
                  <div className="rounded-full border-[1.5px] border-neutral-90 p-0.5">
                    <AiOutlinePercentage />
                  </div>
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={openCreatePayment}
                  className="whitespace-nowrap text-m-semibold"
                >
                  Payment
                </Button>
              </div>
            )}
          </section>
        </article>
      )}

      {isOpenCreatePayment && (
        <Modal
          closeOverlay
          open={isOpenCreatePayment}
          handleClose={closeCreatePayment}
          style={{
            maxWidth: '75%',
            width: '75%',
          }}
          className="!p-0"
        >
          <section className="flex">
            <aside className="flex w-1/3 flex-col items-center rounded-l-3xl bg-neutral-30 p-10">
              <div className="mb-6">
                <p className="text-xxl-semibold">Choose payment method</p>
              </div>
              <div className="flex w-full flex-col gap-4 xl:px-8">
                {PAYMENT_METHOD.map((el) => (
                  <div
                    role="presentation"
                    onClick={() => setSelectedPayment(el.value)}
                    key={el.label}
                    className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
                      selectedPayment === el.value
                        ? 'border-secondary-main bg-[#E0DBFA]'
                        : 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-[#E0DBFA] hover:bg-opacity-70'
                    }`}
                  >
                    <BsCreditCard size={24} />
                    <p className="text-l-medium">{el.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-14 w-full xl:px-8">
                <Button
                  fullWidth
                  className="flex items-center justify-center gap-3"
                >
                  <FiPrinter size={20} />
                  Print Bill
                </Button>
              </div>
            </aside>
            <aside className="flex-1 p-10">
              <div className="relative h-full">
                <div className="mb-4 flex items-center gap-2">
                  <p className="text-heading-s-regular">Total amount:</p>
                  <p className="text-heading-s-bold">Rp510.000</p>
                </div>
                {selectedPayment === 'cash' && (
                  <>
                    <div className="mt-4">
                      <p className="text-xl-semibold">Input Payment Received</p>
                      <input
                        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 p-4 text-center transition-all duration-300 ease-in-out focus:outline-none"
                        placeholder="Input custom amount"
                        value="Rp 510.000"
                      />
                    </div>
                    <div className="mt-6 grid w-full grid-cols-2 gap-4">
                      {/* <div
                        role="presentation"
                        // onClick={() => setSelectedPayment(el.value)}
                        // key={el.label}
                        className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
                          selectedPayment !== 'cash'
                            ? 'border-secondary-main bg-[#E0DBFA]'
                            : 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-[#E0DBFA] hover:bg-opacity-70'
                        }`}
                      >
                        <p className="text-l-medium">{toRupiah(510000)}</p>
                      </div> */}
                      <div
                        role="presentation"
                        // onClick={() => setSelectedPayment(el.value)}
                        // key={el.label}
                        className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
                          selectedPayment !== 'cash'
                            ? 'border-secondary-main bg-[#E0DBFA]'
                            : 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-[#E0DBFA] hover:bg-opacity-70'
                        }`}
                      >
                        <p className="text-l-medium">{toRupiah(550000)}</p>
                      </div>
                      <div
                        role="presentation"
                        // onClick={() => setSelectedPayment(el.value)}
                        // key={el.label}
                        className={`flex w-full cursor-pointer items-center justify-center gap-3.5 rounded-2xl border  p-4 transition-all duration-300 ease-in-out hover:opacity-70 ${
                          selectedPayment !== 'cash'
                            ? 'border-secondary-main bg-[#E0DBFA]'
                            : 'border-neutral-100 bg-neutral-10 hover:border-primary-main hover:bg-[#E0DBFA] hover:bg-opacity-70'
                        }`}
                      >
                        <p className="text-l-medium">{toRupiah(600000)}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xl-semibold">Change (auto filled)</p>
                      <input
                        className="mt-2 flex w-full items-center justify-center gap-3.5 rounded-2xl border border-neutral-100 p-4 text-center transition-all duration-300 ease-in-out focus:outline-none disabled:bg-neutral-40"
                        disabled
                        value={0}
                      />
                    </div>
                  </>
                )}

                <div className="absolute bottom-0 w-full">
                  <div className="bg-slate-200">
                    <Button
                      onClick={() => {
                        closeCreatePayment()
                        openPaymentConfirmation()
                      }}
                      fullWidth
                      className="flex items-center justify-center gap-3"
                    >
                      Continue Payment
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </Modal>
      )}

      {isOpenPaymentConfirmation && (
        <Modal
          closeOverlay
          open={isOpenPaymentConfirmation}
          handleClose={closePaymentConfirmation}
          className="min-w-[382px]"
        >
          <section className="">
            <div className="flex flex-col items-center justify-center">
              <BsFillCheckCircleFill size={52} className="text-green-success" />
              <p className="mt-5 text-xxl-semibold text-primary-main">
                Payment completed!
              </p>
              <p className="text-l-regular text-neutral-70">
                ID: OR01C320101230001
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2 border-t border-neutral-30 pt-6 pb-2">
              <div className="flex items-center justify-between">
                <p className="text-l-semibold text-primary-main">
                  Total amount
                </p>
                <p className="text-l-semibold text-primary-main">Rp510.000</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-m-regular text-primary-main">Payment type</p>
                <p className="text-m-semibold text-primary-main">Debit</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-m-regular text-primary-main">Provider</p>
                <p className="text-m-semibold text-primary-main">BCA</p>
              </div>
            </div>
            <div className="border-t border-neutral-30 py-2">
              <div className="flex items-center justify-between">
                <p className="text-l-semibold text-primary-main">Amount paid</p>
                <p className="text-l-semibold text-primary-main">Rp510.000</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-l-semibold text-primary-main">Change</p>
                <p className="text-l-semibold text-primary-main">-</p>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                size="xl"
                variant="secondary"
                className="w-1/2"
                onClick={closePaymentConfirmation}
              >
                Close
              </Button>
              <Button
                size="xl"
                className="w-1/2"
                onClick={closePaymentConfirmation}
              >
                Print Receipt
              </Button>
            </div>
          </section>
        </Modal>
      )}

      {isOpenApplyDiscount && (
        <Modal
          closeOverlay
          open={isOpenApplyDiscount}
          handleClose={closeApplyDiscount}
          className="min-w-[340px] p-8"
        >
          <section>
            <aside>
              <p className="mb-2 text-l-semibold">Discount</p>
              <Input labelText="Price" disabled value={toRupiah(200000)} />
              <div className="mt-2 flex gap-4">
                <div className="w-2/5">
                  <Input
                    fullwidth
                    labelText="Discount (%)"
                    placeholder="0"
                    type="number"
                  />
                </div>
                <div className="w-3/5">
                  <Input
                    fullwidth
                    labelText="Discount (Rp)"
                    placeholder="0"
                    type="number"
                  />
                </div>
              </div>
            </aside>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                className="w-1/2"
                onClick={closeApplyDiscount}
              >
                Close
              </Button>
              <Button className="w-1/2" onClick={closeApplyDiscount}>
                Apply
              </Button>
            </div>
          </section>
        </Modal>
      )}

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
        <section className="flex h-full w-full gap-6">
          <div className="w-1/2 rounded-r-2xl bg-neutral-10 p-6 lg:w-3/5 xl:w-2/3">
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
                  search=""
                />
              </div>
            </section>

            <section id="menus" className="mt-6 h-full w-full">
              {dataCategory && (
                <Tabs
                  scrollable
                  items={dataCategory?.map((el) => ({
                    label: el.category_name,
                    value: el.uuid,
                  }))}
                  value={tabValueMenu}
                  onChange={(e) => setTabValueMenu(e)}
                  fullWidth
                />
              )}
              <article className="my-6 h-4/5 overflow-y-auto">
                {loadProduct && (
                  <div className="flex h-full w-full items-center justify-center">
                    <Loading size={75} />
                  </div>
                )}
                {!loadProduct && dataProduct && (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {dataProduct.map((product) => (
                      <div
                        role="presentation"
                        onClick={() => onOpenAddVariantOrder(product)}
                        key={product.product_name}
                        className="min-h-[116px] cursor-pointer rounded-2xl border border-neutral-90 p-4 duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-50 active:shadow-md"
                      >
                        <p className="min-h-[48px] text-center text-l-semibold text-neutral-70 line-clamp-2">
                          {product.product_name}
                        </p>
                        <div className="my-2 border-b border-neutral-40" />
                        <div className="flex flex-col items-center justify-center gap-1">
                          <p className="text-m-regular text-neutral-90">
                            {toRupiah(product.price_final)}
                          </p>
                          {product.price_discount > 0 && (
                            <p className="text-xs line-through">
                              {toRupiah(product.price)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </section>
          </div>

          <div className="relative flex w-[500px] flex-1 flex-col rounded-l-2xl bg-neutral-10">
            <div className="w-full px-6 pt-6">
              <p className="text-xxl-bold">Your Order</p>
              <p className="mt-1 text-l-semibold">ID: O150123002</p>
              <div className="my-2 border-b border-neutral-30" />
            </div>

            <section className="h-4/5 overflow-y-auto pb-20">
              <aside className="px-6">
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-3">
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
                  <div className="col-span-2">
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
              {order.length === 0 && (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                  <div className="-mt-24">
                    <NoOrderIcon />
                    <p className="text-l-medium">There’s no order yet</p>
                  </div>
                </div>
              )}

              {order.length > 0 && (
                <div className="px-6">
                  {order.map((item) => (
                    <aside key={item.order_uuid} className="pb-4">
                      <div
                        id="product-info"
                        className="grid grid-cols-10 gap-1"
                      >
                        <div className="cols-span-2">
                          <p className="text-l-medium">x{item.quantity}</p>
                        </div>
                        <div className="col-span-5 flex items-start">
                          <div>
                            <div className="line-clamp-1">
                              <p className=" text-l-medium">
                                {item.product.product_name}
                              </p>
                            </div>
                            <p className="text-m-regular">
                              {item.addOnVariant
                                .map((variant) => variant.variant_name)
                                .join(', ')}
                            </p>
                          </div>
                        </div>

                        <div className="col-span-4 ml-2 flex flex-wrap items-start justify-between">
                          <div className="flex flex-col items-center">
                            <div>
                              <p className="text-l-medium">
                                {toRupiah(calculateOrder(item))}
                              </p>
                              {item.product.price_discount > 0 && (
                                <p className="text-m-regular text-neutral-60 line-through">
                                  {toRupiah(calculateOrderBeforeDiscount(item))}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="mt-0.5 flex justify-end">
                            <CgTrash
                              className="cursor-pointer text-neutral-70 hover:opacity-80"
                              size={20}
                              onClick={() =>
                                openDeleteNewOrder(item.order_uuid)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div id="notes" className="ml-10 mt-0.5">
                        <p className="text-s-regular text-neutral-70">
                          <span className="text-s-semibold">Notes:</span>{' '}
                          {item.notes || '-'}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-neutral-30" />
                    </aside>
                  ))}
                </div>
              )}
            </section>

            <section className="absolute bottom-0 w-full rounded-bl-2xl bg-neutral-10 p-6 shadow-basic">
              <Button
                variant="primary"
                isLoading={loadCreateOrderManual}
                onClick={onSubmitOrder}
                fullWidth
              >
                Submit Order
              </Button>
            </section>
          </div>
        </section>

        {isOpenAddVariantOrder && (
          <Modal
            open={isOpenAddVariantOrder}
            handleClose={() => undefined}
            style={{
              maxWidth: '80%',
              width: '80%',
              padding: 0,
            }}
            confirmButton={
              <div className="flex w-full max-w-[80%] items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  onClick={onCloseAddVariantOrder}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleAddOrder} fullWidth>
                  Add to Basket
                </Button>
              </div>
            }
          >
            <section className="px-12 pt-8 pb-32 md:px-20 lg:px-28">
              {loadProductDetail && (
                <div className="mt-48 flex w-full items-center justify-center">
                  <Loading size={90} />
                </div>
              )}
              {product && dataProductDetail && (
                <div>
                  <aside>
                    <p className="text-heading-s-semibold">
                      {product.product_name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xxl-medium">
                        {toRupiah(product.price_final)}
                      </p>
                      {product.price_discount > 0 && (
                        <div>
                          <p className="text-xxl-medium text-neutral-80 line-through">
                            {toRupiah(product.price)}
                          </p>
                        </div>
                      )}
                    </div>
                  </aside>

                  <aside className="mt-4 flex items-center gap-10">
                    <div className="flex-1 border-b border-neutral-40">
                      <p className="text-xxl-semibold">Item Quantity</p>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                      <div
                        role="presentation"
                        onClick={
                          quantity === 0
                            ? () => undefined
                            : handleDecreamentQuantity
                        }
                        className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 px-9 text-heading-s-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80"
                      >
                        -
                      </div>
                      <div className="text-heading-s-semibold">{quantity}</div>
                      <div
                        role="presentation"
                        onClick={handleIncreamentQuantity}
                        className="flex cursor-pointer items-center justify-center rounded-3xl border border-neutral-100 px-9 text-heading-s-semibold transition-all duration-300 ease-in-out hover:bg-neutral-20 hover:bg-opacity-80"
                      >
                        +
                      </div>
                    </div>
                  </aside>

                  {dataProductDetail.addons &&
                    dataProductDetail.addons.map((addon) => (
                      <aside key={addon.uuid} className="mt-6">
                        <div className="flex items-center gap-4">
                          <p className="text-xxl-semibold">
                            {addon.addon_name}
                          </p>
                          <div className="text-m-regular">
                            Required | select 1
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-start gap-6 overflow-x-auto whitespace-nowrap">
                          {addon.variants.map((variant) => (
                            <div
                              key={variant.variant_uuid}
                              className="flex flex-col items-center"
                            >
                              <div
                                role="presentation"
                                onClick={() =>
                                  handleChangeAddon(
                                    addon.can_choose_multiple
                                      ? 'checkbox'
                                      : 'radio',
                                    variant,
                                    {
                                      addOnName: addon.addon_name,
                                      addOnUuid: addon.uuid,
                                    },
                                  )
                                }
                                className={`flex cursor-pointer items-center justify-center rounded-3xl border  py-1.5 px-7 text-m-semibold transition-all duration-300 ease-in-out hover:bg-[#F2F1F9] hover:bg-opacity-80 ${generateBgColor(
                                  variant.variant_uuid,
                                )}`}
                              >
                                {variant.variant_name}
                              </div>
                              <div className="mt-1 text-m-regular">
                                + {toRupiah(variant.variant_price || 0)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </aside>
                    ))}

                  <aside className="mt-6">
                    <p className="text-xxl-semibold">Notes</p>
                    <Textarea
                      className="mt-2 h-32"
                      placeholder="Example: no onion, please"
                      value={notes}
                      onChange={(e) => dispatch(onChangeNotes(e.target.value))}
                    />
                  </aside>
                </div>
              )}
            </section>
          </Modal>
        )}
      </BottomSheet>
    </main>
  )
}

export default TemplatesRightBar
