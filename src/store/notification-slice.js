import { createSlice } from "@reduxjs/toolkit";
const initial_state = {
    isPending: false,
    message: "",
    status: ""
}
const notificationSlice = createSlice({
    name: "notifiaction",
    initialState: initial_state,
    reducers: {
        setNotification(state, action) {
            state.status = action.payload.status
            state.message = action.payload?.message
        }
    }
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;