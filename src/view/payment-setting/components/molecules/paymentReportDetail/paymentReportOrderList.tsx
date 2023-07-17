import {OrderDetailStatus, Orders} from '@/domain/order/model';
import {formatCurrency} from '@/view/common/utils/UtilsCurrencyFormater';

type PaymentReportOrderListProps = {
	orderDetail: Orders | undefined;
};

export const PaymentReportOrderList = ({
	orderDetail,
}: PaymentReportOrderListProps) => {
	if (!orderDetail) {
		return null;
	}

	return (
		orderDetail && (
			<>
				<aside className="border-b border-neutral-40 py-4">
					{orderDetail.map(order => (
						<aside key={order.uuid} className="mb-4 last:mb-0">
							<div className="flex items-center justify-between">
								<p className="text-xl-semibold text-primary-main">
									{`Order ${order.order_number}`}
								</p>
							</div>
							{order?.order_detail.map(item => (
								<div key={item.uuid} className="mt-4">
									<div className="flex items-start justify-between">
										<div className="flex w-3/4 items-start break-words lg:w-1/2">
											<p className="mr-5 text-xl-semibold">{`${item.qty}x`}</p>
											<p className="flex-1 text-l-regular">
												{item.product_name}
											</p>
										</div>
									</div>
									{item.addon_information.length > 0 && (
										<div id="addon" className="ml-10 flex flex-col gap-1">
											<div className="flex items-start justify-between">
												{item.status !== OrderDetailStatus.CANCEL && (
													<>
														<p className="w-3/4 text-l-regular line-clamp-2">
															{item.addon_information
																.map(
																	el =>
																		`${el.addon_name}: ${el.addon_variants
																			.map(variant => variant.variant_name)
																			.join(', ')}`,
																)
																.join(', ')}
														</p>
														<p className="text-l-regular text-neutral-60">
															{formatCurrency(item.price_addon)}
														</p>
													</>
												)}
											</div>
										</div>
									)}

									{item.order_note && (
										<div className="mt-2 ml-10 max-w-[400px] text-l-regular text-primary-main">
											Notes:{item.order_note}
										</div>
									)}
								</div>
							))}
						</aside>
					))}
				</aside>
			</>
		)
	);
};
