import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// redux 
import { uiActions } from '../../../store/uiSlice/uiSlice';
import { createLayerProduct, getLayerProducts, getLayerInventory, getPrevLayerInventory } from '../../../store/inventorySlice/inventorySlice';

// components
import InventoryCard from '../../../components/UI/inventoryCard/InventoryCard';

// MU
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';

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

export default function CreateProduct() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const inventory = useSelector(state => state.inventory.layerInventory);


    const role = useSelector(state => state.auth.role);

    const [inventoryData, setInventoryData] = useState({
        item: '',
        quantity: '',
        price: '',
        unit: '',
        inventoryUsed: []
    })
    const [itemName, setItemName] = React.useState([]);

    React.useEffect(() => {
        setInventoryData({
            ...inventoryData,
            inventoryUsed: itemName.map(item => {
                return {
                    item,
                    quantity: 1
                }
            })
        })

    }, [itemName])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setItemName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const changeQuantityHandler = (ingredientData) => {
        const ingredientsArray = inventoryData.inventoryUsed.map(item => {
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

        setInventoryData({
            ...inventoryData,
            inventoryUsed: ingredientsArray
        })
    }

    function getStyles(name, itemName, theme) {
        return {
            fontWeight:
                itemName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

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
        else if (event.target.name === 'unit') {
            setInventoryData({
                ...inventoryData,
                unit: event.target.value
            })
        }
    }

    const addInventoryHandler = () => {
        dispatch(uiActions.startLoading());
        dispatch(createLayerProduct({
            layerProductData: {
                ...inventoryData,
                name: inventoryData.item,
                units: inventoryData.unit,
            },
            role
        })).then(response => {
            setInventoryData({
                item: '',
                quantity: '',
                price: '',
                unit: '',
                inventoryUsed: []
            })
            if (!response.error) {
                dispatch(getLayerProducts({ role })).then(reponse => {
                    dispatch(getLayerInventory(role)).then(response => {
                        dispatch(getPrevLayerInventory(role)).then(response => {
                            dispatch(uiActions.stopLoading())
                        })
                    })
                })
            }
            else {
                dispatch(uiActions.stopLoading())
            }
        })
    }

    return (
        <div className='tw-p-4 tw-grid tw-grid-cols-2 tw-gap-6 tw-w-full tw-mt-14 tw-ml-4'>
            <h1 className='tw-col-span-2 tw-text-2xl'>Create Product</h1>

            <TextField value={inventoryData.item} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="item" label="Name" variant="outlined" />
            <TextField value={inventoryData.quantity} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="quantity" label="Quantity" variant="outlined" />
            <TextField value={inventoryData.price} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="price" label="Price" variant="outlined" />
            <TextField value={inventoryData.unit} className='tw-w-full' id="outlined-basic" onChange={changeHandler} name="unit" label="Unit" variant="outlined" />
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
                    {inventory.map((name) => (
                        <MenuItem
                            key={name._id}
                            value={name._id}
                            style={getStyles(name, itemName, theme)}
                        >
                            {name.item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {inventoryData.inventoryUsed.length > 0 && inventoryData.inventoryUsed.map(inventory => <InventoryCard
                key={inventory.item}
                id={inventory.item}
                quantity={inventory.quantity}
                inLayer={true}
                changeQuantityHandler={changeQuantityHandler}
            />)}

            <Button className='tw-col-span-2' variant="contained" component="label" onClick={addInventoryHandler}>Create Product</Button>
        </div>
    )
}
