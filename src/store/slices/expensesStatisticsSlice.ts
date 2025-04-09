import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IExpense} from "../../components/Expense/Expense.tsx";

export interface ICategoryCost { //траты по категориям
    category: string;
    cost: number;
}

interface IExpensesStatisticsState {
    list: ICategoryCost[];
}

const initialState: IExpensesStatisticsState = {
    list: [{category: 'здоровье', cost: 0},
        {category: 'питание', cost: 0},
        {category: 'образование', cost: 0},
        {category: 'развлечения', cost: 0},
        {category: 'транспорт', cost: 0},
        {category: 'жилищные расходы', cost: 0},
        {category: 'прочее', cost: 0}]
};

export const expensesStatisticsSlice = createSlice({
    name: "expensesStatistics",
    initialState,
    reducers: {
        updateStatistics: (state, action: PayloadAction<IExpense[]>) => {
            const categoryTotals: ICategoryCost[] = [{category: 'здоровье', cost: 0},
                {category: 'питание', cost: 0},
                {category: 'образование', cost: 0},
                {category: 'развлечения', cost: 0},
                {category: 'транспорт', cost: 0},
                {category: 'жилищные расходы', cost: 0},
                {category: 'прочее', cost: 0}]

            action.payload.forEach((expense: IExpense) => {
                const index: number = categoryTotals.findIndex(obj => obj.category === expense.category);
                if (index !== -1) {
                    categoryTotals[index] = {
                        ...categoryTotals[index],
                        cost: categoryTotals[index].cost + expense.cost
                    };
                }
            });

            state.list = categoryTotals;
        }
    }
});

export const { updateStatistics } = expensesStatisticsSlice.actions;