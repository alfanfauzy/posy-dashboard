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
