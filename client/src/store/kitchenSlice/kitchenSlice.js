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
      toast.success(`Order sent to kitchen!`, {
        position: "bottom-left",
      });
    },
    prepareOrderWithId(state, action) {
      const orderId = action.payload;
      const order = state.orders.find((order) => order.orderId === orderId);
      order.orderStatus = true;
      toast.success(`Order marked as prepared!`, {
        position: "bottom-left",
      });
    },
  },
});

const kitchenActions = kitchenSlice.actions;

export { kitchenActions };

export default kitchenSlice;
