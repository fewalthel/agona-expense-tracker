import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store.ts";
import {IExpense} from "../components/Expense/Expense.tsx";
import { addExpense, removeExpense, editExpense, sortExpenses } from "../store/slices/expensesListSlice.ts";

export const useExpenses = () => {
    const expensesList: IExpense[] = useSelector((state: RootState) => state.expenses.list);
    const dispatch = useDispatch<AppDispatch>();

    const addExpenseToList = (expense: IExpense): void => {
        dispatch(addExpense(expense));
    };

    const removeExpenseFromList = (id: number): void => {
        dispatch(removeExpense(id));
    };

    const editExpenseFromList = (editedExpense: IExpense): void => {
        dispatch(editExpense(editedExpense));
    };

    const sortExpensesList = (sortedBy: string): void => {
        dispatch(sortExpenses(sortedBy));
    }

    return { expensesList, addExpenseToList, removeExpenseFromList, editExpenseFromList, sortExpensesList };
};
