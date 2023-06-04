import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import { useSelector } from 'react-redux';


function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    const orders = useSelector(state => state.kitchen.orders)
    
    // const sorted = orders.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    // console.log(new Date(orders[0].created_at));

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{row.orderNumber}</TableCell>
                            <TableCell>{row.totalPrice}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{new Date(row.created_at).toLocaleString('en-US')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}