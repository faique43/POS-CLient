import React from "react";
import {Outlet} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// components
import MyNavbar from "./components/navbar/MyNavbar";

export default function App() {
  return (
    <div className="tw-gap-y-4 tw-grid">
      <ToastContainer/>
      <MyNavbar />
      <Outlet/>
    </div>
  );
}
