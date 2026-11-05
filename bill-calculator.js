const billAmount = Number(prompt("Bill amount (yen):"));
const taxPercent = Number(prompt("Tax percent:", "10"));
const tipPercent = Number(prompt("Tip percent:", "15"));
const people = Number(prompt("Number of people:", "1"));
const discountPercent = 10;
const exchangeRate = 100; // yen per USD, practice value

const discount = Math.round(billAmount * discountPercent / 100);
const discountedBill = billAmount - discount;
const tax = Math.round(discountedBill * taxPercent / 100);
const tip = Math.round(discountedBill * tipPercent / 100);
const total = discountedBill + tax + tip;
const perPerson = Math.ceil(total / people);
const perPersonUsd = perPerson / exchangeRate;

console.log(`Bill: ${billAmount} yen`);
console.log(`Discount (${discountPercent}%): -${discount} yen`);
console.log(`Tax (${taxPercent}%): ${tax} yen`);
console.log(`Tip (${tipPercent}%): ${tip} yen`);
console.log(`Total: ${total} yen`);
console.log(`Each of ${people} pays: ${perPerson} yen (about $${perPersonUsd.toFixed(2)})`);