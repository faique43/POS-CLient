import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    salaries: [],
}

const salariesSlice = createSlice({
    name: 'salaries',
    initialState,
    extraReducers: (builder) => {
        // get all salaries
        builder.addCase(getAllSalaries.pending, (state, action) => {
        })
        builder.addCase(getAllSalaries.fulfilled, (state, action) => {
            state.salaries = action.payload;
            toast.success('Salaries fetched successfully', {
                position: 'bottom-left'
            });
        })
        builder.addCase(getAllSalaries.rejected, (state, action) => {
            toast.error(action.payload.message);
        })
    }
})

const getAllSalaries = createAsyncThunk('salaries/getAllSalaries', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/salary');

        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export {
    getAllSalaries
}

export default salariesSlice;