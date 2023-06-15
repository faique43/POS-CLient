import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    expanses: [],
}

const expansesSlice = createSlice({
    name: 'expanses',
    initialState,
    extraReducers: (builder) => {
        // add new expanse
        builder.addCase(addNewExpanse.pending, (state) => {
        })
        builder.addCase(addNewExpanse.fulfilled, (state, action) => {
            toast.success('New expanse added successfully!', {
                position: 'bottom-left'
            })
        })
        builder.addCase(addNewExpanse.rejected, (state, action) => {
            toast.error('New expanse could not be added!', {
                position: 'bottom-left'
            })
        })

        // get expanses
        builder.addCase(getAllExpanses.pending, (state) => {
        })
        builder.addCase(getAllExpanses.fulfilled, (state, action) => {
            state.expanses = action.payload;
        })
        builder.addCase(getAllExpanses.rejected, (state, action) => {
            toast.error('Expanses could not be fetched!', {
                position: 'bottom-left'
            })
        })

        // update expanse
        builder.addCase(updateExpanse.pending, (state) => {
        })
        builder.addCase(updateExpanse.fulfilled, (state, action) => {
            toast.success('Expanse updated successfully!', {
                position: 'bottom-left'
            })
        })
        builder.addCase(updateExpanse.rejected, (state, action) => {
            toast.error('Expanse could not be updated!', {
                position: 'bottom-left'
            })
        })
    }
})

const addNewExpanse = createAsyncThunk('expanses/addNewExpanse', async (expanseData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/expanses', expanseData);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const getAllExpanses = createAsyncThunk('expanses/getAllExpanses', async (expanseData, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/expanses');

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const updateExpanse = createAsyncThunk('expanses/updateExpanse', async (expanseData, { rejectWithValue }) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/expanses/${expanseData.id}`, {
            paid: expanseData.paid,
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export {
    addNewExpanse,
    getAllExpanses,
    updateExpanse,
}

export default expansesSlice;