type CheckAvailableFieldProps = {
	searchReport: Array<{
		field: string;
		value: string;
	}>;
	fieldChecking: string;
};

type DeleteFieldParamsProps = {
	searchReport: Array<{
		field: string;
		value: string;
	}>;
	fieldChecking: string;
};

type UpdateValueParamProps = {
	searchReport: Array<{
		field: string;
		value: string;
	}>;
	fieldChecking: string;
	value: string;
};

export const checkAvailableField = ({
	searchReport,
	fieldChecking,
}: CheckAvailableFieldProps) => {
	let fieldIndex = -1;
	searchReport.forEach((dataObject, index) => {
		if (dataObject.field === fieldChecking) {
			fieldIndex = index;
		}
	});

	return fieldIndex;
};

export const deleteFieldParams = ({
	searchReport,
	fieldChecking,
}: DeleteFieldParamsProps) => {
	const removeArray = searchReport.filter(
		dataObject => dataObject.field !== fieldChecking,
	);

	return removeArray;
};

export const updateValueParam = ({
	searchReport,
	fieldChecking,
	value,
}: UpdateValueParamProps) => {
	const updatedsearchReport = searchReport.map(param => {
		if (param.field === fieldChecking) {
			// Update the value of the 'created_at' field here
			return {...param, value: value};
		}
		return param;
	});

	return updatedsearchReport;
};
