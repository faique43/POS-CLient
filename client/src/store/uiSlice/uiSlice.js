import {
    createSlice
} from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState: {
        loading: false
    },
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        }
    }
})

const uiActions = uiSlice.actions;

export {
    uiActions
}

export default uiSlice;