import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector, useDispatch} from 'react-redux';

// components
import MyNavbar from "./components/navbar/MyNavbar";
import Modal from "@mui/material/Modal";

// MU
import CircularProgress from "@mui/material/CircularProgress";

// redux actions
import { getAllProducts } from "./store/productsSlice/productsSlice";

export default function App() {
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.ui.loading)

  // getting all products from DB on app startup
  useEffect(() => {
    dispatch(getAllProducts(dispatch))
  }, [dispatch])
  return (
    <div className="tw-gap-y-4 tw-grid">
      <Modal
        className='tw-text-center tw-my-[20%]'
        open={isLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CircularProgress />
      </Modal>
      <ToastContainer />
      <MyNavbar />
      <Outlet />
    </div>
  );
}
