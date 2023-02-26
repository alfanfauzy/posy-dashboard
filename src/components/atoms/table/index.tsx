/* eslint-disable react/no-unstable-nested-components */
import { Table } from 'antd'
import type { TableProps } from 'antd/es/table'
import React, { useState } from 'react'

import Select from '@/atoms/input/select'

interface AtomsTableProps extends TableProps<any> {
  className?: string
}

interface PaginationProps {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const paginationOptions = [
  { label: 'Select Row: 10', value: '10' },
  { label: 'Select Row: 20', value: '20' },
  { label: 'Select Row: 50', value: '50' },
]

const Pagination = ({ onChange }: PaginationProps) => (
  <div className="absolute left-0 flex w-fit items-center">
    <Select
      className="!w-[164px]"
      options={paginationOptions}
      onChange={onChange}
    />
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
