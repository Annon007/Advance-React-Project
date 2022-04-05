import { createSlice } from "@reduxjs/toolkit";
const initial_state = {
    profile: null
}
const signupSlice = createSlice({
    name: "signup",
    initialState: initial_state,
    reducers: {
        signUp(state, action) {
            state.profile = action.payload
        }
    }
});

export const signupActions = signupSlice.actions;

export default signupSlice.reducer;