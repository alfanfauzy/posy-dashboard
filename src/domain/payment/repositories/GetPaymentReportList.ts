export type GetPaymentReportFilter = {
	restaurant_uuid: string;
	limit?: number;
	types?: string;
	channel_categories?: string;
	statuses?: string;
	start_date: string;
	end_date: string;
	before_id?: string;
	after_id?: string;
};
