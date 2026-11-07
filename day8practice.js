function check(label, actual, expected) {
    const pass = actual === expected;
    console.log(`${pass ? "PASS" : "FAIL"}: ${label}${pass ? "" : ` (got ${actual}, expected ${expected})`}`);
}

//1
const numbers = [1, 2, 3, 4, 5];
console.log(`first number: ${numbers[0]}, last number: ${numbers[numbers.length - 1]}, length: ${numbers.length}`);
numbers.push(6);
console.log(numbers);
numbers.unshift(0);
console.log(numbers);
numbers.shift();
console.log(numbers);

//2
function sumArray(numbers) {
    let sum = 0;
    for (const number of numbers) {
        sum += number;
    }
    return (sum);
}

//3
function largest(numbers) {
    let max = numbers[0];
    for (const number of numbers) {
        if (number > max) {
            max = number;
        }
    } return max;
}

//4
const book = {
    title: "History of Mongolia",
    author: "John Baabar",
    year: 2016,
    genre: ["Documentary", "History", "Modern"],
};
console.log(book.genre[1]);
book.pages = 192;
book.year = 2017;
console.log(book)
//5
function describePerson(person) {
    if (person.age === undefined && person.name === undefined) {
        return 'Enter Age & Name';
    }
    if (person.age === null) {
        return "age is not defined";
    }
    if (person.name === undefined) {
        return "name is not defined";
    }
    return (`${person.name} is ${person.age} years old.`);
}

//6
const expenses = [
    { id: 1, item: "Lunch", amount: 850, category: "food" },
    { id: 2, item: "Train pass", amount: 6000, category: "transport" },
    { id: 3, item: "Coffee", amount: 450, category: "food" },
    { id: 4, item: "Book", amount: 1800, category: "learning" },
];

for (const expense of expenses) {
    console.log(`${expense.item} ${expense.amount}`);
}

function totalSpent(expenses) {
    let total = 0;
    for (const expense of expenses) {
        total += expense.amount;
    } return total;
}

function countByCategory(expenses, category) {
    let count = 0;
    for (const expense of expenses) {
        if (expense.category === category) {
            count += 1;
        }
    } return count;
}

//7
const trap = [1, 2, 3, 4, 5, 6];
const copy = trap;
copy.push(7);
console.log(trap[trap.length - 1]);
const fix = [...trap];
fix.push(8);
console.log(fix);
console.log(trap);

check("sumArray basic", sumArray([1, 2, 3]), 6);
check("sumArray again", sumArray([1, 2, 3]), 6);
check("sumArray empty", sumArray([]), 0);
check("sumArray negatives", sumArray([-1, -2]), -3);
check("totalSpent", totalSpent(expenses), 9100);
check("totalSpent again", totalSpent(expenses), 9100);
check("countByCategory food", countByCategory(expenses, "food"), 2);
check("countByCategory none", countByCategory(expenses, "games"), 0);
check("describePerson", describePerson({ name: "Munhuu", age: 25 }), "Munhuu is 25 years old.");
check("describePerson age 0", describePerson({ name: "Baby", age: 0 }), "Baby is 0 years old.");