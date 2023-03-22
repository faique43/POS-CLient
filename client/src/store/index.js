import { configureStore } from "@reduxjs/toolkit";

// slices
import productsSlice from "./productsSlice/productsSlice";
// slices

const store = configureStore({
    reducer: {
        products: productsSlice.reducer
    }
})

export default store;