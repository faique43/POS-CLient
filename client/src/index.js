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
import AddInventory from "./pages/admin/addInventory/AddInventory";

// inventory Admin
import AdminInventory from "./pages/adminInventory/AdminInventory";

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
					{ path: 'addInventory', element: <AddInventory /> },
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
				element: <AdminInventory />
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
