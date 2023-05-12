import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

import {useSelector} from 'react-redux'

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    const orders = useSelector(state => state.kitchen.orders)

    const kitchen1Sales = orders.filter(order => order.products[0].product.kitchen === '1').reduce((accumulator, currentValue) => currentValue.totalPrice + accumulator, 1)
    const kitchen2Sales = orders.filter(order => order.products[0].product.kitchen === '2').reduce((accumulator, currentValue) => currentValue.totalPrice + accumulator, 1)
    return (
        <React.Fragment>
            <Title>Kitchen 1 Sales</Title>
            <Typography component="p" variant="h4">
                {kitchen1Sales.toLocaleString('en-US', {style: 'currency', currency: 'PKR'})}
            </Typography>
            <Title>Kitchen 2 Sales</Title>
            <Typography component="p" variant="h4">
                {kitchen2Sales.toLocaleString('en-US', {style: 'currency', currency: 'PKR'})}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {/* on 15 March, 2019 */}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    {/* View balance */}
                </Link>
            </div>
        </React.Fragment>
    );
}