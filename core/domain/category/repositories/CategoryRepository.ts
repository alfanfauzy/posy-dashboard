import { Categories, Category } from '@/domain/category/model'
import { InputVariables } from '@/domain/vo/BaseInput'
import { ResultQuery } from '@/domain/vo/BaseResponse'

/**
 * GET
 */

export type GetCategoriesInput = InputVariables<
  keyof Category,
  keyof Pick<Category, 'uuid'>
>

export type GetCategoriesResult = ResultQuery<Categories | undefined>
