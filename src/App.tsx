import './App.css';
import { ExpenseTrackerPage } from "./pages/ExpenseTrackerPage/ExpenseTrackerPage.tsx";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StatisticsPage } from "./pages/StatisticsPage/StatisticsPage.tsx";
import { MainPage} from "./pages/MainPage/MainPage.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/expense_tracker" element={<ExpenseTrackerPage />} />
                <Route path="/" element={<MainPage/> } />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/statistics" element={<StatisticsPage/>}/>
            </Routes>
        </Router>
    );
}

export default App