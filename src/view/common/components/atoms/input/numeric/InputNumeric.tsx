import {Input} from 'posy-fnb-core';
import {type InputProps} from 'posy-fnb-core/dist/core/Input';
import {forwardRef} from 'react';
import {
	NumberFormatBase,
	NumericFormatProps,
	removeNumericFormat,
	useNumericFormat,
} from 'react-number-format';

type InputNumericProps = {
	valueIsFormatted?: boolean;
} & Omit<InputProps, 'value' | 'defaultValue' | 'type' | 'size'> &
	NumericFormatProps;

const defaultFormat: Partial<NumericFormatProps> = {
	thousandsGroupStyle: 'thousand',
	thousandSeparator: '.',
	decimalSeparator: ',',
	fixedDecimalScale: true,
	allowNegative: false,
};

const InputNumeric = forwardRef<HTMLInputElement, InputNumericProps>(
	({valueIsFormatted = true, onChange, prefix = '', ...inputProps}, ref) => {
		const numericFormatProps = useNumericFormat({
			prefix,
			...defaultFormat,
			...inputProps,
		});
		const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!valueIsFormatted) {
				/**
				 * Current workaround: mutate event target value
				 */
				const removedNumericValue = removeNumericFormat(
					e.target.value,
					{
						from: {start: 0, end: 0},
						to: {start: 0, end: e.target.value.length},
						lastValue: '',
					},
					{
						prefix,
						...defaultFormat,
					},
				);
				e.target.value = removedNumericValue;
			}
			onChange?.(e);
		};

		return (
			<NumberFormatBase<InputNumericProps>
				getInputRef={ref}
				customInput={Input as any}
				className="!pl-9"
				startAdornment={<p>Rp</p>}
				onChange={onValueChange}
				{...numericFormatProps}
				isAllowed={value => {
					if (value.formattedValue.includes(',')) return false;
					return true;
				}}
				format={numStr =>
					numStr === '' && prefix !== undefined
						? `${prefix}${numStr}`
						: numericFormatProps.format(numStr)
				}
			/>
		);
	},
);

InputNumeric.displayName = 'InputNumeric';
export default InputNumeric;
