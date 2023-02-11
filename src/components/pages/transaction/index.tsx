/* eslint-disable no-shadow */
import Image from 'next/image'
import dynamic from 'next/dynamic'
import React, { useRef, useState } from 'react'
import { Button } from 'posy-fnb-core'
import { useReactToPrint } from 'react-to-print'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import useViewportListener from '@/hooks/useViewportListener'
import { useMutateCreateTransaction } from 'src/apis/transaction'
import NotificationIcon from 'src/assets/icons/notification'
import PlusCircleIcon from 'src/assets/icons/plusCircle'
import FilterChip from '@/atoms/chips/filter-chip'
import InputSearch from '@/atoms/input/search'
import useDisclosure from '@/hooks/useDisclosure'
import { onChangeSearch, onChangeSelectedTrxId } from 'store/slices/transaction'

const TemplatesRightBar = dynamic(() => import('@/templates/rightbar'), {
  loading: () => <div />,
})

enum STATUS {
  WAITING_ORDER = 'WAITING_ORDER',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
}

const data = [
  {
    uuid: '76915a37-188c-46a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-000',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '1',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi',
  },
  {
    uuid: '76915a37-188c-46a8-a432-214241124214',
    transaction_code: 'O150123-001',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '2',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 2',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc111ef6ad26e',
    transaction_code: 'O150123-002',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '3',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 3',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc1131ef6ad6e',
    transaction_code: 'O150123-003',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '4',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 4',
  },
  {
    uuid: '76915a37-188c-46a8-a432-d4c111ef6ad6e',
    transaction_code: 'O150123-004',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '5',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 5',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc5111ef6ad6e',
    transaction_code: 'O150123-005',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '6',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 6',
  },
  {
    uuid: '76915a37-188c-46a8-6a432-dc111ef6ad6e',
    transaction_code: 'O150123-006',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '7',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 7',
  },
  {
    uuid: '76915a37-188c-466a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-007',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '8',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 8',
  },
  {
    uuid: '76915a37-188c-46a8-a6432-dc111ef6ad6e',
    transaction_code: 'O150123-008',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '9',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 9',
  },
  {
    uuid: '76915a37-188c-465a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-009',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '10',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 10',
  },
  {
    uuid: '76915a37-188c-46a8-a432-6dc111ef6ad6e',
    transaction_code: 'O150123-010',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '11',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 11',
  },
  {
    uuid: '76915a37-2188c-46a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-011',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '12',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 12',
  },
  {
    uuid: '76915a37-188c-4633a8-a432-dc111ef63ad6e',
    transaction_code: 'O150123-012',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '13',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 13',
  },
  {
    uuid: '76915a37-188c-4633a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-013',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '14',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 14',
  },
  {
    uuid: '76915a37-188c-12146a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-014',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '15',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 15',
  },
  {
    uuid: '76915a42137-188c-46a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-015',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '16',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_ORDER',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 16',
  },
  {
    uuid: '76915a37-188c-4641a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-016',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '17',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_PAYMENT',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 17',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc125111ef6ad6e',
    transaction_code: 'O150123-017',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '18',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_PAYMENT',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 18',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc152111ef6ad6e',
    transaction_code: 'O150123-018',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '19',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_PAYMENT',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 19',
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc55111ef6ad6e',
    transaction_code: 'O150123-019',
    table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
    table_number: '20',
    total_pax: 5,
    total_order: 3,
    status: 'WAITING_PAYMENT',
    is_open: true,
    is_order: false,
    is_paid: false,
    created_at: {
      seconds: 1673889919,
      nanos: 92881211,
    },
    name: 'Andi 20',
  },
]

const PagesTransaction = () => {
  const dispatch = useAppDispatch()
  const componentRef = useRef<any>()
  const { width } = useViewportListener()
  const { showSidebar } = useAppSelector((state) => state.auth)
  const { selectedTrxId } = useAppSelector((state) => state.transaction)
  const [openSearch, { open, close }] = useDisclosure({ initialState: false })
  const [status, setStatus] = useState('')

  const { mutate, isLoading } = useMutateCreateTransaction()

  const [dataTransaction, setDataTransaction] = useState(data)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const handleGenerateQr = () => {
    mutate()
    handlePrint()
  }

  const calculateWaitingOrder = () => {
    const temp = data.filter((el) => el.status === STATUS.WAITING_ORDER)
    return temp.length
  }

  const calculateWaitingPayment = () => {
    const temp = data.filter((el) => el.status === STATUS.WAITING_PAYMENT)
    return temp.length
  }

  const generateBorderColor = (
    status: string,
    code: string,
    selectedCode: string,
  ) => {
    if (code === selectedCode) {
      return 'border-2 border-neutral-100'
    }
    const borderColor: { [key: string]: string } = {
      WAITING_ORDER: 'border-2 border-blue-success',
      WAITING_PAYMENT: 'border-2 border-green-success',
    }
    return borderColor[status]
  }

  const handleSetStatus = (
    e: React.MouseEvent<HTMLElement>,
    statusParams: string,
  ) => {
    // if (e.detail === 1) {
    //   setStatus(status)
    // } else if (e.detail === 2) {
    //   setStatus('')
    // }

    if (status === statusParams) {
      setStatus('')
      setDataTransaction(data)
    } else {
      setStatus(statusParams)
      const newData = data.filter((el) => el.status === statusParams)
      setDataTransaction(newData)
    }
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(e.target.value, 'i')
    const newData = data.filter(({ name }) => name.match(regex))
    setDataTransaction(newData)
    dispatch(onChangeSearch({ search: e.target.value }))
  }

  const handleSelectTrx = (id: string) => {
    dispatch(onChangeSelectedTrxId({ id }))
  }

  return (
    <main className="flex h-full gap-4">
      <section className="relative h-full flex-1 overflow-hidden rounded-2xl bg-neutral-10 p-6">
        <article className="h-fit">
          <aside className="flex items-start justify-between">
            <p className="text-xxl-semibold lg:text-heading-s-semibold">
              Restaurant Transaction
            </p>
            <div className="flex w-fit cursor-pointer items-center justify-center rounded-3xl border border-neutral-70 px-[18px] py-2 transition-all duration-500 ease-in-out hover:bg-neutral-20">
              <NotificationIcon />
            </div>
          </aside>

          <aside className="mt-4 flex gap-2">
            <div className="flex flex-1 gap-2 overflow-x-auto transition-all duration-500 ease-in-out">
              <FilterChip
                label={`Waiting Order: ${calculateWaitingOrder()}`}
                openSearch={openSearch}
                onClick={(e) => handleSetStatus(e, 'WAITING_ORDER')}
                className={`${
                  status === 'WAITING_ORDER'
                    ? 'border-2 border-blue-success'
                    : 'border-neutral-50 '
                }`}
              />
              <FilterChip
                label={`Waiting Payment: ${calculateWaitingPayment()}`}
                openSearch={openSearch}
                onClick={(e) => handleSetStatus(e, 'WAITING_PAYMENT')}
                className={`${
                  status === 'WAITING_PAYMENT'
                    ? 'border-2 border-green-success'
                    : 'border-neutral-50 '
                }`}
              />
              <FilterChip label="Table Capacity: 10" openSearch={openSearch} />
              <InputSearch
                isOpen={openSearch}
                close={close}
                open={open}
                onSearch={onSearch}
              />
            </div>

            <div className="w-1/4">
              <Button
                onClick={handleGenerateQr}
                size="m"
                fullWidth
                variant="red-accent"
                isLoading={isLoading}
              >
                <p className="whitespace-nowrap">+ New Trx</p>
              </Button>
            </div>
          </aside>
        </article>

        <article
          className={`${
            data.length === 0
              ? 'flex items-center justify-center bg-neutral-20'
              : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
          } h-[80%] w-full gap-3 overflow-y-auto py-4`}
        >
          {data.length === 0 && <PlusCircleIcon />}
          {data.length > 0 &&
            dataTransaction.map((el) => (
              <aside
                key={el.uuid}
                onClick={() => handleSelectTrx(el.transaction_code)}
                role="presentation"
                className={`h-[124px] cursor-pointer rounded-2xl border p-4 shadow-sm duration-300 ease-in-out hover:border-neutral-70 active:shadow-md ${generateBorderColor(
                  status,
                  el.transaction_code,
                  selectedTrxId,
                )}`}
              >
                <div className="flex justify-center border-b pb-2">
                  <p className="text-4xl font-normal text-neutral-70">
                    {el.table_number}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-s-semibold text-neutral-90">Name</p>
                  <p className="text-m-regular text-neutral-90 line-clamp-1">
                    {el.name}
                  </p>
                </div>
              </aside>
            ))}
        </article>

        <article className="absolute bottom-0 mb-5 flex w-full gap-4">
          <div className="flex items-center gap-1">
            <div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-blue-success" />
            <p className="text-s-semibold">Waiting Order</p>
          </div>

          <div className="flex items-center gap-1">
            <div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-green-success" />
            <p className="text-s-semibold">Waiting Payment</p>
          </div>
        </article>

        <article className="hidden">
          <section ref={componentRef} className="py-5">
            <div className="flex flex-col items-center justify-center">
              <p className="text-l-semibold">Solaria</p>
              <p className="text-m-regular">Stasiun Gambir</p>
              <Image
                src="/favicon.ico"
                alt="logo"
                width={57}
                height={57}
                className="mt-3 mb-6"
              />
            </div>
            <div className="border-b border-neutral-40" />
            <div className="mt-6 flex flex-col items-center justify-center">
              <p className="text-m-semibold">QR CODE MENU</p>
              <Image
                src="data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAACT0lEQVR42uyZzW0sIRCEa8SBIyFMKCRmzY+cGKEQAkcOaOqpmrF37RfAwnvLwdKi79Ka7qqijfd5n//yLCR5IbIsZAMCyQNRt2kioALYAITDp4YtJON1MRWwsmw+ubIzubyQWM8SPdt4AFmWCn2LXsWsgPqorRdixVLmA9RR+n3W2LAX+Lz93XIvBmx4fTLA5S2kqo76Pd2DA/34TjHv5Z7lX2dwQB3VhXTz1EVkXlRmGwi4qQiYBG2BPlszWT2zAEtdW7g8G3Zp6CEJIgm4b8+aA5DpJsfDJ6wkqwa7/vSs8QG0wBpdgU+klXkF/sgPrweYVQBhEqR7z7OgPkW1KQA6Xhrsey4SZFxW8DzA13T3WrGX2IcjOw4FsOwV1vbOJDWbmn6EqYDV8WRqmoWGHjhVoftW2gmAhZlKzC1cQJPpyn5jfQjpAMAdD5TtZVxLQV0lQRlhIkBlksqaQPzK9oH+ETCmAOS8J4nACpKl14r1GApQH/ne8dZRXkmH/HwytfEBzQXsSeLJvN/x4CGkUwCQCWympndU8z11fgvpAIA9Bm93TU7qQ8WDHx01A7DeHWWP75M9Ffv8HJsnANCCTNfWOaSElHeImAlY0V8ofREiIT1J5o/Hx3o58OVZkPPavsyE1POzTATcW1aLanQZgO1AnqZ7CqDvo1L/s559gakyORLQt6y99xWIvU3vUxXzAHykYqU0eh4TAv2Hy7uE1Jxg50iArfIiy1KjdVTVi9DnX/9cGBzoW1bq1RSpdzfz1heWEwHv8z7/2PkTAAD//70iOfs2jkD5AAAAAElFTkSuQmCC"
                alt="qr-code"
                width={243}
                height={248}
              />
              <div className="mb-6 flex flex-col items-center justify-center">
                <p className="text-m-regular">Please scan to order,</p>
                <p className="text-m-regular">Thank you</p>
              </div>
            </div>
            <div className="border-b border-neutral-40" />
            <p className="my-5 text-center text-m-semibold">
              Powered by Posy Resto
            </p>
          </section>
        </article>
      </section>

      {width > 1200 && <TemplatesRightBar qrRef={componentRef} />}
      {width <= 1200 && !showSidebar && (
        <TemplatesRightBar qrRef={componentRef} />
      )}
    </main>
  )
}

export default PagesTransaction
