import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { getLayerInventory, approveRequestedInventoryItem, getRequestedInventoryItems } from '../../../store/inventorySlice/inventorySlice';
import { uiActions } from '../../../store/uiSlice/uiSlice';

// MUI
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ApproveLayerInventory() {
    const dispatch = useDispatch();
    const requestedInventoryItems = useSelector(state => state.inventory.requestedInventoryItems).map(item => {
        return {
            ...item,
            id: item._id,
            date: new Date(item.dateRequested).toLocaleString(),
            name: item.inventoryItem.name,
            price: item.inventoryItem.price,
            units: item.inventoryItem.units,
        }
    });
    const role = useSelector(state => state.auth.role);
    const [openModal, setOpenModal] = useState(false);
    // const [inventoryId, setInventoryId] = useState('')

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'units', headerName: 'Unit', width: 100 },
        { field: 'date', headerName: 'Created At', width: 200 },
        {
            headerName: "Action", width: 180, renderCell: (params) => {
                return (
                    <div className='tw-flex tw-items-center tw-justify-between tw-w-full'>
                        <Button color='success' variant='contained' disabled={params.row.status === 'Approved'} onClick={() => {
                            approveInventoryHandler(params.row.id)
                        }}>Approve</Button>
                    </div>
                )
            }
        }
    ];

    const approveInventoryHandler = (requestId) => {
        dispatch(uiActions.startLoading());
        dispatch(approveRequestedInventoryItem({
            requestId,
            layer: role,
        })).then(response => {
            dispatch(getLayerInventory(role)).then(response => {
                dispatch(getRequestedInventoryItems(role)).then(response => {
                    dispatch(uiActions.stopLoading())
                })
            })
        })
        // .then(response => {
        //     if (!response.error) {
        //         dispatch(getLayerInventory(role === 'layer1' && "storeInventory")).then(response => {
        //             dispatch(uiActions.stopLoading())
        //         })
        //         return;
        //     }
        //     dispatch(uiActions.stopLoading())
        // })
    }

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <div className='tw-mt-14 tw-mx-4 tw-w-full'>
            <DataGrid
                rows={requestedInventoryItems}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
            {/* <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <div className='tw-flex tw-flex-col tw-items-center tw-w-full tw-gap-y-4'>
                        <TextField type='number' id="outlined-basic" label="Quantity" variant="outlined" value={requestInventoryData.quantity} onChange={(event) => {
                            setRequestInventoryData({
                                ...requestInventoryData,
                                quantity: event.target.value
                            })
                        }} fullWidth={true} />

                        <Button variant='contained' fullWidth={true} onClick={requestInventoryHandler}>Request</Button>
                    </div>
                </Box>
            </Modal> */}
        </div>
    )
}
