import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";  
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {

    }
})

const inventoryActions = inventorySlice.actions;

export {
    inventoryActions
}

export default inventorySlice;