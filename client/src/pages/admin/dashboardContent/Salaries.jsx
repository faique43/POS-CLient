import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify';

import Title from './Title';

import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { addNewSalary, getAllSalaries, updateSalary } from '../../../store/salariesSlice/salariesSlice';
import {uiActions} from '../../../store/uiSlice/uiSlice';


export default function Salaries() {
    const dispatch = useDispatch();

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
        {
            renderCell: (params) => {
                return <Button variant="contained" disabled={params.row.paid} onClick={() => {
                    dispatch(uiActions.startLoading())
                    dispatch(updateSalary({
                        id: params.row._id,
                        paid: true
                    })).then(response => {
                        if(!response.error) {
                            dispatch(getAllSalaries()).then(response => {
                                dispatch(uiActions.stopLoading())
                            })
                        }
                        else {
                            dispatch(uiActions.stopLoading())
                        }
                    })
                }}>{params.row.paid ? "Paid" : "Mark as Paid"}</Button>
            },
            width: 290,
        }
    ];
    
    const salaries = useSelector(state => state.salaries.salaries);
    
    const [salaryData, setSalaryData] = useState({
        employee: '',
        amount: 0,
    })
    
    const inputChangeHandler = (event) => {
        setSalaryData({
            ...salaryData,
            [event.target.name]: event.target.value
        })
    }

    const [openAddSalaryModal, setOpenAddSalaryModal] = useState(false);

    const handleOpenSalaryModal = () => setOpenAddSalaryModal(true);
    const handleCloseSalaryModal = () => setOpenAddSalaryModal(false);

    const addNewSalaryHandler = () => {
        if(salaryData.employee === '' || salaryData.amount == 0 || salaryData.amount === '') {
            toast.warning('Please fill all the fields', {
                position: 'bottom-left'
            })
        }
        else {
            dispatch(uiActions.startLoading())
            dispatch(addNewSalary(salaryData)).then(response => {
                if(!response.error) {
                    setSalaryData({
                        employee: '',
                        amount: 0,
                    })
                    dispatch(getAllSalaries()).then(response => {
                        dispatch(uiActions.stopLoading())
                    })
                }
                else {
                    dispatch(uiActions.stopLoading())
                }
            })
        }
    }

    return (
        <>
            <div className='tw-flex tw-flex-col tw-items-start tw-w-full'>
                <div className='tw-flex tw-items-center tw-justify-between tw-w-full'>
                    <Title>Salaries</Title>
                    <AddCircleIcon className='tw-cursor-pointer text-primary' onClick={handleOpenSalaryModal} />
                </div>
                <div className='tw-w-full'>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={salaries}
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
                        <TextField name='employee' value={salaryData.employee} onChange={inputChangeHandler} className='tw-w-full' id="outlined-basic" label="Employee" variant="outlined" type='text' />
                        <TextField name='amount' value={salaryData.amount} onChange={inputChangeHandler} className='tw-w-full' id="outlined-basic" label="Amount" variant="outlined" type='number' />
                        <Button className='tw-w-full' variant="contained" onClick={addNewSalaryHandler}>Add</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}
