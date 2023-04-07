import { createSlice } from "@reduxjs/toolkit";
import {
  toast
} from 'react-toastify';

const initialState = {
  orders: [] // order: {orderName, orderItems, orderItemsCount, orderTotalPrice, orderTime, orderStatus}
}

const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState,
  reducers: {
    placeOrder(state, action) {
      state.orders = [...state.orders, action.payload]
    }
  }
})

const kitchenActions = kitchenSlice.actions;

export {
  kitchenActions
}

export default kitchenSlice;