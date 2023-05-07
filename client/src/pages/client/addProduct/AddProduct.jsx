import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

// redux actions
import { productsActions } from '../../../store/productsSlice/productsSlice';

// MU
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

// icons
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function AddProduct() {
    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        productName: '',
        productPrice: 0,
        productQuantity: 0,
        productDescription: '',
        img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    })

    const changeHandler = (event) => {
        if (event.target.name === 'productName') {
            setProductData({ ...productData, productName: event.target.value })
        }
        else if (event.target.name === 'productPrice') {
            setProductData({ ...productData, productPrice: event.target.value })
        }
        else if (event.target.name === 'productDescription') {
            setProductData({ ...productData, productDescription: event.target.value })
        }
        else if (event.target.name === "productQuantity") {
            setProductData({ ...productData, productQuantity: event.target.value })
        }
    }

    const addProductHandler = () => {
        dispatch(productsActions.addNewProduct(productData))
        setProductData({
            productName: '',
            productPrice: 0,
            productQuantity: 0,
            productDescription: '',
            img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
        })
    }

    return (
        <div className='tw-p-4 tw-grid tw-grid-cols-2 tw-gap-6'>
            <TextField value={productData.productName} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="productName" label="Product Name" variant="outlined" />
            <TextField value={productData.productPrice} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="productPrice" label="Product Price" variant="outlined" />
            <TextField value={productData.productQuantity} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="productQuantity" label="Product Quantity" variant="outlined" />
            <TextField value={productData.productDescription} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="productDescription" label="Product Description" variant="outlined" />
            <IconButton className='tw-col-span-2 tw-w-full tw-flex tw-items-center tw-gap-x-8 tw-rounded-none' color="primary" aria-label="upload picture" component="label">
                <h1>Image Upload</h1>
                <div>
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera />
                </div>
            </IconButton>
            <Button className='tw-col-span-2' variant="contained" component="label" onClick={addProductHandler}>Add Product</Button>
        </div>
    )
}
