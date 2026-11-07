const list = ["a", "b"];

list.push("c");        // add to the end         ["a", "b", "c"]
list.pop();            // remove from the end    ["a", "b"]
list.unshift("z");     // add to the start       ["z", "a", "b"]
list.shift();          // remove from the start  ["a", "b"]
list[1] = "B";         // replace by index       ["a", "B"]

const nums = [5, 8, 12, 8];

console.log(nums.includes(12));     // true
console.log(nums.indexOf(8));       // 1  (first match; -1 if not found)
console.log(nums.slice(1, 3));      // [8, 12]  (copy from index 1 up to, not including, 3)
console.log(nums.join(" - "));      // "5 - 8 - 12 - 8"
console.log(nums.reverse());

const prices = [1200, 800, 450];

for (let i = 0; i < prices.length; i++) {
    console.log(`Item ${i + 1}: ${prices[i]} yen`);
}
for (const [index, price] of prices.entries()) {
    console.log(`${index + 1}: ${price} yen`);
}

const person = {
    name: "Munhuu",
    age: 29,
    city: "Kumamoto",
    isStudent: true,
};

console.log(person.name); //"Munhuu"
console.log(person["age"]); //29

const field = "city";
console.log(person[field]); //"Kumamoto"

person.age = 30;
person.job = "student";
delete person.isStudent;
console.log(person);

const student = {
    name: "Munhuu",
    scores: [80, 90, 75],
    address: { city: "Kumamoto", country: "Japan" },
    greet() {
        return `Hi, I'm ${this.name}`;
    },
};

console.log(student.scores[1]);          // 90
console.log(student.address.city);       // "Kumamoto"
console.log(student.greet());            // "Hi, I'm Munhuu"
console.log(Object.keys(person));
console.log(Object.values(person));
console.log(Object.entries(person));

for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

console.log("age" in person);
console.log(person.email === undefined);

const { name, city } = person;
console.log(name, city);

const [first, second] = ["a", "b", "c"];
console.log(first, second);   // "a" "b"

const base = { name: "Munhuu", age: 25 };
const updated = { ...base, age: 26 };
console.log(updated); // { name: "Munhuu", age: 26 }
console.log(base); //unchanged

const a = [1, 2];
const b = [...a, 3, 4];  // [1,2,3,4]

const original = { name: "Munhuu" };
const copy = original;       // NOT a copy: both names point at the same object
copy.name = "Changed";
console.log(original.name);  // "Changed"

const expenses = [
    { id: 1, item: "Lunch", amount: 850, category: "food" },
    { id: 2, item: "Train pass", amount: 6000, category: "transport" },
    { id: 3, item: "Coffee", amount: 450, category: "food" },
    { id: 4, item: "Book", amount: 1800, category: "learning" },
];

console.log(expenses[1].item); // "Train pass"
console.log(expenses.length); // 4

for (const expense of expenses) {
    console.log(`${expense.item}: ${expense.amount} yen`);
}
