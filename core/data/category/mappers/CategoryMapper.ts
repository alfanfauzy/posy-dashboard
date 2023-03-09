import { Categories } from '@/domain/category/model'

import { GetCategoriesDataResponse } from '../types'

// map server data to own model
export const mapToCategoriesModel = (
  datas: GetCategoriesDataResponse[],
): Categories =>
  datas.map((data) => ({
    uuid: data.uuid,
    category_name: data.category_name,
  }))
