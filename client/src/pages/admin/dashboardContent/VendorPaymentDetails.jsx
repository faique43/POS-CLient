import React from 'react'
import { useSelector } from 'react-redux';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

export default function SalaryDetails() {
    const vendorPayments = useSelector(state => state.vendorPayments.vendorPayments);
    
    return (
        <React.Fragment>
            <Title>Paid Vendor Payments</Title>
            <Typography component="p" variant="h4">
                {vendorPayments.reduce((total, currentSalary) => {
                    if(currentSalary.paid) {
                        return total + currentSalary.amount;
                    }
                    return total;
                }, 0).toLocaleString('en-US', { style: 'currency', currency: 'PKR' })}
            </Typography>
            <Title>Unpaid Vendor Payments</Title>
            <Typography component="p" variant="h4">
                {vendorPayments.reduce((total, currentSalary) => {
                    if(!currentSalary.paid) {
                        return total + currentSalary.amount;
                    }
                    return total;
                }, 0).toLocaleString('en-US', { style: 'currency', currency: 'PKR' })}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {/* on 15 March, 2019 */}
            </Typography>
        </React.Fragment>
    )
}
