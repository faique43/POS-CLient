import React from 'react'

// MU
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard({ id, name, price, img, description }) {
    return (
        <Card sx={{ minWidth: 275 }} id={id}>
            <img src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' width='300' height='300' alt="name" />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                <Typography variant="h4">
                    Rs {price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' className='tw-w-full'>Add to Cart</Button>
            </CardActions>
        </Card>
    )
}
