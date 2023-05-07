import { configureStore } from "@reduxjs/toolkit";

// slices
import productsSlice from "./productsSlice/productsSlice";
import cartSlice from "./cartSlice/cartSlice";
import uiSlice from "./uiSlice/uiSlice";
import kitchenSlice from "./kitchenSlice/kitchenSlice";
import inventorySlice from "./inventorySlice/inventorySlice";
// slices

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer,
        ui: uiSlice.reducer,
        kitchen: kitchenSlice.reducer,
        inventory: inventorySlice.reducer,
    }
})

export default store;