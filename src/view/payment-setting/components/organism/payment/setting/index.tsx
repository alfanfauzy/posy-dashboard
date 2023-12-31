import {
	mapToBankOptions,
	mapToPayloadSaveBankAccount,
} from '@/data/bank/mappers/BankMapper';
import {GetCheckBankResponse} from '@/data/bank/types';
import {UploadFilePublicResponse} from '@/data/file-upload/types';
import {PayloadSaveBankAccount} from '@/domain/bank/repositories/CreateSaveBankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {useCheckBankViewModal} from '@/view/bank/view-models/CreateCheckBankViewModel';
import {useGetBankListViewModal} from '@/view/bank/view-models/GetBankListViewModel';
import {useGetLinkedBankAccountViewModel} from '@/view/bank/view-models/GetLinkedBankAccountViewModel';
import {PaymentSettingContext} from '@/view/common/store/context/PaymentContext';
import {useGetImagePrivateViewModel} from '@/view/file-upload/view-modals/GetImagePrivateViewModels';
import {useUploadImagePrivateViewModal} from '@/view/file-upload/view-modals/UploadImagePrivateViewModels';
import {PaymentBankAccountForm} from '@/view/payment-setting/schemas/payment/setting';
import {useGetPaymentAccountInfoViewModel} from '@/view/payment-setting/view-models/GetPaymentAccountInfoViewModel';
import {Image, Modal} from 'antd';
import {enqueueSnackbar} from 'notistack';
import {Button, Input, Select} from 'posy-fnb-core';
import React, {useContext, useMemo, useRef, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {
	AiFillCheckCircle,
	AiOutlineClose,
	AiOutlineUpload,
} from 'react-icons/ai';

const PAYMENT_ACCOUNT_TYPE = [
	{value: 'MANAGED', label: 'Manage Account'},
	{value: 'OWNED', label: 'Owned Account'},
];

const FormPaymentSetting = () => {
	const {
		handleOpenModal,
		isOpenModal,
		isEdit,
		setIsEdit,
		isLoadingSaveBankAccount,
		setPayloadEditInformation,
		handleIsOpenPasswordConfirmationBank,
		setConfirmationType,
		saveBankAccount,
	} = useContext(PaymentSettingContext);

	const [imageURL, setImageURL] = useState('');
	const [bankProofURL, setBankProofURL] = useState('');
	const [isErrorCheckBank, setIsErrorCheckBank] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const methods = useFormContext<PaymentBankAccountForm>();

	const {
		reset,
		setValue,
		watch,
		// clearErrors,
		formState: {errors, isValid},
		control,
	} = methods;

	/**
	 * Service Get Bank List
	 */
	const {data: dataBankList, isLoading: isLoadingBankList} =
		useGetBankListViewModal({
			enabled: isOpenModal,
		});

	const optionsBankList = useMemo(() => {
		if (!dataBankList) return [];

		const mapOptionsBankList = mapToBankOptions(dataBankList);

		return mapOptionsBankList.sort((a, b) => a.label.localeCompare(b.label));
	}, [dataBankList]);

	/**
	 * Service Upload Image
	 */
	const {uploadImagePrivate} = useUploadImagePrivateViewModal({
		onSuccess(data: Response<UploadFilePublicResponse>) {
			setValue('bank_proof_url', data.data.url, {shouldValidate: true});
			// clearErrors('bank_proof_url');
		},
	});

	/**
	 * Service Check Bank
	 */
	const {checkBank, isLoading: isLoadingCheckBank} = useCheckBankViewModal({
		onSuccess(data) {
			const response = data as Response<GetCheckBankResponse>;

			const {
				data: {account_name},
			} = response;

			setValue('account_name', account_name, {shouldValidate: true});
			setValue('password', '', {shouldValidate: true});
			setIsErrorCheckBank(false);
		},
		onError() {
			setValue('account_name', '', {shouldValidate: true});
			setIsErrorCheckBank(true);
		},
	});

	const {data: linkedBankAccount} = useGetLinkedBankAccountViewModel({
		enabled: isEdit,
		onSuccess(response) {
			const {
				account_name,
				account_number,
				bank_name,
				bank_proof_url,
				bank_uuid,
				email_notify_withdrawal,
			} = response.data;

			const responseImageURL = bank_proof_url.split('/')[8];

			setValue(
				'bank_uuid',
				{label: bank_name, value: bank_uuid},
				{shouldValidate: true},
			);
			setValue('account_number', account_number, {shouldValidate: true});
			setValue('email', email_notify_withdrawal, {shouldValidate: true});
			setValue('account_name', account_name, {shouldValidate: true});
			setValue('bank_proof_url', bank_proof_url, {shouldValidate: true});
			setImageURL(responseImageURL);
			setValue('password', '', {shouldValidate: true});
		},
	});

	useGetPaymentAccountInfoViewModel({
		enabled: linkedBankAccount !== undefined,
		onSuccess(response) {
			const {type} = response.data;

			const accountTypeLabel =
				type === 'OWNED' ? 'Owned Account' : 'Manage Account';

			setValue(
				'account_type',
				{label: accountTypeLabel, value: type},
				{shouldValidate: true},
			);
		},
	});

	useGetImagePrivateViewModel(imageURL, {
		enabled: !!imageURL,
		onSuccess(response) {
			setBankProofURL(response);
		},
	});

	const onClearImage = () => {
		if (fileInputRef.current && fileInputRef.current.value !== null) {
			fileInputRef.current.value = '';
		}
		setValue('bank_proof_url', '', {shouldValidate: true});
		setBankProofURL('');
		setImageURL('');
	};

	const handleCloseModal = () => {
		reset({
			account_name: '',
			account_number: '',
			account_type: undefined,
			bank_uuid: undefined,
			email: '',
		});
		onClearImage();
		handleOpenModal();
	};

	const onImageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		prefix: string,
	) => {
		// Max size 2MB
		const maxSize = 2 * 1024 * 1024;

		if (event.target.files && event.target.files[0]) {
			const fileSize = event.target.files[0].size;

			// Check filesize, don't allow when file more than 2MB
			if (fileSize > maxSize) {
				enqueueSnackbar({
					message: `File size can't more than 2MB`,
					variant: 'error',
				});
				return;
			}

			setBankProofURL(URL.createObjectURL(event.target.files[0]));

			const formDataUploadImagePrivate = new FormData();

			formDataUploadImagePrivate.append('image_filename_prefix', prefix);
			formDataUploadImagePrivate.append('image_file', event.target.files[0]);

			uploadImagePrivate(formDataUploadImagePrivate);
		}
	};

	const handleCheckBank = () => {
		const {bank_uuid, account_number} = watch();

		const payloadCheckBank = {
			bank_uuid: bank_uuid?.value,
			account_number,
		};

		checkBank(payloadCheckBank);
	};

	const allowOnlyNumber = (value: string) => {
		return value.replace(/[^0-9]/g, '');
	};

	const handleButton = () => {
		const data = watch();

		if (isEdit) {
			setConfirmationType('edit-information');
			setPayloadEditInformation(data);
			handleCloseModal();
			handleIsOpenPasswordConfirmationBank();
		} else {
			const payload: PayloadSaveBankAccount = mapToPayloadSaveBankAccount(data);
			saveBankAccount(payload);
			setConfirmationType('edit-information');
		}
	};

	const isDisabledButtonCheck =
		watch('bank_uuid') === null ||
		watch('bank_uuid') === undefined ||
		watch('account_number') === undefined ||
		watch('account_number') === '';

	return (
		<Modal
			style={{
				top: 20,
			}}
			open={isOpenModal}
			onCancel={() => {
				handleCloseModal();
				setIsEdit(false);
			}}
			title={
				<p className="border-b border-neutral-40 p-4 text-xl-semibold">
					Payment Settings
				</p>
			}
			footer={null}
		>
			<section className="flex flex-col gap-4 p-4">
				<div>
					<Controller
						name="account_type"
						control={control}
						render={({field: {name, value}}) => (
							<Select
								name={name}
								value={value}
								onChange={e => {
									setValue('account_type', e, {shouldValidate: true});
									// clearErrors('account_type');
								}}
								options={PAYMENT_ACCOUNT_TYPE}
								labelText="Payment account type"
								placeholder="Select your account type"
								className="flex items-center justify-center"
								error={!!errors.account_type}
								helperText={
									errors?.account_type && 'This field cannot be empty'
								}
								isClearable
								disabled={isEdit}
							/>
						)}
					/>
				</div>

				<div>
					<Controller
						name="bank_uuid"
						control={control}
						render={({field: {name, value}}) => (
							<Select
								name={name}
								value={value}
								onChange={e => {
									setValue('bank_uuid', e, {shouldValidate: true});
									// clearErrors('bank_uuid');

									// Clear field account name & account number when change bank
									setValue('account_name', '', {shouldValidate: true});
									setValue('account_number', '', {shouldValidate: true});
								}}
								isLoading={isLoadingBankList}
								options={optionsBankList}
								labelText="Bank name"
								placeholder="Select bank"
								className="flex items-center justify-center"
								error={!!errors.bank_uuid}
								helperText={errors?.bank_uuid && 'This field cannot be empty'}
								isClearable
							/>
						)}
					/>
				</div>

				<div className="flex flex-col">
					<div
						className={`flex flex-row ${
							errors.account_number ? 'items-center' : 'items-end'
						} gap-2`}
					>
						<Controller
							name="account_number"
							control={control}
							render={({field: {name, onChange, value}}) => (
								<Input
									name={name}
									value={value}
									onChange={e => {
										onChange(allowOnlyNumber(e.target.value));
									}}
									labelText="Bank account number"
									placeholder="Input your bank account"
									className="flex !w-[340px] items-center justify-center"
									error={!!errors.account_number}
									helperText={errors?.account_number?.message}
								/>
							)}
						/>
						<Button
							type="button"
							className="flex flex-row items-center gap-3 !rounded-full !text-l-semibold"
							isLoading={isLoadingCheckBank}
							disabled={isDisabledButtonCheck}
							onClick={() => handleCheckBank()}
						>
							<AiFillCheckCircle size={20} /> Check
						</Button>
					</div>
					{isErrorCheckBank && (
						<p className="mt-1 block text-m-regular text-red-caution">
							Bank account not found, make sure you already input the correct
							bank and account number
						</p>
					)}
				</div>

				<div>
					<Controller
						name="account_name"
						control={control}
						render={({field: {name, value}}) => (
							<Input
								name={name}
								value={value}
								disabled
								labelText="Bank account name"
								placeholder="Input your bank account name"
								className="flex items-center justify-center"
								error={!!errors.account_name}
								helperText={errors?.account_name?.message}
							/>
						)}
					/>
				</div>
				<div>
					<Controller
						name="email"
						control={control}
						render={({field: {name, value, onChange}}) => (
							<Input
								name={name}
								value={value}
								onChange={onChange}
								labelText="Email notification of withdrawal request"
								placeholder="business@mail.com"
								className="flex items-center justify-center"
								error={!!errors.email}
								helperText={errors?.email?.message}
							/>
						)}
					/>
				</div>
				<div>
					<h3 className="mb-2 text-m-bold">Bank account proof</h3>
					<p>
						Upload a photo of your business bank account book or a screenshot of
						bank account details from your banking app
					</p>
					<div className="mt-2">
						{bankProofURL ? (
							<div className="relative w-[140px]">
								<button
									className="absolute right-0 z-10 rounded-full border border-gray-500 p-2 text-red-500"
									onClick={onClearImage}
								>
									<AiOutlineClose />
								</button>
								<Image
									width={100}
									height={100}
									src={bankProofURL}
									alt="bank_proof_url"
									className="rounded-lg border border-gray-300 object-contain"
								/>
							</div>
						) : null}
						<button
							className="my-4 flex items-center justify-center gap-3 p-3 text-center text-m-semibold text-[#654DE4]"
							type="button"
						>
							<AiOutlineUpload />
							<p>Upload documents</p>
							<input
								ref={fileInputRef}
								onChange={e => onImageChange(e, 'bank_proof_url')}
								accept="image/png, image/jpeg,"
								type="file"
								className="absolute h-fit w-[192px] cursor-pointer opacity-0"
							/>
						</button>
						{errors.bank_proof_url && (
							<p className="mt-1 block text-m-regular text-red-caution">
								Please choose file
							</p>
						)}
					</div>
				</div>
				<div className="border-t border-neutral-40 pt-4"></div>

				<Button
					fullWidth
					isLoading={isLoadingSaveBankAccount}
					onClick={handleButton}
					disabled={!isValid}
				>
					Save
				</Button>
			</section>
		</Modal>
	);
};

export default FormPaymentSetting;
