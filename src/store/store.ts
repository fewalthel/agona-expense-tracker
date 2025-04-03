import { configureStore } from "@reduxjs/toolkit";
import {expensesListSlice} from "./slices/expensesListSlice.ts";
import { expensesStatisticsSlice} from "./slices/expensesStatisticsSlice.ts";
import {
    totalCostSlice
} from "./slices/totalCostSlice.ts";
import {
    themeColorSlice
} from "./slices/themeColorSlice.ts";


export const store = configureStore({
    reducer: {
        expenses: expensesListSlice.reducer,
        expensesStatistics: expensesStatisticsSlice.reducer,
        totalCost: totalCostSlice.reducer,
        themeColor: themeColorSlice.reducer,
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;