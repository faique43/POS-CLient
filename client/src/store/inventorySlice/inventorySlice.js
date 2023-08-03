import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
	inventory: [],
	layerInventory: [],
	prevLayerInventory: [],
	requestedInventoryItems: [],
	layerProducts: []
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
		builder.addCase(getLayerInventory.pending, (state) => {
			state.layerInventory = [];
		});
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
		builder.addCase(getPrevLayerInventory.pending, (state) => {
			state.prevLayerInventory = [];
		});
		builder.addCase(getPrevLayerInventory.fulfilled, (state, action) => {
			state.prevLayerInventory = action.payload;
		})
		builder.addCase(getPrevLayerInventory.rejected, (state, action) => {
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})

		// request inventory item
		builder.addCase(requestInventoryItem.pending, (state) => { });
		builder.addCase(requestInventoryItem.fulfilled, (state, action) => {
			toast.success(action.payload.msg, {
				position: "bottom-left"
			});
		})
		builder.addCase(requestInventoryItem.rejected, (state, action) => {
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})

		// get requested inventory items
		builder.addCase(getRequestedInventoryItems.pending, (state) => { });
		builder.addCase(getRequestedInventoryItems.fulfilled, (state, action) => {
			state.requestedInventoryItems = action.payload;
		})
		builder.addCase(getRequestedInventoryItems.rejected, (state, action) => {
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})

		// approve requested inventory item
		builder.addCase(approveRequestedInventoryItem.pending, (state) => { });
		builder.addCase(approveRequestedInventoryItem.fulfilled, (state, action) => {
			toast.success(action.payload.msg, {
				position: "bottom-left"
			});
		})
		builder.addCase(approveRequestedInventoryItem.rejected, (state, action) => {
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})

		// create layer product
		builder.addCase(createLayerProduct.pending, (state) => { });
		builder.addCase(createLayerProduct.fulfilled, (state, action) => {
			toast.success("Product Created!", {
				position: "bottom-left"
			});
		})
		builder.addCase(createLayerProduct.rejected, (state, action) => {
			toast.error(action.payload, {
				position: "bottom-left"
			});
		})

		// get layer products
		builder.addCase(getLayerProducts.pending, (state) => {
			state.layerProducts = [];
		});
		builder.addCase(getLayerProducts.fulfilled, (state, action) => {
			state.layerProducts = action.payload;
		})
		builder.addCase(getLayerProducts.rejected, (state, action) => {
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
		const method = 'get'
		const response = await axios({
			method: method,
			url: `http://localhost:5000/api/${layer === 'layer1' ? 'storeInventory' : layer === 'layer2' ? 'layerInventory' : 'quarterInventory'}`
		});

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const deleteLayerInventory = createAsyncThunk('inventory/deleteLayerInventory', async ({ inventoryId, layer }, { rejectWithValue }) => {
	try {
		const response = await axios.delete(`http://localhost:5000/api/${layer === 'layer1' ? 'storeInventory' : layer === 'layer2' ? 'layerInventory' : layer === 'layer3' ? 'quarterInventory' : 'inventory'}/${inventoryId}`);

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const getPrevLayerInventory = createAsyncThunk('inventory/getPrevLayerInventory', async (layer, { rejectWithValue }) => {
	try {
		const method = 'get';
		const response = await axios({
			method: method,
			url: `http://localhost:5000/api/${layer === 'layer2' ? 'storeInventory' : layer === 'layer3' ? 'layerProduct' : 'quarterProduct'}`
		});

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const requestInventoryItem = createAsyncThunk('inventory/requestInventoryItem', async ({ requestInventoryData, layer }, { rejectWithValue }) => {
	try {
		const response = await axios.post(`http://localhost:5000/api/${layer === 'layer2' ? 'requests' : layer === 'layer3' ? 'requestsLayer' : 'requestsQuarter'}`, requestInventoryData);

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const getRequestedInventoryItems = createAsyncThunk('inventory/getRequestedInventoryItems', async (layer, { rejectWithValue }) => {
	try {
		const response = await axios.get(`http://localhost:5000/api/${layer === 'layer1' ? 'requests' : layer === 'layer2' ? 'requestsLayer' : 'requestsQuarter'}`);

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const approveRequestedInventoryItem = createAsyncThunk('inventory/approveRequestedInventoryItem', async ({ requestId, layer }, { rejectWithValue }) => {
	try {
		const response = await axios.put(`http://localhost:5000/api/${layer === 'layer1' ? 'requests' : layer === 'layer2' ? 'requestsLayer' : 'requestsQuarter'}/approve/${requestId}`);

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const createLayerProduct = createAsyncThunk('inventory/createLayerProduct', async ({ layerProductData, role }, { rejectWithValue }) => {
	try {
		const response = await axios.post(`http://localhost:5000/api/${role === 'layer2' ? 'layerProduct' : "quarterProduct"}`, layerProductData);

		return response.data;
	}
	catch (error) {
		return rejectWithValue(error.response.data)
	}
})

const getLayerProducts = createAsyncThunk('inventory/getLayerProducts', async ({ role }, { rejectWithValue }) => {
	try {
		const response = await axios.get(`http://localhost:5000/api/${role === 'layer2' ? 'layerProduct' : 'quarterProduct'}`);

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
	requestInventoryItem,
	getRequestedInventoryItems,
	approveRequestedInventoryItem,
	createLayerProduct,
	getLayerProducts,
};

export default inventorySlice;
