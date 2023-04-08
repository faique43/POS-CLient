import React, { useState } from 'react'

// MU
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

// icons
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function AddProduct() {
    const [productData, setProductData] = useState({
        productName: '',
        productPrice: 0,
        productQuantity: 0,
        productDescription: '',
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
            <Button className='tw-col-span-2' variant="contained" component="label">Add Product</Button>
        </div>
    )
}
