import { Products } from '@/domain/product/model'

import { GetProductsDataResponse } from '../types'

// map server data to own model
export const mapToProductsModel = (
  datas: GetProductsDataResponse[],
): Products =>
  datas.map((data) => ({
    uuid: data.product.uuid,
    restaurant_uuid: data.product.restaurant_uuid,
    product_name: data.product.product_name,
    product_description: data.product.product_description,
    product_image: data.product.product_image,
    product_image_url: data.product.product_image_url,
    categories: data.product.categories,
    is_show: data.is_show,
    is_available: data.is_available,
    is_discount: data.is_discount,
    is_favourite: data.is_favourite,
    price: data.price,
    price_discount: data.price_discount,
    price_after_discount: data.price_after_discount,
    price_discount_percentage: data.price_discount_percentage,
    price_final: data.price_final,
    cooking_duration: data.cooking_duration,
    metadata: {
      created_at: data.metadata.created_at.seconds,
      updated_at: data.metadata.updated_at.seconds,
    },
  }))
