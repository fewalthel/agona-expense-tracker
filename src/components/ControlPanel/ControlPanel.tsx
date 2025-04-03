import React from "react";
import { Link } from "react-router-dom";
import { StatisticsCircle } from "../StatisticsCircle/StatisticsCircle.tsx";
import { Settings } from "../Settings/Settings.tsx";
import { ExpenseAddFormModal } from "../ExpenseAddFormModal/ExpenseAddFormModal.tsx";
import { useThemeColor } from "../../hooks/useThemeColor.ts";
import { useExpensesStatistics } from "../../hooks/useExpensesStatistics.ts";
import { useTotalCost } from "../../hooks/useTotalCost.ts";
import './index.css';

interface IControlPanelProps {
    openModal: () => void;
    isModalOpen: boolean;
    closeModal: () => void;
}

export const ControlPanel: React.FC<IControlPanelProps> = ({ openModal, isModalOpen, closeModal}: IControlPanelProps) => {
    const { themeColor } = useThemeColor();
    const { expensesStatistics } = useExpensesStatistics();
    const { totalCost } = useTotalCost();

    return (
        <div className="control-panel">
            <Link to="/statistics" className="link">больше статистики...</Link>
            <StatisticsCircle statistics={expensesStatistics} themeColor={themeColor} size={200}/>

            <strong>Общая сумма расходов: {totalCost} руб.</strong>

            <Settings/>

            <button onClick={openModal} className="add-expense-button"
                    style={{backgroundColor: themeColor.saturate(2).darken(2), color: "white"}}>
                Добавить расход
            </button>
            <ExpenseAddFormModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}