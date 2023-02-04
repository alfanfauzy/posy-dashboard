import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login } from 'services/login'

const useMutateCreateTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation(() => login(), {
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

export { useMutateCreateTransaction }
