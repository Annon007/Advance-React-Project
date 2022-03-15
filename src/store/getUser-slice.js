import { createSlice } from "@reduxjs/toolkit";
const initial_sate = {
    profile: null,
    userType: ""
}
const userSlice = createSlice({
    name: "user",
    initialState: initial_sate,
    reducers: {
        setUserInfo(state, action) {
            state.profile = action.payload;
            state.userType = action.payload.userType;
        },
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;