import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store/index";
import App from "./App";
import Kitchen1 from "./pages/client/kitchen/Kitchen1";
import Kitchen2 from "./pages/client/kitchen/Kitchen2";
import Inventory from "./pages/client/inventory/Inventory";
import AddProduct from "./pages/client/addProduct/AddProduct";
import Kitchen1Home from "./pages/client/Home/Kitchen1Home";
import Kitchen2Home from "./pages/client/Home/Kitchen2Home";

// admin components
import Admin from "./pages/admin/Admin";
import Orders from './pages/admin/orders/Orders'
import DashboardContent from "./pages/admin/dashboardContent/DashboardContent";
import Client from "./pages/client/Client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: 'orders',
            element: <Orders />
          }
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
          { path: "inventory", element: <Inventory /> },
          { path: "addProduct", element: <AddProduct /> },
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
