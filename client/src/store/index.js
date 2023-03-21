import { configureStore } from "@reduxjs/toolkit";

// slices
import productsSlice from "./productsSlice/productsSlice";
// slices

const store = configureStore({
    reducer: productsSlice.reducer
})

export default store;