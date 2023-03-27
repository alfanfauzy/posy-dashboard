export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

interface TaxBased {
  is_tax: boolean
  is_service_charge: boolean
  is_service_charge_taxable: boolean
  tax_percentage: number
  service_charge_percentage: number
  // tax_type: ''
  updated_at: number | null
  updated_by: string
}

export type Tax = TaxBased
