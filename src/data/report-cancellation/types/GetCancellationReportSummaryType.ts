export type GetCancellationReportSummaryDataResponse = {
	out_of_stock: number;
	customer_cancellation: number;
	long_waiting: number;
	wrong_order: number;
	others: number;
};
