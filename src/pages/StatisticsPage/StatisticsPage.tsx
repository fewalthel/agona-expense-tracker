import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import './index.css'

import { StatisticsCircle } from "../../components/StatisticsCircle/StatisticsCircle.tsx";
import { StatisticsTable } from "../../components/StatisticsTable/StatisticsTable.tsx";
import { useExpensesStatistics } from "../../hooks/useExpensesStatistics.ts";
import { useExpenses } from "../../hooks/useExpenses.ts";
import { IExpense } from "../../components/Expense/Expense.tsx";
import { useThemeColor } from "../../hooks/useThemeColor.ts";
import {formattedDate} from "../../components/Expense/Expense.tsx";


export const StatisticsPage: React.FC = () => {

    const {expensesStatistics} = useExpensesStatistics();
    const {expensesList, sortExpensesList} = useExpenses();
    const {themeColor} = useThemeColor();

    const [maxExpense, setMaxExpense] = useState<IExpense| null>(null);
    const [minExpense, setMinExpense] = useState<IExpense | null>(null);

    useEffect((): void  => {
        sortExpensesList('cost-up');
        setMinExpense(expensesList[0]);
        setMaxExpense(expensesList[expensesList.length - 1]);
    }, [expensesList]);

    return (
        <div className="statistics-container">
            <StatisticsCircle statistics={expensesStatistics} size={200} themeColor={themeColor}/>
            <StatisticsTable expensesStatsByCategories={expensesStatistics} themeColor={themeColor}/>
            <p>Самый большой расход: { maxExpense? maxExpense.cost : "?"} руб.</p>
            <p>Самый маленький расход: {minExpense? minExpense.cost : "?"} руб.</p>
            <p>Дата самого большого расхода: { maxExpense ? formattedDate(maxExpense.date) : "?"}</p>
            <p>Дата самого маленького расхода: {minExpense ? formattedDate(minExpense.date) : "?"}</p>
            <Link to="/expense_tracker" className="link">назад к расходам</Link>
        </div>
    )
}