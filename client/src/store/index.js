import { configureStore } from "@reduxjs/toolkit";

// slices
import productsSlice from "./productsSlice/productsSlice";
import cartSlice from "./cartSlice/cartSlice";
import uiSlice from "./uiSlice/uiSlice";
import kitchenSlice from "./kitchenSlice/kitchenSlice";
import inventorySlice from "./inventorySlice/inventorySlice";
import authSlice from "./authSlice/authSlice";
import globalSlice from "./global/globalSlice";
import salariesSlice from "./salariesSlice/salariesSlice";
// slices

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        cart: cartSlice.reducer,
        ui: uiSlice.reducer,
        kitchen: kitchenSlice.reducer,
        inventory: inventorySlice.reducer,
        auth: authSlice.reducer,
        global: globalSlice.reducer,
        salaries: salariesSlice.reducer
    }
})

export default store;