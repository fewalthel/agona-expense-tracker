import React from 'react';
import { IExpense } from "../../api.ts";
import './index.css'

interface IExpenseEditFormProps {
    id: number;
    title: string;
    cost: number;
    date: string;
    category: string;
    expensesList: IExpense[];
    setExpensesList: (newExpenses: IExpense[]) => void;
    setExpenseState: (newState: string) => void;
}

export const ExpenseEditForm: React.FC<IExpenseEditFormProps> = ({id, title, cost, date, category, expensesList, setExpensesList, setExpenseState}: IExpenseEditFormProps) => {

    function saveChanges(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();

        const inputElement = document.getElementsByClassName("expense-title-input")[0] as HTMLInputElement;
        const inputCost = document.getElementsByClassName('expense-cost-input')[0] as HTMLInputElement;
        const inputDate = document.getElementsByClassName('expense-date-input')[0] as HTMLInputElement;
        const inputCategory = document.getElementsByClassName('expense-category-select')[0] as HTMLInputElement;

        const title: string = inputElement.value.trim();
        const cost: number = Number(inputCost.value.trim());
        const category: string = inputCategory.value;
        const date: string = inputDate.value;


        const editingExpense: IExpense = {
            'id': id,
            'title': title,
            'cost': cost,
            'date': date,
            'category': category
        };

        const copyExpensesList = expensesList.slice();
        const index = copyExpensesList.findIndex(obj => obj.id === id);

        copyExpensesList[index] = editingExpense;

        setExpensesList(copyExpensesList);
        setExpenseState('view');
    }

    return (
        <div className="expense-edit-form">
            <form>
                <strong>Редактирование расхода</strong>
                <input type="text" className="expense-title-input" placeholder="название расхода" defaultValue={title}/>
                <input type="number" min="0" className="expense-cost-input" placeholder="сумма расхода" defaultValue={cost}/>
                <input type="date" className="expense-date-input" placeholder="дата расхода" defaultValue={date}/>
                <select name="expense-category-select" className="expense-category-select" defaultValue={category}>
                    <option value="здоровье">здоровье</option>
                    <option value="еда">еда</option>
                    <option value="образование">образование</option>
                    <option value="развлечения">развлечения</option>
                </select>

                <button type="submit" onClick={saveChanges}>Save</button>
            </form>
        </div>
    )
}
