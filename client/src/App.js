import React from "react";
import {Outlet} from 'react-router-dom';

// components
import MyNavbar from "./components/navbar/MyNavbar";

export default function App() {
  return (
    <div className="tw-gap-y-4 tw-grid">
      <MyNavbar />
      <Outlet/>
    </div>
  );
}
