export type CancellationReportBased = {
	uuid: string;
	transaction_uuid: string;
	transaction_code: string;
	transaction_start: string;
	transaction_close: string;
	cashier: string;
	waiter: string;
	outlet_uuid: string;
	outlet_name: string;
	order_uuid: string;
	order_time: number;
	product_uuid: string;
	price_base: number;
	price_discount: number;
	price_after_discount: number;
	price_base_final: number;
	price_addon: number;
	price_final: number;
	qty: number;
	price_subtotal: number;
	addon_information: any;
	order_note: string;
	status: string;
	cancel_reason: string;
	cancel_reason_other: string;
};

export type CancellationReport = CancellationReportBased;
export type CancellationReports = Array<CancellationReportBased>;

export type CancellationSummary = {
	out_of_stock: number;
	customer_cancellation: number;
	long_waiting: number;
	wrong_order: number;
	others: number;
};
