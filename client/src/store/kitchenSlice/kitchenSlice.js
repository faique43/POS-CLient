import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  orders: [], // order: {orderName, orderItems, orderItemsCount, orderTotalPrice, orderTime, orderStatus, orderId}
  currentOrderId: 0,
};

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState,
  reducers: {
    placeOrder(state, action) {
      const orderId = state.currentOrderId + 1;
      state.currentOrderId++;
      state.orders = [...state.orders, { ...action.payload, orderId }];
    },
    prepareOrderWithId(state, action) {
      console.log(action.payload);
    },
  },
});

const kitchenActions = kitchenSlice.actions;

export { kitchenActions };

export default kitchenSlice;
