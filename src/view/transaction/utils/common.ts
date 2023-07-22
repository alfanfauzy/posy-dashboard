import {OrderStatus} from '@/domain/order/model';

export const generateWidth = (
	width: number,
	selectedTrxId: string,
	collapsed: boolean,
) => {
	if (width <= 1280 && selectedTrxId && !collapsed) {
		return ' w-full duration-300';
	}
	if (width <= 1280 && selectedTrxId) {
		return ' w-fit duration-300';
	}
	return ' w-fit';
};

export const generateBorderColor = (
	status: string,
	trxId: string,
	selectedTrxId: string,
	firstOrderAt: number,
	isWaitingFood: boolean,
) => {
	const now = Date.now();
	const diffTime = Math.abs(now - firstOrderAt * 1000);
	const diffMinutes = Math.floor(diffTime / 60000);

	if (isWaitingFood && diffMinutes > 10) {
		return 'border-2 border-error';
	}

	if (trxId === selectedTrxId) {
		return 'border-2 border-primary-main';
	}

	const borderColor: Record<string, string> = {
		WAITING_FOOD: 'border-2 border-blue-success',
		WAITING_PAYMENT: 'border-2 border-green-success',
	};
	return borderColor[status];
};

export const generateBgColorOrderStatus = (status: OrderStatus) => {
	switch (status) {
		case '0':
			return 'bg-neutral-10';
		case '1':
			return 'bg-neutral-10';
		case '2':
			return 'bg-[#FFFCF0]';
		case '3':
			return 'bg-[#EEFFEF]';
		case '4':
			return 'bg-red-caution/10';
		default:
			return 'bg-blue-success';
	}
};

export const generateBorderColorOrderStatus = (
	status: OrderStatus,
	isChecked: boolean,
) => {
	if (isChecked) {
		switch (status) {
			case '0':
				return 'bg-neutral-10 border-2 border-secondary-main';
			case '1':
				return 'bg-neutral-10 border-2 border-secondary-main';
			case '2':
				return 'border-2 border-[#C69A00]';
			case '3':
				return 'border-2 border-green-success';
			case '4':
				return 'bg-red-caution/10 border-2 border-red-caution';
			default:
				return 'bg-blue-success border-2 border-secondary-main';
		}
	}

	return 'border border-neutral-40';
};
