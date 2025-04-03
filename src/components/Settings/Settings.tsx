import React from "react";
import './index.css'
import { useThemeColor } from "../../hooks/useThemeColor.ts";
import { useExpenses } from "../../hooks/useExpenses.ts";

export const Settings: React.FC = () => {

    const {setTheme} = useThemeColor();
    const {sortExpensesList} = useExpenses();

    return (
        <div className="settings-container">
            <div className="sorting-container">
                <p>Сортировать по:</p>

                <select name="sorted-by" className="sorted-by" onChange={(e): void => sortExpensesList(e.target.value)}>
                    <option value="none">не сортировать</option>
                    <option value="date">дате</option>
                    <option value="cost-up">возрастанию расходов</option>
                    <option value="cost-down">убыванию расходов</option>
                </select>
            </div>
            <div className="theme-container">
                <p>Выбор темы:</p>

                <select name="theme" className="theme" onChange={(e): void => setTheme(e.target.value)}>
                    <option value="lightpink">розовый</option>
                    <option value="lightblue">голубой</option>
                    <option value="palegreen">зелёный</option>
                    <option value="orange">оранжевый</option>
                </select>
            </div>
        </div>
    )
}