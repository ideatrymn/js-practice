function check(label, actual, expected) {
    const pass = actual === expected;
    console.log(`${pass ? "PASS" : "FAIL"}: ${label}${pass ? "" : ` (got ${actual}, expected ${expected})`}`);
}

const expenses = [
    { id: 1, item: "Lunch", amount: 850, category: "food" },
    { id: 2, item: "Train pass", amount: 6000, category: "transport" },
    { id: 3, item: "Coffee", amount: 450, category: "food" },
    { id: 4, item: "Book", amount: 1800, category: "learning" },
];

const none = [];
const one = [{ id: 9, item: "Snack", amount: 300, category: "food" }];

const numbers = [1, 2, 3];
console.log(numbers.map(n => n * 2));

const prices = [1000, 2500, 800];
const withTax = prices.map(price => Math.round(price * 1.1));
console.log(withTax);
console.log(prices);

const items = expenses.map(expense => expense.item);
console.log(items); // ["Lunch", "Train pass", "Coffee", "Book"]

const withTaxAdded = expenses.map(expense => ({
    ...expense,
    amountWithTax: Math.round(expense.amount * 1.1),
}));

expenses.forEach(expense => {
    console.log(`${expense.item}: ${expense.amount}`);
});

const nums = [5, 12, 8, 20, 3];
const big = nums.filter(n => n > 10);
console.log(big); //[12,20]

const food = expenses.filter(expense => expense.category === 'food');

const foodNames = expenses
    .filter(expense => expense.category === 'food')
    .map(expense => expense.item);
console.log(foodNames);

// Loop version
//let total = 0;
//for (const n of [10, 20, 30]) {
//    total += n;
//}

const total2 = [10, 20, 30].reduce((sum, n) => sum + n, 0);

//[].reduce((sum, n) => sum + n);      // TypeError: Reduce of empty array with no initial value
//[].reduce((sum, n) => sum + n, 0);   // 0

const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
console.log(total); //9100

const byCategory = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
}, {});

console.log(byCategory); // { food: 1300, transport: 6000, learning: 1800 }

const numb = [4, 9, 16, 25];

console.log(numb.find(n => n > 10));    // 16, the first match (or undefined)
console.log(numb.findIndex(n => n > 10));  // 2, its index (or -1)
console.log(numb.some(n => n > 20));    // true, at least one matches
console.log(numb.every(n => n > 3));    // true, all match

const train = expenses.find(expense => expense.item === "Train pass");
console.log(train?.amount); //6000

console.log([10, 9, 100, 1].sort()); // [1,10,100,9]

const numbs = [10, 9, 100, 1];
numbs.sort((a, b) => a - b); // ascending:  [1, 9, 10, 100]
numbs.sort((a, b) => b - a); // descending: [100, 10, 9, 1]

const sorted = [...expenses].sort((a, b) => b.amount - a.amount);
const byName = [...expenses].sort((a, b) => a.item.localeCompare(b.item));

function totalSpent(expenses) {
    let total = 0;
    for (const expense of expenses) {
        total += expense.amount;
    } return total;
}

function totalSpent(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function countByCategory(expenses, category) {
    const matches = expenses.filter(expense => expense.category === category);
    return matches.length;
}

// Step 4

function expensesOver(expenses, minAmount) {
    return expenses.filter(expense => expense.amount >= minAmount);
}

// Step 5

function totalsByCategory(expenses) {
    return expenses.reduce((totals, expense) => {
        const current = totals[expense.category] ?? 0;
        totals[expense.category] = current + expense.amount;
        return totals;
    }, {});
}

//Step 6

function biggestExpense(expenses) {
    if (expenses.length === 0) return undefined;
    return expenses.reduce(
        (biggest, expense) => (expense.amount > biggest.amount ? expense : biggest),
        expenses[0]
    );
}

//Step 7

function sortedByAmount(expenses) {
    return [...expenses].sort((a, b) => b.amount - a.amount);
}

//Step 8

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

function formatYen(amount) {
    return amount.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}

function capitalize(word) {
    if (typeof word !== "string") return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function buildReport(expenses) {
  if (expenses.length === 0) return "No expenses yet.";

  const lines = [];
  const stats = summary(expenses);
  lines.push(`Total: ${formatYen(stats.total)}`);

  for (const [category, amount] of Object.entries(totalsByCategory(expenses))) {
    lines.push(`${capitalize(category)}: ${formatYen(amount)}`);
  }

  const biggest = biggestExpense(expenses);
  lines.push(`Biggest: ${biggest.item} (${formatYen(biggest.amount)})`);

  return lines.join("\n");
}

check("report has total", buildReport(expenses).includes("9,100"), true);
check("report has food", buildReport(expenses).includes("Food"), true);
check("report has biggest", buildReport(expenses).includes("Train pass"), true);
check("report line count", buildReport(expenses).split("\n").length, 5);
check("report empty", buildReport(none), "No expenses yet.");