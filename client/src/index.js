import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store/index";
import App from "./App";

// auth
import Login from "./pages/auth/Login";

// client
import Kitchen1 from "./pages/client/kitchen/Kitchen1";
import Kitchen2 from "./pages/client/kitchen/Kitchen2";
import Kitchen1Home from "./pages/client/Home/Kitchen1Home";
import Kitchen2Home from "./pages/client/Home/Kitchen2Home";
import Client from "./pages/client/Client";

// admin components
import Admin from "./pages/admin/Admin";
import Orders from './pages/admin/orders/Orders'
import AddProduct from "./pages/admin/addProduct/AddProduct";
import Inventory from "./pages/admin/inventory/Inventory";

// inventory Admin
import AdminInventory from "./pages/adminInventory/AdminInventory";
import AddInventory from "./pages/adminInventory/addInventory/AddInventory";

// layer
import Layer from "./pages/layer/Layer";
import CreateItem from "./pages/layer/createItem/CreateItem";
import ApproveLayerRequest from "./pages/layer/approveLayerRequest/ApproveLayerRequest";
import RequestLayerInventory from "./pages/layer/requestLayerInventory/RequestLayerInventory";
import LayerInventory from "./pages/layer/layerInventory/LayerInventory";
import AddLayerInventory from "./pages/layer/addLayerInventory/AddLayerInventory";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: "admin",
				element: <Admin />,
				children: [
					{ path: 'orders', element: <Orders /> },
					{ path: 'addProduct', element: <AddProduct /> },
					{ path: 'inventory', element: <Inventory /> },
				]
			},
			{
				path: "client",
				element: <Client />,
				children: [
					{ path: "kitchen1home", element: <Kitchen1Home /> },
					{ path: "kitchen2home", element: <Kitchen2Home /> },
					{ path: "kitchen1", element: <Kitchen1 /> },
					{ path: "kitchen2", element: <Kitchen2 /> },
				]
			},
			{
				path: 'inventoryAdmin',
				element: <AdminInventory />,
				children: [
					{ path: 'addInventory', element: <AddInventory /> },
					{ path: 'inventory', element: <Inventory /> }
				]
			},
			{
				path: 'layer',
				element: <Layer />,
				children: [
					{ path: 'createItem', element: <CreateItem /> },
					{ path: 'addLayerInventory', element: <AddLayerInventory /> },
					{ path: 'approveLayerRequest', element: <ApproveLayerRequest /> },
					{ path: 'requestLayerInventory', element: <RequestLayerInventory /> },
					{ path: 'layerInventory', element: <LayerInventory /> },
				]
			}
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
	// </React.StrictMode>
);
