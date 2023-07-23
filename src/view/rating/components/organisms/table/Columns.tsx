import {Rating} from '@/domain/rating/model';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {Rate} from 'antd';
import {ColumnsType} from 'antd/es/table';

const RatingColumns = (
	openEditRating: () => void,
	setSelectedRow: (data: Rating) => void,
): ColumnsType<Rating> => {
	const onOpenEditRating = async (uuid: string) => {
		openEditRating();
		await onChangeQueryParams('id', uuid);
	};

	return [
		{
			title: 'Guest',
			key: 'guest',
			fixed: 'left',
			width: '350px',
			render: (_, {customer_info}) => (
				<p className="line-clamp-1">{customer_info.name || '-'}</p>
			),
		},
		{
			title: 'Transaction date',
			key: 'date',
			width: '200px',
			render: (_, record) => (
				<p className="whitespace-nowrap text-m-regular">
					{dateFormatter(
						record?.metadata?.created_at || 0,
						'dd MMM yyyy - HH:mm',
					)}
				</p>
			),
		},
		{
			title: 'Overall Rating',
			key: 'average',
			align: 'center',
			width: '200px',
			render: (_, record) => (
				<div>
					<Rate disabled value={record.avg_rating} />
				</div>
			),
		},
		// {
		// 	align: 'center',
		// 	title: <p className="whitespace-nowrap">Show product</p>,
		// 	dataIndex: 'is_show',
		// 	key: 'is_show',
		// 	width: '200px',
		// 	render: (val, record) => (
		// 		<div className="flex items-center justify-center">
		// 			<Toggle
		// 				disabled={!ability.can('change_show_product', 'product_outlet')}
		// 				value={val}
		// 				onChange={() =>
		// 					updateOutletRatingStatus({
		// 						flag: !val,
		// 						restaurant_outlet_uuid: outletId,
		// 						status: 'is_show',
		// 						product_uuids: [record.uuid],
		// 					})
		// 				}
		// 			/>
		// 		</div>
		// 	),
		// },
		{
			align: 'center',
			title: (
				<p className="cursor-pointer whitespace-nowrap hover:opacity-70">
					Action
				</p>
			),
			key: 'edit',
			width: '100px',
			fixed: 'right',
			render: (val, record) => (
				<div className="flex items-center justify-center">
					<p
						onClick={() => {
							onOpenEditRating(record.uuid);
							setSelectedRow(record);
						}}
						className="cursor-pointer text-secondary-main hover:opacity-70"
					>
						Details
					</p>
				</div>
			),
		},
	];
};

export default RatingColumns;
