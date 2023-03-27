import { Tax } from '@/domain/tax/model'
import { UpdateTaxInput } from '@/domain/tax/repositories/TaxRepository'
import { Metadata } from '@/domain/vo/BaseMetadata'
import { ValidationSchemaUpdateTaxType } from '@/view/tax-and-service/schemas/UpdateTaxSchema'

import { GetTaxDataResponse, UpdateTaxDataResponse } from '../types'

export const mapToTaxModel = (data: GetTaxDataResponse): Tax => ({
  is_service_charge: data.tax_setting.is_service_charge,
  is_service_charge_taxable: data.tax_setting.is_service_charge_taxable,
  is_tax: data.tax_setting.is_tax,
  service_charge_percentage: data.tax_setting.service_charge_percentage,
  tax_percentage: data.tax_setting.tax_percentage,
  tax_type: data.tax_setting.tax_type,
  updated_at: data.tax_setting.updated_at,
  updated_by: data.tax_setting.updated_by,
})

export const mapToUpdateTaxModel = (
  data: UpdateTaxDataResponse,
): {
  success: boolean
  metadata: Metadata
} => ({
  success: data.success,
  metadata: {
    updated_at: data.metadata.updated_at.seconds,
  },
})

export const mapToUpdateTaxPayload = (
  payload: ValidationSchemaUpdateTaxType,
): UpdateTaxInput => ({
  restaurant_outlet_uuid: payload.restaurant_outlet_uuid,
  is_service_charge: payload.is_service_charge,
  is_service_charge_taxable: payload.is_service_charge_taxable,
  is_tax: payload.is_tax,
  service_charge_percentage: Number(payload.service_charge_percentage),
  tax_percentage: Number(payload.tax_percentage),
  tax_type: payload.tax_type,
})
