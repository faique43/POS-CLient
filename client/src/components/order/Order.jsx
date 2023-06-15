import React from "react";

export default function Order(props) {
	const selectedOrderHandler = () => {
		props.selectedOrderHandler(props.orderId);
	};
	
	return (
		<div
			className={`tw-grid ${props.admin ? 'tw-grid-cols-5' : 'tw-grid-cols-4'} ${props.orderStatus === 'completed'
				? "tw-bg-green-500 hover:tw-bg-green-600"
				: "tw-bg-blue-500 hover:tw-bg-blue-600"
				} tw-duration-200 tw-ease-in-out tw-cursor-pointer tw-rounded-lg tw-text-white tw-p-3`}
			onClick={selectedOrderHandler}
		>
			{/* <h1 className="tw-col-span-1">{props.orderName}</h1> */}
			<h1 className="tw-col-span-1">{props.orderNumber}</h1>
			<h1 className="tw-col-span-1">{props.orderItemsCount}</h1>
			<h1 className="tw-col-span-1">Rs {props.orderTotalPrice}</h1>
			{props.admin &&
				<h1 className="tw-col-span-1">{props.kitchen}</h1>
			}
			<h1 className="tw-col-span-1">
				{props.orderTime.toLocaleString("en-US")}
			</h1>
		</div>
	);
}
