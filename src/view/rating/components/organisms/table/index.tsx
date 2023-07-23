import {Rating, Ratings} from '@/domain/rating/model';
import {Pagination} from '@/domain/vo/BasePagination';
import Table from '@/view/common/components/atoms/table';
import useDisclosure from '@/view/common/hooks/useDisclosure';
import React, {useState} from 'react';

import RatingDetailsModal from '../modal/rating-details';
import RatingColumns from './Columns';

type OrganismsTableRatingProps = {
	dataRating: Ratings | undefined;
	loadRating: boolean;
	pagination: Pagination | undefined;
};

const OrganismsTableRating = ({
	dataRating,
	loadRating,
	pagination,
}: OrganismsTableRatingProps) => {
	const [selectedRow, setSelectedRow] = useState<Rating | null>(null);
	const [isOpenDetail, {open: openDetail, close: closeDetail}] = useDisclosure({
		initialState: false,
	});

	return (
		<article className="mt-6">
			<Table
				columns={RatingColumns(openDetail, setSelectedRow)}
				dataSource={dataRating}
				paginationData={pagination}
				rowKey={record => record.uuid}
				scroll={{y: '54vh', x: 1100}}
				loading={loadRating}
			/>
			{isOpenDetail && (
				<RatingDetailsModal
					closeDetail={closeDetail}
					selectedRow={selectedRow}
					setSelectedRow={setSelectedRow}
					isOpenDetail={isOpenDetail}
				/>
			)}
		</article>
	);
};

export default OrganismsTableRating;
