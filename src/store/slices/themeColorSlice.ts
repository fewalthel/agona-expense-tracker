import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Color } from "chroma-js";
import chroma from "chroma-js";

interface IThemeColorState {
    color: Color
}

const initialState: IThemeColorState = {
    color: chroma('lightpink')
};

export const themeColorSlice = createSlice({
    name: "themeColor",
    initialState,
    reducers: {
        setThemeColor: (state, action: PayloadAction<string>) => {
            state.color  = chroma(action.payload);
        }
    }
});

export const { setThemeColor } = themeColorSlice.actions;