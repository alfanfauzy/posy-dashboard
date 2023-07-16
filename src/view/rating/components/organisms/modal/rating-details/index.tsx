import {Rating} from '@/domain/rating/model';
import {onChangeQueryParams} from '@/view/common/utils/UtilsChangeQueryParams';
import {dateFormatter} from '@/view/common/utils/UtilsdateFormatter';
import {useGetDetailRatingsViewModel} from '@/view/rating/view-models/GetDetailRatingsViewModel';
import {Divider, Rate} from 'antd';
import {useRouter} from 'next/router';
import {Modal} from 'posy-fnb-core';
import React from 'react';

type RatingDetailsModalProps = {
	closeDetail: () => void;
	isOpenDetail: boolean;
	selectedRow: Rating | null;
	setSelectedRow: (data: null) => void;
};

const RatingDetailsModal = ({
	closeDetail,
	isOpenDetail,
	selectedRow,
	setSelectedRow,
}: RatingDetailsModalProps) => {
	const {query} = useRouter();

	const onCloseDetail = async () => {
		closeDetail();
		setSelectedRow(null);
		await onChangeQueryParams('id', '');
	};

	const {data, isLoading} = useGetDetailRatingsViewModel(
		{
			food_rating_uuid: query.id as string,
		},
		{
			enabled: !!query.id,
		},
	);

	return (
		<Modal
			isLoading={isLoading}
			closeOverlay
			className="!px-0 !py-2 !max-w-[650px] overflow-auto min-h-[300px]"
			showCloseButton
			open={isOpenDetail}
			handleClose={onCloseDetail}
			title="Ratings"
			// confirmButton={
			// 	<div className="flex w-full items-center justify-center gap-4">
			// 		<Button
			// 			isLoading={loadUpdateProduct}
			// 			disabled={!isValid}
			// 			variant="secondary"
			// 			type="submit"
			// 			fullWidth
			// 		>
			// 			Save
			// 		</Button>
			// 	</div>
			// }
		>
			<main className="my-6 px-6 flex flex-col h-96 items-center">
				<section className="w-full">
					<div className="flex justify-center">
						<p className="text-l-bold text-primary-main">Overall Ratings</p>
					</div>
					<aside className="mt-4 p-4 border rounded-lg shadow">
						<div>
							<p className="text-l-bold text-primary-main">
								Guest {selectedRow?.customer_info.name || '-'}
							</p>
							<p className="text-m-medium text-primary-main">
								Order on{' '}
								{selectedRow?.metadata.created_at &&
									dateFormatter(
										selectedRow?.metadata?.created_at,
										'dd MMM yyyy',
									)}
							</p>
						</div>
						<Divider className="my-4" />
						<div>
							<p className="text-l-bold text-primary-main">Ratings</p>
							<Rate value={selectedRow?.avg_rating} disabled />
						</div>
						<Divider className="my-4" />
						<div>
							<p className="text-l-bold text-primary-main">Notes</p>
							<p className="text-m-medium text-primary-main">
								{selectedRow?.review_note}
							</p>
						</div>
					</aside>
				</section>

				<section className="mt-4">
					<div className="flex justify-center">
						<p className="text-l-bold text-primary-main">
							How&apos;s the Order
						</p>
					</div>

					<aside className="mt-4">
						{data?.map(item => (
							<aside key={item.uuid} className="p-4 border rounded-lg shadow">
								<div>
									<p className="text-l-bold text-primary-main">
										{item.product_name || '-'}
									</p>
									<Rate value={item.rating} disabled />
								</div>
								<Divider className="my-4" />
								<div>
									<p className="text-l-bold text-primary-main">Notes</p>
									<div className="flex flex-wrap gap-2">
										{item.review.map((review, idx) => (
											<p
												key={review}
												className="text-m-medium text-primary-main lowercase"
											>
												{review.split('_').join(' ')}
												{idx !== item.review.length - 1 && ','}
											</p>
										))}
									</div>
								</div>
							</aside>
						))}
					</aside>
				</section>
			</main>
		</Modal>
	);
};

export default RatingDetailsModal;
