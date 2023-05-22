import React from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import Order from "../../../components/order/Order";
import CartItem from "../../../components/UI/cart/cartItem/CartItem";

// redux actions
import { kitchenActions, prepareOrderById, getAllOrders } from "../../../store/kitchenSlice/kitchenSlice";
import { uiActions } from "../../../store/uiSlice/uiSlice";

// MU
import { Button } from "@mui/material";

export default function Kitchen2() {
    const dispatch = useDispatch();

    const kitchenOrders = useSelector((state) => state.kitchen.orders);
    const selectedOrder = useSelector(state => state.kitchen.selectedOrder)
    const isAnySelectedKitchen2 = useSelector(state => state.kitchen.isAnySelectedKitchen2)

    const selectedOrderHandler = (orderId) => {
        dispatch(kitchenActions.setSelectedOrder({
            orderId: orderId,
            kitchen: "2"
        }));
    };

    const prepareOrderHandler = () => {
        dispatch(uiActions.startLoading())
        dispatch(prepareOrderById({
            orderId: selectedOrder._id
        })).then(response => {
            if(!response.error) {
                dispatch(getAllOrders())
            }
            dispatch(uiActions.stopLoading())
        })
        // dispatch(kitchenActions.prepareOrderWithId(selectedOrder.orderId))
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
                {kitchenOrders.filter(kitchenOrder => kitchenOrder.products[0].product.kitchen === '2').sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((order) => (
                    <Order
                        key={order._id}
                        orderId={order._id}
                        orderName={order.name}
                        orderItems={order.products}
                        orderItemsCount={order.products.length}
                        orderTotalPrice={order.totalPrice}
                        orderTime={new Date(order.created_at).toLocaleString()}
                        orderStatus={order.status}
                        selectedOrderHandler={selectedOrderHandler}
                    />
                ))}
            </div>

            <div className="tw-col-span-2 tw-bg-slate-400 tw-p-3 tw-rounded-lg tw-text-white tw-flex tw-flex-col tw-items-start tw-gap-y-4">
                {isAnySelectedKitchen2 ? (
                    <>
                        <h1 className="tw-text-xl tw-font-semibold">Order Details</h1>

                        {selectedOrder.products.map((product) => (
                            <CartItem
                                key={product._id}
                                isOrder={true}
                                price={product.product.price}
                                orderQuantity={product.quantity}
                                name={product.product.name}
                            />
                        ))}

                        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                            <h1 className="tw-text-xl tw-font-semibold">Total Items: </h1>
                            <h1 className="tw-text-xl">{selectedOrder.products.length}</h1>
                        </div>

                        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                            <h1 className="tw-text-xl tw-font-semibold">Total Price: </h1>
                            <h1 className="tw-text-xl">{selectedOrder.totalPrice}</h1>
                        </div>

                        <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                            <h1 className="tw-text-xl tw-font-semibold">Order Time: </h1>
                            <h1 className="tw-text-xl">
                                {new Date(selectedOrder.created_at).toLocaleString()}
                            </h1>
                        </div>

                        <Button
                            className="tw-w-full"
                            variant="contained"
                            onClick={prepareOrderHandler}
                            disabled={selectedOrder.status === 'completed'}
                        >
                            {selectedOrder.status === "pending" ? "Mark As Prepared" : "Prepared"}
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
