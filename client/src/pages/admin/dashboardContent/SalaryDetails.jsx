import React from 'react'
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function SalaryDetails() {
    return (
        <React.Fragment>
            <Title>Paid Salaries</Title>
            <Typography component="p" variant="h4">
                {/* {kitchen1Sales.toLocaleString('en-US', { style: 'currency', currency: 'PKR' })} */}
            </Typography>
            <Title>Unpaid Salaries</Title>
            <Typography component="p" variant="h4">
                {/* {kitchen2Sales.toLocaleString('en-US', { style: 'currency', currency: 'PKR' })} */}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {/* on 15 March, 2019 */}
            </Typography>
        </React.Fragment>
    )
}
