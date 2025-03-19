import React from 'react';
import './index.css';
import { IExpense } from "../../api.ts";

interface IExpenseFormProps {
    isOpen: boolean;
    onClose: () => void;
    expensesList: IExpense[];
    setExpensesList: (newExpenses: IExpense[]) => void;
    totalCost: number;
    setTotalCost: (newTotalCost: number) => void;
}

export const ExpenseForm: React.FC<IExpenseFormProps> =
    ({ isOpen, onClose, expensesList, setExpensesList, totalCost, setTotalCost}: IExpenseFormProps) => {

    function addExpense(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();

        const inputElement = document.getElementsByClassName("expense-title-input")[0] as HTMLInputElement;
        const inputCost = document.getElementsByClassName('expense-cost-input')[0] as HTMLInputElement;
        const inputDate = document.getElementsByClassName('expense-date-input')[0] as HTMLInputElement;
        const inputCategory = document.getElementsByClassName('expense-category-select')[0] as HTMLInputElement;

        const title: string = inputElement.value.trim();
        const cost: number = Number(inputCost.value.trim());
        const category: string = inputCategory.value;
        const date: string = inputDate.value;

        if (!title || !cost || !date || !category) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        const formattedDate: string = new Date(date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        const newExpense: IExpense = {'title': title, 'cost': cost, 'date': formattedDate, 'category': category};
        setExpensesList([...expensesList, newExpense]);
        setTotalCost(totalCost + cost);
    }

    if (!isOpen) {
        return null;
    } else {
        return (
            <div className="expense-form-modal">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <form>
                        <strong>Добавление нового расхода</strong>
                        <input type="text" className="expense-title-input" placeholder="название расхода"/>
                        <input type="number" min="0" className="expense-cost-input" placeholder="сумма расхода"/>
                        <input type="date" className="expense-date-input" placeholder="дата расхода"/>
                        <select name="expense-category-select" className="expense-category-select">
                            <option value="здоровье">здоровье</option>
                            <option value="еду">еда</option>
                            <option value="образование">образование</option>
                            <option value="развлечения">развлечения</option>
                        </select>

                        <button type="submit" className="submit-button" onClick={addExpense}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
