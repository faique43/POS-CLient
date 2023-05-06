import React from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import Order from "../../components/order/Order";
import CartItem from "../../components/UI/cart/cartItem/CartItem";

// redux actions
import { kitchenActions } from "../../store/kitchenSlice/kitchenSlice";

// MU
import { Button } from "@mui/material";

export default function Kitchen2() {
    const dispatch = useDispatch();

    const kitchenOrders = useSelector((state) => state.kitchen.orders);
    const selectedOrder = useSelector(state => state.kitchen.selectedOrder)
    const isAnySelectedKitchen2 = useSelector(state => state.kitchen.isAnySelectedKitchen2)

    const selectedOrderHandler = (order) => {
        dispatch(kitchenActions.setSelectedOrder({
            orderId: order.orderId,
            kitchen: "2"
        }));
    };

    const prepareOrderHandler = () => {
        dispatch(kitchenActions.prepareOrderWithId(selectedOrder.orderId))
    };

    return (
        <div className="tw-grid tw-grid-cols-6 tw-p-4 tw-gap-x-4">
            <div className="tw-col-span-4 tw-flex tw-flex-col tw-gap-y-4">
                <div className="tw-grid tw-grid-cols-4 tw-bg-blue-500 tw-p-4 tw-rounded-lg tw-text-white">
                    <h1 className="tw-col-span-1">Order Name</h1>
                    <h1 className="tw-col-span-1">Total Items</h1>
                    <h1 className="tw-col-span-1">Total Price</h1>
                    <h1 className="tw-col-span-1">Date & Time</h1>
                </div>
                {kitchenOrders.filter(kitchenOrder => kitchenOrder.kitchen === "2").map((order) => (
                    <Order
                        key={order.orderId}
                        orderId={order.orderId}
                        orderName={order.orderName}
                        orderItems={order.orderItems}
                        orderItemsCount={order.orderItemsCount}
                        orderTotalPrice={order.orderTotalPrice}
                        orderTime={order.orderTime}
                        orderStatus={order.orderStatus}
                        selectedOrderHandler={selectedOrderHandler}
                    />
                ))}
            </div>

            <div className="tw-col-span-2 tw-bg-slate-400 tw-p-3 tw-rounded-lg tw-text-white tw-flex tw-flex-col tw-items-start tw-gap-y-4">
                {isAnySelectedKitchen2 ? (
                    <>
                        <h1 className="tw-text-xl tw-font-semibold">Order Details</h1>

                        {selectedOrder.orderItems.map((order) => (
                            <CartItem
                                isOrder={true}
                                price={order.price}
                                orderQuantity={order.quantity}
                                name={order.name}
                            />
                        ))}
                        {/* <CartItem isOrder={true} price={45} orderQuantity={2} name={"check"} /> */}

                        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                            <h1 className="tw-text-xl tw-font-semibold">Total Items: </h1>
                            <h1 className="tw-text-xl">{selectedOrder.orderItemsCount}</h1>
                        </div>

                        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                            <h1 className="tw-text-xl tw-font-semibold">Total Price: </h1>
                            <h1 className="tw-text-xl">{selectedOrder.orderTotalPrice}</h1>
                        </div>

                        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                            <h1 className="tw-text-xl tw-font-semibold">Order Time: </h1>
                            <h1 className="tw-text-xl">
                                {selectedOrder.orderTime.toLocaleString("en-US")}
                            </h1>
                        </div>

                        <Button
                            className="tw-w-full"
                            variant="contained"
                            onClick={prepareOrderHandler}
                            disabled={selectedOrder.orderStatus}
                        >
                            {!selectedOrder.orderStatus ? "Mark As Prepared" : "Prepared"}
                        </Button>
                    </>
                ) : (
                    <>
                        <h1 className="tw-text-xl tw-font-semibold">
                            Select an order to see its details
                        </h1>
                    </>
                )}
            </div>
        </div>
    );
}
