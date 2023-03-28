import { Tables } from '@/domain/table/model'

import { GetTablesDataResponse } from '../types'

// map server data to own model
export const mapToTablesModel = (datas: GetTablesDataResponse[]): Tables =>
  datas.map((data) => ({
    uuid: data.uuid,
    restaurant_outlet_uuid: data.restaurant_outlet_uuid,
    table_number: data.table_number,
    priority: data.priority,
    created_at: data.created_at.seconds,
    updated_at: data.updated_at.seconds,
  }))
