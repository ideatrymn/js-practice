const billAmount = Number(prompt("Bill amount (yen):"));
const taxPercent = ("Tax percent:", "10");
const tipPercent = Number(prompt("Tip percent:", "15"));
const people = Number(prompt("Number of people:", "1"));
const discountPercent = 10;
const exchangeRate=100;

const tax = Math.round(billAmount * taxPercent / 100);
const tip = Math.round(billAmount * tipPercent / 100);
const discountPrice=billAmount-billAmount*(discountPercent/100);
const total = (discountPrice + tax + tip);
const perPerson = Math.ceil(total / people);
const USD=perPerson/exchangeRate;

console.log(`Bill: ${billAmount} yen`);
console.log(`Tax (${taxPercent}%): ${tax} yen`);
console.log(`Tip (${tipPercent}%): ${tip} yen`);
console.log(`Total: ${total} yen`);
console.log(`Each of ${people} pays: ${perPerson} yen`);
console.log(`In USD:$${USD}USD`);