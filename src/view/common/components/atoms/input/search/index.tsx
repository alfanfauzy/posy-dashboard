import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import {FiSearch} from 'react-icons/fi';
import {MdCancel} from 'react-icons/md';

type AtomsInputSearchProps = {
	isOpen: boolean;
	search: string;
	open?: () => void;
	onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClearSearch?: () => void;
	placeholder?: string;
	isTransaction?: boolean;
};
const AtomsInputSearch = ({
	isOpen,
	open,
	onSearch,
	onClearSearch,
	placeholder,
	search,
	isTransaction,
}: AtomsInputSearchProps) => (
	<div
		className={`transition-all duration-100 ease-in-out ${
			isOpen && isTransaction ? 'ml-10 w-full' : 'w-full'
		}`}
	>
		<span className="relative flex h-full items-center justify-start">
			<div className="absolute left-3">
				<FiSearch size={16} className="stroke-neutral-90" />
			</div>
			<DebounceInput
				onFocus={open}
				onBlur={
					onClearSearch && search?.length === 0
						? () => setTimeout(() => onClearSearch(), 100)
						: () => undefined
				}
				minLength={2}
				debounceTimeout={300}
				onChange={onSearch ? e => onSearch(e) : () => undefined}
				value={search}
				type="text"
				placeholder={placeholder || ''}
				className={`h-8 rounded-full border border-neutral-40 pl-10 text-m-medium placeholder:text-neutral-80 focus:outline-neutral-50 ${
					isOpen ? 'w-full' : 'w-10'
				} `}
			/>
			{search?.length > 0 && (
				<div className="absolute right-4">
					<MdCancel
						size={20}
						className="cursor-pointer fill-neutral-60"
						onClick={onClearSearch}
					/>
				</div>
			)}
		</span>
	</div>
);

export default AtomsInputSearch;
