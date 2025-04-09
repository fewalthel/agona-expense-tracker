import React from 'react';
import { useForm } from 'react-hook-form';
import { IExpense } from "../Expense/Expense.tsx";
import './index.css';
import { useExpenses } from "../../hooks/useExpenses.ts";
import { useThemeColor } from "../../hooks/useThemeColor.ts";
import { categories } from "../StatisticsTable/StatisticsTable.tsx";


interface IExpenseEditFormProps extends IExpense {
    setExpenseState: (newState: string) => void;
}

export const ExpenseEditForm: React.FC<IExpenseEditFormProps> =
    ({id, title, cost, date, category, setExpenseState}: IExpenseEditFormProps) => {
        const { editExpenseFromList } = useExpenses();
        const { themeColor } = useThemeColor();


        const {
            register,
            handleSubmit,
            formState: { errors }
        } = useForm<IExpense>({
            defaultValues: {
                title,
                cost,
                date,
                category
            }
        });


        const onSubmit = (data: IExpense) => {
            if (Number(data.cost) <= 0) {
                alert("Стоимость расхода не может быть такой!");
                return;
            }


            const updatedExpense: IExpense = {
                ...data,
                id
            };


            editExpenseFromList(updatedExpense);
            setExpenseState('view');
        };


        return (
            <div className="expense-edit-form" style={{ background: themeColor }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <strong>Редактирование расхода</strong>


                    <input
                        type="text"
                        className="expense-title-input"
                        placeholder="название расхода"
                        {...register('title', { required: "Введите название" })}
                    />
                    {errors.title && <span className="error-text">{errors.title.message}</span>}


                    <input
                        type="number"
                        className="expense-cost-input"
                        placeholder="сумма расхода"
                        {...register('cost', {
                            required: "Введите сумму",
                            valueAsNumber: true,
                            min: { value: 1, message: "Сумма должна быть больше 0" }
                        })}
                    />
                    {errors.cost && <span className="error-text">{errors.cost.message}</span>}


                    <input
                        type="date"
                        className="expense-date-input"
                        placeholder="дата расхода"
                        {...register('date', { required: "Выберите дату" })}
                    />
                    {errors.date && <span className="error-text">{errors.date.message}</span>}


                    <select
                        className="expense-category-select"
                        {...register('category', { required: "Выберите категорию" })}
                    >
                        {categories.map((categoryName: string) =>
                            <option key={categoryName} value={categoryName}>
                                {categoryName}
                            </option>
                        )}
                    </select>
                    {errors.category && <span className="error-text">{errors.category.message}</span>}


                    <button
                        type="submit"
                        style={{ backgroundColor: themeColor.saturate(2).darken(2), color: "white" }}>
                        Save
                    </button>
                </form>
            </div>
        );
    };
