import type { ColumnsType } from 'antd/es/table'
import { Toggle } from 'posy-fnb-core'
import React, { useState } from 'react'

import InputSearch from '@/atoms/input/search'
import Table from '@/atoms/table'
import { listMenus } from '@/templates/rightbar/helpertemp'
import type { Product } from '@/types/product'

const columns: ColumnsType<Product> = [
  {
    title: 'Product name',
    dataIndex: 'product_name',
    key: 'product_name',
    fixed: 'left',
    width: '320px',
    render: (text) => <p className="line-clamp-1">{text}</p>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: '125px',
    render: () => (
      // <p className="whitespace-nowrap text-m-semibold">{text}</p>
      <p className="whitespace-nowrap">Beverages</p>
    ),
  },
  {
    title: (
      <p className="flex justify-center whitespace-nowrap">Selling price</p>
    ),
    dataIndex: 'price',
    key: 'price',
    width: '118px',
    render: (text) => (
      <p className="whitespace-nowrap text-m-regular">{text}</p>
    ),
  },

  {
    align: 'center',
    title: <p className="whitespace-nowrap">Show product</p>,
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
    align: 'center',
    title: <p className="whitespace-nowrap">Product available</p>,
    dataIndex: 'stock_available',
    key: 'stock_available',
    width: '135px',
    render: () => (
      <div className="flex items-center justify-center">
        <Toggle value onChange={() => undefined} />
      </div>
    ),
  },

  // {
  //   align: 'center',
  //   title: (
  //     <p
  //       role="presentation"
  //       onClick={() => console.log('tes')}
  //       className="cursor-pointer whitespace-nowrap hover:opacity-70"
  //     >
  //       +
  //     </p>
  //   ),
  //   key: 'edit',
  //   width: '60px',
  //   fixed: 'right',
  //   render: () => (
  //     <div className="flex items-center justify-center">
  //       {/* <BiEdit
  //         size={18}
  //         className="cursor-pointer text-neutral-70 hover:opacity-70"
  //       /> */}
  //     </div>
  //   ),
  // },
]

const PagesTransaction = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

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
          <div className="mt-1 flex items-center space-x-4">
            <div className="w-1/2 whitespace-nowrap rounded-md border border-neutral-50 py-1.5 px-3 text-m-regular lg:w-1/4">
              8 feb - 14 feb 2023
            </div>
            <div className="flex w-1/2 items-center lg:w-1/4">
              <InputSearch placeholder="Search Product" isOpen />
            </div>
          </div>
        </aside>
      </article>

      <article className="mt-6">
        <Table
          columns={columns}
          dataSource={listMenus}
          rowKey="product_uuid"
          rowSelection={rowSelection}
          scroll={{ y: '54vh', x: 1100 }}
        />
        {/* <div className="w-full overflow-auto">
          <Table
            // loading
            rowKey="product_uuid"
            rowSelection={rowSelection}
            columns={columns}
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
        </div> */}
      </article>
    </main>
  )
}

export default PagesTransaction
