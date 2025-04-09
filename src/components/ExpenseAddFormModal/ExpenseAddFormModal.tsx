import React, { useEffect } from 'react';
import './index.scss';
import { useForm } from 'react-hook-form';
import { IExpense } from "../Expense/Expense.tsx";
import { useExpenses } from "../../hooks/useExpenses.ts";
import { useTotalCost } from "../../hooks/useTotalCost.ts";
import { useThemeColor } from "../../hooks/useThemeColor.ts";
import { categories } from "../StatisticsTable/StatisticsTable.tsx";


interface IExpenseFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface IFormData {
    title: string;
    cost: number;
    date: string;
    category: string;
}


export const ExpenseAddFormModal: React.FC<IExpenseFormProps> = ({ isOpen, onClose }) => {
    const { expensesList, addExpenseToList } = useExpenses();
    const { updateTotalCostNumber } = useTotalCost();
    const { themeColor } = useThemeColor();


    const { register, handleSubmit,
        formState: { errors, isValid },
        reset, trigger
    } = useForm<IFormData>({ mode: 'onChange' });


    const onSubmit = (data: IFormData) => {
        const newExpense: IExpense = { id: expensesList.length + 1, ...data };
        addExpenseToList(newExpense);
        closeModal();
    };


    const closeModal = () => {
        reset();
        onClose();
    }


    useEffect(() => {
        updateTotalCostNumber(expensesList);
    }, [expensesList]);


    if (!isOpen) return null;


    const inputStyle = (fieldName: keyof IFormData): React.CSSProperties => ({
        borderColor: errors[fieldName] ? '#dc3545' : '#ced4da',
        backgroundColor: 'white'
    });


    const focusStyle = {
        borderColor: themeColor,
        boxShadow: `0 0 0 0.2rem ${themeColor}`,
    };


    return (
        <div className="expense-form-modal">
            <div className="modal-content" style={{ borderColor: themeColor, backgroundColor: themeColor.saturate(2).brighten(2.5)}}>
                <button className="close-button" onClick={closeModal} style={{ backgroundColor: themeColor.saturate(2).darken(2) }}>X</button>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <strong style={{ marginBottom: '15px' }}>Добавление нового расхода</strong>


                    <div className="form-floating mb-3" style={{ height: '75px' }}>
                        <input type="text" id="floatingTitle" className="form-control"
                               style={inputStyle('title')}
                               {...register("title", {
                                   required: "Введите название расхода",
                                   onBlur: () => trigger("title"),
                               })}
                               onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                               onBlur={(e) => {
                                   Object.assign(e.target.style, inputStyle('title'));
                                   e.target.style.boxShadow = 'none';
                               }}
                               placeholder="Название расхода"
                        />
                        <label htmlFor="floatingTitle">Название расхода</label>
                        {errors.title && <p className="error-text">{errors.title.message}</p>}
                    </div>


                    <div className="form-floating mb-3" style={{ height: '75px' }}>
                        <input
                            type="number"
                            id="floatingCost"
                            className="form-control"
                            style={inputStyle('cost')}
                            {...register("cost", {
                                required: "Введите сумму",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Сумма должна быть больше 0"
                                },
                                onBlur: () => trigger("cost"),
                            })}
                            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                            onBlur={(e) => {
                                Object.assign(e.target.style, inputStyle('cost'));
                                e.target.style.boxShadow = 'none';
                            }}
                            placeholder="Сумма расхода"
                        />
                        <label htmlFor="floatingCost">Сумма расхода</label>
                        {errors.cost && <p className="error-text">{errors.cost.message}</p>}
                    </div>


                    <div className="form-floating mb-3" style={{ height: '75px' }}>
                        <input
                            type="date"
                            id="floatingDate"
                            className="form-control"
                            style={inputStyle('date')}
                            max={new Date().toISOString().split("T")[0]}
                            {...register("date", {
                                required: "Выберите дату",
                                validate: (value) => {
                                    const selectedDate = new Date(value);
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return selectedDate <= today || "Нельзя выбрать дату в будущем";
                                },
                                onBlur: () => trigger("date"),
                            })}
                            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                            onBlur={(e) => {
                                Object.assign(e.target.style, inputStyle('date'));
                                e.target.style.boxShadow = 'none';
                            }}
                            placeholder="Дата"
                        />
                        <label htmlFor="floatingDate">Дата</label>
                        {errors.date && <p className="error-text">{errors.date.message}</p>}
                    </div>


                    <div className="form-floating mb-3" style={{ height: '75px' }}>
                        <select
                            id="floatingCategory"
                            className="form-select"
                            style={inputStyle('category')}
                            {...register("category", {
                                required: "Выберите категорию",
                                onBlur: () => trigger("category"),
                            })}
                            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                            onBlur={(e) => {
                                Object.assign(e.target.style, inputStyle('category'));
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map((categoryName: string, idx) => (
                                <option key={idx} value={categoryName}>
                                    {categoryName}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="floatingCategory">Категория</label>
                        {errors.category && <p className="error-text">{errors.category.message}</p>}
                    </div>
                    <div style={{height: '10px'}}>
                        {!isValid && (
                            <p className="error-text" style={{ marginTop: "-8px" }}>
                                Не все поля заполнены
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={!isValid}
                        style={{
                            backgroundColor: isValid ? themeColor.saturate(2).darken(2) : 'gray',
                            color: 'white',
                            cursor: isValid ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};