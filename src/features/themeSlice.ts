import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../app/store";

const initialState = { 
    theme: "light" 
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "dark" ? "light" : "dark";
        }
    }
});

export const getTheme = (state: RootState) => state.persistedReducer.theme.theme;

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;