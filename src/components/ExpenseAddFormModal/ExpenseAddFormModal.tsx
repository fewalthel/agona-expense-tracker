import React, {
    useEffect,
    useRef
} from 'react';
import './index.css';
import {
    IExpense
} from "../Expense/Expense.tsx";
import {
    useExpenses
} from "../../hooks/useExpenses.ts";
import {
    useTotalCost
} from "../../hooks/useTotalCost.ts";
import {
    useThemeColor
} from "../../hooks/useThemeColor.ts";
import {
    categories
} from "../StatisticsTable/StatisticsTable.tsx";

interface IExpenseFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export const getExpenseData=
    (titleRef: React.RefObject<HTMLInputElement>, costRef: React.RefObject<HTMLInputElement>,
    dateRef: React.RefObject<HTMLInputElement>, categoryRef: React.RefObject<HTMLInputElement>): IExpense | null  => {

    const title: string = titleRef.current ? titleRef.current?.value.trim() : '';
    const cost: string = costRef.current ? costRef.current?.value.trim() : '';
    const date: string = dateRef.current ? dateRef.current?.value : '';
    const category: string = categoryRef.current ? categoryRef.current?.value : '';

    if (!title || !cost || !date || !category ) {
        alert("Пожалуйста, заполните все поля!");
        return null;
    }
    if (Number(cost) <= 0) {
        alert("Стоимость расхода не может быть такой!");
        return null;
    }

    return {
        id: NaN,
        'title': title,
        'cost': Number(cost),
        'date': date,
        'category': category
    };
}

export const ExpenseAddFormModal: React.FC<IExpenseFormProps> = ({ isOpen, onClose}: IExpenseFormProps) => {
    const { expensesList, addExpenseToList } = useExpenses();
    const { updateTotalCostNumber } = useTotalCost();
    const { themeColor } = useThemeColor();

    const titleInputRef = useRef<HTMLInputElement>(null);
    const costInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const categorySelectRef = useRef<HTMLSelectElement>(null);

    const addExpense = (): void => {
        const newExpense: IExpense | null = getExpenseData(titleInputRef, costInputRef, dateInputRef, categorySelectRef);

        if (!newExpense) {
            return;
        } else {
            newExpense.id = expensesList.length + 1;
            addExpenseToList(newExpense);
        }
    }

    useEffect(() => {
        console.log(expensesList);
        updateTotalCostNumber(expensesList);
    }, [expensesList]);


    if (!isOpen) {
        return;
    } else {
        return (
            <div className="expense-form-modal">
                <div className="modal-content" style={{borderColor: themeColor, borderWidth: '5px', borderStyle: 'solid', backgroundColor: themeColor.saturate(2).brighten(2.5)}}>
                    <button className="close-button" onClick={onClose} style={{backgroundColor: themeColor.saturate(2).darken(2)}}>X</button>
                    <form>
                        <strong>Добавление нового расхода</strong>
                        <input type="text" className="expense-title-input" placeholder="название расхода" ref={titleInputRef}/>
                        <input type="number" min="0" className="expense-cost-input" placeholder="сумма расхода" ref={costInputRef}/>
                        <input type="date" className="expense-date-input" placeholder="дата расхода" ref={dateInputRef}/>
                        <select name="expense-category-select" className="expense-category-select" ref={categorySelectRef}>
                            {categories.map( (categoryName: string) =>
                                <option value={categoryName}>{categoryName}</option>
                            )}
                        </select>

                        <button type="button" className="submit-button" onClick={addExpense} style={{backgroundColor: themeColor.saturate(2).darken(2)}}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}