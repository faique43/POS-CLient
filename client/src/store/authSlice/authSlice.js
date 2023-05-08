import {
    createSlice
} from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    username: '',
    password: '',
    isAdmin: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        // authenticate user
    }
})


export default authSlice;