import React from "react";
import { ICategoryCost} from "./ExpenseTracker/ExpenseTracker.tsx";

export const StatisticsTable: React.FC<{expensesStatsByCategories: ICategoryCost[]}> = ({expensesStatsByCategories}) => {
    return (
    <table className="expenses-table">
        <thead>
        <tr>
            <td style={{backgroundColor: "#fe9197"}}>здоровье</td>
            <td style={{backgroundColor: "#f19ca9"}}>еда</td>
            <td style={{backgroundColor: "#FDBDBA"}}>образование</td>
            <td style={{backgroundColor: "#ffcad7"}}>развлечения</td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{expensesStatsByCategories[0].cost} руб.</td>
            <td>{expensesStatsByCategories[1].cost} руб.</td>
            <td>{expensesStatsByCategories[2].cost} руб.</td>
            <td>{expensesStatsByCategories[3].cost} руб.</td>
        </tr>
        </tbody>
    </table>
    )
}