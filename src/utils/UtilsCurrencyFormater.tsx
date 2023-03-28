export const formatCurrency = (
	amount: number,
	options: {
		digit: number;
		currency: string;
		currencyFormat: string;
	} = {
		digit: 0,
		currency: 'IDR',
		currencyFormat: 'id-ID',
	},
) =>
	new Intl.NumberFormat(options.currencyFormat, {
		style: 'currency',
		currency: options.currency,
		maximumFractionDigits: options.digit,
	}).format(amount);

export const formatCurrencyTextInput = (value: string) =>
	value
		.replace(/^[0]/, '')
		.replace(/\D/g, '')
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
