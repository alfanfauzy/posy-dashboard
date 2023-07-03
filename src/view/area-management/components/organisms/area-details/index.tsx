import {Divider} from 'antd';
import {Button, Input, Select} from 'posy-fnb-core';
import React from 'react';
import {AiOutlineEye} from 'react-icons/ai';
import {CgTrash} from 'react-icons/cg';
import {HiOutlinePencilAlt} from 'react-icons/hi';

type AreaDetailsProps = {
	openDeleteArea: () => void;
};

const AreaDetails = ({openDeleteArea}: AreaDetailsProps) => {
	return (
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
	);
};

export default AreaDetails;
