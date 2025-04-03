import { IExpense } from "../../components/Expense/Expense.tsx";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IExpensesState {
    list: IExpense[];
}

const initialState: IExpensesState = {
    list: [ {"id": 1, "title": "Продукты", "cost": 1500, "date": "2025-03-08", "category": 'питание'},
        {"id": 2, "title": "Кино", "cost": 300, "date": "2025-02-14", "category": "развлечения"},
        {"id": 3, "title": "Репетитор", "cost": 500, "date": "2025-05-20", "category": "образование"}]
};

export const expensesListSlice = createSlice({
    name: "expensesList",
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<IExpense>) => {
            state.list.push(action.payload);
        },
        removeExpense: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(expense => expense.id !== action.payload);
        },
        editExpense: (state, action: PayloadAction<IExpense>) => { //принимает отредактированный расход
            const index = state.list.findIndex(expense => expense.id === action.payload.id);
            state.list[index] = action.payload;
        },
        sortExpenses(state, action: PayloadAction<string>) {
            const sortFunctions: Record<string, (a: IExpense, b: IExpense) => number> = {
                "none": (first: IExpense, second: IExpense) => first.id - second.id,
                "date": (first: IExpense, second: IExpense) => new Date(first.date).getTime() - new Date(second.date).getTime(),
                "cost-up": (first: IExpense, second: IExpense) => first.cost - second.cost,
                "cost-down": (first: IExpense, second: IExpense) => second.cost - first.cost,
            };
            state.list.sort(sortFunctions[action.payload]);
        }
    }
});

export const { addExpense, removeExpense, editExpense, sortExpenses } = expensesListSlice.actions;