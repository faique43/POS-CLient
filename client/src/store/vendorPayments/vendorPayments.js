import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    vendorPayments: [],
}

const vendorPaymentsSlice = createSlice({
    name: 'vendorPayments',
    initialState,
    extraReducers: (builder) => {
        // add new payment
        builder.addCase(addNewPayment.pending, (state) => {
        })
        builder.addCase(addNewPayment.fulfilled, (state, action) => {
            toast.success('Vendor Payment added successfully!', {
                position: 'bottom-left'
            })
        })
        builder.addCase(addNewPayment.rejected, (state, action) => {
            toast.error('Vendor payment could not be added!', {
                position: 'bottom-left'
            })
        })

        // get vendor payments
        builder.addCase(getVendorPayments.pending, (state) => {
        })
        builder.addCase(getVendorPayments.fulfilled, (state, action) => {
            state.vendorPayments = action.payload;
            toast.success('Vendor Payments fetched successfully!', {
                position: 'bottom-left'
            })
        })
        builder.addCase(getVendorPayments.rejected, (state, action) => {
            toast.error('Vendor payments could not be fetched!', {
                position: 'bottom-left'
            })
        })

        // update payment
        builder.addCase(updatePayment.pending, (state) => {
        })
        builder.addCase(updatePayment.fulfilled, (state, action) => {
            toast.success('Payment updated successfully!', {
                position: 'bottom-left'
            })
        })
        builder.addCase(updatePayment.rejected, (state, action) => {
            toast.error('Payment could not be updated!', {
                position: 'bottom-left'
            })
        })
    }
})

const addNewPayment = createAsyncThunk('vendorPayments/addNewPayment', async (paymentData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/payment', paymentData);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const getVendorPayments = createAsyncThunk('vendorPayments/getVendorPayments', async (paymentData, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/payment');

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const updatePayment = createAsyncThunk('vendorPayments/updatePayment', async (paymentData, { rejectWithValue }) => {
    try {
        const response = await axios.put('http://localhost:5000/api/payment', paymentData);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export {
    addNewPayment,
    getVendorPayments,
    updatePayment,
}

export default vendorPaymentsSlice;