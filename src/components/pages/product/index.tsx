import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Toggle } from 'posy-fnb-core'
import React, { useState } from 'react'
import { BiEdit } from 'react-icons/bi'

import InputSearch from '@/atoms/input/search'
import { useAppDispatch } from '@/store/hooks'
import { openModal } from '@/store/slices/modal'
import { listMenus } from '@/templates/rightbar/helpertemp'
import type { Product } from '@/types/product'
import { toRupiah } from '@/utils/common'

// const generateStatus = (status: TransactionStatus) => {
//   const statusColor = {
//     WAITING_ORDER: ' text-blue-success',
//     WAITING_PAYMENT: ' text-red-accent',
//     WAITING_FOOD: 'text-yellow-500',
//     PAID: 'text-green-success',
//     CANCELLED: 'text-red-accent',
//   }

//   const statusText = {
//     WAITING_ORDER: 'Waiting Order',
//     WAITING_PAYMENT: 'Waiting Payment',
//     WAITING_FOOD: 'Waiting Food',
//     PAID: 'Paid',
//     CANCELLED: 'Cancelled',
//   }

//   return <p className={`${statusColor[status]}`}>{statusText[status]}</p>
// }

interface ColumnsProps {
  handleOpenDetails: (record: Product) => void
}

const columns = ({ handleOpenDetails }: ColumnsProps): ColumnsType<Product> => [
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
    fixed: 'left',
    width: '320px',
    render: (text) => <p className="text-m-semibold line-clamp-1">{text}</p>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: '125px',
    render: () => (
      // <p className="whitespace-nowrap text-m-semibold">{text}</p>
      <p className="whitespace-nowrap text-m-semibold">Beverages</p>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Show at Menu</p>,
    dataIndex: 'is_available',
    key: 'is_available',
    width: '128px',
    render: () => (
      <div className="flex items-center justify-center">
        <Toggle value onChange={() => undefined} />
      </div>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Stock Available</p>,
    dataIndex: 'stock_available',
    key: 'stock_available',
    width: '135px',
    render: () => (
      <div className="flex items-center justify-center">
        <Toggle value onChange={() => undefined} />
      </div>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Master Price</p>,
    dataIndex: 'price',
    key: 'price',
    width: '118px',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Outlet Price</p>,
    dataIndex: 'outlet_price',
    key: 'outlet_price',
    width: '118px',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Discount Price</p>,
    dataIndex: 'discount_price',
    key: 'discount_price',
    width: '118px',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
    title: 'Edit',
    key: 'edit',
    width: '60px',
    fixed: 'right',
    render: () => (
      <div className="flex items-center justify-center">
        <BiEdit
          size={18}
          className="cursor-pointer text-neutral-70 hover:opacity-70"
        />
      </div>
    ),
  },
]

const PagesTransaction = () => {
  const dispatch = useAppDispatch()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const handleOpenDetails = () => {
    dispatch(
      openModal({
        overflow: true,
        className: 'w-3/4 overflow-auto',
        component: (
          <section className="px-4 pt-6 pb-4 text-primary-main">
            {/* <aside className="flex items-center justify-between gap-4 border-b border-neutral-40 pb-4">
              <div className="flex-1">
                <p className="text-xxl-bold">{record.transaction_code}</p>
              </div>
              <div className="flex gap-5 text-xl-regular">
                <div className="border-r border-neutral-40 pr-5">
                  <p>{record.customer_name}</p>
                </div>
                <div className="border-r border-neutral-40 pr-5">
                  <p>{`Table ${record.table_number}`}</p>
                </div>
                <div>
                  <p>{`Table ${record.total_pax}`}</p>
                </div>
              </div>
            </aside>
            <aside className="grid grid-cols-4 border-b border-neutral-40 py-4">
              <div>
                <p>Date</p>
                <p className="text-l-bold">
                  {moment(record.created_at.seconds).format('ll, hh:mm')}
                </p>
              </div>
              <div>
                <p>Staff</p>
                <p className="text-l-bold">{record.staff}</p>
              </div>
              <div>
                <p>Payment</p>
                <p className="text-l-bold">OVO</p>
              </div>
              <div className="flex flex-col items-end">
                <p>Status</p>
                <p className="text-l-bold">{generateStatus(record.status)}</p>
              </div>
            </aside> */}
            <aside className="border-b border-neutral-40 py-4">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex w-3/4 items-start break-words lg:w-1/2">
                    <p className="mr-5 text-xl-semibold">20x</p>
                    <p className="flex-1 text-l-regular">Fried Capcay</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-l-regular">{toRupiah(200000)}</p>
                  </div>
                </div>
                <div id="addon" className="mt-2 ml-12 flex flex-col gap-1">
                  <div className="flex items-start justify-between">
                    <p className="w-3/4 text-l-regular line-clamp-2">
                      Spicy Level 0
                    </p>
                    <p className="text-l-regular text-neutral-60">
                      {toRupiah(200000)}
                    </p>
                  </div>
                  {/* {item.addOnVariant.map((addon) => (
                  <div
                    key={addon.variant_uuid}
                    className="flex items-start justify-between"
                  >
                    <p className="w-3/4 text-s-regular text-neutral-90 line-clamp-1">{`${addon.addOnName} ${addon.variant_name}`}</p>
                  </div>
                ))} */}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-start justify-between">
                  <div className="flex w-1/2 items-start break-words">
                    <p className="mr-5 text-xl-semibold">20x</p>
                    <p className="flex-1 text-l-regular line-clamp-3">
                      Special Fried Capcay by Chef Ahmed with Extra Spicy
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-l-regular">{toRupiah(200000)}</p>
                  </div>
                </div>
                <div id="addon" className="mt-2 ml-12 flex flex-col gap-1">
                  <div className="flex items-start justify-between">
                    <p className="w-3/4 text-l-regular line-clamp-2">
                      Extra Capcay
                    </p>
                    <p className="text-l-regular text-neutral-60">
                      {toRupiah(200000)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-start justify-between">
                  <div className="flex w-1/2 items-start break-words">
                    <p className="mr-5 text-xl-semibold">20x</p>
                    <p className="flex-1 text-l-regular line-clamp-3">
                      Special Fried Capcay by Chef Ahmed with Extra Spicy
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-l-regular">{toRupiah(200000)}</p>
                  </div>
                </div>
                <div id="addon" className="mt-2 ml-12 flex flex-col gap-1">
                  <div className="flex items-start justify-between">
                    <p className="w-3/4 text-l-regular line-clamp-2">
                      Extra Capcay
                    </p>
                    <p className="text-l-regular text-neutral-60">
                      {toRupiah(200000)}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <aside className="flex flex-col gap-2 pt-4">
              <div className="flex items-center justify-between text-m-medium">
                <p>Subtotal</p>
                <p>{toRupiah(210000)}</p>
              </div>
              <div className="flex items-center justify-between text-m-medium">
                <p>Discount</p>
                <p>{toRupiah(0)}</p>
              </div>
              <div className="flex items-center justify-between text-m-medium">
                <p>Service</p>
                <p>{toRupiah(0)}</p>
              </div>
              <div className="flex items-center justify-between text-m-medium">
                <p>Tax 10%</p>
                <p>{toRupiah(0)}</p>
              </div>
              <div className="flex items-center justify-between text-l-semibold">
                <p>Total</p>
                <p>{toRupiah(2000000)}</p>
              </div>
            </aside>
          </section>
        ),
      }),
    )
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
      <article>
        <aside className="flex items-start">
          <p className="text-xxl-semibold lg:text-heading-s-semibold">
            Product
          </p>
        </aside>
        <aside className="mt-4">
          <p className="text-m-regular">Date</p>
          <div className="mt-1 flex items-center space-x-6">
            <div className="w-1/2 whitespace-nowrap rounded-md border border-neutral-50 py-1.5 px-3 text-m-regular lg:w-1/4">
              8 feb - 14 feb 2023
            </div>
            <div className="flex w-1/2 items-center lg:w-1/4">
              <InputSearch placeholder="Search Transaction" isOpen />
            </div>
          </div>
        </aside>
      </article>

      <article className="mt-6">
        <div className="w-full overflow-auto">
          <Table
            // loading
            rowKey="product_uuid"
            rowSelection={rowSelection}
            columns={columns({ handleOpenDetails })}
            dataSource={listMenus}
            scroll={{ y: '54vh', x: 1100 }}
            // onChange={onChange}
            // pagination={{
            //   showTotal: (total: number) => (
            //     <Pagination
            //       onChangePagination={onChangePaginationItem}
            //       total={total}
            //       limitSize={limitSize}
            //     />
            //   ),
            //   ...paginationProps,
            // }}
          />
        </div>
      </article>
    </main>
  )
}

export default PagesTransaction
