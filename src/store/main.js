import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "./login-slice";
import getUserReducers from "./getUser-slice"
import notificationReducers from "./notification-slice";
const store = configureStore({
    reducer: {
        login: loginReducers,
        notification: notificationReducers,
        user: getUserReducers,
    }
});

export default store;