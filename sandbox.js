const toRupiah = number =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'IDR',
		maximumFractionDigits: 0,
	}).format(Number(number));

export const generateSuggestionAmount = amount => {
	const splittedAmount = toRupiah(amount).slice(4).split(',');

	if (amount % 100000 === 0 || splittedAmount.length > 3) {
		return amount;
	} else {
		const idxAmount = splittedAmount[splittedAmount.length - 2];

		const divideAmount = idxAmount / 100;

		const [splittedDividedAmount, selected] = divideAmount
			.toFixed(2)
			.toString()
			.split('.');

		const hundred = 100000;
		let million = 0;

		if (splittedAmount.length >= 3) {
			million = splittedAmount[0] * 1000000;
		}

		const printSuggestion = length => {
			const list = [50000, 100000];
			const arr = [];

			arr.push(amount);
			for (let i = 0; i < length; i++) {
				const amt =
					million +
					splittedDividedAmount[0] * hundred +
					list[list.length - length + i];
				arr.push(amt);
			}

			return arr;
		};

		if (selected < 50) {
			printSuggestion(2);
		} else {
			printSuggestion(1);
		}
	}
};
