import React from 'react'
import { Button, Modal } from 'posy-fnb-ds'
import { useMutateCreateTransaction } from 'src/apis/transaction'
import NotificationIcon from 'src/assets/icons/notification'
import PlusCircleIcon from 'src/assets/icons/plusCircle'
import SearchIcon from 'src/assets/icons/search'
import { useDisclosure } from '@/hooks/useDisclosure'

const data = [
  {
    uuid: '76915a37-188c-46a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a432-214241124214',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc111ef6ad26e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc1131ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a432-d4c111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc5111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-6a432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-466a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a6432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-465a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a432-6dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-2188c-46a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-4633a8-a432-dc111ef63ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-4633a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-12146a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a42137-188c-46a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-4641a8-a432-dc111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc125111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc152111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
  {
    uuid: '76915a37-188c-46a8-a432-dc55111ef6ad6e',
    transaction_code: 'O150123-001',
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
  },
]
interface AtomsFilterChipProps {
  label: string
  onClick?: (e: any) => void
}

const FilterChip = ({ label, onClick }: AtomsFilterChipProps) => (
  <div
    tabIndex={0}
    role="button"
    onClick={onClick}
    onKeyDown={onClick}
    className="text-m-semibold w-fit rounded-full border border-neutral-50 px-4 py-[6px] text-neutral-80"
  >
    <p className="whitespace-nowrap">{label}</p>
  </div>
)

const Page = () => {
  const { mutate, isLoading } = useMutateCreateTransaction()
  const [showModal, { open, close }] = useDisclosure({ initialState: false })

  const handleGenerateQr = () => {
    mutate()
    setTimeout(() => {
      open()
    }, 300)
  }

  return (
    <main className="h-full">
      <article className="h-fit">
        <aside className="flex items-center justify-between">
          <p className="heading-s-semibold">Restaurant Transaction</p>
          <div className="flex w-fit cursor-pointer items-center justify-center rounded-3xl border border-neutral-70 px-[18px] py-2 transition-all duration-500 ease-in-out hover:bg-neutral-20">
            <NotificationIcon />
          </div>
        </aside>

        <aside className="mt-4 flex gap-2">
          <div className="flex w-3/4 gap-2 overflow-x-auto">
            <FilterChip label="Waiting Order: 0" />
            <FilterChip label="Waiting Payment: 0" />
            <FilterChip label="Table Capacity: 10" />
            <div className="flex w-fit cursor-pointer items-center justify-center rounded-3xl border border-neutral-60 px-[18px] py-2 transition-all duration-500 ease-in-out hover:bg-neutral-20">
              <SearchIcon />
            </div>
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
        } mt-6 h-[75%] w-full gap-3 overflow-auto`}
      >
        {data.length === 0 && <PlusCircleIcon />}
        {data.length > 0 &&
          data.map((el) => (
            <aside
              key={el.uuid}
              className="h-[124px] min-w-[130px] cursor-pointer rounded-2xl border border-neutral-30 p-4 shadow-sm duration-300 ease-in-out hover:border-neutral-70 active:shadow-md"
            >
              <div className="flex justify-center border-b pb-2">
                <p className="text-4xl font-normal text-neutral-70">01</p>
              </div>
              <div className="mt-2">
                <p className="text-s-semibold text-neutral-90">Name</p>
                <p className="text-m-regular text-neutral-90 line-clamp-1">
                  Henderson Calistaa
                </p>
              </div>
            </aside>
          ))}
      </article>

      <article className="flex h-[10%] gap-4 py-9">
        <div className="flex items-center gap-1">
          <div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-blue-success" />
          <p className="text-s-semibold">Order Received</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="h-[13.3px] w-[13.3px] rounded-full border-[3px] border-green-success" />
          <p className="text-s-semibold">Order Served</p>
        </div>
      </article>

      <Modal open={showModal} handleClose={close}>
        <img
          src="data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAACT0lEQVR42uyZzW0sIRCEa8SBIyFMKCRmzY+cGKEQAkcOaOqpmrF37RfAwnvLwdKi79Ka7qqijfd5n//yLCR5IbIsZAMCyQNRt2kioALYAITDp4YtJON1MRWwsmw+ubIzubyQWM8SPdt4AFmWCn2LXsWsgPqorRdixVLmA9RR+n3W2LAX+Lz93XIvBmx4fTLA5S2kqo76Pd2DA/34TjHv5Z7lX2dwQB3VhXTz1EVkXlRmGwi4qQiYBG2BPlszWT2zAEtdW7g8G3Zp6CEJIgm4b8+aA5DpJsfDJ6wkqwa7/vSs8QG0wBpdgU+klXkF/sgPrweYVQBhEqR7z7OgPkW1KQA6Xhrsey4SZFxW8DzA13T3WrGX2IcjOw4FsOwV1vbOJDWbmn6EqYDV8WRqmoWGHjhVoftW2gmAhZlKzC1cQJPpyn5jfQjpAMAdD5TtZVxLQV0lQRlhIkBlksqaQPzK9oH+ETCmAOS8J4nACpKl14r1GApQH/ne8dZRXkmH/HwytfEBzQXsSeLJvN/x4CGkUwCQCWympndU8z11fgvpAIA9Bm93TU7qQ8WDHx01A7DeHWWP75M9Ffv8HJsnANCCTNfWOaSElHeImAlY0V8ofREiIT1J5o/Hx3o58OVZkPPavsyE1POzTATcW1aLanQZgO1AnqZ7CqDvo1L/s559gakyORLQt6y99xWIvU3vUxXzAHykYqU0eh4TAv2Hy7uE1Jxg50iArfIiy1KjdVTVi9DnX/9cGBzoW1bq1RSpdzfz1heWEwHv8z7/2PkTAAD//70iOfs2jkD5AAAAAElFTkSuQmCC"
          alt="qr-code"
        />
      </Modal>
    </main>
  )
}

export default Page
