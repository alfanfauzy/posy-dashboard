import { Metadata } from '@/data/common/types/metadata'

interface OrderDetail {
  uuid: string
  product_uuid: string
  product_name: string
  product_image: string
  product_image_url: string
  price_base: number
  price_discount: number
  price_after_discount: number
  price_base_final: number
  price_addon: number
  price_final: number
  qty: number
  price_subtotal: number
  addon_information: []
  order_note: string
  status: string
  cancel_reason: string
}

interface GetOrdersDataResponseBased {
  uuid: string
  order_qty: number
  price_base: number
  price_discount: number
  price_after_discount: number
  price_final: number
  status: string
  total_product: number
  is_printed: false
  total_print_kitchen: number
  total_served: number
  total_cancel: number
  total_done: number
  first_print_at: {
    seconds: number
  }
  metadata: Metadata
  order_detail: OrderDetail[]
}

export type GetOrdersDataResponse = GetOrdersDataResponseBased

export interface CreateOrderManualDataResponse {
  uuid: string
  metadata: Metadata
}
