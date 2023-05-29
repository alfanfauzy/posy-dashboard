export const listCancelReason = [
	{
		label: 'Out of stock',
		value: 'OUT_OF_STOCK',
	},
	{
		label: 'Customer cancellation',
		value: 'CUSTOMER_CANCELLATION',
	},
	{
		label: 'Long waiting time',
		value: 'LONG_WAITING',
	},
	{
		label: 'Wrong order',
		value: 'WRONG_ORDER',
	},
	{
		label: 'Others',
		value: 'OTHERS',
	},
];

export const orderType = [
	{
		label: 'Dine in',
		value: 0,
	},
	{
		label: 'Take away',
		value: 1,
	},
];

export const orderTransactionType = {
	DINE_IN: {
		label: 'Dine in',
		value: 0,
	},
	TAKE_AWAY: {
		label: 'Take away',
		value: 1,
	},
};

export const listOrderTabs = [
	{label: 'Order', value: 0},
	{label: 'Payment', value: 1},
];
