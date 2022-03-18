import { createSlice } from "@reduxjs/toolkit";
const initial_state = {
    isLoggedin: false,
}
const loginSlice = createSlice({
    name: "login",
    initialState: initial_state,
    reducers: {
        logIn(state, action) {
            localStorage.setItem("TEST_TOKEN", action.payload.accessToken)
            state.isLoggedin = action.payload.accessToken ? true : false;
        },
        logOut(state) {
            localStorage.removeItem("TEST_TOKEN");
            state.isLoggedin = false;
        },
        stayLoggedIn(state) {
            state.isLoggedin = true;
        },
    }
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;