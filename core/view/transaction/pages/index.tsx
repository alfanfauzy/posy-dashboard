import React from 'react'

import { useGetTransactionsViewModel } from '../view-models/GetTransactionsViewModel'

const ViewTransactionPage = () => {
  const { data, pagination } = useGetTransactionsViewModel({
    limit: 10,
    page: 2,
    // search: [],
    // sort: {},
  })

  console.log(data, '<<')
  console.log(pagination, '<<')

  return <div>{JSON.stringify(data)}</div>
}

export default ViewTransactionPage
