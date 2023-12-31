import type {OrderItem} from '@/view/common/store/slices/order';

export const toRupiah = (number: number | bigint | string) =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'IDR',
		maximumFractionDigits: 0,
	})
		.format(Number(number))
		.replaceAll(',', '.')
		.replaceAll('IDR', 'Rp');

export const calculateAddOn = (arr: Array<any>) =>
	[...arr]
		.map(el => el.variant_price)
		.reduce((prev, current) => prev + current, 0);

export const calculateTotal = (arr: Array<OrderItem>) =>
	[...arr]
		.map(
			el =>
				(calculateAddOn(el.addOnVariant) + el.product.price_final) *
				el.quantity,
		)
		.reduce((prev, current) => prev + current, 0);

export const calculateQuantity = (arr: Array<{quantity: number}>) =>
	[...arr].map(el => el.quantity).reduce((prev, current) => prev + current, 0);

export const calculateOrder = (el: OrderItem) =>
	(calculateAddOn(el.addOnVariant) + el.product.price_final) * el.quantity;

export const calculateOrderBeforeDiscount = (el: OrderItem) =>
	(calculateAddOn(el.addOnVariant) + el.product.price) * el.quantity;
