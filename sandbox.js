/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
const toRupiah = number =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'IDR',
		maximumFractionDigits: 0,
	}).format(Number(number));

const amount = 23000;
const splittedAmount = toRupiah(amount).slice(4).split(',');

if (amount % 100000 === 0 || splittedAmount.length > 3) {
	console.log(amount, '<<<<');
} else {
	const idxAmount = splittedAmount[splittedAmount.length - 2];

	const divideAmount = idxAmount / 100;

	const splittedDividedAmount = divideAmount.toFixed(2).toString().split('.');

	const selected = splittedDividedAmount[1];

	const hundred = 100000;
	let million = 0;

	if (splittedAmount.length >= 3) {
		million = splittedAmount[0] * 1000000;
	}

	const generatedAmount = selected => {
		const list = [100000, 50000, 20000, 10000];
		const arr = [];

		arr.push(amount);
		for (let i = 0; i < selected; i++) {
			arr.push(
				million + splittedDividedAmount[0] * hundred + list[selected - 1],
			);
		}

		console.log(arr);
	};

	if (selected < 10) {
		generatedAmount(4);
	} else if (selected < 20) {
		generatedAmount(3);
	} else if (selected < 50) {
		generatedAmount(2);
	} else {
		generatedAmount(1);
	}
}
