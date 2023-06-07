import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  inventory: []
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get inventory
    builder.addCase(getInventory.pending, (state) => {
      //
    });
    builder.addCase(getInventory.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.inventory = action.payload;
      toast.success("Latest inventory fetched", {
        position: "bottom-left"
      });
    });
    builder.addCase(getInventory.rejected, (state) => {
      //
    });

    // add inventory
    builder.addCase(addInventory.pending, (state) => {});
    builder.addCase(addInventory.fulfilled, (state, action) => {
      toast.success("Inventory added successfully!", {
        position: "bottom-left"
      });
    });
    builder.addCase(addInventory.rejected, (state, action) => {
      console.log(action.payload);
      toast.error("Inventory could not be added!", {
        position: "bottom-left"
      });
    });
  }
});

const getInventory = createAsyncThunk(
  "inventory/getInventory",
  async (dispatch, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://143.110.241.175:5000/api/inventory")
        return response.data;
    }
    catch(error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const addInventory = createAsyncThunk(
  "inventory/addNewInventory",
  async (inventoryData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://143.110.241.175:5000/api/inventory', inventoryData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const inventoryActions = inventorySlice.actions;

export { inventoryActions, getInventory, addInventory };

export default inventorySlice;
