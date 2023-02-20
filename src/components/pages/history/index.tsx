import React from 'react'
import moment from 'moment'
import { Table } from 'antd'
import Link from 'next/link'
import type { ColumnsType } from 'antd/es/table'
import InputSearch from '@/atoms/input/search'
import { type Transaction, TransactionStatus } from '@/types/transaction'

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
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
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
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
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
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
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
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
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
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
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
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
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
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
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
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 8',
  },
  {
    uuid: '76915a37-188c-46a8-a6432-dc111ef6ad6e',
    transaction_code: 'O150123-008',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '9',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 9',
  },
  {
    uuid: '76915a37-188c-465a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-009',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '10',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 10',
  },
  {
    uuid: '76915a37-188c-46a8-a432-6dc111ef6ad6e',
    transaction_code: 'O150123-010',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '11',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 11',
  },
  {
    uuid: '76915a37-2188c-46a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-011',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '12',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 12',
  },
  {
    uuid: '76915a37-188c-4633a8-a432-dc111ef63ad6e',
    transaction_code: 'O150123-012',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '13',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 13',
  },
  {
    uuid: '76915a37-188c-4633a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-013',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '14',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 14',
  },
  {
    uuid: '76915a37-188c-12146a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-014',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '15',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 15',
  },
  {
    uuid: '76915a42137-188c-46a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-015',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '16',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_ORDER,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 16',
  },
  {
    uuid: '76915a37-188c-4641a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-016',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '17',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_PAYMENT,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 17',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc125111ef6ad6e',
    transaction_code: 'O150123-017',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '18',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_PAYMENT,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 18',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc152111ef6ad6e',
    transaction_code: 'O150123-018',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '19',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_PAYMENT,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 19',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc55111ef6ad6e',
    transaction_code: 'O150123-019',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '20',
    total_pax: 5,
    total_order: 3,
    status: TransactionStatus.WAITING_PAYMENT,
    is_open: true,
    is_order: false,
    is_paid: false,
    staff: 'jack',
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    customer_name: 'Andi 20',
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

const columns: ColumnsType<Transaction> = [
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
        {moment(record.created_at.seconds).format('ll, hh:mm')}
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
    title: <p className="whitespace-nowrap">Total Order</p>,
    dataIndex: 'total_order',
    key: 'total_order',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Payment Method</p>,
    dataIndex: 'payment_method',
    key: 'payment_method',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
    title: <p className="whitespace-nowrap">Total Payment</p>,
    dataIndex: 'total_payment',
    key: 'total_payment',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },
  {
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
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Link
        href={`history/${record.transaction_code}`}
        className="cursor-pointer whitespace-nowrap text-s-regular transition-all duration-300 ease-in-out hover:text-neutral-100 hover:text-opacity-50"
      >
        View Details
      </Link>
    ),
  },
]

const PagesTransaction = () => {
  const a = ''
  return (
    <main className="h-full flex-1 overflow-hidden rounded-l-2xl bg-neutral-10 p-6">
      <article>
        <aside className="flex items-start">
          <p className="text-xxl-semibold lg:text-heading-s-semibold">
            History
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
            columns={columns}
            dataSource={data}
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
