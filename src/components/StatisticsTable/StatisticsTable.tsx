import React from "react";
import { ICategoryCost} from "../ExpenseTracker/ExpenseTracker.tsx";
import chroma from 'chroma-js';

function themeColors(themeColor: string): string[] {

    // Создаем основнoй цвет, используя заданное имя цвета
    const baseColor = chroma(themeColor);

    // Генерируем 7 рандомных цветов на основе базового цвета
    const colors = chroma.scale([baseColor.darken(2), baseColor.brighten(2)])
        .mode('lab')
        .colors(7);

    return colors;
}

export const StatisticsTable: React.FC<{expensesStatsByCategories: ICategoryCost[], themeColor: string}> = ({expensesStatsByCategories, themeColor}) => {

    return (
    <table className="expenses-table">
        <thead>
        <tr>
            <td style={{backgroundColor: themeColors(themeColor)[0]}}>здоровье</td>
            <td style={{backgroundColor: themeColors(themeColor)[1]}}>еда</td>
            <td style={{backgroundColor: themeColors(themeColor)[2]}}>образование</td>
            <td style={{backgroundColor: themeColors(themeColor)[3]}}>развлечения</td>
            <td style={{backgroundColor: themeColors(themeColor)[4]}}>транспорт</td>
            <td style={{backgroundColor: themeColors(themeColor)[5]}}>жилищные расходы</td>
            <td style={{backgroundColor: themeColors(themeColor)[6]}}>прочее</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            {expensesStatsByCategories.map( (stat: ICategoryCost) =>
                <td>{stat.cost} руб.</td>
            )}
        {/*    <td>{expensesStatsByCategories[0].cost} руб.</td>
            <td>{expensesStatsByCategories[1].cost} руб.</td>
            <td>{expensesStatsByCategories[2].cost} руб.</td>
            <td>{expensesStatsByCategories[3].cost} руб.</td>*/}
        </tr>
        </tbody>
    </table>
    )
}