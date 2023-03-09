export interface AddonVariant {
  variant_uuid: string
  variant_name: string
  variant_priority: number
  variant_price?: number
}

interface AddonBased {
  uuid: string
  addon_name: string
  is_optional: boolean
  can_choose_multiple: boolean
  min_variant: number
  max_variant: number
  variants: AddonVariant[]
}

export type Addon = AddonBased
export type Addons = AddonBased[]
