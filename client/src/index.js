import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store/index";
import App from "./App";
import Home from "./pages/Home/Home";
import Kitchen from "./pages/kitchen/Kitchen";
import Inventory from "./pages/inventory/Inventory";
import AddProduct from "./pages/addProduct/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "home", element: <Home /> }, { path: 'kitchen', element: <Kitchen /> }, { path: 'inventory', element: <Inventory /> }, { path: "addProduct", element: <AddProduct /> }],
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
