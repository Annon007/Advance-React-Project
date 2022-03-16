

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Success_Toast = (msg) => {
    toast.configure();
    return toast.success(`${msg}`, {
        position: toast.POSITION.BOTTOM_LEFT, style: {
            width: "fit-content",
            fontSize: "1rem",
            color: "#33FF75",
            fontWeight: "bold",
        }, autoClose: 4000
    })
};
export const Error_Toast = (msg) => {
    toast.configure();
    return toast.error(`${msg}`, {
        position: toast.POSITION.BOTTOM_LEFT, style: {
            width: "fit-content",
            fontSize: "1rem",
            color: "#FB373F",
            fontWeight: "bold",
        }, autoClose: 4000
    })
}