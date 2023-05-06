import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

// actions
import { uiActions } from "../uiSlice/uiSlice";

const initialState = {
    inventory: []
}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // get inventory
        builder.addCase(getInventory.pending, (state) => {
            // 
        })
        builder.addCase(getInventory.fulfilled, (state, action) => {
            // console.log(action.payload);
            state.inventory = action.payload;
            toast.success("Latest inventory fetched", {
                position: 'bottom-left'
            })
        })
        builder.addCase(getInventory.rejected, (state) => {
            // 
        })
    }
})

const getInventory = createAsyncThunk('inventory/getInventory', async (dispatch, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:5000/api/inventory")
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const inventoryActions = inventorySlice.actions;

export {
    inventoryActions,
    getInventory,
}

export default inventorySlice;