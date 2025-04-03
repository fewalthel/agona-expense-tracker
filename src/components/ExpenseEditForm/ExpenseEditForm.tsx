import React, { useRef } from 'react';
import { IExpense } from "../Expense/Expense.tsx";
import './index.css';
import { useExpenses } from "../../hooks/useExpenses.ts";
import { useThemeColor } from "../../hooks/useThemeColor.ts";
import {categories} from "../StatisticsTable/StatisticsTable.tsx";
import {getExpenseData} from "../ExpenseAddFormModal/ExpenseAddFormModal.tsx";

interface IExpenseEditFormProps extends IExpense {
    setExpenseState: (newState: string) => void;
}

export const ExpenseEditForm: React.FC<IExpenseEditFormProps> = ({id, title, cost, date, category, setExpenseState}: IExpenseEditFormProps) => {
    const { editExpenseFromList } = useExpenses();
    const { themeColor } = useThemeColor();

    const titleEditRef = useRef<HTMLInputElement>(null);
    const costEditRef = useRef<HTMLInputElement>(null);
    const dateEditRef = useRef<HTMLInputElement>(null);
    const categoryEditRef = useRef<HTMLSelectElement>(null);

    function saveChanges(): void {
        const editingExpense: IExpense | null = getExpenseData(titleEditRef, costEditRef, dateEditRef, categoryEditRef);

        if (!editingExpense) {
            return;
        } else {
            editingExpense.id = id;
            editExpenseFromList(editingExpense);
            setExpenseState('view');
            console.log(editingExpense);
        }
    }

    return (
        <div className="expense-edit-form" style={{background: themeColor}}>
            <form>
                <strong>Редактирование расхода</strong>
                <input type="text" className="expense-title-input" placeholder="название расхода" defaultValue={title} ref={titleEditRef}/>
                <input type="number" min="0" className="expense-cost-input" placeholder="сумма расхода" defaultValue={cost} ref={costEditRef}/>
                <input type="date" className="expense-date-input" placeholder="дата расхода" defaultValue={date} ref={dateEditRef}/>
                <select name="expense-category-select" className="expense-category-select" defaultValue={category} ref={categoryEditRef}>
                    {categories.map( (categoryName: string) =>
                        <option value={categoryName}>{categoryName}</option>
                    )}
                </select>

                <button type="button" onClick={saveChanges}  style={{backgroundColor: themeColor.saturate(2).darken(2), color: "white"}}>Save</button>
            </form>
        </div>
    )
}