/* eslint-disable react/no-unstable-nested-components */
import type { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

import InputSearch from '@/atoms/input/search'
import Table from '@/atoms/table'
import { Transaction, TransactionStatus } from '@/domain/transaction/models'
import useDisclosure from '@/hooks/useDisclosure'
import { useAppDispatch } from '@/store/hooks'
import { openModal } from '@/store/slices/modal'
import { toRupiah } from '@/utils/common'
import { defineds } from '@/utils/date'

const Datepicker = dynamic(() => import('@/atoms/input/datepicker'), {
  loading: () => <div />,
})

const data: Transaction[] = [
  {
    uuid: '76915a37-188c-46a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-000',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '1',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    seconds: 1673889919,
    nanos: 92881211,
    customer_name: 'Andi',
  },
  {
    uuid: '76915a37-188c-46a8-a432-214241124214',
    transaction_code: 'O150123-001',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '2',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    seconds: 1673889919,
    nanos: 92881211,
    customer_name: 'Andi 2',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc111ef6ad26e',
    transaction_code: 'O150123-002',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '3',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    seconds: 1673889919,
    nanos: 92881211,
    customer_name: 'Andi 3',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc1131ef6ad6e',
    transaction_code: 'O150123-003',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '4',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    seconds: 1673889919,
    nanos: 92881211,
    customer_name: 'Andi 4',
  },
  {
    uuid: '76915a37-188c-46a8-a432-d4c111ef6ad6e',
    transaction_code: 'O150123-004',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '5',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    seconds: 1673889919,
    nanos: 92881211,
    customer_name: 'Andi 5',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc5111ef6ad6e',
    transaction_code: 'O150123-005',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '6',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    seconds: 1673889919,
    nanos: 92881211,
    customer_name: 'Andi 6',
  },
  {
    uuid: '76915a37-188c-46a8-6a432-dc111ef6ad6e',
    transaction_code: 'O150123-006',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '7',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    seconds: 1673889919,
    nanos: 92881211,
    customer_name: 'Andi 7',
  },
  {
    uuid: '76915a37-188c-466a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-007',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '8',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    seconds: 1673889919,
    nanos: 92881211,
    customer_name: 'Andi 8',
  },
]

const generateStatus = (status: TransactionStatus) => {
  const statusColor = {
    WAITING_ORDER: ' text-blue-success',
    WAITING_PAYMENT: ' text-red-accent',
    WAITING_FOOD: 'text-yellow-500',
    PAID: 'text-green-success',
    CANCELLED: 'text-red-accent',
  }

  const statusText = {
    WAITING_ORDER: 'Waiting Order',
    WAITING_PAYMENT: 'Waiting Payment',
    WAITING_FOOD: 'Waiting Food',
    PAID: 'Paid',
    CANCELLED: 'Cancelled',
  }

  return <p className={`${statusColor[status]}`}>{statusText[status]}</p>
}

interface ColumnsProps {
  handleOpenDetails: (record: Transaction) => void
}

const columns = ({
  handleOpenDetails,
}: ColumnsProps): ColumnsType<Transaction> => [
  {
    title: 'Trx ID',
    dataIndex: 'transaction_code',
    key: 'transaction_code',
    render: (text) => (
      <p className="whitespace-nowrap text-m-semibold">{text}</p>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'created_at',
    key: 'date',
    render: (_, record) => (
      <p className="whitespace-nowrap text-m-regular">
        {moment(record.seconds).format('ll, hh:mm')}
      </p>
    ),
  },
  {
    title: 'Staff',
    dataIndex: 'staff',
    key: 'staff',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Total order</p>,
    dataIndex: 'total_order',
    key: 'total_order',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Payment method</p>,
    dataIndex: 'payment_method',
    key: 'payment_method',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Total payment</p>,
    dataIndex: 'total_payment',
    key: 'total_payment',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
    align: 'center',
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => (
      <div className="whitespace-nowrap text-m-regular">
        {generateStatus(text)}
      </div>
    ),
  },
  {
    title: ' ',
    key: 'action',
    render: (_, record) => (
      <div
        role="presentation"
        onClick={() => handleOpenDetails(record)}
        // href={`history/${record.transaction_code}`}
        className="cursor-pointer whitespace-nowrap text-s-regular transition-all duration-300 ease-in-out hover:text-neutral-100 hover:text-opacity-50"
      >
        View Details
      </div>
    ),
  },
]

const PagesTransaction = () => {
  const dispatch = useAppDispatch()
  const [isOpenFilterDate, { open: openFilterDate, close: closeFilterDate }] =
    useDisclosure({ initialState: false })

  const [date, setDate] = useState([
    {
      startDate: defineds.startOfDay,
      endDate: defineds.endOfDay,
      key: 'selection',
    },
  ])

  const handleOpenDetails = (record: Transaction) => {
    dispatch(
      openModal({
        overflow: true,
        className: 'w-3/4 overflow-auto',
        component: (
          <section className="px-4 pt-6 pb-4 text-primary-main">
            <aside className="flex items-center justify-between gap-4 border-b border-neutral-40 pb-4">
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
            <aside className="grid grid-cols-4 gap-6 border-b border-neutral-40 py-4">
              <div>
                <p className="text-l-bold">
                  {moment(record.seconds).format('ll, hh:mm')}
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
            </aside>
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

  return (
    <main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
      <article>
        <aside className="flex items-start">
          <p className="text-xxl-semibold text-primary-main lg:text-heading-s-semibold">
            History
          </p>
        </aside>
        <aside className="mt-6">
          <div className="mt-1 flex items-center space-x-4">
            <Datepicker
              dateProps={date}
              close={closeFilterDate}
              open={openFilterDate}
              isOpen={isOpenFilterDate}
              handleChange={(item: any) => setDate([item])}
            />
            <div className="flex w-1/2 items-center lg:w-1/4">
              <InputSearch placeholder="Search Transaction" isOpen />
            </div>
          </div>
        </aside>
      </article>

      <article className="mt-6">
        <Table
          columns={columns({ handleOpenDetails })}
          dataSource={data}
          scroll={{ y: '54vh', x: 1100 }}
        />
      </article>
    </main>
  )
}

export default PagesTransaction
