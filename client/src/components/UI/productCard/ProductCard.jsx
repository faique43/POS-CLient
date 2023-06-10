import React from 'react'
import { useDispatch } from 'react-redux';

// redux actions
import { cartActions } from '../../../store/cartSlice/cartSlice';
import { productsActions } from '../../../store/productsSlice/productsSlice';

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
            // img: props.img,
            img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            description: props.description,
            kitchen: props.kitchen,
        }))
        // dispatch(productsActions.decrementStock(props.id))
    }

    return (
        <Card sx={{ minWidth: 275 }} id={props._id}>
            <img src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' width='300' height='300' alt="name" />
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
