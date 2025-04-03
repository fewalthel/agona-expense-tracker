import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store.ts";
import { setThemeColor } from "../store/slices/themeColorSlice.ts";
import { Color } from "chroma-js";

export const useThemeColor = () => {
    const themeColor: Color = useSelector((state: RootState) => state.themeColor.color);
    const dispatch = useDispatch<AppDispatch>();

    const setTheme = (color: string): void => {
        dispatch(setThemeColor(color));
    };

    return { themeColor, setTheme };
};