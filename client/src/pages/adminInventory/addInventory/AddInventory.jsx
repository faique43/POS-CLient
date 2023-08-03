import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// redux
import { getLayerInventory, requestInventoryItem } from '../../../store/inventorySlice/inventorySlice';
import { uiActions } from '../../../store/uiSlice/uiSlice';

// MUI
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function AddInventory() {
    const dispatch = useDispatch();
    const prevLayerInventory = useSelector(state => state.inventory.prevLayerInventory).map(item => {
        return {
            ...item,
            id: item._id,
            date: new Date(item.date).toLocaleString(),
        }
    });
    const role = useSelector(state => state.auth.role);
    const [openModal, setOpenModal] = useState(false);
    const [requestInventoryData, setRequestInventoryData] = useState({
        inventoryItem: '',
        quantity: '',
        layer: role === 'layer3' ? '2' : '1'
    })

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
                        {/* <Button variant='contained'>Edit</Button> */}
                        <Button variant='contained' onClick={() => {
                            setRequestInventoryData({
                                ...requestInventoryData,
                                inventoryItem: params.row.id
                            })
                            handleOpenModal();
                        }}>Request</Button>
                    </div>
                )
            }
        }
    ];

    const requestInventoryHandler = () => {
        dispatch(uiActions.startLoading());
        dispatch(requestInventoryItem({requestInventoryData, layer: "layer4"})).then(response => {
            dispatch(getLayerInventory(role)).then(response => {
                dispatch(uiActions.stopLoading())
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
                rows={prevLayerInventory}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
            <Modal
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
            </Modal>
        </div>
    )
}
