import React, { useEffect, useState } from 'react';
import './index.css';

import { Expense } from "../../components/Expense/Expense.tsx";
import { IExpense } from "../../components/Expense/Expense.tsx";
import { useExpenses } from "../../hooks/useExpenses.ts";
import { useExpensesStatistics } from "../../hooks/useExpensesStatistics.ts";
import { useTotalCost } from "../../hooks/useTotalCost.ts";
import { ControlPanel } from "../../components/ControlPanel/ControlPanel.tsx";


export const ExpenseTrackerPage: React.FC = () => {

    const openModal = (): void => setIsModalOpen(true);
    const closeModal= (): void => setIsModalOpen(false);

    const { expensesList } = useExpenses();
    const { updateStatisticsByCategories} = useExpensesStatistics();
    const { updateTotalCostNumber } = useTotalCost();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect((): void => {
        updateTotalCostNumber(expensesList);
        updateStatisticsByCategories(expensesList);
        console.log(expensesList);
    }, [expensesList]);

    return (
        <div className='expense-tracker'>
            <ControlPanel openModal={openModal} isModalOpen={isModalOpen} closeModal={closeModal} />

            <div className="expenses-container">
                {expensesList.map((expense: IExpense) => (
                    <Expense {...expense} key={expense.id} />
                ))}
            </div>
        </div>
    );
};