import {Bounce, toast, ToastOptions} from "react-toastify";
import {useState} from "react";

export function useToast() {
    const [toastOptions, setToastOptions] = useState<ToastOptions>({
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: 'dark',
        transition: Bounce,
        progress: undefined,
    });

    const showToast = (message: string, options?: ToastOptions) => {
        toast(message, {...toastOptions, ...options});
    }

    const success = (message: string, options?: ToastOptions) => {
        toast.success(message, {...toastOptions, ...options});
    }

    const error = (message: string, options?: ToastOptions) => {
        toast.error(message, {...toastOptions, ...options});
    }

    const warning = (message: string, options?: ToastOptions) => {
        toast.warning(message, {...toastOptions, ...options});
    }

    const info = (message: string, options?: ToastOptions) => {
        toast.info(message, {...toastOptions, ...options});
    }

    return {
        showToast,
        success,
        error,
        warning,
        info,
        toastOptions,
        setToastOptions
    }
}