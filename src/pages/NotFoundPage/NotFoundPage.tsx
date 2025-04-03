import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
    return (
        <div className="not-found-container">
            <img src="/not-found.png" />
            <h1>Такой страницы нет :(</h1>
            <Link to="/" className="link">вернуться на главную</Link>
        </div>
    )
}