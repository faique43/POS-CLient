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

    const sales = orders.reduce((accumulator, currentValue) => currentValue.totalPrice + accumulator, 1)
    return (
        <React.Fragment>
            <Title>Total Sales</Title>
            <Typography component="p" variant="h4">
                Rs {sales}
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