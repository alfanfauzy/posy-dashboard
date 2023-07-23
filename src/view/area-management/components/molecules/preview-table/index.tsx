import {Image} from 'antd';
import React from 'react';
import {BsEye} from 'react-icons/bs';

const tablePreview = '/images/table-settings.png';
const tablePreviewLarge = '/images/table-settings-lg.png';

type PreviewTableProps = {
	isShowPreview: boolean;
	openPreview: () => void;
	closePreview: () => void;
	size: string;
};

const PreviewTable = ({
	isShowPreview,
	closePreview,
	openPreview,
	size,
}: PreviewTableProps) => {
	return (
		<div
			onClick={openPreview}
			className="flex items-center gap-2 cursor-pointer hover:opacity-70"
		>
			<BsEye size={16} className="text-neutral-10" />
			<p className="text-m-medium text-neutral-10">View example</p>
			<Image.PreviewGroup
				preview={{
					visible: isShowPreview,
					onVisibleChange: closePreview,
				}}
			>
				<Image
					alt="preview"
					className="hidden"
					src={
						size === 'Large (up to 48 table)' ? tablePreviewLarge : tablePreview
					}
				/>
			</Image.PreviewGroup>
		</div>
	);
};

export default PreviewTable;
