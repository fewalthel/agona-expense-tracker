import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store.ts";
import { IExpense } from "../components/Expense/Expense.tsx";
import { updateTotalCost } from "../store/slices/totalCostSlice.ts";

export const useTotalCost = () => {
    const totalCost = useSelector((state: RootState) => state.totalCost.cost);
    const dispatch = useDispatch<AppDispatch>();

    const updateTotalCostNumber = (expensesList: IExpense[]): void => {
        dispatch(updateTotalCost(expensesList));
    };

    return { totalCost, updateTotalCostNumber };
};
