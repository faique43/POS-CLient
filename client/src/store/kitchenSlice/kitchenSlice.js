import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  orders: [], // order: {orderName, orderItems, orderItemsCount, orderTotalPrice, orderTime, orderStatus, orderId, kitchen}
  currentOrderId: 0,
  isAnySelected: false,
  selectedOrder: {
    orderId: "",
    orderName: "",
    orderItems: [],
    orderItemsCount: 0,
    orderTotalPrice: 0,
    orderTime: "",
    orderStatus: false,
    kitchen: "",
  }
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
    setSelectedOrder(state, action) {
      const orderId = action.payload;

      state.isAnySelected = true;
      const selectedOrder = state.orders.find(order => order.orderId === orderId)
      state.selectedOrder = selectedOrder
    },
    prepareOrderWithId(state, action) {
      const orderId = action.payload;
      const order = state.orders.find((order) => order.orderId === orderId);
      order.orderStatus = true;
      toast.success(`Order marked as prepared!`, {
        position: "bottom-left",
      });
      state.selectedOrder.orderStatus = true
    },
  },
});

const kitchenActions = kitchenSlice.actions;

export { kitchenActions };

export default kitchenSlice;
