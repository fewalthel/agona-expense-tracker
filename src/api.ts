
export interface IExpense {
    title: string; //название расхода
    cost: number; //размер расхода в рублях
    date: string; //дата добавления расхода
    category: string; //категория
    id: number;
}

const expenses: IExpense[] = [
    {"id": 1, "title": "Продукты", "cost": 1500, "date": "2025-03-08", "category": 'еда'},
    {"id": 2, "title": "Кино", "cost": 300, "date": "2025-02-14", "category": "развлечения"},
    {"id": 3, "title": "Покупка методички", "cost": 500, "date": "2025-05-20", "category": "образование"}
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
