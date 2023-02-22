import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createTransaction } from '@/services/transaction'

const useFetchListTransaction = () =>
  useQuery(['transaction/get-transaction'], () => createTransaction(), {
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  })

const useMutateCreateTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation(() => createTransaction(), {
    //   onMutate: () => {
    //     console.log('mutate accept bnib transaction')
    //   },
    onSettled: async (data) => {
      if (data?.message) {
        queryClient.invalidateQueries({
          queryKey: ['/transactions/get-transaction'],
        })
      }
    },
  })
}

export { useFetchListTransaction, useMutateCreateTransaction }
