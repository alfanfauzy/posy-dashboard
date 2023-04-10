export type GetPaymentMethodsDataResponse = {
	uuid: string;
	payment_method_category_uuid: string;
	code: string;
	name: string;
	logo_url: string;
	priority: number;
	is_show: boolean;
};
