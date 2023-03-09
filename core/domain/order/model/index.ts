import { Metadata } from '@/domain/vo/BaseMetadata'

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
  status: string // currently string but will be convert to enum later
  cancel_reason: string
}

interface OrderBased {
  uuid: string
  order_qty: number
  price_discount: number
  price_after_discount: number
  price_final: number
  status: string // currently string but will be convert to enum later
  total_product: number
  is_printed: boolean
  total_print_kitchen: number
  total_served: number
  total_cancel: number
  total_done: number
  first_print_at: number
  metadata: Metadata
  order_detail: OrderDetail[]
}

export type Order = OrderBased

export type Orders = OrderBased[]
