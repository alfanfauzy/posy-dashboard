import {QrCode} from '@/domain/qr-code/model';
import {ResultMutation} from '@/domain/vo/BaseResponse';

export type GetQrCodeInput = {
	transaction_uuid: string;
};

export type GetQrCodeResult = ResultMutation<QrCode | undefined>;

export type GetQrCodeRepository = {
	getQrCode(input: GetQrCodeInput): void;
} & GetQrCodeResult;
