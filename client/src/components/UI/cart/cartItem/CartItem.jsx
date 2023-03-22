import React from 'react'

// Icon
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CartItem() {
    return (
        <div className='tw-flex tw-items-center tw-gap-x-4 tw-w-full tw-p-1'>
            <img src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' width='100' height='100' alt="name" />

            <div className="tw-flex tw-flex-col tw-w-full">
                <h1 className='tw-text-2xl tw-font-semibold'>Kitchen</h1>

                <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                    <h1 className='tw-text-blue-600 tw-text-xl'>Rs {100}</h1>

                    <div className="tw-flex tw-items-center tw-justify-between tw-gap-x-2">
                        <AddIcon className='tw-cursor-pointer tw-bg-blue-600 tw-rounded-sm hover:tw-bg-blue-700 tw-duration-100 tw-ease-in-out tw-text-white'/>
                        1
                        <RemoveIcon className='tw-cursor-pointer tw-bg-blue-600 tw-rounded-sm hover:tw-bg-blue-700 tw-duration-100 tw-ease-in-out tw-text-white'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
