
export interface IExpense {
    title: string; //название расхода
    cost: number; //размер расхода в рублях
    date: string; //дата добавления расхода
    category: string; //категория
}

const expenses: IExpense[] = [
    {"title": "Продукты", "cost": 1500, "date": "8 марта 2025 г.", "category": 'еда'},
    {"title": "Кино", "cost": 800, "date": "14 февраля 2025 г.", "category": "развлечения"},
    {"title": "Покупка методички", "cost": 500, "date": "20 января 2025 г.", "category": "образование"}
];

export const getExpenses= (): Promise<IExpense[] | null> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(expenses);
            } catch (error) {
                reject(error);
            }
        }, Math.random() * 3000);
    });
};
