/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { Product, Products } from '@/domain/product/model'

import {
  GetMenuProductDataResponse,
  GetMenuProductsDataResponse,
} from '../types'

// map server data to own model
export const mapToMenuProductsModel = (
  datas: GetMenuProductsDataResponse[],
): Products => {
  const newData: Products = []
  datas.forEach((el) => {
    el.products.forEach((product) => {
      newData[product.uuid as any] = product
    })
  })

  for (const key in newData) {
    const product = newData[key]
    newData.push(product)
  }

  return newData
}

export const mapToMenuProductModel = (
  data: GetMenuProductDataResponse,
): Product => ({
  uuid: data.detail.product.uuid,
  product_name: data.detail.product.product_name,
  product_image_url: data.detail.product.product_image_url,
  product_description: data.detail.product.product_description,
  price_final: data.detail.price_final,
  price_discount_percentage: data.detail.price_discount_percentage,
  price_after_discount: data.detail.price_after_discount,
  price_discount: data.detail.price_discount,
  price: data.detail.price,
  is_favourite: data.detail.is_favourite,
  is_discount: data.detail.is_discount,
  is_available: data.detail.is_available,
  cooking_duration: data.detail.cooking_duration,
  categories: data.detail.product.categories,
  addons: data.addons.map((el) => ({
    uuid: el.uuid,
    addon_name: el.addon_name,
    can_choose_multiple: el.can_choose_multiple,
    is_optional: el.is_optional,
    max_variant: el.max_variant,
    min_variant: el.min_variant,
    variants: el.variants.map((variant) => ({
      variant_uuid: variant.uuid,
      variant_name: variant.variant_name,
      variant_priority: variant.variant_priority,
      variant_price: variant?.variant_price || 0,
    })),
  })),
})
