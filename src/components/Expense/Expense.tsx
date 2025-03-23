import React, {useState} from 'react';
import './index.css';
import { IExpense } from "../../api.ts";
import { ExpenseEditForm } from "../ExpenseEditForm/ExpenseEditForm.tsx";

export interface IExpenseProps extends IExpense{
    expensesList: IExpense[];
    setExpensesList: (newExpenses: IExpense[]) => void;
}

export const Expense: React.FC <IExpenseProps> = ({id, title, cost, date, category, expensesList, setExpensesList}: IExpenseProps) => {
    const [expenseState, setExpenseState] = useState<string>('view');

    function removeExpense(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();

        const idOfRemoveExpense: number = Number(event.currentTarget.value);
        const expenseToRemove: IExpense | undefined = expensesList.find(obj => obj.id === idOfRemoveExpense);
        const newExpenses: IExpense[] = expensesList.filter((expense: IExpense) => expense !== expenseToRemove);

        setExpensesList(newExpenses);
    }

    function editExpense(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        setExpenseState('edit');
    }

    function formattedDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    if (expenseState == 'view') {
        return (
        <div className="expense-container">
            <button value={id} onClick={removeExpense}>X</button>
            <button value={id} onClick={editExpense}>edit</button>

            <strong>Название расхода: {title}</strong>
            <p>Сумма расхода: {cost} руб.</p>
            <p>Дата расхода: {formattedDate(date)}</p>
            <p>Категория: {category}</p>
        </div>
    )
    } if (expenseState == 'edit') {
        return (
            <ExpenseEditForm id={id} title={title} cost={cost} date={date} category={category} expensesList={expensesList} setExpensesList={setExpensesList} setExpenseState={setExpenseState}/>
        )
    }
}