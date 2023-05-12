import {useState} from 'react';

type Option = {
	value: string;
	label: string;
};

type SelectProps = {
	options: Array<Option>;
	onChange: (value: string) => void;
};

const AtomSelect: React.FC<SelectProps> = ({options, onChange}) => {
	const [selectedValue, setSelectedValue] = useState('');

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const {value} = event.target;
		setSelectedValue(value);
		onChange(value);
	};

	return (
		<select
			value={selectedValue}
			onChange={handleSelectChange}
			className="block h-8 w-auto pl-3 pr-5 py-1 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
		>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default AtomSelect;
