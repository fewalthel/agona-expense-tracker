import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store.ts";
import {IExpense} from "../components/Expense/Expense.tsx";
import { ICategoryCost, updateStatistics } from "../store/slices/expensesStatisticsSlice.ts";

export const useExpensesStatistics = () => {
    const expensesStatistics: ICategoryCost[] = useSelector((state: RootState) => state.expensesStatistics.list);
    const dispatch = useDispatch<AppDispatch>();

    const updateStatisticsByCategories = (expensesList: IExpense[]): void => {
        dispatch(updateStatistics(expensesList));
    };

    return { expensesStatistics, updateStatisticsByCategories };
};
