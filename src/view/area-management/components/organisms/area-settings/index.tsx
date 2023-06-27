import useDisclosure from '@/view/common/hooks/useDisclosure';
import useViewportListener from '@/view/common/hooks/useViewportListener';
import {useAppDispatch} from '@/view/common/store/hooks';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import {Divider} from 'antd';
import dynamic from 'next/dynamic';
import {Button, Input, Select} from 'posy-fnb-core';
import React from 'react';
import {AiOutlineEye} from 'react-icons/ai';
import {BsList} from 'react-icons/bs';
import {CgTrash} from 'react-icons/cg';
import {HiOutlinePencilAlt} from 'react-icons/hi';

const AddNewAreaModal = dynamic(() => import('../modal/AddNewAreaModal'));
const DeleteAreaModal = dynamic(() => import('../modal/DeleteAreaModal'));

const AreaSettings = () => {
	const dispatch = useAppDispatch();
	const {width} = useViewportListener();
	const [isOpenAddArea, {open: openAddArea, close: closeAddArea}] =
		useDisclosure({
			initialState: false,
		});
	const [isOpenDeleteArea, {open: openDeleteArea, close: closeDeleteArea}] =
		useDisclosure({
			initialState: false,
		});

	return (
		<>
			<AddNewAreaModal close={closeAddArea} isOpen={isOpenAddArea} />
			<DeleteAreaModal close={closeDeleteArea} isOpen={isOpenDeleteArea} />

			<main className="flex w-full gap-2">
				<section className="h-full w-1/3 overflow-y-hidden overflow-auto xl:rounded-r-lg rounded-lg bg-neutral-10">
					<aside className="flex h-full flex-col">
						<div className="flex items-center gap-4 px-4 pt-4 pb-2">
							{width <= 1280 && (
								<BsList
									onClick={() => dispatch(setOpenDrawer(true))}
									size={24}
									className="cursor-pointer text-neutral-100 hover:opacity-70 duration-300 ease-in-out"
								/>
							)}
							<p className="text-xxl-semibold text-neutral-100">
								Area Settings
							</p>
						</div>
						<div className="px-4">
							<p className="text-l-regular">Choose Area</p>
						</div>
						<div className="mt-4 px-4 overflow-y-auto flex h-full flex-col gap-3">
							{new Array(30).fill(0).map((_, index) => (
								<div key={index}>
									<Button
										fullWidth
										size="m"
										variant="secondary"
										className={`${
											index === 2 &&
											'border-secondary-main hover:border-secondary-main text-secondary-main'
										}`}
									>
										{index + 1} Floor
									</Button>
								</div>
							))}
						</div>
						<div className="mt-4 p-4 shadow-box-1 w-full">
							<Button size="m" fullWidth onClick={openAddArea}>
								Add New Area
							</Button>
						</div>
					</aside>
				</section>
				<section className="h-full flex-1 flex flex-col gap-4 overflow-y-hidden overflow-auto p-4 xl:rounded-r-lg rounded-lg bg-neutral-10">
					<aside className="relative h-full">
						<aside className="h-[92%] border border-neutral-40 rounded-lg flex flex-col">
							<div className="flex justify-between items-center px-6 py-2 bg-neutral-20 border-b border-b-neutral-40 rounded-t-lg">
								<p className="text-l-semibold text-neutral-90">
									Area details - Large area (up to 48 table)
								</p>

								<div className="flex gap-8">
									<AiOutlineEye
										size={20}
										className="cursor-pointer text-neutral-70 hover:opacity-80"
									/>
									<HiOutlinePencilAlt
										size={20}
										className="cursor-pointer text-neutral-70 hover:opacity-80"
									/>
									<CgTrash
										onClick={openDeleteArea}
										className="cursor-pointer text-neutral-70 hover:opacity-80"
										size={20}
									/>
								</div>
							</div>
							<div className="pt-6 px-6 overflow-y-auto flex flex-col">
								{new Array(30).fill(0).map((_, index) => (
									<aside key={index}>
										<div className="w-full items-center flex gap-4">
											<div className="w-1/2">
												<Input fullwidth labelText="Table name" />
											</div>
											<div className="w-1/2">
												<Select
													className="!mb-0"
													options={[]}
													labelText="Table seat"
												/>
											</div>
											<div className="mt-5">
												<CgTrash
													className="cursor-pointer text-neutral-70 hover:opacity-80"
													size={20}
												/>
											</div>
										</div>
										<Divider className="my-4" />
									</aside>
								))}
								<div className="flex items-center justify-center mb-4">
									<p className="text-secondary-main text-l-semibold cursor-pointer hover:text-opacity-70 duration-300">
										+ Add new table
									</p>
								</div>
							</div>
						</aside>

						<div className="absolute bottom-0 w-full">
							<Button size="m" fullWidth>
								Save
							</Button>
						</div>
					</aside>
				</section>
			</main>
		</>
	);
};

export default AreaSettings;
