import {
  useForm as useHookForm,
  UseFormProps as UseHookFormProps,
} from 'react-hook-form'
import { ZodSchema, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface UseFormProps<T extends ZodSchema<any>>
  extends UseHookFormProps<z.infer<T>> {
  schema: T
}

export const useForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseFormProps<T>) => {
  const form = useHookForm({
    ...formConfig,
    resolver: zodResolver(schema),
  })

  return { form, ...form }
}
