import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

import { IUser } from "../constants/interfaces";

const initialState: IUser = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const getUser = (state: RootState) => state.persistedReducer.user.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;