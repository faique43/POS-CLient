import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux';

// components
import MyNavbar from "./components/navbar/MyNavbar";
import Modal from "@mui/material/Modal";

// MU
import CircularProgress from "@mui/material/CircularProgress";

// redux actions
import { getAllProducts } from "./store/productsSlice/productsSlice";
import { getInventory } from "./store/inventorySlice/inventorySlice";
import { getKitchen1Orders, getKitchen2Orders, getAllOrders } from './store/kitchenSlice/kitchenSlice'
import { uiActions } from "./store/uiSlice/uiSlice";
import { getAllSalaries } from "./store/salariesSlice/salariesSlice";

export default function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(state => state.ui.loading)
  const auth = useSelector(state => state.auth);

  // getting all products and inventory from DB on app startup
  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(uiActions.startLoading())
      dispatch(getAllProducts(dispatch)).then(response => {
        dispatch(getInventory(dispatch)).then(response => {
          dispatch(getAllOrders()).then(response => {
            if(auth.isAdmin) {
              dispatch(getAllSalaries()).then(response => {
                dispatch(uiActions.stopLoading())
              })
            }
            else {
              dispatch(uiActions.stopLoading())
            }
          })
        })
      })
    }
  }, [dispatch, auth.isAuthenticated])

  // redirect un auth requests
  useEffect(() => {
    if(!auth.isAuthenticated) {
      navigate('/Login')
    }
  }, [])

  // redirect on basis of user
  useEffect(() => {
    if(auth.isAuthenticated && auth.isAdmin) {
      navigate('/admin')
    }
    else if(auth.isAuthenticated) {
      navigate('/client/kitchen1Home')
    }
  }, [auth.isAuthenticated])
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
      <Outlet />
    </div>
  );
}
