import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	inventory: [],
	layerInventory: [],
	prevLayerInventory: [],
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

		// add layer inventory
		builder.addCase(addLayerInventory.pending, (state) => { });
		builder.addCase(addLayerInventory.fulfilled, (state, action) => {
			toast.success("Raw Inventory added successfully!", {
				position: "bottom-left"
			});
		})
		builder.addCase(addLayerInventory.rejected, (state, action) => {
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})

		// get layer inventory
		builder.addCase(getLayerInventory.pending, (state) => { });
		builder.addCase(getLayerInventory.fulfilled, (state, action) => {
			state.layerInventory = action.payload;
		})
		builder.addCase(getLayerInventory.rejected, (state, action) => {
			console.log(action.payload);
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})

		// delete raw inventory
		builder.addCase(deleteLayerInventory.pending, (state) => { });
		builder.addCase(deleteLayerInventory.fulfilled, (state, action) => {
			toast.success(action.payload.msg, {
				position: "bottom-left"
			});
		})
		builder.addCase(deleteLayerInventory.rejected, (state, action) => {
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})

		// get prev layer inventory
		builder.addCase(getPrevLayerInventory.pending, (state) => { });
		builder.addCase(getPrevLayerInventory.fulfilled, (state, action) => {
			state.prevLayerInventory = action.payload;
		})
		builder.addCase(getPrevLayerInventory.rejected, (state, action) => {
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

const addLayerInventory = createAsyncThunk('inventory/addLayerInventory', async (inventoryData, { rejectWithValue }) => {
	try {
		const response = await axios.post('http://localhost:5000/api/storeInventory', inventoryData);

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const getLayerInventory = createAsyncThunk('inventory/getLayerInventory', async (layer, { rejectWithValue }) => {
	try {
		const response = await axios.get(`http://localhost:5000/api/${layer}`);

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const deleteLayerInventory = createAsyncThunk('inventory/deleteLayerInventory', async ({ inventoryId, inventory }, { rejectWithValue }) => {
	try {
		const response = await axios.delete(`http://localhost:5000/api/${inventory}/${inventoryId}`);

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const getPrevLayerInventory = createAsyncThunk('inventory/getPrevLayerInventory', async (prevLayer, { rejectWithValue }) => {
	try {
		const response = await axios.get(`http://localhost:5000/api/${prevLayer}`);

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
	addLayerInventory,
	getLayerInventory,
	deleteLayerInventory,
	getPrevLayerInventory,
};

export default inventorySlice;
