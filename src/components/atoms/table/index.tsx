/* eslint-disable react/no-unstable-nested-components */
import { Table } from 'antd'
import type { TableProps } from 'antd/es/table'
import React, { useState } from 'react'

interface AtomsTableProps extends TableProps<any> {
  className?: string
}

interface PaginationProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Pagination = ({ onChange }: PaginationProps) => (
  <div className="absolute left-0 flex w-fit items-center">
    <select
      onChange={onChange}
      className="h-8 w-[164px] rounded-full border border-neutral-40 px-3 text-m-medium placeholder:text-neutral-80 hover:border-neutral-100 focus:outline-none"
    >
      <option value="10">Select Row: 10</option>
      <option value="20">Select Row: 20</option>
      <option value="50">Select Row: 50</option>
    </select>
  </div>
)

const AtomsTable = ({
  columns,
  dataSource,
  className,
  loading,
  ...tableProps
}: AtomsTableProps) => {
  const [limit, setLimit] = useState(10)

  const onChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(+e.target.value)
  }

  return (
    <div className="w-full overflow-auto">
      <Table
        loading={loading}
        className={className}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          defaultPageSize: limit,
          pageSize: limit,
          total: dataSource?.length,
          showTotal: () => <Pagination onChange={onChangeLimit} />,
        }}
        {...tableProps}
      />
    </div>
  )
}

export default AtomsTable
