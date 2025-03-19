import React, { useEffect, useState } from 'react';
import { Expense } from "../Expense/Expense.tsx";
import { getExpenses } from "../../api.ts";
import { ExpenseForm } from "../ExpenseForm/ExpenseForm.tsx";
import { IExpense } from "../../api.ts";
import { StatisticsCircle } from "../StatisticsCircle/StatisticsCircle.tsx";

import './index.css';

export interface ICategoryPercentage {
    category: string;
    percentage: number;
}

export function updatedCategoryPercentages(expenses: IExpense[], totalCost: number, expensesStatsByCategories: ICategoryPercentage[]): ICategoryPercentage[] {
    const categoryTotals: ICategoryPercentage[] = expensesStatsByCategories.map(category => ({...category}));

    expenses.forEach((expense: IExpense) => {
        const index = categoryTotals.findIndex(obj => obj.category === expense.category);
        if (index !== -1) {
            categoryTotals[index] = {
                ...categoryTotals[index],
                percentage: categoryTotals[index].percentage + (expense.cost / totalCost * 100)
            };
        }
    });
    return categoryTotals;
}

function updatedTotalCost(newExpenses: IExpense[]): number {
    return newExpenses.reduce((total: number, expense: IExpense): number => total + expense.cost, 0)
}

export const ExpenseTracker: React.FC = () => {

    const openModal: () => void = (): void => setIsModalOpen(true);
    const closeModal: () => void = (): void => setIsModalOpen(false);

    const [expensesList, setExpensesList] = useState<IExpense[]>([]); //Состояние списка расходов
    const [error, setError] = useState<string | null>(null); // Для отображения ошибок
    const [loading, setLoading] = useState(true); // Для индикации загрузки
    const [totalCost, setTotalCost] = useState<number>(0); //Общая сумма расходов
    const [isModalOpen, setIsModalOpen] = useState(false); //Для модального окна
    const [expensesStatsByCategories, setExpensesStatsByCategories] = useState<{category: string, percentage: number}[]>
      ([{category: 'здоровье', percentage: 0},
        {category: 'еда', percentage: 0},
        {category: 'образование', percentage: 0},
        {category: 'развлечения', percentage: 0}]);

    useEffect((): void => {
        getExpenses()
            .then(fetchedExpenses => {
                if (fetchedExpenses != null) {
                    setExpensesList(fetchedExpenses);
                    setTotalCost(updatedTotalCost(fetchedExpenses));
                } else {
                    setError("Не удалось загрузить расходы.");
                }
            })
            .catch(error => {
                setError('Ошибка при загрузке расходов: ' + (error instanceof Error ? error.message : String(error)));
            })
            .finally(() => {
                setLoading(false);
            });
    });

    useEffect((): void => {
        console.log('текущий список');
        console.log(expensesList);
        setTotalCost(updatedTotalCost(expensesList))
    }, [expensesList]);

    useEffect((): void => {
        setExpensesStatsByCategories(updatedCategoryPercentages(expensesList, totalCost, expensesStatsByCategories));
        console.log('текущий список');
        console.log(expensesList);
    }, [totalCost]);


    if (loading) {
        return <div>Загрузка...</div>;
    }
    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
    <div className='expense-tracker'>

        <StatisticsCircle data={[{ color: '#fe9197', percent: expensesStatsByCategories[0].percentage },
            { color: '#f19ca9', percent: expensesStatsByCategories[1].percentage },
            { color: '#FDBDBA', percent: expensesStatsByCategories[2].percentage },
            { color: '#ffcad7', percent: expensesStatsByCategories[3].percentage }]}/>

        <strong>Общая сумма расходов: {totalCost} руб.</strong>
        <table className="expenses-table">
                <thead>
                <tr>
                    <td style={{ backgroundColor: "#fe9197" }}>здоровье</td>
                    <td style={{ backgroundColor: "#f19ca9" }}>еда</td>
                    <td style={{ backgroundColor: "#FDBDBA" }}>образование</td>
                    <td style={{ backgroundColor: "#ffcad7" }}>развлечения</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{expensesStatsByCategories[0].percentage / 100 * totalCost} руб.</td>
                    <td>{expensesStatsByCategories[1].percentage  / 100 * totalCost} руб.</td>
                    <td>{expensesStatsByCategories[2].percentage  / 100 * totalCost} руб.</td>
                    <td>{expensesStatsByCategories[3].percentage  / 100 * totalCost} руб.</td>
                </tr>
                </tbody>
            </table>

            <button onClick={openModal} className="add-expense-button">Добавить расход</button>
            <ExpenseForm isOpen={isModalOpen} onClose={closeModal}
                         expensesList={expensesList} setExpensesList={setExpensesList}
                         totalCost={totalCost} setTotalCost={setTotalCost}/>

            <div className="expense-tracker">
                {expensesList.map((expense: IExpense) => (
                    <Expense {...expense} key={expense.title}
                             expensesList={expensesList} setExpensesList={setExpensesList}/>
                ))}
            </div>
        </div>
    );
};