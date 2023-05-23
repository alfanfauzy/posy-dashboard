export const generateTransactionCode = (code: string) => {
	const codeArr = code?.slice(code.length - 12);
	return codeArr;
};
