import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from 'axios';

// redux actions
import {uiActions} from '../uiSlice/uiSlice';

const initialState = {
  orders: [], // order: {orderName, orderItems, orderItemsCount, orderTotalPrice, orderTime, orderStatus, orderId, kitchen}
  currentOrderId: 0,
  isAnySelectedKitchen1: false,
  isAnySelectedKitchen2: false,
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
      const orderId = action.payload.orderId;
      const kitchen = action.payload.kitchen;

      
      if(kitchen === "1") {
        state.isAnySelectedKitchen2 = false;
        state.isAnySelectedKitchen1 = true;
      }
      else {
        state.isAnySelectedKitchen1 = false;
        state.isAnySelectedKitchen2 = true;
      }
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
  extraReducers: (builder) => {
    // create order
    builder.addCase(createOrder.pending, (state) => {

    })
    builder.addCase(createOrder.fulfilled, (state, action) => {
      toast.success('Order placed successfully!', {
        position: 'bottom-left'
      })
    })
    builder.addCase(createOrder.rejected, (state, action) => {
      toast.error('Order could not be placed!', {
        position: 'bottom-left'
      })
    })
  }
});

const kitchenActions = kitchenSlice.actions;

const createOrder = createAsyncThunk('kitchen/createOrder', async (orderData, {rejectWithValue}) => {
  console.log(orderData)
  try {
    const response = await axios.post("http://localhost:5000/api/orders", orderData);

    return response.data;
  }
  catch(error) {
    return rejectWithValue(error.response.data)
  }
})

export { 
  kitchenActions,
  createOrder
 };

export default kitchenSlice;
