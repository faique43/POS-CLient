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
        })
        builder.addCase(getAllSalaries.rejected, (state, action) => {
            toast.error(action.payload.message);
        })

        // add new salary
        builder.addCase(addNewSalary.pending, (state, action) => {
        })
        builder.addCase(addNewSalary.fulfilled, (state, action) => {
            toast.success('Salary added successfully', {
                position: 'bottom-left'
            });
        })
        builder.addCase(addNewSalary.rejected, (state, action) => {
            toast.error(action.payload.message, {
                position: 'bottom-left'
            });
        })

        // update salary
        builder.addCase(updateSalary.pending, (state, action) => {
        })
        builder.addCase(updateSalary.fulfilled, (state, action) => {
            toast.success('Salary paid successfully', {
                position: 'bottom-left'
            });
        })
        builder.addCase(updateSalary.rejected, (state, action) => {
            toast.error(action.payload.message, {
                position: 'bottom-left'
            });
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

const addNewSalary = createAsyncThunk('salaries/addNewSalary', async (salaryData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/salary', salaryData);

        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const updateSalary = createAsyncThunk('salaries/updateSalary', async (salaryData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/salary/${salaryData.id}`, {paid: salaryData.paid});

        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export {
    getAllSalaries,
    addNewSalary,
    updateSalary,
}

export default salariesSlice;