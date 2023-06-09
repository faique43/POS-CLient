import React from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import Order from "../../../components/order/Order";
import CartItem from "../../../components/UI/cart/cartItem/CartItem";

// redux actions
import { kitchenActions } from "../../../store/kitchenSlice/kitchenSlice";

export default function Orders() {
    const dispatch = useDispatch();

    const kitchenOrders = useSelector((state) => state.kitchen.orders);
    const selectedOrder = useSelector(state => state.kitchen.selectedOrder)
    const isAnySelectedKitchen1 = useSelector(state => state.kitchen.isAnySelectedKitchen1)

    const selectedOrderHandler = (orderId) => {
        dispatch(kitchenActions.setSelectedOrder({
            orderId: orderId,
            kitchen: "1"
        }));
    };

    return (
        <div className="tw-grid tw-grid-cols-6 tw-p-4 tw-gap-x-4 tw-w-full tw-mt-14 tw-mx-4">
            <div className="tw-col-span-4 tw-flex tw-flex-col tw-gap-y-4">
                <div className="tw-grid tw-grid-cols-5 tw-bg-blue-500 tw-p-4 tw-rounded-lg tw-text-white">
                    <h1 className="tw-col-span-1">Order Number</h1>
                    <h1 className="tw-col-span-1">Total Items</h1>
                    <h1 className="tw-col-span-1">Total Price</h1>
                    <h1 className="tw-col-span-1">Kitchen</h1>
                    <h1 className="tw-col-span-1">Date & Time</h1>
                </div>
                {[...kitchenOrders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((order) => (
                    <Order
                        key={order._id}
                        orderId={order._id}
                        orderNumber={order.orderNumber}
                        orderItems={order.products}
                        orderItemsCount={order.products.length}
                        orderTotalPrice={order.totalPrice}
                        orderTime={new Date(order.created_at).toLocaleString()}
                        orderStatus={order.status}
                        selectedOrderHandler={selectedOrderHandler}
                        admin={true}
                        kitchen={order.products[0].product.kitchen}
                    />
                ))}
            </div>

            <div className="tw-col-span-2 tw-bg-slate-400 tw-p-3 tw-rounded-lg tw-text-white tw-flex tw-flex-col tw-items-start tw-gap-y-4">
                {isAnySelectedKitchen1 ? (
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
