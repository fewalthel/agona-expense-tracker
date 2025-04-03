import React, {useState} from 'react';
import './index.css';
import { ExpenseEditForm } from "../ExpenseEditForm/ExpenseEditForm.tsx";
import {useExpenses} from "../../hooks/useExpenses.ts";
import { useThemeColor } from "../../hooks/useThemeColor.ts";

export interface IExpense {
    title: string;
    cost: number;
    date: string;
    category: string;
    id: number;
}

export const formattedDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

export const Expense: React.FC <IExpense> = ({id, title, cost, date, category}: IExpense) => {
    const [expenseState, setExpenseState] = useState<string>('view');

    const { removeExpenseFromList } = useExpenses();
    const { themeColor } = useThemeColor();

    const removeExpense = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const idOfRemovingExpense: number = Number(event.currentTarget.value);
        removeExpenseFromList(idOfRemovingExpense);
    }

    const editExpense = (): void => { setExpenseState('edit'); }

    if (expenseState == 'view') {
        return (
        <div className="expense-container" style={{backgroundColor: themeColor}}>
            <div className="expense-buttons-container">
                <button type="button" value={id} onClick={editExpense} style={{backgroundColor: themeColor.saturate(2).darken(2), color: "white"}}>edit</button>
                <button type="button" value={id} onClick={removeExpense}  style={{backgroundColor: themeColor.saturate(2).darken(2), color: "white"}}>X</button>
            </div>

            <div className="expense-info-container">
                <strong>Название расхода: {title}</strong>
                <p>Сумма расхода: {cost} руб.</p>
                <p>Дата расхода: {formattedDate(date)}</p>
                <p>Категория: {category}</p>
            </div>
        </div>
        )
    }
    if (expenseState == 'edit') {
        return (
            <ExpenseEditForm id={id} title={title} cost={cost} date={date} category={category} setExpenseState={setExpenseState} />
        )
    }
}