import {Orders} from '@/domain/order/model';
import {QrCode} from '@/domain/qr-code/model';
import {Can} from '@/view/auth/components/organisms/rbac';
import {useAppDispatch, useAppSelector} from '@/view/common/store/hooks';
import {onChangeIsOpenPrintToKitchen} from '@/view/common/store/slices/order';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {requestFullScreen} from '@/view/common/utils/UtilsRequestFullScreen';
import {useGetQrCodeViewModel} from '@/view/transaction/view-models/GetQrCodeViewModel';
import dynamic from 'next/dynamic';
import {Button} from 'posy-fnb-core';
import {useRef} from 'react';
import {useReactToPrint} from 'react-to-print';

const PrintQrCodeReceipt = dynamic(
	() => import('../../../../organisms/receipt/PrintQrCodeReceipt'),
	{
		loading: () => <div />,
	},
);

type OrderTabBottomProps = {
	dataOrder: Orders | undefined;
};

const OrderTabBottom = ({dataOrder}: OrderTabBottomProps) => {
	const dispatch = useAppDispatch();
	const {selectedTrxId} = useAppSelector(state => state.transaction);

	const qrRef =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

	const handlePrintQr = useReactToPrint({
		content: () => qrRef.current,
	});

	const {
		getQrCode,
		data: dataQrCode,
		isLoading: loadQrCode,
	} = useGetQrCodeViewModel({
		onSuccess: _data => {
			const data = _data as QrCode;
			if (data) {
				setTimeout(() => {
					handlePrintQr();
				}, 100);
				setTimeout(() => {
					requestFullScreen();
				}, 1000);
			}
		},
	});

	const handlePrintToKitchen = () => {
		dispatch(onChangeIsOpenPrintToKitchen(true));
		logEvent({
			category: 'transaction',
			action: 'transaction_printtokitchen_click',
		});
	};

	const handleRePrintQr = () => {
		getQrCode({
			transaction_uuid: selectedTrxId,
		});
		logEvent({
			category: 'transaction',
			action: 'transaction_reprintqr_click',
		});
	};

	return (
		<div className="flex gap-2">
			<Can I="reprint-qrcode" an="transaction">
				<Button
					fullWidth
					variant="secondary"
					onClick={handleRePrintQr}
					isLoading={loadQrCode}
				>
					<p className="whitespace-nowrap text-m-semibold">Reprint QR</p>
				</Button>
			</Can>
			{dataOrder && dataOrder?.length > 0 && (
				<Can I="print_to_kitchen" an="order">
					<Button
						variant="primary"
						fullWidth
						onClick={handlePrintToKitchen}
						className="whitespace-nowrap text-m-semibold"
					>
						Print to Kitchen
					</Button>
				</Can>
			)}

			{dataQrCode && (
				<PrintQrCodeReceipt data={dataQrCode} printReceiptRef={qrRef} />
			)}
		</div>
	);
};

export default OrderTabBottom;
