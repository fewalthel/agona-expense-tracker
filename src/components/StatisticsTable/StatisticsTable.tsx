import { ICategoryCost } from "../../store/slices/expensesStatisticsSlice.ts"
import {Color} from 'chroma-js';
import React from 'react';
import './index.css';
import {themeColors} from "../StatisticsCircle/StatisticsCircle.tsx";

export const categories: string[] = [
    "здоровье",
    "питание",
    "образование",
    "развлечения",
    "транспорт",
    "жилищные расходы",
    "прочее"
];

export const StatisticsTable: React.FC<{expensesStatsByCategories: ICategoryCost[], themeColor: Color}> = ({expensesStatsByCategories, themeColor}) => {

    return (
    <table className="expenses-table">
        <thead>
        <tr>
            {categories.map((category: string, index: number) => (
                <td key={index} style={{backgroundColor: themeColors(themeColor)[index]}}>
                    {category}
                </td>
            ))}
        </tr>
        </thead>
        <tbody>
        <tr>
            {expensesStatsByCategories.map((stat: ICategoryCost) =>
                <td key={stat.category}>{stat.cost} руб.</td>
            )}
        </tr>
        </tbody>
    </table>
    )
}