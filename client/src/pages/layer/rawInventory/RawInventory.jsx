import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { deleteRawInventory, getRawInventory } from '../../../store/inventorySlice/inventorySlice';
import { uiActions } from '../../../store/uiSlice/uiSlice';

// MUI
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

export default function RawInventory() {
    const dispatch = useDispatch();
    const rawInventory = useSelector(state => state.inventory.rawInventory).map(item => {
        return {
            ...item,
            id: item._id,
            date: new Date(item.date).toLocaleString(),
        }
    });

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'units', headerName: 'Unit', width: 100 },
        { field: 'total', headerName: 'Total', width: 150 },
        { field: 'date', headerName: 'Created At', width: 200 },
        {
            headerName: "Action", width: 180, renderCell: (params) => {
                return (
                    <div className='tw-flex tw-items-center tw-justify-between tw-w-full'>
                        {/* <Button variant='contained'>Edit</Button> */}
                        <Button variant='contained' color='error' onClick={() => {
                            deleteRawInventoryHandler(params.row.id)
                        }}>Delete</Button>
                    </div>
                )
            }
        }
    ];

    const deleteRawInventoryHandler = (id) => {
        dispatch(uiActions.startLoading());
        dispatch(deleteRawInventory(id)).then(response => {
            if (!response.error) {
                dispatch(getRawInventory()).then(response => {
                    dispatch(uiActions.stopLoading())
                })
                return;
            }
            dispatch(uiActions.stopLoading())
        })
    }

    return (
        <div className='tw-mt-14 tw-mx-4 tw-w-full'>
            <DataGrid
                rows={rawInventory}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    )
}
