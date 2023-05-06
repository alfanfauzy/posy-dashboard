import {QrCode} from '@/domain/qr-code/model';
import Image from 'next/image';
import React from 'react';

type PrintQrCodeReceiptProps = {
	data: QrCode;
	printReceiptRef: React.RefObject<HTMLDivElement>;
};

const PrintQrCodeReceipt = ({
	printReceiptRef,
	data,
}: PrintQrCodeReceiptProps) => {
	return (
		<article className="hidden">
			<section ref={printReceiptRef} className="py-5">
				<div className="flex flex-col items-center justify-center">
					<p className="text-l-semibold">{data.restaurant_name}</p>
					<p className="text-m-regular">{data.outlet_name}</p>
					<Image
						src={data.logo}
						alt="logo"
						width={57}
						height={57}
						className="mt-3 mb-6 rounded-full"
					/>
				</div>
				<div className="border-b border-neutral-40" />
				<div className="mt-6 flex flex-col items-center justify-center">
					<p className="text-m-semibold">QR CODE MENU</p>
					<Image
						src={`data:image/jpeg;base64, ${data.base64_qrcode}`}
						alt="qr-code"
						width={243}
						height={248}
					/>
					<div className="mb-6 flex flex-col items-center justify-center">
						<p className="text-m-regular">Please scan to order,</p>
						<p className="text-m-regular">Thank you</p>
					</div>
				</div>
				<div className="border-b border-neutral-40" />
				<p className="my-5 text-center text-m-semibold">
					Powered by Posy Resto
				</p>
			</section>
		</article>
	);
};

export default PrintQrCodeReceipt;
