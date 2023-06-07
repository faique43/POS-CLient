import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Title from './Title';

import { useSelector } from 'react-redux';

import Deposits from './Deposits';
import Orders from './Orders';
import SalaryDetails from './SalaryDetails';
import Salaries from './Salaries';
import VendorPayments from './VendorPayments';
import VendorPaymentDetails from './VendorPaymentDetails';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function DashboardContent() {
    const inventory = useSelector(state => state.inventory.inventory)
    const orders = useSelector(state => state.kitchen.orders)

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Inventory */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper
                            sx={{
                                p: 2,
                                height: 240,
                            }}

                        >
                            <Title>Worth of Remaining Inventory</Title>
                            <Typography component="p" variant="h4">
                                {inventory.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.price), 1).toLocaleString('en-US', { style: 'currency', currency: 'PKR' })}
                            </Typography>
                            <Title>Total Sales</Title>
                            <Typography component="p" variant="h4">
                                {orders.reduce((accumulator, currentValue) => currentValue.totalPrice + accumulator, 1).toLocaleString('en-US', { style: 'currency', currency: 'PKR' })}
                            </Typography>
                            {/* <Chart /> */}
                        </Paper>
                    </Grid>

                    {/* Recent Deposits */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Deposits />
                        </Paper>
                    </Grid>

                    {/* salary details */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <SalaryDetails />
                        </Paper>
                    </Grid>

                    {/* vendor payment details */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <VendorPaymentDetails />
                        </Paper>
                    </Grid>

                    {/* Recent Orders */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Orders />
                        </Paper>
                    </Grid>

                    {/* Salaries */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Salaries />
                        </Paper>
                    </Grid>

                    {/* Vendor payments */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <VendorPayments />
                        </Paper>
                    </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>
    );
}