import {
	PaymentMethodCategories,
	PaymentMethods,
} from '@/domain/payment-method/model';

import {GetPaymentMethodCategoriesDataResponse} from '../types/GetPaymentMethodCategoriesType';
import {GetPaymentMethodsDataResponse} from '../types/GetPaymentMethodsType';

export const mapToPaymentMethodCategoriesModel = (
	datas: Array<GetPaymentMethodCategoriesDataResponse>,
): PaymentMethodCategories =>
	datas.map(data => ({
		uuid: data.uuid,
		name: data.name,
		priority: data.priority,
		description: data.description,
		logo_url: data.logo_url,
		is_show: data.is_show,
		is_integration: data.is_integration,
	}));

export const mapToPaymentMethodsModel = (
	datas: Array<GetPaymentMethodsDataResponse>,
): PaymentMethods =>
	datas.map(data => ({
		code: data.code,
		name: data.name,
		logo_url: data.logo_url,
		is_show: data.is_show,
		priority: data.priority,
		payment_method_category_uuid: data.payment_method_category_uuid,
		uuid: data.uuid,
	}));
