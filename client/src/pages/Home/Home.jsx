import React from 'react'
import { useSelector } from 'react-redux'

// components
import ProductCard from '../../components/UI/productCard/ProductCard';
import CartItem from '../../components/UI/cart/cartItem/CartItem';

// Mu
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Home() {
    const products = useSelector(state => state.products.products);

    return (
        <div className='tw-grid tw-grid-cols-6'>
            <div className='tw-col-span-4 tw-flex tw-items-center tw-flex-wrap tw-justify-evenly tw-gap-y-4 tw-p-4 tw-gap-x-1'>
                {products.map(product => <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    img={product.img}
                    price={product.price}
                />)}
            </div>
            <div className='tw-col-span-2 tw-bg-gray-200 tw-flex tw-flex-col tw-p-4 tw-gap-y-24'>
                <div className='tw-flex tw-flex-col tw-gap-y-4'>
                    <Typography variant='h4'>Current Order</Typography>

                    <div className="tw-flex tw-flex-col tw-gap-y-4">
                        <CartItem/>
                        <CartItem/>
                        <CartItem/>
                    </div>
                </div>

                <div className=' tw-flex tw-flex-col tw-gap-y-8'>
                    <div className="tw-flex tw-items-center tw-justify-between">
                        <h1 className='tw-text-xl'>Subtotal</h1>
                        <h1 className='tw-text-2xl tw-font-semibold'>$20</h1>
                    </div>
                    <Button className='tw-w-full' variant='contained'>Place Order</Button>
                    {/* <div className="tw-flex tw-items-center tw-justify-between">
                        <h1 className='tw-text-xl'></h1>
                        <h1 className='tw-text-2xl tw-font-semibold'>$20</h1>
                    </div> */}
                </div>

                
            </div>
        </div>
    )
}
