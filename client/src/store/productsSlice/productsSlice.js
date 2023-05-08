import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

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
        (product) => product._id === action.payload
      );

      if (productQuantityToBeUpdated.stock > 0) {
        productQuantityToBeUpdated.stock--;
        state.totalStocks--;
        if (productQuantityToBeUpdated.stock < 5) {
          toast.warn(
            `${productQuantityToBeUpdated.name}'s stocks are low Items remaining: ${productQuantityToBeUpdated.stock}`,
            {
              position: "bottom-left",
            }
          );
        }
      }
    },
    incrementStock(state, action) {
      const productQuantityToBeUpdated = state.products.find(
        (product) => product._id === action.payload
      );
      productQuantityToBeUpdated.stock++;
      state.totalStocks++;
    },
    checkProductStocks(state, action) { },
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
      state.products = action.payload;
      toast.success("All products fetched successfully!", {
        position: "bottom-left"
      })
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      toast.error(`${action.error.message}`, {
        position: "bottom-left",
      });
    });

    // add new product
    builder.addCase(addNewProduct.pending, (state) => {
      // 
    })
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      toast.success('New product added successfully!', {
        position: "bottom-left"
      })
    })
    builder.addCase(addNewProduct.rejected, (state, action) => {
      toast.error('New product could not be added successfully!', {
        position: "bottom-left"
      })

    })
  },
});

const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (dispatch, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addNewProduct = createAsyncThunk('product/addNewProduct', async (productData, {rejectWithValue}) => {
  console.log(productData);
  try {
    const response = await axios.post('http://localhost:5000/api/products', productData)

    return response.data;
  }
  catch(error) {
    return rejectWithValue(error.response.data);
  }
})

const productsActions = productsSlice.actions;

export { 
  productsActions,
  getAllProducts,
  addNewProduct
};

export default productsSlice;
