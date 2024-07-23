"use client";
import {Bounce, ToastContainer, ToastContainerProps} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Toaster = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: 'dark',
    transition: Bounce,
}

export default function Toast() {
    return (
        <ToastContainer {...(Toaster as ToastContainerProps)} />
    )
}