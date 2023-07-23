type OptionObject = {
	label: string;
	value: number | string;
};

export const FilterOption = (option: OptionObject, inputValue: string) => {
	return option.label.toLowerCase().includes(inputValue.toLowerCase());
};
