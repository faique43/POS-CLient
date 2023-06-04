import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Title from './Title';

import { DataGrid } from '@mui/x-data-grid';

const columns = [
    {
        field: 'employee',
        headerName: 'Employee',
        width: 190,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        width: 190,
    },
    {
        field: 'paid',
        headerName: 'Paid',
        width: 190,
    },
];

const rows = [
    { id: 1, employee: 'Snow', amount: 35, paid: true },
    { id: 2, employee: 'Lannister', amount: 42, paid: false },
    { id: 3, employee: 'Lannister', amount: 45, paid: true },
    { id: 4, employee: 'Stark', amount: 16, paid: true },
];

export default function Salaries() {
    return (
        <div className='tw-flex tw-flex-col tw-items-start tw-w-full'>
            <div className='tw-flex tw-items-center tw-justify-between tw-w-full'>
                <Title>Salaries</Title>
                <AddCircleIcon className='tw-cursor-pointer text-primary' />
            </div>
            <div className='tw-w-full'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    )
}
