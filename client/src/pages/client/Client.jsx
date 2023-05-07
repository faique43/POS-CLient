import React from 'react'
import { Outlet } from 'react-router-dom'

// components
import MyNavbar from '../../components/navbar/MyNavbar'

export default function Client() {
    return (
        <>
            <MyNavbar />
            <Outlet />
        </>
    )
}
