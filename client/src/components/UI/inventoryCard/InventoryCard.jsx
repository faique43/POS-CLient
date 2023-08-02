import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';

// MU
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function InventoryCard(props) {
    const inventory = useSelector(state => props.inLayer ? state.inventory.layerInventory : state.inventory.inventory)
    const [inventoryItemId, setInventoryItemId] = useState()

    const changeHandler = (event) => {
        props.changeQuantityHandler({
            id: props.id,
            quantity: event.target.value
        })
    }
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <TextField value={props.inLayer ? inventory.find(inventory => inventory._id === props.id).item.name : inventory.find(inventory => inventory._id === props.id).item} className='tw-w-full' id="outlined-basic" name="inventoryName" label="Inventory Name" variant="outlined" disabled/>
                <div className='tw-my-4'></div>
                <TextField value={props.quantity} className='tw-w-full' id="outlined-basic" name="inventoryQuantity" label="Inventory Quantity" variant="outlined" onChange={changeHandler} />
            </CardContent>
        </Card>
    )
}
