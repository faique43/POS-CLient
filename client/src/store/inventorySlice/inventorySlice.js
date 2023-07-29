import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	inventory: [],
	rawInventory: []
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
		});
		builder.addCase(getInventory.rejected, (state) => {
			//
		});

		// add inventory
		builder.addCase(addInventory.pending, (state) => { });
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

		// add raw inventory
		builder.addCase(addRawInventory.pending, (state) => { });
		builder.addCase(addRawInventory.fulfilled, (state, action) => {
			toast.success("Raw Inventory added successfully!", {
				position: "bottom-left"
			});
		})
		builder.addCase(addRawInventory.rejected, (state, action) => {
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})

		// get raw inventory
		builder.addCase(getRawInventory.pending, (state) => { });
		builder.addCase(getRawInventory.fulfilled, (state, action) => {
			state.rawInventory = action.payload;
		})
		builder.addCase(getRawInventory.rejected, (state, action) => {
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})
	}
});

const getInventory = createAsyncThunk(
	"inventory/getInventory",
	async (dispatch, { rejectWithValue }) => {
		try {
			const response = await axios.get("http://localhost:5000/api/inventory")
			return response.data;
		}
		catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
);

const addInventory = createAsyncThunk(
	"inventory/addNewInventory",
	async (inventoryData, { rejectWithValue }) => {
		try {
			const response = await axios.post('http://localhost:5000/api/inventory', inventoryData);

			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const addRawInventory = createAsyncThunk('inventory/addRawInventory', async (rawInventoryData, { rejectWithValue }) => {
	try {
		const response = await axios.post('http://localhost:5000/api/storeInventory', rawInventoryData);

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const getRawInventory = createAsyncThunk('inventory/getRawInventory', async (rawInventoryData, { rejectWithValue }) => {
	try {
		const response = await axios.get('http://localhost:5000/api/storeInventory');

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const inventoryActions = inventorySlice.actions;

export {
	inventoryActions,
	getInventory,
	addInventory,
	addRawInventory,
	getRawInventory,
};

export default inventorySlice;
