import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Title from './Title';

import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
    const [openAddSalaryModal, setOpenAddSalaryModal] = useState(false);

    const handleOpenSalaryModal = () => setOpenAddSalaryModal(true);
    const handleCloseSalaryModal = () => setOpenAddSalaryModal(false);

    return (
        <>
            <div className='tw-flex tw-flex-col tw-items-start tw-w-full'>
                <div className='tw-flex tw-items-center tw-justify-between tw-w-full'>
                    <Title>Salaries</Title>
                    <AddCircleIcon className='tw-cursor-pointer text-primary' onClick={handleOpenSalaryModal} />
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
            <Modal
                open={openAddSalaryModal}
                onClose={handleCloseSalaryModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "30%",
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <div className='tw-flex tw-flex-col tw-w-full tw-items-start tw-gap-y-2'>
                        <h1 className='tw-text-xl tw-font-semibold'>Add Salary</h1>
                        <TextField className='tw-w-full' id="outlined-basic" label="Employee" variant="outlined" />
                        <TextField className='tw-w-full' id="outlined-basic" label="Amount" variant="outlined" />
                        <Button className='tw-w-full' variant="contained">Add</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
