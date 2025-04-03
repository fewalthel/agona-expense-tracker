import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExpense } from "../../components/Expense/Expense.tsx";

interface ITotalCostState {
    cost: number
}

const initialState: ITotalCostState = {
    cost: 0
};

export const totalCostSlice = createSlice({
    name: "totalCost",
    initialState,
    reducers: {
        updateTotalCost: (state, action: PayloadAction<IExpense[]>) => {
            state.cost = action.payload.reduce((total: number, expense: IExpense): number => total + expense.cost, 0)
        }
    }
});

export const {updateTotalCost} = totalCostSlice.actions;