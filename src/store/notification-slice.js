import { createSlice } from "@reduxjs/toolkit";
const initial_state = {
    isPending: false,
    message: "",
    status: "",
    errors: null,
    name: ""
}
const notificationSlice = createSlice({
    name: "notifiaction",
    initialState: initial_state,
    reducers: {
        setNotification(state, action) {
            state.status = action.payload.status;
            state.message = action.payload?.message;
            state.errors = action.payload?.errors;
            state.name = action.payload?.name;
        }
    }
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;