import React, { useEffect, useState } from 'react';
import { Expense } from "../Expense/Expense.tsx";
import { getExpenses } from "../../api.ts";
import { ExpenseForm } from "../ExpenseForm/ExpenseForm.tsx";
import { IExpense } from "../../api.ts";
import { StatisticsCircle } from "../StatisticsCircle/StatisticsCircle.tsx";
import { StatisticsTable } from "../StatisticsTable.tsx";

import './index.css';

export interface ICategoryCost { //траты по категориям
    category: string;
    cost: number;
}

function updatedExpenseStatistictsByCategories(expenses: IExpense[]): ICategoryCost[] {
    const categoryTotals: ICategoryCost[] = [{category: 'здоровье', cost: 0},
        {category: 'еда', cost: 0},
        {category: 'образование', cost: 0},
        {category: 'развлечения', cost: 0}]

    expenses.forEach((expense: IExpense) => {
        const index = categoryTotals.findIndex(obj => obj.category === expense.category);
        if (index !== -1) {
            categoryTotals[index] = {
                ...categoryTotals[index],
                cost: categoryTotals[index].cost + expense.cost
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
    const [expensesStatsByCategories, setExpensesStatsByCategories] = useState<ICategoryCost[]>
      ([{category: 'здоровье', cost: 0},
        {category: 'еда', cost: 0},
        {category: 'образование', cost: 0},
        {category: 'развлечения', cost: 0}]);

    const [expenseIdCount, setExpenseIdCount] = useState<number>(0);
    const [sortedBy, setSortedBy] = useState<string>('none');


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
    }, []);

    useEffect((): void => {
        setTotalCost(updatedTotalCost(expensesList));
        setExpenseIdCount(expensesList.length);
        setExpensesStatsByCategories(updatedExpenseStatistictsByCategories(expensesList));
    }, [expensesList]);

    useEffect((): void => {
        if (sortedBy == 'none') {
            const sortedList: IExpense[] = [...expensesList].sort((a: IExpense, b: IExpense) => {
                return a.id - b.id
            });
            setExpensesList(sortedList);
        }
        if (sortedBy == 'date') {
            const sortedList: IExpense[] = [...expensesList].sort((a: IExpense, b: IExpense) => {
                return Date.parse(a.date) - Date.parse(b.date)
            });
            setExpensesList(sortedList);
        }
        if (sortedBy == 'cost-up') {
            const sortedList: IExpense[]  = [...expensesList].sort((a: IExpense, b: IExpense) => {
                return a.cost - b.cost
            });
            setExpensesList(sortedList);
        }

        if (sortedBy == 'cost-down') {
            const sortedList: IExpense[]  = [...expensesList].sort((a: IExpense, b: IExpense) => {
                return b.cost - a.cost
            });
            setExpensesList(sortedList);
        }
    }, [sortedBy]);

    if (loading) {
        return <div>Загрузка...</div>;
    }
    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div className='expense-tracker'>

            <StatisticsCircle data={[{
                color: '#fe9197', percent: expensesStatsByCategories[0].cost / totalCost * 100},
                {color: '#f19ca9', percent: expensesStatsByCategories[1].cost / totalCost * 100},
                {color: '#FDBDBA', percent: expensesStatsByCategories[2].cost / totalCost * 100 },
                { color: '#ffcad7', percent: expensesStatsByCategories[3].cost / totalCost * 100 }]}/>

        <strong>Общая сумма расходов: {totalCost} руб.</strong>
        <StatisticsTable expensesStatsByCategories={expensesStatsByCategories}/>

            <div className="sorting-container">
                <p>Сортировать по:</p>

                <select name="sorted-by" className="sorted-by" onChange={(e) => setSortedBy(e.target.value)}>
                    <option value="none">не сортировать</option>
                    <option value="date">дате</option>
                    <option value="cost-up">возрастанию расходов</option>
                    <option value="cost-down">убыванию расходов</option>
                </select>
            </div>

            <button onClick={openModal} className="add-expense-button">Добавить расход</button>
            <ExpenseForm isOpen={isModalOpen} onClose={closeModal}
                         expensesList={expensesList} setExpensesList={setExpensesList}
                         totalCost={totalCost} setTotalCost={setTotalCost}
                         expenseIdCount={expenseIdCount} setExpenseIdCount={setExpenseIdCount}/>

            <div className="expense-tracker">
                {expensesList.map((expense: IExpense) => (
                    <Expense {...expense} key={expense.title}
                             expensesList={expensesList} setExpensesList={setExpensesList}/>
                ))}
            </div>
        </div>
    );
};