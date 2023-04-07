import React from 'react'
import { useSelector } from 'react-redux'

// components
import Order from '../../components/order/Order'
import CartItem from '../../components/UI/cart/cartItem/CartItem';

// MU
import {Button} from '@mui/material';

export default function Kitchen() {
    const kitchenOrders = useSelector(state => state.kitchen.orders);

    return (
        <div className='tw-grid tw-grid-cols-6 tw-p-4 tw-gap-x-4'>
            <div className="tw-col-span-4 tw-flex tw-flex-col tw-gap-y-4">
                <div className='tw-grid tw-grid-cols-4 tw-bg-blue-500 tw-p-4 tw-rounded-lg tw-text-white'>
                    <h1 className='tw-col-span-1'>Order Name</h1>
                    <h1 className='tw-col-span-1'>Total Items</h1>
                    <h1 className='tw-col-span-1'>Total Price</h1>
                    <h1 className='tw-col-span-1'>Date & Time</h1>
                </div>
                {kitchenOrders.map(order => <Order
                    orderName={order.orderName}
                    orderItems={order.orderItems}
                    orderItemsCount={order.orderItemsCount}
                    orderTotalPrice={order.orderTotalPrice}
                    orderTime={order.orderTime}
                    orderStatus={order.orderStatus}
                />)}
            </div>
            <div className="tw-col-span-2 tw-bg-slate-400 tw-p-3 tw-rounded-lg tw-text-white tw-flex tw-flex-col tw-items-start tw-gap-y-4">
                <h1 className='tw-text-xl tw-font-semibold'>Order Details</h1>

                <CartItem
                    isOrder={true}
                    price={45}
                    orderQuantity={2}
                    name={'check'}
                />
                <CartItem
                    isOrder={true}
                    price={45}
                    orderQuantity={2}
                    name={'check'}
                />

                <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                    <h1 className='tw-text-xl tw-font-semibold'>Total Items: </h1>
                    <h1 className='tw-text-xl'>2</h1>
                </div>

                <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                    <h1 className='tw-text-xl tw-font-semibold'>Total Price: </h1>
                    <h1 className='tw-text-xl'>Rs 45</h1>
                </div>

                <Button className='tw-w-full' variant='contained'>Mark As Prepared</Button>
            </div>
        </div>
    )
}
