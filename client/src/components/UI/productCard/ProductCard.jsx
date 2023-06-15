import React from 'react'
import { useDispatch } from 'react-redux';

// redux actions
import { cartActions } from '../../../store/cartSlice/cartSlice';

// MU
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard(props) {
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(cartActions.addToCart({
            id: props.id,
            name: props.name,
            price: props.price,
            img: props.img,
            description: props.description,
            kitchen: props.kitchen,
        }))
    }

    return (
        <Card sx={{ minWidth: 275 }} id={props._id}>
            <img src={props.img} width='300' height='300' alt="name" />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                </Typography>
                <Typography variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2">
                    {props.description}
                </Typography>
                <Typography variant="h4">
                    Rs {props.price}
                </Typography>
            </CardContent>
            <CardActions>
                {props.inInventory ? 
                <Button variant='contained' className='tw-w-full' onClick={() => {props.showDetailsHandler(props)}}>Show Details</Button> :
                <Button variant='contained' className='tw-w-full' onClick={addToCartHandler}>Add to Cart</Button>
                }
            </CardActions>
        </Card>
    )
}
