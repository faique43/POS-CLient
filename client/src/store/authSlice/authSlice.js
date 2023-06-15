import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import axios from 'axios';

const initialState = {
    username: '',
    password: '',
    isAdmin: false,
    isAuthenticated: false,
    isInventoryAdmin: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.isInventoryAdmin = false;
            state.username = '';
            state.password = '';
            toast.success('logged out successfully!', {
                position: 'bottom-left'
            })
        }
    },
    extraReducers: (builder) => {
        // authenticate user
        builder.addCase(loginUser.pending, (state) => {

        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isAdmin = false;
            state.username = action.payload.username;
            state.password = action.payload.password;

            toast.success('logged in successfully!', {
                position: 'bottom-left'
            })
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            toast.error(`${action.payload.msg}`, {
                position: 'bottom-left'
            })
        })

        // authenticate admin
        builder.addCase(loginAdmin.pending, (state) => {

        })
        builder.addCase(loginAdmin.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isAdmin = true;
            state.username = action.payload.username;
            state.password = action.payload.password;

            toast.success('logged in successfully!', {
                position: 'bottom-left'
            })
        })
        builder.addCase(loginAdmin.rejected, (state, action) => {
            toast.error(`${action.payload.msg}`, {
                position: 'bottom-left'
            })
        })

        // login inventory admin
        builder.addCase(loginInventoryAdmin.pending, (state) => {
        })
        builder.addCase(loginInventoryAdmin.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isInventoryAdmin = true;
            state.username = action.payload.username;
            state.password = action.payload.password;

            toast.success('logged in successfully!', {
                position: 'bottom-left'
            })
        })
        builder.addCase(loginInventoryAdmin.rejected, (state, action) => {
            toast.error(`${action.payload.msg}`, {
                position: 'bottom-left'
            })
        })
    }
})

const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/auth', userData)

        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const loginAdmin = createAsyncThunk('auth/loginAdmin', async (adminData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/auth', adminData)

        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const loginInventoryAdmin = createAsyncThunk('auth/loginInventoryAdmin', async (adminData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/users/auth', adminData)

        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const authActions = authSlice.actions;

export {
    loginUser,
    loginAdmin,
    authActions,
    loginInventoryAdmin,
}

export default authSlice;