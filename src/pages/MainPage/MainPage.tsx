import React from "react";
import { Link } from "react-router-dom";

import './index.css';

export const MainPage: React.FC = () => {
    return (
        <div className="main-page">
            <h1>Welcome to super mega cool hype +vibe expense tracker</h1>
            <div className="links-container">
                <Link to="/expense_tracker" className="link">Все расходы</Link>
                <Link to="/statistics" className="link">Статистика по расходам</Link>
            </div>
            <img src='/main-gif.gif' alt="hasbik-counting-money" className="hasbik" />
        </div>
    )
}