import {Addons} from '@/domain/addon/model';

type PaymentMethodBased = {
	uuid: string;
	payment_method_category_uuid: string;
	code: string;
	name: string;
	logo_url: string;
	priority: number;
	is_show: boolean;
};

export type PaymentMethod = {
	addons?: Addons;
} & PaymentMethodBased;

export type PaymentMethods = Array<PaymentMethodBased>;

type PaymentMethodCategoryBased = {
	uuid: string;
	name: string;
	description: string;
	logo_url: string;
	priority: number;
	is_show: boolean;
};

export type PaymentMethodCategory = {
	addons?: Addons;
} & PaymentMethodCategoryBased;

export type PaymentMethodCategories = Array<PaymentMethodCategoryBased>;
