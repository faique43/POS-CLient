import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// redux actions
import { addNewProduct, getAllProducts } from '../../../store/productsSlice/productsSlice';
import { uiActions } from '../../../store/uiSlice/uiSlice';

// MU
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';

// icons
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// components
import InventoryCard from '../../../components/UI/inventoryCard/InventoryCard';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function AddProduct() {
    const dispatch = useDispatch();
    const theme = useTheme();

    const inventory = useSelector(state => state.inventory.inventory)

    const [productData, setProductData] = useState({
        productName: '',
        productPrice: 0,
        productInventory: [],
        productDescription: '',
        productKitchen: 1,
        img: null
    })
    const [itemName, setItemName] = React.useState([]);

    function getStyles(name, itemName, theme) {
        return {
            fontWeight:
                itemName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setItemName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        setProductData({
            ...productData,
            productInventory: itemName.map(item => {
                return {
                    item,
                    quantity: 1
                }
            })
        })

    }, [itemName])

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
        else if (event.target.name === "productKitchen") {
            setProductData({ ...productData, productKitchen: event.target.value })
        }
        else if(event.target.name === "productImage") {
            setProductData({ ...productData, img: event.target.files[0] })
        }
    }


    const addProductHandler = () => {
        dispatch(uiActions.startLoading())

        dispatch(addNewProduct({
            name: productData.productName,
            price: productData.productPrice,
            description: productData.productDescription,
            image: productData.img,
            kitchen: productData.productKitchen,
            inventoryUsed: productData.productInventory,
        })).then(response => {
            if (!response.error) {
                dispatch(getAllProducts())
            }
            setProductData({
                productName: '',
                productPrice: 0,
                productInventory: [],
                productDescription: '',
                productKitchen: 1,
                img: null
            })
            dispatch(uiActions.stopLoading())
        })
    }

    const changeQuantityHandler = (ingredientData) => {
        const ingredientsArray = productData.productInventory.map(item => {
            if (item.item === ingredientData.id) {
                return {
                    ...item,
                    quantity: ingredientData.quantity
                }
            }
            else {
                return item
            }

        });

        setProductData({
            ...productData,
            productInventory: ingredientsArray
        })
    }

    return (
        <div className='tw-p-4 tw-grid tw-grid-cols-2 tw-gap-6 tw-w-full tw-mt-14 tw-ml-4'>
            <h1 className='tw-col-span-2 tw-text-2xl'>Add Product</h1>

            <TextField value={productData.productName} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="productName" label="Product Name" variant="outlined" />
            <TextField value={productData.productPrice} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="productPrice" label="Product Price" variant="outlined" />
            <TextField value={productData.productKitchen} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="productKitchen" label="Product Kitchen" variant="outlined" />
            <TextField value={productData.productDescription} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="productDescription" label="Product Description" variant="outlined" />

            <FormControl sx={{ m: 1, width: "100%" }} className='tw-col-span-2'>
                <InputLabel id="demo-multiple-name-label">Inventory Items</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={itemName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {inventory.map((item) => (
                        <MenuItem
                            key={item._id}
                            value={item._id}
                            style={getStyles(item, itemName, theme)}
                        >
                            {item.item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {productData.productInventory.map(inventory => <InventoryCard
                key={inventory.item}
                id={inventory.item}
                quantity={inventory.quantity}
                changeQuantityHandler={changeQuantityHandler}
            />)}
            <IconButton className='tw-col-span-2 tw-w-full tw-flex tw-items-center tw-gap-x-8 tw-rounded-none' color="primary" aria-label="upload picture" component="label">
                <h1>Image Upload</h1>
                <div>
                    <input hidden accept="image/*" type="file" name='productImage' onChange={changeHandler} />
                    <PhotoCamera />
                </div>
            </IconButton>
            <Button className='tw-col-span-2' variant="contained" component="label" onClick={addProductHandler}>Add Product</Button>
        </div>
    )
}
