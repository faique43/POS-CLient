import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

// Actions
import { uiActions } from "../uiSlice/uiSlice";

const initialState = {
  products: [],
  totalStocks: 110,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    decrementStock(state, action) {
      const productQuantityToBeUpdated = state.products.find(
        (product) => product.id === action.payload
      );

      if (productQuantityToBeUpdated.quantity > 0) {
        productQuantityToBeUpdated.quantity--;
        state.totalStocks--;
        if (productQuantityToBeUpdated.quantity < 5) {
          toast.warn(
            `${productQuantityToBeUpdated.name}'s stocks are low Items remaining: ${productQuantityToBeUpdated.quantity}`,
            {
              position: "bottom-left",
            }
          );
        }
      }
    },
    incrementStock(state, action) {
      const productQuantityToBeUpdated = state.products.find(
        (product) => product.id === action.payload
      );
      productQuantityToBeUpdated.quantity++;
      state.totalStocks++;
    },
    checkProductStocks(state, action) {},
    addNewProduct(state, action) {
      const id = state.products[state.products.length - 1].id + 1;
      state.products = [
        ...state.products,
        {
          name: action.payload.productName,
          price: action.payload.productPrice,
          quantity: action.payload.productQuantity,
          description: action.payload.productDescription,
          img: action.payload.img,
          id,
        },
      ];

      toast.success(`${action.payload.productName} added successfully!`, {
        position: "bottom-left",
      });
    },
  },
  extraReducers: (builder) => {
    // get all products
    builder.addCase(getAllProducts.pending, (state, action) => {
      //
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.products = action.payload
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      toast.error(`${action.error.message}`, {
        position: "bottom-left",
      });
    });
  },
});

const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (dispatch, { rejectWithValue }) => {
    dispatch(uiActions.startLoading());
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      dispatch(uiActions.stopLoading());
      return response.data;
    } catch (error) {
      dispatch(uiActions.stopLoading());
      return rejectWithValue(error.response.data);
    }
  }
);

const productsActions = productsSlice.actions;

export { productsActions, getAllProducts };

export default productsSlice;
