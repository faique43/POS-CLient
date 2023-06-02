import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    printingReceipt: false
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        startPrintingReceipt(state) {
            state.printingReceipt = true
        },
        stopPrintingReceipt(state) {
            state.printingReceipt = false
        }
    }
})

const globalActions = globalSlice.actions;

export {
    globalActions
}

export default globalSlice;