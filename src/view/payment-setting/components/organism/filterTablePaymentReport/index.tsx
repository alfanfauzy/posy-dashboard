import {PaymentReportList} from '@/domain/payment/models/payment-report';
import Datepicker from '@/view/common/components/atoms/input/datepicker';
import AtomSelect from '@/view/common/components/atoms/select';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import {useAppSelector} from '@/view/common/store/hooks';
import {Dates} from '@/view/common/types/date';
import {
	checkAvailableField,
	deleteFieldParams,
	updateValueParam,
} from '@/view/common/utils/UtilsFilterSearch';
import {useGetOutletSelectionViewModel} from '@/view/outlet/view-models/GetOutletSelectionViewModel';
import {Input} from 'antd';
import {useMemo} from 'react';
import {AiOutlineSearch} from 'react-icons/ai';

type FilterTablePaymentReportProps = {
	rangeDate: Array<Dates>;
	setRangeDate: React.Dispatch<React.SetStateAction<Array<Dates>>>;
	setAfterId: React.Dispatch<React.SetStateAction<string | null>>;
	searchReport: Array<{
		field: string;
		value: string;
	}>;
	setSearchReport: React.Dispatch<
		React.SetStateAction<
			Array<{
				field: string;
				value: string;
			}>
		>
	>;
	setDataReport: React.Dispatch<React.SetStateAction<Array<PaymentReportList>>>;
};

const CategoryOptions = [
	{
		label: 'Category: Payment',
		value: 'TRANSACTION',
	},
	{
		label: 'Category: Withdraw',
		value: 'WITHDRAWAL',
	},
];

const StatusOptions = [
	{
		label: 'Status: Success',
		value: 'SETTLED',
	},
	{
		label: 'Status: Pending',
		value: 'PENDING',
	},
];

const PaymentMethodOptions = [
	{
		label: 'Payment Method: Ovo',
		value: 'OVO',
	},
	{
		label: 'Payment Method: Dana',
		value: 'DANA',
	},
	{
		label: 'Payment Method: Link Aja',
		value: 'LINKAJA',
	},
];

const FilterTablePaymentReport = ({
	rangeDate,
	setRangeDate,
	setAfterId,
	searchReport,
	setSearchReport,
	setDataReport,
}: FilterTablePaymentReportProps) => {
	const [isOpenFilterDate, {open: openFilterDate, close: closeFilterDate}] =
		useDisclosure({initialState: false});

	const {isSubscription, isLoggedIn} = useAppSelector(state => state.auth);

	const {data: dataOutletSelection} = useGetOutletSelectionViewModel({
		enabled: isLoggedIn && isSubscription,
	});

	const outletOptions = useMemo(() => {
		if (!dataOutletSelection) return [];

		const outlets = dataOutletSelection.map(outlet => ({
			label: `Outlet: ${outlet.outlet_name}`,
			value: outlet.outlet_name,
		}));

		return outlets;
	}, [dataOutletSelection]);

	const handleChangeSelect = (valueSearch: string, fieldChecking: string) => {
		// If value is null, remove the field
		if (valueSearch === null) {
			const removeSearch = deleteFieldParams({searchReport, fieldChecking});

			setSearchReport(removeSearch);
			return;
		}

		const fieldIndex = checkAvailableField({searchReport, fieldChecking});

		// If field available, update value from the same field
		if (fieldIndex !== -1) {
			if (valueSearch === '' || valueSearch === null) {
				const removeSearch = deleteFieldParams({searchReport, fieldChecking});

				setSearchReport(removeSearch);
				return;
			}

			const updateSearch = updateValueParam({
				searchReport,
				fieldChecking,
				value: valueSearch,
			});

			setSearchReport(updateSearch);
		} else {
			// If field doesn't available, create and add to state
			setSearchReport(prevState => [
				...prevState,
				{
					field: fieldChecking,
					value: valueSearch,
				},
			]);
		}
	};

	const handleChangeInput = (valueSearch: string, fieldChecking: string) => {
		// If value is null, remove the field
		if (valueSearch === null) {
			const removeSearch = deleteFieldParams({searchReport, fieldChecking});

			setSearchReport(removeSearch);
			return;
		}

		const fieldIndex = checkAvailableField({searchReport, fieldChecking});

		// If field available, update value from the same field
		if (fieldIndex !== -1) {
			if (valueSearch === '' || valueSearch === null) {
				const removeSearch = deleteFieldParams({searchReport, fieldChecking});

				setSearchReport(removeSearch);
				return;
			}

			const updateSearch = updateValueParam({
				searchReport,
				fieldChecking,
				value: valueSearch,
			});

			setSearchReport(updateSearch);
		} else {
			// If field doesn't available, create and add to state
			setSearchReport(prevState => [
				...prevState,
				{
					field: fieldChecking,
					value: valueSearch,
				},
			]);
		}
	};

	return (
		<div className="mb-2 flex gap-2 pb-3 overflow-x-auto">
			<div>
				<Datepicker
					dateProps={rangeDate}
					close={closeFilterDate}
					open={openFilterDate}
					isOpen={isOpenFilterDate}
					handleChange={(item: Dates) => {
						setRangeDate([item]);
						setAfterId(null);
						setDataReport([]);
					}}
				/>
			</div>
			<div>
				<AtomSelect
					options={outletOptions}
					onChange={e => handleChangeSelect(e, 'outlet')}
				/>
			</div>
			<div>
				<AtomSelect
					options={CategoryOptions}
					onChange={e => handleChangeSelect(e, 'category')}
				/>
			</div>

			<div>
				<AtomSelect
					options={PaymentMethodOptions}
					onChange={e => handleChangeSelect(e, 'payment_method')}
				/>
			</div>
			<div>
				<AtomSelect
					options={StatusOptions}
					onChange={e => handleChangeSelect(e, 'setlement_status')}
				/>
			</div>
			<div className="!w-[300px]">
				<Input
					placeholder="Transaction ID"
					className="w-[150px] rounded-full border border-gray-300"
					prefix={<AiOutlineSearch />}
					onChange={e => handleChangeInput(e.target.value, 'transaction_id')}
				/>
			</div>
		</div>
	);
};

export default FilterTablePaymentReport;
