import React, { useState } from 'react'
import { useSelector } from 'react-redux';

// components
import ProductCard from '../../../components/UI/productCard/ProductCard';

// MU
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Inventory() {
    const [selectedProduct, setSelectedProduct] = useState({
        id: '',
        name: "",
        price: "",
        img: "",
        description: "",
        quantity: '',
    })

    const products = useSelector(state => state.products.products)

    const showDetailsHandler = (product) => {
        setSelectedProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            description: product.description,
            quantity: product.quantity
        })
        handleOpen()
    }

    // MU
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className='tw-flex tw-items-center tw-flex-wrap tw-justify-evenly tw-gap-y-4 tw-p-4 tw-gap-x-1'>
                {products.map(product => <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    description={product.description}
                    img={product.img}
                    price={product.price}
                    quantity={product.stock}
                    inInventory={true}
                    showDetailsHandler={showDetailsHandler}
                />)}
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='tw-flex tw-flex-col tw-items-center tw-gap-y-4'>
                        <img src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' width='300' height='300' alt="name" />

                        <div className='tw-grid tw-grid-cols-2 tw-gap-2'>
                            <h1 className='tw-text-lg tw-font-semibold'>Name: </h1>
                            <h1 className='tw-text-lg tw-font-semibold'>{selectedProduct.name}</h1>

                            <h1 className='tw-text-lg tw-font-semibold'>Description: </h1>
                            <h1 className='tw-text-lg tw-font-semibold'>{selectedProduct.description}</h1>

                            <h1 className='tw-text-lg tw-font-semibold'>Price: </h1>
                            <h1 className='tw-text-lg tw-font-semibold'>{selectedProduct.price}</h1>

                            <h1 className='tw-text-lg tw-font-semibold'>Quantity: </h1>
                            <h1 className='tw-text-lg tw-font-semibold'>{selectedProduct.quantity}</h1>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
