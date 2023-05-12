import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

// MU
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// redux 
import { uiActions } from '../../../store/uiSlice/uiSlice';
import { addInventory, getInventory } from '../../../store/inventorySlice/inventorySlice';

export default function AddInventory() {
    const dispatch = useDispatch();

    const [inventoryData, setInventoryData] = useState({
        item: '',
        quantity: '',
        price: ''
    })

    const changeHandler = (event) => {
        if (event.target.name === 'item') {
            setInventoryData({
                ...inventoryData,
                item: event.target.value
            })
        }
        else if (event.target.name === 'quantity') {
            setInventoryData({
                ...inventoryData,
                quantity: event.target.value
            })
        }
        else if (event.target.name === 'price') {
            setInventoryData({
                ...inventoryData,
                price: event.target.value
            })
        }
    }

    const addInventoryHandler = () => {
        dispatch(uiActions.startLoading());
        dispatch(addInventory(inventoryData)).then(response => {
            if(!response.error) {
                dispatch(getInventory()).then(response => {
                    dispatch(uiActions.stopLoading())
                })
                return;
            }
            dispatch(uiActions.stopLoading())
        })
    }

    return (
        <div className='tw-p-4 tw-grid tw-grid-cols-2 tw-gap-6 tw-w-full tw-mt-14 tw-ml-4'>
            <h1 className='tw-col-span-2 tw-text-2xl'>Add Inventory</h1>

            <TextField value={inventoryData.item} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="item" label="Name" variant="outlined" />
            <TextField value={inventoryData.quantity} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="quantity" label="Quantity" variant="outlined" />
            <TextField value={inventoryData.price} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="price" label="Price" variant="outlined" />

            <Button className='tw-col-span-2' variant="contained" component="label" onClick={addInventoryHandler}>Add Inventory</Button>
        </div>
    )
}
