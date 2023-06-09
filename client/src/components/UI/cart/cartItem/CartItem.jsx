import React from 'react'
import { useDispatch } from 'react-redux';

// redux actions
import { cartActions } from '../../../../store/cartSlice/cartSlice';

// Icon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CartItem(props) {
    const dispatch = useDispatch()

    const incrementQuantityHandler = () => {
        dispatch(cartActions.incrementProductQuantity({ id: props.id, kitchen: props.kitchen }))
    }

    const decrementQuantityHandler = () => {
        dispatch(cartActions.decrementProductQuantity({ id: props.id, kitchen: props.kitchen }))
    }

    return (
        <div className='tw-flex tw-items-center tw-gap-x-4 tw-w-full tw-p-1'>
                <img src={props.img} width='100' height='100' alt="name" />

            <div className="tw-flex tw-flex-col tw-w-full">
                <h1 className='tw-text-2xl tw-font-semibold'>{props.name}</h1>

                <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                    <h1 className='tw-text-blue-600 tw-text-xl'>Rs {props.price}</h1>

                    {!props.isOrder ?
                        <div className="tw-flex tw-items-center tw-justify-between tw-gap-x-2">
                            <AddIcon className='tw-cursor-pointer tw-bg-blue-600 tw-rounded-sm hover:tw-bg-blue-700 tw-duration-100 tw-ease-in-out tw-text-white' onClick={incrementQuantityHandler} />
                            {props.quantity}
                            <RemoveIcon className='tw-cursor-pointer tw-bg-blue-600 tw-rounded-sm hover:tw-bg-blue-700 tw-duration-100 tw-ease-in-out tw-text-white' onClick={decrementQuantityHandler} />
                        </div>
                        :
                        <div className='tw-flex tw-items-center tw-gap-x-1'>
                            <h1>x</h1>
                            <h1>
                                {props.orderQuantity}
                            </h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
