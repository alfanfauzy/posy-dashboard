import {Modal} from 'antd';
import {Button, Input, Select} from 'posy-fnb-core';
import React from 'react';
import {Controller} from 'react-hook-form';

type AddTableModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const AddTableModal = ({isOpen, onClose}: AddTableModalProps) => {
	return (
		<Modal
			onCancel={onClose}
			closable={false}
			footer={null}
			width={380}
			open={isOpen}
		>
			<form>
				<div className="flex flex-col gap-4 h-full px-4 p-6 bg-gradient-to-r from-primary-main to-secondary-main rounded-t-lg items-center justify-center">
					<div>
						<p className="text-neutral-10 text-l-semibold">Add New Table</p>
					</div>
					<div className="w-full flex flex-col gap-4">
						<div>
							<span className="mb-1 text-neutral-10 text-m-regular">
								Table name
							</span>
							<Input
								placeholder="eg. 01"
								// fullwidth
								// {...register('name')}
								// error={!!errors.name}
								// helperText={errors.name?.message}
							/>
						</div>
						<aside className="w-full flex gap-2">
							<div className="w-full">
								<span className="mb-1 text-neutral-10 text-m-regular">
									Table type
								</span>
								{/* <Controller
									name="floor_size_uuid"
									control={control}
									render={() => ( */}
								<Select
									placeholder="Select area"
									// isLoading={loadAreaSizes}
									// value={{label: value, value}}
									options={[{label: 'test', value: 'test'}]}
									className="w-full"
									// onChange={v =>
									// 	setValue('floor_size_uuid', v, {
									// 		shouldValidate: true,
									// 	})
									// }
									// error={!!errors.floor_size_uuid}
									// helperText={errors.floor_size_uuid?.message}
								/>
								{/* )}
								/> */}
							</div>
						</aside>
					</div>
				</div>
				<section className="p-4 rounded-b-lg bg-neutral-10 w-full flex gap-3">
					<div className="w-1/2">
						<Button size="m" variant="secondary" fullWidth onClick={onClose}>
							Cancel
						</Button>
					</div>
					<div className="w-1/2">
						<Button
							type="submit"
							// isLoading={loadCreateArea}
							// disabled={!isValid}
							size="m"
							fullWidth
						>
							Save
						</Button>
					</div>
				</section>
			</form>
		</Modal>
	);
};

export default AddTableModal;
