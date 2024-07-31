import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

import { ICurrActive } from "../constants/interfaces";

const initialState: ICurrActive = {
    portal: null,
};

const portalSlice = createSlice({
    name: "portal",
    initialState,
    reducers: {
        setPortal: (state, action) => {
            state.portal = action.payload;
        }
    },
});

export const getPortal = (state: RootState) => state.persistedReducer.portal.portal;

export const { setPortal } = portalSlice.actions;

export default portalSlice.reducer;