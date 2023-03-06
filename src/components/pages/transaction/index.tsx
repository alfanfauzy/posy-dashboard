// import dynamic from 'next/dynamic'
// import React, { useRef } from 'react'

// import useViewportListener from '@/hooks/useViewportListener'
// import ContentTransaction from '@/organisms/content/transaction'
// import { useAppSelector } from '@/store/hooks'
// import ViewTransactionPage from '@/view/transaction/pages'

// const TemplatesRightBar = dynamic(() => import('@/templates/rightbar'), {
//   loading: () => <div />,
// })

// const data = [
//   {
//     uuid: '76915a37-188c-46a8-a432-dc111ef6ad6e',
//     transaction_code: 'O150123-000',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '1',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a432-214241124214',
//     transaction_code: 'O150123-001',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '2',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 2',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a432-dc111ef6ad26e',
//     transaction_code: 'O150123-002',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '3',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 3',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a432-dc1131ef6ad6e',
//     transaction_code: 'O150123-003',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '4',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 4',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a432-d4c111ef6ad6e',
//     transaction_code: 'O150123-004',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '5',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 5',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a432-dc5111ef6ad6e',
//     transaction_code: 'O150123-005',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '6',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 6',
//   },
//   {
//     uuid: '76915a37-188c-46a8-6a432-dc111ef6ad6e',
//     transaction_code: 'O150123-006',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '7',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 7',
//   },
//   {
//     uuid: '76915a37-188c-466a8-a432-dc111ef6ad6e',
//     transaction_code: 'O150123-007',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '8',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 8',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a6432-dc111ef6ad6e',
//     transaction_code: 'O150123-008',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '9',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 9',
//   },
//   {
//     uuid: '76915a37-188c-465a8-a432-dc111ef6ad6e',
//     transaction_code: 'O150123-009',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '10',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 10',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a432-6dc111ef6ad6e',
//     transaction_code: 'O150123-010',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '11',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 11',
//   },
//   {
//     uuid: '76915a37-2188c-46a8-a432-dc111ef6ad6e',
//     transaction_code: 'O150123-011',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '12',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 12',
//   },
//   {
//     uuid: '76915a37-188c-4633a8-a432-dc111ef63ad6e',
//     transaction_code: 'O150123-012',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '13',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 13',
//   },
//   {
//     uuid: '76915a37-188c-4633a8-a432-dc111ef6ad6e',
//     transaction_code: 'O150123-013',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '14',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 14',
//   },
//   {
//     uuid: '76915a37-188c-12146a8-a432-dc111ef6ad6e',
//     transaction_code: 'O150123-014',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '15',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 15',
//   },
//   {
//     uuid: '76915a42137-188c-46a8-a432-dc111ef6ad6e',
//     transaction_code: 'O150123-015',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '16',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_ORDER',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 16',
//   },
//   {
//     uuid: '76915a37-188c-4641a8-a432-dc111ef6ad6e',
//     transaction_code: 'O150123-016',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '17',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_PAYMENT',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 17',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a432-dc125111ef6ad6e',
//     transaction_code: 'O150123-017',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '18',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_PAYMENT',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 18',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a432-dc152111ef6ad6e',
//     transaction_code: 'O150123-018',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '19',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_PAYMENT',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 19',
//   },
//   {
//     uuid: '76915a37-188c-46a8-a432-dc55111ef6ad6e',
//     transaction_code: 'O150123-019',
//     table_uuid: '959b7485-08e1-46c2-b1be-296aa64efb05',
//     table_number: '20',
//     total_pax: 5,
//     total_order: 3,
//     status: 'WAITING_PAYMENT',
//     is_open: true,
//     is_order: false,
//     is_paid: false,
//     created_at: {
//       seconds: 1673889919,
//       nanos: 92881211,
//     },
//     name: 'Andi 20',
//   },
// ]

// const PagesTransaction = () => {
//   const componentRef = useRef<any>()
//   const { width } = useViewportListener()
//   const { showSidebar } = useAppSelector((state) => state.auth)

//   return (
//     <main className="flex h-full gap-4 overflow-hidden">
//       <ContentTransaction componentRef={componentRef} data={data} />
//       {width > 1200 && <TemplatesRightBar qrRef={componentRef} />}
//       {width <= 1200 && !showSidebar && (
//         <TemplatesRightBar qrRef={componentRef} />
//       )}
//     </main>
//   )
// }

// export default PagesTransaction
import React from 'react'

const index = () => <div>insdex</div>

export default index
