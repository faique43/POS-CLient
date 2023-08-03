import * as React from 'react';
import { useSelector } from 'react-redux';

// MU
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { 
        field: 'id', 
        headerName: 'ID', 
        width: 250,
    },
    { 
        field: 'item', 
        headerName: 'Item name', 
        width: 200,
    },
    { 
        field: 'price', 
        headerName: 'Price', 
        width: 150,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 100,
    },
    {
        field: 'created_at',
        headerName: "Data Added",
        width: 150,
    },
];

export default function Inventory() {
    const inventory = useSelector(state => state.inventory.inventory)

    const rows = inventory.map(item => {
        return {
            id: item._id,
            item: item.item.name,
            price: item.price,
            quantity: item.quantity,
            created_at: new Date(item.created_at).toLocaleDateString(),
        }
    })

    return (
        <div className='tw-mt-14 tw-mx-4' style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                getRowClassName={(params) => {
                    // console.log(params.row.quantity);
                    return params.row.quantity <= 100 ? 'tw-bg-red-300' : "";
                }}
            />
        </div>
    );
}
