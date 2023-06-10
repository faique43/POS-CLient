import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import printJs from 'print-js';

// components
import Order from "../../../components/order/Order";
import CartItem from "../../../components/UI/cart/cartItem/CartItem";

// redux actions
import { kitchenActions, prepareOrderById, getAllOrders } from "../../../store/kitchenSlice/kitchenSlice";

// MU
import { Button } from "@mui/material";
import { uiActions } from "../../../store/uiSlice/uiSlice";

export default function Kitchen1() {
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

    const prepareOrderHandler = () => {
        dispatch(uiActions.startLoading())
        dispatch(prepareOrderById({
            orderId: selectedOrder._id
        })).then(response => {
            if (!response.error) {
                dispatch(getAllOrders())
            }
            dispatch(uiActions.stopLoading())
        })
        // dispatch(kitchenActions.prepareOrderWithId(selectedOrder.orderId))
    };

    const printReceipt = () => {
        const orderProducts = [...selectedOrder.products.map(product => ({
            name: product.product.name,
            price: product.product.price,
            kitchen: product.product.kitchen,
            quantity: product.quantity,
        }))];

        printJs({
            printable: JSON.parse(JSON.stringify(orderProducts)),
            type: 'json',
            properties: ['name', 'price', 'kitchen', 'quantity'],
            header: '<h1>Order Receipt</h1> <h3>Order Number: ' + selectedOrder.orderNumber + '</h3> <h3> Order Time: ' + new Date(selectedOrder.created_at).toLocaleString() + '</h3> <h3>Order Total Price: ' + selectedOrder.totalPrice + '</h3>',
        })
    }

    return (
        <div className="tw-grid tw-grid-cols-6 tw-p-4 tw-gap-x-4">
            <div className="tw-col-span-4 tw-flex tw-flex-col tw-gap-y-4">
                <div className="tw-grid tw-grid-cols-4 tw-bg-blue-500 tw-p-4 tw-rounded-lg tw-text-white">
                    <h1 className="tw-col-span-1">Order Id</h1>
                    <h1 className="tw-col-span-1">Total Items</h1>
                    <h1 className="tw-col-span-1">Total Price</h1>
                    <h1 className="tw-col-span-1">Date & Time</h1>
                </div>
                {kitchenOrders.filter(kitchenOrder => kitchenOrder.products[0].product.kitchen === '1').sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((order) => (
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
                    />
                ))}
            </div>

            <div className="tw-col-span-2 tw-bg-slate-400 tw-rounded-lg tw-text-white tw-flex tw-flex-col tw-items-start tw-gap-y-4">
                {isAnySelectedKitchen1 ? (
                    <div className="tw-w-full tw-flex tw-flex-col tw-gap-y-4 tw-items-start tw-p-3">
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
                            <h1 className="tw-text-xl tw-font-semibold">Order Id: </h1>
                            <h1 className="tw-text-xl">{selectedOrder.orderNumber}</h1>
                        </div>

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
                        <Button
                            className='tw-w-full'
                            variant='contained'
                            onClick={printReceipt}
                        >
                            Print Receipt
                        </Button>
                    </div>
                ) : (
                    <div className='tw-p-3'>
                        <h1 className="tw-text-xl tw-font-semibold">
                            Select an order to see its details
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}
