import React, { useEffect, useState } from 'react';
import { Expense } from "../Expense/Expense.tsx";
import { getExpenses } from "../../api.ts";
import { ExpenseForm } from "../ExpenseForm/ExpenseForm.tsx";
import { IExpense } from "../../api.ts";
import { StatisticsCircle } from "../StatisticsCircle/StatisticsCircle.tsx";
import { StatisticsTable } from "../StatisticsTable/StatisticsTable.tsx";

import './index.css';

export interface ICategoryCost { //траты по категориям
    category: string;
    cost: number;
}

function updatedExpenseStatistictsByCategories(expenses: IExpense[]): ICategoryCost[] {
    const categoryTotals: ICategoryCost[] = [{category: 'здоровье', cost: 0},
        {category: 'питание', cost: 0},
        {category: 'образование', cost: 0},
        {category: 'развлечения', cost: 0},
        {category: 'транспорт', cost: 0},
        {category: 'жилищные расходы', cost: 0},
        {category: 'прочее', cost: 0}]

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

/*function updatedCategoriesList(expensesList: IExpense[], oldCategoriesList: string[]): string[] {
    const newCategoriesList = [...oldCategoriesList];
    expensesList.forEach((expense: IExpense) => {
        if (!oldCategoriesList.includes(expense.category)) {
            newCategoriesList.push(expense.category);
        }
    })
    return newCategoriesList;
}*/

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
          {category: 'питание', cost: 0},
          {category: 'образование', cost: 0},
          {category: 'развлечения', cost: 0},
          {category: 'транспорт', cost: 0},
          {category: 'жилищные расходы', cost: 0},
          {category: 'прочее', cost: 0},]);

    const [expenseIdCount, setExpenseIdCount] = useState<number>(0);
    const [sortedBy, setSortedBy] = useState<string>('none');
    const [theme, setTheme] = useState<string>('pink');

    useEffect((): void => {
        getExpenses()
            .then(fetchedExpenses => {
                if (fetchedExpenses != null) {
                    setExpensesList(fetchedExpenses);
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
        console.log(expensesStatsByCategories);
    }, [expensesList]);

    useEffect((): void => {
        const sortedList: IExpense[] = [...expensesList];
        switch (sortedBy) {
            case 'none':
                sortedList.sort((a: IExpense, b: IExpense) => {
                    return a.id - b.id
                });
                break;
            case 'date':
                sortedList.sort((a: IExpense, b: IExpense) => {
                    return Date.parse(a.date) - Date.parse(b.date)
                });
                break;
            case 'cost-up':
                sortedList.sort((a: IExpense, b: IExpense) => {
                    return a.cost - b.cost
                });
                break;
            case 'cost-down':
                sortedList.sort((a: IExpense, b: IExpense) => {
                    return b.cost - a.cost
                });
                break;
        }
        setExpensesList(sortedList);
    }, [sortedBy]);

    if (loading) {
        return <div>Загрузка...</div>;
    }
    if (error) {
        return <div>Ошибка: {error}</div>;
    }


    return (
        <div className='expense-tracker'>

            <StatisticsCircle statistics={expensesStatsByCategories} themeColor={theme} totalCost={totalCost} />

        <strong>Общая сумма расходов: {totalCost} руб.</strong>
        <StatisticsTable expensesStatsByCategories={expensesStatsByCategories} themeColor={theme}/>

            <div className="settings-container">
                <div className="sorting-container">
                    <p>Сортировать по:</p>

                    <select name="sorted-by" className="sorted-by" onChange={(e) => setSortedBy(e.target.value)}>
                        <option value="none">не сортировать</option>
                        <option value="date">дате</option>
                        <option value="cost-up">возрастанию расходов</option>
                        <option value="cost-down">убыванию расходов</option>
                    </select>
                </div>
                <div className="theme-container">
                    <p>Выбор темы:</p>

                    <select name="theme" className="theme" onChange={(e) => setTheme(e.target.value)}>
                        <option value="pink">розовый</option>
                        <option value="blue">голубой</option>
                        <option value="green">зелёный</option>
                        <option value="yellow">желтый</option>
                    </select>
                </div>
            </div>

            <button onClick={openModal} className="add-expense-button">Добавить расход</button>
            <ExpenseForm isOpen={isModalOpen} onClose={closeModal}
                         expensesList={expensesList} setExpensesList={setExpensesList}
                         totalCost={totalCost} setTotalCost={setTotalCost}
                         expenseIdCount={expenseIdCount} setExpenseIdCount={setExpenseIdCount}/>

            <div className="expense-tracker">
                {expensesList.map((expense: IExpense) => (
                    <Expense {...expense} key={expense.title}
                             expensesList={expensesList} setExpensesList={setExpensesList} color={theme}/>
                ))}
            </div>
        </div>
    );
};