const SAMPLE_EXPENSES = [
    { id: 1, item: "Lunch", amount: 850, category: "food" },
    { id: 2, item: "Train pass", amount: 6000, category: "transport" },
    { id: 3, item: "Coffee", amount: 450, category: "food" },
    { id: 4, item: "Book", amount: 1800, category: "learning" },
    { id: 5, item: "Movie", amount: 1900, category: "fun" },
    { id: 6, item: "Annual subscription for a language learning app", amount: 6000, category: "learning" },
    { id: 7, item: "Lending money to friend", amount: 120, category: "loan" },
    { id: 8, item: "Plane ticket", amount: 55000, category: "transport" },
    { id: 9, item: "Hotel", amount: 55000, category: "travel" },
];

const STORAGE_KEY = "expense-tracker-v1";
const CATEGORIES = ["food", "transport", "learning", "fun", "loan", "travel", "other"];

function formatYen(amount) {
    return amount.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}

function capitalize(word) {
    if (typeof word !== "string") return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function totalSpent(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function countByCategory(expenses, category) {
    const matches = expenses.filter(expense => expense.category === category);
    return matches.length;
}

function totalsByCategory(expenses) {
    return expenses.reduce((totals, expense) => {
        const current = totals[expense.category] ?? 0;
        totals[expense.category] = current + expense.amount;
        return totals;
    }, {});
}

function biggestExpense(expenses) {
    if (expenses.length === 0) return undefined;
    return expenses.reduce(
        (biggest, expense) => (expense.amount > biggest.amount ? expense : biggest),
        expenses[0]
    );
}

function sortedByAmount(expenses) {
    return [...expenses].sort((a, b) => b.amount - a.amount);
}

function summary(expenses) {
    if (expenses.length === 0) {
        return { count: 0, total: 0, average: 0, largest: null };
    }
    const count = expenses.length;
    const total = totalSpent(expenses);
    const average = total / count;
    const largest = biggestExpense(expenses).item;

    return { count, total, average, largest };
}

function check(label, actual, expected) {
    const pass = actual === expected;
    console.log(`${pass ? "PASS" : "FAIL"}: ${label}${pass ? "" : ` (got ${actual}, expected ${expected})`}`);
}

function percentOfTotal(amount, total) {
    if (total === 0) return 0;
    return Math.round(amount / total * 100);
}

function buildReport(expenses) {
    if (expenses.length === 0) return "No expenses yet.";

    const lines = [];
    const stats = summary(expenses);
    lines.push(`Total: ${formatYen(stats.total)}`);

    for (const [category, amount] of Object.entries(totalsByCategory(expenses))) {
        const percent = percentOfTotal(amount, stats.total);
        lines.push(`${capitalize(category)}: ${formatYen(amount)} (${formatPercent(percent)})`);
    }

    const biggest = biggestExpense(expenses);
    lines.push(`Biggest: ${biggest.item} (${formatYen(biggest.amount)})`);

    return lines.join("\n");
}

function formatPercent(percent) {
    return `${percent < 1 ? "<1" : percent}%`;
}

function nextId(expenses) {
    const maxId = expenses.reduce(
        (max, expense) => (expense.id > max ? expense.id : max),
        0
    );
    return maxId + 1;
}

function addExpense(expenses, data) {
    return [...expenses, { id: nextId(expenses), ...data }];
}

function removeExpense(expenses, id) {
    return expenses.filter(expense => expense.id !== id);
}

function parseExpenseInput(itemText, amountText, category) {
    const item = itemText.trim();
    const amountClean = amountText.trim();
    const amount = Number(amountClean);

    if (item === "") return { error: "Enter what you spent money on." };
    if (item.length > 60) return { error: "Keep it short." };
    if (amountClean === "" || !Number.isInteger(amount) || amount <= 0) {
        return { error: "Enter valid amount." };
    }
    if (!CATEGORIES.includes(category)) return { error: "Choose a category." };

    return { value: { item, amount, category } };
}

function saveExpenses(expenses) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
        console.warn("Could not save expenses:", error);
    }
}

function loadExpenses() {
    try {
        const text = localStorage.getItem(STORAGE_KEY);
        if (text === null) return [...SAMPLE_EXPENSES];

        const data = JSON.parse(text);
        if (!Array.isArray(data)) return [...SAMPLE_EXPENSES];

        return data;
    } catch (error) {
        console.warn("Could not load expenses:", error);
        return [...SAMPLE_EXPENSES];
    }
}

function filterByCategory(expenses, category) {
    if (category === "all") return expenses;
    return expenses.filter(expense => expense.category === category);
}

function restoreExpense(expenses, expense) {
    const idTaken = expenses.some(e => e.id === expense.id);
    const restored = idTaken ? { ...expense, id: nextId(expenses) } : expense;
    return [...expenses, restored];
}
let expenses = loadExpenses();